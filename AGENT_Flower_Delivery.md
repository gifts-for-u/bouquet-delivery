# AGENT.md — Flower Delivery

## 1. Mission

You are implementing **Flower Delivery**, a mobile-first interactive romantic web experience.

The website is a short visual story:

```text
delivery
  ↓
package
  ↓
letter
  ↓
bouquet
  ↓
flower exploration
  ↓
bouquet returns
  ↓
romantic reveal
```

The project is intended for one person to open primarily on a phone.

The implementation must prioritize:

1. emotional pacing
2. visual polish
3. mobile usability
4. smooth animation
5. maintainable code
6. static GitHub Pages compatibility

Do not turn the project into a generic landing page.

---

# 2. Source of Truth

Use the PRD as the product specification.

If implementation details conflict with visual quality, preserve the intended user experience first.

Do not add major product features without explicit instruction.

Small implementation decisions are allowed when they do not change the intended flow.

---

# 3. Core Experience

The exact high-level flow is:

```text
DELIVERY
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
PACKAGE OPEN
↓
LETTER FIRST
↓
BOUQUET
↓
1.5 SECOND WAIT
↓
GLOW
↓
BACKGROUND DARKENS
↓
"klik bunganya deh sayang"
↓
FLOWER EXPLORATION
↓
LAST FLOWER
↓
BOUQUET RETURNS
↓
"ini buat kamu ya"
↓
TYPING REVEAL
↓
FINAL MESSAGE
```

Do not skip major stages.

The pauses are part of the storytelling.

---

# 4. Emotional Pacing

The experience has three chapters.

## Chapter 1 — Delivery

Feeling:

```text
cute
playful
curious
```

Use:
- warm colors
- illustrated environment
- simple movement
- light sound effects

Avoid:
- dark terminal visuals
- excessive romance
- dramatic music

---

## Chapter 2 — Flowers

Feeling:

```text
calm
beautiful
intimate
slightly magical
```

Use:
- dark background
- centered flowers
- subtle glow
- slow floating animation
- minimal UI
- generous whitespace

Avoid:
- excessive particles
- fast movement
- bright neon
- clutter

---

## Chapter 3 — Final Reveal

Feeling:

```text
personal
romantic
quiet
```

Use:
- bouquet
- JetBrains Mono
- typing animation
- restrained glow
- deliberate pauses

The final reveal should not feel like a normal webpage section.

---

# 5. Mobile-First Rule

The recipient will primarily use a phone.

Always implement mobile first.

Minimum target viewports:

```text
360x800
375x812
390x844
412x915
```

The page must work without:

- hover
- mouse precision
- keyboard
- desktop-only interactions

Every important interaction must be tappable.

Target touch area:

```text
~44x44 CSS px or larger
```

Do not create tiny invisible hit areas.

---

# 6. Desktop Rule

Desktop is secondary.

Do not simply stretch the mobile layout.

On larger screens, it is acceptable to:

- center the scene
- constrain content width
- create a cinematic viewport
- keep the artwork at a readable scale

Do not allow desktop dimensions to dictate mobile design.

---

# 7. Architecture

Prefer:

```text
HTML
CSS
Vanilla JavaScript
SVG
```

Use a framework only if there is a strong implementation reason.

This project does not require React/Vue/etc. by default.

Recommended structure:

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

The exact structure may be simplified if the resulting code is cleaner.

Do not create files merely for the sake of creating files.

---

# 8. State Management

Use one centralized application state.

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

Avoid scattered flags such as:

```js
isDelivery
isPackage
isFlower
isFinal
isTyping
```

when a single state can represent the screen.

Prefer:

```js
state.currentScreen
state.currentFlowerIndex
state.isMuted
```

or an equivalent centralized structure.

---

# 9. Animation Library

## Preferred: GSAP

Use GSAP for coordinated sequences where CSS timelines become cumbersome.

Good GSAP use cases:

- delivery vehicle movement
- door opening
- package movement
- package opening
- bouquet reveal
- glow sequencing
- flower transitions
- bouquet reconstruction
- final reveal sequencing

GSAP is allowed through CDN for this static project.

Do not use GSAP for trivial effects that CSS handles cleanly.

---

# 10. CSS Animation

Use CSS for:

- flower floating loop
- cursor blink
- simple opacity transitions
- basic hover/tap states
- subtle glow pulsing
- reduced-motion fallback

Prefer CSS when no timeline coordination is required.

---

# 11. Animation Timing

Treat these as starting values:

