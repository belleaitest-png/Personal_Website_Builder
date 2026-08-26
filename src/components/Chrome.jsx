import { useState, useEffect } from 'react'
import { c, f, EASE, maxw, label } from '../theme'
import { usePrefersReducedMotion } from '../useReveal'

// Belle's three pillars, used as the whole navigation.
const NAV = [
  { t: 'Build',   href: '#build' },
  { t: 'Think',   href: '#think' },
  { t: 'Connect', href: '#connect' },
]

// A single hairline that fills as you read. The only persistent motion
// on the page, and it reports something true.
export function ScrollRail() {
  const [p, setP] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight
      setP(h > 0 ? Math.min(1, Math.max(0, window.scrollY / h)) : 0)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div aria-hidden="true" style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: '2px',
      background: 'transparent', zIndex: 300, pointerEvents: 'none',
    }}>
      <div style={{
        height: '100%', width: `${p * 100}%`,
        background: c.lime, transition: 'width 90ms linear',
      }} />
    </div>
  )
}

export function Nav() {
  const [solid, setSolid] = useState(false)
  const [open, setOpen] = useState(false)
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const onScroll = () => setSolid(window.scrollY > 80)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 200,
      background: solid ? 'rgba(244,241,233,0.86)' : 'transparent',
      backdropFilter: solid ? 'saturate(1.4) blur(14px)' : 'none',
      borderBottom: solid ? `1px solid ${c.rule}` : '1px solid transparent',
      transition: reduced ? 'none' : `background 0.4s ${EASE}, border-color 0.4s ${EASE}`,
    }}>
      <div style={{
        maxWidth: maxw, margin: '0 auto', padding: '0 32px', height: '68px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '20px',
      }}>
        <a href="#top" style={{
          fontFamily: f.display, fontSize: '23px', letterSpacing: '-0.015em',
          color: c.ink, textDecoration: 'none', whiteSpace: 'nowrap',
        }}>
          Annabelle Body
        </a>

        <ul style={{ listStyle: 'none', display: 'flex', gap: '26px', margin: 0, padding: 0 }} className="ab-nav-list">
          {NAV.map(n => (
            <li key={n.href}>
              <a href={n.href} style={{
                ...label, fontSize: '10.5px', color: c.inkSoft,
                textDecoration: 'none', transition: `color 0.3s ${EASE}`,
                paddingBottom: '3px', borderBottom: '1px solid transparent',
              }}
                onMouseEnter={e => { e.currentTarget.style.color = c.ink; e.currentTarget.style.borderBottomColor = c.lime }}
                onMouseLeave={e => { e.currentTarget.style.color = c.inkSoft; e.currentTarget.style.borderBottomColor = 'transparent' }}
              >
                {n.t}
              </a>
            </li>
          ))}
        </ul>

        <button
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen(o => !o)}
          className="ab-nav-toggle"
          style={{
            display: 'none', background: 'none', border: `1px solid ${c.rule}`,
            borderRadius: '2px', padding: '9px 13px', cursor: 'pointer',
            ...label, fontSize: '10px', color: c.ink,
          }}
        >
          {open ? 'Close' : 'Menu'}
        </button>
      </div>

      {open && (
        <ul className="ab-nav-drawer" style={{
          listStyle: 'none', margin: 0, padding: '8px 32px 24px',
          background: c.paper, borderTop: `1px solid ${c.rule}`,
        }}>
          {NAV.map(n => (
            <li key={n.href}>
              <a href={n.href} onClick={() => setOpen(false)} style={{
                ...label, fontSize: '11px', color: c.ink, textDecoration: 'none',
                display: 'block', padding: '15px 0', borderBottom: `1px solid ${c.ruleSoft}`,
              }}>
                {n.t}
              </a>
            </li>
          ))}
        </ul>
      )}
    </nav>
  )
}

export function Footer() {
  const links = [
    { t: 'LinkedIn',  href: 'https://www.linkedin.com/in/annabelle-body/' },
    { t: 'Substack',  href: 'https://annabellebody.substack.com' },
    { t: 'Instagram', href: 'https://instagram.com/iambeangirl' },
  ]

  return (
    <footer style={{ background: c.ink, color: c.paper, padding: '64px 32px 56px' }}>
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>
        <p style={{
          fontFamily: f.display, fontWeight: 400,
          fontSize: 'clamp(28px, 3.4vw, 44px)', lineHeight: 1.15,
          letterSpacing: '-0.02em', color: c.paper, margin: '0 0 44px', maxWidth: '26ch',
        }}>
          In operator mode: learning fast, building in public, and exploring how
          {' '}<span style={{ color: c.lime, fontStyle: 'italic' }}>AI, biology and new infrastructure</span>
          {' '}will reshape human life.
        </p>

        <div style={{
          display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end',
          gap: '28px', flexWrap: 'wrap',
          borderTop: '1px solid rgba(244,241,233,0.16)', paddingTop: '28px',
        }}>
          <p style={{ ...label, color: 'rgba(244,241,233,0.45)', margin: 0, lineHeight: 1.9 }}>
            Annabelle Body
            <br />
            Applied AI Builder &amp; Operator
            <br />
            <span style={{ color: 'rgba(244,241,233,0.3)' }}>© {new Date().getFullYear()}</span>
          </p>

          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            {links.map(l => (
              <a key={l.t} href={l.href} target="_blank" rel="noreferrer" style={{
                ...label, fontSize: '10.5px', color: 'rgba(244,241,233,0.6)',
                textDecoration: 'none', transition: `color 0.3s ${EASE}`,
              }}
                onMouseEnter={e => e.currentTarget.style.color = c.lime}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(244,241,233,0.6)'}
              >
                {l.t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
