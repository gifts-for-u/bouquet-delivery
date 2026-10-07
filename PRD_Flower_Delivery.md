# PRD — Flower Delivery

## 1. Product Overview
**Product:** Flower Delivery  
**Type:** Interactive romantic web experience  
**Platform:** Mobile-first web  
**Deployment:** GitHub Pages / static hosting

The experience tells a short story: a delivery vehicle arrives at a house, a package is brought inside, the recipient opens it and finds a message first, then a bouquet. The bouquet becomes interactive: each flower is introduced individually with its meaning. After all flowers are explored, the complete bouquet returns and leads into the final romantic reveal.

The site must feel like a digital gift, not a conventional landing page.

---

## 2. Experience Chapters

### Chapter 1 — Delivery
Warm, playful, illustrated, slightly whimsical.

### Chapter 2 — Flowers
Dark, minimal, elegant, calm, floating flowers with subtle glow.

### Chapter 3 — Final Reveal
Bouquet returns, intimate typography, typing animation, romantic payoff.

The visual intensity should deliberately change between chapters.

---

## 3. Complete User Flow

```text
START
  ↓
DELIVERY SCENE
  ↓
DELIVERY VAN ARRIVES
  ↓
"pakeett"
  ↓
CROSSFADE
  ↓
HOUSE INTERIOR
  ↓
DOOR OPENS
  ↓
PACKAGE ENTERS
  ↓
TAP PACKAGE
  ↓
PACKAGE OPENS
  ↓
LETTER APPEARS FIRST
  ↓
LETTER / MESSAGE
  ↓
BOUQUET REVEAL
  ↓
WAIT ~1.5s
  ↓
BOUQUET GLOW + BACKGROUND DARKENS
  ↓
"klik bunganya deh sayang"
  ↓
TAP BOUQUET
  ↓
DARK TRANSITION
  ↓
FLOWER #1
  ↓
FLOWER MEANING
  ↓
TAP
  ↓
FLOWER #2
  ↓
...
  ↓
LAST FLOWER
  ↓
BOUQUET RETURNS
  ↓
"ini buat kamu ya"
  ↓
TYPING REVEAL
  ↓
all_flowers_have_one_thing_in_common
  ↓
they're all pretty.
  ↓
but...
  ↓
none_of_them_are_prettier_than_you
```

---

# 4. Opening Delivery Scene

## Visual
Create a small illustrated house scene and delivery vehicle. Prefer custom SVG artwork rather than emoji.

Recommended implementation:
- SVG illustration
- CSS animation for simple effects
- GSAP timeline for coordinated movement where useful

The delivery vehicle starts outside the scene and drives toward the house.

Suggested duration: **2–3 seconds**.

Use smooth acceleration/deceleration and a small settling motion when the vehicle stops.

## Delivery Text

When the vehicle arrives, show:

```text
pakeett
```

Keep it casual and lowercase. It may have a small pop/bounce animation and an optional delivery sound.

---

# 5. House Interior Transition

After delivery, use a **crossfade** into the interior of the house.

Do not reload the page.

The house should feel visually related to the exterior scene.

---

# 6. Package Arrival

Inside the house:
1. Door starts closed.
2. Door opens.
3. Package enters.
4. Package moves to a natural resting position.
5. Door settles.
6. Package becomes the obvious interactive object.

The package must be tappable.

On tap:
- lid opens
- contents are revealed
- letter appears first

Optional sound:
- cardboard opening
- soft paper movement

Avoid loud/comedic effects.

---

# 7. Letter First

The letter must appear **before the bouquet becomes the focus**.

Possible visual:
- paper texture
- slightly imperfect edges
- soft shadow
- warm typography

Actual copy will be supplied later.

Use placeholder content during development:

```text
Lorem ipsum dolor sit amet,
consectetur adipiscing elit...
```

The user can tap the letter or a continuation affordance to proceed to the bouquet.

---

# 8. Bouquet Reveal

Reveal a custom bouquet, preferably using layered SVG flower artwork.

The bouquet should initially appear without glow.

Then wait approximately **1.5 seconds**.

After the delay:
- soft glow appears around bouquet
- glow pulses subtly
- layer/background beneath the bouquet darkens
- bouquet becomes the visual focus

Then show:

```text
klik bunganya deh sayang
```

The hint should fade in rather than look like a normal button.

---

# 9. Flower Exploration

