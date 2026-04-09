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
/* ─── Scroll indicator (diamond star, bottom-right like Framer) ─── */
function ScrollIndicator() {
  return (
    <div style={{
      position: 'absolute', bottom: 32, right: 40,
      opacity: 0.5, animation: 'scrollBounce 2.4s ease-in-out infinite',
      cursor: 'pointer',
    }}
      onClick={() => window.scrollBy({ top: window.innerHeight, behavior: 'smooth' })}
    >
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
        <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z"
          fill={CREAM} />
      </svg>
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
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
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
        {links.map(({ label, href }) => (          <a key={label} href={href} style={{
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

/* ─── HERO SECTION (Full-bleed photo background like Framer) ─── */
function HeroSection() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section id="home" style={{
      position: 'relative', width: '100%', height: '100vh',
      overflow: 'hidden',
    }}>      {/* Full-bleed background photo */}
      <img
        src="/images/photo-headshot.png"
        alt="Annabelle Body"
        style={{
          position: 'absolute', top: 0, left: 0,
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'center 20%',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1.2s ease',
        }}
      />

      {/* Dark gradient overlay for text readability */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `linear-gradient(
          to bottom,
          rgba(6,15,30,0.25) 0%,
          rgba(6,15,30,0.15) 30%,
          rgba(6,15,30,0.3) 50%,
          rgba(6,15,30,0.5) 80%,
          rgba(6,15,30,0.7) 100%
        )`,
        pointerEvents: 'none',
      }} />
      {/* Logo text — top-left corner, small italic */}
      <div style={{
        position: 'absolute', top: 28, left: 32, zIndex: 10,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.8s ease 0.3s',
      }}>
        <h1 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 'clamp(1.2rem, 1.8vw, 1.5rem)',
          fontWeight: 400, fontStyle: 'italic',
          color: CORAL, margin: 0,
          letterSpacing: '0.02em',
        }}>
          Annabelle Body
        </h1>
      </div>

      {/* Typewriter tagline — centered in lower-center area */}
      <div style={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '90%', maxWidth: 860,
        zIndex: 10,
        opacity: loaded ? 1 : 0,
        transition: 'opacity 0.9s ease 0.6s',
      }}>
        <HeroTicker          questionText="What if the most radical health intervention isn't a drug or a diet — it's changing who profits from your health?"
          loopTypewriter={true}
          overlayOpacity={0.45}
        />
      </div>

      {/* Scroll indicator — diamond star, bottom-right */}
      <ScrollIndicator />

      {/* Keyframes */}
      <style>{`
        @keyframes scrollBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(8px); }
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
    }}>      <Nav />
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