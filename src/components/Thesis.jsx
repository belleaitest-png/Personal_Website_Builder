import { useState, useEffect, useRef } from 'react'

// ── Palette ──────────────────────────────────────────────────────────────────
const NAVY_ALT   = '#151717'
const CREAM      = '#F5F0E8'
const WHITE      = '#FFFFFF'
const ORANGE     = '#E8534E'
const serif      = "'Cormorant Garamond', serif"

const CSS = `
@keyframes thRise {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes thRule {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
`

// Slow, even, unhurried. Nothing bounces.
const EASE = 'cubic-bezier(0.22, 0.61, 0.36, 1)'

const BELIEFS = [
  {
    numeral: 'I',
    label: 'On judgement',
    claim: 'Most of what gets built now should not have been.',
    body: "I qualified as a chartered accountant, which is several years of training to find the one number that does not reconcile and then explain why it matters. Harvard taught me to ask whether the thing is worth doing at all. Those two habits turn out to be the entire job when you are deciding what to build. The model writes the code. Somebody still has to decide the code is worth writing.",
  },
  {
    numeral: 'II',
    label: 'On learning things you were not trained in',
    claim: 'The skill is putting things down.',
    body: "I have tried thirty of these tools and kept four. That ratio is the point. Picking things up quickly stopped being a skill the moment everyone could do it. What is harder is knowing within an afternoon that something is beautifully made and still wrong for the work. I keep a tiered stack for the same reason I keep a narrow wardrobe. Constraint is what makes the output look like it came from one person.",
  },
  {
    numeral: 'III',
    label: 'On where this is going',
    claim: 'The companies that matter next will sit where biology, food and AI meet.',
    body: "Not because AI is the interesting part. Because biology now produces more data in a morning than anyone can read in a year, and the bottleneck moved from measurement to interpretation. My WHOOP hands me recovery, HRV, strain and sleep before I am properly awake. For a long time that was four numbers I glanced at and forgot. Multiply it by every wearable, every lab panel, every ingredient list nobody reads, and the space between what we measure and what we decide is the largest unclaimed asset in health.",
  },
  {
    numeral: 'IV',
    label: 'On craft',
    claim: 'Taste is the last thing that does not commoditise.',
    body: "When production gets cheap, the premium moves to judgement. Which problem. Which words. What to leave out. My research on fertility and food systems kept arriving at the same place: the evidence already exists, spread across subsidy data and processing incentives and nutrition panels that nobody reads together. That stopped being a research problem some time ago. It became a question of who has the judgement to connect it, and the patience to make the result worth looking at.",
  },
]

const KEPT = ['Claude Code', 'Claude Cowork', 'Notion', 'Speechify']

function useInView(threshold = 0.12) {
  const ref = useRef(null)
  const [seen, setSeen] = useState(false)
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setSeen(true) },
      { threshold }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [threshold])
  return [ref, seen]
}

const rise = (active, delay) => ({
  animation: active ? `thRise 0.9s ${EASE} both` : 'none',
  animationDelay: `${delay}ms`,
  opacity: active ? undefined : 0,
})

// Small caps label, wide tracking. Used once per zone, never twice.
function Label({ children, color = ORANGE, style }) {
  return (
    <p style={{
      fontFamily: serif,
      fontSize: '11px',
      fontWeight: '600',
      letterSpacing: '0.28em',
      textTransform: 'uppercase',
      color,
      margin: 0,
      ...style,
    }}>
      {children}
    </p>
  )
}

function Belief({ item, index, active }) {
  const delay = 260 + index * 120
  return (
    <article style={{
      display: 'grid',
      gridTemplateColumns: '90px 1fr',
      gap: '0 40px',
      padding: '56px 0',
      borderTop: '1px solid rgba(245,240,232,0.09)',
      ...rise(active, delay),
    }}>
      {/* Numeral, set as ornament rather than data */}
      <div style={{
        fontFamily: serif,
        fontSize: '17px',
        fontWeight: '400',
        letterSpacing: '0.16em',
        color: ORANGE,
        opacity: 0.5,
        paddingTop: '10px',
      }}>
        {item.numeral}
      </div>

      <div style={{ maxWidth: '660px' }}>
        <Label color={CREAM} style={{ opacity: 0.38, marginBottom: '22px' }}>
          {item.label}
        </Label>

        <h3 style={{
          fontFamily: serif,
          fontSize: 'clamp(27px, 3.1vw, 40px)',
          fontWeight: '400',
          color: WHITE,
          lineHeight: 1.18,
          letterSpacing: '-0.005em',
          margin: '0 0 26px',
        }}>
          {item.claim}
        </h3>

        <p style={{
          fontFamily: serif,
          fontSize: '18px',
          lineHeight: 1.82,
          color: CREAM,
          opacity: 0.66,
          margin: 0,
        }}>
          {item.body}
        </p>
      </div>
    </article>
  )
}

