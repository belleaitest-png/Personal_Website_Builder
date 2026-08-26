import { useState, useEffect } from 'react'

const CORAL = '#D47860'
const CREAM = '#F5F0E8'
const DEFAULT_TEXT = "Everyone has the same tools now. What’s rare is knowing which problem deserves one."

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
export default function HeroTicker({ questionText=DEFAULT_TEXT, loopTypewriter=true, overlayOpacity=0.45, align='left' }) {
  const display = useTypewriter(questionText, loopTypewriter)
  const isLeft = align === 'left'
  return (
    <div style={{
      padding: '32px 48px',
      textAlign: isLeft ? 'left' : 'center',
      display: 'flex', alignItems: 'center',
      justifyContent: isLeft ? 'flex-start' : 'center',
      width: '100%',
    }}>
      <div style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: 'clamp(1.4rem, 2.8vw, 2.4rem)',
        fontWeight: 300, fontStyle: 'italic',
        color: CREAM, lineHeight: 1.55,
        minHeight: '2.5em',
        display: 'flex', alignItems: 'center',
        justifyContent: isLeft ? 'flex-start' : 'center',
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