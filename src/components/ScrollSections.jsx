import { useState, useEffect, useRef } from 'react'

// ── Palette ──────────────────────────────────────────────────────────────────
const NAVY       = '#191A1A'
const NAVY_ALT   = '#151717'
const CREAM      = '#F5F0E8'
const WHITE      = '#FFFFFF'
const ORANGE     = '#E8534E'
const TEAL       = '#00C896'
const WARM       = '#E8A87C'
const ROSE       = '#C7706A'
const serif      = "'Cormorant Garamond', serif"
const mono       = "'Courier New', monospace"

const NUM_PANELS = 3

// ── Keyframes ────────────────────────────────────────────────────────────────
const CSS = `
@keyframes ssFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-16px); }
}
@keyframes ssPulseGlow {
  0%, 100% { box-shadow: 0 0 20px rgba(0,200,150,0.25); }
  50%      { box-shadow: 0 0 45px rgba(0,200,150,0.55); }
}
@keyframes ssCardFloat {
  0%, 100% { transform: translateY(0); }
  50%      { transform: translateY(-6px); }
}
@keyframes ssOrbPulse {
  0%, 100% { transform: translate(-50%,-50%) scale(1); opacity: 0.18; }
  50%      { transform: translate(-50%,-50%) scale(1.06); opacity: 0.3; }
}
@keyframes ssHeartbeat {
  0%, 25%, 50%, 100% { transform: translate(-50%,-50%) scale(1); }
  30% { transform: translate(-50%,-50%) scale(1.12); }
  40% { transform: translate(-50%,-50%) scale(0.96); }
}
@keyframes ssFadeUp {
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
}
`

