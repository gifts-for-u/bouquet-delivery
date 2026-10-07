/* ==========================================================================
   Flower Delivery — centralized state
   ========================================================================== */
(function (FD) {
  'use strict';

  const SCREENS = Object.freeze({
    START: 'START',
    DELIVERY: 'DELIVERY',
    HOUSE_TRANSITION: 'HOUSE_TRANSITION',
    PACKAGE_ARRIVAL: 'PACKAGE_ARRIVAL',
    PACKAGE_READY: 'PACKAGE_READY',
    PACKAGE_OPENING: 'PACKAGE_OPENING',
    LETTER: 'LETTER',
    BOUQUET_REVEAL: 'BOUQUET_REVEAL',
    BOUQUET_HINT: 'BOUQUET_HINT',
    FLOWER_EXPLORATION: 'FLOWER_EXPLORATION',
    FLOWER_COMPLETE: 'FLOWER_COMPLETE',
    BOUQUET_RETURN: 'BOUQUET_RETURN',
    FINAL_INTRO: 'FINAL_INTRO',
    FINAL_TYPING: 'FINAL_TYPING',
    FINAL_MESSAGE: 'FINAL_MESSAGE'
  });

  const ORDER = Object.keys(SCREENS);
  const NIGHT_FROM = ORDER.indexOf(SCREENS.BOUQUET_HINT);
  const THEME = { day: '#F7C2B4', night: '#09080D' };

  const state = {
    screen: SCREENS.START,
    flowerIndex: 0,
    muted: false,
    locked: false // true while a flower transition is running
  };

  function setScreen(screen) {
    state.screen = screen;
    const chapter = ORDER.indexOf(screen) >= NIGHT_FROM ? 'night' : 'day';
    document.body.dataset.screen = screen;
    if (document.body.dataset.chapter !== chapter) {
      document.body.dataset.chapter = chapter;
      const meta = document.querySelector('meta[name="theme-color"]');
      if (meta) meta.setAttribute('content', THEME[chapter]);
    }
  }

  FD.SCREENS = SCREENS;
  FD.state = state;
  FD.setScreen = setScreen;
  FD.is = (screen) => state.screen === screen;
})(window.FD);
