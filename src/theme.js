// ─────────────────────────────────────────────────────────────────────────────
//  Design tokens
//  Aesthetic per the positioning guide: editorial, tactile, kinetic,
//  intelligent, slightly playful. Paper ground, ink contrast, one acid accent.
// ─────────────────────────────────────────────────────────────────────────────

export const c = {
  paper:     '#F4F1E9',   // warm off-white ground
  paperDeep: '#EAE6DB',   // recessed panels
  ink:       '#111110',   // near-black display and body
  inkSoft:   'rgba(17,17,16,0.62)',
  inkFaint:  'rgba(17,17,16,0.38)',
  rule:      'rgba(17,17,16,0.14)',
  ruleSoft:  'rgba(17,17,16,0.08)',
  lime:      '#CCF23D',   // the single vivid accent
  limeDeep:  '#A8CC22',   // for small text on paper where lime alone fails contrast
}

export const f = {
  // High-contrast editorial serif for display. Carries the "designed by
  // someone with taste" requirement without any AI-stock visual language.
  display: "'Instrument Serif', 'Times New Roman', serif",
  // Neutral grotesque for reading and UI.
  text:    "'Inter', -apple-system, 'Helvetica Neue', sans-serif",
  // Mono is the operator texture: statuses, system labels, workflow steps.
  mono:    "'JetBrains Mono', 'SFMono-Regular', Menlo, monospace",
}

// Unhurried, flat easing. Nothing bounces.
export const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)'

export const maxw = '1160px'

// Wide-tracked mono label, used once per zone.
export const label = {
  fontFamily: f.mono,
  fontSize: '11px',
  fontWeight: 500,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
}

export const display = (min, max) => ({
  fontFamily: f.display,
  fontWeight: 400,
  fontSize: `clamp(${min}, ${((max + min) / 2 / 14).toFixed(2)}vw + 1rem, ${max})`,
  lineHeight: 1.04,
  letterSpacing: '-0.02em',
  color: c.ink,
})

export const body = {
  fontFamily: f.text,
  fontSize: '17px',
  lineHeight: 1.7,
  color: c.inkSoft,
  fontWeight: 400,
}

// Status pill. Honest status language is a hard rule in the guide:
// "active prototype" and "in development" are strong; "coming soon" is weak.
export const STATUS = {
  live:      { text: 'Live',             fill: c.lime,      ink: c.ink },
  prototype: { text: 'Active prototype', fill: c.lime,      ink: c.ink },
  building:  { text: 'In development',   fill: 'transparent', ink: c.inkSoft },
}