```js
const TIMINGS = {
  DELIVERY_VAN: 2500,
  DELIVERY_PAUSE: 800,
  CROSSFADE: 800,
  DOOR_OPEN: 700,
  PACKAGE_MOVE: 1000,
  PACKAGE_OPEN: 800,
  LETTER_REVEAL: 700,
  BOUQUET_REVEAL: 1000,
  BOUQUET_GLOW_DELAY: 1500,
  HINT_FADE: 600,
  FLOWER_TRANSITION: 800,
  FLOWER_FLOAT: 4000,
  FINAL_BOUQUET_REVEAL: 1000,
  FINAL_INTRO_DELAY: 1000,
  TYPING_SPEED: 40
};
```

These are tunable.

Do not shorten every animation just to make the site faster.

The user experience depends on pauses.

---

# 12. Easing

Use physical-looking easing.

Recommended:

```text
vehicle:
ease-out

door:
ease-in-out

package:
ease-out

bouquet:
soft ease / power / expo

flower:
sine-like movement
```

Avoid constant linear motion for physical objects.

---

# 13. Delivery Vehicle

The vehicle should start outside the visible area.

Conceptually:

```text
OFFSCREEN → DRIVE → STOP
```

Requirements:

- smooth entrance
- no teleporting
- no excessive bounce
- subtle settling when stopped

The vehicle should be an SVG or similarly scalable asset.

Do not use emoji as the final vehicle.

---

# 14. Delivery Text

Use exactly:

```text
pakeett
```

Lowercase.

It should appear after the vehicle arrives.

Possible animation:

```text
opacity 0 → 1
scale .95 → 1
small vertical movement
```

Keep it casual.

---

# 15. House Transition

Use a crossfade between exterior and interior.

Do not:

- reload the page
- navigate to another URL
- use a hard cut unless specifically requested

The exterior and interior should feel like the same visual world.

---

# 16. Door Animation

Sequence:

```text
CLOSED
↓
OPEN
↓
PACKAGE ENTERS
↓
SETTLE
```

Keep the door movement readable.

Do not overanimate the house.

The door is a narrative element, not the main attraction.

---

# 17. Package Animation

The package must:

- enter from the door
- move to a resting location
- remain clearly tappable

On tap:

```text
LID_OPEN
CONTENTS_REVEAL
LETTER_FIRST
```

Do not immediately reveal the bouquet as the first element.

---

# 18. Letter

The letter is intentionally the first discovery.

The letter may use:

- paper SVG/CSS
- paper texture
- subtle shadow
- slight rotation
- warm typography

Do not make the letter look like a generic HTML modal.

The actual copy will be inserted later.

Use placeholder copy during development.

Keep content in a separate data object.

---

# 19. Bouquet Reveal

The bouquet should appear after the letter.

Initial bouquet state:

```text
visible
no strong glow
normal background
```

Then:

```text
wait 1.5 seconds
↓
soft glow
↓
background darkens
↓
hint appears
```

The 1.5-second delay is intentional.

Do not remove it because it seems unnecessary.

---

# 20. Bouquet Glow

Glow should be:

- soft
- warm
- subtle
- localized around the bouquet

Good implementations:

```text
radial-gradient
CSS filter
SVG filter
pseudo-element
layered translucent SVG
```

Avoid:

- neon bloom
- hard white outlines
- huge blur radius
- constant flashing

The bouquet should feel magical, not radioactive.

---

# 21. Bouquet Hint

Use exactly:

```text
klik bunganya deh sayang
```

The hint should:

- fade in
- remain subtle
- not look like a standard button
- disappear/fade after interaction

The bouquet itself is the main call-to-action.

---

# 22. Flower Exploration

When the bouquet is tapped:

```text
BOUQUET
↓
DARK TRANSITION
↓
SINGLE FLOWER
```

Background:

```text
near-black / very dark
```

Flower:

- centered
- floating
- subtle glow
- enough breathing room

The screen should feel quiet.

---

# 23. Flower Rendering

Use SVG flowers.

Each flower should have a consistent art direction.

Do not mix:

```text
photo rose
+
cartoon tulip
+
3D sunflower
```

unless deliberately designed as a collage.

All flowers should look like they belong to the same world.

---

# 24. Flower Floating

Use subtle continuous movement.

Example:

```text
Y: -8px → +8px → -8px
```

Cycle:

```text
~4 seconds
```

Optional:

```text
rotation: -1deg → +1deg
```

Keep movement small.

The user must still be able to comfortably read the text.

---

# 25. Flower Data

Use a data-driven array:

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

