import { useState, useEffect } from 'react'

const BG_CREAM='#F5EFE7', PRIMARY_DARK='#2D2620', SECONDARY_DARK='#4A4238'
const CORAL='#FF4F38', GOLD='#D4A574'
const serif = { fontFamily:"'Cormorant Garamond',Georgia,serif" }
const bar = <span style={{ width:24, height:1, background:'#FF4F38', display:'block' }} />

const QUESTIONS = [
  'Why are birth rates really falling — and what is food doing to fertility?',
  'What would happen if we actually fixed the food system?',
  'Which soil health metrics will matter most to institutional investors in 2030?',
  'Why do the smartest people I know still eat the worst food?',
  'Can nutrient density become a verifiable, tradeable asset?',
]
const RESUME = [
  { role:'Founder', company:'Verifood', period:'2025 — Present', body:"Built an app to help people understand what's actually in their food. Shipped without a technical co-founder.", tags:['Founder','Food Tech','AI','Product'] },
  { role:'Strategy Intern', company:'Fruitist', period:'Summer 2025', body:'Built market intelligence dashboard. Led nutrient density program across supply chain.', tags:['Strategy','Food Systems'] },
  { role:'MBA Candidate', company:'Harvard Business School', period:'2024 — 2026', body:'Food & Agriculture Club. Impact Investing focus.', tags:['MBA','Impact Investing'] },
]
const IDEAS = [
  { num:'01', title:'Nutrient density labelling', body:'A standardized score that tells consumers what food actually does.', status:'building', statusText:'Developing →' },
  { num:'02', title:'Verifood — transparency at scale', body:'Verified ingredient stories. Not marketing. Actual traceability.', status:'live', statusText:'Live at verifood.com' },
]

function useTypewriter(texts) {
  const [display, setDisplay] = useState('')
  const [idx, setIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)
  useEffect(() => {
    if (!texts.length) return
    const current = texts[idx % texts.length]
    const t = setTimeout(() => {
      if (!deleting) {
        if (charIdx < current.length) { setDisplay(current.slice(0,charIdx+1)); setCharIdx(c=>c+1) }
        else { setTimeout(()=>setDeleting(true), 2400) }
      } else {
        if (charIdx > 0) { setDisplay(current.slice(0,charIdx-1)); setCharIdx(c=>c-1) }
        else { setDeleting(false); setIdx(i=>(i+1)%texts.length) }
      }
    }, deleting ? 26 : 52)
    return () => clearTimeout(t)
  }, [charIdx, deleting, idx, texts])
  return display
}

export function ThinkingSection() {
  const typewriter = useTypewriter(QUESTIONS)
  return (
    <section style={{ background:SECONDARY_DARK, padding:'88px 48px', textAlign:'center', borderTop:'1px solid rgba(212,165,116,0.12)', borderBottom:'1px solid rgba(212,165,116,0.12)' }}>
      <div style={{ maxWidth:820, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'.2em', textTransform:'uppercase', color:'rgba(245,239,231,0.4)', marginBottom:28 }}>Today I'm thinking about</div>
        <div style={{ ...serif, fontSize:'clamp(1.55rem,2.8vw,2.5rem)', fontWeight:300, fontStyle:'italic', color:BG_CREAM, lineHeight:1.35, minHeight:90, display:'flex', alignItems:'center', justifyContent:'center' }}>
          <span>{typewriter}</span><span style={{ color:CORAL, animation:'blink 1s step-end infinite', marginLeft:2 }}>|</span>
        </div>
        <p style={{ fontSize:14, color:'rgba(245,239,231,0.5)', lineHeight:1.65, maxWidth:480, margin:'28px auto 0' }}>A running list of questions I can't let go of. They shape my research and the businesses I want to build.</p>
      </div>
    </section>
  )
}

