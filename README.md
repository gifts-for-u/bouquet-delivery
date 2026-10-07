# Flower Delivery 💐 — A Gift For You

An interactive romantic web experience built mobile-first, designed to feel like a digital gift.

---

## 🌸 The 3-Chapter Story

1. **Chapter 1 — Delivery**
   - Warm, playful exterior scene with the delivery van driving in and decelerating to a gentle stop.
   - Pop speech bubble: `"pakeett"`.
   - Crossfade to cozy house interior with wooden floorboards and sunlight.
   - Front door swings open in 3D perspective; parcel glides forward onto the woven rug.
   - Parcel lid lifts off, revealing the personal letter first.
   - Tapping "lanjut" reveals the complete floral bouquet.
   - Intentional **1.5-second pause** before a soft ambient glow radiates, the background darkens, and the hint appears: `"klik bunganya deh sayang"`.

2. **Chapter 2 — Flowers**
   - Deep velvet-dark, calm, and intimate atmosphere.
   - Interactive carousel introducing all 5 flowers individually with halo glow and floating motion:
     - 🌹 **Rose** — *Love & Devotion*
     - 🌷 **Tulip** — *Perfect Love*
     - 🌻 **Sunflower** — *Adoration & Loyalty*
     - 🌼 **Daisy** — *Innocence & Joy*
     - 🪻 **Lavender** — *Devotion & Calm*
   - Each flower displays its symbolic meaning and an editable personal message.

3. **Chapter 3 — Final Reveal**
   - Flowers converge and the full bouquet returns under soft glow.
   - Intro title: `"ini buat kamu ya"`.
   - Terminal-style sequential typewriter effect in **JetBrains Mono**:
     ```text
     all_flowers_have_one_thing_in_common
     they're all pretty.
     but...
     none_of_them_are_prettier_than_you
     ```
   - Terminal cursor blinks and fades out.
   - Intimate personal message card appears with a warm italic serif note.
   - Replay button (`"ulang dari awal"`) seamlessly resets the journey.

---

## 🎨 Technology & Architecture

- **Vanilla HTML5 & CSS3**: Pure semantic markup and hardware-accelerated CSS animations.
- **Vanilla JavaScript**: Centralized state machine (`js/state.js`) and isolated content model (`js/content.js`).
- **Procedural Web Audio API (`js/audio.js`)**: Real-time synthesized sound effects (engine rumble, speech pop, cardboard rustle, celestial shimmer, monospaced typing ticks, warm chord chimes) with zero external MP3 dependencies, zero 404s, and mobile autoplay compliance.
- **Custom Vector SVG Artwork**: Fully scalable, responsive inline and asset SVGs.
- **GSAP Timelines**: Smooth coordinated animations with an embedded zero-dependency fallback in `js/config.js` if offline.
- **100% Static & GitHub Pages Ready**: Zero build tools required.

---

## 💌 How to Personalize Your Message

All textual content and personal notes are isolated in [`js/content.js`](file:///c:/Users/Lenovo/Documents/vibe_code/bouquet-delivery/js/content.js):

1. **Letter content** (`content.letter`):
   - Edit `greeting`, `body` paragraphs, and `signature`.
2. **Individual Flower Messages** (`content.flowers`):
   - Customize `meaning` and `message` for each of the 5 flowers.
3. **Final Personal Note** (`content.finalReveal.personalMessage`):
   - Replace the closing note that appears after the terminal punchline.

---

## 🚀 Running Locally

You can serve the directory using any static file server:

```bash
# Using Python
python -m http.server 8080

# Or using Node.js / npx
npx serve .
```

Open [http://localhost:8080](http://localhost:8080) in your mobile browser or desktop browser in device simulation mode.

---

## 🌐 Deploying to GitHub Pages

1. Push this repository to GitHub.
2. In your repository settings, go to **Pages**.
3. Under **Build and deployment**, set Source to **Deploy from a branch** (`main` / root `/`).
4. Your romantic gift is instantly live!
