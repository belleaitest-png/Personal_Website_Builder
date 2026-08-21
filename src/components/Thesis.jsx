import { useState, useEffect, useRef } from 'react'

// ── Palette ──────────────────────────────────────────────────────────────────
const NAVY       = '#191A1A'
const NAVY_ALT   = '#151717'
const CREAM      = '#F5F0E8'
const WHITE      = '#FFFFFF'
const ORANGE     = '#E8534E'
const TEAL       = '#00C896'
const serif      = "'Cormorant Garamond', serif"
const mono       = "'Courier New', monospace"

const CSS = `
@keyframes thFadeUp {
  from { opacity: 0; transform: translateY(26px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes thRule {
  from { transform: scaleX(0); }
  to   { transform: scaleX(1); }
}
`

// ── The four convictions ─────────────────────────────────────────────────────
// Numbered like audit working papers, because that is how I was trained to think.
const CONVICTIONS = [
  {
    n: '01',
    label: 'On adoption',
    claim: 'The constraint was never who could code.',
    body: "I qualified as a chartered accountant. I have never held an engineering job. I have three live products and two more in development, and the hard part was never the syntax. It was knowing which problem was worth solving and being able to describe it precisely. Accountants are trained to do exactly that. So are lawyers, nurses, teachers, and operators. The people who understand a problem deeply are about to become the people who fix it, and most organisations have not noticed yet.",
    accent: ORANGE,
  },
  {
    n: '02',
    label: 'On how the world adapts',
    claim: 'The most important companies of the next decade will sit at the intersection of biology, food, and AI.',
    body: "Not because AI is the interesting part. Because biology is finally producing data at a scale nobody can read unaided, and the bottleneck has moved from measurement to interpretation. WHOOP gives me recovery, HRV, strain and sleep every morning. Until I built an agent to read it against what I eat, it was four numbers I glanced at and forgot. Multiply that across every wearable, every lab panel, every food label, and the gap between data we collect and decisions we make is the largest unclaimed asset in health.",
    accent: TEAL,
  },
  {
    n: '03',
    label: 'On what we can actually solve',
    claim: 'The food system is broken, and the data to fix it already exists. We just have not connected it yet.',
    body: "Fertility rates are falling fastest in the countries with the most food. My HBS research on birth rates and food systems kept landing on the same wall: the evidence is there, spread across agricultural subsidy data, processing incentives, and nutrition panels that nobody reads together. That is not a research problem any more. It is an integration problem, and integration is what these tools are unreasonably good at. Every app on this site started as a paper I could not stop thinking about.",
    accent: ORANGE,
  },
  {
    n: '04',
    label: 'On practice',
    claim: 'If you are not uncomfortable, you are not building anything worth building.',
    body: "I evaluated 30 AI tools and kept four as daily drivers. Most of what I have shipped I did not know how to make when I started it. The useful skill is not picking the right model, it is staying in the part of the work where you are visibly bad at something until you are not. I write about that publicly, including the parts that did not work, because pretending adoption is frictionless is the fastest way to make people distrust it.",
    accent: TEAL,
  },
]

// ── How I build, in numbers I can defend ─────────────────────────────────────
const STATS = [
  { value: '5',  label: 'products built',   note: '3 live, 2 in development' },
  { value: '30', label: 'AI tools evaluated', note: 'four tiers, four kept' },
  { value: '0',  label: 'engineering jobs',  note: 'chartered accountant, ICAEW' },
  { value: '1',  label: 'multi-agent framework', note: 'World View Agent Manager' },
]

function useInView(threshold = 0.15) {
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

function ConvictionCard({ item, index, active }) {
  const [hov, setHov] = useState(false)
  return (
    <div
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'grid',
        gridTemplateColumns: '72px 1fr',
        gap: '28px',
        padding: '34px 40px 34px 32px',
        background: hov ? 'rgba(232,83,78,0.04)' : 'rgba(255,255,255,0.02)',
        border: `1px solid ${hov ? item.accent : 'rgba(255,255,255,0.06)'}`,
        borderRadius: '6px',
        transition: 'border-color 0.25s, background 0.25s',
        animation: active ? 'thFadeUp 0.6s ease both' : 'none',
        animationDelay: `${140 + index * 110}ms`,
        opacity: active ? undefined : 0,
      }}
    >
      <div>
        <div style={{
          fontFamily: mono,
          fontSize: '30px',
          color: item.accent,
          opacity: hov ? 0.85 : 0.4,
          transition: 'opacity 0.25s',
          lineHeight: 1,
        }}>
          {item.n}
        </div>
        <div style={{
          width: '28px', height: '2px', background: item.accent,
          opacity: 0.35, marginTop: '12px', borderRadius: '1px',
        }} />
      </div>

      <div>
        <p style={{
          fontFamily: serif, fontSize: '12px', fontWeight: '600',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          color: item.accent, opacity: 0.75, margin: '0 0 12px',
        }}>
          {item.label}
        </p>
        <h3 style={{
          fontFamily: serif, fontSize: 'clamp(22px, 2.4vw, 30px)',
          fontWeight: '700', color: WHITE, lineHeight: 1.25,
          margin: '0 0 16px',
        }}>
          {item.claim}
        </h3>
        <p style={{
          fontFamily: serif, fontSize: '17px', lineHeight: 1.75,
          color: CREAM, opacity: 0.72, margin: 0,
        }}>
          {item.body}
        </p>
      </div>
    </div>
  )
}

