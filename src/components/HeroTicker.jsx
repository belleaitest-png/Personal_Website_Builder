import { useState, useEffect } from 'react'

const CORAL = '#D47860'
const CREAM = '#F5F0E8'
const DEFAULT_TEXT = "What if the most radical health intervention isn't a drug or a diet — it's changing who profits from your health?"

function useTypewriter(text, loop) {
  const [display, setDisplay] = useState('')
  const [phase, setPhase] = useState('typing')
  const [charIdx, setCharIdx] = useState(0)
  useEffect(() => {
    if (phase === 'typing') {
      if (charIdx < text.length) {
        const t = setTimeout(() => { setDisplay(text.slice(0, charIdx+1)); setCharIdx(c=>c+1) }, 42)
        return () => clearTimeout(t)
      } else {
        if (!loop) return
        const t = setTimeout(() => setPhase('pause'), 3600); return () => clearTimeout(t)
      }
    }
    if (phase === 'pause') { const t = setTimeout(() => setPhase('deleting'), 1000); return () => clearTimeout(t) }
    if (phase === 'deleting') {
      if (charIdx > 0) {
        const t = setTimeout(() => { setDisplay(text.slice(0, charIdx-1)); setCharIdx(c=>c-1) }, 16)
        return () => clearTimeout(t)
      } else { const t = setTimeout(() => setPhase('typing'), 400); return () => clearTimeout(t) }
    }
  }, [phase, charIdx, text, loop])
  return display
}
export default function HeroTicker({ questionText=DEFAULT_TEXT, loopTypewriter=true, overlayOpacity=0.45 }) {
  const display = useTypewriter(questionText, loopTypewriter)
  return (
    <div style={{
      background: `rgba(6,17,30,${overlayOpacity})`,
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)',
      border: '1px solid rgba(245,240,232,0.08)',
      borderRadius: 0,
      padding: '32px 48px',
      textAlign: 'center',
      fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      width: '100%',
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)',
        fontWeight: 300, fontStyle: 'italic',
        color: CREAM, lineHeight: 1.55,
        minHeight: '2.5em',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <span>{display}<span style={{
          display: 'inline-block', width: 2, height: '0.8em',
          background: CORAL, marginLeft: 4, verticalAlign: 'middle',
          animation: 'blink 1s step-end infinite',
        }} /></span>
      </div>
    </div>
  )
}