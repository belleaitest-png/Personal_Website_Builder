import { useState, useEffect, useRef } from 'react'

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

// Non-current assets — Resume: credentials that don't depreciate
const NC_ASSETS = [
  {
    label: 'HBS MBA',
    note:  'intellectual capital, in acquisition',
    value: 25,
    href:  '#about',
  },
  {
    label: 'ICAEW ACA',
    note:  'chartered accountant · yes, I actually liked it',
    value: 15,
    href:  '#about',
  },
  {
    label: 'Fruitist',
    note:  'co-founder · turning ugly fruit into beautiful products',
    value: 10,
    href:  '#about',
  },
  {
    label: 'AlixPartners',
    note:  'turnaround consulting · corporate triage',
    value: 8,
    href:  '#about',
  },
  {
    label: 'Deloitte',
    note:  'audit & advisory · where the spreadsheets began',
    value: 7,
    href:  '#about',
  },
]

// Current assets — Apps & Artifacts: live, shipping, generating value
const CA_ASSETS = [
  {
    label: 'VeriFood',
    note:  'WHOOP → grocery agent · your recovery shops for you',
    value: 15,
    href:  'https://verifood.app/',
    ext:   true,
  },
  {
    label: 'SuppStack Manager',
    note:  'AI agents managing your supplement stack · no more overlaps',
    value: 10,
    href:  '#',
  },
  {
    label: 'Bloom',
    note:  'pregnancy OS · trimester-aware, actually helpful',
    value: 10,
    href:  '#',
  },
]

// Current liabilities — Papers in Development: problems I can't stop thinking about
const CL_LIAB = [
  {
    label: 'The Loneliness Epidemic (Male)',
    note:  'metabolic shadow of social isolation · draft',
    value: 10,
    href:  '/documents/papers/loneliness-crisis.pdf',
  },
  {
    label: 'Synthetic Biology × Everything',
    note:  'how synbio rewrites the rules · in progress',
    value: 8,
  },
]

// Long-term liabilities — Papers Written: published thinking, still accruing interest
const LT_LIAB = [
  {
    label: 'Declining Birth Rates × Food',
    note:  'ultra-processed fertility · the quiet crisis',
    value: 14,
    href:  '/documents/papers/birth-rates.pdf',
  },
  {
    label: 'The Food System Thesis',
    note:  'inputs, incentives, and why your salad is lying to you',
    value: 12,
    href:  '/documents/papers/food-system-thesis.pdf',
  },
  {
    label: 'World View Agent Manager',
    note:  'AI agents that challenge your assumptions · framework',
    value: 6,
  },
]

// Equity — Systems & Tools: the operating system behind the operator
const EQ_ITEMS = [
  {
    label: 'Productivity System',
    note:  'Notion × automations · unreasonably organised',
    value: 20,
    href:  '#about',
  },
  {
    label: 'AI Toolkit',
    note:  'Claude, Cursor, custom agents · the compound edge',
    value: 15,
    href:  '#about',
  },
  {
    label: 'Mindfulness Routine',
    note:  'meditation, journaling, cold water · intangible but load-bearing',
    value: 15,
    href:  '#about',
  },
]

// Subtotals & totals — must balance: Total Assets = Total L + Total E
const NC_SUB   = 65
const CA_SUB   = 35
const TOTAL_A  = 100
const CL_SUB   = 18
const LT_SUB   = 32
const TOTAL_L  = 50
const TOTAL_E  = 50
const LE_TOTAL = 100

