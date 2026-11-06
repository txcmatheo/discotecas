(function(){
  function drop(img){
    var li = img.closest("li"); if (li) li.remove();
    if (window.__slUpd) window.__slUpd();
  }
  function watch(img){
    if (!img.hasAttribute("data-rm-li") || img.__w) return;
    img.__w = true;
    img.addEventListener("error", function(){ drop(img); });
    if (img.complete && img.naturalWidth === 0) drop(img);
  }
  new MutationObserver(function(list){
    list.forEach(function(m){
      Array.prototype.forEach.call(m.addedNodes, function(n){
        if (n.nodeType !== 1) return;
        if (n.tagName === "IMG") watch(n); else Array.prototype.forEach.call(n.querySelectorAll("img[data-rm-li]"), watch);
      });
    });
  }).observe(document.documentElement, { childList:true, subtree:true });
})();

(function(){
  "use strict";
  var IG = "https://www.instagram.com/cantina70.med/";
  var WA = "https://wa.me/573245642946?text=";
  var FALLBACK_ARRAY = [
    { id:"aquelarre-2026", title:"Aquelarre · Noche de Brujas", date:"2026-10-30T17:00:00-05:00", endDate:"2026-11-02T04:00:00-05:00", dateLabel:"Vie 30 Oct, Sáb 31 Oct y Dom 1 Nov", caption:"Tres noches de Halloween con 7 millones en premios.", image:"img/aquelarre.webp", alt:"Flyer de Aquelarre, noche de brujas en Cantina 70, 30 y 31 de octubre y 1 de noviembre: brujas alrededor de un caldero", permalink:null, isUpcoming:true,
      days:[["Vie","30","Oct"],["Sáb","31","Oct"],["Dom","01","Nov"]], prize:"7 millones en premios" },
    { id:"contentoso-2026-10-24", title:"Contentoso", date:"2026-10-24T17:00:00-05:00", dateLabel:"Sáb 24 Oct", caption:"No cover con reserva hasta las 10:07 p.m.", image:"img/contentoso.webp", alt:"Flyer de Contentoso en Cantina 70, sábado 24 de octubre: calavera mariachi dorada con trompeta", permalink:null, isUpcoming:false },
    { id:"viernes-banda-2026-10-23", title:"Viernes de Banda", date:"2026-10-23T17:00:00-05:00", dateLabel:"Vie 23 Oct", caption:"No cover. 2x1 en botella de licor nacional y José Cuervo hasta las 10:17 p.m.", image:"img/viernes-banda-23oct.webp", alt:"Flyer de Viernes de Banda en Cantina 70, 23 de octubre: calavera dorada con sombrero vaquero", permalink:null, isUpcoming:false },
    { id:"adicta-al-dolor-2026-10-17", title:"Adicta al Dolor", date:"2026-10-17T17:00:00-05:00", dateLabel:"Sáb 17 Oct", caption:"No cover con reserva hasta las 10:07 p.m.", image:"img/adicta-al-dolor.webp", alt:"Flyer de Adicta al Dolor en Cantina 70, sábado 17 de octubre: corazón dorado atravesado por rosas con espinas", permalink:null, isUpcoming:false },
    { id:"viernes-banda-2026-10-16", title:"Viernes de Banda", date:"2026-10-16T17:00:00-05:00", dateLabel:"Vie 16 Oct", caption:"No cover. 2x1 en botella de licor nacional y José Cuervo hasta las 10:17 p.m.", image:"img/viernes-banda-16oct.webp", alt:"Flyer de Viernes de Banda en Cantina 70, 16 de octubre: querubín dorado con trompeta y sombrero", permalink:null, isUpcoming:false },
    { id:"domingo-despecho-2026-10-11", title:"Domingo de Despecho", date:"2026-10-11T17:00:00-05:00", dateLabel:"Dom 11 Oct", caption:"El Relicario en vivo. No cover.", image:"img/domingo-despecho.webp", alt:"Flyer de Domingo de Despecho en Cantina 70, 11 de octubre, con El Relicario en vivo", permalink:null, isUpcoming:false },
    { id:"beneficio-duda-2026-10-10", title:"El Beneficio de la Duda", date:"2026-10-10T17:00:00-05:00", dateLabel:"Sáb 10 Oct", caption:"No cover con reserva hasta las 10:07 p.m.", image:"img/beneficio-duda.webp", alt:"Flyer de El Beneficio de la Duda en Cantina 70, sábado 10 de octubre: corazón dorado con cadenas y candado", permalink:null, isUpcoming:false },
    { id:"viernes-banda-2026-10-09", title:"Viernes de Banda", date:"2026-10-09T17:00:00-05:00", dateLabel:"Vie 9 Oct", caption:"No cover. 2x1 en botella de licor nacional y José Cuervo hasta las 10:17 p.m.", image:"img/viernes-banda-09oct.webp", alt:"Flyer de Viernes de Banda en Cantina 70, 9 de octubre: mujer con sombrero vaquero brindando", permalink:null, isUpcoming:false },
    { id:"aguanile-2026-10-03", title:"Aguanile", date:"2026-10-03T17:00:00-05:00", dateLabel:"Sáb 3 Oct", caption:"No cover con reserva hasta las 10:07 p.m.", image:"img/aguanile.webp", alt:"Flyer de Aguanile en Cantina 70, sábado 3 de octubre: máscara dorada con conchas", permalink:null, isUpcoming:false },
    { id:"viernes-banda-2026-10-02", title:"Viernes de Banda", date:"2026-10-02T17:00:00-05:00", dateLabel:"Vie 2 Oct", caption:"No cover. 2x1 en botella de licor nacional y José Cuervo hasta las 10:17 p.m.", image:"img/viernes-banda-02oct.webp", alt:"Flyer de Viernes de Banda en Cantina 70, 2 de octubre: calavera de toro dorada con sombrero de charro", permalink:null, isUpcoming:false }
  ];

  var STANDING = { id:"viernes-banda-fijo", title:"Viernes de Banda · Todos los viernes", standing:5, caption:"No cover. 2x1 en botella de licor nacional y José Cuervo hasta las 10:17 p.m.", image:"img/viernes-banda-todos.webp", alt:"Flyer de Viernes de Banda de Cantina 70: todos los viernes son de banda" };
  var SITE_URL = "https://cantina70.com/";
  var DAY = 864e5;
  var WD = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  var WDL = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  var MO = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  var MOL = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];
  var rm = window.matchMedia("(prefers-reduced-motion: reduce)");

  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }
  function safeUrl(u){ return (typeof u === "string" && (/^https:\/\//i.test(u) || /^img\/[\w.-]+$/.test(u))) ? u : null; }
  function absUrl(u){ return /^https:/.test(u) ? u : SITE_URL + u; }
  function plainTitle(t){ return String(t || "Evento en Cantina 70").split(" · ").join(", "); }
  function shortTitle(t){ return String(t || "Evento en Cantina 70").split(" · ")[0]; }
  function waFor(text){ return WA + encodeURIComponent("Hola Cantina 70, quiero reservar una mesa para " + text); }
  function ucf(s){ return s.charAt(0).toUpperCase() + s.slice(1); }
  function ico(n){ return '<svg class="ico" aria-hidden="true"><use href="#i-' + n + '"/></svg>'; }
  function chip(n, t){ return '<li><span class="ipill">' + ico(n) + '</span>' + esc(t) + '</li>'; }
  var CHIP_ICO = [[/cover/i,"ticket"],[/2x1|botella|cuervo|ron\b|trago|cóctel/i,"wine"],[/en vivo|cantante|concierto|show/i,"mic-vocal"],[/premio|millones|regalo|sorteo/i,"gift"],[/cumple/i,"cake"],[/halloween|brujas|disfra|fiesta|temátic/i,"party-popper"],[/banda|despecho|popular|música|dj\b/i,"music"],[/reserva/i,"calendar-check"]];
  var CHIP_KEY = /\d+\s*millones en premios|no cover(?: con reserva)?(?: hasta \d{1,2}:\d{2} [ap]\.m\.)?|2x1 en \S+(?: hasta \d{1,2}:\d{2} [ap]\.m\.)?|[^.,]{0,24}en vivo/i;
  function words(t){ return t.split(/\s+/).length; }
  function chipsFor(caption, extra){
    var out = [], seen = {};
    function add(t){
      t = t.replace(/^\s+|[\s.]+$/g, "").replace(/\s+(p|a)\.m$/i, " $1.m.");
      if (!t || words(t) > 7){ var m = t.match(CHIP_KEY); if (!m) return; t = m[0].trim(); }
      t = ucf(t); var k = t.toLowerCase(); if (seen[k] || out.length >= 3) return; seen[k] = 1;
      var n = "sparkles"; for (var i = 0; i < CHIP_ICO.length; i++) if (CHIP_ICO[i][0].test(t)){ n = CHIP_ICO[i][1]; break; }
      out.push(chip(n, t));
    }
    String(caption || "").replace(/\s+de licor nacional y José Cuervo/gi, "").replace(/hasta las /gi, "hasta ").split(/\.\s+(?=[A-ZÁÉÍÓÚÑ¡¿0-9])|\s+·\s+|\n+/).forEach(add);
    if (extra) add(extra);
    return out.join("");
  }

  function nightBase(){ var d = new Date(Date.now() - 4*3600e3); d.setHours(0,0,0,0); return d; }
  function midnight(iso){ var d = new Date(iso); if (isNaN(d)) return null; d.setHours(0,0,0,0); return d; }
  function shortDate(d){ return WD[d.getDay()] + " " + d.getDate() + " " + MO[d.getMonth()]; }
  function longDate(d){ return WDL[d.getDay()] + " " + d.getDate() + " de " + MOL[d.getMonth()]; }
  function label(ev){
    if (ev.dateLabel) return ev.dateLabel;
    var d = ev.date && midnight(ev.date); return d ? shortDate(d) : "Fecha por confirmar";
  }
  function upcoming(ev){
    if (ev.date){ var end = Date.parse(ev.endDate || ev.date); if (!isNaN(end)) return end >= (ev.endDate ? Date.now() : nightBase().getTime()); }
    return ev.isUpcoming !== false;
  }

  function nights(ev){
    var s = ev.date && midnight(ev.date); if (!s) return [];
    var out = [s], e = ev.endDate ? new Date(ev.endDate) : null;
    if (e) for (var t = s.getTime() + DAY; t < e.getTime() - 6*3600e3 && out.length < 4; t += DAY) out.push(new Date(t));
    return out;
  }
  function covers(ev, d){ return nights(ev).some(function(n){ return n.getTime() === d.getTime(); }); }
  function nextOf(wd){ var b = nightBase(); return new Date(b.getTime() + ((wd - b.getDay() + 7) % 7) * DAY); }

  function relLabel(d){
    var n = Math.round((d.getTime() - nightBase().getTime()) / DAY);
    if (n === 0) return "Esta noche";
    if (n > 0 && n < 7) return "Este " + WDL[d.getDay()];
    return "Próximo evento";
  }

  function eventsLd(evs){
    try {
      var place = { "@type":"Place", name:"Cantina 70", address:{ "@type":"PostalAddress", streetAddress:"Carrera 70 #44B", addressLocality:"Medellín", addressRegion:"Antioquia", addressCountry:"CO" } };
      var items = evs.filter(function(ev){ return ev.date && ev._up; }).map(function(ev){
        var start = new Date(ev.date), end = ev.endDate ? new Date(ev.endDate) : new Date(start.getTime() + 11*3600e3);
        var o = { "@context":"https://schema.org", "@type":"Event", name:String(ev.title||"Evento en Cantina 70"), description:String(ev.caption||"").slice(0,300),
          startDate:ev.date, endDate:ev.endDate || end.toISOString(), eventStatus:"https://schema.org/EventScheduled",
          eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode", location:place,
          organizer:{ "@type":"Organization", name:"Cantina 70", url:SITE_URL } };
        var img = safeUrl(ev.image); if (img) o.image = absUrl(img);
        if (safeUrl(ev.permalink)) o.url = ev.permalink;
        return o;
      });
      var old = $("ldEventsDyn"); if (old) old.remove();
      if (!items.length) return;
      var st = $("ldEventsStatic"); if (st) st.remove();
      var sc = document.createElement("script"); sc.type = "application/ld+json"; sc.id = "ldEventsDyn";
      sc.textContent = JSON.stringify(items); document.head.appendChild(sc);
    } catch(e){}
  }

  function renderHero(ev){
    var first = ev._night || nights(ev)[0];
    $("heroTag").textContent = first ? relLabel(first) : "Próximo evento";
    $("heroName").textContent = shortTitle(ev.title);
    $("heroDate").textContent = ev._night ? shortDate(ev._night) : label(ev).replace(/, /g, " · ").replace(/ y /, " · ");
    var ch = chipsFor(ev.caption, ev.prize); $("heroNote").innerHTML = ch; $("heroNote").hidden = !ch;
    var name = ev._night ? "el " + shortTitle(ev.title).toLowerCase() + " (" + longDate(ev._night) + ")" : plainTitle(ev.title);
    $("heroWa").href = waFor(name);
    setCountdown(ev);
  }

  var cdNights = [], cdName = "", cdT = null;
  function pad(n){ return (n < 10 ? "0" : "") + n; }
  function ymd(d){ return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate()); }
  function opensAt(d){ return Date.parse(ymd(d) + "T17:00:00-05:00"); }
  function bogNow(){ var b = new Date(Date.now() - 5*3600e3); return { wd:b.getUTCDay(), h:b.getUTCHours(), day:b.toISOString().slice(0, 10) }; }

  function clubOpen(b){ return (b.h >= 17 && [4,5,6,0].indexOf(b.wd) > -1) || (b.h < 4 && [5,6,0,1].indexOf(b.wd) > -1); }
  function plural(n, s, p){ return n + " " + (n === 1 ? s : p); }
  function tickCd(){
    var el = $("heroCd"); if (!el) return;
    var now = Date.now(), b = bogNow(), t = null, night = null;
    for (var i = 0; i < cdNights.length; i++){ var o = opensAt(cdNights[i]); if (o + 11*3600e3 > now){ t = o; night = cdNights[i]; break; } }
    var k, v, aria;
    if (clubOpen(b) || (t !== null && now >= t)){ k = "Cantina abierta ahora"; v = "hasta las 4 a.m."; aria = "Cantina 70 está abierta ahora, hasta las 4 a.m."; }
    else if (t !== null && ymd(night) === b.day){ k = "Hoy"; v = "desde las 5 p.m."; aria = "Hoy desde las 5 p.m."; }
    else if (t !== null){
      var m = Math.ceil((t - now) / 6e4), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60), mi = m % 60;
      k = "Faltan";
      v = d ? d + " d " + pad(h) + " h " + pad(mi) + " min" : h ? h + " h " + pad(mi) + " min" : mi + " min";
      var parts = []; if (d) parts.push(plural(d, "día", "días")); if (d || h) parts.push(plural(h, "hora", "horas")); parts.push(plural(mi, "minuto", "minutos"));
      aria = "Faltan " + (parts.length > 1 ? parts.slice(0, -1).join(", ") + " y " + parts[parts.length - 1] : parts[0]) + " para " + cdName;
    } else { el.textContent = ""; el.removeAttribute("aria-label"); return; }
    el.innerHTML = '<span class="cd-k">' + esc(k) + '</span><span>' + esc(v) + '</span>';
    el.setAttribute("aria-label", aria);
  }
  function startCd(){
    clearInterval(cdT); cdT = null;
    if (document.hidden) return;
    tickCd(); cdT = setInterval(tickCd, 30000);
  }
  function setCountdown(ev){
    cdNights = ev._night ? [ev._night] : nights(ev);
    cdName = shortTitle(ev.title);
    startCd();
  }
  document.addEventListener("visibilitychange", startCd);

  var tabs = Array.prototype.slice.call(document.querySelectorAll("#tabs [role=tab]"));
  function select(tab, focus){
    tabs.forEach(function(t){
      var on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      $(t.getAttribute("aria-controls")).hidden = !on;
    });
    if (focus) tab.focus();
  }
  tabs.forEach(function(t, i){
    t.addEventListener("click", function(){ select(t, false); });
    t.addEventListener("keydown", function(e){
      var j = null;
      if (e.key === "ArrowRight") j = (i + 1) % tabs.length;
      else if (e.key === "ArrowLeft") j = (i - 1 + tabs.length) % tabs.length;
      else if (e.key === "Home") j = 0;
      else if (e.key === "End") j = tabs.length - 1;
      if (j !== null){ e.preventDefault(); select(tabs[j], true); }
    });
  });
  function renderWeek(upc){
    var best = null, bestT = Infinity;
    tabs.forEach(function(t){
      var wd = +t.getAttribute("data-day"), d = nextOf(wd), p = $(t.getAttribute("aria-controls"));
      var today = d.getTime() === nightBase().getTime();
      t.querySelector("[data-when]").textContent = today ? "Hoy" : d.getDate() + " " + MO[d.getMonth()];
      if (d.getTime() < bestT){ bestT = d.getTime(); best = t; }
      var sp = upc.filter(function(ev){ return covers(ev, d); })[0];
      var nm = p.querySelector("[data-name-el]"), fx = p.querySelector("[data-facts-el]"), def = fx.__def || (fx.__def = fx.innerHTML), im = p.querySelector("[data-img-el]"), fig = im.parentNode, ig = p.querySelector("[data-ig]");
      p.querySelector("[data-when-el]").textContent = (today ? "Hoy, " : "") + ucf(longDate(d));
      var old = t.querySelector(".dot"); if (old) old.remove();
      if (sp && safeUrl(sp.image)){
        nm.textContent = shortTitle(sp.title);
        fx.innerHTML = chipsFor(sp.caption, sp.prize) || chip("sparkles", plainTitle(sp.title));
        im.src = safeUrl(sp.image); im.alt = sp.alt || ("Flyer de " + plainTitle(sp.title) + " en Cantina 70");
        fig.classList.remove("ph");
        ig.href = safeUrl(sp.permalink) || IG; ig.hidden = false;
        var dot = document.createElement("span"); dot.className = "dot"; dot.setAttribute("aria-hidden", "true"); t.querySelector("b").appendChild(dot);
      } else {
        nm.textContent = p.getAttribute("data-name");
        fx.innerHTML = def;
        var src = p.getAttribute("data-img"); if (im.getAttribute("src") !== src) im.src = src;
        im.alt = p.getAttribute("data-alt");
        fig.classList.toggle("ph", !p.hasAttribute("data-flyer"));
        ig.hidden = true;
      }
      var wa = p.querySelector("[data-wa]");
      wa.href = waFor("el " + longDate(d) + (sp ? " (" + shortTitle(sp.title) + ")" : ""));
      wa.setAttribute("aria-label", "Reservar mesa para el " + longDate(d));
    });
    if (best) select(best, false);
  }

  function renderUpcoming(list){
    $("upc").innerHTML = list.map(function(ev){
      var title = shortTitle(ev.title);
      return '<li><span class="u-d">' + ico("calendar") + esc(label(ev)) + '</span>' +
        '<p class="u-n"><a href="' + esc(safeUrl(ev.permalink) || IG) + '" target="_blank" rel="noopener">' + esc(plainTitle(ev.title)) + '</a></p>' +
        '<a class="tlink" href="' + esc(waFor(plainTitle(ev.title))) + '" target="_blank" rel="noopener" aria-label="Reservar mesa para ' + esc(title) + '">' + ico("message-circle") + 'Reservar</a></li>';
    }).join("");
    $("upcWrap").hidden = !list.length;
  }

  var Slider = (function(){
    var rail = $("archRail"), prev = $("slPrev"), next = $("slNext"), nav = prev && prev.parentNode;
    if (!rail || !prev || !next) return { reset:function(){}, update:function(){} };
    function items(){ return rail.querySelectorAll(".rail-track > li"); }
    function step(){
      var li = items()[0]; if (!li) return rail.clientWidth;
      var gap = parseFloat(getComputedStyle(li.parentNode).columnGap) || 0;
      return li.getBoundingClientRect().width + gap;
    }
    function maxX(){ return Math.max(0, rail.scrollWidth - rail.clientWidth); }
    function update(){
      var x = rail.scrollLeft, m = maxX();
      prev.disabled = x <= 2;
      next.disabled = x >= m - 2;
      if (nav) nav.hidden = m <= 2;
    }
    function go(left){ rail.scrollTo({ left:Math.max(0, Math.min(maxX(), left)), behavior: rm.matches ? "auto" : "smooth" }); }
    function page(dir){
      var s = step(), gap = parseFloat(getComputedStyle(rail.firstElementChild).columnGap) || 0;
      var n = Math.max(1, Math.floor((rail.clientWidth + gap + 2) / s));
      go((Math.round(rail.scrollLeft / s) + dir * n) * s);
    }
    prev.addEventListener("click", function(){ page(-1); });
    next.addEventListener("click", function(){ page(1); });
    rail.addEventListener("scroll", update, { passive:true });
    window.addEventListener("resize", update);
    rail.addEventListener("keydown", function(e){
      if (e.target !== rail) return;
      var s = step();
      if (e.key === "ArrowRight"){ e.preventDefault(); go((Math.round(rail.scrollLeft / s) + 1) * s); }
      else if (e.key === "ArrowLeft"){ e.preventDefault(); go((Math.round(rail.scrollLeft / s) - 1) * s); }
      else if (e.key === "Home"){ e.preventDefault(); go(0); }
      else if (e.key === "End"){ e.preventDefault(); go(maxX()); }
    });

    var down = false, dragging = false, sx = 0, sl = 0, pid = null, block = false, vx = 0, lx = 0, lt = 0;
    rail.addEventListener("pointerdown", function(e){
      if (e.pointerType !== "mouse" || e.button !== 0) return;
      down = true; dragging = false; sx = e.clientX; sl = rail.scrollLeft; pid = e.pointerId; vx = 0; lx = e.clientX; lt = e.timeStamp;
    });
    rail.addEventListener("pointermove", function(e){
      if (!down || e.pointerId !== pid) return;
      var dx = e.clientX - sx;
      if (!dragging && Math.abs(dx) > 6){ dragging = true; rail.classList.add("drag"); try { rail.setPointerCapture(pid); } catch(_){} }
      if (dragging){ e.preventDefault(); rail.scrollLeft = sl - dx; var dt = e.timeStamp - lt; if (dt > 0){ vx = vx * .6 + ((e.clientX - lx) / dt) * .4; lx = e.clientX; lt = e.timeStamp; } }
    });
    function end(e){
      if (!down || (e && e.pointerId !== pid)) return;
      down = false;
      if (!dragging) return;
      dragging = false; block = true; setTimeout(function(){ block = false; }, 0);
      try { rail.releasePointerCapture(pid); } catch(_){}
      var x = rail.scrollLeft, s = step();
      rail.classList.remove("drag");
      rail.scrollLeft = x;
      var fling = rm.matches || performance.now() - lt > 120 ? 0 : Math.max(-1.6, Math.min(1.6, vx)) * 260;
      go(Math.round((x - fling) / s) * s);
    }
    rail.addEventListener("pointerup", end);
    rail.addEventListener("pointercancel", end);
    rail.addEventListener("lostpointercapture", end);
    rail.addEventListener("click", function(e){ if (block){ e.preventDefault(); e.stopPropagation(); block = false; } }, true);
    rail.addEventListener("dragstart", function(e){ e.preventDefault(); });
    function reset(){ rail.scrollLeft = 0; update(); }
    update();
    return { reset:reset, update:update };
  })();
  window.__slUpd = Slider.update;

  function renderArchive(past, meta){
    var arch = $("arch");
    var list = past.filter(function(ev){ return safeUrl(ev.image); }).slice(0, 12);
    arch.innerHTML = list.map(function(ev){
      var link = safeUrl(ev.permalink) || IG, title = shortTitle(ev.title);
      return '<li><a href="' + esc(link) + '" target="_blank" rel="noopener" aria-label="' + esc(title + ", " + label(ev)) + ', en Instagram">' +
        '<figure class="fly"><img src="' + esc(safeUrl(ev.image)) + '" alt="' + esc(ev.alt || ("Flyer de " + plainTitle(ev.title) + " en Cantina 70")) + '" width="831" height="1110" loading="lazy" decoding="async" referrerpolicy="no-referrer" data-rm-li></figure>' +
        '<p><b>' + esc(title) + '</b><span>' + ico("calendar") + esc(label(ev)) + '</span></p></a></li>';
    }).join("");
    $("eventos-pasados").hidden = !list.length;
    Slider.reset();
    arch.setAttribute("data-source", meta.source === "instagram" ? "instagram" : "fallback");
    if (meta.updated) arch.setAttribute("data-updated", meta.updated);
  }

  function render(events, meta){
    meta = meta || {};
    var evs = (events || []).slice();
    if (!evs.length) evs = FALLBACK_ARRAY.slice();
    evs.forEach(function(ev){ ev._up = upcoming(ev); });
    var upc = evs.filter(function(e){ return e._up; }).sort(function(a,b){ return (Date.parse(a.date)||0) - (Date.parse(b.date)||0); });
    var past = evs.filter(function(e){ return !e._up; }).sort(function(a,b){ return (Date.parse(b.date)||0) - (Date.parse(a.date)||0); });

    var fri = nextOf(5), weekEnd = nightBase().getTime() + 7*DAY;
    var soon = upc.filter(function(ev){ var n = nights(ev)[0]; return n && n.getTime() < weekEnd; })[0];
    try { renderHero(soon || Object.assign({}, STANDING, { _night:fri })); } catch(e){}
    try { renderWeek(upc); } catch(e){}
    try {
      renderUpcoming(upc.filter(function(ev){ var n = nights(ev)[0]; return !n || n.getTime() >= weekEnd; }).slice(0, 6));
    } catch(e){}
    try { renderArchive(past, meta); } catch(e){}
    eventsLd(evs);
  }

  try {
    if (window.IGEvents && typeof window.IGEvents.load === "function") {
      window.IGEvents.load({ club:"cantina-70", fallback:FALLBACK_ARRAY })
        .then(function(r){ render(r && r.events, r); })
        .catch(function(){ render(FALLBACK_ARRAY, {source:"fallback"}); });
    } else {
      render(FALLBACK_ARRAY, {source:"fallback"});
    }
  } catch(e){ render(FALLBACK_ARRAY, {source:"fallback"}); }

  $("yr").textContent = new Date().getFullYear();

  var rv = document.querySelectorAll(".rv:not(.in)");
  if (rm.matches || !("IntersectionObserver" in window)) Array.prototype.forEach.call(rv, function(el){ el.classList.add("in"); });
  else {
    var io = new IntersectionObserver(function(en){
      en.forEach(function(x){ if (x.isIntersecting){ x.target.classList.add("in"); io.unobserve(x.target); } });
    }, { rootMargin:"0px 0px -8% 0px" });
    Array.prototype.forEach.call(rv, function(el){ io.observe(el); });
  }

  var bar = $("topbar"), burger = $("burger"), drawer = $("drawer"), ico = $("burgerIco"), hero = $("hero");
  var bbar = $("bbarWa"), toTop = $("toTop"), root = document.documentElement;
  var bbOn = null, ttOn = null;
  function onScroll(){
    var y = window.scrollY;
    bar.classList.toggle("solid", y > 24 || drawer.classList.contains("open"));
    var past = y > hero.offsetHeight - 80;
    if (past !== bbOn){ bbOn = past; root.classList.toggle("bb-on", past); bbar.tabIndex = past ? 0 : -1; }
    var s = y > 600;
    if (s !== ttOn){ ttOn = s; toTop.classList.toggle("show", s); toTop.setAttribute("aria-hidden", s ? "false" : "true"); toTop.tabIndex = s ? 0 : -1; }
  }
  window.addEventListener("scroll", onScroll, { passive:true });
  window.addEventListener("resize", onScroll);
  onScroll();
  toTop.addEventListener("click", function(){
    window.scrollTo({ top:0, behavior: rm.matches ? "auto" : "smooth" });
    var t = document.querySelector(".top a"); if (t) t.focus({ preventScroll:true });
  });

  function setMenu(open){
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    ico.setAttribute("d", open ? "M5 5l14 14M19 5L5 19" : "M3 7h18M3 12h18M3 17h18");
    drawer.classList.toggle("open", open);
    root.classList.toggle("menu-open", open);
    root.style.overflow = open ? "hidden" : "";
    onScroll();
    if (open) { var f = drawer.querySelector("a"); if (f) setTimeout(function(){ f.focus({ preventScroll:true }); }, 30); }
  }
  burger.addEventListener("click", function(){ setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  drawer.addEventListener("click", function(e){ if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function(e){
    if (!drawer.classList.contains("open")) return;
    if (e.key === "Escape") { setMenu(false); burger.focus(); return; }
    if (e.key === "Tab") {
      var links = drawer.querySelectorAll("a"), last = links[links.length - 1];
      if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); burger.focus(); }
      else if (e.shiftKey && document.activeElement === burger) { e.preventDefault(); last.focus(); }
    }
  });
  var mqDesk = window.matchMedia("(min-width: 1101px)");
  var closeOnDesk = function(){ if (mqDesk.matches && drawer.classList.contains("open")) setMenu(false); };
  if (mqDesk.addEventListener) mqDesk.addEventListener("change", closeOnDesk); else if (mqDesk.addListener) mqDesk.addListener(closeOnDesk);
})();

