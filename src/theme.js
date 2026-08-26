// ─────────────────────────────────────────────────────────────────────────────
//  Design tokens
//  The curated system: dark slate ground, coral accent, Cormorant Garamond.
//  Courier New carries numeric and system texture, as it already does in the
//  balance sheet. No third family.
// ─────────────────────────────────────────────────────────────────────────────

export const c = {
  navy:      '#191A1A',   // page ground
  navyLight: '#222526',   // raised panels
  navyAlt:   '#151717',   // alternating sections
  navyDeep:  '#0E1010',   // footer, deepest ground
  cream:     '#F5F0E8',   // body text
  white:     '#FFFFFF',   // headings
  orange:    '#E8534E',   // accent: links, labels, dividers
  terracotta:'#D84535',   // logo wordmark only
  teal:      '#00C896',   // secondary accent, sparingly

  // Derived, so components stop hand-rolling rgba strings.
  creamSoft:  'rgba(245,240,232,0.72)',
  creamFaint: 'rgba(245,240,232,0.42)',
  creamGhost: 'rgba(245,240,232,0.26)',
  rule:       'rgba(245,240,232,0.14)',
  ruleSoft:   'rgba(245,240,232,0.07)',
  orangeSoft: 'rgba(232,83,78,0.20)',
  orangeWash: 'rgba(232,83,78,0.05)',
}

export const f = {
  // One face across the whole site.
  display: "'Cormorant Garamond', Georgia, serif",
  text:    "'Cormorant Garamond', Georgia, serif",
  // Numbers, statuses, workflow steps.
  mono:    "'Courier New', monospace",
}

export const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)'

export const maxw = '1100px'

// Small caps label. Coral by default, which is where the accent lives.
export const label = {
  fontFamily: f.mono,
  fontSize: '11px',
  fontWeight: 600,
  letterSpacing: '0.16em',
  textTransform: 'uppercase',
}

// Cormorant runs small, so body sizes sit higher than a grotesque would.
export const body = {
  fontFamily: f.text,
  fontSize: '18px',
  lineHeight: 1.75,
  color: c.cream,
  fontWeight: 400,
}
