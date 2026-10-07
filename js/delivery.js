/* ==========================================================================
   Flower Delivery — Chapter 1: Delivery Scene
   Delivery vehicle drives in, settles, says "pakeett", crossfades to interior.
   ========================================================================== */
(function (FD) {
  'use strict';

  function initDelivery() {
    const container = FD.byId('scene-exterior');
    if (!container) return;
    container.innerHTML = FD.art.getExteriorSceneSvg();
    FD.fitArt();
  }

  function start() {
    FD.setScreen(FD.SCREENS.DELIVERY);
    FD.announce('Mobil pengantar bunga sedang menuju ke rumahmu');

    const vanWrap = FD.byId('delivery-van-wrap');
    const wheelBack = FD.byId('van-wheel-back');
    const wheelFront = FD.byId('van-wheel-front');
    const bubble = FD.byId('delivery-bubble');
    const exteriorEl = FD.byId('scene-exterior');
    const interiorEl = FD.byId('scene-interior');

    if (!vanWrap || !gsap) {
      // Emergency fallback
      FD.wait(FD.TIMINGS.DELIVERY_VAN).then(() => {
        FD.package.start();
      });
      return;
    }

    // The road surface is at y: 630-800. Wheels touch at offset +172, so y=515 places the van directly on the road
    const VAN_ROAD_Y = 515;

    // Reset initial positions
    gsap.set(vanWrap, { x: -340, y: VAN_ROAD_Y, autoAlpha: 1 });
    gsap.set([wheelBack, wheelFront], { rotation: 0, transformOrigin: '50% 50%' });
    gsap.set(bubble, { scale: 0, autoAlpha: 0, transformOrigin: '50% 100%' });
    gsap.set(exteriorEl, { autoAlpha: 1 });
    gsap.set(interiorEl, { autoAlpha: 0 });

    const vanDuration = FD.dur(FD.TIMINGS.DELIVERY_VAN);

    // 1. Van drives along the road from offscreen left and decelerates to a gentle stop
    gsap.to(vanWrap, {
      x: 170,
      y: VAN_ROAD_Y,
      duration: vanDuration,
      ease: 'power2.out',
      onComplete: () => {
        // Subtle suspension settling bounce on the road
        if (!FD.motion.reduced) {
          gsap.fromTo(
            vanWrap,
            { y: VAN_ROAD_Y },
            { y: VAN_ROAD_Y + 3, duration: 0.18, yoyo: true, repeat: 1, ease: 'sine.inOut' }
          );
        }

        // Play gentle doorbell / arrival chime
        FD.audio.doorbell();

        // 2. "pakeett" bubble pops up
        FD.wait(180).then(() => {
          FD.audio.bubblePop();
          gsap.to(bubble, {
            scale: 1,
            autoAlpha: 1,
            duration: 0.45,
            ease: 'back.out(1.8)',
            onComplete: () => {
              FD.announce('Paket telah tiba: pakeett');
              // 3. Pause, then crossfade to interior
              FD.wait(FD.TIMINGS.DELIVERY_PAUSE).then(() => {
                crossfadeToInterior();
              });
            }
          });
        });
      }
    });

    // Spinning wheels synchronized with forward driving motion
    if (!FD.motion.reduced) {
      gsap.to([wheelBack, wheelFront], {
        rotation: 720,
        duration: vanDuration,
        ease: 'power2.out'
      });
    }
  }

  function crossfadeToInterior() {
    FD.setScreen(FD.SCREENS.HOUSE_TRANSITION);
    const exteriorEl = FD.byId('scene-exterior');
    const interiorEl = FD.byId('scene-interior');
    const crossfadeDur = FD.dur(FD.TIMINGS.CROSSFADE);

    // Render interior scene if not yet mounted
    FD.package.init();

    gsap.to(exteriorEl, {
      autoAlpha: 0,
      duration: crossfadeDur,
      ease: 'power1.inOut'
    });

    gsap.to(interiorEl, {
      autoAlpha: 1,
      duration: crossfadeDur,
      ease: 'power1.inOut',
      onComplete: () => {
        FD.package.start();
      }
    });
  }

  FD.delivery = {
    init: initDelivery,
    start: start
  };
})(window.FD);
