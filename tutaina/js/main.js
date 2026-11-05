(function(){
  function broken(img){ return img.complete && img.naturalWidth === 0 && img.getAttribute("src"); }
  function hide(){ this.hidden = true; }
  function watch(img){
    if (img.__w) { if (broken(img)) img.hidden = true; return; }
    img.__w = true; img.addEventListener("error", hide);
    if (broken(img)) img.hidden = true;
  }
  Array.prototype.forEach.call(document.images, watch);
  new MutationObserver(function(list){
    list.forEach(function(m){
      if (m.type === "attributes" && m.target.tagName === "IMG") { watch(m.target); return; }
      Array.prototype.forEach.call(m.addedNodes, function(n){
        if (n.nodeType !== 1) return;
        if (n.tagName === "IMG") watch(n); else Array.prototype.forEach.call(n.querySelectorAll("img"), watch);
      });
    });
  }).observe(document.documentElement, { childList:true, subtree:true, attributes:true, attributeFilter:["src"] });
})();
(function(){
  "use strict";
  var IG = "https://www.instagram.com/tutaina.ejecafetero/";
  var WA = "https://wa.me/573011265132?text=";
  var SITE_URL = "https://discotecatutaina.com/";
  var UP = "https://discotecatutaina.com/wp-content/uploads/";

  var FALLBACK_ARRAY = [
    {id:"el-linaje-2026", title:"El linaje · Halloween de vampiros", date:"2026-10-30T21:30:00-05:00", endDate:"2026-11-02T04:00:00-05:00", dateLabel:"30 Oct / 31 Oct / 01 Nov",
     caption:"Tres noches de disfraz y 10 millones en premios. ¿Ya tienes el disfraz?",
     image:UP+"2026/10/845543157_18645709429044927_1256940028921947836_n.webp", alt:"Flyer de El linaje, Halloween de vampiros en Tutaina Pereira, 30 y 31 de octubre y 1 de noviembre", permalink:"https://discotecatutaina.com/eventos/el-linaje/", isUpcoming:true},
    {"id": "viernes-agropecuario-2026-10-22", "title": "Viernes agropecuario", "date": "2026-10-22", "dateLabel": "22 Oct", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/10/viernes-agropecuario.webp", "permalink": null, "isUpcoming": false},
    {"id": "jueves-de-barra-libre-2026-10-21", "title": "Jueves de barra libre", "date": "2026-10-21", "dateLabel": "21 Oct", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/10/jueves-de-barra-libre.webp", "permalink": null, "isUpcoming": false},
    {"id": "viernes-agropecuario-2026-10-15", "title": "Viernes Agropecuario", "date": "2026-10-15", "dateLabel": "15 Oct", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/05/849396826_18646455409044927_3895221531282164687_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "jueves-barra-libre-2026-10-14", "title": "Jueves Barra Libre", "date": "2026-10-14", "dateLabel": "14 Oct", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/09/848832529_18646101844044927_2103373359010967113_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-en-la-perla-2026-10-02", "title": "Perreo en La Perla", "date": "2026-10-02", "dateLabel": "2 Oct", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/07/830349657_18641101447044927_3931924381538741590_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "modo-bestial-2026-09-25", "title": "Modo Bestial", "date": "2026-09-25", "dateLabel": "25 Sep", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/11/822807404_18638502229044927_8821689214694124831_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "fuck-you-cupido-2026-09-18", "title": "Fuck You Cupido", "date": "2026-09-18", "dateLabel": "18 Sep", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/09/812729239_18636000424044927_1064566886653928694_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "contentoso-2026-09-11", "title": "Contentoso", "date": "2026-09-11", "dateLabel": "11 Sep", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/09/Contentoso.webp", "permalink": null, "isUpcoming": false},
    {"id": "simulacro-fiestas-de-la-cosecha-2026-09-04", "title": "SIMULACRO FIESTAS DE LA COSECHA", "date": "2026-09-04", "dateLabel": "4 Sep", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/07/La-cosecha-vive.webp", "permalink": null, "isUpcoming": false},
    {"id": "tury-en-vivo-2026-08-06", "title": "TURY EN VIVO", "date": "2026-08-06", "dateLabel": "6 Ago", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/07/761250140_18618203179044927_3582782029395242613_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "sobrevivire-2026-07-24", "title": "Sobreviviré", "date": "2026-07-24", "dateLabel": "24 Jul", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/09/758274228_18616903348044927_700637193177002128_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "domingos-de-vallenato-y-popular-2026-07-18", "title": "DOMINGOS DE VALLENATO Y POPULAR", "date": "2026-07-18", "dateLabel": "18 Jul", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/06/753204716_18614983411044927_2104106900717520668_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-belico-2026-07-17", "title": "PERREO BÉLICO", "date": "2026-07-17", "dateLabel": "17 Jul", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/07/752524577_18614615617044927_5055893552521791618_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "carabin3-en-vivo-2026-07-16", "title": "Carabin3 En Vivo", "date": "2026-07-16", "dateLabel": "16 Jul", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/07/729205054_18606776299044927_3199144371742332090_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-awoo-2026-07-10", "title": "Perreo AWOO", "date": "2026-07-10", "dateLabel": "10 Jul", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/11/744994354_18612350296044927_4652323020096248072_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "colombia-vs-suiza-2026-07-06", "title": "COLOMBIA VS SUIZA", "date": "2026-07-06", "dateLabel": "6 Jul", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/07/731445255_18610317913044927_1454996678988597973_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "colombia-vs-portugal-2026-06-26", "title": "COLOMBIA VS PORTUGAL", "date": "2026-06-26", "dateLabel": "26 Jun", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/06/729995918_18607090501044927_4601708073329131947_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "colombia-vs-rd-congo-2026-06-22", "title": "COLOMBIA VS RD CONGO", "date": "2026-06-22", "dateLabel": "22 Jun", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/06/726758632_18605045854044927_2149036848704077637_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "colombia-vs-uzbekistan-2026-06-16", "title": "COLOMBIA VS UZBEKISTÁN", "date": "2026-06-16", "dateLabel": "16 Jun", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/06/723190873_18603394996044927_1744146064161329211_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "birthday-bash-2026-05-16", "title": "birthday bash", "date": "2026-05-16", "dateLabel": "16 May", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/05/695846176_1337255718280918_3029217507236107935_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "soltero-feliz-2026-05-15", "title": "SOLTERO FELIZ", "date": "2026-05-15", "dateLabel": "15 May", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/09/696540758_18593312344044927_7510392842504925367_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-presidencial-2026-05-14", "title": "PERREO PRESIDENCIAL", "date": "2026-05-14", "dateLabel": "14 May", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/05/696272878_18593854234044927_552939882461731215_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "viernes-de-banda-2026-04-30", "title": "Viernes de Banda", "date": "2026-04-30", "dateLabel": "30 Abr", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/04/684049967_18589001701044927_2681257450126563757_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "billete-grande-2026-04-24", "title": "Billete Grande", "date": "2026-04-24", "dateLabel": "24 Abr", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/04/671186292_18587123296044927_5784663582628011477_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-agropecuario-2-0-2026-04-23", "title": "Perreo Agropecuario 2.0", "date": "2026-04-23", "dateLabel": "23 Abr", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/04/670839426_18585230785044927_5003974128564608989_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "coqueta-2026-04-17", "title": "Coqueta", "date": "2026-04-17", "dateLabel": "17 Abr", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/04/672292343_18585661666044927_5406604954650319600_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "me-bebi-tu-recuerdo-2026-04-16", "title": "Me Bebí Tu Recuerdo", "date": "2026-04-16", "dateLabel": "16 Abr", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/09/671192401_18585428815044927_5429942487536939036_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "como-oreo-2026-04-09", "title": "Como Oreo", "date": "2026-04-09", "dateLabel": "9 Abr", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/04/661710558_18583380907044927_5976768553940828350_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "cuanto-vale-2026-04-03", "title": "Cuánto Vale", "date": "2026-04-03", "dateLabel": "3 Abr", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/04/658534155_18582005590044927_775064851766860800_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "despecho-y-perreo-2026-04-02", "title": "Despecho y Perreo", "date": "2026-04-02", "dateLabel": "2 Abr", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/04/658879704_18582522058044927_4806762005794684517_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "200-copas-2026-03-31", "title": "200 Copas", "date": "2026-03-31", "dateLabel": "31 Mar", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/03/658379399_18581219365044927_6907441189237575843_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "botapafo-2026-03-31", "title": "Botapafo", "date": "2026-03-31", "dateLabel": "31 Mar", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/03/657694581_18402010717179180_4598972189527987684_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "dj-pope-2026-03-26", "title": "DJ POPE", "date": "2026-03-26", "dateLabel": "26 Mar", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/02/649207366_18575450959044927_1378831999381068919_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "tus-gafitas-2026-03-21", "title": "Tus Gafitas", "date": "2026-03-21", "dateLabel": "21 Mar", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/07/654020321_18577515763044927_5033514058435545806_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "ni-diablo-ni-santo-2026-03-13", "title": "Ni diablo Ni santo", "date": "2026-03-13", "dateLabel": "13 Mar", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/03/650838796_18575760670044927_3980627893980084037_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "bichotas-night-2026-03-12", "title": "Bichotas Night", "date": "2026-03-12", "dateLabel": "12 Mar", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/03/649235835_18574956091044927_3654436515214382321_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "lo-mas-agogo-2026-03-05", "title": "LO MÁS AGOGÓ", "date": "2026-03-05", "dateLabel": "5 Mar", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/03/Lo-mas-agogo.webp", "permalink": null, "isUpcoming": false},
    {"id": "flow-cabron-2026-02-27", "title": "Flow Cabron", "date": "2026-02-27", "dateLabel": "27 Feb", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/08/641772727_18572609221044927_3907260155078255933_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-y-despecho-2026-02-19", "title": "PERREO Y DESPECHO", "date": "2026-02-19", "dateLabel": "19 Feb", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/11/630135687_18567715840044927_3398019098842611272_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "en-tu-perra-vida-2026-02-13", "title": "EN TU PERRA VIDA", "date": "2026-02-13", "dateLabel": "13 Feb", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/12/629653339_18565190674044927_5437930182735026221_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-san-valentin-2026-02-12", "title": "Perreo San Valentín", "date": "2026-02-12", "dateLabel": "12 Feb", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/02/632065110_18565033300044927_7510134731246276706_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "ghetto-star-2026-02-06", "title": "Ghetto Star", "date": "2026-02-06", "dateLabel": "6 Feb", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/02/625026759_18562825069044927_3659165706597179813_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "dj-west-2026-01-29", "title": "DJ WEST", "date": "2026-01-29", "dateLabel": "29 Ene", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/10/623286192_18560540101044927_8481355445037528906_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "el-beneficio-de-la-duda-2026-01-23", "title": "El beneficio de la duda", "date": "2026-01-23", "dateLabel": "23 Ene", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/01/619889672_18559157845044927_4909623450687676070_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "viernes-urbano-2026-01-22", "title": "Viernes Urbano", "date": "2026-01-22", "dateLabel": "22 Ene", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/09/619592635_18558934408044927_452575923554722229_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "uwaie-2026-01-02", "title": "UWAIE", "date": "2026-01-02", "dateLabel": "2 Ene", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2026/01/uwaie-eje-cafetero-tutaina.webp", "permalink": null, "isUpcoming": false},
    {"id": "marranada-cafetera-2025-12-25", "title": "MARRANADA CAFETERA", "date": "2025-12-25", "dateLabel": "25 Dic 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/12/SaveClip.App_604796710_18553320244044927_1539102143384771406_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "el-apachurrao-2025-12-19", "title": "EL APACHURRAO", "date": "2025-12-19", "dateLabel": "19 Dic 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/12/SaveClip.App_586721124_18552598669044927_3356455607266815938_n-1.webp", "permalink": null, "isUpcoming": false},
    {"id": "luis-hernandez-2025-12-18", "title": "LUIS HERNANDEZ", "date": "2025-12-18", "dateLabel": "18 Dic 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/12/SaveClip.App_601870858_18552240001044927_459590563247225361_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "geezy-dee-2025-12-11", "title": "GEEZY DEE", "date": "2025-12-11", "dateLabel": "11 Dic 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/12/SaveClip.App_598648258_18551286337044927_1299513673182384346_n-1.webp", "permalink": null, "isUpcoming": false},
    {"id": "el-chucuchucu-2025-12-05", "title": "EL CHUCUCHUCU", "date": "2025-12-05", "dateLabel": "5 Dic 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/12/SaveClip.App_590590346_18549772429044927_753329739261958719_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-fin-de-ano-2025-12-04", "title": "PERREO FIN DE AÑO", "date": "2025-12-04", "dateLabel": "4 Dic 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/12/SaveClip.App_589257185_18549571591044927_1862775596192157819_n-1.webp", "permalink": null, "isUpcoming": false},
    {"id": "domingo-de-popular-2025-11-15", "title": "Domingo de popular", "date": "2025-11-15", "dateLabel": "15 Nov 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/11/SaveClip.App_573841742_18546574312044927_7942153517820082987_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "ryan-castro-y-dj-west-2025-10-28", "title": "RYAN CASTRO Y DJ WEST", "date": "2025-10-28", "dateLabel": "28 Oct 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/10/SaveClip.App_570401991_18542840284044927_8877590619593221171_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "circus-2025-10-24", "title": "CIRCUS", "date": "2025-10-24", "dateLabel": "24 Oct 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/10/SaveClip.App_567786215_18540921478044927_9047126619015113738_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "burning-man-2025-10-11", "title": "Burning Man", "date": "2025-10-11", "dateLabel": "11 Oct 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/09/SaveClip.App_552151121_18024409841742506_2819209550740406492_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "hosted-by-westcol-2025-10-02", "title": "Hosted BY Westcol", "date": "2025-10-02", "dateLabel": "2 Oct 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/09/SaveClip.App_553244538_18534212644044927_4565876345445518739_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "dame-un-beso-2025-09-18", "title": "Dame un beso", "date": "2025-09-18", "dateLabel": "18 Sep 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/09/SaveClip.App_549164835_18532517131044927_4711390666113366080_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-en-el-2012-2025-09-11", "title": "Perreo en el 2012", "date": "2025-09-11", "dateLabel": "11 Sep 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/07/SaveClip.App_542815139_18531145459044927_8314964794557452045_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "las-morras-2025-08-22", "title": "LAS MORRAS", "date": "2025-08-22", "dateLabel": "22 Ago 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/08/las-morras-eje-cafeter.webp", "permalink": null, "isUpcoming": false},
    {"id": "fiesta-en-el-cafetal-2025-08-15", "title": "Fiesta en el cafetal", "date": "2025-08-15", "dateLabel": "15 Ago 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/08/532172277_18526476517044927_5595272647289577526_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "perreo-cafetero-2025-08-14", "title": "Perreo Cafetero", "date": "2025-08-14", "dateLabel": "14 Ago 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/08/532642615_18526313911044927_7479415424079317486_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "noche-de-clasicos-2025-08-05", "title": "Noche de Clásicos", "date": "2025-08-05", "dateLabel": "5 Ago 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/08/528344292_18525206926044927_506845044877340160_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "el-desmadre-2025-08-01", "title": "El Desmadre", "date": "2025-08-01", "dateLabel": "1 Ago 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/07/525264619_18523927942044927_2268537449717010444_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "billete-verde-2025-07-25", "title": "Billete Verde", "date": "2025-07-25", "dateLabel": "25 Jul 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/07/522409716_18522432106044927_4181669211557533196_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "una-noche-en-las-vegas-2025-07-18", "title": "Una noche en Las Vegas", "date": "2025-07-18", "dateLabel": "18 Jul 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/07/520696067_18521309266044927_5360818935075702224_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "noche-de-pecado-2025-07-17", "title": "Noche de pecado", "date": "2025-07-17", "dateLabel": "17 Jul 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/07/517021967_18521134534044927_2080672166277099606_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "lo-agogo-2025-06-20", "title": "Lo + Agogo", "date": "2025-06-20", "dateLabel": "20 Jun 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/06/Lo-agogo.webp", "permalink": null, "isUpcoming": false},
    {"id": "domingos-vallenatos-tutaina-eje-cafetero-2025-06-14", "title": "Domingos Vallenatos", "date": "2025-06-14", "dateLabel": "14 Jun 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/06/Domingo-vallenato-eje-cafetero.webp", "permalink": null, "isUpcoming": false},
    {"id": "sabor-fresa-en-tutaina-eje-cafetero-2025-06-06", "title": "Sabor Fresa", "date": "2025-06-06", "dateLabel": "6 Jun 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/06/Sabor-Fresa.webp", "permalink": null, "isUpcoming": false},
    {"id": "natalia-paris-ancestral-2025-05-31", "title": "Natalia Paris · Ancestral", "date": "2025-05-31", "dateLabel": "31 May 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/05/Natalia-Paris-eje-cafetero.webp", "permalink": null, "isUpcoming": false},
    {"id": "la-diabla-2025-05-30", "title": "La Diabla", "date": "2025-05-30", "dateLabel": "30 May 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/05/La-diabla-evento-31-de-mayo-tutaina-eje-cafetero.webp", "permalink": null, "isUpcoming": false},
    {"id": "mision-perreo-2025-05-29", "title": "Misión Perreo", "date": "2025-05-29", "dateLabel": "29 May 2025", "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/05/Mision-Perreo.webp", "permalink": null, "isUpcoming": false},
    {"id": "dulce-pecado", "title": "Dulce pecado", "date": null, "dateLabel": null, "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/10/SaveClip.App_561191300_18537816679044927_8827767522457590504_n.webp", "permalink": null, "isUpcoming": false},
    {"id": "cabron-y-vago", "title": "CABRÓN Y VAGO", "date": null, "dateLabel": null, "caption": "", "image": "https://discotecatutaina.com/wp-content/uploads/2025/10/SaveClip.App_565425685_18539641981044927_7752084563753928788_n.webp", "permalink": null, "isUpcoming": false}
  ];

  var STANDING = { id:"viernes-agro-fijo", title:"Viernes Agropecuario", standing:5, caption:"La noche más cafetera de la semana. Puertas a las 9:30 PM.", image:UP+"2026/10/viernes-agropecuario.webp", alt:"Flyer de Viernes Agropecuario en Tutaina Pereira" };
  var DAY = 864e5;
  var WD = ["Dom","Lun","Mar","Mié","Jue","Vie","Sáb"];
  var WDL = ["domingo","lunes","martes","miércoles","jueves","viernes","sábado"];
  var MO = ["Ene","Feb","Mar","Abr","May","Jun","Jul","Ago","Sep","Oct","Nov","Dic"];
  var MOL = ["enero","febrero","marzo","abril","mayo","junio","julio","agosto","septiembre","octubre","noviembre","diciembre"];

  function $(id){ return document.getElementById(id); }
  function esc(s){ return String(s == null ? "" : s).replace(/[&<>"']/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c];}); }
  function safeUrl(u){ return (typeof u === "string" && (/^https:\/\//i.test(u) || /^img\/[\w.-]+$/.test(u))) ? u : null; }
  function absUrl(u){ return /^https:/.test(u) ? u : SITE_URL + u; }
  function plainTitle(t){ return String(t || "Evento en Tutaina").split(" · ").join(", "); }
  function shortTitle(t){ return String(t || "Evento en Tutaina").split(" · ")[0]; }
  function subTitle(t){ var p = String(t || "").split(" · "); return p.length > 1 ? p.slice(1).join(", ") : ""; }
  function cap(s, n){ s = String(s || ""); return s.length > n ? s.slice(0, n).replace(/\s+\S*$/, "") + "…" : s; }
  function waFor(text){ return WA + encodeURIComponent("Hola Tutaina, quiero reservar mesa para " + text + "."); }
  function pad(n){ return (n < 10 ? "0" : "") + n; }

  function parse(s){
    if (!s) return null;
    var m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    var d = m ? new Date(+m[1], m[2]-1, +m[3], 21, 30) : new Date(s);
    return isNaN(d) ? null : d;
  }
  function midnight(s){ var d = parse(s); if (!d) return null; d = new Date(d); d.setHours(0,0,0,0); return d; }

  function nightBase(){ var d = new Date(Date.now() - 4*3600e3); d.setHours(0,0,0,0); return d; }
  function shortDate(d){ return WD[d.getDay()] + " " + d.getDate() + " " + MO[d.getMonth()]; }
  function longDate(d){ return WDL[d.getDay()] + " " + d.getDate() + " de " + MOL[d.getMonth()]; }
  function label(ev){ var d = midnight(ev.date); return d ? d.getDate() + " " + MO[d.getMonth()] + " " + d.getFullYear() : (ev.dateLabel || ""); }
  function upcoming(ev){
    var d = parse(ev.date);
    if (d){ var end = ev.endDate ? Date.parse(ev.endDate) : d.getTime() + 7*3600e3; return end >= Date.now(); }
    return ev.isUpcoming === true;
  }

  function nights(ev){
    var s = midnight(ev.date); if (!s) return [];
    var out = [s], e = ev.endDate ? new Date(ev.endDate) : null;
    if (e) for (var t = s.getTime() + DAY; t < e.getTime() - 6*3600e3 && out.length < 4; t += DAY) out.push(new Date(t));
    return out;
  }
  function covers(ev, d){ return nights(ev).some(function(n){ return n.getTime() === d.getTime(); }); }
  function nextOf(wd){ var b = nightBase(); return new Date(b.getTime() + ((wd - b.getDay() + 7) % 7) * DAY); }

  function kind(ev){
    if (nights(ev).length > 1) return null;
    var t = String(ev.title || "");
    if (/barra\s*libre/i.test(t)) return "barra";
    if (/^viernes\s+agropecuario/i.test(t)) return "agro";
    if (/colombia\s+vs|domingo|viernes|jueves/i.test(t)) return null;
    return "sab";
  }
  function datesHtml(ev){
    var ns = ev.standing != null ? [ev._night] : nights(ev);
    if (!ns.length) return "<span>" + esc(ev.dateLabel || "Fecha por confirmar") + "</span>";
    return ns.map(function(d){ return "<span>" + WD[d.getDay()] + " <b>" + pad(d.getDate()) + "</b> " + MO[d.getMonth()] + "</span>"; }).join("");
  }
  function flyer(ev, alt, lazy){
    var src = safeUrl(ev.image);
    return '<figure class="fly"><span class="plate" aria-hidden="true"><span>Tutaina</span><b>' + esc(shortTitle(ev.title)) + '</b></span>' +
      (src ? '<img src="' + esc(src) + '" alt="' + esc(alt) + '" width="1080" height="1350"' + (lazy ? ' loading="lazy"' : '') + ' decoding="async" referrerpolicy="no-referrer">' : '') + '</figure>';
  }

  function eventsLd(evs){
    try {
      var place = { "@type":"Place", name:"Tutaina Eje Cafetero", address:{ "@type":"PostalAddress", streetAddress:"Av. Circunvalar # 13-01 Este 10", addressLocality:"Pereira", addressRegion:"Risaralda", addressCountry:"CO" } };
      var items = evs.filter(function(ev){ return ev.date && ev._up; }).slice(0, 10).map(function(ev){
        var start = parse(ev.date), iso = /T/.test(ev.date) ? ev.date : ev.date + "T21:30:00-05:00";
        var o = { "@context":"https://schema.org", "@type":"Event", name:plainTitle(ev.title), startDate:iso,
          endDate:ev.endDate || new Date(start.getTime() + 6.5*3600e3).toISOString(), eventStatus:"https://schema.org/EventScheduled",
          eventAttendanceMode:"https://schema.org/OfflineEventAttendanceMode", location:place,
          organizer:{ "@type":"Organization", name:"Tutaina Eje Cafetero", url:SITE_URL } };
        if (ev.caption) o.description = String(ev.caption).slice(0, 300);
        var img = safeUrl(ev.image); if (img) o.image = [absUrl(img)];
        if (safeUrl(ev.permalink)) o.url = ev.permalink;
        return o;
      });
      if (!items.length) return;
      var old = $("ld-events"); if (old) old.remove();
      var sc = document.createElement("script"); sc.type = "application/ld+json"; sc.id = "ld-events";
      sc.textContent = JSON.stringify(items.length === 1 ? items[0] : items); document.head.appendChild(sc);
    } catch(e){}
  }

  function renderHero(ev, tag){
    var img = safeUrl(ev.image), heroImg = $("heroImg");
    if (img && heroImg.getAttribute("src") !== img){ heroImg.hidden = false; heroImg.src = img; }
    heroImg.alt = ev.alt || ("Flyer de " + plainTitle(ev.title) + " en Tutaina Pereira");
    $("heroPlate").textContent = shortTitle(ev.title);
    $("heroTag").textContent = tag;
    $("heroName").textContent = shortTitle(ev.title);
    var sub = subTitle(ev.title); $("heroSub").textContent = sub; $("heroSub").hidden = !sub;
    $("heroDates").innerHTML = datesHtml(ev);
    $("heroNote").textContent = cap(ev.caption, 160); $("heroNote").hidden = !ev.caption;
    var name = ev.standing != null ? "el Viernes Agropecuario (" + longDate(ev._night) + ")" : shortTitle(ev.title);
    $("heroWa").href = waFor(name);
    $("heroWa").setAttribute("aria-label", "Reservar mesa para " + shortTitle(ev.title) + " por WhatsApp");
    var link = safeUrl(ev.permalink);
    $("heroLink").href = link || IG;
    $("heroLink").textContent = link && !/instagram\.com/.test(link) ? "Ver evento" : "Ver en Instagram";
    try { Count.set(ev); } catch(e){}
  }

  var Count = (function(){
    var el = $("heroCount"), timer = null, starts = [], who = "";
    var OPEN = 21.5*3600e3, LEN = 6.5*3600e3, BOG = -5*3600e3;
    function bogDay(t){ var d = new Date(t + BOG); return d.getUTCFullYear() + "-" + d.getUTCMonth() + "-" + d.getUTCDate(); }
    function plural(n, a, b){ return n + " " + (n === 1 ? a : b); }
    function tick(){
      if (!el) return;
      var now = Date.now(), s = null;
      for (var i = 0; i < starts.length; i++) if (starts[i] + LEN > now){ s = starts[i]; break; }
      if (s == null){ el.hidden = true; return; }
      var vis, sr;
      if (now >= s){ vis = "<b>Es hoy</b> · abierto ahora"; sr = who + ": es hoy, abierto ahora hasta las 4:00 AM"; }
      else if (bogDay(now) === bogDay(s)){ vis = "<b>Hoy</b> desde las 9:30 PM"; sr = who + ": hoy desde las 9:30 PM"; }
      else {
        var m = Math.floor((s - now) / 6e4), d = Math.floor(m / 1440), h = Math.floor(m % 1440 / 60), mi = m % 60;
        vis = "Faltan " + (d ? "<b>" + d + "</b> d " + "<b>" + pad(h) + "</b> h " : "<b>" + h + "</b> h ") + "<b>" + pad(mi) + "</b> min";
        sr = "Faltan " + (d ? plural(d, "día", "días") + ", " : "") + plural(h, "hora", "horas") + " y " + plural(mi, "minuto", "minutos") + " para " + who;
      }
      el.innerHTML = vis; el.setAttribute("aria-label", sr); el.hidden = false;
    }
    function stop(){ if (timer){ clearInterval(timer); timer = null; } }
    function start(){ stop(); tick(); if (starts.length) timer = setInterval(tick, 30e3); }
    document.addEventListener("visibilitychange", function(){ if (document.hidden) stop(); else start(); });

    function set(ev){
      var ns = ev.standing != null ? [ev._night] : nights(ev);
      starts = ns.filter(Boolean).map(function(n){ return Date.UTC(n.getFullYear(), n.getMonth(), n.getDate()) - BOG + OPEN; });
      who = shortTitle(ev.title);
      if (!document.hidden) start(); else tick();
    }
    return { set:set };
  })();

  function renderUpcoming(list){
    var week = $("week");
    Array.prototype.forEach.call(week.querySelectorAll(".upc"), function(li){ li.remove(); });
    var html = list.map(function(ev){
      var ns = nights(ev), when = ns.length > 1 ? shortDate(ns[0]) + " – " + shortDate(ns[ns.length-1]) : (ns.length ? shortDate(ns[0]) : (ev.dateLabel || ""));
      var sub = subTitle(ev.title), note = [sub, cap(ev.caption, 70)].filter(Boolean).join(". ");
      return '<li class="card upc">' + flyer(ev, ev.alt || ("Flyer de " + plainTitle(ev.title) + " en Tutaina Pereira"), true) +
        '<div class="body"><p class="when">' + esc(when) + '</p><h3>' + esc(shortTitle(ev.title)) + '</h3>' +
        (note ? '<p class="meta">' + esc(note) + '</p>' : '') +
        '<a class="btn sm" href="' + esc(waFor(shortTitle(ev.title))) + '" target="_blank" rel="noopener">Reservar</a></div></li>';
    }).join("");
    week.insertAdjacentHTML("afterbegin", html);
  }

  function renderWeek(evs, upc){
    var latest = {};
    evs.forEach(function(ev){
      if (ev._up) return;
      var k = kind(ev); if (!k || !safeUrl(ev.image)) return;
      var t = parse(ev.date) ? parse(ev.date).getTime() : 0;
      if (!latest[k] || t > latest[k]._t){ latest[k] = ev; ev._t = t; }
    });
    var used = {};
    Array.prototype.forEach.call(document.querySelectorAll(".day"), function(card){
      var wd = +card.getAttribute("data-day"), d = nextOf(wd), name = WDL[wd];
      var today = d.getTime() === nightBase().getTime();
      card.querySelector("[data-when]").textContent = (today ? "Hoy · " : "") + shortDate(d);
      var sp = upc.filter(function(ev){ return covers(ev, d); })[0];
      var meta = card.querySelector("[data-meta]");
      if (!meta.hasAttribute("data-base")) meta.setAttribute("data-base", meta.textContent);
      if (sp) meta.innerHTML = "Este " + name + " " + d.getDate() + ": <b>" + esc(shortTitle(sp.title)) + "</b>";
      else meta.textContent = meta.getAttribute("data-base");
      card.querySelector("[data-wa]").href = waFor("el " + longDate(d) + (sp ? " (" + shortTitle(sp.title) + ")" : ""));
      var ev = latest[card.getAttribute("data-kind")], fig = card.querySelector(".fly"), img = card.querySelector("[data-fly]");
      if (ev && img){
        used[ev.id || ev.image] = true;
        var src = safeUrl(ev.image);
        if (img.getAttribute("src") !== src){ img.hidden = false; img.src = src; }
        img.alt = "Flyer de " + plainTitle(ev.title) + " en Tutaina Pereira";
        fig.querySelector(".plate b").textContent = shortTitle(ev.title);
      }
    });
    return used;
  }

  var ARCH_MAX = 12, archList = [], archYear = "all";

  var Slider = (function(){
    var rail = $("archRail"), prev = $("slPrev"), next = $("slNext"), nav = prev && prev.parentNode;
    if (!rail || !prev || !next) return { reset:function(){}, update:function(){} };
    var rm = window.matchMedia("(prefers-reduced-motion: reduce)");
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
      var idx = Math.round(rail.scrollLeft / s) + dir * n;
      go(idx * s);
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
      if (dragging){ e.preventDefault(); rail.scrollLeft = sl - dx; }
      var dtm = e.timeStamp - lt; if (dtm > 0){ vx = vx * .6 + ((e.clientX - lx) / dtm) * .4; lx = e.clientX; lt = e.timeStamp; }
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
      var v = (e && e.timeStamp - lt < 90) ? Math.max(-3, Math.min(3, vx)) : 0;
      go(Math.round((x - (rm.matches ? 0 : v * 260)) / s) * s);
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

  (function(){
    var b = $("toTop"); if (!b) return;
    var rm = window.matchMedia("(prefers-reduced-motion: reduce)"), on = null;
    function chk(){
      var s = window.scrollY > 600;
      if (s === on) return; on = s;
      b.classList.toggle("show", s);
      b.setAttribute("aria-hidden", s ? "false" : "true");
      b.tabIndex = s ? 0 : -1;
    }
    window.addEventListener("scroll", chk, { passive:true }); chk();
    b.addEventListener("click", function(){
      window.scrollTo({ top:0, behavior: rm.matches ? "auto" : "smooth" });
      var t = document.querySelector(".top a"); if (t) t.focus({ preventScroll:true });
    });
  })();

  function yearOf(ev){ var d = midnight(ev.date); return d ? String(d.getFullYear()) : ""; }
  function archFiltered(){ return archYear === "all" ? archList : archList.filter(function(ev){ return yearOf(ev) === archYear; }); }
  function drawArchive(announce){
    var list = archFiltered().slice(0, ARCH_MAX);
    $("arch").innerHTML = list.map(function(ev){
      var link = safeUrl(ev.permalink) || IG, title = shortTitle(ev.title), lb = label(ev);
      return '<li class="card"><a href="' + esc(link) + '" target="_blank" rel="noopener" aria-label="' + esc(title + (lb ? ", " + lb : "")) + ', en Instagram">' +
        flyer(ev, "Flyer de " + plainTitle(ev.title) + " en Tutaina Pereira" + (lb ? ", " + lb : ""), true) +
        '<div class="body"><p class="when">' + esc(lb || "Sin fecha") + '</p><h3>' + esc(title) + '</h3></div></a></li>';
    }).join("") + (list.length ? '<li class="card rail-more"><a href="' + esc(IG) + '" target="_blank" rel="noopener"><div class="fly"><span class="plate"><span>Instagram</span><b>Ver más en Instagram</b></span></div></a></li>' : "");
    if (announce) $("archStatus").textContent = list.length + (list.length === 1 ? " evento" : " eventos") + (archYear === "all" ? " recientes" : " de " + archYear);
    Array.prototype.forEach.call($("years").querySelectorAll("button"), function(b){ b.setAttribute("aria-pressed", b.getAttribute("data-y") === archYear ? "true" : "false"); });
    Slider.reset();
  }
  function renderArchive(past, used, meta){
    archList = past.filter(function(ev){ return !used[ev.id || ev.image] && safeUrl(ev.image); });
    var years = {}; archList.forEach(function(ev){ var y = yearOf(ev); if (y) years[y] = 1; });
    var ys = Object.keys(years).sort().reverse();
    $("years").innerHTML = ys.length > 1 ? ['<button type="button" data-y="all">Todas</button>'].concat(ys.map(function(y){ return '<button type="button" data-y="' + y + '">' + y + '</button>'; })).join("") : "";
    $("years").hidden = ys.length < 2;
    archYear = "all";
    drawArchive();
    $("eventos-pasados").hidden = !archList.length; Slider.update();
    $("arch").setAttribute("data-source", meta.source === "instagram" ? "instagram" : "fallback");
    if (meta.updated) $("arch").setAttribute("data-updated", meta.updated);
  }
  $("years").addEventListener("click", function(e){
    var b = e.target.closest("button"); if (!b) return;
    archYear = b.getAttribute("data-y"); drawArchive(true);
  });

  function render(events, meta){
    meta = meta || {};
    var evs = (events || []).slice();
    if (!evs.length) evs = FALLBACK_ARRAY.slice();
    var seen = {};
    evs = evs.filter(function(ev){ var k = ev.id || ev.image; if (seen[k]) return false; seen[k] = 1; return true; });
    evs.forEach(function(ev){ ev._up = upcoming(ev); });
    var upc = evs.filter(function(e){ return e._up; }).sort(function(a,b){ return (Date.parse(a.date)||0) - (Date.parse(b.date)||0); });
    var past = evs.filter(function(e){ return !e._up; }).sort(function(a,b){ if (!a.date) return 1; if (!b.date) return -1; return (parse(b.date)||0) - (parse(a.date)||0); });
    try {
      if (upc.length) renderHero(upc[0], "Próximo evento");
      else renderHero(Object.assign({}, STANDING, { _night:nextOf(5) }), "Este viernes");
    } catch(e){}
    try { renderUpcoming(upc.slice(0, 4)); } catch(e){}
    var used = {};
    try { used = renderWeek(evs, upc); } catch(e){}
    try { renderArchive(past, used, meta); } catch(e){}
    eventsLd(evs);
  }

  try {
    if (window.IGEvents && typeof window.IGEvents.load === "function") {
      window.IGEvents.load({ club:"tutaina", fallback:FALLBACK_ARRAY })
        .then(function(r){ render(r && r.events, r); })
        .catch(function(){ render(FALLBACK_ARRAY, {source:"fallback"}); });
    } else {
      render(FALLBACK_ARRAY, {source:"fallback"});
    }
  } catch(e){ render(FALLBACK_ARRAY, {source:"fallback"}); }

  var yr = $("yr"); if (yr) yr.textContent = new Date().getFullYear();

  var bar = $("topbar"), burger = $("burger"), drawer = $("drawer"), ico = $("burgerIco");
  function onScroll(){ bar.classList.toggle("solid", window.scrollY > 8 || drawer.classList.contains("open")); }
  window.addEventListener("scroll", onScroll, { passive:true }); onScroll();
  function setMenu(open){
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    ico.setAttribute("d", open ? "M5 5l14 14M19 5L5 19" : "M3 7h18M3 12h18M3 17h18");
    drawer.classList.toggle("open", open);
    document.documentElement.style.overflow = open ? "hidden" : "";
    onScroll();
    if (open){ var f = drawer.querySelector("a"); if (f) setTimeout(function(){ f.focus({ preventScroll:true }); }, 30); }
  }
  burger.addEventListener("click", function(){ setMenu(burger.getAttribute("aria-expanded") !== "true"); });
  drawer.addEventListener("click", function(e){ if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function(e){
    if (!drawer.classList.contains("open")) return;
    if (e.key === "Escape"){ setMenu(false); burger.focus(); return; }
    if (e.key === "Tab"){
      var links = drawer.querySelectorAll("a"), last = links[links.length - 1];
      if (!e.shiftKey && document.activeElement === last){ e.preventDefault(); burger.focus(); }
      else if (e.shiftKey && document.activeElement === burger){ e.preventDefault(); last.focus(); }
    }
  });
  var mqDesk = window.matchMedia("(min-width: 981px)");
  var closeOnDesk = function(){ if (mqDesk.matches && drawer.classList.contains("open")) setMenu(false); };
  if (mqDesk.addEventListener) mqDesk.addEventListener("change", closeOnDesk); else if (mqDesk.addListener) mqDesk.addListener(closeOnDesk);
})();
