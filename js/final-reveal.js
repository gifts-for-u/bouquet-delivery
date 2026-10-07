/* ==========================================================================
   Flower Delivery — Chapter 3: Final Romantic Reveal
   Bouquet returns, "ini buat kamu ya", JetBrains Mono 4-line terminal typing,
   blinking cursor fadeout, final personal message, and replay affordance.
   ========================================================================== */
(function (FD) {
  'use strict';

  function start() {
    FD.setScreen(FD.SCREENS.BOUQUET_RETURN);
    FD.announce('Buket bunga kembali bersatu.');

    const section = FD.byId('final-reveal-section');
    const bouquetWrap = FD.byId('final-bouquet-wrap');
    const introEl = FD.byId('final-intro-text');
    const typingBox = FD.byId('final-typing-container');
    const personalMsg = FD.byId('final-personal-card');
    const replayBtn = FD.byId('replay-button');

    if (!section) return;

    // Reset section elements
    section.classList.add('is-active');
    gsap.set(section, { autoAlpha: 1 });
    if (typingBox) typingBox.innerHTML = '';
    if (personalMsg) gsap.set(personalMsg, { autoAlpha: 0, y: 15 });
    if (replayBtn) gsap.set(replayBtn, { autoAlpha: 0 });

    // 1. Bouquet returns with gentle floating and subtle glow
    FD.audio.finalChime();

    if (bouquetWrap) {
      gsap.fromTo(
        bouquetWrap,
        { scale: 0.8, autoAlpha: 0, y: 30 },
        {
          scale: 1,
          autoAlpha: 1,
          y: 0,
          duration: FD.dur(FD.TIMINGS.FINAL_BOUQUET_REVEAL),
          ease: 'power3.out',
          onComplete: () => {
            if (!FD.motion.reduced) {
              gsap.to(bouquetWrap, {
                y: -6,
                duration: 2.8,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut'
              });
            }
          }
        }
      );
    }

    // 2. Show intro: "ini buat kamu ya"
    FD.setScreen(FD.SCREENS.FINAL_INTRO);
    if (introEl) {
      introEl.textContent = FD.content.finalReveal.intro;
      gsap.fromTo(
        introEl,
        { autoAlpha: 0, y: 12 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          onComplete: () => {
            // Wait approximately 1 second pause before typing
            FD.wait(FD.TIMINGS.FINAL_INTRO_DELAY).then(() => {
              startTypingSequence();
            });
          }
        }
      );
    } else {
      FD.wait(FD.TIMINGS.FINAL_INTRO_DELAY).then(() => {
        startTypingSequence();
      });
    }
  }

  /**
   * Terminal-style typing sequence in JetBrains Mono.
   * Required exact lines:
   *   all_flowers_have_one_thing_in_common
   *   they're all pretty.
   *   but...
   *   none_of_them_are_prettier_than_you
   */
  async function startTypingSequence() {
    FD.setScreen(FD.SCREENS.FINAL_TYPING);
    const container = FD.byId('final-typing-container');
    if (!container) return;

    container.innerHTML = '';
    const lines = FD.content.finalReveal.lines;
    const charDelay = FD.TIMINGS.TYPING_SPEED;
    const linePauses = FD.TIMINGS.LINE_PAUSES;

    // Create a live cursor element
    const cursor = document.createElement('span');
    cursor.className = 'terminal-cursor';
    cursor.textContent = '|';

    for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
      const lineText = lines[lineIndex];

      // Each line MUST be a separate rendered DOM element
      const lineEl = document.createElement('div');
      lineEl.className = `typing-line typing-line-${lineIndex + 1}`;
      container.appendChild(lineEl);

      // Append cursor to current line
      lineEl.appendChild(cursor);

      // If reduced motion is requested, render full line immediately
      if (FD.motion.reduced) {
        lineEl.textContent = lineText;
        await FD.wait(200);
        continue;
      }

      // Type characters sequentially
      for (let charIndex = 0; charIndex < lineText.length; charIndex++) {
        const textNode = document.createTextNode(lineText[charIndex]);
        lineEl.insertBefore(textNode, cursor);
        FD.audio.typingTick();
        await FD.wait(charDelay);
      }

      // Pause before next line
      if (lineIndex < lines.length - 1) {
        const pauseTime = linePauses[lineIndex] || 700;
        await FD.wait(pauseTime);
      }
    }

    // Finished typing all lines
    FD.setScreen(FD.SCREENS.FINAL_MESSAGE);
    FD.announce('none of them are prettier than you');

    // Cursor blinks briefly then fades out
    await FD.wait(FD.TIMINGS.CURSOR_END_BLINK);
    gsap.to(cursor, {
      autoAlpha: 0,
      duration: 0.6,
      onComplete: () => {
        if (cursor.parentNode) cursor.parentNode.removeChild(cursor);
      }
    });

    // Reveal final personal message
    const personalCard = FD.byId('final-personal-card');
    const personalText = FD.byId('final-personal-text');
    const replayBtn = FD.byId('replay-button');

    if (personalText) {
      personalText.textContent = FD.content.finalReveal.personalMessage;
    }

    if (personalCard) {
      gsap.to(personalCard, {
        autoAlpha: 1,
        y: 0,
        duration: 1.0,
        ease: 'power2.out'
      });
    }

    if (replayBtn) {
      const replaySpan = replayBtn.querySelector('span');
      if (replaySpan && FD.content.finalReveal.replayLabel) {
        replaySpan.textContent = FD.content.finalReveal.replayLabel;
      }
      gsap.to(replayBtn, {
        autoAlpha: 1,
        duration: 0.8,
        delay: 0.5,
        ease: 'power2.out'
      });
    }
  }

  FD.finalReveal = {
    start: start
  };
})(window.FD);
