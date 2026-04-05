import { useState, useEffect } from 'react'
import WaterRipple from './components/WaterRipple.jsx'
import HeroTicker from './components/HeroTicker.jsx'
import ThoughtBubbles from './components/ThoughtBubbles.jsx'
import { ThinkingSection, ResumeSection, IdeasSection, PapersSection, ContactSection, Footer } from './components/Sections.jsx'

const CORAL = '#FF4F38'
const NAVY = '#06111e'

function Nav() {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 600,
      padding: '20px 48px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
      background: scrolled ? 'rgba(6,17,30,0.85)' : 'transparent',
      backdropFilter: scrolled ? 'blur(16px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
    }}>
      <a href="#" style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif", fontSize: '1.6rem',
        fontWeight: 400, letterSpacing: '0.04em', color: '#F5F0E8', textDecoration: 'none',
      }}>Annabelle Body</a>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        {[
          { label: 'Thinking', href: '#thinking' },
          { label: 'Work', href: '#work' },
          { label: 'Ideas', href: '#ideas' },
          { label: 'Research', href: '#research' },
          { label: 'Contact', href: '#contact' },
        ].map(({ label, href }) => (
          <a key={label} href={href} style={{
            fontSize: 13, letterSpacing: '0.06em', color: 'rgba(245,240,232,0.65)',
            textDecoration: 'none', transition: 'color 0.2s', fontFamily: "'DM Sans',sans-serif",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F5F0E8')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.65)')}
          >{label}</a>
        ))}
      </div>
    </nav>
  )
}

function HeroSection() {
  return (
    <section style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: NAVY }}>
      <div style={{ position: 'absolute', inset: 0 }}>
        <WaterRipple backgroundColor={NAVY} rippleColor="#1a4a8a"
          autoRipple={true} autoRippleInterval={2200} speed={2} damping={0.965} rippleSize={4} />
      </div>
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(6,17,30,0.2) 0%, rgba(6,17,30,0.1) 50%, rgba(6,17,30,0.55) 100%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center', padding: '0 24px', gap: 40,
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 11, letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.45)', marginBottom: 18, fontFamily: "'DM Sans',sans-serif" }}>
            HBS MBA 2026 · Food · Health · Technology
          </div>
          <h1 style={{ fontFamily: "'Cormorant Garamond',Georgia,serif",
            fontSize: 'clamp(3.5rem, 7vw, 6rem)', fontWeight: 300, color: '#F5F0E8',
            lineHeight: 1.0, margin: 0, letterSpacing: '-0.01em' }}>
            Annabelle Body
          </h1>
          <div style={{ width: 48, height: 1, background: CORAL, margin: '20px auto' }} />
        </div>
        <HeroTicker questionText="How can we align financial incentives with human and planetary health as technology opens new possibilities?"
          loopTypewriter={true} overlayOpacity={0.35} />
        <div style={{
          position: 'absolute', bottom: 36, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
          opacity: 0.4, animation: 'scrollBounce 2s ease-in-out infinite',
        }}>
          <div style={{ width: 1, height: 40, background: 'rgba(245,240,232,0.5)' }} />
          <div style={{ fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase',
            color: '#F5F0E8', fontFamily: "'DM Sans',sans-serif" }}>scroll</div>
        </div>
      </div>
      <style>{`@keyframes scrollBounce {
        0%, 100% { transform: translateX(-50%) translateY(0); }
        50% { transform: translateX(-50%) translateY(6px); }
      }`}</style>
    </section>
  )
}

export default function App() {
  return (
    <div style={{ background: NAVY, color: '#F5EFE7', fontFamily: "'DM Sans','Helvetica Neue',sans-serif", overflowX: 'hidden' }}>
      <Nav />
      <HeroSection />
      <div id="thinking"><ThinkingSection /></div>
      <ThoughtBubbles />
      <div id="work"><ResumeSection /></div>
      <div id="ideas"><IdeasSection /></div>
      <div id="research"><PapersSection /></div>
      <div id="contact"><ContactSection /></div>
      <Footer />
    </div>
  )
}
