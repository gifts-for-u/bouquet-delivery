/* ==========================================================================
   Flower Delivery — Main Application Controller
   Lifecycle, startup sequence, sound toggle, replay orchestration.
   ========================================================================== */
(function (FD) {
  'use strict';

  function init() {
    // Populate start screen copy
    const startTitle = FD.byId('start-title');
    const startSub = FD.byId('start-subtitle');
    const startBtn = FD.byId('start-btn');
    const soundNote = FD.byId('start-sound-note');
    const muteBtn = FD.byId('mute-btn');

    if (startTitle) startTitle.textContent = FD.content.start.title;
    if (startSub) startSub.textContent = FD.content.start.subtitle;
    if (startBtn) startBtn.textContent = FD.content.start.button;
    if (soundNote) soundNote.textContent = FD.content.start.soundNote;

    // Render initial scenes
    FD.delivery.init();
    FD.package.init();

    // Setup Start interaction
    if (startBtn) {
      startBtn.addEventListener('click', onStartExperience, { once: true });
    }

    // Setup Mute toggle
    if (muteBtn) {
      muteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        FD.audio.toggleMute();
      });
    }

    // Setup Flower advancement tap & button
    const flowerAdvanceBtn = FD.byId('flower-advance-btn');
    const flowerStageCard = FD.byId('flower-stage-card');

    if (flowerAdvanceBtn) {
      flowerAdvanceBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        FD.flowers.advance();
      });
    }

    if (flowerStageCard) {
      flowerStageCard.addEventListener('click', () => {
        FD.flowers.advance();
      });
    }

    // Setup Replay button
    const replayBtn = FD.byId('replay-button');
    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        window.location.reload();
      });
    }

    // Window resize handler
    window.addEventListener('resize', FD.fitArt);
    FD.fitArt();
  }

  function onStartExperience() {
    // 1. Initialize audio on explicit user interaction
    FD.audio.init();

    const startScreen = FD.byId('start-screen');
    if (startScreen) {
      gsap.to(startScreen, {
        autoAlpha: 0,
        duration: FD.dur(FD.TIMINGS.START_FADE),
        ease: 'power2.inOut',
        onComplete: () => {
          startScreen.style.display = 'none';
          FD.delivery.start();
        }
      });
    } else {
      FD.delivery.start();
    }
  }

  // DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})(window.FD);
