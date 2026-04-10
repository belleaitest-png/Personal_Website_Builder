import { useEffect, useRef } from 'react'

const ITEMS = [
  'Harvard Business School',
  'Food Systems Researcher',
  'Founder — Verifood',
  'Fertility & Healthspan',
  'Qualitarian',
  'ex-Deloitte',
  'HBS MBA \'26',
]

const ORANGE = '#F4622A'
const CREAM  = '#F5F0E8'

export default function HeroTicker() {
  const track = useRef(null)

  useEffect(() => {
    const el = track.current
    if (!el) return
    let pos = 0
    let raf
    const step = () => {
      pos -= 0.5
      const half = el.scrollWidth / 2
      if (Math.abs(pos) >= half) pos = 0
      el.style.transform = `translateX(${pos}px)`
      raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [])

  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      zIndex: 90,
      height: '36px',
      background: ORANGE,
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
    }}>
      <div ref={track} style={{ display: 'flex', whiteSpace: 'nowrap', willChange: 'transform' }}>
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: '11px',
            fontWeight: '600',
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#FFFFFF',
            padding: '0 32px',
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
          }}>
            {item}
            <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(255,255,255,0.5)', display: 'inline-block' }} />
          </span>
        ))}
      </div>
    </div>
  )
}
