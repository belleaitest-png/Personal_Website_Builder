import { useState, useEffect, useRef } from 'react'
import DownloadGate from './DownloadGate'

// ── Palette ──────────────────────────────────────────────────────────────────
const NAVY_DEEP  = '#0E1010'
const NAVY       = '#141616'
const CREAM      = '#F5F0E8'
const WHITE      = '#FFFFFF'
const ORANGE     = '#E8534E'
const serif      = "'Cormorant Garamond', serif"
const mono       = "'Courier New', monospace"

// ── Animation constants ───────────────────────────────────────────────────────
const STEP       = 75   // ms between stagger steps
const R_OFFSET   = 160  // ms head-start for right column

// ── Data ─────────────────────────────────────────────────────────────────────

// Non-current assets -Resume
const NC_ASSETS = [
  {
    label: 'HBS MBA',
    note:  'Class of 2026 · strategy, entrepreneurship, applied AI',
    value: 14,
    href:  '/documents/resume/Annabelle Body, HBS Class of 2026.pdf',
    ext:   true,
    gated: true,
  },
  {
    label: 'ICAEW ACA',
    note:  'chartered accountant · UK qualified',
    value: 8,
    href:  '/documents/resume/Annabelle Body, HBS Class of 2026.pdf',
    ext:   true,
    gated: true,
  },
  {
    label: 'Fruitist',
    note:  'strategy & innovation · upcycling surplus fruit into consumer products',
    value: 6,
    href:  '/documents/resume/Annabelle Body, HBS Class of 2026.pdf',
    ext:   true,
    gated: true,
  },
  {
    label: 'AlixPartners',
    note:  'turnaround & restructuring consulting',
    value: 5,
    href:  '/documents/resume/Annabelle Body, HBS Class of 2026.pdf',
    ext:   true,
    gated: true,
  },
  {
    label: 'Deloitte',
    note:  'audit & assurance',
    value: 5,
    href:  '/documents/resume/Annabelle Body, HBS Class of 2026.pdf',
    ext:   true,
    gated: true,
  },
]

// Current assets -Shipped
const CA_ASSETS = [
  {
    label: 'Apex Health OS',
    note:  'WHOOP-integrated grocery agent · built with Claude Code',
    value: 18,
    href:  'https://apex-health-os.vercel.app/',
    ext:   true,
  },
  {
    label: 'Bloom',
    note:  'trimester-aware pregnancy platform · built with Lovable',
    value: 15,
    href:  'https://mama-mosaic-hub.lovable.app',
    ext:   true,
  },
  {
    label: 'Demographic Forecaster',
    note:  'country-level population modelling · built with Replit',
    value: 13,
    href:  'https://demographic-forecaster.replit.app',
    ext:   true,
  },
  {
    label: 'Personal CRM',
    note:  'relationship agent · follow-up automation · Claude Code',
    value: 8,
    coming: true,
  },
  {
    label: 'SuppStack Manager',
    note:  'supplement tracking & dosing · Claude Code',
    value: 8,
    coming: true,
  },
]

// Current liabilities -Papers in Development
const CL_LIAB = [
  {
    label: 'The Loneliness Epidemic (Male)',
    note:  'draft',
    value: 10,
    coming: true,
  },
  {
    label: 'Synthetic Biology × Everything',
    note:  'in progress',
    value: 8,
  },
]

// Long-term liabilities -Papers Written
const LT_LIAB = [
  {
    label: 'Declining Birth Rates × Food',
    value: 14,
    href:  '/documents/papers/When Markets Fail to Make Babies -The Limits of Private Responses to Fertility Crisis.pdf',
    gated: true,
  },
  {
    label: 'The Food System Thesis',
    value: 12,
    coming: true,
  },
  {
    label: 'World View Agent Manager',
    note:  'multi-agent AI framework',
    value: 6,
  },
]

// Equity -Systems & Tools
const EQ_ITEMS = [
  {
    label: 'AI Toolkit',
    note:  'Claude Code, Claude Cowork, custom agents · 30 tools evaluated',
    value: 24,
    toolsPopup: true,
  },
  {
    label: 'Productivity System',
    note:  'Notion workflows & automation',
    value: 14,
    toolsPopup: true,
    coming: true,
  },
  {
    label: 'Mindfulness Routine',
    note:  'meditation, journaling, cold exposure',
    value: 12,
  },
]

