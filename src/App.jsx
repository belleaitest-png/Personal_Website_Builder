import { useState, useEffect } from 'react'
import Sections from './components/Sections'

const NAV = [
  { label: 'About', href: '#about' },
  { label: 'Research', href: '#research' },
  { label: 'Contact', href: '#contact' },
]

const NAVY        = '#191A1A'
const ORANGE      = '#E8534E'
const CREAM       = '#F5F0E8'
const WHITE       = '#FFFFFF'
const TERRACOTTA  = '#D84535'

export default function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight)
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
    borderBottom: scrolled ? `1px solid rgba(212,69,53,0.15)` : 'none',
    transition: 'all 0.3s ease',
  }

  const logoStyle = {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '26px',
    fontWeight: '600',
    color: TERRACOTTA,
    letterSpacing: '0.03em',
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
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '15px',
    fontWeight: '500',
    color: CREAM,
    textDecoration: 'none',
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    opacity: 0.85,
    transition: 'opacity 0.2s',
  }

  const subscribeBtnStyle = {
    position: 'fixed',
    bottom: '32px',
    right: '40px',
    zIndex: 100,
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: '13px',
    fontWeight: '600',
    color: WHITE,
    background: ORANGE,
    border: 'none',
    borderRadius: '4px',
    padding: '12px 24px',
    cursor: 'pointer',
    letterSpacing: '0.06em',
    textDecoration: 'none',
    textTransform: 'uppercase',
    boxShadow: '0 4px 20px rgba(232,83,78,0.35)',
    transition: 'opacity 0.2s, transform 0.2s',
  }

  return (
    <div style={{ background: NAVY, minHeight: '100vh', fontFamily: "'Cormorant Garamond', serif" }}>
      {/* Google Fonts */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap" rel="stylesheet" />

      {/* Nav — logo left, links right */}
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
      </nav>

      {/* Fixed Subscribe CTA — bottom right */}
      <a
        href="https://annabellebody.substack.com"
        target="_blank"
        rel="noreferrer"
        style={subscribeBtnStyle}
        onMouseEnter={e => { e.target.style.opacity = 0.85; e.target.style.transform = 'translateY(-2px)' }}
        onMouseLeave={e => { e.target.style.opacity = 1; e.target.style.transform = 'translateY(0)' }}
      >
        Substack
      </a>

      {/* All Sections */}
      <Sections />
    </div>
  )
}
