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

const NUM_PANELS = 5

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

// ── Tool badge ──────────────────────────────────────────────────────────────
function ToolBadge({ tool, active }) {
  const tools = {
    'Claude Code': { icon: '⌘', color: '#D97706' },
    'Lovable': { icon: '♥', color: '#EC4899' },
    'Notion': { icon: '▪', color: '#FFFFFF' },
  }
  const t = tools[tool] || { icon: '◆', color: CREAM }

  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '8px',
      padding: '6px 14px', borderRadius: '20px',
      background: `${t.color}12`, border: `1px solid ${t.color}30`,
      opacity: active ? 1 : 0,
      transition: 'opacity 0.5s ease 0.8s',
      marginTop: '16px',
    }}>
      <span style={{ fontSize: '12px' }}>{t.icon}</span>
      <span style={{
        fontFamily: serif, fontSize: '11px', fontWeight: '600',
        color: t.color, letterSpacing: '0.06em', textTransform: 'uppercase',
      }}>
        Built with {tool}
      </span>
    </div>
  )
}

// ── Coming Soon badge ───────────────────────────────────────────────────────
function ComingSoonBadge({ active }) {
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: '6px',
      padding: '8px 20px', borderRadius: '4px',
      background: 'rgba(245,240,232,0.04)',
      border: '1px solid rgba(245,240,232,0.15)',
      opacity: active ? 0.6 : 0,
      transition: 'opacity 0.5s ease 0.6s',
    }}>
      <div style={{
        width: '6px', height: '6px', borderRadius: '50%',
        background: ORANGE, opacity: 0.7,
      }} />
      <span style={{
        fontFamily: serif, fontSize: '13px', fontWeight: '600',
        color: CREAM, letterSpacing: '0.08em', textTransform: 'uppercase',
      }}>
        In Development
      </span>
    </div>
  )
}