// ── CSS keyframes (injected once) ────────────────────────────────────────────
const KEYFRAMES = `
@keyframes bsRowIn {
  from { opacity: 0; transform: translateY(7px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes bsHeaderIn {
  from { opacity: 0; transform: translateY(-8px); }
  to   { opacity: 1; transform: translateY(0); }
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
    animation: `bsRowIn 0.4s ease both`,
    animationDelay: `${baseDelay + step * STEP}ms`,
    animationPlayState: active ? 'running' : 'paused',
  }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ColHeader({ children, step, delay, active }) {
  return (
    <div style={{
      fontFamily: serif,
      fontSize: '22px',
      fontWeight: '700',
      color: WHITE,
      marginBottom: '6px',
      letterSpacing: '0.01em',
      animation: `bsHeaderIn 0.45s ease both`,
      animationDelay: `${delay + step * STEP}ms`,
      animationPlayState: active ? 'running' : 'paused',
    }}>
      {children}
    </div>
  )
}

function CategoryLabel({ children, step, delay, active }) {
  return (
    <div style={{
      fontFamily: serif,
      fontSize: '13px',
      fontStyle: 'italic',
      color: CREAM,
      opacity: 0.45,
      padding: '14px 0 3px',
      letterSpacing: '0.03em',
      ...rowAnim(step, delay, active),
    }}>
      {children}
    </div>
  )
}

function Row({ item, step, delay, active }) {
  const [hov, setHov] = useState(false)
  const isLink = Boolean(item.href)

  const inner = (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        padding: '5px 0 5px 20px',
        cursor: isLink ? 'pointer' : 'default',
        ...rowAnim(step, delay, active),
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span style={{
        fontFamily: serif,
        fontSize: '16px',
        color: hov && isLink ? ORANGE : CREAM,
        transition: 'color 0.15s',
        display: 'flex',
        alignItems: 'baseline',
        gap: '10px',
        flexWrap: 'wrap',
      }}>
        <span>
          {item.label}
          {isLink && hov && (
            <span style={{ marginLeft: '5px', fontSize: '13px' }}>→</span>
          )}
        </span>
        <span style={{
          fontSize: '12px',
          fontStyle: 'italic',
          color: CREAM,
          opacity: 0.38,
          fontWeight: '300',
        }}>
          {item.note}
        </span>
      </span>
      <span style={{
        fontFamily: mono,
        fontSize: '15px',
        color: hov && isLink ? ORANGE : CREAM,
        opacity: hov && isLink ? 1 : 0.6,
        transition: 'color 0.15s, opacity 0.15s',
        paddingLeft: '20px',
        flexShrink: 0,
      }}>
        {item.value}
      </span>
    </div>
  )

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
        fontSize: '15px',
        color: CREAM,
        opacity: 0.5,
        borderTop: '1px solid rgba(245,240,232,0.25)',
        paddingTop: '3px',
        minWidth: '32px',
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
      padding: '10px 0 8px',
      borderTop: '1px solid rgba(245,240,232,0.3)',
      marginTop: '4px',
      ...rowAnim(step, delay, active),
    }}>
      <span style={{
        fontFamily: serif,
        fontSize: '16px',
        fontWeight: '700',
        color: WHITE,
        letterSpacing: '0.01em',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: mono,
        fontSize: '16px',
        fontWeight: '700',
        color: WHITE,
        minWidth: '32px',
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
      padding: '12px 0 10px',
      borderTop: '3px double rgba(232,83,78,0.55)',
      marginTop: '6px',
      ...rowAnim(step, delay, active),
    }}>
      <span style={{
        fontFamily: serif,
        fontSize: '19px',
        fontWeight: '700',
        color: ORANGE,
        letterSpacing: '0.02em',
      }}>
        {label}
      </span>
      <span style={{
        fontFamily: mono,
        fontSize: '19px',
        fontWeight: '700',
        color: ORANGE,
        minWidth: '32px',
        textAlign: 'right',
      }}>
        {value}
      </span>
    </div>
  )
}

// ── Main component ────────────────────────────────────────────────────────────
export default function BalanceSheet() {
  const [active, setActive] = useState(false)
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
        minHeight: '100vh',
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
          fontSize: '13px',
          fontWeight: '600',
          color: ORANGE,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
        }}>
          Balance Sheet · Annabelle Body
        </span>
        <span style={{
          fontFamily: serif,
          fontSize: '13px',
          color: CREAM,
          opacity: 0.3,
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
          <CategoryLabel step={2} delay={L} active={active}>
            Resume
          </CategoryLabel>
          {NC_ASSETS.map((item, i) => (
            <Row key={item.label} item={item} step={3 + i} delay={L} active={active} />
          ))}
          <Subtotal value={NC_SUB} step={8} delay={L} active={active} />

          {/* Current */}
          <CategoryLabel step={9} delay={L} active={active}>
            Apps & Artifacts
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
          <CategoryLabel step={2} delay={R} active={active}>
            Papers in Development
          </CategoryLabel>
          {CL_LIAB.map((item, i) => (
            <Row key={item.label} item={item} step={3 + i} delay={R} active={active} />
          ))}
          <Subtotal value={CL_SUB} step={5} delay={R} active={active} />

          {/* Long-term liabilities */}
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
          <ColHeader step={11} delay={R} active={active}>Systems & Tools</ColHeader>
          {EQ_ITEMS.map((item, i) => (
            <Row key={item.label} item={item} step={12 + i} delay={R} active={active} />
          ))}
          <TotalRow
            label="Total Shareholders' Funds"
            value={TOTAL_E}
            step={15}
            delay={R}
            active={active}
          />
          <GrandTotalRow
            label="Liabilities + Equity"
            value={totalLEDisplay}
            step={16}
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
          fontSize: '12px',
          color: CREAM,
          opacity: 0.25,
          margin: 0,
          fontStyle: 'italic',
        }}>
          * Prepared on a going-concern basis · The auditors have a conflict of interest · Click the assets, not the liabilities
        </p>
      </div>
    </section>
  )
}