When the bouquet is tapped:
- transition to a dark screen
- show one flower
- center it
- add subtle floating motion
- add a thin/soft glow
- show flower name
- show flower meaning/message

Final visual should use actual SVG/illustration rather than flower emoji.

Suggested composition:

```text
             ✦

         [ FLOWER ]

             ✦

         FLOWER_NAME

       short meaning

       personal message

        TAP TO CONTINUE
```

The flower should float gently, approximately a 3–5 second cycle, with only a small vertical displacement and optional tiny rotation.

---

# 10. Flower Data

The flower system must be data-driven.

Example:

```js
const flowers = [
  {
    id: "rose",
    name: "rose",
    meaningTitle: "love & devotion",
    meaning: "Lorem ipsum...",
    message: "Lorem ipsum...",
    asset: "assets/svg/flowers/rose.svg"
  }
];
```

Adding or removing flowers must not require new UI components.

The exact flower selection can be decided later.

---

# 11. Flower Navigation

Primary interaction:

```text
TAP CURRENT FLOWER
        ↓
NEXT FLOWER
```

Swipe navigation may be added, but must not be the only way to continue.

All controls must work through touch.

---

# 12. Flower Completion

After the final flower, briefly indicate that the collection is complete, then transition back to the complete bouquet.

Avoid making this feel like an error/system screen.

Recommended transition:

```text
last flower
   ↓
fade
   ↓
optional tiny petal particles
   ↓
flowers converge
   ↓
complete bouquet
```

---

# 13. Final Bouquet Reveal

The complete bouquet returns and becomes the emotional focus.

Show:

```text
ini buat kamu ya
```

Then wait roughly **1 second**.

The bouquet should remain gently floating with a subtle glow.

---

# 14. Final Typing Sequence

Use **JetBrains Mono**.

All required lines are lowercase and each line must be a separate rendered element:

```text
all_flowers_have_one_thing_in_common
they're all pretty.
but...
none_of_them_are_prettier_than_you
```

Typing behavior:
1. Type line 1.
2. Short pause.
3. Type line 2.
4. Short pause.
5. Type line 3.
6. Short pause.
7. Type line 4.

Recommended typing speed: **30–50 ms per character**.

Use a terminal-style blinking cursor at the active typing position. After the final line, let it blink briefly and then disappear.

Long lines may wrap naturally on mobile, but each sentence remains its own DOM element.

---

# 15. Animation System

## Preferred: GSAP

GSAP is the preferred library for coordinated sequences because it supports CSS, SVG, timelines, easing, staggered animation, and browser-compatible animation control. citeturn0search2turn0search5

Use GSAP for:
- delivery vehicle timeline
- door animation
- package movement/opening
- bouquet reveal
- glow sequencing
- flower transitions
- bouquet reconstruction
- final reveal sequencing

Use CSS for simple:
- floating loops
- cursor blink
- basic opacity transitions
- tap feedback
- reduced-motion fallbacks

GSAP can be loaded from a CDN if a build system is not desired. citeturn0search5turn0search12

Do not use GSAP for every tiny effect.

---

# 16. SVG Strategy

SVG is preferred for:
- house
- door
- delivery vehicle
- package
- bouquet
- flowers
- petals
- decorative elements
- glow layers where useful

Assets may be:
1. custom-created
2. generated programmatically
3. sourced from a permissively licensed asset
4. modified into a consistent visual style

Check licenses before using external assets.

SVG requirements:
- responsive `viewBox`
- scalable
- no unnecessary fixed dimensions
- reasonable path complexity
- reusable groups where practical

---

# 17. Sound Design

Sound is optional but recommended.

Suggested sound events:

### Delivery
- subtle vehicle arrival
- soft doorbell / delivery cue

### Package
- cardboard lid opening
- paper movement

### Bouquet
- soft magical shimmer

### Flower exploration
- subtle transition sound

### Final reveal
- soft chime when bouquet returns

Sound should support the story, never dominate it.

The experience must remain understandable with sound disabled.

---

# 18. Audio Library

**Howler.js** is an optional candidate for audio management. It supports browser playback and CDN usage. citeturn0search4turn0search9

Use Howler.js if the project needs:
- multiple sound effects
- reliable playback management
- volume control
- audio sprites
- mobile-friendly handling

For one or two simple sounds, native `HTMLAudioElement` is preferred.