// ── Text block (reusable) ────────────────────────────────────────────────────
function TextBlock({ tag, headline, body, cta, ctaHref, ctaExternal, active, coming, tool }) {
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
      {coming ? (
        <div style={stepStyle(3)}>
          <ComingSoonBadge active={active} />
        </div>
      ) : (
        <a
          href={ctaHref}
          target={ctaExternal ? '_blank' : undefined}
          rel={ctaExternal ? 'noreferrer' : undefined}
          style={{
            display: 'inline-block', fontFamily: serif,
            fontSize: '14px', fontWeight: '600',
            color: WHITE, background: ORANGE,
            border: 'none', borderRadius: '4px',
            padding: '14px 28px', textDecoration: 'none',
            letterSpacing: '0.05em', cursor: 'pointer',
            ...stepStyle(3),
          }}
        >
          {cta}
        </a>
      )}
      {tool && (
        <div style={stepStyle(4)}>
          <ToolBadge tool={tool} active={active} />
        </div>
      )}
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Panel 1 - WHOOP / Apex Health OS
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
//  Panel 2 - SuppStack Manager
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
//  Panel 3 - Personal CRM
// ═══════════════════════════════════════════════════════════════════════════════

function CRMVisual({ active }) {
  const contacts = [
    { name: 'Advisor', tag: 'Last: 3d ago', color: '#3B82F6' },
    { name: 'Investor', tag: 'Follow up', color: '#8B5CF6' },
    { name: 'Co-founder', tag: 'Weekly sync', color: TEAL },
    { name: 'Mentor', tag: 'Intro pending', color: ORANGE },
  ]

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100%',
    }}>
      <div style={{
        position: 'relative', width: '300px', height: '340px',
        opacity: active ? 1 : 0, transition: 'opacity 0.7s ease',
      }}>
        {/* Connection lines */}
        <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
          {contacts.map((_, i) => (
            <line key={i}
              x1="150" y1="170"
              x2={80 + (i % 2) * 140} y2={60 + Math.floor(i / 2) * 180}
              stroke="rgba(245,240,232,0.06)" strokeWidth="1"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: active ? 0 : 200,
                transition: `stroke-dashoffset 1s ease ${0.3 + i * 0.15}s`,
              }}
            />
          ))}
        </svg>
        {/* Central node */}
        <div style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '60px', height: '60px', borderRadius: '50%',
          background: `radial-gradient(circle, ${ORANGE}40, ${ORANGE}10)`,
          border: `1.5px solid ${ORANGE}50`,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
        }}>
          <span style={{ fontSize: '22px', color: ORANGE, fontWeight: '700', fontFamily: mono }}>AB</span>
        </div>
        {/* Contact nodes */}
        {contacts.map((c, i) => (
          <div key={c.name} style={{
            position: 'absolute',
            left: `${i % 2 === 0 ? 10 : 65}%`,
            top: `${i < 2 ? 8 : 72}%`,
            transform: 'translate(-50%, -50%)',
            background: `${c.color}10`, border: `1px solid ${c.color}30`,
            borderRadius: '12px', padding: '14px 18px',
            opacity: active ? 1 : 0,
            transform: active ? 'scale(1)' : 'scale(0.8)',
            transition: `all 0.5s ease ${0.4 + i * 0.15}s`,
            backdropFilter: 'blur(6px)',
          }}>
            <div style={{ fontSize: '14px', color: WHITE, fontWeight: '600', fontFamily: serif, marginBottom: '4px' }}>{c.name}</div>
            <div style={{ fontSize: '10px', color: c.color, fontFamily: mono, letterSpacing: '0.04em' }}>{c.tag}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ═══════════════════════════════════════════════════════════════════════════════
//  Panel 4 - Pregnancy OS (Bloom)
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
          { label: 'Folate', value: '\u2713', x: -100, y: 90 },
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
//  Panel 5 - Demographic Forecaster
// ═══════════════════════════════════════════════════════════════════════════════

function DemographicVisual({ active }) {
  // Declining population curve data points
  const bars = [
    { year: '2020', h: 85, color: '#3B82F6' },
    { year: '2030', h: 78, color: '#3B82F6' },
    { year: '2040', h: 68, color: '#D97706' },
    { year: '2050', h: 55, color: '#D97706' },
    { year: '2060', h: 42, color: ORANGE },
    { year: '2070', h: 30, color: ORANGE },
  ]

  return (
    <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      height: '100%',
    }}>
      <div style={{
        position: 'relative', width: '320px', height: '300px',
        opacity: active ? 1 : 0, transition: 'opacity 0.7s ease',
      }}>
        {/* Chart area */}
        <div style={{
          display: 'flex', alignItems: 'flex-end', justifyContent: 'center',
          gap: '14px', height: '220px', paddingBottom: '30px',
          borderBottom: '1px solid rgba(245,240,232,0.1)',
          borderLeft: '1px solid rgba(245,240,232,0.1)',
          paddingLeft: '8px',
        }}>
          {bars.map((bar, i) => (
            <div key={bar.year} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{
                width: '32px',
                height: active ? `${bar.h * 2}px` : '0px',
                background: `linear-gradient(180deg, ${bar.color}, ${bar.color}60)`,
                borderRadius: '4px 4px 0 0',
                transition: `height 0.8s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.12}s`,
                boxShadow: `0 0 12px ${bar.color}25`,
              }} />
              <span style={{
                fontFamily: mono, fontSize: '9px', color: CREAM,
                opacity: 0.4, letterSpacing: '0.02em',
              }}>
                {bar.year}
              </span>
            </div>
          ))}
        </div>
        {/* Trend line overlay */}
        <svg style={{
          position: 'absolute', top: '0', left: '8px',
          width: 'calc(100% - 8px)', height: '220px', pointerEvents: 'none',
        }}>
          <polyline
            points="26,32 72,52 118,82 164,118 210,152 256,178"
            fill="none" stroke={ORANGE} strokeWidth="2"
            strokeDasharray="4,6" opacity="0.5"
            style={{
              strokeDashoffset: active ? 0 : 300,
              transition: 'stroke-dashoffset 1.5s ease 1s',
            }}
          />
        </svg>
        {/* Stat badges */}
        {[
          { label: 'TFR Decline', value: '-38%', x: -30, y: -20 },
          { label: 'By 2070', value: '1.2B fewer', x: 190, y: 10 },
        ].map((s, i) => (
          <div key={s.label} style={{
            position: 'absolute', left: `${s.x}px`, top: `${s.y}px`,
            background: 'rgba(217,119,6,0.06)', border: '1px solid rgba(217,119,6,0.2)',
            borderRadius: '10px', padding: '10px 14px',
            opacity: active ? 1 : 0, transform: active ? 'translateY(0)' : 'translateY(10px)',
            transition: `all 0.5s ease ${1 + i * 0.2}s`, whiteSpace: 'nowrap',
          }}>
            <div style={{ fontSize: '9px', color: '#D97706', opacity: 0.7, letterSpacing: '0.12em', textTransform: 'uppercase', fontFamily: serif, marginBottom: '3px' }}>{s.label}</div>
            <div style={{ fontSize: '15px', color: WHITE, fontWeight: '700', fontFamily: mono }}>{s.value}</div>
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
  // ── Live apps ──
  {
    Visual: WhoopVisual,
    bg: NAVY,
    tag: 'I Built a Thing',
    headline: 'Using WHOOP to automate my grocery shopping.',
    body: 'Your WHOOP tracks recovery, HRV, strain, and sleep. Apex Health OS connects those signals to what you eat. It logs nutrition via natural language, spots micronutrient gaps, correlates patterns across your health data, and builds a grocery list your biology actually asked for.',
    cta: 'Try Apex Health OS \u2192',
    ctaHref: 'https://apex-health-os.vercel.app/',
    ctaExternal: true,
    tool: 'Claude Code',
  },
  {
    Visual: PregnancyVisual,
    bg: NAVY_ALT,
    tag: 'I Built a Thing',
    headline: 'A pregnancy OS for the modern mother.',
    body: "Trimester-aware health tracking that adapts as you do. Bloom surfaces the right supplements, flags nutrient gaps, and handles the product research so you can stop Googling at 2am and focus on growing a human.",
    cta: 'Try Bloom \u2192',
    ctaHref: 'https://mama-mosaic-hub.lovable.app',
    ctaExternal: true,
    tool: 'Lovable',
  },
  {
    Visual: DemographicVisual,
    bg: NAVY,
    tag: 'I Built a Thing',
    headline: 'Visualising the population decline nobody is planning for.',
    body: "Fertility rates are falling faster than most models predicted. This tool maps the demographic data country by country, projects population trajectories, and makes the scale of the decline impossible to ignore. Built to support my research on birth rates and food systems.",
    cta: 'Explore the Data \u2192',
    ctaHref: 'https://demographic-forecaster.replit.app',
    ctaExternal: true,
    tool: 'Claude Code',
  },
  // ── Coming soon ──
  {
    Visual: CRMVisual,
    bg: NAVY_ALT,
    tag: 'I Built a Thing',
    headline: 'A personal CRM that actually works.',
    body: "Advisors, investors, co-founders, mentors. Every meaningful relationship deserves follow-through. This tool tracks conversations, surfaces when to reconnect, and keeps your network warm without enterprise software overhead.",
    coming: true,
    tool: 'Claude Code',
  },
  {
    Visual: SubscriptionVisual,
    bg: NAVY,
    tag: 'I Built a Thing',
    headline: 'Managing my supplement subscriptions.',
    body: "Five brands, five billing cycles, overlapping micronutrients nobody warned you about. SuppStack Manager consolidates every supplement subscription into one dashboard, flags ingredient overlaps, tracks dosing, and makes sure nothing doubles up and nothing runs out.",
    coming: true,
    tool: 'Claude Code',
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
//  Horizontal scroll wrapper
// ═══════════════════════════════════════════════════════════════════════════════

const TOTAL_VH = NUM_PANELS * 100 + 200

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

      const entryEnd = 0.15
      const dwellEnd = 0.3

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

  const entryX = (1 - entryProgress) * 100
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
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
      }}>
        <div style={{
          display: 'flex',
          width: `${NUM_PANELS * 100}vw`,
          height: '100%',
          transform: `translateX(${translateX}vw)`,
          willChange: 'transform',
        }}>
          {PANELS.map((panel, i) => {
            const { Visual, bg, tag, headline, body, cta, ctaHref, ctaExternal, coming, tool } = panel
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
                  tool={tool}
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
