import { useState, useEffect } from 'react'
import { c, f, EASE, label } from '../theme'
import DownloadGate from './DownloadGate'
import BalanceSheet from './BalanceSheet'

const ACTIVITIES = [
  { label: 'CrossFit', icon: '🏋️' },
  { label: 'Hyrox',    icon: '🏃‍♀️' },
  { label: 'Sailing',  icon: '⛵' },
  { label: 'Hiking',   icon: '🥾' },
  { label: 'Travel',   icon: '✈️' },
]

// The #about hash and the click interception, ported from the original
// Sections.jsx so the single-page structure is preserved.
export function useAboutOverlay() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const checkHash = () => { if (window.location.hash === '#about') setOpen(true) }
    const handleClick = e => {
      const link = e.target.closest('a[href="#about"]')
      if (link) {
        e.preventDefault()
        setOpen(true)
        history.pushState(null, '', '#about')
      }
    }
    checkHash()
    window.addEventListener('hashchange', checkHash)
    window.addEventListener('click', handleClick)
    return () => {
      window.removeEventListener('hashchange', checkHash)
      window.removeEventListener('click', handleClick)
    }
  }, [])

  const close = () => {
    setOpen(false)
    if (window.location.hash === '#about') {
      history.pushState(null, '', window.location.pathname)
    }
  }

  return [open, close]
}

export default function AboutOverlay({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    document.body.style.overflow = 'hidden'
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="About Annabelle Body"
      onClick={onClose}
      style={{
        position: 'fixed', inset: 0, zIndex: 400,
        background: 'rgba(0,0,0,0.66)',
        backdropFilter: 'blur(10px)',
        overflowY: 'auto',
        padding: '0 20px',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          maxWidth: '1180px', margin: '72px auto',
          background: c.navyLight,
          borderRadius: '14px',
          border: `1px solid ${c.rule}`,
          padding: 'clamp(36px, 5vw, 62px) clamp(24px, 4vw, 54px)',
          position: 'relative',
        }}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          style={{
            position: 'absolute', top: '20px', right: '22px',
            background: 'none', border: 'none', color: c.cream,
            fontSize: '26px', lineHeight: 1, cursor: 'pointer',
            opacity: 0.45, fontFamily: f.text, padding: '6px',
            transition: `opacity 0.25s ${EASE}`,
          }}
          onMouseEnter={e => e.currentTarget.style.opacity = 1}
          onMouseLeave={e => e.currentTarget.style.opacity = 0.45}
        >
          ✕
        </button>

        {/* Portrait and bio */}
        <div className="ab-about-top" style={{
          display: 'grid', gridTemplateColumns: '250px 1fr',
          gap: '48px', alignItems: 'start',
        }}>
          <div style={{
            aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden',
            border: `1px solid ${c.rule}`, lineHeight: 0,
          }}>
            <picture>
              <source srcSet="/photos/headshot.webp" type="image/webp" />
              <img
                src="/photos/headshot.png"
                alt="Annabelle Body"
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
              />
            </picture>
          </div>

          <div>
            <p style={{ ...label, color: c.orange, margin: '0 0 16px' }}>About</p>
            <h2 style={{
              fontFamily: f.display, fontSize: 'clamp(32px, 4vw, 46px)',
              fontWeight: 700, color: c.white, margin: '0 0 22px', lineHeight: 1.12,
            }}>
              Annabelle Body
            </h2>

            <p style={{ fontFamily: f.text, fontSize: '18px', lineHeight: 1.75, color: c.creamSoft, margin: '0 0 20px' }}>
              I&rsquo;m a scientist turned accountant and restructuring operator, now
              building at the frontier of applied AI. I turn new model capability into
              practical systems for ambitious people and businesses.
            </p>
            <p style={{ fontFamily: f.text, fontSize: '18px', lineHeight: 1.75, color: c.creamSoft, margin: '0 0 20px' }}>
              Biology taught me to ask what is actually happening rather than what the
              summary says is happening. Accounting and restructuring taught me what a real
              constraint is, and how decisions get made when the information is incomplete.
              Both turn out to be most of the job when you are deciding what is worth
              building.
            </p>
            <p style={{ fontFamily: f.text, fontSize: '18px', lineHeight: 1.75, color: c.creamSoft, margin: '0 0 28px' }}>
              Outside the work: CrossFit, Hyrox, sailing, and a standing interest in how far
              a person can push their own systems before something informative breaks.
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '28px' }}>
              {ACTIVITIES.map(a => (
                <span key={a.label} style={{
                  fontFamily: f.text, fontSize: '15px', color: c.cream,
                  background: 'rgba(255,255,255,0.04)',
                  border: `1px solid ${c.rule}`,
                  borderRadius: '20px', padding: '7px 15px',
                  display: 'flex', alignItems: 'center', gap: '7px',
                }}>
                  <span style={{ fontSize: '14px' }}>{a.icon}</span>
                  {a.label}
                </span>
              ))}
            </div>

            <DownloadGate
              href="/documents/resume/Annabelle Body, HBS Class of 2026.pdf"
              label="Annabelle Body - CV"
              style={{
                display: 'inline-block',
                fontFamily: f.mono, fontSize: '12px', fontWeight: 600,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                color: c.white, background: c.orange,
                border: 'none', borderRadius: '3px',
                padding: '14px 26px', textDecoration: 'none', cursor: 'pointer',
              }}
            >
              Download CV
            </DownloadGate>
          </div>
        </div>

        {/* The balance sheet, kept for the people who dig. */}
        <div style={{ marginTop: 'clamp(48px, 6vw, 76px)', borderTop: `1px solid ${c.rule}`, paddingTop: '10px' }}>
          <BalanceSheet embedded />
        </div>
      </div>
    </div>
  )
}
