/* ==========================================================================
   Flower Delivery — config, timing, helpers, GSAP fallback
   ========================================================================== */
window.FD = window.FD || {};

(function (FD) {
  'use strict';

  /* ---------- Timing (ms). Tunable — pauses are part of the story. ---------- */
  FD.TIMINGS = Object.freeze({
    START_FADE: 600,
    DELIVERY_VAN: 2500,
    DELIVERY_PAUSE: 800,
    DOORBELL_PAUSE: 700,
    CROSSFADE: 800,
    DOOR_OPEN: 700,
    PACKAGE_MOVE: 1000,
    PACKAGE_OPEN: 800,
    LETTER_REVEAL: 700,
    BOUQUET_REVEAL: 1000,
    BOUQUET_GLOW_DELAY: 1500,
    BACKGROUND_DARKEN: 1200,
    HINT_FADE: 600,
    FLOWER_TRANSITION: 800,
    FLOWER_FLOAT: 4000,
    FLOWER_COMPLETE_HOLD: 1600,
    FINAL_BOUQUET_REVEAL: 1000,
    FINAL_INTRO_DELAY: 1000,
    TYPING_SPEED: 40,
    /* pause after line 1, 2, 3 — the longest one lands before the punchline */
    LINE_PAUSES: [650, 750, 1250],
    CURSOR_END_BLINK: 2700
  });

  /* ---------- Motion ---------- */
  const reducedQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false };

  FD.motion = {
    get reduced() { return reducedQuery.matches; }
  };

  /** GSAP duration in seconds; shortened when reduced motion is requested. */
  FD.dur = (ms) => (FD.motion.reduced ? Math.min(ms, 240) : ms) / 1000;

  /** Story pause. Not shortened: pauses are not motion. */
  FD.wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  /* ---------- DOM helpers ---------- */
  FD.byId = (id) => document.getElementById(id);

  FD.point = (el, ax = 0.5, ay = 0.5) => {
    const r = el.getBoundingClientRect();
    return { x: r.left + r.width * ax, y: r.top + r.height * ay };
  };

  FD.delta = (from, to) => ({ x: from.x - to.x, y: from.y - to.y });

  FD.announce = (text) => {
    const live = FD.byId('live');
    if (!live) return;
    live.textContent = '';
    setTimeout(() => { live.textContent = text; }, 60);
  };

  /** Switch inline scene SVGs between slice (portrait) and meet (wide screens). */
  FD.fitArt = () => {
    const wide = window.innerWidth / window.innerHeight > 0.8;
    document.querySelectorAll('.scene-art').forEach((svg) => {
      svg.setAttribute('preserveAspectRatio', wide ? 'xMidYMax meet' : 'xMidYMax slice');
    });
  };

  /* ---------- GSAP fallback ----------
     If the CDN fails, jump straight to end states so the story still completes. */
  if (!window.gsap) {
    console.warn('[flower-delivery] GSAP unavailable — using instant fallback.');
    window.gsap = createFallback();
  }

  function createFallback() {
    const KEYS = ['x', 'y', 'scale', 'scaleX', 'scaleY', 'rotation'];

    const toList = (t) => {
      if (!t) return [];
      if (typeof t === 'string') return Array.from(document.querySelectorAll(t));
      if (t instanceof Element) return [t];
      return Array.from(t).filter(Boolean);
    };

    const num = (value, prev) => {
      if (typeof value === 'string' && /^[+-]=/.test(value)) {
        return prev + parseFloat(value.replace('=', ''));
      }
      return parseFloat(value);
    };

    const apply = (targets, vars) => {
      toList(targets).forEach((el) => {
        const s = el.__fdT || (el.__fdT = { x: 0, y: 0, scale: 1, scaleX: 1, scaleY: 1, rotation: 0 });
        let touched = false;
        KEYS.forEach((k) => {
          if (k in vars) { s[k] = num(vars[k], s[k]); touched = true; }
        });
        if ('scale' in vars) { s.scaleX = s.scaleY = s.scale; }
        if (touched) {
          el.style.transformBox = 'fill-box';
          el.style.transformOrigin = vars.transformOrigin || el.style.transformOrigin || '50% 50%';
          el.style.transform =
            `translate(${s.x}px, ${s.y}px) rotate(${s.rotation}deg) scale(${s.scaleX}, ${s.scaleY})`;
        }
        if ('opacity' in vars) el.style.opacity = vars.opacity;
        if ('autoAlpha' in vars) {
          el.style.opacity = vars.autoAlpha;
          el.style.visibility = Number(vars.autoAlpha) === 0 ? 'hidden' : 'inherit';
        }
      });
    };

    const done = (vars) => {
      if (vars && typeof vars.onComplete === 'function') {
        try { vars.onComplete(); } catch (e) { /* ignore */ }
      }
      const p = Promise.resolve();
      return { then: (a, b) => p.then(a, b), kill() {} };
    };

    return {
      __fallback: true,
      set(t, v) { apply(t, v); return done(); },
      to(t, v) { apply(t, v); return done(v); },
      fromTo(t, from, to) { apply(t, from); apply(t, to); return done(to); },
      killTweensOf() {}
    };
  }
})(window.FD);
