# Mock-up brief — annabellebody.com

Ten deliberately different one-page mock-ups for the same site. Each is a single
self-contained file `mockups/NN-slug.html` that references shared files under
`mockups/assets/` by relative path. No build step, no CDN, no network requests.

## Who and what

- **Annabelle Body — Fractional AI Strategist.**
- Buyer: **mid-market CEOs and founders** with no AI leader in-house.
- Background (true, do not embellish): scientist turned accountant and
  restructuring operator. Previously Deloitte and AlixPartners. MBA, Harvard
  Business School (Class of 2026).
- The owner wants the site "built for Gen Z brains with no attention span":
  movement is the hook. Something must move within the first second, and every
  section needs its own motion idea. Motion should carry the message, not decorate.

## Required content (every mock-up, in whatever form suits its concept)

1. **Hero** — name, "Fractional AI Strategist", a one-line proposition, a contact CTA,
   and **her photo**.
2. **Credentials** — the three logos (Deloitte, AlixPartners, Harvard Business School)
   framed as background ("Previously" / "Trained at"), never as clients.
3. **Services** — exactly these three:
   - **AI Strategy & Roadmap** — a fixed-scope diagnostic: where AI actually creates
     value in your business, what to do first, and the business case for it.
   - **Fractional Chief AI Officer** — a senior AI lead on your leadership team a day
     or two a week, owning the strategy and making sure it ships.
   - **Team Training & Workshops** — executive briefings and hands-on sessions that
     get your people using AI on their real work.
4. **Testimonials** — exactly **two placeholder** quotes, visibly marked as
   placeholders (e.g. "Placeholder — real quote coming soon", "Client name, Title,
   Company"). Never invent a real-sounding person, company or result.
5. **Contact request form** — name, email, company, "what do you need?" + submit.
   In the mock-up, submit must NOT send anything: prevent default and show a
   pleasing in-concept success state. (Final build posts to `/api/contact`.)

## Copy rules

- Write your own copy in the voice of your concept; plain, confident, specific.
- **No invented facts**: no client counts, revenue numbers, percentages, years of
  experience, awards or named clients. Illustrative chart data must be obviously
  schematic (unlabelled axes, "illustrative").
- No em-dash-heavy AI prose, no "unlock", "leverage", "supercharge", "in today's
  fast-paced world".
- Suggested proposition raw material (rephrase freely): she sits between the
  boardroom and the build; she tells you where AI makes money in your business and
  where it is a distraction; restructuring taught her to find value fast; you get a
  senior AI leader without a full-time hire.

## Shared assets (relative to the mock-up file)

- `assets/fonts.css` — @font-face for self-hosted fonts. Families available:
  Anybody (variable wdth 50–150, wght), Archivo (variable wdth 62–125, wght),
  Bricolage Grotesque, Caveat, DM Serif Display, Fraunces (variable, opsz/SOFT/WONK),
  IBM Plex Mono, Instrument Sans, Instrument Serif, Inter, JetBrains Mono,
  Libre Franklin, Newsreader, Permanent Marker, Playfair Display, Silkscreen,
  Space Grotesk, VT323. Use only these (plus system fallbacks).
- `assets/vendor/` — gsap.min.js, ScrollTrigger, SplitText, DrawSVGPlugin,
  MorphSVGPlugin, Draggable, InertiaPlugin, Flip, ScrambleTextPlugin, TextPlugin,
  MotionPathPlugin, CustomEase (all `.min.js`, UMD globals), lenis.min.js + lenis.css,
  matter.min.js. Load with plain `<script src>`.
- `assets/photos/` (webp):
  - `headshot.webp` 608x900, transparent-background cutout, navy blazer, smiling at camera, waist up.
  - `arms.webp` 879x1200, transparent cutout, navy blazer, laughing, both hands raised wide — energetic.
  - `navy-portrait.webp` 447x900 — transparent cutout (look before using).
  - `speaking.webp`, `stage.webp` — DO NOT USE (the cutouts have rendering artefacts).
  - `hbs-portrait.webp` 1223x1400 — standing at a lectern in an HBS classroom, blackboards behind, smiling.
  - `hbs-classroom.webp`, `hbs-blackboard.webp` (portrait), `hbs-interview.webp` (landscape) — look before using.
- `assets/logos/deloitte.svg`, `alixpartners.svg`, `hbs.svg` — wordmark stand-ins that
  use `currentColor`. Reference them as files (`<img>`, or inline the SVG if you need
  to recolour) so official artwork can be swapped in by filename later.

## Engineering rules

- One HTML file, inline `<style>` and `<script>`. Real DOM text for all content
  (canvas/WebGL only for visuals), semantic headings, labelled form fields.
- Must work at 1440x900 and at 390x844 (no horizontal page scroll on mobile unless
  the concept is horizontal by design and still usable by touch).
- `prefers-reduced-motion: reduce` → content fully visible and usable, loops stopped.
- Content must never be stuck invisible: if JS animation fails, text is still readable.
- Animate transform/opacity; pause rAF loops when offscreen/hidden; no preloader
  longer than ~1.5s.
- Include a small fixed "← All mock-ups" link to `index.html` (style it to fit).
- `<title>`: "NN · Concept name — Annabelle Body".

## Verification (required before you report back)

Serve `mockups/` with `python3 -m http.server` on a free port and use Playwright
(pre-installed: `require('playwright')`, `chromium.launch()`) to load your page at
1440x900 and 390x844, scroll through it, and take screenshots into your scratch
directory. Look at the screenshots. Fix: console errors, invisible/overlapping text,
broken layout, sections with no motion, anything that looks unfinished. Also submit
the form and confirm the success state. Report honestly what you verified and any
remaining issues.
