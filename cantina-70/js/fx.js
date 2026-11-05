(function(){
  "use strict";
  var d = document, h = d.documentElement, w = window;
  var rm = w.matchMedia("(prefers-reduced-motion: reduce)");
  var fine = w.matchMedia("(hover: hover) and (pointer: fine)");
  var small = w.matchMedia("(max-width: 767px), (pointer: coarse)");
  var G = w.gsap, ST = w.ScrollTrigger;
  var hero = d.getElementById("hero"), cv = d.getElementById("heroFx");

  if (rm.matches){ h.classList.remove("fx"); return; }
  var intro = h.classList.contains("fx");
  if (!G){ h.classList.remove("fx"); }
  else { h.classList.add("fx-on"); if (ST) G.registerPlugin(ST); }

  var VS = "attribute vec2 p;varying vec2 v;void main(){v=p*.5+.5;gl_Position=vec4(p,0.,1.);}";
  var FS = [
    "precision mediump float;",
    "uniform vec2 R;uniform float T;uniform vec2 M;uniform float S;uniform float A;varying vec2 v;",
    "float hs(vec2 p){p=fract(p*vec2(123.34,456.21));p+=dot(p,p+45.32);return fract(p.x*p.y);}",
    "float ns(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hs(i),hs(i+vec2(1.,0.)),f.x),mix(hs(i+vec2(0.,1.)),hs(i+vec2(1.,1.)),f.x),f.y);}",
    "float fb(vec2 p){float s=0.,a=.5;mat2 r=mat2(.8,-.6,.6,.8);for(int i=0;i<4;i++){s+=a*ns(p);p=r*p*2.03+17.1;a*=.5;}return s/.9375;}",
    "void main(){",
    "float k=R.x/R.y;vec2 u=v;vec2 p=vec2(u.x*k,u.y);float t=T;",
    "float br=.78+.22*sin(t*.42)*sin(t*.23+1.3);",
    "vec2 c1=vec2(.8*k,.82)+M*vec2(.07*k,.05);",
    "float d1=length((p-c1)*vec2(.75,1.));",
    "float g1=exp(-d1*d1*4.2);",
    "vec2 c2=vec2(.6*k,1.06)+M*vec2(.035*k,.02);",
    "float d2=length(p-c2);float g2=exp(-d2*d2*8.);",
    "vec3 lk=vec3(.82,.48,.18)*g1*.34*br+vec3(.85,.7,.42)*g2*.14*(.85+.15*sin(t*.37+2.));",
    "lk+=vec3(.9,.62,.3)*exp(-abs(u.y-c1.y)*34.)*exp(-abs(p.x-c1.x)*1.8)*.05*br;",
    "vec2 q=p*1.5+vec2(0.,-t*.03-S*.5);",
    "vec2 wq=vec2(ns(q*.8+vec2(0.,t*.05)),ns(q*.8+vec2(5.2,1.3)-t*.04));",
    "float sm=smoothstep(.42,.95,fb(q+1.7*wq+vec2(t*.008,0.)));",
    "sm*=mix(.3,1.,smoothstep(1.05,.0,u.y));",
    "vec3 sk=vec3(.5,.33,.15)*sm*(.2+1.6*g1+.6*g2);",
    "vec3 du=vec3(0.);",
    "for(int i=0;i<3;i++){",
    "float fi=float(i),z=fi*.5;",
    "float sc=mix(7.,20.,z),sp=mix(.05,.02,z);",
    "vec2 dp=p*sc+vec2(M.x*mix(.9,.25,z),M.y*mix(.5,.15,z)-t*sp*sc-S*sc*mix(.5,.2,z));",
    "dp.x+=sin(dp.y*.4+fi*2.1+t*.3)*.18;",
    "vec2 id=floor(dp),f=fract(dp)-.5;float r=hs(id+fi*31.7);",
    "if(r>.7){",
    "vec2 o=(vec2(hs(id+3.1),hs(id+7.7))-.5)*.65;",
    "float sz=mix(.05,.12,hs(id+11.3))*mix(1.5,.7,z);",
    "float tw=.5+.5*sin(t*(.8+r*1.6)+r*40.);",
    "float a=smoothstep(sz,0.,length(f-o));",
    "du+=vec3(1.,.84,.55)*a*a*tw*mix(.7,.35,z);",
    "}}",
    "du*=mix(.35,1.,smoothstep(.1,.6,u.x));",
    "float tm=(1.-smoothstep(.18,.72,u.y))*(k>1.?1.-smoothstep(.4,.8,u.x):1.);",
    "vec3 col=(lk+sk*(1.+S*.9)+du*(1.+S*.7))*A*(1.-.72*tm);",
    "col+=(hs(gl_FragCoord.xy+fract(t))-.5)/255.;",
    "gl_FragColor=vec4(max(col,0.),1.);",
    "}"
  ].join("");

  var gl = null, prog = null, U = {}, run = false, vis = true, t0 = 0, tA = 0, q = small.matches ? .6 : .72;
  var mx = 0, my = 0, tx = 0, ty = 0, frames = 0, acc = 0, last = 0, own = 0;

  function sh(type, src){
    var s = gl.createShader(type); gl.shaderSource(s, src); gl.compileShader(s);
    return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
  }
  function size(){
    if (!gl) return;
    var dpr = Math.min(w.devicePixelRatio || 1, small.matches ? 1 : 1.5) * q;
    var cw = Math.max(1, Math.round(cv.clientWidth * dpr)), ch = Math.max(1, Math.round(cv.clientHeight * dpr));
    var cap = 900000, n = cw * ch;
    if (n > cap){ var f = Math.sqrt(cap / n); cw = Math.round(cw * f); ch = Math.round(ch * f); }
    if (cv.width !== cw || cv.height !== ch){ cv.width = cw; cv.height = ch; gl.viewport(0, 0, cw, ch); }
  }
  function draw(now){
    if (!t0) t0 = now;
    var dt = last ? now - last : 16; last = now;
    frames++; acc += dt; if (frames % 60 === 0){ if (acc / 60 > 30 && q > .32){ q = Math.max(.3, q * .75); size(); } acc = 0; }
    mx += (tx - mx) * .035; my += (ty - my) * .035;
    var t = (now - t0) / 1000;
    tA = Math.min(1, tA + dt / 2200);
    var hh = hero.offsetHeight || 1;
    gl.uniform2f(U.R, cv.width, cv.height);
    gl.uniform1f(U.T, t + 40);
    gl.uniform2f(U.M, mx, my);
    gl.uniform1f(U.S, Math.min(1, w.scrollY / hh));
    gl.uniform1f(U.A, tA * tA * (3 - 2 * tA));
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  }
  function tick(){ draw(performance.now()); }
  function loop(now){ if (!run) return; draw(now); own = w.requestAnimationFrame(loop); }
  function start(){
    if (run || !gl || !vis || d.hidden) return;
    run = true; last = 0;
    if (G) G.ticker.add(tick); else own = w.requestAnimationFrame(loop);
  }
  function stop(){
    if (!run) return;
    run = false;
    if (G) G.ticker.remove(tick); else w.cancelAnimationFrame(own);
  }
  w.__fx = { running:function(){ return run; }, frames:function(){ return frames; }, size:function(){ return cv ? [cv.width, cv.height] : null; } };

  function initGL(){
    if (!cv || !hero) return;
    try {
      gl = cv.getContext("webgl", { alpha:false, antialias:false, depth:false, stencil:false, premultipliedAlpha:false, preserveDrawingBuffer:false, powerPreference:"low-power" });
    } catch(e){ gl = null; }
    if (!gl) return;
    var vs = sh(gl.VERTEX_SHADER, VS), fs = sh(gl.FRAGMENT_SHADER, FS);
    if (!vs || !fs){ gl = null; return; }
    prog = gl.createProgram(); gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)){ gl = null; return; }
    gl.useProgram(prog);
    var b = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
    var loc = gl.getAttribLocation(prog, "p"); gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    ["R","T","M","S","A"].forEach(function(k){ U[k] = gl.getUniformLocation(prog, k); });
    size();
    if ("ResizeObserver" in w) new ResizeObserver(size).observe(hero); else w.addEventListener("resize", size);
    cv.addEventListener("webglcontextlost", function(e){ e.preventDefault(); stop(); gl = null; h.classList.remove("gl"); });
    if ("IntersectionObserver" in w){
      new IntersectionObserver(function(en){ vis = en[0].isIntersecting; if (vis) start(); else stop(); }, { rootMargin:"0px" }).observe(hero);
    }
    d.addEventListener("visibilitychange", function(){ if (d.hidden) stop(); else start(); });
    hero.addEventListener("pointermove", function(e){
      if (e.pointerType !== "mouse") return;
      var r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - .5) * 2; ty = -((e.clientY - r.top) / r.height - .5) * 2;
    }, { passive:true });
    hero.addEventListener("pointerleave", function(){ tx = 0; ty = 0; });
    h.classList.add("gl");
    start();
  }
  function later(){
    var go = function(){ ("requestIdleCallback" in w) ? w.requestIdleCallback(initGL, { timeout:700 }) : setTimeout(initGL, 120); };
    if (d.readyState === "complete") go(); else w.addEventListener("load", go, { once:true });
  }
  later();
  if (rm.addEventListener) rm.addEventListener("change", function(){ if (rm.matches){ stop(); h.classList.remove("gl"); } });

  if (!G) return;
  var E = "power3.out";

  function splitTitle(el){
    var txt = el.textContent.trim().split(/\s+/);
    el.textContent = "";
    txt.forEach(function(word, i){
      var o = d.createElement("span"), n = d.createElement("span");
      o.className = "w"; n.className = "wi"; n.textContent = word;
      o.appendChild(n); el.appendChild(o);
      if (i < txt.length - 1) el.appendChild(d.createTextNode(" "));
    });
    return el.querySelectorAll(".wi");
  }

  var title = d.getElementById("heroName");
  if (intro && title){
    var tws = splitTitle(title);
    var rest = Array.prototype.filter.call(d.querySelectorAll(".h-in > *"), function(el){ return el !== title; });
    var img = d.querySelector(".hero-bg img");
    G.set(rest, { opacity:0, y:14 });
    G.set(tws, { yPercent:112 });
    G.set(title, { opacity:1 });
    h.classList.add("fx-in");
    var tl = G.timeline({ defaults:{ ease:E }, onComplete:function(){ G.set(rest.concat([title]), { clearProps:"transform,opacity" }); G.set(tws, { clearProps:"transform" }); } });
    if (img) G.fromTo(img, { "--hz":1.06 }, { "--hz":1, duration:1.8, ease:"power2.out", clearProps:"--hz" });
    tl.to(rest[0], { opacity:1, y:0, duration:.5 }, .05)
      .to(tws, { yPercent:0, duration:.7, ease:"expo.out", stagger:.08 }, .12)
      .to(rest.slice(1), { opacity:1, y:0, duration:.55, stagger:.07 }, .42);
  } else {
    h.classList.add("fx-in");
  }

  var cd = d.getElementById("heroCd"), prevCd = "";
  if (cd && "MutationObserver" in w){
    var mo = new MutationObserver(function(){
      var val = cd.querySelector("span:last-child");
      if (!val || val.querySelector(".dg")) return;
      var txt = val.textContent, old = prevCd; prevCd = txt;
      mo.disconnect();
      val.textContent = "";
      var changed = [];
      for (var i = 0; i < txt.length; i++){
        var ch = txt.charAt(i);
        if (/\d/.test(ch)){
          var o = d.createElement("span"), n = d.createElement("i");
          o.className = "dg"; n.textContent = ch; o.appendChild(n); val.appendChild(o);
          if (old && old.length === txt.length && old.charAt(i) !== ch) changed.push(n);
        } else val.appendChild(d.createTextNode(ch));
      }
      if (changed.length) G.fromTo(changed, { yPercent:-90, opacity:0 }, { yPercent:0, opacity:1, duration:.45, ease:E, stagger:.04, clearProps:"transform,opacity" });
      mo.observe(cd, { childList:true, subtree:true, characterData:true });
    });
    mo.observe(cd, { childList:true, subtree:true, characterData:true });
    if (cd.firstChild){ var s0 = cd.innerHTML; cd.innerHTML = s0; }
  }

  if (fine.matches){
    Array.prototype.forEach.call(d.querySelectorAll(".hero .btn, .panel .btn, .band .btn, .loc .btn"), function(b){
      var qx = G.quickTo(b, "x", { duration:.45, ease:E }), qy = G.quickTo(b, "y", { duration:.45, ease:E });
      b.addEventListener("pointermove", function(e){
        if (e.pointerType !== "mouse") return;
        var r = b.getBoundingClientRect();
        qx(Math.max(-8, Math.min(8, (e.clientX - r.left - r.width / 2) * .22)));
        qy(Math.max(-6, Math.min(6, (e.clientY - r.top - r.height / 2) * .3)));
      });
      b.addEventListener("pointerleave", function(){ qx(0); qy(0); });
    });
  }

  if (!ST) return;
  h.classList.add("sc");
  function $$(sel, root){ return Array.prototype.slice.call((root || d).querySelectorAll(sel)); }
  function S(trigger, start, end, x){ var o = { trigger:trigger, start:start, end:end, scrub:.6, invalidateOnRefresh:true }; for (var k in x || {}) o[k] = x[k]; return o; }
  function reveal(sel, kids, from){
    $$(sel).forEach(function(box){
      var els = box.querySelectorAll(kids); if (!els.length) return;
      if (box.getBoundingClientRect().top < w.innerHeight * .9) return;
      G.fromTo(els, from, { opacity:1, x:0, y:0, scale:1, duration:.6, ease:E, stagger:.07, clearProps:"transform,opacity",
        scrollTrigger:{ trigger:box, start:"top 88%", once:true } });
    });
  }
  function words(el){
    if (el.querySelector(".wi")) return el.querySelectorAll(".wi");
    return splitTitle(el);
  }

  var mm = G.matchMedia();
  var sec = d.getElementById("eventos-pasados"), rail = d.getElementById("archRail");
  if (sec && rail){
    mm.add("(min-width: 1024px)", function(){
      var user = false, idle = 0, st;
      function dist(){ return Math.max(0, rail.scrollWidth - rail.clientWidth); }
      sec.classList.add("hpin");
      rail.scrollLeft = 0;
      st = ST.create({ trigger:sec, pin:true, anticipatePin:1, invalidateOnRefresh:true,
        start:function(){ return sec.offsetHeight > w.innerHeight ? "top top" : "center center"; },
        end:function(){ return "+=" + dist(); },
        onUpdate:function(self){ if (!user) rail.scrollLeft = self.progress * dist(); },
        onRefresh:function(self){ if (!user) rail.scrollLeft = self.progress * dist(); } });
      function sync(){
        var dd = dist();
        if (dd && st.end > st.start){
          var y = st.start + Math.min(1, rail.scrollLeft / dd) * (st.end - st.start);
          if (Math.abs(w.scrollY - y) > 1 && w.scrollY >= st.start - w.innerHeight && w.scrollY <= st.end + w.innerHeight) w.scrollTo({ top:y, behavior:"instant" });
        }
        w.requestAnimationFrame(function(){ user = false; });
      }
      function arm(){ user = true; clearTimeout(idle); idle = setTimeout(sync, 1500); }
      function onScroll(){ if (user){ clearTimeout(idle); idle = setTimeout(sync, 140); } }
      function onWheel(e){ if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) arm(); }
      var nav = sec.querySelector(".sl-nav");
      rail.addEventListener("pointerdown", arm);
      rail.addEventListener("keydown", arm);
      rail.addEventListener("wheel", onWheel, { passive:true });
      rail.addEventListener("scroll", onScroll, { passive:true });
      if (nav) nav.addEventListener("click", arm, true);
      return function(){
        rail.removeEventListener("pointerdown", arm); rail.removeEventListener("keydown", arm);
        rail.removeEventListener("wheel", onWheel); rail.removeEventListener("scroll", onScroll);
        if (nav) nav.removeEventListener("click", arm, true);
        clearTimeout(idle); st.kill(); sec.classList.remove("hpin");
      };
    });
    mm.add("(max-width: 1023px)", function(){ reveal(".rail-track", ":scope > li", { opacity:0, x:28 }); });
  }

  var prog = d.getElementById("sprog");
  if (prog) G.fromTo(prog, { scaleX:0 }, { scaleX:1, ease:"none", scrollTrigger:{ start:0, end:"max", scrub:.25 } });

  var hin = d.querySelector(".h-in");
  if (hin && hero) G.to(hin, { y:-72, opacity:0, ease:"none", scrollTrigger:S(hero, "top top", "72% top") });

  var facts = $$(".facts li");
  var factsBox = d.querySelector(".facts");
  if (facts.length && factsBox && factsBox.getBoundingClientRect().top > w.innerHeight) G.fromTo(facts, { opacity:0, y:26 }, { opacity:1, y:0, ease:"none", stagger:.3, scrollTrigger:S(".facts", "top bottom", "top 58%") });

  $$(".head h2, .band h2").forEach(function(h2){
    var ws = words(h2), head = h2.closest(".head");
    var extra = head ? $$(":scope > div > p, :scope > .sl-nav, :scope > .tlink", head) : [];
    var tl = G.timeline({ scrollTrigger:S(h2, "top 94%", "top 56%") });
    tl.fromTo(ws, { yPercent:112 }, { yPercent:0, ease:"none", stagger:.14 }, 0)
      .fromTo(h2, { "--ln":0 }, { "--ln":1, ease:"none" }, .25);
    if (extra.length) tl.fromTo(extra, { opacity:0, y:14 }, { opacity:1, y:0, ease:"none", stagger:.1 }, .35);
  });

  var tabsEl = d.getElementById("tabs");
  if (tabsEl){
    var tl2 = G.timeline({ scrollTrigger:S(tabsEl, "top 92%", "top 30%") });
    tl2.fromTo(tabsEl, { opacity:0, y:18 }, { opacity:1, y:0, ease:"none", duration:.35 }, 0)
      .fromTo($$("#agenda .panel .fly"), { scale:.94, opacity:.35 }, { scale:1, opacity:1, ease:"none", duration:1 }, .1)
      .fromTo($$("#agenda .panel > div"), { opacity:0, y:34 }, { opacity:1, y:0, ease:"none", duration:.8 }, .25);
  }

  $$(".bento > li").forEach(function(li){
    G.fromTo(li, { clipPath:"inset(14% 9% 14% 9% round 3px)", opacity:.25 }, { clipPath:"inset(0% 0% 0% 0% round 3px)", opacity:1, ease:"none", scrollTrigger:S(li, "top bottom", "top 62%") });
  });

  var bandBox = d.querySelector(".band-grid");
  if (bandBox){
    var bt = G.timeline({ scrollTrigger:S(bandBox, "top 88%", "top 38%") });
    bt.fromTo(bandBox.children[0], { x:function(){ return small.matches ? -32 : -80; }, opacity:0 }, { x:0, opacity:1, ease:"none" }, 0);
    if (bandBox.children[1]) bt.fromTo(bandBox.children[1], { x:function(){ return small.matches ? 32 : 80; }, opacity:0, scale:.97 }, { x:0, opacity:1, scale:1, ease:"none" }, .1);
  }

  var loc = d.querySelector(".loc");
  if (loc){
    var lt = G.timeline({ scrollTrigger:S(loc, "top 90%", "top 40%") });
    lt.fromTo(loc.children[0], { opacity:0, y:40 }, { opacity:1, y:0, ease:"none" }, 0);
    if (loc.children[1]) lt.fromTo(loc.children[1], { opacity:0, x:function(){ return small.matches ? 0 : 60; }, y:function(){ return small.matches ? 40 : 0; }, clipPath:"inset(0% 0% 0% 12% round 3px)" }, { opacity:1, x:0, y:0, clipPath:"inset(0% 0% 0% 0% round 3px)", ease:"none" }, .12);
  }

  var faqs = $$(".faq > details");
  if (faqs.length) G.fromTo(faqs, { opacity:0, y:22 }, { opacity:1, y:0, ease:"none", stagger:.2, scrollTrigger:S(".faq", "top 92%", "top 45%") });

  reveal(".perks", ":scope > li", { opacity:0, y:12 });
  reveal(".loc dl", ":scope > div", { opacity:0, y:14 });
  reveal(".upc", ":scope > li", { opacity:0, y:12 });

  var rt = 0;
  function refresh(){ clearTimeout(rt); rt = setTimeout(function(){ ST.refresh(); }, 180); }
  ["arch", "upc"].forEach(function(id){ var el = d.getElementById(id); if (el && "MutationObserver" in w) new MutationObserver(refresh).observe(el, { childList:true }); });
  if (d.fonts && d.fonts.ready) d.fonts.ready.then(refresh);

  var cssScroll = w.CSS && CSS.supports && CSS.supports("animation-timeline: view()");
  if (!cssScroll){
    var bg = d.querySelector(".hero-bg");
    if (bg) G.to(bg, { yPercent:9, scale:1.08, ease:"none", scrollTrigger:{ trigger:hero, start:"top top", end:"bottom top", scrub:true } });
    Array.prototype.forEach.call(d.querySelectorAll(".bento img"), function(im){
      G.set(im, { "--ps":1.14 });
      G.fromTo(im, { "--py":"-6%" }, { "--py":"6%", ease:"none", scrollTrigger:{ trigger:im.parentNode, start:"top bottom", end:"bottom top", scrub:true } });
    });
  }
  w.addEventListener("load", function(){ ST.refresh(); }, { once:true });
})();
