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
            maxWidth: '19ch',
            ...rise(on, 90, reduced),
          }}
        >
          Building useful AI systems.{' '}
          <span
            style={{
              fontStyle: 'italic',
              backgroundImage: `linear-gradient(${c.lime}, ${c.lime})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: '0 0.80em',
              backgroundSize: reduced || on ? '100% 0.30em' : '0% 0.30em',
              transition: reduced ? 'none' : `background-size 1s ${EASE} 620ms`,
              WebkitBoxDecorationBreak: 'clone',
              boxDecorationBreak: 'clone',
            }}
          >
            Writing about the future they create.
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
          I&rsquo;m in operator mode: learning fast, building in public, and exploring
          how AI, biology, and new infrastructure will reshape human life.
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

        <p
          style={{
            fontFamily: f.text,
            fontSize: '17px',
            lineHeight: 1.72,
            color: c.inkSoft,
            margin: '44px 0 0',
            maxWidth: '58ch',
            paddingTop: '30px',
            borderTop: `1px solid ${c.rule}`,
            ...rise(on, 320, reduced),
          }}
        >
          I&rsquo;m Annabelle Body, a scientist turned accountant and restructuring
          operator, now building at the frontier of applied AI. I turn new model
          capability into practical systems for ambitious people and businesses.
        </p>

        <div
          style={{
            display: 'flex', gap: '14px', flexWrap: 'wrap',
            margin: '44px 0 0',
            ...rise(on, 400, reduced),
          }}
        >
          <CTA href="#build" primary>What I&rsquo;m building</CTA>
          <CTA href="#think">Field Notes</CTA>
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
