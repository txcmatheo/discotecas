(function(){
  "use strict";
  var d = document, h = d.documentElement, w = window;
  var rm = w.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fine = w.matchMedia("(pointer: fine)").matches;
  var g = w.gsap, ST = w.ScrollTrigger;
  var hero = d.querySelector(".hero");

  function $$(sel, root){ return Array.prototype.slice.call((root || d).querySelectorAll(sel)); }
  function shown(el){ return !el.hidden && el.offsetParent !== null; }

  var VS = "attribute vec2 a;void main(){gl_Position=vec4(a,0.,1.);}";
  var FS = [
    "#ifdef GL_FRAGMENT_PRECISION_HIGH",
    "precision highp float;",
    "#else",
    "precision mediump float;",
    "#endif",
    "uniform vec2 uR;uniform float uT;uniform vec2 uM;uniform float uS;uniform vec4 uK;uniform float uF;uniform float uG;",
    "float hs(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}",
    "float ns(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hs(i),hs(i+vec2(1.,0.)),f.x),mix(hs(i+vec2(0.,1.)),hs(i+vec2(1.,1.)),f.x),f.y);}",
    "float fbm(vec2 p){float v=0.,a=.5;for(int i=0;i<4;i++){v+=a*ns(p);p=p*2.03+vec2(1.7,9.2);a*=.5;}return v;}",
    "float beam(vec2 p,vec2 o,float an,float wd){vec2 dr=vec2(sin(an),-cos(an));vec2 q=p-o;float al=dot(q,dr);if(al<0.)return 0.;float pr=abs(q.x*dr.y-q.y*dr.x);float ww=wd*(1.+al*1.4);return (exp(-pr*pr/(ww*ww))+.05*exp(-pr/(ww*9.)))*exp(-al*.62);}",
    "void main(){",
    "vec2 fc=gl_FragCoord.xy;vec2 p=(fc-.5*uR)/uR.y;float ar=uR.x/uR.y;float t=uT;",
    "float bt=fract(t*.5);float pu=exp(-bt*7.)*smoothstep(0.,.04,bt);",
    "float hz=fbm(p*vec2(1.5,2.3)+vec2(t*.035,-t*.06));hz=smoothstep(.28,.85,hz);",
    "float hz2=ns(p*3.1-vec2(t*.05,t*.02));",
    "vec3 Y=vec3(1.,.80,0.);vec3 W=vec3(1.,.9,.72);vec3 c=vec3(0.);",
    "for(int i=0;i<5;i++){float fi=float(i);float dir=mod(fi,2.)*2.-1.;",
    "vec2 o=vec2((fi/4.-.5)*ar*.94+uM.x*.05,.54+uM.y*.015+uS*.08);",
    "float sw=dir*sin(t*.21+fi*1.9)*.46+(fi-2.)*.1+uS*.38*dir+uM.x*.06;",
    "vec3 cl=Y;if(i==3)cl=W;",
    "float fx=0.;",
    "for(int j=0;j<3;j++){float fj=float(j)-1.;float an=sw+fj*(.1+.03*sin(t*.37+fi));fx+=beam(p,o,an,.0032);}",
    "float hot=exp(-length(p-o)*22.)*.6;",
    "c+=cl*(fx*(.3+.95*hz)*(.75+.5*hz2)+hot);}",
    "c*=uG*(1.+.45*pu);",
    "c+=Y*hz*hz2*.03*smoothstep(-.1,.5,p.y)*(1.+.3*pu);",
    "vec2 dd=max(uK.xy-fc,fc-uK.zw);float ou=length(max(dd,0.));float mk=mix(uF,1.,smoothstep(0.,.16*uR.y,ou));",
    "c*=mk;",
    "c*=1.-.35*smoothstep(.35,.8,abs(p.x)/ar);",
    "c*=1.-.7*uS;",
    "c=1.-exp(-c*1.15);",
    "c+=(hs(fc+fract(t)*91.)-.5)/255.;c=max(c,0.);",
    "float al=max(c.r,max(c.g,c.b));",
    "gl_FragColor=vec4(c,al);}"
  ].join("\n");

  var GL = (function(){
    var cv = d.getElementById("heroFx");
    if (!cv || !hero || rm) return null;
    var gl = null;
    try { gl = cv.getContext("webgl", { alpha:true, premultipliedAlpha:true, antialias:false, depth:false, stencil:false, powerPreference:"low-power" }); } catch(e){}
    if (!gl) return null;
    function sh(type, src){
      var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    }
    var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs) return null;
    var pr = gl.createProgram(); gl.attachShader(pr, vs); gl.attachShader(pr, fs); gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return null;
    gl.useProgram(pr);
    var buf = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,3,-1,-1,3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(pr, "a"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    var U = {}; ["uR","uT","uM","uS","uK","uF","uG"].forEach(function(n){ U[n] = gl.getUniformLocation(pr, n); });
    gl.clearColor(0,0,0,0);

    var mobile = w.matchMedia("(max-width: 700px), (pointer: coarse)").matches;
    var dpr = Math.min(w.devicePixelRatio || 1, mobile ? 1 : 1.5);
    var q = mobile ? .66 : .72, cw = 0, ch = 0, scale = 1, mask = [0,0,0,0], heroH = 1;
    var mx = 0, my = 0, tx = 0, ty = 0, sc = 0;
    var vis = true, on = false, t0 = 0, tAcc = 0, last = 0, frames = 0, slow = 0, n = 0;

    function measure(){
      var r = cv.getBoundingClientRect();
      cw = Math.max(1, Math.round(r.width * dpr * q)); ch = Math.max(1, Math.round(r.height * dpr * q));
      if (cv.width !== cw || cv.height !== ch){ cv.width = cw; cv.height = ch; gl.viewport(0, 0, cw, ch); }
      scale = cw / Math.max(1, r.width); heroH = Math.max(1, r.height);
      var x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, pad = 20;
      $$(".brand, .night", hero).forEach(function(el){
        var b = el.getBoundingClientRect(); if (!b.width) return;
        x0 = Math.min(x0, b.left); y0 = Math.min(y0, b.top); x1 = Math.max(x1, b.right); y1 = Math.max(y1, b.bottom);
      });
      if (x1 < x0){ mask = [-9,-9,-9,-9]; return; }
      x0 = (x0 - r.left - pad) * scale; x1 = (x1 - r.left + pad) * scale;
      var top = (y0 - r.top - pad) * scale, bot = (y1 - r.top + pad) * scale;
      mask = [x0, ch - bot, x1, ch - top];
    }
    function draw(now){
      if (!on) return;
      if (!last) last = now;
      var dt = Math.min(100, now - last); last = now; tAcc += dt / 1000;
      if (++n % 30 === 0){
        var avg = frames / 30; frames = 0;
        if (avg > 26 && q > .4){ q = Math.max(.4, q * .8); measure(); }
      }
      frames += dt;
      if (n % 90 === 0) measure();
      mx += (tx - mx) * .05; my += (ty - my) * .05;
      sc = Math.min(1, Math.max(0, (w.scrollY || 0) / heroH));
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.uniform2f(U.uR, cw, ch); gl.uniform1f(U.uT, tAcc); gl.uniform2f(U.uM, mx, my);
      gl.uniform1f(U.uS, sc); gl.uniform4f(U.uK, mask[0], mask[1], mask[2], mask[3]);
      gl.uniform1f(U.uF, mobile ? .065 : .13); gl.uniform1f(U.uG, .62);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    }
    function tick(){ draw(w.performance.now()); }
    var raf = 0;
    function loopRaf(now){ raf = 0; draw(now); if (on) raf = w.requestAnimationFrame(loopRaf); }
    function run(){
      var want = vis && !d.hidden;
      if (want === on) return;
      on = want; last = 0;
      if (g && g.ticker){ if (on) g.ticker.add(tick); else g.ticker.remove(tick); }
      else if (on && !raf) raf = w.requestAnimationFrame(loopRaf);
      else if (!on && raf){ w.cancelAnimationFrame(raf); raf = 0; }
    }
    function start(){
      measure(); on = false; vis = true; draw(w.performance.now());
      h.classList.add("gl");
      if ("IntersectionObserver" in w){
        new IntersectionObserver(function(es){ vis = es[es.length - 1].isIntersecting; run(); }, { rootMargin:"0px" }).observe(hero);
      }
      d.addEventListener("visibilitychange", run);
      var rt = 0;
      w.addEventListener("resize", function(){ clearTimeout(rt); rt = setTimeout(measure, 150); });
      if (fine){
        w.addEventListener("pointermove", function(e){
          tx = (e.clientX / w.innerWidth) * 2 - 1; ty = -((e.clientY / w.innerHeight) * 2 - 1);
        }, { passive:true });
      }
      cv.addEventListener("webglcontextlost", function(e){ e.preventDefault(); on = false; vis = false; run(); h.classList.remove("gl"); });
      run();
    }
    return { start:start, state:function(){ return { on:on, q:q, w:cw, h:ch, mask:mask }; } };
  })();
  w.__tutFx = GL;

  function later(fn){
    function go(){ if (w.requestIdleCallback) w.requestIdleCallback(fn, { timeout:900 }); else setTimeout(fn, 60); }
    if (d.readyState === "complete") go(); else w.addEventListener("load", go);
  }
  if (GL) later(GL.start);

  if (rm || !g){ h.classList.remove("fx-pre"); if (!g) h.classList.remove("fx"); return; }
  if (ST) g.registerPlugin(ST);
  g.defaults({ ease:"power3.out", duration:.6 });

  function intro(){
    if (!hero || !h.classList.contains("fx-pre")) return;
    var logo = hero.querySelector(".brand h1 .lockup"), sub = hero.querySelector(".brand .sub"), fly = hero.querySelector(".fly");
    var name = hero.querySelector(".nname"), items = [], btns = [], dates = [];
    $$(".night > *", hero).forEach(function(el){
      if (el === name) return;
      if (el.classList.contains("dates")){ dates = $$("span", el); return; }
      if (el.classList.contains("cta")){ btns = $$(".btn", el); return; }
      items.push(el);
    });
    var lbl = items.shift();
    var fade = [sub, lbl].concat(items, dates, btns).filter(Boolean);
    g.set(fade, { opacity:0, y:14 });
    if (name) g.set(name, { clipPath:"inset(0% -4% 100% -4%)", yPercent:40 });
    h.classList.remove("fx-pre");
    var tl = g.timeline({ defaults:{ ease:"expo.out", duration:.7 } });
    if (logo) tl.from(logo, { y:16, duration:.7 }, 0);
    if (fly) tl.fromTo(fly, { clipPath:"inset(4% 4% 4% 4% round 4px)" }, { clipPath:"inset(0% 0% 0% 0% round 4px)", duration:.7, clearProps:"clipPath" }, 0);
    if (sub) tl.to(sub, { opacity:1, y:0, duration:.55 }, .1);
    if (lbl) tl.to(lbl, { opacity:1, y:0, duration:.5 }, .16);
    if (name) tl.to(name, { clipPath:"inset(-20% -4% -20% -4%)", yPercent:0, duration:.65, clearProps:"clipPath" }, .22);
    var rest = items.filter(function(el){ return el !== lbl; });
    if (rest.length) tl.to(rest.slice(0,1), { opacity:1, y:0, duration:.5 }, .34);
    if (dates.length) tl.to(dates, { opacity:1, y:0, duration:.5, stagger:.06 }, .4);
    if (rest.length > 1) tl.to(rest.slice(1), { opacity:1, y:0, duration:.5, stagger:.06 }, .5);
    if (btns.length) tl.to(btns, { opacity:1, y:0, duration:.5, stagger:.08, ease:"power3.out" }, .6);
    tl.eventCallback("onComplete", function(){ g.set(fade, { clearProps:"opacity,transform" }); });
  }

  function reveal(trigger, getItems, opt){
    if (!trigger) return;
    opt = opt || {};
    var done = false, from = { opacity:0, y:opt.y == null ? 22 : opt.y };
    function items(){ return getItems().filter(function(el){ return !el.__fx; }); }
    function prep(list){ list.forEach(function(el){ el.__fx = 1; }); g.set(list, from); }
    prep(items());
    if (opt.watch){
      new MutationObserver(function(){
        var list = items(); if (!list.length) return;
        if (done){ list.forEach(function(el){ el.__fx = 1; }); refresh(); return; }
        prep(list); refresh();
      }).observe(opt.watch, { childList:true });
    }
    ST.create({ trigger:trigger, start:opt.start || "top 86%", once:true, onEnter:function(){
      done = true;
      var list = getItems();
      g.to(list, { opacity:1, y:0, duration:opt.d || .6, stagger:opt.s == null ? .07 : opt.s, ease:"power3.out", overwrite:true, clearProps:"opacity,transform" });
    }});
  }
  var rT = 0;
  function refresh(){ clearTimeout(rT); rT = setTimeout(function(){ ST.refresh(); }, 120); }

  function scrubHero(){
    if (!hero) return;
    var brand = hero.querySelector(".brand"), name = hero.querySelector(".nname"), fly = hero.querySelector(".fly"), img = fly && fly.querySelector("img");
    var tl = g.timeline({ scrollTrigger:{ trigger:hero, start:"top top", end:"bottom top", scrub:.5 } });
    if (brand) tl.to(brand, { x:function(){ return -w.innerWidth * .05; }, ease:"none" }, 0);
    if (name) tl.to(name, { x:function(){ return w.innerWidth * .06; }, ease:"none" }, 0);
    if (img) tl.to(img, { scale:1.08, ease:"none" }, 0);
    if (fly) tl.to(fly, { yPercent:-5, ease:"none" }, 0);
  }

  function heads(){
    $$(".sec .head").forEach(function(hd){
      var h2 = hd.querySelector("h2"); if (!h2) return;
      var big = !!hd.closest(".mesas");
      var others = $$(":scope > div > :not(h2), :scope > p", hd);
      hd.classList.add("fx-rl");
      var tl = g.timeline({ scrollTrigger:{ trigger:hd, start:"top 94%", end:big ? "top 40%" : "top 58%", scrub:.6 } });
      tl.fromTo(h2, { clipPath:"inset(0% 0% 100% 0%)", yPercent:70, x:big ? (w.innerWidth < 700 ? 20 : 60) : -32, scale:big ? (w.innerWidth < 700 ? 1.08 : 1.22) : 1, transformOrigin:"0% 100%" },
        { clipPath:"inset(-25% -6% -25% -6%)", yPercent:0, x:0, scale:1, ease:"power2.out", duration:1 }, 0);
      if (others.length) tl.fromTo(others, { opacity:0, y:16 }, { opacity:1, y:0, stagger:.12, duration:.6, ease:"power2.out" }, .2);
      tl.fromTo(hd, { "--fxr":0 }, { "--fxr":1, duration:.9, ease:"power1.inOut" }, .1);
    });
  }

  function rebuildable(container, build){
    if (!container) return;
    var cur = null, t = 0;
    function make(){ if (cur) cur(); cur = build() || null; }
    make();
    new MutationObserver(function(){ clearTimeout(t); t = setTimeout(function(){ make(); refresh(); }, 140); }).observe(container, { childList:true });
  }

  function cards(){
    var week = d.getElementById("week");
    rebuildable(week, function(){
      var li = $$(":scope > li", week); if (!li.length) return;
      var figs = li.map(function(x){ return x.querySelector(".fly"); }).filter(Boolean);
      var tl = g.timeline({ scrollTrigger:{ trigger:week, start:"top 92%", end:"top 38%", scrub:.6 } });
      tl.fromTo(li, { y:90, opacity:0 }, { y:0, opacity:1, stagger:.14, duration:.7, ease:"power2.out" }, 0);
      tl.fromTo(figs, { clipPath:"inset(0% 0% 100% 0% round 4px)" }, { clipPath:"inset(0% 0% 0% 0% round 4px)", stagger:.14, duration:.7, ease:"power2.out" }, .05);
      return function(){ tl.scrollTrigger.kill(); tl.kill(); g.set(li.concat(figs), { clearProps:"opacity,transform,clipPath" }); };
    });
  }

  function archive(){
    var sec = d.getElementById("eventos-pasados"), rail = d.getElementById("archRail"), arch = d.getElementById("arch");
    if (!sec || !rail || !arch) return;
    reveal(rail, function(){ return $$(":scope > li", arch); }, { watch:arch, s:.06 });
    var mm = g.matchMedia();
    mm.add("(min-width: 1024px) and (min-height: 680px)", function(){
      var prev = d.getElementById("slPrev"), next = d.getElementById("slNext");
      function maxX(){ return Math.max(0, arch.scrollWidth - rail.clientWidth); }
      rail.scrollLeft = 0;
      rail.classList.add("pinx");
      var wrap = d.getElementById("pinX");
      if (!wrap) return;
      function setH(){ wrap.style.setProperty("--pinh", (sec.offsetHeight + maxX()) + "px"); }
      h.classList.add("fx-pin"); setH();
      ST.addEventListener("refreshInit", setH);
      var tw = g.fromTo(arch, { x:0 }, { x:function(){ return -maxX(); }, ease:"none", immediateRender:false });
      var st = ST.create({ trigger:wrap, start:"top top", end:function(){ return "+=" + maxX(); }, invalidateOnRefresh:true, animation:tw, scrub:.35,
        onUpdate:state, onRefresh:state });
      function state(self){
        var m = maxX(), p = self.progress;
        if (prev) prev.disabled = p <= .002;
        if (next) next.disabled = p >= .998 || m <= 2;
      }
      function step(){ var li = arch.querySelector("li"); return li ? li.getBoundingClientRect().width + (parseFloat(getComputedStyle(arch).columnGap) || 0) : rail.clientWidth; }
      function goX(x, smooth){
        var m = maxX(); if (!m) return;
        x = Math.max(0, Math.min(m, x));
        w.scrollTo({ top:st.start + (x / m) * (st.end - st.start), behavior:smooth ? "smooth" : "instant" });
      }
      function curX(){ return st.progress * maxX(); }
      function onClick(e){
        var bt = e.target.closest && e.target.closest("#slPrev, #slNext"); if (!bt) return;
        e.preventDefault(); e.stopPropagation();
        var s = step(), n = Math.max(1, Math.floor((rail.clientWidth + 2) / s));
        goX((Math.round(curX() / s) + (bt.id === "slNext" ? n : -n)) * s, true);
      }
      function onKey(e){
        if (e.target !== rail) return;
        var s = step(), x = curX(), k = e.key;
        if (k === "ArrowRight") goX((Math.round(x / s) + 1) * s, true);
        else if (k === "ArrowLeft") goX((Math.round(x / s) - 1) * s, true);
        else if (k === "Home") goX(0, true);
        else if (k === "End") goX(maxX(), true);
        else return;
        e.preventDefault(); e.stopPropagation();
      }
      function onDown(e){ if (e.pointerType === "mouse" && rail.contains(e.target)) e.stopPropagation(); }
      function onFocus(e){
        var li = e.target.closest && e.target.closest("#arch > li"); if (!li) return;
        rail.scrollLeft = 0;
        var x = curX(), l = li.offsetLeft, r = l + li.offsetWidth;
        if (l < x) goX(l, false); else if (r > x + rail.clientWidth) goX(r - rail.clientWidth, false);
      }
      function onScrollRail(){ if (rail.scrollLeft) rail.scrollLeft = 0; if (prev && prev.parentNode) prev.parentNode.hidden = maxX() <= 2; state(st); }
      sec.addEventListener("click", onClick, true);
      sec.addEventListener("keydown", onKey, true);
      sec.addEventListener("pointerdown", onDown, true);
      sec.addEventListener("focusin", onFocus);
      rail.addEventListener("scroll", onScrollRail, { passive:true });
      w.addEventListener("resize", onScrollRail);
      onScrollRail();
      return function(){
        w.removeEventListener("resize", onScrollRail);
        sec.removeEventListener("click", onClick, true); sec.removeEventListener("keydown", onKey, true);
        sec.removeEventListener("pointerdown", onDown, true); sec.removeEventListener("focusin", onFocus);
        rail.removeEventListener("scroll", onScrollRail);
        rail.classList.remove("pinx"); g.set(arch, { clearProps:"transform" });
        ST.removeEventListener("refreshInit", setH); h.classList.remove("fx-pin"); wrap.style.removeProperty("--pinh");
        if (prev) prev.disabled = true; if (next) next.disabled = false;
        rail.dispatchEvent(new Event("scroll"));
      };
    });
  }

  function photos(){
    var grid = d.querySelector("#fotos .grid"); if (!grid) return;
    var sp = [70, -30, 110, 20];
    $$(":scope > li", grid).forEach(function(li, i){
      var k = sp[i % 4];
      g.fromTo(li, { y:function(){ return k * (w.innerWidth < 700 ? .45 : 1); } }, { y:function(){ return -k * (w.innerWidth < 700 ? .45 : 1); }, ease:"none", scrollTrigger:{ trigger:grid, start:"top bottom", end:"bottom top", scrub:.5, invalidateOnRefresh:true } });
      var f = li.querySelector(".photo");
      if (f) g.fromTo(f, { clipPath:"inset(22% 10% 22% 10% round 4px)", opacity:.2 }, { clipPath:"inset(0% 0% 0% 0% round 4px)", opacity:1, ease:"power2.out", scrollTrigger:{ trigger:li, start:"top 98%", end:"top 55%", scrub:.5 } });
    });
    if (!(w.CSS && CSS.supports && CSS.supports("animation-timeline: view()"))){
      $$("#fotos .photo, .mesas .photo").forEach(function(f){
        var img = f.querySelector("img"); if (!img) return;
        g.fromTo(img, { yPercent:-6, scale:1.14 }, { yPercent:6, ease:"none", scrollTrigger:{ trigger:f, start:"top bottom", end:"bottom top", scrub:.4 } });
      });
    }
    var more = d.querySelector("#fotos .more"); if (more) reveal(more, function(){ return [more]; }, { y:12 });
  }

  function mesas(){
    var mc = d.querySelector(".mesas-copy");
    if (mc) reveal(mc, function(){ return $$(":scope > :not(.head)", mc); }, { s:.08 });
    var mp = d.querySelector(".mesas > .photo");
    if (mp) g.fromTo(mp, { clipPath:"inset(0% 0% 100% 0% round 4px)" }, { clipPath:"inset(0% 0% 0% 0% round 4px)", ease:"power2.out", scrollTrigger:{ trigger:mp.parentNode, start:"top 85%", end:"top 30%", scrub:.6 } });
  }

  function place(){
    var info = d.querySelector(".loc-info"), map = d.querySelector(".loc .map"), loc = d.querySelector(".loc");
    if (!loc) return;
    var tl = g.timeline({ scrollTrigger:{ trigger:loc, start:"top 92%", end:"top 45%", scrub:.6 } });
    if (info) tl.fromTo($$(".info3 > div, .loc-actions", info), { x:-70, opacity:0 }, { x:0, opacity:1, stagger:.12, duration:.7, ease:"power2.out" }, 0);
    if (map) tl.fromTo(map, { x:90, opacity:0, clipPath:"inset(0% 0% 0% 30%)" }, { x:0, opacity:1, clipPath:"inset(0% 0% 0% 0%)", duration:.9, ease:"power2.out" }, .1);
  }

  function progress(){
    if (w.CSS && CSS.supports && CSS.supports("animation-timeline: scroll()")) return;
    var bar = d.querySelector(".fx-progress"); if (!bar) return;
    g.fromTo(bar, { scaleX:0 }, { scaleX:1, ease:"none", scrollTrigger:{ trigger:d.body, start:"top top", end:"bottom bottom", scrub:.2 } });
  }

  function reveals(){
    if (!ST) return;
    h.classList.add("fx-st");
    scrubHero(); heads(); cards(); archive(); photos(); mesas(); place(); progress();
    $$(".note").forEach(function(el){ reveal(el, function(){ return [el]; }, { y:12 }); });
    var qas = d.querySelector(".qas");
    reveal(qas, function(){ return $$(":scope > .qa", qas); }, { s:.05, y:14, d:.5 });
    var fg = d.querySelector(".fgrid");
    reveal(fg, function(){ return $$(":scope > .fcol", fg); }, { s:.07, y:14, start:"top 96%" });
    w.addEventListener("load", refresh);
  }

  function magnetic(){
    $$(".btn").forEach(function(b){
      b.addEventListener("pointermove", function(e){
        var r = b.getBoundingClientRect();
        b.style.setProperty("--mx", (e.clientX - r.left) + "px");
        b.style.setProperty("--my", (e.clientY - r.top) + "px");
      }, { passive:true });
    });
    if (!fine) return;
    $$(".hero .cta .btn, .mesas .cta .btn, .loc-actions .btn").forEach(function(b){
      var xs = g.quickTo(b, "x", { duration:.45, ease:"power3.out" }), ys = g.quickTo(b, "y", { duration:.45, ease:"power3.out" });
      b.addEventListener("pointermove", function(e){
        var r = b.getBoundingClientRect();
        var dx = (e.clientX - r.left - r.width / 2) * .16, dy = (e.clientY - r.top - r.height / 2) * .22;
        xs(Math.max(-6, Math.min(6, dx))); ys(Math.max(-5, Math.min(5, dy)));
      }, { passive:true });
      b.addEventListener("pointerleave", function(){ xs(0); ys(0); });
    });
  }

  function counter(){
    var el = d.getElementById("heroCount"); if (!el || !w.MutationObserver) return;
    var prev = $$("b", el).map(function(b){ return b.textContent; });
    new MutationObserver(function(){
      var bs = $$("b", el), now = bs.map(function(b){ return b.textContent; });
      if (now.join("|") === prev.join("|")) return;
      var ch = bs.filter(function(b, i){ return prev.length === now.length && prev[i] !== now[i]; });
      prev = now;
      if (ch.length) g.fromTo(ch, { yPercent:-55, opacity:0 }, { yPercent:0, opacity:1, duration:.42, stagger:.04, ease:"power3.out", clearProps:"opacity,transform" });
    }).observe(el, { childList:true, subtree:true, characterData:true });
  }

  intro();
  reveals();
  magnetic();
  counter();
})();