// ── Text block (reusable) ────────────────────────────────────────────────────
function TextBlock({ tag, headline, body, cta, ctaHref, ctaExternal, active, coming }) {
  const stepStyle = (step) => ({
    animation: active ? `ssFadeUp 0.55s ease both` : 'none',
    animationDelay: `${300 + step * 120}ms`,
    opacity: active ? undefined : 0,
  })

  return (
    <div style={{ maxWidth: '480px' }}>
      <p style={{
        fontFamily: serif, fontSize: '12px', fontWeight: '600',
        letterSpacing: '0.14em', textTransform: 'uppercase',
        color: ORANGE, marginBottom: '16px',
        ...stepStyle(0),
      }}>
        {tag}
      </p>
      <h2 style={{
        fontFamily: serif, fontSize: 'clamp(30px, 4.5vw, 48px)',
        fontWeight: '700', color: WHITE, lineHeight: 1.12,
        margin: '0 0 24px', ...stepStyle(1),
      }}>
        {headline}
      </h2>
      <p style={{
        fontFamily: serif, fontSize: '17px', lineHeight: 1.75,
        color: CREAM, opacity: 0.8, margin: '0 0 32px',
        ...stepStyle(2),
      }}>
        {body}
      </p>
      <a
        href={ctaHref}
        target={ctaExternal ? '_blank' : undefined}
        rel={ctaExternal ? 'noreferrer' : undefined}
        style={{
          display: 'inline-block', fontFamily: serif,
          fontSize: '14px', fontWeight: '600',
          color: coming ? CREAM : WHITE,
          background: coming ? 'transparent' : ORANGE,
          border: coming ? '1px solid rgba(245,240,232,0.25)' : 'none',
          borderRadius: '4px', padding: '14px 28px',
          textDecoration: 'none', letterSpacing: '0.05em',
          cursor: coming ? 'default' : 'pointer',
          opacity: coming ? 0.5 : 1,
          ...stepStyle(3),
        }}
      >
        {cta}
      </a>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Panel 1 — WHOOP / Health OS
// ═══════════════════════════════════════════════════════════════════════════════

function WhoopVisual({ active }) {
  const metrics = [
    { label: 'Recovery',  value: '82%',  x: -110, y: -100, fromLeft: true },
    { label: 'HRV',       value: '65ms', x:  100, y:  -50, fromLeft: false },
    { label: 'Strain',    value: '12.4', x: -100, y:  100, fromLeft: true },
    { label: 'Sleep',     value: '7.4h', x:   90, y:   80, fromLeft: false },
  ]

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100%', perspective: '900px',
    }}>
      <div style={{
        position: 'relative',
        transform: 'rotateY(-14deg) rotateX(4deg)',
        transformStyle: 'preserve-3d',
      }}>
        <div style={{
          width: '150px', height: '260px', borderRadius: '75px',
          background: 'linear-gradient(170deg, #1c1c1c 0%, #2b2b2b 35%, #1a1a1a 70%, #222 100%)',
          border: '1.5px solid rgba(255,255,255,0.06)',
          boxShadow: '0 50px 100px rgba(0,0,0,0.55), 0 0 80px rgba(0,200,150,0.06), inset 0 1px 0 rgba(255,255,255,0.05)',
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          position: 'relative',
          animation: active ? 'ssFloat 5s ease-in-out infinite' : 'none',
          opacity: active ? 1 : 0, transition: 'opacity 0.7s ease',
        }}>
          <div style={{
            position: 'absolute', inset: '5px', borderRadius: '70px',
            background: 'linear-gradient(180deg, transparent, rgba(255,255,255,0.012) 50%, transparent)',
            border: '1px solid rgba(255,255,255,0.025)',
          }} />
          <div style={{
            width: '20px', height: '20px', borderRadius: '50%',
            background: `radial-gradient(circle, ${TEAL}, #009d74)`,
            animation: active ? 'ssPulseGlow 2.5s ease-in-out infinite' : 'none',
            position: 'relative', zIndex: 2,
          }} />
          <div style={{ position: 'absolute', top: '22px', width: '30px', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.07)' }} />
          <div style={{ position: 'absolute', bottom: '22px', width: '30px', height: '3px', borderRadius: '2px', background: 'rgba(255,255,255,0.07)' }} />
        </div>
        {metrics.map((m, i) => (
          <div key={m.label} style={{
            position: 'absolute',
            left: `calc(50% + ${m.x}px)`, top: `calc(50% + ${m.y}px)`,
            background: 'rgba(0,200,150,0.06)', border: '1px solid rgba(0,200,150,0.18)',
            borderRadius: '10px', padding: '10px 16px',
            opacity: active ? 1 : 0,
            transform: active ? 'translateX(0)' : `translateX(${m.fromLeft ? '-80px' : '80px'})`,
            transition: `all 0.6s cubic-bezier(0.16,1,0.3,1) ${0.5 + i * 0.15}s`,
            whiteSpace: 'nowrap', backdropFilter: 'blur(6px)',
          }}>
            <div style={{ fontSize: '9px', color: TEAL, opacity: 0.65, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: serif, marginBottom: '3px' }}>{m.label}</div>
            <div style={{ fontSize: '17px', color: WHITE, fontWeight: '700', fontFamily: mono }}>{m.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Panel 2 — Subscription OS
// ═══════════════════════════════════════════════════════════════════════════════

const SUBS = [
  { name: 'Momentous',    amount: '$89',  cycle: '/mo', color: '#3B82F6' },
  { name: 'IM8',          amount: '$65',  cycle: '/mo', color: '#8B5CF6' },
  { name: 'Larq',         amount: '$15',  cycle: '/mo', color: '#06B6D4' },
  { name: 'Water Filter', amount: '$24',  cycle: '/mo', color: '#10B981' },
  { name: 'AG1',          amount: '$79',  cycle: '/mo', color: '#84CC16' },
]

function SubscriptionVisual({ active }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100%', perspective: '1000px',
    }}>
      <div style={{
        position: 'relative', width: '320px', height: '400px',
        transform: 'rotateY(-8deg) rotateX(3deg)', transformStyle: 'preserve-3d',
      }}>
        {SUBS.map((sub, i) => (
          <div key={sub.name} style={{
            position: 'absolute', width: '280px', padding: '20px 24px',
            background: `linear-gradient(135deg, ${sub.color}18, ${sub.color}06)`,
            border: `1px solid ${sub.color}33`, borderRadius: '14px',
            top: `${i * 60}px`, left: `${i * 6}px`,
            transform: `translateZ(${(SUBS.length - i) * 12}px)`,
            boxShadow: '0 8px 24px rgba(0,0,0,0.25)',
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            opacity: active ? 1 : 0,
            transition: `opacity 0.45s ease ${0.2 + i * 0.1}s`,
            backdropFilter: 'blur(4px)',
            animation: active ? `ssCardFloat ${3 + i * 0.4}s ease-in-out infinite ${i * 0.3}s` : 'none',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: sub.color, boxShadow: `0 0 12px ${sub.color}55`, flexShrink: 0 }} />
              <span style={{ fontFamily: serif, fontSize: '16px', color: WHITE, fontWeight: '600' }}>{sub.name}</span>
            </div>
            <span style={{ fontFamily: mono, fontSize: '14px', color: CREAM, opacity: 0.55 }}>
              {sub.amount}<span style={{ fontSize: '11px' }}>{sub.cycle}</span>
            </span>
          </div>
        ))}
        <div style={{
          position: 'absolute', bottom: '-10px', left: `${SUBS.length * 6}px`, width: '280px',
          padding: '16px 24px', background: 'rgba(232,83,78,0.08)',
          border: '1px solid rgba(232,83,78,0.25)', borderRadius: '10px',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          opacity: active ? 1 : 0, transition: 'opacity 0.5s ease 0.9s',
        }}>
          <span style={{ fontFamily: serif, fontSize: '11px', color: ORANGE, fontWeight: '600', letterSpacing: '0.12em', textTransform: 'uppercase' }}>Total managed</span>
          <span style={{ fontFamily: mono, fontSize: '17px', color: ORANGE, fontWeight: '700' }}>$272<span style={{ fontSize: '12px', opacity: 0.7 }}>/mo</span></span>
        </div>
        <div style={{
          position: 'absolute', bottom: '-60px', left: `${SUBS.length * 6 + 80}px`,
          padding: '8px 16px', background: 'rgba(0,200,150,0.06)',
          border: '1px solid rgba(0,200,150,0.2)', borderRadius: '6px',
          opacity: active ? 1 : 0, transition: 'opacity 0.5s ease 1.1s', whiteSpace: 'nowrap',
        }}>
          <span style={{ fontFamily: serif, fontSize: '12px', color: TEAL, fontWeight: '600', letterSpacing: '0.06em' }}>0 micronutrient overlaps</span>
        </div>
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Panel 3 — Pregnancy OS
// ═══════════════════════════════════════════════════════════════════════════════

function PregnancyVisual({ active }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
      <div style={{ position: 'relative', width: '320px', height: '320px', opacity: active ? 1 : 0, transition: 'opacity 0.8s ease' }}>
        {[280, 240, 200].map((size, i) => (
          <div key={size} style={{
            position: 'absolute', width: `${size}px`, height: `${size}px`,
            borderRadius: '50%', border: `1px solid rgba(199,112,106,${0.18 - i * 0.04})`,
            top: '50%', left: '50%',
            animation: active ? `ssOrbPulse ${3.5 + i * 0.8}s ease-in-out infinite ${i * 0.6}s` : 'none',
          }} />
        ))}
        <div style={{
          position: 'absolute', width: '150px', height: '150px', borderRadius: '50%',
          background: `radial-gradient(circle at 38% 38%, ${WARM}, ${ROSE} 55%, #A85450)`,
          top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
          boxShadow: `0 0 70px rgba(199,112,106,0.35), 0 0 140px rgba(232,168,124,0.12)`,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
          <div style={{
            animation: active ? 'ssHeartbeat 1.8s ease-in-out infinite' : 'none',
            position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)',
          }}>
            <svg viewBox="0 0 120 40" style={{ width: '100px', height: '34px' }}>
              <polyline
                points="0,20 30,20 38,8 46,32 54,12 62,20 120,20"
                fill="none" stroke={WHITE} strokeWidth="2"
                strokeLinecap="round" strokeLinejoin="round"
                style={{
                  strokeDasharray: 180,
                  strokeDashoffset: active ? 0 : 180,
                  transition: 'stroke-dashoffset 1.6s ease 0.5s',
                  opacity: 0.85,
                }}
              />
            </svg>
          </div>
        </div>
        {[
          { label: 'Trimester', value: '2nd', x: -120, y: -60 },
          { label: 'Week', value: '22', x: 110, y: -30 },
          { label: 'Folate', value: '✓', x: -100, y: 90 },
        ].map((b, i) => (
          <div key={b.label} style={{
            position: 'absolute',
            left: `calc(50% + ${b.x}px)`, top: `calc(50% + ${b.y}px)`,
            background: 'rgba(232,168,124,0.06)', border: '1px solid rgba(232,168,124,0.18)',
            borderRadius: '10px', padding: '10px 16px',
            opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(10px)',
            transition: `all 0.5s ease ${0.8 + i * 0.2}s`, whiteSpace: 'nowrap',
          }}>
            <div style={{ fontSize: '9px', color: WARM, opacity: 0.7, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: serif, marginBottom: '3px' }}>{b.label}</div>
            <div style={{ fontSize: '17px', color: WHITE, fontWeight: '700', fontFamily: mono }}>{b.value}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Panel data
// ═══════════════════════════════════════════════════════════════════════════════

const PANELS = [
  {
    Visual: WhoopVisual,
    bg: NAVY,
    tag: 'Health OS',
    headline: 'Your WHOOP data, activated.',
    body: 'Your wearable knows what your body needs. We turn that signal into action — a health OS with a grocery shopping agent powered by Claude. It reads your recovery, analyses your gaps, and shops for what your biology actually requires.',
    cta: 'Visit Verifood →',
    ctaHref: 'https://verifood.app/',
    ctaExternal: true,
  },
  {
    Visual: SubscriptionVisual,
    bg: NAVY_ALT,
    tag: 'Subscription OS',
    headline: 'One agent. Every subscription.',
    body: "Momentous. IM8. Larq. Water filters. All on separate sites, separate billing, overlapping micronutrients you don't even know about. Our agent suite consolidates, optimises, and quantifies your entire D2C stack — nothing doubles up, nothing runs out.",
    cta: 'Coming Soon',
    ctaHref: '#',
    coming: true,
  },
  {
    Visual: PregnancyVisual,
    bg: NAVY,
    tag: 'Pregnancy OS',
    headline: 'Pregnancy, supported.',
    body: "Morning sickness. Nutrient gaps. Endless product research. The Pregnancy OS finds what you need, when you need it — supplements, remedies, relief — and handles the buying so you can focus on growing a human.",
    cta: 'Coming Soon',
    ctaHref: '#',
    coming: true,
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
//  Horizontal scroll wrapper
//  Phase 1 (entry): first panel slides in from the right over the balance sheet
//  Phase 2 (carousel): panels scroll horizontally between each other
//  Total height: (NUM_PANELS + 1) × 100vh — extra 100vh for the entry slide
// ═══════════════════════════════════════════════════════════════════════════════

// Phases: entry (slide in) → dwell (WHOOP stays) → carousel (pan through panels)
const TOTAL_VH = NUM_PANELS * 100 + 200 // +100vh entry, +100vh dwell

export default function ScrollSections() {
  const outerRef = useRef(null)
  const [entryProgress, setEntryProgress] = useState(0)
  const [panelProgress, setPanelProgress] = useState(0)
  const [activePanel, setActivePanel] = useState(0)

  useEffect(() => {
    const id = 'ss-keyframes'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = CSS
      document.head.appendChild(style)
    }
  }, [])

  useEffect(() => {
    function onScroll() {
      if (!outerRef.current) return
      const rect = outerRef.current.getBoundingClientRect()
      const scrollableHeight = outerRef.current.offsetHeight - window.innerHeight
      if (scrollableHeight <= 0) return
      const scrolled = -rect.top
      const p = Math.max(0, Math.min(1, scrolled / scrollableHeight))

      const entryEnd = 0.2    // first 20% = slide in from right
      const dwellEnd = 0.4    // next 20% = WHOOP stays centered

      if (p <= entryEnd) {
        setEntryProgress(p / entryEnd)
        setPanelProgress(0)
        setActivePanel(0)
      } else if (p <= dwellEnd) {
        setEntryProgress(1)
        setPanelProgress(0)
        setActivePanel(0)
      } else {
        setEntryProgress(1)
        const carouselP = (p - dwellEnd) / (1 - dwellEnd)
        setPanelProgress(carouselP)
        setActivePanel(Math.min(NUM_PANELS - 1, Math.floor(carouselP * NUM_PANELS)))
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Entry: slide track from off-screen right (100vw) to 0
  const entryX = (1 - entryProgress) * 100
  // Carousel: pan between panels
  const carouselX = -(panelProgress * (NUM_PANELS - 1) * 100)
  const translateX = entryX + carouselX

  return (
    <div
      ref={outerRef}
      style={{
        position: 'relative',
        zIndex: 2,
        height: `${TOTAL_VH}vh`,
      }}
    >
      {/* Sticky viewport */}
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}>
        {/* Sliding track */}
        <div style={{
          display: 'flex',
          width: `${NUM_PANELS * 100}vw`,
          height: '100%',
          transform: `translateX(${translateX}vw)`,
          willChange: 'transform',
        }}>
          {PANELS.map((panel, i) => {
            const { Visual, bg, tag, headline, body, cta, ctaHref, ctaExternal, coming } = panel
            const isActive = entryProgress > 0.5 && activePanel >= i
            return (
              <div
                key={i}
                style={{
                  width: '100vw',
                  height: '100%',
                  background: bg,
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  alignItems: 'center',
                  padding: '80px 48px',
                  gap: '60px',
                  boxSizing: 'border-box',
                  flexShrink: 0,
                }}
              >
                <Visual active={isActive} />
                <TextBlock
                  tag={tag}
                  headline={headline}
                  body={body}
                  cta={cta}
                  ctaHref={ctaHref}
                  ctaExternal={ctaExternal}
                  coming={coming}
                  active={isActive}
                />
              </div>
            )
          })}
        </div>

        {/* Progress dots */}
        <div style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '12px',
          zIndex: 10,
        }}>
          {PANELS.map((_, i) => (
            <div key={i} style={{
              width: activePanel === i ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: activePanel === i ? ORANGE : 'rgba(245,240,232,0.2)',
              transition: 'all 0.3s ease',
            }} />
          ))}
        </div>
      </div>
    </div>
  )
}
