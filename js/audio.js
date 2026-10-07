/* ==========================================================================
   Flower Delivery — Procedural Web Audio Sound Synthesizer
   Zero external audio file dependencies. Never fails due to 404 or network.
   Soft, warm, tactile sounds tuned specifically for a romantic story.
   ========================================================================== */
(function (FD) {
  'use strict';

  let ctx = null;

  function initAudio() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        ctx = new AudioCtx();
      }
    }
    if (ctx && ctx.state === 'suspended') {
      ctx.resume();
    }
  }

  function isMuted() {
    return FD.state && FD.state.muted;
  }

  /* Soft chime for delivery arriving / doorbell */
  function playDoorbell() {
    if (!ctx || isMuted()) return;
    try {
      const now = ctx.currentTime;
      [587.33, 880].forEach((freq, i) => { // D5, A5
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.22);
        gain.gain.setValueAtTime(0, now + i * 0.22);
        gain.gain.linearRampToValueAtTime(0.08, now + i * 0.22 + 0.04);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + i * 0.22 + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + i * 0.22);
        osc.stop(now + i * 0.22 + 0.85);
      });
    } catch (e) {
      // Audio error must never break experience
    }
  }

  /* Pop sound for "pakeett" speech bubble */
  function playBubblePop() {
    if (!ctx || isMuted()) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(780, now + 0.08);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.13);
    } catch (e) {}
  }

  /* Subtle cardboard / paper rustle on package open */
  function playPackageOpen() {
    if (!ctx || isMuted()) return;
    try {
      const now = ctx.currentTime;
      const bufferSize = ctx.sampleRate * 0.18;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(950, now);
      filter.Q.setValueAtTime(1.2, now);
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.linearRampToValueAtTime(0.001, now + 0.18);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start(now);
    } catch (e) {}
  }

  /* Soft magical shimmer / sparkle for bouquet glow */
  function playShimmer() {
    if (!ctx || isMuted()) return;
    try {
      const now = ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
      notes.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0, now + idx * 0.09);
        gain.gain.linearRampToValueAtTime(0.05, now + idx * 0.09 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.09 + 0.6);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.65);
      });
    } catch (e) {}
  }

  /* Soft whoosh / chime when changing flower */
  function playFlowerTransition() {
    if (!ctx || isMuted()) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, now);
      osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.25);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.36);
    } catch (e) {}
  }

  /* Soft typing tick */
  function playTypingTick() {
    if (!ctx || isMuted()) return;
    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800 + Math.random() * 200, now);
      gain.gain.setValueAtTime(0.02, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.03);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.035);
    } catch (e) {}
  }

  /* Warm chime chord when bouquet returns in final reveal */
  function playFinalChime() {
    if (!ctx || isMuted()) return;
    try {
      const now = ctx.currentTime;
      const chords = [392.00, 493.88, 587.33, 783.99, 987.77]; // G maj9
      chords.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0, now + idx * 0.06);
        gain.gain.linearRampToValueAtTime(0.07, now + idx * 0.06 + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + idx * 0.06 + 1.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 1.9);
      });
    } catch (e) {}
  }

  function toggleMute() {
    if (!FD.state) return false;
    FD.state.muted = !FD.state.muted;
    const btn = FD.byId('mute-btn');
    if (btn) {
      btn.setAttribute('aria-pressed', FD.state.muted ? 'true' : 'false');
      btn.title = FD.state.muted ? FD.content.ui.unmute : FD.content.ui.mute;
      btn.classList.toggle('is-muted', FD.state.muted);
    }
    return FD.state.muted;
  }

  FD.audio = {
    init: initAudio,
    doorbell: playDoorbell,
    bubblePop: playBubblePop,
    packageOpen: playPackageOpen,
    shimmer: playShimmer,
    flowerTransition: playFlowerTransition,
    typingTick: playTypingTick,
    finalChime: playFinalChime,
    toggleMute: toggleMute
  };
})(window.FD);
