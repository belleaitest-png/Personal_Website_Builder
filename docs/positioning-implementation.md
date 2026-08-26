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

| Guide | Implementation |
|---|---|
| Paper / off-white ground | `#F4F1E9`, with `#EAE6DB` for recessed sections |
| Ink-black contrast | `#111110` |
| One vivid acid-lime accent | `#CCF23D`, used only for highlight, status, rail and hover |
| Large typography | Instrument Serif display up to 108px, `-0.025em` tracking |
| Editorial / tactile / operator texture | JetBrains Mono for labels, statuses and workflow steps |
| Movement around meaning | Hero highlight wipes in under the claim; Signal → Action steps land in sequence; scroll rail reports read position |
| Honour `prefers-reduced-motion` | `useReveal.js` returns no-op styles; CSS kills transitions; verified 0 elements stuck at opacity 0 |
| No fake AI 3D or stock cyber imagery | None used. Everything is type, rule, and layout |

## Removed or demoted, per the guide

- Food/fertility as the homepage identity. Now case studies inside builds and writing pillars only.
- Beangirl from the primary nav. It remains in the footer.
- The balance-sheet device as the main lens. `BalanceSheet.jsx` is preserved in the repo but no longer rendered.
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