Do not create one hardcoded page per flower.

Adding a flower should mean adding an object.

---

# 26. Flower Navigation

Primary interaction:

```text
tap current flower
→ next flower
```

Do not require swipe.

Swipe may be added as an enhancement.

Avoid obvious giant "NEXT" buttons unless needed for usability.

The flower itself may be tappable.

---

# 27. Flower Meaning

Keep meaning concise.

Example structure:

```text
FLOWER_NAME

MEANING_TITLE

Short explanation.

Personal message.
```

Do not make each flower screen text-heavy.

The visual should remain dominant.

---

# 28. Final Flower

After the final flower:

```text
FLOWER_COLLECTION_COMPLETE
```

This state should be brief.

Do not make it look like a system error.

Then transition back to the complete bouquet.

---

# 29. Bouquet Reconstruction

Preferred sequence:

```text
LAST_FLOWER
↓
FADE
↓
PETALS / SMALL PARTICLES (optional)
↓
FLOWERS CONVERGE
↓
FULL BOUQUET
```

Particles are optional.

Do not add particles if they reduce performance or make the composition messy.

---

# 30. Final Bouquet

The bouquet should return as a familiar object.

It should now feel more meaningful because the recipient has seen its individual flowers.

Keep:

- dark/soft background
- gentle floating
- subtle glow

Then show:

```text
ini buat kamu ya
```

---

# 31. Final Typing

Use:

```text
JetBrains Mono
```

Required exact lines:

```text
all_flowers_have_one_thing_in_common
they're all pretty.
but...
none_of_them_are_prettier_than_you
```

Do not uppercase these lines.

Do not replace underscores with spaces.

Do not merge them into one paragraph.

Each must be a separate DOM element.

---

# 32. Typing Algorithm

Preferred conceptual flow:

```js
for each line:
    type line
    wait
    continue
```

Recommended:

```text
30–50ms / character
```

Do not make typing painfully slow.

Provide a way to reveal the full message if necessary, especially for accessibility.

---

# 33. Cursor

Use a terminal-style cursor.

During typing:

```text
|
```

After typing:

```text
blink several times
↓
fade out
```

Do not leave an infinite cursor animation running after the final message.

---

# 34. Final Message Data

Keep personal content separate:

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

The user must be able to replace the final personal message without changing animation code.

---

# 35. Typography

Recommended:

```text
Delivery:
warm modern sans / humanist font

Letter:
warm serif / humanist sans / restrained handwritten style

Flower name:
elegant serif or clean sans

Final:
JetBrains Mono
```

External fonts are optional.

Provide fallbacks.

---

# 36. SVG Rules

All SVGs should:

- use a proper `viewBox`
- scale responsively
- avoid unnecessary fixed dimensions
- be optimized
- use consistent colors/style
- avoid excessive path complexity

Prefer grouping:

```xml
<g id="flower">
```

when animation requires independent parts.

Keep animation targets clearly named.

Example:

```xml
<g id="petals">
<g id="stem">
<g id="leaves">
```

This makes GSAP animation easier.

---

# 37. SVG Asset Sources

Allowed:

- custom SVG
- generated SVG
- permissively licensed public SVG
- properly licensed icon/illustration libraries
- CDN assets when licensing permits

Always check licensing for external artwork.

Do not copy copyrighted illustrations blindly.

---

# 38. Sound Design

Sound is optional.

If implemented, use subtle sounds.

Suggested:

```text
vehicle arrives
door opens
package movement
package opens
paper movement
bouquet reveal
flower transition
final reveal
```

Avoid:

- loud effects
- meme sounds
- constant music
- dramatic cinematic booms
- audio required for understanding

---

# 39. Audio Implementation

Use native audio when enough.

Use Howler.js only if the project needs:

- multiple sounds
- sound management
- volume control
- audio sprites
- reliable playback behavior

Do not add Howler just because it is available.

---

# 40. Audio Autoplay

Assume mobile browsers restrict autoplay.

Never depend on audible autoplay.

The first user interaction can unlock audio if needed.

The website must remain fully functional with:

```text
audio = OFF
```

---

# 41. TUI / WebTUI

Do not turn the entire website into a TUI.

The final message may use a terminal-inspired style because of JetBrains Mono.

WebTUI may be used if it improves a specific terminal-style component.

Do not force it into:

- delivery scene
- house scene
- flower screens

Custom HTML/CSS is preferred for those.

---

# 42. Dependency Discipline

Before adding a dependency:

1. verify browser compatibility
2. verify GitHub Pages compatibility
3. verify license
4. evaluate bundle size
5. determine whether native CSS/JS is sufficient
6. document why it was added

Preferred candidates:

```text
GSAP      → complex animation
Howler.js → optional audio
WebTUI    → optional terminal styling
SVG       → illustration
CSS       → simple animation
```

Do not add large UI frameworks.

---

# 43. GitHub Pages

The site must remain static.

Never require:

- backend
- database
- API
- environment secret
- server runtime
- authentication

Use relative paths.

Assume the repository may be deployed under:

```text
/REPOSITORY_NAME/
```

not necessarily `/`.

Test all asset paths under a GitHub Pages subpath.

---

# 44. Performance

Mobile performance is important.

Prefer:

```text
SVG
CSS
small JS
optimized audio
```

Avoid:

- huge images
- uncompressed audio
- continuous canvas rendering without need
- large animation libraries beyond actual need
- excessive DOM elements
- expensive filters on dozens of elements simultaneously

If glow becomes expensive, simplify it before removing the visual concept entirely.

---

# 45. Reduced Motion

Implement:

```css
@media (prefers-reduced-motion: reduce) {
    ...
}
```

Reduced motion should:

- remove vehicle movement where necessary
- shorten transitions
- reduce flower floating
- disable unnecessary particles
- retain understandable state changes

Do not hide content because animation is disabled.

---

# 46. Accessibility

Use semantic HTML.

Interactive elements should preferably be:

```html
<button>
```

rather than clickable `<div>` elements.

Provide:

- accessible labels
- keyboard focus where relevant
- visible focus state
- readable contrast
- non-audio alternatives

The flower may be visually tappable, but there must still be a semantic accessible interaction.

---

# 47. Error Handling

Optional assets must not break the story.

If:
- sound fails
- external font fails
- CDN fails
- optional decorative SVG fails

the core experience should continue.

Never allow an audio exception to freeze the application.

---

# 48. Testing

Before considering a stage complete, test:

## Delivery
- vehicle enters
- vehicle stops
- `pakeett` appears
- crossfade works

## House
- door opens
- package enters
- package settles
- package can be tapped

## Package
- package opens
- letter appears first
- bouquet follows

## Bouquet
- bouquet is centered
- 1.5-second glow delay works
- background darkens
- hint appears
- bouquet is tappable

## Flowers
- correct flower loads
- floating animation works
- glow works
- name/meaning appear
- tap advances
- final flower returns to bouquet

## Final
- bouquet returns
- `ini buat kamu ya` appears
- four required lines type sequentially
- cursor works
- final message remains readable

---

# 49. Mobile Test Matrix

At minimum:

```text
360 × 800
375 × 812
390 × 844
412 × 915
```

Check:

- no horizontal scrolling
- no clipping
- no unexpected overflow
- no tiny controls
- no off-screen bouquet
- no text behind system UI
- no animation causing layout shift

Test both portrait and, if practical, landscape behavior.

---

# 50. Code Quality

Prefer:

- small reusable functions
- centralized timing values
- centralized state
- centralized content
- descriptive names
- CSS variables
- data-driven flower rendering

Avoid:

- duplicated flower components
- duplicated animation logic
- inline style everywhere
- magic numbers everywhere
- unnecessary global variables
- hardcoded personal messages inside UI functions

---

# 51. Do Not Overengineer

This is a romantic static website.

Do not introduce:

- backend services
- databases
- authentication
- unnecessary frameworks
- complex build pipelines
- WebGL for effects CSS/SVG can already achieve
- state management libraries

unless a concrete requirement emerges.

The simplest implementation that produces a polished result is preferred.

---

# 52. Visual Quality Rule

When choosing between:

```text
more features
```

and

```text
better animation / composition
```

choose better animation/composition.

The recipient does not care how technically complex the implementation is.

They care that:

```text
the van feels real
the package feels tactile
the bouquet feels magical
the flowers feel beautiful
the final message feels personal
```

---

# 53. Definition of Done

The implementation is done only when the recipient can complete this sequence entirely on a phone:

```text
watch delivery
↓
see "pakeett"
↓
watch house transition
↓
watch door open
↓
see package enter
↓
tap package
↓
read letter
↓
see bouquet
↓
wait for glow
↓
see "klik bunganya deh sayang"
↓
tap bouquet
↓
explore every flower
↓
read meanings
↓
see bouquet return
↓
read "ini buat kamu ya"
↓
watch final typing
↓
read final romantic message
```

The final experience must feel like a single story, not a sequence of unrelated UI demos.