(function(){
  "use strict";
  var w = window, d = document;
  var box = d.getElementById("map"), host = d.getElementById("mapGl"), sec = d.getElementById("llegar"), tpl = d.getElementById("mapPop");
  if (!box || !host || !sec || !("IntersectionObserver" in w)) return;
  var CDN = "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/";
  var TILES = "https://tile.openstreetmap.org/{z}/{x}/{y}.png";
  var ATTR = '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a>';
  var lng = +box.getAttribute("data-lng"), lat = +box.getAttribute("data-lat");
  var rmq = w.matchMedia("(prefers-reduced-motion: reduce)");
  var desk = w.matchMedia("(hover: hover) and (pointer: fine) and (min-width: 861px)");
  var ZOOM = 16;
  var map = null, mk = null, ready = false, flown = false, seen = false, asked = false;

  function inject(){
    if (asked) return; asked = true;
    if (w.L && w.L.map){ init(); return; }
    var l = d.createElement("link"); l.rel = "stylesheet"; l.href = CDN + "leaflet.min.css"; d.head.appendChild(l);
    var s = d.createElement("script"); s.src = CDN + "leaflet.min.js"; s.async = true;
    s.addEventListener("load", init);
    d.head.appendChild(s);
  }
  function target(){
    var L = w.L, sh = Math.round(Math.min(110, host.clientHeight * .24));
    return map.unproject(map.project(L.latLng(lat, lng), ZOOM).subtract(L.point(0, sh)), ZOOM);
  }
  function openDesk(){ if (desk.matches && mk) mk.openPopup(); }
  function fly(){
    if (!ready || flown || !seen) return;
    flown = true;
    if (rmq.matches){ openDesk(); return; }
    map.once("moveend", openDesk);
    map.flyTo(target(), ZOOM, { duration:1.6, easeLinearity:.2 });
  }
  function init(){
    var L = w.L; if (!L || !L.map || map) return;
    var still = rmq.matches;
    try {
      map = L.map(host, { zoomControl:false, scrollWheelZoom:false, dragging:!L.Browser.mobile, tap:false, zoomSnap:.25, fadeAnimation:!still, zoomAnimation:!still, markerZoomAnimation:!still });
      map.setView([lat, lng], still ? ZOOM : 13, { animate:false });
      if (still) map.setView(target(), ZOOM, { animate:false });
    } catch(e){ map = null; return; }
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
    L.control.zoom({ position:"bottomleft", zoomInTitle:"Acercar", zoomOutTitle:"Alejar" }).addTo(map);
    var ok = 0, tiles = L.tileLayer(TILES, { maxZoom:19, attribution:ATTR });
    tiles.on("tileload", function(){ ok++; });
    tiles.on("load", function(){
      if (ready || !ok) return;
      ready = true; box.classList.add("ready");
      fly();
    });
    tiles.addTo(map);
    var icon = L.divIcon({ className:"mk mk-live", iconSize:[56, 64], iconAnchor:[28, 60], popupAnchor:[0, -56],
      html:'<span class="mk-ring" aria-hidden="true"></span><span class="mk-pin" aria-hidden="true"><span class="mk-70">70</span></span>' });
    mk = L.marker([lat, lng], { icon:icon, keyboard:true, riseOnHover:false }).addTo(map);
    var body = d.createElement("div");
    if (tpl && tpl.content) body.appendChild(tpl.content.cloneNode(true));
    mk.bindPopup(body, { className:"c70-pop", maxWidth:Math.min(320, window.innerWidth - 56), minWidth:Math.min(280, window.innerWidth - 56), closeButton:true, autoPan:true, autoPanPaddingTopLeft:L.point(16, 12), autoPanPaddingBottomRight:L.point(64, 40) });
    var el = mk.getElement();
    if (el) el.setAttribute("aria-label", "Cantina 70: horario y cómo llegar");
    map.on("popupopen", function(e){
      var c = e.popup.getElement() && e.popup.getElement().querySelector(".leaflet-popup-close-button");
      if (c) c.setAttribute("aria-label", "Cerrar");
    });
    host.setAttribute("role", "region");
    host.setAttribute("aria-label", "Mapa: Cantina 70, Carrera 70 #44B, Laureles");
  }
  new IntersectionObserver(function(en, o){ if (en[0].isIntersecting){ o.disconnect(); inject(); } }, { rootMargin:"600px 0px" }).observe(sec);
  new IntersectionObserver(function(en, o){ if (en[0].isIntersecting){ seen = true; o.disconnect(); fly(); } }, { threshold:.35 }).observe(box);
})();
