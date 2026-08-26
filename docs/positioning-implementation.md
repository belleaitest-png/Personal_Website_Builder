# How the site implements the positioning guide

Reference: `Annabelle Body — Positioning, Voice & Design Guide` (24 Aug 2026).
This note records what the guide asked for and where it now lives, so the two
stay in sync as evidence is earned.

## Position

| Guide | Where it lives |
|---|---|
| Primary descriptor: Applied AI Builder & Operator | Hero eyebrow, page title, OG tags, footer |
| Headline: "Building useful AI systems. Writing about the future they create." | `Hero.jsx` H1, verbatim from Belle |
| "I'm in operator mode: learning fast, building in public..." | Hero sub-paragraph, verbatim |
| "I'm Annabelle Body, a scientist turned accountant and restructuring operator..." | Hero intro line, verbatim |
| "What does technological progress make possible, and what must change for it to improve human lives?" | `QuestionBand.jsx`, full-width on ink |
| "Capability compounds." | Folded into the Think section intro |
| 30-second pitch | Hero sub-paragraph, condensed |
| Arc: Scientist → Operator → Builder | Hero chips, then `ThroughLine.jsx` in full |
| Editorial version: "Building useful AI systems. Writing about the world they create." | Footer |

## Homepage architecture

Restructured around Belle's three pillars, Build / Think / Connect, which are also the
whole navigation:

1. Hero — `Hero.jsx`
2. **Build** (`#build`) — `CurrentBuild.jsx` (Signal → Action), then `SelectedBuilds.jsx`
3. Through-line — `ThroughLine.jsx` (Scientist → Operator → Builder)
4. What I bring — `WhatIBring.jsx`
5. The question — `QuestionBand.jsx`
6. **Think** (`#think`) — `FieldNotes.jsx`
7. **Connect** (`#connect`) — `ContactSection.jsx`

`OperatingProof.jsx` was replaced by `WhatIBring.jsx`. Three sections were arguing the same
credibility point; now the arc does narrative and What I bring does forward-looking proof.

## Proof architecture

Every project answers the four questions in order: friction → what I built →
why it matters → what's next. Signal → Action gets the full-width treatment
plus a four-step diagram of the actual mechanism. The other builds use the
same four rows in `SelectedBuilds.jsx`.

Status language is honest and constrained to three values: `Live`,
`Active prototype`, `In development`. There is no "coming soon" anywhere, and
Signal → Action carries an explicit line stating it is not autonomous.

## Visual system

The positioning guide specified paper ground, ink contrast and an acid-lime accent. That was
applied, then reverted: it overwrote a design Belle had curated over many commits. The site
uses her original system.

| Element | Value |
|---|---|
| Page ground | Slate `#191A1A`, with `#151717` / `#222526` / `#0E1010` for alternation and depth |
| Body text | Cream `#F5F0E8` |
| Accent | Coral `#E8534E`. Logo wordmark only: `#D84535` |
| Secondary | Teal `#00C896`, sparingly |
| Type | Cormorant Garamond throughout, Courier New for numeric and system texture |

Tokens live in `src/theme.js`. No component should hand-roll a hex.

### Hero

Sticky and full-bleed, with content scrolling up over it, as the original did.
`HeroShader.jsx` is hand-written WebGL: `hero.webp` on a full-screen triangle, with a slow
liquid displacement that warps toward a lerped pointer, a light coral lift where the
displacement is strongest, vignette and grain. No library; three.js is 22MB unpacked for
what is one textured triangle.

Required behaviours, all verified:

- No WebGL context, or `prefers-reduced-motion`, paints the plain photo and never starts a
  render loop.
- The loop pauses when the hero leaves the viewport and when the tab is hidden.
- The canvas is `aria-hidden`. All text is real DOM.

**Video slot.** The visual layer is one swappable child. A commented `HeroVideo` stub sits at
the foot of `HeroShader.jsx` with the correct attributes. When the Signal → Action recording
exists, swapping it in is a one-line change and `hero.webp` becomes the poster.

### Image weight

`hero.png` was 7.1MB at 2752x1536. Regenerated at 1800px WebP: **54KB**, a 99% reduction.
`headshot.png` 899KB became 243KB. Both are referenced with `image-set` or `<picture>` and a
PNG fallback; the originals stay in the repo. Generated with `sharp` as a one-off, not a
build dependency.

## Removed or demoted, per the guide

- Food/fertility as the homepage identity. Now case studies inside builds and writing pillars only.
- Beangirl from the primary nav. It remains in the footer.
- The balance-sheet device as the main lens. It now lives inside the About overlay, off the main scroll but findable from the nav, with its line items updated to the new positioning.
- "Soon" cards and the inventory of unfinished ideas. SuppStack Manager is off the page until it exists.
- Verifood from the footer identity. The footer now reads Applied AI Builder & Operator.

Dormant but preserved: `Sections.jsx`, `BalanceSheet.jsx`, `ScrollSections.jsx`,
`Thesis.jsx`, `HeroTicker.jsx`, `ThoughtBubbles.jsx`, `WaterRipple.jsx`.

## Still to add, from the guide's own media plan

1. One confident high-resolution portrait.
2. One candid image building, working or presenting.
3. A 6-10 second screen recording of Signal → Action: Telegram input → queued task → returned output.
4. A 6-10 second CRM screen recording.
5. One macro AI × biology texture clip.

The layout leaves room for these. Until they exist the page stands on
typography rather than filling the gap with stock imagery.
