/* AZAL hero — scroll-driven product animation on canvas
   - frames auto-discovered (works over http AND file://)
   - portrait 3:4 reframe of the source scene (the jar fills the stage)
   - crossfade interpolation between frames for silky motion
*/
(function () {
  "use strict";

  var MAX_FRAMES = 120;
  var FALLBACK_COUNT = 31;
  var SMALL_BREAKPOINT = 768;

  // Reframe: the jar lives in the right ~75% of the 16:9 frame, full height.
  var CROP = { x0: 0.25, x1: 1.0, y0: 0, y1: 1.0 };

  function pad(i) {
    return ("000" + i).slice(-3);
  }

  function frameUrl(small, i) {
    return small
      ? "AZAL_Lemon_Ho_frames/640/frame_" + pad(i) + ".jpg"
      : "AZAL_Lemon_Ho_frames/frame_" + pad(i) + ".png";
  }

  function probeHead(i) {
    return fetch(frameUrl(false, i), { method: "HEAD" }).then(
      function (r) { return r.ok; },
      function () { return null; }
    );
  }

  function probeImage(i) {
    return new Promise(function (resolve) {
      var img = new Image();
      img.onload = function () { resolve(true); };
      img.onerror = function () { resolve(false); };
      img.src = frameUrl(false, i);
    });
  }

  function discoverFrameCount() {
    return new Promise(function (resolve) {
      probeHead(1).then(function (first) {
        if (first === null) {
          // file:// or restricted — use image probing
          probeImages().then(resolve);
          return;
        }
        if (!first) { resolve(FALLBACK_COUNT); return; }
        // http: binary search the last existing frame
        var lo = 1, hi = MAX_FRAMES, last = 1;
        function step() {
          if (lo >= hi) { resolve(last); return; }
          var mid = Math.ceil((lo + hi) / 2);
          probeHead(mid).then(function (ok) {
            if (ok) { last = mid; lo = mid; } else { hi = mid - 1; }
            step();
          });
        }
        step();
      });
    });
  }

  function probeImages() {
    return new Promise(function (resolve) {
      var last = 0;
      var done = 0;
      for (var i = 1; i <= MAX_FRAMES; i++) {
        (function (idx) {
          probeImage(idx).then(function (ok) {
            if (ok && idx > last) last = idx;
            done++;
            if (done === MAX_FRAMES) resolve(last > 0 ? last : FALLBACK_COUNT);
          });
        })(i);
      }
    });
  }

  function clamp01(v) {
    return v < 0 ? 0 : v > 1 ? 1 : v;
  }

  /* ------------------- frame preloader ------------------- */

  function FrameLoader(urls, onReady, onProgress) {
    this.urls = urls;
    this.onReady = onReady;
    this.onProgress = onProgress;
    this.images = new Array(urls.length);
    this.ready = new Array(urls.length).fill(false);
    this.queue = [];
    for (var i = 0; i < urls.length; i++) this.queue.push(i);
    this.loading = {};
    this.done = 0;
    this.concurrency = 6;
  }

  FrameLoader.prototype.start = function () {
    this.pump();
  };

  FrameLoader.prototype.boost = function (i) {
    if (this.ready[i] || this.loading[i]) return;
    var pos = this.queue.indexOf(i);
    if (pos > 0) {
      this.queue.splice(pos, 1);
      this.queue.unshift(i);
    }
    this.pump();
  };

  FrameLoader.prototype.pump = function () {
    var self = this;
    var busy = Object.keys(this.loading).length;
    while (busy < this.concurrency && this.queue.length > 0) {
      var i = this.queue.shift();
      this.loading[i] = true;
      busy++;
      var img = new Image();
      img.decoding = "async";
      (function (idx, imageObj) {
        imageObj.onload = function () {
          self.images[idx] = imageObj;
          self.ready[idx] = true;
          delete self.loading[idx];
          self.done++;
          self.onReady(idx);
          self.onProgress(self.done / self.urls.length);
          self.pump();
        };
        imageObj.onerror = function () {
          delete self.loading[idx];
          self.done++;
          self.onProgress(self.done / self.urls.length);
          self.pump();
        };
      })(i, img);
      img.src = this.urls[i];
    }
  };

  /* ------------------- hero sequence ------------------- */

  function HeroSequence(frameCount) {
    this.count = frameCount;
    this.track = document.getElementById("heroTrack");
    this.stage = document.getElementById("heroStage");
    this.canvas = document.getElementById("heroCanvas");
    this.ctx = this.canvas.getContext("2d", { alpha: false });
    this.intro = document.getElementById("heroIntro");
    this.reveal = document.getElementById("heroReveal");
    this.loaderEl = document.getElementById("heroLoader");

    this.reducedMotion =
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.small = window.innerWidth <= SMALL_BREAKPOINT;
    this.progress = 0;
    this.current = 0; // smoothed float frame position
    this.drawnFloat = -1;
    this.inView = true;
    this.bg = "#bdb8b0";
    this.dpr = 1;
    this.cw = 0;
    this.ch = 0;
    this.lastIntro = 1;
    this.lastReveal = 0;
    this.lastTime = 0;

    this.buildLoader();
  }

  HeroSequence.prototype.buildLoader = function () {
    var self = this;
    var urls = [];
    for (var i = 1; i <= this.count; i++) urls.push(frameUrl(this.small, i));
    this.loader = new FrameLoader(
      urls,
      function (i) { self.onFrameReady(i); },
      function (p) { self.onLoadProgress(p); }
    );
  };

  HeroSequence.prototype.rebuildLoader = function () {
    this.buildLoader();
    this.drawnFloat = -1;
    this.loader.start();
    this.drawPosition(Math.round(this.progress * (this.count - 1)));
  };

  HeroSequence.prototype.onFrameReady = function (i) {
    if (i === 0 || Math.abs(i - this.current) < 1.5) {
      this.drawPosition(this.current);
    }
  };

  HeroSequence.prototype.onLoadProgress = function (p) {
    if (!this.loaderEl) return;
    var bar = this.loaderEl.querySelector("span");
    if (!bar) return;
    bar.style.width = Math.round(p * 100) + "%";
    this.loaderEl.classList.add("is-active");
    if (p >= 1) {
      var self = this;
      setTimeout(function () { self.loaderEl.classList.remove("is-active"); }, 600);
    }
  };

  HeroSequence.prototype.onResize = function () {
    var self = this;
    var smallNow = window.innerWidth <= SMALL_BREAKPOINT;
    if (smallNow !== this.small) {
      this.small = smallNow;
      this.rebuildLoader();
    }
    var rect = this.stage.getBoundingClientRect();
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);
    var w = Math.max(1, Math.round(rect.width * this.dpr));
    var h = Math.max(1, Math.round(rect.height * this.dpr));
    if (w !== this.cw || h !== this.ch) {
      this.cw = w;
      this.ch = h;
      this.canvas.width = w;
      this.canvas.height = h;
      this.drawnFloat = -1;
      this.drawPosition(Math.min(Math.round(this.progress * (this.count - 1)), this.count - 1));
    }
    // re-measure on stage size changes
    if (typeof ResizeObserver !== "undefined") {
      if (this.ro) this.ro.disconnect();
      this.ro = new ResizeObserver(function () { self.onResize(); });
      this.ro.observe(this.stage);
    }
  };

  HeroSequence.prototype.onScroll = function () {
    if (!this.track) return;
    var rect = this.track.getBoundingClientRect();
    var total = rect.height - window.innerHeight;
    var p = total <= 0 ? 1 : clamp01(-rect.top / total);
    this.progress = p;
    this.updateOverlays(p);
  };

  HeroSequence.prototype.updateOverlays = function (p) {
    var intro = clamp01(1 - p / 0.18);
    if (Math.abs(intro - this.lastIntro) > 0.005) {
      this.lastIntro = intro;
      this.intro.style.opacity = intro.toFixed(3);
    }
    var rp = clamp01((p - 0.8) / 0.14);
    if (Math.abs(rp - this.lastReveal) > 0.005) {
      this.lastReveal = rp;
      this.reveal.style.opacity = rp.toFixed(3);
      this.reveal.style.transform = "translate3d(0, " + (1 - rp) * 26 + "px, 0)";
      this.reveal.style.pointerEvents = rp > 0.5 ? "auto" : "none";
    }
  };

  HeroSequence.prototype.drawSingleImg = function (img) {
    if (!img) return;
    var ctx = this.ctx;
    var cw = this.cw || this.canvas.width;
    var ch = this.ch || this.canvas.height;
    var sx = CROP.x0 * img.naturalWidth;
    var sw = (CROP.x1 - CROP.x0) * img.naturalWidth;
    var sh = img.naturalHeight;
    var scale = Math.min(cw / sw, ch / sh);
    var dw = sw * scale;
    var dh = sh * scale;
    var dx = (cw - dw) / 2;
    var dy = (ch - dh) / 2;
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, sx, 0, sw, sh, dx, dy, dw, dh);
  };

  /* draw the frame at float position f (0..count-1) with true crossfade */
  HeroSequence.prototype.drawPosition = function (f) {
    f = Math.max(0, Math.min(this.count - 1, f));
    var i = Math.floor(f);
    var frac = f - i;
    var ctx = this.ctx;
    var cw = this.cw || this.canvas.width;
    var ch = this.ch || this.canvas.height;

    // Fill background ONCE
    ctx.globalAlpha = 1;
    ctx.fillStyle = this.bg;
    ctx.fillRect(0, 0, cw, ch);

    if (this.loader.ready[i]) {
      // Base frame i
      this.drawSingleImg(this.loader.images[i]);
      // Crossfade next frame i+1 if ready
      if (frac > 0.001 && this.loader.ready[i + 1]) {
        ctx.globalAlpha = frac;
        this.drawSingleImg(this.loader.images[i + 1]);
        ctx.globalAlpha = 1;
      }
      this.drawnFloat = f;
    } else {
      this.loader.boost(i);
      for (var j = i; j >= 0; j--) {
        if (this.loader.ready[j]) {
          this.drawSingleImg(this.loader.images[j]);
          this.drawnFloat = j;
          return;
        }
      }
    }
  };

  HeroSequence.prototype.loop = function (timestamp) {
    if (this.inView && !this.reducedMotion) {
      var target = this.progress * (this.count - 1);

      if (!this.lastTime) this.lastTime = timestamp || performance.now();
      var now = timestamp || performance.now();
      var dt = Math.min((now - this.lastTime) / 1000, 0.064);
      this.lastTime = now;

      // Exponential lerp dampening for fluid frame progression
      var factor = 1 - Math.exp(-16 * dt);
      this.current += (target - this.current) * factor;

      if (Math.abs(target - this.current) < 0.0001) {
        this.current = target;
      }

      if (Math.abs(this.current - this.drawnFloat) > 0.0005) {
        this.drawPosition(this.current);
      }
    }
    var self = this;
    requestAnimationFrame(function (t) { self.loop(t); });
  };

  HeroSequence.prototype.init = function () {
    var self = this;
    this.loader.start();
    this.onResize();
    if (this.reducedMotion) {
      this.updateOverlays(0);
      this.drawPosition(0);
    } else {
      window.addEventListener("scroll", function () { self.onScroll(); }, { passive: true });
      this.onScroll();
    }
    window.addEventListener("resize", function () { self.onResize(); }, { passive: true });
    if (typeof IntersectionObserver !== "undefined") {
      this.io = new IntersectionObserver(
        function (entries) { self.inView = entries[0].isIntersecting; },
        { threshold: 0 }
      );
      this.io.observe(this.track);
    }
    this.loop();
  };

  window.AZALHero = {
    HeroSequence: HeroSequence,
    discoverFrameCount: discoverFrameCount,
  };
})();