export default function Thesis() {
  const [ref, active] = useInView(0.08)

  useEffect(() => {
    const id = 'th-keyframes'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  return (
    <section
      id="thesis"
      ref={ref}
      style={{
        position: 'relative', zIndex: 2,
        background: NAVY_ALT,
        padding: '160px 48px 150px',
      }}
    >
      <div style={{ maxWidth: '1020px', margin: '0 auto' }}>

        {/* ── Masthead ───────────────────────────────────────────── */}
        <Label style={rise(active, 0)}>Point of View</Label>

        <div style={{
          width: '100%', height: '1px',
          background: 'rgba(232,83,78,0.35)',
          margin: '22px 0 60px',
          transformOrigin: 'left',
          animation: active ? `thRule 1.2s ${EASE} both 80ms` : 'none',
        }} />

        <h2 style={{
          fontFamily: serif,
          fontSize: 'clamp(38px, 5.4vw, 66px)',
          fontWeight: '400',
          color: WHITE,
          lineHeight: 1.1,
          letterSpacing: '-0.015em',
          margin: '0 0 40px',
          maxWidth: '900px',
          ...rise(active, 120),
        }}>
          Everyone has the same tools now.
          <span style={{ display: 'block', color: CREAM, opacity: 0.55, fontStyle: 'italic' }}>
            What&rsquo;s rare is knowing which problem deserves one.
          </span>
        </h2>

        <p style={{
          fontFamily: serif,
          fontSize: '21px',
          lineHeight: 1.75,
          color: CREAM,
          opacity: 0.72,
          margin: '0 0 84px',
          maxWidth: '640px',
          ...rise(active, 180),
        }}>
          Most people are still asking what these tools can do. That question got boring
          quickly. The harder one, and the more useful one, is what deserves to be built at all.
        </p>

        {/* ── Beliefs ────────────────────────────────────────────── */}
        <div style={{ borderBottom: '1px solid rgba(245,240,232,0.09)' }}>
          {BELIEFS.map((item, i) => (
            <Belief key={item.numeral} item={item} index={i} active={active} />
          ))}
        </div>

        {/* ── The stack: discernment stated as a number ───────────── */}
        <div style={{
          padding: '84px 0 0',
          display: 'grid',
          gridTemplateColumns: '90px 1fr',
          gap: '0 40px',
          ...rise(active, 780),
        }}>
          <Label color={CREAM} style={{ opacity: 0.38, paddingTop: '12px' }}>
            Stack
          </Label>

          <div style={{ maxWidth: '660px' }}>
            <p style={{
              fontFamily: serif,
              fontSize: 'clamp(30px, 3.6vw, 46px)',
              fontWeight: '400',
              color: WHITE,
              lineHeight: 1.2,
              letterSpacing: '-0.01em',
              margin: '0 0 30px',
            }}>
              Thirty tried. Four kept.
            </p>

            <div style={{
              display: 'flex', flexWrap: 'wrap',
              gap: '10px 28px', marginBottom: '26px',
            }}>
              {KEPT.map(t => (
                <span key={t} style={{
                  fontFamily: serif,
                  fontSize: '17px',
                  color: CREAM,
                  opacity: 0.8,
                  letterSpacing: '0.02em',
                }}>
                  {t}
                </span>
              ))}
            </div>

            <p style={{
              fontFamily: serif,
              fontSize: '17px',
              fontStyle: 'italic',
              color: CREAM,
              opacity: 0.4,
              margin: 0,
            }}>
              The rest are on the balance sheet, filed under equity.
            </p>
          </div>
        </div>

        {/* ── Close ──────────────────────────────────────────────── */}
        <div style={{
          marginTop: '110px',
          paddingTop: '52px',
          borderTop: '1px solid rgba(232,83,78,0.28)',
          display: 'grid',
          gridTemplateColumns: '90px 1fr',
          gap: '0 40px',
          ...rise(active, 860),
        }}>
          <Label style={{ paddingTop: '12px' }}>Next</Label>

          <div style={{ maxWidth: '660px' }}>
            <p style={{
              fontFamily: serif,
              fontSize: 'clamp(23px, 2.5vw, 31px)',
              fontWeight: '400',
              color: WHITE,
              lineHeight: 1.42,
              margin: '0 0 34px',
            }}>
              Applied AI work where the hard part is the judgement, not the demo. Close to
              people with a real problem, building the thing that actually helps them. Health,
              food, or anywhere the measurement already exists and the decision still does not.
            </p>

            <a
              href="#contact"
              style={{
                display: 'inline-block',
                fontFamily: serif,
                fontSize: '12px',
                fontWeight: '600',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: CREAM,
                textDecoration: 'none',
                padding: '15px 0 11px',
                borderBottom: `1px solid ${ORANGE}`,
                transition: `color 0.4s ${EASE}`,
              }}
              onMouseEnter={e => { e.currentTarget.style.color = ORANGE }}
              onMouseLeave={e => { e.currentTarget.style.color = CREAM }}
            >
              Start a conversation
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
