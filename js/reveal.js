/* AZAL reveal — IntersectionObserver scroll-in animations */
(function () {
  "use strict";

  function initReveals(scope) {
    scope = scope || document;
    var els = scope.querySelectorAll(".reveal:not(.is-in)");
    if (!("IntersectionObserver" in window)) {
      for (var i = 0; i < els.length; i++) els[i].classList.add("is-in");
      return;
    }
    var io = new IntersectionObserver(
      function (entries) {
        for (var j = 0; j < entries.length; j++) {
          if (entries[j].isIntersecting) {
            entries[j].target.classList.add("is-in");
            io.unobserve(entries[j].target);
          }
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -4% 0px" }
    );
    for (var k = 0; k < els.length; k++) io.observe(els[k]);
  }

  window.AZALReveal = { initReveals: initReveals };
})();