export default function Thesis() {
  const [ref, active] = useInView(0.1)

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
        padding: '120px 48px',
        borderTop: '1px solid rgba(255,255,255,0.05)',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* ── Header ─────────────────────────────────────────────── */}
        <p style={{
          fontFamily: serif, fontSize: '11px', fontWeight: '600',
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: ORANGE, margin: '0 0 16px',
          animation: active ? 'thFadeUp 0.5s ease both' : 'none',
          opacity: active ? undefined : 0,
        }}>
          Thesis
        </p>
        <div style={{
          width: '48px', height: '3px', background: ORANGE,
          margin: '0 0 32px', borderRadius: '2px',
          animation: active ? 'thRule 0.7s ease both 120ms' : 'none',
          transformOrigin: 'left',
        }} />

        <h2 style={{
          fontFamily: serif, fontSize: 'clamp(32px, 5vw, 52px)',
          fontWeight: '700', color: WHITE, lineHeight: 1.15,
          margin: '0 0 24px', maxWidth: '760px',
          animation: active ? 'thFadeUp 0.6s ease both 60ms' : 'none',
          opacity: active ? undefined : 0,
        }}>
          What I believe about AI, and why I keep building.
        </h2>

        <p style={{
          fontFamily: serif, fontSize: '19px', lineHeight: 1.75,
          color: CREAM, opacity: 0.78, margin: '0 0 56px', maxWidth: '720px',
          animation: active ? 'thFadeUp 0.6s ease both 100ms' : 'none',
        }}>
          I am not an AI researcher. I am a domain person who picked up these tools early,
          used them hard, and now has opinions earned from shipping rather than from reading.
          Four of those opinions, in the order I arrived at them.
        </p>

        {/* ── Convictions ────────────────────────────────────────── */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {CONVICTIONS.map((item, i) => (
            <ConvictionCard key={item.n} item={item} index={i} active={active} />
          ))}
        </div>

        {/* ── Receipts ───────────────────────────────────────────── */}
        <div style={{
          marginTop: '64px',
          paddingTop: '40px',
          borderTop: '1px solid rgba(255,255,255,0.08)',
        }}>
          <p style={{
            fontFamily: serif, fontSize: '11px', fontWeight: '600',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: ORANGE, margin: '0 0 28px',
          }}>
            Receipts
          </p>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: '20px',
          }}>
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: '24px 26px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '6px',
                  animation: active ? 'thFadeUp 0.55s ease both' : 'none',
                  animationDelay: `${600 + i * 90}ms`,
                  opacity: active ? undefined : 0,
                }}
              >
                <div style={{
                  fontFamily: mono, fontSize: '38px', fontWeight: '700',
                  color: WHITE, lineHeight: 1, marginBottom: '10px',
                }}>
                  {s.value}
                </div>
                <div style={{
                  fontFamily: serif, fontSize: '15px', color: CREAM,
                  opacity: 0.8, marginBottom: '4px',
                }}>
                  {s.label}
                </div>
                <div style={{
                  fontFamily: serif, fontSize: '13px', fontStyle: 'italic',
                  color: CREAM, opacity: 0.4,
                }}>
                  {s.note}
                </div>
              </div>
            ))}
          </div>

          <p style={{
            fontFamily: serif, fontSize: '16px', fontStyle: 'italic',
            color: CREAM, opacity: 0.42, margin: '28px 0 0',
          }}>
            Every product listed on this site is linked and live. This page was built the same way.
          </p>
        </div>

        {/* ── Where this is going ────────────────────────────────── */}
        <div style={{
          marginTop: '64px',
          padding: '40px 44px',
          background: 'rgba(232,83,78,0.05)',
          border: `1px solid rgba(232,83,78,0.2)`,
          borderRadius: '8px',
          animation: active ? 'thFadeUp 0.6s ease both 900ms' : 'none',
          opacity: active ? undefined : 0,
        }}>
          <p style={{
            fontFamily: serif, fontSize: '11px', fontWeight: '600',
            letterSpacing: '0.12em', textTransform: 'uppercase',
            color: ORANGE, margin: '0 0 14px',
          }}>
            What I am looking for
          </p>
          <p style={{
            fontFamily: serif, fontSize: '19px', lineHeight: 1.7,
            color: CREAM, opacity: 0.85, margin: '0 0 24px', maxWidth: '760px',
          }}>
            Applied AI work where the hard part is the domain, not the demo. I want to sit
            close to the people who have a real problem, translate it into something a model
            can actually help with, and ship it. If you are building in health, food, or
            anywhere the data exists but the decisions do not, I would like to hear about it.
          </p>
          <a
            href="#contact"
            style={{
              display: 'inline-block', fontFamily: serif,
              fontSize: '14px', fontWeight: '600', color: WHITE,
              background: ORANGE, border: 'none', borderRadius: '4px',
              padding: '14px 28px', textDecoration: 'none',
              letterSpacing: '0.05em',
            }}
          >
            Start a conversation →
          </a>
        </div>
      </div>
    </section>
  )
}
