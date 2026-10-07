/* ==========================================================================
   Flower Delivery — Chapter 1 Part 2: House Interior, Door, Package, Letter
   Door swings open, package glides in, lid opens, letter revealed FIRST.
   ========================================================================== */
(function (FD) {
  'use strict';

  function initPackage() {
    const container = FD.byId('scene-interior');
    if (!container || container.querySelector('svg')) return;
    
    container.innerHTML = FD.art.getInteriorSceneSvg();
    let hint = FD.byId('package-tap-hint');
    if (!hint) {
      hint = document.createElement('div');
      hint.id = 'package-tap-hint';
      hint.className = 'tap-hint-pill';
      hint.textContent = (FD.content && FD.content.ui) ? FD.content.ui.packageHint : 'ketuk paketnya';
      container.appendChild(hint);
    }
    FD.fitArt();
  }

  function start() {
    initPackage();
    FD.setScreen(FD.SCREENS.PACKAGE_ARRIVAL);

    const door = FD.byId('interior-door');
    const pkg = FD.byId('interior-package-wrap');
    const doorDur = FD.dur(FD.TIMINGS.DOOR_OPEN);
    const pkgDur = FD.dur(FD.TIMINGS.PACKAGE_MOVE);

    // Initial setup: door closed, package hidden in doorway
    gsap.set(door, { scaleX: 1, skewY: 0, transformOrigin: '12px 200px' });
    gsap.set(pkg, {
      x: 140,
      y: 190,
      scale: 0.38,
      autoAlpha: 0,
      transformOrigin: '160px 240px'
    });

    // 1. Door swings open
    gsap.to(door, {
      scaleX: 0.18,
      skewY: -10,
      duration: doorDur,
      ease: 'power2.inOut',
      onComplete: () => {
        // 2. Package enters through door and glides to resting position on rug
        gsap.to(pkg, {
          x: 140,
          y: 310,
          scale: 0.72,
          autoAlpha: 1,
          duration: pkgDur,
          ease: 'power2.out',
          onComplete: () => {
            // Door settles slightly ajar
            gsap.to(door, {
              scaleX: 0.32,
              skewY: -4,
              duration: 0.5,
              ease: 'power1.out'
            });

            makePackageReady();
          }
        });
      }
    });
  }

  function makePackageReady() {
    FD.setScreen(FD.SCREENS.PACKAGE_READY);
    FD.announce('Paket telah sampai di depanmu. Ketuk paket untuk membukanya.');

    const pkg = FD.byId('interior-package-wrap');
    const hint = FD.byId('package-tap-hint');
    if (hint) {
      hint.textContent = FD.content.ui.packageHint;
      hint.classList.add('is-visible');
    }

    const handleTap = (e) => {
      if (e) e.preventDefault();
      if (pkg) {
        gsap.killTweensOf(pkg);
        pkg.removeEventListener('click', handleTap);
        pkg.removeEventListener('touchstart', handleTap);
      }
      if (hint) {
        hint.removeEventListener('click', handleTap);
        hint.removeEventListener('touchstart', handleTap);
      }
      openPackage();
    };

    if (pkg) {
      pkg.style.cursor = 'pointer';
      // Subtle pulse affordance to invite tap (preserving base y: 310)
      if (!FD.motion.reduced) {
        gsap.to(pkg, {
          y: 304,
          duration: 1.2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut'
        });
      }

      if (!pkg.click) {
        pkg.click = function () {
          this.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true }));
        };
      }

      pkg.addEventListener('click', handleTap);
      pkg.addEventListener('touchstart', handleTap, { passive: false });
    }

    if (hint) {
      hint.addEventListener('click', handleTap);
      hint.addEventListener('touchstart', handleTap, { passive: false });
    }
  }

  function openPackage() {
    if (FD.state.screen === FD.SCREENS.PACKAGE_OPENING) return;
    FD.setScreen(FD.SCREENS.PACKAGE_OPENING);

    const pkg = FD.byId('interior-package-wrap');
    const lid = FD.byId('int-box-lid');
    const hint = FD.byId('package-tap-hint');

    if (hint) hint.classList.remove('is-visible');
    if (pkg) gsap.killTweensOf(pkg);

    // Cardboard / paper rustle sound
    FD.audio.packageOpen();

    // Lid lifts and floats gently aside
    const lidDur = FD.dur(FD.TIMINGS.PACKAGE_OPEN);
    if (lid) {
      gsap.to(lid, {
        y: -110,
        x: 25,
        rotation: 18,
        autoAlpha: 0,
        duration: lidDur,
        ease: 'power2.out',
        transformOrigin: '50% 50%',
        onComplete: () => {
          showLetter();
        }
      });
    } else {
      showLetter();
    }
  }

  /**
   * The letter MUST appear before the bouquet becomes the focus.
   * Renders the warm textured letter card with placeholder editable content.
   */
  function showLetter() {
    FD.setScreen(FD.SCREENS.LETTER);
    FD.announce('Surat ditemukan di dalam paket.');

    const letterOverlay = FD.byId('letter-overlay');
    const letterCard = FD.byId('letter-card');
    const greetingEl = FD.byId('letter-greeting');
    const bodyEl = FD.byId('letter-body');
    const sigEl = FD.byId('letter-sig');
    const continueBtn = FD.byId('letter-continue-btn');

    if (!letterOverlay || !letterCard) {
      FD.flowers.revealBouquet();
      return;
    }

    // Populate data from content.js
    const data = FD.content.letter;
    if (greetingEl) greetingEl.textContent = data.greeting;
    if (sigEl) sigEl.textContent = data.signature;
    if (continueBtn) continueBtn.textContent = data.continueLabel;

    if (bodyEl) {
      bodyEl.innerHTML = '';
      data.paragraphs.forEach((p) => {
        const pEl = document.createElement('p');
        pEl.textContent = p;
        bodyEl.appendChild(pEl);
      });
    }

    letterOverlay.classList.add('is-active');

    // Smooth entrance
    gsap.fromTo(
      letterCard,
      { y: 40, scale: 0.92, autoAlpha: 0 },
      {
        y: 0,
        scale: 1,
        autoAlpha: 1,
        duration: FD.dur(FD.TIMINGS.LETTER_REVEAL),
        ease: 'power2.out'
      }
    );

    const onContinue = (e) => {
      e.preventDefault();
      continueBtn.removeEventListener('click', onContinue);
      // Fade out letter card
      gsap.to(letterCard, {
        y: -25,
        autoAlpha: 0,
        duration: 0.45,
        ease: 'power2.in',
        onComplete: () => {
          letterOverlay.classList.remove('is-active');
          FD.flowers.revealBouquet();
        }
      });
    };

    if (continueBtn) {
      continueBtn.addEventListener('click', onContinue, { once: true });
    }
  }

  FD.package = {
    init: initPackage,
    start: start,
    openPackage: openPackage
  };
})(window.FD);
