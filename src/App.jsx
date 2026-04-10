import { useState, useEffect } from 'react'
import Sections from './components/Sections'
import HeroTicker from './components/HeroTicker'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Verifood', href: '#verifood' },
  { label: 'Writing', href: '#writing' },
  { label: 'Contact', href: '#contact' },
]

const NAVY   = '#060F1E'
const ORANGE = '#F4622A'
const CREAM  = '#F5F0E8'
const WHITE  = '#FFFFFF'
const SLATE  = '#334155'

export default function App() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const navStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 48px',
    height: '68px',
    background: scrolled ? `${NAVY}f2` : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    borderBottom: scrolled ? `1px solid rgba(244,98,42,0.15)` : 'none',
    transition: 'all 0.3s ease',
  }

  const logoStyle = {
    fontFamily: "'Playfair Display', serif",
    fontSize: '20px',
    fontWeight: '700',
    color: WHITE,
    letterSpacing: '0.02em',
    textDecoration: 'none',
  }

  const navLinksStyle = {
    display: 'flex',
    gap: '36px',
    listStyle: 'none',
    margin: 0,
    padding: 0,
  }

  const navLinkStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    fontWeight: '500',
    color: CREAM,
    textDecoration: 'none',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    opacity: 0.85,
    transition: 'opacity 0.2s',
  }

  const ctaBtnStyle = {
    fontFamily: "'Inter', sans-serif",
    fontSize: '13px',
    fontWeight: '600',
    color: WHITE,
    background: ORANGE,
    border: 'none',
    borderRadius: '4px',
    padding: '10px 22px',
    cursor: 'pointer',
    letterSpacing: '0.05em',
    textDecoration: 'none',
    transition: 'opacity 0.2s',
  }

  return (
    <div style={{ background: NAVY, minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=Inter:wght@300;400;500;600&display=swap" rel="stylesheet" />

      {/* Nav */}
      <nav style={navStyle}>
        <a href="#" style={logoStyle}>Annabelle Body</a>
        <ul style={navLinksStyle}>
          {NAV.map(n => (
            <li key={n.href}>
              <a
                href={n.href}
                style={navLinkStyle}
                onMouseEnter={e => e.target.style.opacity = 1}
                onMouseLeave={e => e.target.style.opacity = 0.85}
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
        <a href="#contact" style={ctaBtnStyle}>Get in Touch</a>
      </nav>

      {/* Ticker */}
      <HeroTicker />

      {/* All Sections */}
      <Sections />
    </div>
  )
}
