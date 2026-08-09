/* AZAL main — boot everything (classic script, works from file://) */
(function () {
  "use strict";

  function lemonProduct() {
    if (!window.AZAL_DATA) return null;
    for (var i = 0; i < window.AZAL_DATA.products.length; i++) {
      if (window.AZAL_DATA.products[i].id === 2) return window.AZAL_DATA.products[i];
    }
    return null;
  }

  function applyDynamic() {
    var i18n = window.AZALi18n;
    var ar = i18n.getLang() === "ar";
    var p = lemonProduct();

    if (p) {
      var desc = document.getElementById("featureDesc");
      if (desc) desc.textContent = ar ? p.description_ar : p.description_en;
      var benefits = ar ? p.benefits_ar : p.benefits_en;
      for (var b = 0; b < benefits.length; b++) {
        var el = document.getElementById("benefit_" + (b + 1));
        if (el) el.textContent = benefits[b];
      }
      var heroPrice = document.getElementById("heroPrice");
      if (heroPrice) heroPrice.textContent = i18n.formatPrice(p.price.amount);
      var featurePrice = document.getElementById("featurePrice");
      if (featurePrice) featurePrice.textContent = i18n.formatPrice(p.price.amount);

      var links = document.querySelectorAll("[data-order]");
      for (var l = 0; l < links.length; l++) {
        links[l].href = i18n.waLink(p);
      }
    }

    var tels = document.querySelectorAll('a[href^="tel:"]');
    for (var t = 0; t < tels.length; t++) tels[t].href = "tel:" + i18n.PHONE_INTL;

    window.AZALProducts.renderProducts();
    window.AZALProducts.renderFooterProducts();
    window.AZALReveal.initReveals();
  }

  function init() {
    var i18n = window.AZALi18n;
    i18n.applyI18n();

    var langToggle = document.getElementById("langToggle");
    if (langToggle) {
      langToggle.addEventListener("click", function () {
        i18n.setLang(i18n.getLang() === "ar" ? "en" : "ar");
      });
    }

    window.AZALNav.initNav();

    if (document.getElementById("heroTrack")) {
      window.AZALHero.discoverFrameCount().then(function (count) {
        window.__AZAL_HERO__ = new window.AZALHero.HeroSequence(count);
        window.__AZAL_HERO__.init();
      });
    }

    applyDynamic();
    window.AZALi18n.onLangChange(function () { applyDynamic(); });

    var year = document.getElementById("year");
    if (year) year.textContent = String(new Date().getFullYear());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
