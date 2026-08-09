/* AZAL products — render product cards + footer list from window.AZAL_DATA */
(function () {
  "use strict";

  var IMAGES = {
    1: "layout/daghmoss.png",
    2: "layout/limon.png",
    3: "layout/carob.png",
    4: "layout/oil.png",
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function productCard(product, index) {
    var i18n = window.AZALi18n;
    var ar = i18n.getLang() === "ar";
    var name = ar ? product.name_ar : product.name_en;
    var desc = ar ? product.description_ar : product.description_en;
    var benefits = ar
      ? product.benefits_ar || product.features_ar || []
      : product.benefits_en || product.features_en || [];
    var badges = ar
      ? (product.footer_badges_ar || []).slice(0, 2)
      : (product.footer_badges_en || []).slice(0, 2);
    var img = IMAGES[product.id] || IMAGES[1];

    return (
      '<article class="product reveal" style="transition-delay:' +
      (index % 2) * 90 +
      'ms">' +
      '<figure class="product__media">' +
      '<img src="' + img + '" alt="' + escapeHtml(name) + '" width="896" height="1184" loading="lazy" />' +
      '<div class="product__badges">' +
      badges.map(function (b) { return '<span class="product__badge">' + escapeHtml(b) + "</span>"; }).join("") +
      "</div>" +
      "</figure>" +
      '<div class="product__body">' +
      '<p class="product__meta">' +
      "<span>" + escapeHtml(product.size) + "</span>" +
      '<span class="product__dot">•</span>' +
      '<span class="product__price">' + i18n.formatPrice(product.price.amount) + "</span>" +
      "</p>" +
      "<h3 class=\"product__name\">" + escapeHtml(ar ? product.name_ar : product.name_en) + "</h3>" +
      '<p class="product__name-en">' + escapeHtml(ar ? product.name_en : product.name_ar) + "</p>" +
      '<p class="product__desc">' + escapeHtml(desc) + "</p>" +
      '<ul class="benefit-list">' +
      benefits.map(function (b) { return "<li>" + escapeHtml(b) + "</li>"; }).join("") +
      "</ul>" +
      '<div class="product__actions">' +
      '<a class="btn btn--gold" href="' + i18n.waLink(product) + '" target="_blank" rel="noopener">' +
      "<span>" + i18n.t("order_now") + "</span></a>" +
      '<a class="btn btn--ghost" href="tel:' + i18n.PHONE_INTL + '">' +
      "<span>" + i18n.t("call_now") + "</span></a>" +
      "</div>" +
      "</div>" +
      "</article>"
    );
  }

  function renderProducts() {
    var grid = document.getElementById("productsGrid");
    if (!grid || !window.AZAL_DATA) return;
    grid.innerHTML = window.AZAL_DATA.products
      .map(productCard)
      .join("");
  }

  function renderFooterProducts() {
    var list = document.getElementById("footerProducts");
    if (!list || !window.AZAL_DATA) return;
    var ar = window.AZALi18n.getLang() === "ar";
    list.innerHTML = window.AZAL_DATA.products
      .map(function (p) {
        return "<li>" + escapeHtml(ar ? p.name_ar : p.name_en) + "</li>";
      })
      .join("");
  }

  window.AZALProducts = {
    renderProducts: renderProducts,
    renderFooterProducts: renderFooterProducts,
  };
})();
