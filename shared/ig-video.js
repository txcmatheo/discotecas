(function () {
  if (window.IGVideo) return;
  var reduce = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  var saveData = navigator.connection && navigator.connection.saveData;
  var byPoster = {};
  var io = "IntersectionObserver" in window ? new IntersectionObserver(function (entries) {
    entries.forEach(function (en) {
      var v = en.target;
      if (en.isIntersecting) {
        if (!v.src && v.dataset.src) v.src = v.dataset.src;
        var p = v.play(); if (p && p.catch) p.catch(function () {});
      } else if (!v.paused) v.pause();
    });
  }, { rootMargin: "200px 0px" }) : null;

  function upgrade(img) {
    if (!img || img.__igv || img.hidden || img.closest("header, footer, nav, .lockup, .brand")) return;
    var src = img.getAttribute("src");
    var url = src && byPoster[src];
    if (!url) return;
    img.__igv = true;
    var v = document.createElement("video");
    v.className = img.className;
    v.muted = true; v.defaultMuted = true; v.loop = true; v.playsInline = true;
    v.setAttribute("muted", ""); v.setAttribute("playsinline", ""); v.setAttribute("loop", "");
    v.preload = "none";
    v.poster = src;
    v.dataset.src = url;
    v.setAttribute("aria-label", img.getAttribute("alt") || "");
    v.setAttribute("disablepictureinpicture", "");
    var cs = getComputedStyle(img);
    ["display", "position", "top", "right", "bottom", "left", "width", "height", "objectFit", "objectPosition", "zIndex", "borderRadius", "aspectRatio", "background"].forEach(function (k) { v.style[k] = cs[k]; });
    if (cs.display === "inline") v.style.display = "block";
    v.addEventListener("error", function () { if (v.parentNode) v.parentNode.replaceChild(img, v); img.__igv = true; });
    ["width", "height"].forEach(function (a) { if (img.hasAttribute(a)) v.setAttribute(a, img.getAttribute(a)); });
    v.classList.add("ig-video");
    img.parentNode.replaceChild(v, img);
    if (io) io.observe(v); else { v.src = url; v.play && v.play(); }
  }

  function scan(root) {
    Array.prototype.forEach.call((root || document).querySelectorAll("img"), upgrade);
  }

  function register(events) {
    if (reduce || saveData) return;
    (events || []).forEach(function (e) {
      if (!e || !e.video || !e.image) return;
      var u; try { u = new URL(e.video, location.href); } catch (x) { return; }
      if (u.protocol === "https:" || u.origin === location.origin) byPoster[e.image] = u.href;
    });
    if (!Object.keys(byPoster).length) return;
    scan(document);
  }

  new MutationObserver(function (list) {
    if (!Object.keys(byPoster).length) return;
    list.forEach(function (m) {
      if (m.type === "attributes") { upgrade(m.target); return; }
      Array.prototype.forEach.call(m.addedNodes, function (n) {
        if (n.nodeType !== 1) return;
        if (n.tagName === "IMG") upgrade(n); else scan(n);
      });
    });
  }).observe(document.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ["src"] });

  window.IGVideo = { register: register };
})();
