/* ==========================================================================
   Flower Delivery — CONTENT
   Edit this file to personalize the gift. No animation code lives here.
   ========================================================================== */
(function (FD) {
  'use strict';

  FD.content = {
    start: {
      title: 'ada kiriman buat kamu',
      subtitle: 'dikirim pelan-pelan, khusus buat satu orang.',
      button: 'terima paketnya',
      soundNote: 'nyalakan suara biar lebih seru'
    },

    delivery: {
      bubble: 'pakeett' // drawn inside the exterior SVG (js/art.js)
    },

    /* ---- Letter (placeholder — replace with the real message) ---- */
    letter: {
      greeting: 'hai sayang,',
      paragraphs: [
        'ada paket nih buat kamu, isinya apa yaa? kamu penasarann nggaa hihihi',
        'udah lama aku ngga ngasi bunga, tapi sekarang digital dulu ya hehehe'
      ],
      signature: '— dari mamas jelek',
      continueLabel: 'lanjut'
    },

    bouquet: {
      hint: 'klik bunganya deh sayang',
      ariaLabel: 'buket bunga — ketuk untuk melihat bunganya satu per satu'
    },

    /* ---- Flowers (data-driven: add/remove objects, no UI changes needed) ----
       glow: tint used for the soft halo behind the flower. */
    flowers: [
      {
        id: 'rose',
        name: 'mawar',
        meaningTitle: 'love',
        meaning: 'mawar ini artinya cinta dan sayang sama kamu, hehehe',
        message: 'minta maaff yaa cintaku sayangkuuu',
        asset: 'assets/svg/flowers/rose.svg',
        glow: '#F0627C'
      },
      {
        id: 'tulip',
        name: 'tulip',
        meaningTitle: 'aku minta maaf sama kamu',
        meaning: 'karna ini bunganya lucu warna pink kaya kamu suka, jadinya aku minta maaf pake bunga ini',
        message: 'minta maafnya sambil ngerayu pake bunga dengan warna kesukaan kamu.',
        asset: 'assets/svg/flowers/tulip.svg',
        glow: '#F59AB2'
      },
      {
        id: 'sunflower',
        name: 'sunflower',
        meaningTitle: 'keceriaan',
        meaning: 'maacii yaa kamu udah jadi alesan aku buat ceria jugaa',
        message: 'minta maaff yaa dan maacii udah jadi alesan aku ceriaa',
        asset: 'assets/svg/flowers/sunflower.svg',
        glow: '#F7C33A'
      },
      {
        id: 'daisy',
        name: 'daisy',
        meaningTitle: 'perasaan aku ke kamu',
        meaning: 'karena bunganya warna putih jadinya aku mau minta maaf lagi sama kamu karena aku udah nyebelin semalemm',
        message: 'minta maaf nya tulus ini setulus bunga nya warna putihh',
        asset: 'assets/svg/flowers/daisy.svg',
        glow: '#EDE6F7'
      },
      {
        id: 'lavender',
        name: 'lavender',
        meaningTitle: 'wangi kamu yang aku selalu inget',
        meaning: 'karena lavender itu wangi dan kamu juga kalo sama aku selalu wangi jadinya ini juga sesuatu buat aku kasih ke kamu hehe',
        message: 'minta maaff yaa sayangkuu yang wangiii',
        asset: 'assets/svg/flowers/lavender.svg',
        glow: '#A88BE0'
      }
    ],

    /* ---- Final reveal (required lines must stay exactly as written) ---- */
    finalReveal: {
      intro: 'ini buat kamu ya',
      lines: [
        'all flowers have one thing in common',
        "they're all pretty.",
        'but...',
        'none of them are prettier than you'
      ],
      personalMessage: 'aku minta maaff yaa karena udah nyebelin dan nambahin beban kamuu, aku sayang kamuuu',
      replayLabel: 'ulang dari awal'
    },

    ui: {
      packageHint: 'ketuk paketnya',
      flowerContinue: 'ketuk untuk lanjut',
      flowerComplete: 'dan kalau semuanya disatukan…',
      flowerAria: (i, total, name) => `bunga ${i} dari ${total}: ${name}. ketuk untuk lanjut`,
      mute: 'matikan suara',
      unmute: 'nyalakan suara'
    }
  };
})(window.FD);