Do not add Howler merely because it exists.

Mobile browsers may restrict autoplay, so audio should be initialized after user interaction when necessary.

---

# 19. TUI / Terminal Aesthetic

The flower experience does **not** need to be a full TUI.

The intended visual language is:

```text
Delivery:
illustrated / warm

Flowers:
minimal / elegant

Final message:
JetBrains Mono / subtle terminal-inspired typography
```

WebTUI is an optional candidate for terminal-style elements because it is a modular CSS library for browser terminal UIs. citeturn0search0

Do not force WebTUI onto the delivery or flower screens.

---

# 20. Typography

### Delivery
Modern warm sans-serif or humanist font.

### Letter
Warm serif/sans or restrained handwritten-style font.

### Flower names
Elegant serif or clean sans-serif.

### Final reveal
**JetBrains Mono**.

Provide sensible fallbacks if external fonts fail.

---

# 21. Responsive Requirements

Mobile is the primary target.

Test at minimum:

```text
360x800
375x812
390x844
412x915
```

Requirements:
- no horizontal scrolling
- no clipped text
- bouquet stays visible
- touch controls are comfortable
- SVGs scale correctly
- animations stay inside viewport

Desktop should remain usable but is secondary.

Do not simply stretch the mobile scene to desktop.

---

# 22. Touch Requirements

Target at least approximately **44×44 CSS pixels** for interactive controls.

Avoid:
- hover-only interactions
- tiny controls
- swipe-only navigation
- interactions requiring precise pointer positioning

---

# 23. Accessibility

Minimum:
- semantic buttons for interaction
- accessible labels
- adequate contrast
- visible focus states
- `prefers-reduced-motion`
- no information conveyed only by sound
- typing animation must not permanently hide content

Reduced-motion mode should use simpler fades and minimal floating motion.

---

# 24. Performance

Prioritize mobile performance.

- optimize SVGs
- compress audio
- avoid unnecessary raster assets
- avoid heavy libraries when CSS/SVG is enough
- lazy-load non-critical audio if needed
- avoid expensive continuous rendering
- do not use WebGL unless it clearly improves the visual result

---

# 25. Dependency Strategy

External libraries are explicitly allowed.

Before adding a dependency:
1. verify browser/static-hosting compatibility
2. verify license
3. check bundle size
4. confirm it solves a real problem
5. prefer CDN/static use when practical
6. avoid server requirements

Recommended candidates:

| Purpose | Candidate | Recommendation |
|---|---|---|
| Complex animation | GSAP | Recommended |
| Audio | Howler.js | Optional |
| Browser TUI styling | WebTUI | Optional |
| Illustration | Native SVG | Recommended |
| Simple animation | CSS | Recommended |
| Simple audio | HTMLAudioElement | Recommended when sufficient |

---

# 26. Static Hosting

The final project must work on GitHub Pages.

No:
- backend
- database
- API key
- server-side routing
- server-rendered content
- environment secrets

Use relative asset paths.

If a build system is introduced, the deployed output must remain completely static.

---

# 27. Suggested Project Structure

```text
flower-delivery/
├── index.html
├── css/
│   ├── base.css
│   ├── delivery.css
│   ├── flowers.css
│   ├── final.css
│   └── responsive.css
├── js/
│   ├── app.js
│   ├── state.js
│   ├── delivery.js
│   ├── package.js
│   ├── flowers.js
│   ├── final-reveal.js
│   └── audio.js
├── assets/
│   ├── svg/
│   │   ├── house.svg
│   │   ├── delivery-van.svg
│   │   ├── package.svg
│   │   ├── bouquet.svg
│   │   └── flowers/
│   ├── audio/
│   └── images/
└── README.md
```

This may be simplified if the implementation remains maintainable.

---

# 28. State Model

Recommended states:

```text
DELIVERY
HOUSE_TRANSITION
PACKAGE_ARRIVAL
PACKAGE_READY
PACKAGE_OPENING
LETTER
BOUQUET_REVEAL
BOUQUET_HINT
FLOWER_EXPLORATION
FLOWER_COMPLETE
BOUQUET_RETURN
FINAL_INTRO
FINAL_TYPING
FINAL_MESSAGE
```

Use centralized state rather than scattered boolean flags.

---

# 29. Data Model

Flowers:

