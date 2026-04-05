import { useState, useEffect } from 'react'

const CORAL = '#FF4F38'
const CREAM = '#F5F0E8'
const DEFAULT_TEXT = 'How can we align financial incentives with human and planetary health as technology opens new possibilities?'

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

export default function HeroTicker({ questionText=DEFAULT_TEXT, loopTypewriter=true, overlayOpacity=0.35 }) {
  const display = useTypewriter(questionText, loopTypewriter)
  return (
    <div style={{ background:`rgba(6,17,30,${overlayOpacity})`, backdropFilter:'blur(12px)', WebkitBackdropFilter:'blur(12px)',
      border:'1px solid rgba(245,240,232,0.1)', borderRadius:10, padding:'28px 36px', textAlign:'center',
      fontFamily:"'DM Sans','Helvetica Neue',sans-serif", display:'flex', alignItems:'center', justifyContent:'center',
      maxWidth:720, width:'90%' }}>
      <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(1.55rem,2.8vw,2.4rem)',
        fontWeight:300, fontStyle:'italic', color:CREAM, lineHeight:1.5, minHeight:'3em',
        display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span>{display}<span style={{ display:'inline-block', width:2, height:'0.8em', background:CORAL,
          marginLeft:4, verticalAlign:'middle', animation:'blink 1s step-end infinite' }} /></span>
      </div>
    </div>
  )
}
