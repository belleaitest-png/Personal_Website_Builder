import { c, f, EASE, maxw, label } from '../theme'
import { useReveal, rise } from '../useReveal'

const ARC = ['Scientist', 'Operator', 'Builder']

export default function Hero() {
  const [ref, on, reduced] = useReveal(0.05)

  return (
    <header
      ref={ref}
      style={{
        background: c.paper,
        padding: 'clamp(140px, 18vh, 220px) 32px clamp(80px, 12vh, 130px)',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>

        <p style={{ ...label, color: c.ink, margin: 0, ...rise(on, 0, reduced) }}>
          Applied AI Builder &amp; Operator
        </p>

        {/* The ten-second claim. Everything below is evidence for it. */}
        <h1
          style={{
            fontFamily: f.display,
            fontWeight: 400,
            fontSize: 'clamp(46px, 7.4vw, 108px)',
            lineHeight: 1.02,
            letterSpacing: '-0.025em',
            color: c.ink,
            margin: '30px 0 0',
            maxWidth: '15ch',
            ...rise(on, 90, reduced),
          }}
        >
          I build AI systems that make people and teams{' '}
          <span style={{ position: 'relative', whiteSpace: 'nowrap' }}>
            <span
              aria-hidden="true"
              style={{
                position: 'absolute',
                left: '-0.08em',
                right: '-0.08em',
                bottom: '0.08em',
                height: '0.34em',
                background: c.lime,
                zIndex: 0,
                transformOrigin: 'left',
                transform: reduced ? 'scaleX(1)' : on ? 'scaleX(1)' : 'scaleX(0)',
                transition: reduced ? 'none' : `transform 0.9s ${EASE} 620ms`,
              }}
            />
            <span style={{ position: 'relative', zIndex: 1, fontStyle: 'italic' }}>
              more capable.
            </span>
          </span>
        </h1>

        <p
          style={{
            fontFamily: f.text,
            fontSize: 'clamp(17px, 1.35vw, 20px)',
            lineHeight: 1.65,
            color: c.inkSoft,
            margin: '38px 0 0',
            maxWidth: '58ch',
            ...rise(on, 180, reduced),
          }}
        >
          I trained as a scientist, learned to operate through accounting and
          restructuring, and now work where frontier models meet real businesses.
          I build practical AI workflows, translate technical capability into
          something people can actually use, and write about the consequences.
        </p>

        {/* The arc, stated once, plainly. */}
        <div
          style={{
            display: 'flex', alignItems: 'center', gap: '14px',
            flexWrap: 'wrap', margin: '44px 0 0',
            ...rise(on, 260, reduced),
          }}
        >
          {ARC.map((step, i) => (
            <span key={step} style={{ display: 'inline-flex', alignItems: 'center', gap: '14px' }}>
              <span style={{
                ...label,
                color: c.ink,
                padding: '9px 15px 8px',
                border: `1px solid ${c.rule}`,
                borderRadius: '2px',
                background: i === ARC.length - 1 ? c.lime : 'transparent',
              }}>
                {step}
              </span>
              {i < ARC.length - 1 && (
                <span aria-hidden="true" style={{ color: c.inkFaint, fontFamily: f.mono, fontSize: '13px' }}>→</span>
              )}
            </span>
          ))}
        </div>

        <div
          style={{
            display: 'flex', gap: '14px', flexWrap: 'wrap',
            margin: '52px 0 0',
            ...rise(on, 340, reduced),
          }}
        >
          <CTA href="#building" primary>What I&rsquo;m building</CTA>
          <CTA href="#notes">Field Notes</CTA>
        </div>
      </div>
    </header>
  )
}

function CTA({ href, children, primary }) {
  const base = {
    fontFamily: f.mono,
    fontSize: '12px',
    fontWeight: 500,
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    textDecoration: 'none',
    padding: '16px 26px 14px',
    borderRadius: '2px',
    display: 'inline-block',
    transition: `background 0.35s ${EASE}, color 0.35s ${EASE}, border-color 0.35s ${EASE}`,
  }
  const style = primary
    ? { ...base, background: c.ink, color: c.paper, border: `1px solid ${c.ink}` }
    : { ...base, background: 'transparent', color: c.ink, border: `1px solid ${c.rule}` }

  return (
    <a
      href={href}
      style={style}
      onMouseEnter={e => {
        if (primary) { e.currentTarget.style.background = c.lime; e.currentTarget.style.color = c.ink }
        else { e.currentTarget.style.borderColor = c.ink }
      }}
      onMouseLeave={e => {
        if (primary) { e.currentTarget.style.background = c.ink; e.currentTarget.style.color = c.paper }
        else { e.currentTarget.style.borderColor = c.rule }
      }}
    >
      {children}
    </a>
  )
}