// ── Tools data for popup ─────────────────────────────────────────────────────
const TOOL_TIERS = [
  {
    tier: 'Primary',
    color: '#E8534E',
    tools: [
      { name: 'Claude Cowork', icon: '⌘' },
      { name: 'Claude Code', icon: '⌘' },
      { name: 'Notion', icon: '▪' },
      { name: 'Speechify', icon: '🔊' },
    ],
  },
  {
    tier: 'Secondary',
    color: '#00C896',
    tools: [
      { name: 'GitHub', icon: '◆' },
      { name: 'Vercel', icon: '▲' },
      { name: 'Cloudflare', icon: '☁' },
      { name: 'Lovable', icon: '♥' },
      { name: 'Replit', icon: '◉' },
      { name: 'Resend', icon: '✉' },
      { name: 'Google Workspace', icon: 'G' },
      { name: 'Nanobanana 2', icon: '🍌' },
      { name: 'NotebookLM', icon: '📓' },
      { name: 'Granola', icon: '📝' },
    ],
  },
  {
    tier: 'Tertiary',
    color: '#D97706',
    tools: [
      { name: 'Gemini Live', icon: '✦' },
      { name: 'Google Stitch', icon: '🧵' },
      { name: 'Figma Make', icon: '◎' },
      { name: 'Whispr Flow', icon: '🎙' },
      { name: 'Canva', icon: '🎨' },
      { name: 'ElevenLabs', icon: '🔉' },
      { name: 'Twilio', icon: '📱' },
      { name: 'Supabase', icon: '⚡' },
      { name: 'Formspree', icon: '📋' },
      { name: 'ChatGPT', icon: '○' },
      { name: 'Codex', icon: '◇' },
      { name: 'Zapier', icon: '⚡' },
    ],
  },
  {
    tier: 'Tried',
    color: 'rgba(245,240,232,0.35)',
    tools: [
      { name: 'Seedance 2', icon: '🌱' },
      { name: 'Ommia', icon: '◯' },
      { name: 'Framer', icon: '▢' },
      { name: 'Loop', icon: '∞' },
    ],
  },
]

// Subtotals & totals -must balance: Total Assets = Total L + Total E
const NC_SUB   = 38
const CA_SUB   = 62
const TOTAL_A  = 100
const CL_SUB   = 18
const LT_SUB   = 32
const TOTAL_L  = 50
const TOTAL_E  = 50
const LE_TOTAL = 100

// ── CSS keyframes (injected once) ────────────────────────────────────────────
const KEYFRAMES = `
@keyframes bsRowIn {
  0%   { opacity: 0; transform: translateY(28px); }
  60%  { opacity: 1; transform: translateY(-6px); }
  80%  { transform: translateY(2px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes bsHeaderIn {
  0%   { opacity: 0; transform: translateY(-28px); }
  60%  { opacity: 1; transform: translateY(6px); }
  80%  { transform: translateY(-2px); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes bsLineExpand {
  from { transform: scaleX(0); transform-origin: left; }
  to   { transform: scaleX(1); transform-origin: left; }
}
`

// ── Count-up hook ─────────────────────────────────────────────────────────────
function useCountUp(target, active, delayMs, durationMs = 750) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const timeout = setTimeout(() => {
      const start = Date.now()
      const tick = () => {
        const p = Math.min((Date.now() - start) / durationMs, 1)
        const eased = 1 - Math.pow(1 - p, 3) // cubic ease-out
        setVal(Math.round(eased * target))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, delayMs)
    return () => clearTimeout(timeout)
  }, [active]) // eslint-disable-line react-hooks/exhaustive-deps
  return val
}

