import { useState } from 'react'
import { c, f, EASE, maxw, label } from '../theme'
import { useReveal, rise } from '../useReveal'

// Every card answers the same four questions, in the same order:
// friction → what I built → why it matters → what's next.
const BUILDS = [
  {
    name: 'Personal CRM',
    status: 'In development',
    live: false,
    friction: 'Important relationships lose momentum when follow-up depends on memory and scattered notes.',
    built: 'A lightweight relationship system for collaborators, mentors, investors and friends, with an agent that reads the history and drafts the follow-up.',
    matters: 'Better memory and more thoughtful follow-through, without enterprise overhead for a network of one.',
    next: 'Getting the prompt for "who is going cold" to match how I would actually judge it.',
  },
  {
    name: 'Apex Health OS',
    status: 'Live',
    live: true,
    href: 'https://apex-health-os.vercel.app/',
    friction: 'My WHOOP produces recovery, HRV, strain and sleep data every morning that never meets what I actually eat.',
    built: 'A system that reads the wearable data, logs nutrition in natural language, and turns the two together into a grocery list.',
    matters: 'It is a working test of a bigger idea: the bottleneck in personal health data is interpretation, not measurement.',
    next: 'The correlations need far more data before I would trust them as anything more than a prompt to pay attention.',
  },
  {
    name: 'Demographic Forecaster',
    status: 'Live',
    live: true,
    href: 'https://demographic-forecaster.replit.app',
    friction: 'I needed a chart for a paper on fertility and food systems and could not find one that let me interrogate the assumptions.',
    built: 'A country-level model of fertility decline with adjustable projections, so the argument can be stress-tested rather than asserted.',
    matters: 'It changed the paper. Building the model was how I found out which parts of my argument were weak.',
    next: 'Widening the input data beyond the OECD set it currently leans on.',
  },
  {
    name: 'Bloom',
    status: 'Live',
    live: true,
    href: 'https://mama-mosaic-hub.lovable.app',
    friction: 'Pregnancy nutrition guidance is fragmented, contradictory, and mostly encountered at 2am.',
    built: 'A trimester-aware platform that surfaces relevant supplement guidance and flags nutrient gaps, built end to end in Lovable.',
    matters: 'A test of how far a non-engineer can take a complete consumer product on current tooling. Further than I expected.',
    next: 'It needs clinical review before it deserves a real audience, and it says so.',
  },
]

export default function SelectedBuilds() {
  const [ref, on, reduced] = useReveal(0.05)

  return (
    <section id="builds" ref={ref} style={{ background: c.paperDeep, padding: 'clamp(90px, 12vh, 140px) 32px' }}>
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>

        <p style={{ ...label, color: c.ink, margin: 0, ...rise(on, 0, reduced) }}>Selected builds</p>

        <h2 style={{
          fontFamily: f.display, fontWeight: 400,
          fontSize: 'clamp(38px, 5.2vw, 68px)', lineHeight: 1.06,
          letterSpacing: '-0.02em', color: c.ink, margin: '24px 0 0', maxWidth: '18ch',
          ...rise(on, 70, reduced),
        }}>
          Things I made, and what they taught me.
        </h2>

        <p style={{
          fontFamily: f.text, fontSize: '18px', lineHeight: 1.65,
          color: c.inkSoft, margin: '26px 0 64px', maxWidth: '56ch',
          ...rise(on, 130, reduced),
        }}>
          Status is stated honestly. Where something is unfinished or unproven,
          it says so.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
          gap: '20px',
        }}>
          {BUILDS.map((b, i) => (
            <BuildCard key={b.name} b={b} style={rise(on, 190 + i * 100, reduced)} />
          ))}
        </div>
      </div>
    </section>
  )
}

function BuildCard({ b, style }) {
  const [hov, setHov] = useState(false)
  const Tag = b.href ? 'a' : 'div'

  return (
    <Tag
      {...(b.href ? { href: b.href, target: '_blank', rel: 'noreferrer' } : {})}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'block',
        textDecoration: 'none',
        background: c.paper,
        border: `1px solid ${hov && b.href ? c.ink : c.rule}`,
        borderRadius: '3px',
        padding: '32px 30px 34px',
        transition: `border-color 0.4s ${EASE}, transform 0.4s ${EASE}`,
        transform: hov && b.href ? 'translateY(-3px)' : 'translateY(0)',
        ...style,
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '16px', marginBottom: '22px' }}>
        <h3 style={{
          fontFamily: f.display, fontWeight: 400,
          fontSize: 'clamp(26px, 2.6vw, 34px)', lineHeight: 1.12,
          letterSpacing: '-0.015em', color: c.ink, margin: 0,
        }}>
          {b.name}
          {b.href && (
            <span aria-hidden="true" style={{
              fontFamily: f.mono, fontSize: '0.5em', marginLeft: '10px',
              color: hov ? c.ink : c.inkFaint,
              transition: `color 0.3s ${EASE}`,
            }}>↗</span>
          )}
        </h3>
        <span style={{
          ...label,
          whiteSpace: 'nowrap',
          color: c.ink,
          background: b.live ? c.lime : 'transparent',
          border: b.live ? `1px solid ${c.lime}` : `1px solid ${c.rule}`,
          padding: '6px 10px 5px',
          borderRadius: '2px',
          opacity: b.live ? 1 : 0.62,
        }}>
          {b.status}
        </span>
      </div>

      <Row k="Friction" v={b.friction} />
      <Row k="Built" v={b.built} />
      <Row k="Why" v={b.matters} />
      <Row k="Next" v={b.next} last />
    </Tag>
  )
}

function Row({ k, v, last }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: '68px 1fr',
      gap: '16px',
      padding: '13px 0',
      borderBottom: last ? 'none' : `1px solid ${c.ruleSoft}`,
    }}>
      <span style={{ ...label, fontSize: '10px', color: c.inkFaint, paddingTop: '3px' }}>{k}</span>
      <span style={{ fontFamily: f.text, fontSize: '15px', lineHeight: 1.6, color: c.inkSoft }}>{v}</span>
    </div>
  )
}
