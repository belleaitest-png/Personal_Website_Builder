import { useState, useEffect, useRef } from 'react'
import HeroTicker from './components/HeroTicker.jsx'
import { ThinkingSection, ResumeSection, IdeasSection, PapersSection, ContactSection, Footer } from './components/Sections.jsx'
import ThoughtBubbles from './components/ThoughtBubbles.jsx'
import NewsFeed from './pages/NewsFeed.jsx'
import Work from './pages/Work.jsx'
import IdeasLab from './pages/IdeasLab.jsx'
import Contact from './pages/Contact.jsx'

const CORAL = '#D47860'
const NAVY = '#060F1E'
const CREAM = '#F5F0E8'

/* ─── Liquid Mask SVG divider ─── */
function LiquidDivider() {
  return (
    <div style={{ position: 'relative', marginTop: -2, zIndex: 10, lineHeight: 0, overflow: 'hidden' }}>
      <svg viewBox="0 0 1440 120" preserveAspectRatio="none"
        style={{ display: 'block', width: '100%', height: 'clamp(60px, 8vw, 120px)' }}>
        <path
          d="M0,40 C160,100 320,0 480,50 C640,100 800,10 960,60 C1120,110 1280,20 1440,50 L1440,0 L0,0 Z"
          fill={NAVY} />
      </svg>
    </div>
  )
}
/* ─── Scroll indicator ─── */
function ScrollIndicator() {
  return (
    <div style={{
      position: 'absolute', bottom: 32, left: '50%', transform: 'translateX(-50%)',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8,
      opacity: 0.45, animation: 'scrollBounce 2.4s ease-in-out infinite',
    }}>
      <div style={{
        width: 20, height: 32, borderRadius: 12, border: `1.5px solid ${CREAM}`,
        display: 'flex', justifyContent: 'center', paddingTop: 6,
      }}>
        <div style={{
          width: 2, height: 8, borderRadius: 2, background: CREAM,
          animation: 'scrollDot 2.4s ease-in-out infinite',
        }} />
      </div>
      <div style={{
        fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase',
        color: CREAM, fontFamily: "'DM Sans',sans-serif",
      }}>scroll</div>
    </div>
  )
}
/* ─── Nav (appears on scroll, minimal) ─── */
function Nav({ currentSection }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const links = [
    { label: 'Home', href: '#home' },
    { label: 'News Feed', href: '#newsfeed' },
    { label: 'Work', href: '#work' },
    { label: 'Ideas Lab', href: '#ideas' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 600,
      padding: '16px 40px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      transition: 'all 0.5s cubic-bezier(.16,1,.3,1)',
      background: scrolled ? 'rgba(6,15,30,0.92)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
      transform: scrolled ? 'translateY(0)' : 'translateY(-100%)',
      opacity: scrolled ? 1 : 0,
      pointerEvents: scrolled ? 'auto' : 'none',
    }}>
      <a href="#home" style={{
        fontFamily: "'Cormorant Garamond',Georgia,serif",
        fontSize: '1.4rem', fontWeight: 400, fontStyle: 'italic',
        color: CORAL, textDecoration: 'none', letterSpacing: '0.02em',
      }}>AB</a>
      <div style={{ display: 'flex', gap: 28, alignItems: 'center' }}
        className="nav-links">
        {links.map(({ label, href }) => (
          <a key={label} href={href} style={{
            fontSize: 12, letterSpacing: '0.08em', textTransform: 'uppercase',
            color: 'rgba(245,240,232,0.55)', textDecoration: 'none',
            transition: 'color 0.25s', fontFamily: "'DM Sans',sans-serif",
            fontWeight: 400,
          }}
            onMouseEnter={e => (e.currentTarget.style.color = CORAL)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(245,240,232,0.55)')}
          >{label}</a>
        ))}
      </div>
    </nav>
  )
}
/* ─── HERO SECTION ─── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" style={{
      position: 'relative', width: '100%', minHeight: '100vh',
      background: NAVY, overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Subtle radial glow behind photo */}
      <div style={{
        position: 'absolute',
        top: '20%', left: '50%', transform: 'translateX(-50%)',
        width: '80vw', height: '80vw', maxWidth: 900, maxHeight: 900,
        background: `radial-gradient(ellipse, rgba(212,120,96,0.08) 0%, rgba(212,120,96,0.03) 40%, transparent 70%)`,
        pointerEvents: 'none',
      }} />
      {/* Main content container */}
      <div style={{
        flex: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '80px 24px 100px',
        position: 'relative', zIndex: 2,
      }}>

        {/* Subtitle above name */}
        <div style={{
          fontSize: 11, letterSpacing: '0.24em', textTransform: 'uppercase',
          color: 'rgba(245,240,232,0.4)', fontFamily: "'DM Sans',sans-serif",
          marginBottom: 20,
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(12px)',
          transition: 'all 0.8s cubic-bezier(.16,1,.3,1) 0.2s',
        }}>
          HBS MBA 2026 · Food · Health · Technology
        </div>

        {/* Name */}
        <h1 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          fontWeight: 300, fontStyle: 'italic',
          color: CORAL,
          lineHeight: 1.0, margin: 0, letterSpacing: '-0.02em',
          textAlign: 'center',          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.9s cubic-bezier(.16,1,.3,1) 0.35s',
        }}>
          Annabelle Body
        </h1>

        {/* Thin accent line */}
        <div style={{
          width: 48, height: 1, background: CORAL, margin: '24px auto 36px',
          opacity: loaded ? 0.6 : 0,
          transition: 'opacity 1s ease 0.6s',
        }} />

        {/* Photo */}
        <div style={{
          position: 'relative', marginBottom: 40,
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
          transition: 'all 1s cubic-bezier(.16,1,.3,1) 0.5s',
        }}>
          {/* Soft glow behind photo */}
          <div style={{
            position: 'absolute', top: '10%', left: '50%', transform: 'translateX(-50%)',
            width: '120%', height: '100%',
            background: `radial-gradient(ellipse, rgba(212,120,96,0.12) 0%, transparent 60%)`,
            pointerEvents: 'none', filter: 'blur(40px)',
          }} />          <img
            src="/images/photo-headshot.png"
            alt="Annabelle Body"
            style={{
              height: 'clamp(280px, 40vh, 420px)',
              width: 'auto',
              objectFit: 'contain',
              position: 'relative',
              filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.4))',
            }}
          />
        </div>

        {/* Typewriter question */}
        <div style={{
          opacity: loaded ? 1 : 0, transform: loaded ? 'translateY(0)' : 'translateY(16px)',
          transition: 'all 0.9s cubic-bezier(.16,1,.3,1) 0.7s',
          width: '100%', display: 'flex', justifyContent: 'center',
        }}>
          <HeroTicker
            questionText="How can we align financial incentives with human and planetary health as technology opens new possibilities?"
            loopTypewriter={true}
            overlayOpacity={0.4}
          />
        </div>
      </div>
      {/* Scroll indicator */}
      <ScrollIndicator />

      {/* Keyframes */}
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(8px); }
        }
        @keyframes scrollDot {
          0%, 100% { opacity: 1; transform: translateY(0); }
          50% { opacity: 0.3; transform: translateY(4px); }
        }
        @media (max-width: 768px) {
          .nav-links { display: none !important; }
        }
      `}</style>
    </section>
  )
}
/* ─── App ─── */
export default function App() {
  return (
    <div style={{
      background: NAVY, color: CREAM,
      fontFamily: "'DM Sans','Helvetica Neue',sans-serif",
      overflowX: 'hidden',
    }}>
      <Nav />
      <HeroSection />
      <LiquidDivider />

      {/* Existing sections */}
      <div id="thinking"><ThinkingSection /></div>
      <ThoughtBubbles />

      {/* Page sections */}
      <div id="newsfeed"><NewsFeed /></div>
      <div id="work">
        <ResumeSection />
        <Work />
      </div>
      <div id="ideas">
        <IdeasSection />
        <IdeasLab />
      </div>
      <div id="research"><PapersSection /></div>
      <div id="contact">
        <ContactSection />
        <Contact />
      </div>
      <Footer />
    </div>
  )
}