// ── Row animation style ───────────────────────────────────────────────────────
function rowAnim(step, baseDelay, active) {
  return {
    animation: `bsRowIn 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
    animationDelay: `${baseDelay + step * STEP}ms`,
    animationPlayState: active ? 'running' : 'paused',
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ColHeader({ children, step, delay, active }) {
  return (
    <div style={{
      fontFamily: serif,
      fontSize: '30px',
      fontWeight: '700',
      color: WHITE,
      marginBottom: '8px',
      letterSpacing: '0.01em',
      animation: `bsHeaderIn 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both`,
      animationDelay: `${delay + step * STEP}ms`,
      animationPlayState: active ? 'running' : 'paused',
    }}>
      {children}
    </div>
  )
}

function SectionLabel({ children, step, delay, active }) {
  return (
    <div style={{
      fontFamily: serif,
      fontSize: '18px',
      fontWeight: '600',
      color: CREAM,
      opacity: 0.55,
      padding: '20px 0 0',
      letterSpacing: '0.04em',
      ...rowAnim(step, delay, active),
    }}>
      {children}
    </div>
  )
}

function CategoryLabel({ children, step, delay, active }) {
  return (
    <div style={{
      fontFamily: serif,
      fontSize: '16px',
      fontStyle: 'italic',
      color: CREAM,
      opacity: 0.42,
      padding: '3px 0 4px',
      letterSpacing: '0.03em',
      ...rowAnim(step, delay, active),
    }}>
      {children}
    </div>
  )
}

function Row({ item, step, delay, active, onToolsClick }) {
  const [hov, setHov] = useState(false)
  const isLink = Boolean(item.href)
  const isClickable = isLink || item.toolsPopup

  const inner = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '7px 0 7px 20px',
        cursor: isClickable ? 'pointer' : 'default',
        ...rowAnim(step, delay, active),
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={item.toolsPopup ? onToolsClick : undefined}
    >
      <span style={{
        fontFamily: serif,
        fontSize: '20px',
        color: hov && isClickable ? ORANGE : CREAM,
        transition: 'color 0.15s',
        display: 'flex',
        alignItems: 'baseline',
        gap: '10px',
        flexWrap: 'wrap',
      }}>
        <span>
          {item.label}
          {item.coming && (
            <span style={{
              marginLeft: '8px', fontSize: '10px', fontWeight: '600',
              letterSpacing: '0.1em', textTransform: 'uppercase',
              color: ORANGE, opacity: 0.6, fontFamily: mono,
              border: `1px solid rgba(232,83,78,0.25)`,
              borderRadius: '3px', padding: '2px 6px',
              verticalAlign: 'middle',
            }}>
              Soon
            </span>
          )}
          {isClickable && hov && (
            <span style={{ marginLeft: '5px', fontSize: '16px' }}>{item.toolsPopup ? '↗' : '→'}</span>
          )}
        </span>
        {item.note && <span style={{
          fontSize: '14px',
          fontStyle: 'italic',
          color: CREAM,
          opacity: 0.4,
          fontWeight: '300',
        }}>
          {item.note}
        </span>}
      </span>
      <span style={{
        fontFamily: mono,
        fontSize: '19px',
        color: hov && isClickable ? ORANGE : CREAM,
        opacity: hov && isClickable ? 1 : 0.65,
        transition: 'color 0.15s, opacity 0.15s',
        paddingLeft: '20px',
        flexShrink: 0,
      }}>
        {item.value}
      </span>
    </div>
  )

  if (isLink && item.gated) {
    return (
      <DownloadGate
        href={item.href}
        label={item.label}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        {inner}
      </DownloadGate>
    )
  }
  if (isLink) {
    return (
      <a
        href={item.href}
        target={item.ext ? '_blank' : undefined}
        rel={item.ext ? 'noreferrer' : undefined}
        style={{ textDecoration: 'none', display: 'block' }}
      >
        {inner}
      </a>
    )
  }
  return inner
}

function Subtotal({ value, step, delay, active }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'flex-end',
      padding: '3px 0 6px',
      ...rowAnim(step, delay, active),
    }}>
      <span style={{
        fontFamily: mono,
        fontSize: '18px',
        color: CREAM,
        opacity: 0.55,
        borderTop: '1px solid rgba(245,240,232,0.25)',
        paddingTop: '4px',
        minWidth: '40px',
        textAlign: 'right',
      }}>
        {value}
      </span>
    </div>
  )
}

function TotalRow({ label, value, step, delay, active }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      padding: '14px 0 10px',
      borderTop: '1px solid rgba(245,240,232,0.3)',
      marginTop: '6px',
      ...rowAnim(step, delay, active),
    }}>
      <span style={{
        fontFamily: serif,
        fontSize: '22px',
        fontWeight: '700',
        color: WHITE,
        letterSpacing: '0.01em',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: mono,
        fontSize: '22px',
        fontWeight: '700',
        color: WHITE,
        minWidth: '40px',
        textAlign: 'right',
      }}>
        {value}
      </span>
    </div>
  )
}

function GrandTotalRow({ label, value, step, delay, active }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      padding: '16px 0 12px',
      borderTop: '3px double rgba(232,83,78,0.55)',
      marginTop: '8px',
      ...rowAnim(step, delay, active),
    }}>
      <span style={{
        fontFamily: serif,
        fontSize: '26px',
        fontWeight: '700',
        color: ORANGE,
        letterSpacing: '0.02em',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: mono,
        fontSize: '26px',
        fontWeight: '700',
        color: ORANGE,
        minWidth: '40px',
        textAlign: 'right',
      }}>
        {value}
      </span>
    </div>
  )
}

// ── Tools Popup ──────────────────────────────────────────────────────────────
function ToolsPopup({ open, onClose }) {
  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(10px)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#141616', borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '40px 44px', maxWidth: '640px', width: '100%',
          maxHeight: '85vh', overflowY: 'auto',
          boxShadow: '0 32px 100px rgba(0,0,0,0.6)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
          <div>
            <h3 style={{
              fontFamily: serif, fontSize: '24px', fontWeight: '700',
              color: WHITE, margin: '0 0 6px',
            }}>
              Systems & Tools
            </h3>
            <p style={{
              fontFamily: serif, fontSize: '13px', color: CREAM,
              opacity: 0.4, margin: 0, fontStyle: 'italic',
            }}>
              30 tools evaluated, four tiers deep. This is what actually stuck.
            </p>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: 'none', color: CREAM,
              opacity: 0.4, fontSize: '24px', cursor: 'pointer',
              padding: '8px', lineHeight: 1,
            }}
          >
            ×
          </button>
        </div>

        {TOOL_TIERS.map((tier) => (
          <div key={tier.tier} style={{ marginBottom: '28px' }}>
            <div style={{
              fontFamily: serif, fontSize: '11px', fontWeight: '600',
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: tier.color, marginBottom: '14px',
              paddingBottom: '8px',
              borderBottom: `1px solid ${tier.color}20`,
            }}>
              {tier.tier}
            </div>
            <div style={{
              display: 'flex', flexWrap: 'wrap', gap: '10px',
            }}>
              {tier.tools.map((tool) => (
                <div key={tool.name} style={{
                  display: 'flex', alignItems: 'center', gap: '8px',
                  padding: '8px 14px', borderRadius: '8px',
                  background: `${tier.color}08`,
                  border: `1px solid ${tier.color}18`,
                  transition: 'all 0.2s ease',
                }}>
                  <span style={{ fontSize: '14px', lineHeight: 1 }}>{tool.icon}</span>
                  <span style={{
                    fontFamily: serif, fontSize: '13px', fontWeight: '500',
                    color: CREAM, opacity: 0.8,
                  }}>
                    {tool.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BalanceSheet() {
  const [active, setActive] = useState(false)
  const [toolsOpen, setToolsOpen] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const style = document.createElement('style')
    style.textContent = KEYFRAMES
    style.id = 'bs-keyframes'
    if (!document.getElementById('bs-keyframes')) {
      document.head.appendChild(style)
    }
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setActive(true) },
      { threshold: 0.12 }
    )
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  // Grand total count-ups
  // Total Assets: step 12 on left column (delay 0) → starts at 12×75 = 900ms
  // L+E:          step 13 on right column (delay 160) → starts at 160+13×75 = 1135ms
  const totalADisplay  = useCountUp(TOTAL_A,  active, 14 * STEP)
  const totalLEDisplay = useCountUp(LE_TOTAL, active, R_OFFSET + 16 * STEP)

  const L = 0        // left column base delay (ms)
  const R = R_OFFSET // right column base delay (ms)

  return (
    <section
      ref={ref}
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 1,
        minHeight: '133vh',
        paddingBottom: '80px',
      }}
    >
      {/* Translucent backdrop */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(14,16,16,0.425)',
        backdropFilter: 'blur(12px)',
        zIndex: 1,
      }} />

      {/* ── Header bar ────────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        background: 'rgba(14,16,16,0.6)',
        borderBottom: `1px solid rgba(232,83,78,0.18)`,
        padding: '18px 48px',
        display: 'flex',
        alignItems: 'center',
        gap: '24px',
        flexWrap: 'wrap',
        animation: 'bsHeaderIn 0.5s ease both',
        animationDelay: '0ms',
        animationPlayState: active ? 'running' : 'paused',
      }}>
        <span style={{
          fontFamily: serif,
          fontSize: '16px',
          fontWeight: '600',
          color: ORANGE,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          Balance Sheet · Annabelle Body
        </span>
        <span style={{
          fontFamily: serif,
          fontSize: '16px',
          color: CREAM,
          opacity: 0.35,
          letterSpacing: '0.05em',
        }}>
          FY 2026 · Non-GAAP
        </span>

        {/* Animated orange rule */}
        <div style={{
          flex: 1,
          height: '1px',
          background: `linear-gradient(to right, ${ORANGE}, transparent)`,
          opacity: 0.35,
          animation: 'bsLineExpand 0.9s ease both',
          animationDelay: '200ms',
          animationPlayState: active ? 'running' : 'paused',
        }} />
      </div>

      {/* ── Two-column grid ───────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        maxWidth: '1100px',
        margin: '0 auto',
        padding: '40px 48px 0',
        gap: '0',
      }}>

        {/* ════ LEFT: ASSETS ════════════════════════════════════════ */}
        <div style={{
          paddingRight: '52px',
          borderRight: '1px solid rgba(255,255,255,0.07)',
        }}>
          <ColHeader step={1} delay={L} active={active}>Assets</ColHeader>

          {/* Non-current */}
          <SectionLabel step={2} delay={L} active={active}>
            Non-Current Assets
          </SectionLabel>
          <CategoryLabel step={2} delay={L} active={active}>
            Resume
          </CategoryLabel>
          {NC_ASSETS.map((item, i) => (
            <Row key={item.label} item={item} step={3 + i} delay={L} active={active} />
          ))}
          <Subtotal value={NC_SUB} step={8} delay={L} active={active} />

          {/* Current */}
          <SectionLabel step={9} delay={L} active={active}>
            Current Assets
          </SectionLabel>
          <CategoryLabel step={9} delay={L} active={active}>
            Shipped
          </CategoryLabel>
          {CA_ASSETS.map((item, i) => (
            <Row key={item.label} item={item} step={10 + i} delay={L} active={active} />
          ))}
          <Subtotal value={CA_SUB} step={13} delay={L} active={active} />

          {/* Grand total */}
          <GrandTotalRow
            label="Total Assets"
            value={totalADisplay}
            step={14}
            delay={L}
            active={active}
          />
        </div>

        {/* ════ RIGHT: LIABILITIES + EQUITY ═════════════════════════ */}
        <div style={{ paddingLeft: '52px' }}>
          <ColHeader step={1} delay={R} active={active}>Liabilities</ColHeader>

          {/* Current liabilities */}
          <SectionLabel step={2} delay={R} active={active}>
            Current Liabilities
          </SectionLabel>
          <CategoryLabel step={2} delay={R} active={active}>
            Papers in Development
          </CategoryLabel>
          {CL_LIAB.map((item, i) => (
            <Row key={item.label} item={item} step={3 + i} delay={R} active={active} />
          ))}
          <Subtotal value={CL_SUB} step={5} delay={R} active={active} />

          {/* Long-term liabilities */}
          <SectionLabel step={6} delay={R} active={active}>
            Non-Current Liabilities
          </SectionLabel>
          <CategoryLabel step={6} delay={R} active={active}>
            Papers Written
          </CategoryLabel>
          {LT_LIAB.map((item, i) => (
            <Row key={item.label} item={item} step={7 + i} delay={R} active={active} />
          ))}
          <TotalRow
            label="Total Liabilities"
            value={TOTAL_L}
            step={10}
            delay={R}
            active={active}
          />

          {/* Equity */}
          <ColHeader step={11} delay={R} active={active}>Equity</ColHeader>
          <CategoryLabel step={12} delay={R} active={active}>
            Systems & Tools
          </CategoryLabel>
          {EQ_ITEMS.map((item, i) => (
            <Row key={item.label} item={item} step={13 + i} delay={R} active={active} onToolsClick={() => setToolsOpen(true)} />
          ))}
          <TotalRow
            label="Total Shareholders' Funds"
            value={TOTAL_E}
            step={16}
            delay={R}
            active={active}
          />
          <GrandTotalRow
            label="Liabilities + Equity"
            value={totalLEDisplay}
            step={17}
            delay={R}
            active={active}
          />
        </div>
      </div>

      {/* ── Footnote ──────────────────────────────────────────────── */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        maxWidth: '1100px',
        margin: '28px auto 0',
        padding: '0 48px',
        ...rowAnim(14, R, active),
      }}>
        <p style={{
          fontFamily: serif,
          fontSize: '17px',
          color: ORANGE,
          opacity: 0.45,
          margin: 0,
          fontStyle: 'italic',
        }}>
          * Prepared on a going-concern basis · The auditor has a conflict of interest
        </p>
      </div>
      <ToolsPopup open={toolsOpen} onClose={() => setToolsOpen(false)} />
    </section>
  )
}