export function ResumeSection() {
  return (
    <section style={{ padding:'100px 48px', background:PRIMARY_DARK }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:CORAL, marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>{bar}Experience</div>
        <h2 style={{ ...serif, fontSize:'clamp(2.2rem,3.8vw,3.4rem)', fontWeight:300, lineHeight:1.08, color:BG_CREAM, marginBottom:12 }}>Where I've <em style={{ fontStyle:'italic', color:GOLD }}>been building.</em></h2>
        <p style={{ fontSize:15, color:'rgba(245,239,231,0.5)', maxWidth:480, lineHeight:1.68, marginBottom:56 }}>From Deloitte to HBS via AlixPartners.</p>
        {RESUME.map((r,i) => (
          <div key={i} style={{ padding:'28px 0', borderBottom:'1px solid rgba(245,239,231,0.08)' }}>
            <div style={{ fontSize:11, letterSpacing:'.1em', textTransform:'uppercase', color:GOLD, marginBottom:4 }}>{r.company}</div>
            <div style={{ ...serif, fontSize:'1.45rem', fontWeight:400, color:BG_CREAM, marginBottom:4 }}>{r.role}</div>
            <div style={{ fontSize:12, color:'rgba(245,239,231,0.35)', marginBottom:10 }}>{r.period}</div>
            <div style={{ fontSize:15, color:'rgba(245,239,231,0.6)', lineHeight:1.68, marginBottom:12 }}>{r.body}</div>
            <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>
              {r.tags.map(t => <span key={t} style={{ fontSize:11, background:'rgba(212,165,116,0.08)', border:'1px solid rgba(212,165,116,0.2)', color:GOLD, padding:'3px 10px', borderRadius:3 }}>{t}</span>)}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function IdeasSection() {
  return (
    <section style={{ padding:'100px 48px', background:SECONDARY_DARK }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:CORAL, marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>{bar}Ideas Lab</div>
        <h2 style={{ ...serif, fontSize:'clamp(2.2rem,3.8vw,3.4rem)', fontWeight:300, lineHeight:1.08, color:BG_CREAM, marginBottom:12 }}>Business ideas I'm <em style={{ fontStyle:'italic', color:GOLD }}>obsessed with.</em></h2>
        <p style={{ fontSize:15, color:'rgba(245,239,231,0.5)', maxWidth:480, lineHeight:1.68, marginBottom:52 }}>A running list. Some will become pitch decks. Some will become companies.</p>
        {IDEAS.map((idea,i) => (
          <div key={i} style={{ display:'flex', gap:24, alignItems:'flex-start', padding:'22px', margin:'0 -22px', borderRadius:6, cursor:'pointer', borderBottom:'1px solid rgba(245,239,231,0.05)', transition:'background 0.2s' }}
            onMouseEnter={e=>e.currentTarget.style.background='rgba(212,165,116,0.05)'}
            onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
            <div style={{ ...serif, fontSize:'2.2rem', fontWeight:300, color:'rgba(212,165,116,0.22)', minWidth:52, lineHeight:1, paddingTop:4 }}>{idea.num}</div>
            <div style={{ flex:1 }}>
              <div style={{ fontSize:17, fontWeight:500, color:BG_CREAM, marginBottom:7, lineHeight:1.3 }}>{idea.title}</div>
              <div style={{ fontSize:14, color:'rgba(245,239,231,0.5)', lineHeight:1.65, marginBottom:10 }}>{idea.body}</div>
              <div style={{ fontSize:11, letterSpacing:'.08em', textTransform:'uppercase', color:idea.status==='live'?CORAL:GOLD }}>{idea.statusText}</div>
            </div>
            <div style={{ fontSize:18, color:'rgba(245,239,231,0.15)', alignSelf:'center' }}>→</div>
          </div>
        ))}
      </div>
    </section>
  )
}

export function PapersSection() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState('idle')
  const inp = { width:'100%', background:'rgba(0,0,0,0.15)', border:'1px solid rgba(212,165,116,0.2)', color:BG_CREAM, padding:'11px 13px', borderRadius:4, fontSize:14, outline:'none', fontFamily:'inherit' }
  const handleSubmit = async () => {
    if (!email.includes('@')) return
    setStatus('loading')
    try {
      const res = await fetch('/api/send-email', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify({ email }) })
      setStatus(res.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }
  return (
    <section style={{ padding:'100px 48px', background:PRIMARY_DARK }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:CORAL, marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>{bar}Research Papers</div>
        <h2 style={{ ...serif, fontSize:'clamp(2.2rem,3.8vw,3.4rem)', fontWeight:300, lineHeight:1.08, color:BG_CREAM, marginBottom:12 }}>Writing that goes <em style={{ fontStyle:'italic', color:GOLD }}>where the data leads.</em></h2>
        {status !== 'done' ? (
          <div style={{ maxWidth:480, marginTop:40 }}>
            <div style={{ background:SECONDARY_DARK, border:'1px solid rgba(212,165,116,0.15)', borderRadius:8, padding:'36px 32px' }}>
              <div style={{ ...serif, fontSize:'1.5rem', color:BG_CREAM, marginBottom:10, fontWeight:300 }}>Unlock the research</div>
              <p style={{ fontSize:14, color:'rgba(245,239,231,0.5)', marginBottom:22, lineHeight:1.65 }}>Enter your email to receive the paper: <em>Will the Market Respond to Declining Birth Rates?</em></p>
              <div style={{ display:'flex', gap:10 }}>
                <input type="email" placeholder="your@email.com" value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>{if(e.key==='Enter')handleSubmit()}} style={{ ...inp, flex:1 }} />
                <button onClick={handleSubmit} disabled={status==='loading'} style={{ background:CORAL, color:'#fff', border:'none', padding:'11px 20px', borderRadius:4, fontSize:14, fontWeight:500, cursor:'pointer', whiteSpace:'nowrap', opacity:status==='loading'?0.7:1 }}>{status==='loading'?'...':'Unlock'}</button>
              </div>
              {status==='error' && <p style={{ fontSize:12, color:CORAL, marginTop:10 }}>Something went wrong — try again.</p>}
            </div>
          </div>
        ) : (
          <div style={{ marginTop:40, maxWidth:480 }}>
            <div style={{ background:SECONDARY_DARK, border:'1px solid rgba(212,165,116,0.2)', borderRadius:8, padding:'36px 32px', textAlign:'center' }}>
              <div style={{ fontSize:48, color:CORAL, marginBottom:16 }}>✓</div>
              <div style={{ ...serif, fontSize:'1.6rem', color:BG_CREAM, fontWeight:300 }}>Paper on its way.</div>
              <p style={{ fontSize:14, color:'rgba(245,239,231,0.5)', marginTop:12 }}>Check your inbox — the PDF is attached.</p>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export function ContactSection() {
  const [form, setForm] = useState({ name:'', email:'', context:'', message:'', newsletter:false })
  const [status, setStatus] = useState('idle')
  const inp = { width:'100%', background:'rgba(0,0,0,0.15)', border:'1px solid rgba(212,165,116,0.2)', color:BG_CREAM, padding:'11px 13px', borderRadius:4, fontSize:14, outline:'none', fontFamily:'inherit' }
  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', { method:'POST', headers:{'Content-Type':'application/json'}, body:JSON.stringify(form) })
      setStatus(res.ok ? 'done' : 'error')
    } catch { setStatus('error') }
  }
  return (
    <section style={{ padding:'100px 48px', background:SECONDARY_DARK }}>
      <div style={{ maxWidth:1080, margin:'0 auto' }}>
        <div style={{ fontSize:11, letterSpacing:'.18em', textTransform:'uppercase', color:CORAL, marginBottom:16, display:'flex', alignItems:'center', gap:10 }}>{bar}Let's talk</div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit,minmax(280px,1fr))', gap:80, alignItems:'start' }}>
          <div>
            <h2 style={{ ...serif, fontSize:'clamp(2.2rem,3.5vw,3.2rem)', fontWeight:300, color:BG_CREAM, lineHeight:1.1, marginBottom:18 }}>Come into the room.</h2>
            <p style={{ fontSize:16, color:'rgba(245,239,231,0.6)', lineHeight:1.72, maxWidth:380, marginBottom:32 }}>If you are building something at the intersection of food, health, and technology, I am interested.</p>
            <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
              <a href="mailto:abody@mba2026.hbs.edu" style={{ fontSize:14, color:CORAL, textDecoration:'none' }}>Email me</a>
              <a href="https://linkedin.com/in/annabelle-body" target="_blank" rel="noopener noreferrer" style={{ fontSize:14, color:CORAL, textDecoration:'none' }}>LinkedIn</a>
            </div>
          </div>
          <div>
            {status==='done' ? (
              <div style={{ textAlign:'center', padding:'52px 0' }}>
                <div style={{ fontSize:48, color:CORAL, marginBottom:16 }}>✓</div>
                <div style={{ ...serif, fontSize:'1.6rem', color:BG_CREAM, fontWeight:300 }}>Sent. I will be in touch.</div>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input placeholder="Your name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} style={{ ...inp, marginBottom:14, display:'block' }} />
                <input placeholder="Your email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} style={{ ...inp, marginBottom:14, display:'block' }} />
                <select value={form.context} onChange={e=>setForm({...form,context:e.target.value})} style={{ ...inp, background:PRIMARY_DARK, marginBottom:14, display:'block' }}>
                  <option value="">What brings you here?</option>
                  <option value="cofound">Co-founding</option>
                  <option value="invest">Invest</option>
                  <option value="speaking">Speaking</option>
                  <option value="other">Other</option>
                </select>
                <textarea placeholder="Message" value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={4} style={{ ...inp, marginBottom:14, display:'block', resize:'vertical' }} />
                <label style={{ display:'flex', alignItems:'center', gap:10, marginBottom:22, cursor:'pointer', fontSize:13, color:'rgba(245,239,231,0.5)' }}>
                  <input type="checkbox" checked={form.newsletter} onChange={e=>setForm({...form,newsletter:e.target.checked})} />Add me to the newsletter
                </label>
                <button type="submit" disabled={status==='loading'} style={{ background:CORAL, color:'#fff', border:'none', padding:'13px 28px', borderRadius:4, fontSize:14, fontWeight:500, cursor:'pointer', opacity:status==='loading'?0.7:1 }}>{status==='loading'?'Sending...':'Send'}</button>
                {status==='error' && <p style={{ fontSize:12, color:CORAL, marginTop:10 }}>Something went wrong — try again.</p>}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export function Footer() {
  return (
    <footer style={{ background:PRIMARY_DARK, padding:'32px 48px', display:'flex', alignItems:'center', justifyContent:'space-between', borderTop:'1px solid rgba(212,165,116,0.08)', flexWrap:'wrap', gap:16 }}>
      <span style={{ ...serif, fontSize:'1rem', color:'rgba(212,165,116,0.5)' }}>Annabelle Body</span>
      <span style={{ fontSize:12, color:'rgba(212,165,116,0.35)' }}>HBS MBA 26 — annabellebody.com</span>
    </footer>
  )
}