```js
const flowers = [
  {
    id: "rose",
    name: "rose",
    meaningTitle: "love & devotion",
    meaning: "Lorem ipsum...",
    message: "Lorem ipsum...",
    asset: "assets/svg/flowers/rose.svg"
  }
];
```

Final reveal:

```js
const finalReveal = {
  intro: "ini buat kamu ya",
  lines: [
    "all_flowers_have_one_thing_in_common",
    "they're all pretty.",
    "but...",
    "none_of_them_are_prettier_than_you"
  ],
  personalMessage: "Lorem ipsum..."
};
```

Keep all personal copy separate from rendering and animation logic.

---

# 30. Suggested Timing

Starting values; tune on real mobile devices:

```text
delivery vehicle:       2.5s
delivery pause:         0.8s
crossfade:              0.8s
door open:              0.7s
package movement:       1.0s
package open:           0.8s
letter reveal:          0.7s
bouquet reveal:         1.0s
bouquet glow delay:     1.5s
hint fade-in:           0.6s
flower transition:      0.8s
flower floating loop:   4.0s
final bouquet reveal:   1.0s
final typing:           30–50ms/char
```

Timing must be tuned for emotional pacing rather than treated as immutable.

---

# 31. Animation Quality Rules

Use intentional easing.

Suggested:
- vehicle: ease-out
- door: ease-in-out
- package: ease-out
- bouquet reveal: soft power/expo easing
- flower floating: sine-like motion

Avoid:
- constant shaking
- excessive glitching
- heavy particles
- abrupt layout changes
- unnecessary loading delays

---

# 32. Privacy

Do not collect or transmit personal information.

No analytics is required.

No external API should receive relationship details, recipient data, or message content.

---

# 33. Acceptance Criteria

## Delivery
- [ ] Vehicle enters smoothly.
- [ ] Vehicle stops at house.
- [ ] `pakeett` appears.
- [ ] Crossfade to interior works.
- [ ] Door opens.
- [ ] Package enters and stops.
- [ ] Package is tappable.

## Package
- [ ] Package opens.
- [ ] Letter appears first.
- [ ] Letter uses editable placeholder content.
- [ ] Bouquet can then be revealed.

## Bouquet
- [ ] Bouquet uses custom SVG or compatible licensed artwork.
- [ ] Bouquet appears centered.
- [ ] 1.5-second delay occurs before glow.
- [ ] Glow is subtle.
- [ ] Background darkens.
- [ ] `klik bunganya deh sayang` appears.
- [ ] Bouquet is tappable.

## Flowers
- [ ] Dark background.
- [ ] One flower at a time.
- [ ] Subtle floating motion.
- [ ] Subtle glow.
- [ ] Flower name and meaning appear.
- [ ] Flower message is editable.
- [ ] Tap advances.
- [ ] Flower count is data-driven.

## Final
- [ ] Bouquet returns.
- [ ] `ini buat kamu ya` appears.
- [ ] Final text uses JetBrains Mono.
- [ ] All final lines are lowercase.
- [ ] Each line is a separate rendered line.
- [ ] Typing animation reveals lines sequentially.
- [ ] Cursor blinks briefly and disappears.
- [ ] Bouquet remains present.

Required text:

```text
all_flowers_have_one_thing_in_common
they're all pretty.
but...
none_of_them_are_prettier_than_you
```

## Mobile
- [ ] Works at 360×800.
- [ ] Works at 375×812.
- [ ] Works at 390×844.
- [ ] Works at 412×915.
- [ ] No horizontal scrolling.
- [ ] No clipped text.
- [ ] All interactions work through touch.

## Deployment
- [ ] Works on GitHub Pages.
- [ ] No backend.
- [ ] No API key.
- [ ] Relative asset paths work.
- [ ] Optional CDN failure does not completely break the experience.

---

# 34. Definition of Done

The recipient can:

1. watch the delivery arrive
2. see the package enter the house
3. open the package
4. read the first message
5. reveal the bouquet
6. receive the bouquet hint
7. explore every flower
8. read each flower meaning
9. see the complete bouquet again
10. read `ini buat kamu ya`
11. watch the four-line typing reveal
12. reach the final personal message

The experience must feel like one coherent story:

```text
flower delivery
      ↓
surprise
      ↓
bouquet
      ↓
flower discovery
      ↓
bouquet again
      ↓
romantic realization
```

It must not feel like a collection of unrelated animations.
