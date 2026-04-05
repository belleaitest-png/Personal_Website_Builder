import { useState, useEffect, useRef } from 'react'

const CORAL = '#FF4F38', GOLD = '#C9963A', CREAM = '#F5F0E8', NAVY = '#06111e'

const BUBBLES = [
  { id:1, text:"I am working to build technology that enables human flourishing through taking action on understanding our biology for better health.", tag:"Mission", size:"large", accent:CORAL },
  { id:2, text:"The food system is broken — and the data to fix it already exists. We just haven't connected it yet.", tag:"Conviction", size:"medium", accent:GOLD },
  { id:3, text:"I believe the most important companies of the next decade will sit at the intersection of biology, food, and AI.", tag:"Thesis", size:"medium", accent:CORAL },
  { id:4, text:"The best rooms I've ever been in had one thing in common: people who were genuinely curious about the world.", tag:"Philosophy", size:"small", accent:GOLD },
  { id:5, text:"If you're not uncomfortable, you're not building anything worth building.", tag:"Belief", size:"small", accent:"rgba(245,240,232,0.3)" },
  { id:6, text:"Nutrient density is the most undervalued metric in human health — and the most underpriced asset in agriculture.", tag:"Research", size:"medium", accent:GOLD },
]

function BubbleCard({ bubble, index, isActive, onClick }) {
  const lg = bubble.size==='large', md = bubble.size==='medium'
  return (
    <div onClick={() => onClick(bubble.id)} style={{
      background: isActive ? 'rgba(11,31,58,0.95)' : 'rgba(11,31,58,0.6)',
      border: `1px solid ${isActive ? bubble.accent : 'rgba(245,240,232,0.08)'}`,
      borderRadius: lg ? 16 : 12, padding: lg ? '32px 36px' : md ? '24px 28px' : '20px 24px',
      cursor:'pointer', transition:'all 0.35s cubic-bezier(.16,1,.3,1)',
      transform: isActive ? 'translateY(-4px)' : 'translateY(0)',
      boxShadow: isActive ? `0 16px 48px rgba(0,0,0,0.4),0 0 0 1px ${bubble.accent}40` : '0 4px 20px rgba(0,0,0,0.2)',
      backdropFilter:'blur(12px)', position:'relative', overflow:'hidden',
      gridColumn: lg ? 'span 2' : 'span 1',
      animation:`fadeUp 0.6s cubic-bezier(.16,1,.3,1) ${index*0.08}s both`,
    }}
      onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.borderColor=bubble.accent; e.currentTarget.style.background='rgba(11,31,58,0.95)' }}
      onMouseLeave={e => { if(isActive)return; e.currentTarget.style.transform='translateY(0)'; e.currentTarget.style.borderColor='rgba(245,240,232,0.08)'; e.currentTarget.style.background='rgba(11,31,58,0.6)' }}>
      <div style={{ position:'absolute', top:0, left:0, width:80, height:80,
        background:`radial-gradient(circle, ${bubble.accent}18 0%, transparent 70%)`, pointerEvents:'none' }} />
      <div style={{ fontSize:10, letterSpacing:'.16em', textTransform:'uppercase', color:bubble.accent, marginBottom:12, display:'flex', alignItems:'center', gap:8 }}>
        <span style={{ width:16, height:1, background:bubble.accent, display:'block' }} />{bubble.tag}
      </div>
      <div style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:lg?'3.5rem':'2.5rem', lineHeight:0.8, color:`${bubble.accent}30`, marginBottom:8, userSelect:'none' }}>"</div>
      <p style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:lg?'1.25rem':md?'1.1rem':'1rem',
        fontWeight:300, fontStyle:'italic', color:CREAM, lineHeight:1.6, margin:0, opacity:0.88 }}>{bubble.text}</p>
    </div>
  )
}

export default function ThoughtBubbles({ sectionTitle='What drives me', sectionLabel='In my own words', showViewAll=true }) {
  const [activeId, setActiveId] = useState(null)
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if(e.isIntersecting) setVisible(true) }, { threshold:0.1 })
    if(ref.current) obs.observe(ref.current); return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ background:NAVY, padding:'100px 48px', fontFamily:"'DM Sans','Helvetica Neue',sans-serif" }}>
      <style>{`@keyframes fadeUp { from{opacity:0;transform:translateY(24px)} to{opacity:1;transform:translateY(0)} }`}</style>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ display:'flex', alignItems:'flex-end', justifyContent:'space-between', marginBottom:52, flexWrap:'wrap', gap:16 }}>
          <div>
            <div style={{ fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:CORAL, marginBottom:12, display:'flex', alignItems:'center', gap:10 }}>
              <span style={{ width:24, height:1, background:CORAL, display:'block' }} />In my own words
            </div>
            <h2 style={{ fontFamily:"'Cormorant Garamond',Georgia,serif", fontSize:'clamp(2rem,3.5vw,3rem)', fontWeight:300, color:CREAM, margin:0, lineHeight:1.1 }}>
              What <em style={{ fontStyle:'italic', color:GOLD }}>drives</em> me
            </h2>
          </div>
          {showViewAll && <p style={{ fontSize:13, color:'rgba(245,240,232,0.3)', margin:0, maxWidth:300, lineHeight:1.6, textAlign:'right' }}>Click any card to highlight it.<br/>These are updated as my thinking evolves.</p>}
        </div>
        {visible && <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16 }}>
          {BUBBLES.map((b,i) => <BubbleCard key={b.id} bubble={b} index={i} isActive={activeId===b.id} onClick={id => setActiveId(p=>p===id?null:id)} />)}
        </div>}
        <div style={{ marginTop:48, padding:'24px 28px', background:'rgba(11,31,58,0.4)', borderRadius:10, border:'1px solid rgba(245,240,232,0.05)', display:'flex', alignItems:'center', gap:20 }}>
          <div style={{ width:36, height:36, borderRadius:'50%', background:`linear-gradient(135deg,${CORAL}40,${GOLD}40)`, border:`1px solid rgba(201,150,58,0.3)`, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'Cormorant Garamond',serif", fontSize:'1.1rem', color:GOLD }}>AB</div>
          <p style={{ fontSize:14, color:'rgba(245,240,232,0.4)', margin:0, lineHeight:1.65, fontStyle:'italic' }}>Updated as my thinking evolves — building at the intersection of food, health, and technology.</p>
        </div>
      </div>
    </div>
  )
}
