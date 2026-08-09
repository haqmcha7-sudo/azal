/* AZAL nav — navbar states + mobile menu */
(function () {
  "use strict";

  function initNav() {
    var nav = document.getElementById("navbar");
    var burger = document.getElementById("navBurger");
    var menu = document.getElementById("mobileMenu");
    var body = document.body;
    var lastY = window.scrollY;

    function onScroll() {
      var y = window.scrollY;
      var down = y > lastY;
      lastY = y;
      nav.classList.toggle("nav--scrolled", y > 24);
      if (menu.classList.contains("is-open")) return;
      if (y > 480 && down) nav.classList.add("nav--hidden");
      else nav.classList.remove("nav--hidden");
    }

    function closeMenu() {
      menu.classList.remove("is-open");
      burger.setAttribute("aria-expanded", "false");
      body.style.overflow = "";
      setTimeout(function () {
        if (!menu.classList.contains("is-open")) menu.hidden = true;
      }, 450);
    }

    function openMenu() {
      menu.hidden = false;
      requestAnimationFrame(function () {
        menu.classList.add("is-open");
        burger.setAttribute("aria-expanded", "true");
        body.style.overflow = "hidden";
      });
    }

    burger.addEventListener("click", function () {
      if (menu.classList.contains("is-open")) closeMenu();
      else openMenu();
    });

    var links = menu.querySelectorAll("a");
    for (var i = 0; i < links.length; i++) {
      links[i].addEventListener("click", closeMenu);
    }

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menu.classList.contains("is-open")) closeMenu();
    });

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }

  window.AZALNav = { initNav: initNav };
})();
