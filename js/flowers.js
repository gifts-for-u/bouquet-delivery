/* ==========================================================================
   Flower Delivery — Chapter 2: Bouquet Reveal & Flower Exploration
   1.5s delay before glow, background darkens, "klik bunganya deh sayang",
   floating flowers carousel, data-driven, smooth transitions.
   ========================================================================== */
(function (FD) {
  'use strict';

  function revealBouquet() {
    FD.setScreen(FD.SCREENS.BOUQUET_REVEAL);
    FD.announce('Buket bunga yang indah telah terbuka di hadapanmu');

    const interiorEl = FD.byId('scene-interior');
    const bouquetSection = FD.byId('bouquet-section');
    const bouquetWrap = FD.byId('bouquet-interactive-wrap');
    const bouquetGlow = FD.byId('bouquet-ambient-glow-layer');
    const hint = FD.byId('bouquet-hint');

    // Hide previous scenes
    if (interiorEl) {
      gsap.to(interiorEl, { autoAlpha: 0, duration: 0.6 });
    }

    // Show bouquet section
    if (bouquetSection) {
      bouquetSection.classList.add('is-active');
      gsap.set(bouquetSection, { autoAlpha: 1 });
    }

    // Reset initial bouquet state: NO glow, normal background
    if (bouquetGlow) gsap.set(bouquetGlow, { autoAlpha: 0 });
    if (hint) {
      hint.textContent = FD.content.bouquet.hint;
      hint.classList.remove('is-visible');
    }

    // Bouquet entrance animation (power/expo easing)
    if (bouquetWrap) {
      gsap.fromTo(
        bouquetWrap,
        { scale: 0.75, y: 30, autoAlpha: 0 },
        {
          scale: 1,
          y: 0,
          autoAlpha: 1,
          duration: FD.dur(FD.TIMINGS.BOUQUET_REVEAL),
          ease: 'power3.out',
          onComplete: () => {
            startBouquetWaitSequence();
          }
        }
      );
    } else {
      startBouquetWaitSequence();
    }
  }

  /**
   * CRITICAL TIMING REQUIREMENT:
   * The bouquet appears without glow.
   * Then wait approximately 1.5 seconds.
   * After delay: soft glow appears, background darkens, hint fades in.
   */
  function startBouquetWaitSequence() {
    FD.wait(FD.TIMINGS.BOUQUET_GLOW_DELAY).then(() => {
      FD.setScreen(FD.SCREENS.BOUQUET_HINT);

      const bouquetGlow = FD.byId('bouquet-ambient-glow-layer');
      const bouquetSection = FD.byId('bouquet-section');
      const hint = FD.byId('bouquet-hint');
      const bouquetWrap = FD.byId('bouquet-interactive-wrap');

      // Sound shimmer
      FD.audio.shimmer();

      // Background darkens beneath bouquet
      if (bouquetSection) {
        bouquetSection.classList.add('is-darkened');
      }

      // Soft glow appears around bouquet and pulses subtly
      if (bouquetGlow) {
        gsap.to(bouquetGlow, {
          autoAlpha: 1,
          duration: FD.dur(1000),
          ease: 'power2.out',
          onComplete: () => {
            if (!FD.motion.reduced) {
              gsap.to(bouquetGlow, {
                scale: 1.08,
                duration: 2.2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
              });
            }
          }
        });
      }

      // Subtle float for bouquet via CSS
      if (bouquetWrap && !FD.motion.reduced) {
        bouquetWrap.classList.add('is-floating');
      }

      // Hint appears: "klik bunganya deh sayang"
      if (hint) {
        FD.wait(FD.TIMINGS.HINT_FADE).then(() => {
          hint.classList.add('is-visible');
        });
      }

      // Make bouquet & hint tappable
      const onBouquetTap = (e) => {
        if (e) e.preventDefault();
        if (bouquetWrap) {
          bouquetWrap.classList.remove('is-floating');
          bouquetWrap.removeEventListener('click', onBouquetTap);
          bouquetWrap.removeEventListener('touchstart', onBouquetTap);
          bouquetWrap.removeEventListener('keydown', onBouquetKey);
        }
        if (hint) {
          hint.removeEventListener('click', onBouquetTap);
          hint.removeEventListener('touchstart', onBouquetTap);
        }
        startFlowerExploration();
      };

      const onBouquetKey = (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onBouquetTap(e);
        }
      };

      if (bouquetWrap) {
        bouquetWrap.setAttribute('tabindex', '0');
        bouquetWrap.setAttribute('role', 'button');
        bouquetWrap.setAttribute('aria-label', FD.content.bouquet.ariaLabel);
        bouquetWrap.addEventListener('click', onBouquetTap);
        bouquetWrap.addEventListener('touchstart', onBouquetTap, { passive: false });
        bouquetWrap.addEventListener('keydown', onBouquetKey);
      }

      if (hint) {
        hint.addEventListener('click', onBouquetTap);
        hint.addEventListener('touchstart', onBouquetTap, { passive: false });
      }
    });
  }

  /**
   * Chapter 2: Transitions to dark screen and introduces flowers one by one
   */
  function startFlowerExploration() {
    FD.setScreen(FD.SCREENS.FLOWER_EXPLORATION);
    FD.state.flowerIndex = 0;

    const bouquetSection = FD.byId('bouquet-section');
    const flowersSection = FD.byId('flowers-exploration-section');

    // Fade out bouquet section, activate dark flowers exploration
    gsap.to(bouquetSection, {
      autoAlpha: 0,
      duration: 0.6,
      onComplete: () => {
        bouquetSection.classList.remove('is-active');
        flowersSection.classList.add('is-active');
        gsap.set(flowersSection, { autoAlpha: 1 });
        renderFlower(0, 'next');
      }
    });
  }

  function renderFlower(index, direction = 'next') {
    const list = FD.content.flowers;
    if (index >= list.length) {
      finishFlowerExploration();
      return;
    }

    FD.state.flowerIndex = index;
    const flower = list[index];
    FD.announce(FD.content.ui.flowerAria(index + 1, list.length, flower.name));

    const card = FD.byId('flower-stage-card');
    const flowerArt = FD.byId('flower-art-display');
    const nameEl = FD.byId('flower-name');
    const titleEl = FD.byId('flower-meaning-title');
    const meaningEl = FD.byId('flower-meaning-body');
    const messageEl = FD.byId('flower-personal-message');
    const counterEl = FD.byId('flower-counter');
    const haloEl = FD.byId('flower-glow-halo');

    // Update copy
    if (nameEl) nameEl.textContent = flower.name;
    if (titleEl) titleEl.textContent = flower.meaningTitle;
    if (meaningEl) meaningEl.textContent = flower.meaning;
    if (messageEl) messageEl.textContent = flower.message;
    if (counterEl) counterEl.textContent = `${index + 1} / ${list.length}`;

    // Glow tint
    if (haloEl && flower.glow) {
      haloEl.style.background = `radial-gradient(circle, ${flower.glow}55 0%, ${flower.glow}15 50%, transparent 75%)`;
    }

    // Load SVG asset
    if (flowerArt) {
      flowerArt.innerHTML = `<img src="${flower.asset}" alt="${flower.name}" class="flower-single-svg" loading="eager" />`;
    }

    // Transition animation
    const fromX = direction === 'next' ? 40 : -40;
    gsap.fromTo(
      card,
      { x: fromX, autoAlpha: 0, scale: 0.94 },
      {
        x: 0,
        autoAlpha: 1,
        scale: 1,
        duration: FD.dur(FD.TIMINGS.FLOWER_TRANSITION),
        ease: 'power2.out',
        onComplete: () => {
          FD.state.locked = false;
        }
      }
    );

    // Floating animation on flower art (3-5s cycle, vertical ±8px, tiny rotation ±1deg)
    if (flowerArt && !FD.motion.reduced) {
      gsap.killTweensOf(flowerArt);
      gsap.fromTo(
        flowerArt,
        { y: -6, rotation: -1 },
        {
          y: 6,
          rotation: 1,
          duration: 2.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        }
      );
    }
  }

  function advanceFlower() {
    if (FD.state.locked) return;
    FD.state.locked = true;

    FD.audio.flowerTransition();
    const nextIdx = FD.state.flowerIndex + 1;
    const card = FD.byId('flower-stage-card');

    gsap.to(card, {
      x: -35,
      autoAlpha: 0,
      scale: 0.94,
      duration: 0.35,
      ease: 'power2.in',
      onComplete: () => {
        renderFlower(nextIdx, 'next');
      }
    });
  }

  function finishFlowerExploration() {
    FD.setScreen(FD.SCREENS.FLOWER_COMPLETE);
    FD.announce(FD.content.ui.flowerComplete);

    const flowersSection = FD.byId('flowers-exploration-section');
    const completeNotice = FD.byId('flower-complete-notice');

    if (completeNotice) {
      completeNotice.textContent = FD.content.ui.flowerComplete;
      completeNotice.classList.add('is-visible');
    }

    FD.wait(FD.TIMINGS.FLOWER_COMPLETE_HOLD).then(() => {
      // Fade out flowers section and converge back to final bouquet reveal
      gsap.to(flowersSection, {
        autoAlpha: 0,
        duration: 0.8,
        onComplete: () => {
          flowersSection.classList.remove('is-active');
          if (completeNotice) completeNotice.classList.remove('is-visible');
          FD.finalReveal.start();
        }
      });
    });
  }

  FD.flowers = {
    revealBouquet: revealBouquet,
    advance: advanceFlower
  };
})(window.FD);
