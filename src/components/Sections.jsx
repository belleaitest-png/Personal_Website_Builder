import { useState, useEffect } from 'react'
import HeroTicker from './HeroTicker'
import BalanceSheet from './BalanceSheet'
import ScrollSections from './ScrollSections'
import DownloadGate from './DownloadGate'

// ─── Palette ────────────────────────────────────────────────────────────────
const NAVY        = '#191A1A'
const NAVY_LIGHT  = '#222526'
const SLATE       = '#334155'
const CREAM       = '#F5F0E8'
const WHITE       = '#FFFFFF'
const ORANGE      = '#E8534E'

// ─── Shared styles ──────────────────────────────────────────────────────────
const serif = "'Cormorant Garamond', serif"
const sans  = "'Cormorant Garamond', serif"

const tag = {
  display: 'inline-block',
  fontFamily: sans,
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: ORANGE,
  marginBottom: '16px',
}

const sectionLabel = (text) => <p style={tag}>{text}</p>

const h2 = {
  fontFamily: serif,
  fontSize: 'clamp(32px, 5vw, 52px)',
  fontWeight: '700',
  color: WHITE,
  margin: '0 0 20px',
  lineHeight: 1.15,
}

const bodyText = {
  fontFamily: sans,
  fontSize: '17px',
  lineHeight: 1.75,
  color: CREAM,
  opacity: 0.85,
  margin: '0 0 28px',
}

const orangeBtn = {
  display: 'inline-block',
  fontFamily: sans,
  fontSize: '14px',
  fontWeight: '600',
  color: WHITE,
  background: ORANGE,
  border: 'none',
  borderRadius: '4px',
  padding: '14px 28px',
  cursor: 'pointer',
  letterSpacing: '0.05em',
  textDecoration: 'none',
  transition: 'opacity 0.2s',
}

const divider = {
  width: '48px',
  height: '3px',
  background: ORANGE,
  margin: '0 0 32px',
  borderRadius: '2px',
}

// ─── Hero (sticky -content scrolls up over it) ─────────────────────────────
const heroCSS = `
@keyframes peekBounce {
  0%, 100% { transform: translateY(0); }
  40% { transform: translateY(-22px); }
  60% { transform: translateY(-6px); }
}
@keyframes peekFade {
  0%, 70% { opacity: 1; }
  85% { opacity: 0.5; }
  100% { opacity: 1; }
}
`

function Hero() {
  useEffect(() => {
    const id = 'hero-peek-css'
    if (!document.getElementById(id)) {
      const style = document.createElement('style')
      style.id = id
      style.textContent = heroCSS
      document.head.appendChild(style)
    }
  }, [])

  return (
    <section style={{
      position: 'sticky',
      top: 0,
      height: '100vh',
      overflow: 'hidden',
      background: NAVY,
      zIndex: 1,
    }}>
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: "url('/photos/hero.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }} />
      <div style={{
        position: 'absolute', top: '50%', left: 0, width: '38%',
        transform: 'translateY(-50%)', zIndex: 10,
      }}>
        <HeroTicker overlayOpacity={0.6} align="left" />
      </div>

      {/* Scroll hint -balance sheet peeking up */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        animation: 'peekBounce 2.8s ease-in-out infinite, peekFade 2.8s ease-in-out infinite',
      }}>
        <span style={{
          fontFamily: serif,
          fontSize: '10px',
          fontWeight: '600',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: ORANGE,
          opacity: 0.85,
          marginBottom: '10px',
        }}>
          Balance Sheet
        </span>
        <div style={{
          width: '100%',
          height: '6px',
          background: `linear-gradient(90deg, transparent, rgba(232,83,78,0.3) 20%, rgba(232,83,78,0.5) 50%, rgba(232,83,78,0.3) 80%, transparent)`,
          borderTop: '1px solid rgba(232,83,78,0.25)',
        }} />
      </div>
    </section>
  )
}

// ─── About overlay (accessed via menu only) ─────────────────────────────────
const ACTIVITIES = [
  { label: 'CrossFit', icon: '🏋️' },
  { label: 'Hyrox', icon: '🏃‍♀️' },
  { label: 'Sailing', icon: '⛵' },
  { label: 'Hiking', icon: '🥾' },
  { label: 'Travel', icon: '✈️' },
]

const PHOTO_SLOTS = [
  { label: 'CrossFit', placeholder: 'Add CrossFit photo', src: '' },
  { label: 'Hyrox', placeholder: 'Add Hyrox photo', src: '' },
  { label: 'Sailing', placeholder: 'Add Sailing photo', src: '' },
  { label: 'Hiking', placeholder: 'Add Hiking photo', src: '' },
]

function AboutOverlay({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 200,
        background: 'rgba(0,0,0,0.6)',
        backdropFilter: 'blur(10px)',
        overflowY: 'auto',
      }}
      onClick={onClose}
    >
      <div
        style={{
          maxWidth: '900px', margin: '80px auto',
          background: NAVY_LIGHT, borderRadius: '16px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '64px 56px',
          position: 'relative',
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute', top: '24px', right: '24px',
            background: 'none', border: 'none', color: CREAM,
            fontSize: '24px', cursor: 'pointer', opacity: 0.5,
            fontFamily: sans,
          }}
        >
          ✕
        </button>

        {/* Top: headshot + bio */}
        <div style={{
          display: 'grid', gridTemplateColumns: '260px 1fr',
          gap: '48px', alignItems: 'start', marginBottom: '48px',
        }}>
          <div style={{
            aspectRatio: '3/4', borderRadius: '8px', overflow: 'hidden',
            border: '1px solid rgba(255,255,255,0.08)',
          }}>
            <img
              src="/photos/headshot.png"
              alt="Annabelle Body"
              style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
            />
          </div>

          <div>
            {sectionLabel('About')}
            <h2 style={{ ...h2, margin: '0 0 20px' }}>Annabelle Body</h2>
            <p style={bodyText}>
              HBS MBA candidate. Former Deloitte chartered accountant. Founder of Verifood. Building at the intersection of food systems, fertility, and applied AI.
            </p>
            <p style={bodyText}>
              Before business school, I spent years in audit and advisory -learning how to read systems, find what doesn't add up, and build the case for change. Now I apply that same rigour to the food we eat and the health outcomes it produces.
            </p>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', marginBottom: '24px' }}>
              {ACTIVITIES.map(a => (
                <span key={a.label} style={{
                  fontFamily: sans, fontSize: '13px', color: CREAM,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '20px', padding: '8px 16px',
                  display: 'flex', alignItems: 'center', gap: '6px',
                }}>
                  <span style={{ fontSize: '14px' }}>{a.icon}</span>
                  {a.label}
                </span>
              ))}
            </div>

            <DownloadGate href="/documents/resume/annabelle-body.pdf" style={orangeBtn}>
              Download Resume
            </DownloadGate>
          </div>
        </div>

        {/* Photo grid */}
        <div style={{
          display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px',
        }}>
          {PHOTO_SLOTS.map(slot => (
            <div key={slot.label} style={{
              aspectRatio: '1', borderRadius: '8px', overflow: 'hidden',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.06)',
              display: 'flex', justifyContent: 'center', alignItems: 'center',
            }}>
              {slot.src ? (
                <img src={slot.src} alt={slot.label} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              ) : (
                <div style={{ textAlign: 'center', padding: '20px' }}>
                  <p style={{ fontFamily: sans, fontSize: '14px', color: CREAM, opacity: 0.25, margin: '0 0 4px' }}>{slot.label}</p>
                  <p style={{ fontFamily: sans, fontSize: '11px', color: CREAM, opacity: 0.15, margin: 0 }}>{slot.placeholder}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Research ────────────────────────────────────────────────────────────────
const PAPERS = [
  {
    title: 'Declining Birth Rates and the Food Systems Connection',
    venue: 'Harvard Business School',
    date: '2025',
    desc: 'Examining how ultra-processed food environments correlate with declining fertility rates across OECD nations, and the policy interventions most likely to reverse the trend.',
    href: '/documents/papers/birth-rates.pdf',
    keywords: ['Fertility', 'Food Systems', 'Public Health'],
  },
  {
    title: 'The Food System Thesis: Inputs, Incentives, and Outcomes',
    venue: 'Harvard Business School',
    date: '2025',
    desc: 'A systems-level analysis of how agricultural subsidies, processing incentives, and retail dynamics shape the nutritional quality of the modern food supply.',
    href: '/documents/papers/food-system-thesis.pdf',
    keywords: ['Agriculture', 'Incentives', 'Nutrition'],
  },
  {
    title: 'The Loneliness Crisis and Its Metabolic Shadow',
    venue: 'Harvard Business School',
    date: '2025',
    desc: 'Investigating the bidirectional relationship between social isolation and metabolic health -and why loneliness may be the most under-diagnosed dietary risk factor.',
    href: '/documents/papers/loneliness-crisis.pdf',
    keywords: ['Loneliness', 'Metabolic Health', 'Public Health'],
  },
]

function Research() {
  return (
    <section id="research" style={{
      position: 'relative', zIndex: 2,
      background: NAVY, padding: '120px 48px',
    }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {sectionLabel('Research')}
        <div style={divider} />
        <div style={{
          display: 'flex', justifyContent: 'space-between',
          alignItems: 'flex-end', marginBottom: '48px',
          flexWrap: 'wrap', gap: '24px',
        }}>
          <h2 style={{ ...h2, margin: 0, maxWidth: '600px' }}>Papers & Academic Work</h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {PAPERS.map((p, i) => (
            <div
              key={i}
              style={{
                padding: '36px 44px',
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.06)',
                borderRadius: '6px',
                transition: 'border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.background = 'rgba(232,83,78,0.04)' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
            >
              <div style={{
                display: 'flex', justifyContent: 'space-between',
                alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap',
              }}>
                <div style={{ flex: 1 }}>
                  <p style={{
                    fontFamily: sans, fontSize: '12px', color: ORANGE,
                    fontWeight: '600', letterSpacing: '0.1em', marginBottom: '12px',
                  }}>
                    {p.venue} · {p.date}
                  </p>
                  <h3 style={{
                    fontFamily: serif, fontSize: '22px', color: WHITE,
                    margin: '0 0 12px', lineHeight: 1.3,
                  }}>
                    {p.title}
                  </h3>
                  <p style={{
                    fontFamily: sans, fontSize: '15px', color: CREAM,
                    opacity: 0.7, lineHeight: 1.7, margin: '0 0 20px',
                  }}>
                    {p.desc}
                  </p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {p.keywords.map(k => (
                      <span key={k} style={{
                        fontFamily: sans, fontSize: '11px', color: CREAM,
                        opacity: 0.5, border: '1px solid rgba(245,240,232,0.2)',
                        borderRadius: '2px', padding: '4px 10px',
                        letterSpacing: '0.06em',
                      }}>{k}</span>
                    ))}
                  </div>
                </div>
                <DownloadGate
                  href={p.href}
                  style={{
                    fontFamily: sans, fontSize: '13px', color: ORANGE,
                    fontWeight: '600', whiteSpace: 'nowrap', textDecoration: 'none',
                  }}
                >
                  Read Paper →
                </DownloadGate>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Newsletter (Substack) ──────────────────────────────────────────────────
function Newsletter() {
  return (
    <section id="newsletter" style={{
      position: 'relative', zIndex: 2,
      background: NAVY_LIGHT, padding: '120px 48px', textAlign: 'center',
    }}>
      <div style={{ maxWidth: '560px', margin: '0 auto' }}>
        {sectionLabel('Newsletter')}
        <h2 style={{ ...h2, margin: '0 0 20px' }}>Subscribe on Substack</h2>
        <p style={{ ...bodyText, margin: '0 0 36px', opacity: 0.7 }}>
          Thinking clearly about food, fertility, and the systems that shape us. Occasional dispatches on research, ideas, and what I'm building.
        </p>
        <a
          href="https://annabellebody.substack.com"
          target="_blank" rel="noreferrer"
          style={{ ...orangeBtn, padding: '16px 40px', fontSize: '16px' }}
        >
          Subscribe on Substack →
        </a>
      </div>
    </section>
  )
}

// ─── Contact (simplified) ───────────────────────────────────────────────────
function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const inputStyle = {
    width: '100%', padding: '14px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '4px', color: WHITE,
    fontFamily: sans, fontSize: '15px',
    boxSizing: 'border-box', outline: 'none',
  }
  const labelStyle = {
    fontFamily: sans, fontSize: '12px', color: CREAM,
    opacity: 0.6, letterSpacing: '0.08em',
    textTransform: 'uppercase', display: 'block', marginBottom: '8px',
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const form = e.target
    const name = form.elements.name.value.trim()
    const email = form.elements.email.value.trim()
    const message = form.elements.message.value.trim()

    if (!name || !email || !message) return

    setStatus('sending')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      })
      if (res.ok) {
        setStatus('sent')
        form.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" style={{
      position: 'relative', zIndex: 2,
      background: NAVY, padding: '120px 48px',
    }}>
      <div style={{ maxWidth: '520px', margin: '0 auto' }}>
        {sectionLabel('Contact')}
        <div style={divider} />
        <h2 style={{ ...h2, margin: '0 0 40px' }}>Get in touch.</h2>
        {status === 'sent' ? (
          <div style={{
            padding: '40px', background: 'rgba(0,200,150,0.06)',
            border: '1px solid rgba(0,200,150,0.2)', borderRadius: '8px',
            textAlign: 'center',
          }}>
            <p style={{ fontFamily: serif, fontSize: '20px', color: WHITE, margin: '0 0 8px' }}>
              Message sent.
            </p>
            <p style={{ fontFamily: serif, fontSize: '15px', color: CREAM, opacity: 0.6, margin: 0 }}>
              I read everything personally and will be in touch soon.
            </p>
          </div>
        ) : (
          <form
            style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
            onSubmit={handleSubmit}
          >
            <div><label style={labelStyle}>Name</label><input name="name" type="text" placeholder="Your name" required style={inputStyle} /></div>
            <div><label style={labelStyle}>Email</label><input name="email" type="email" placeholder="your@email.com" required style={inputStyle} /></div>
            <div><label style={labelStyle}>Message</label><textarea name="message" rows={5} placeholder="What's on your mind?" required style={{ ...inputStyle, resize: 'vertical' }} /></div>
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                ...orangeBtn, border: 'none', marginTop: '8px',
                opacity: status === 'sending' ? 0.6 : 1,
                cursor: status === 'sending' ? 'wait' : 'pointer',
              }}
            >
              {status === 'sending' ? 'Sending...' : 'Send Message'}
            </button>
            {status === 'error' && (
              <p style={{ fontFamily: serif, fontSize: '14px', color: '#E8534E', margin: 0 }}>
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        )}
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{
      position: 'relative', zIndex: 2,
      background: '#101212', padding: '48px',
      borderTop: '1px solid rgba(255,255,255,0.06)',
    }}>
      <div style={{
        maxWidth: '1100px', margin: '0 auto',
        display: 'flex', justifyContent: 'space-between',
        alignItems: 'center', flexWrap: 'wrap', gap: '24px',
      }}>
        <p style={{ fontFamily: serif, fontSize: '18px', color: WHITE, margin: 0, fontWeight: '600' }}>Annabelle Body</p>
        <p style={{ fontFamily: sans, fontSize: '13px', color: CREAM, opacity: 0.35, margin: 0 }}>
          © {new Date().getFullYear()} Annabelle Body · HBS MBA · Founder, Verifood
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['LinkedIn', 'Instagram', 'Substack'].map(s => (
            <a key={s}
              href={s === 'Substack' ? 'https://annabellebody.substack.com' : '#'}
              target={s === 'Substack' ? '_blank' : undefined}
              rel={s === 'Substack' ? 'noreferrer' : undefined}
              style={{ fontFamily: sans, fontSize: '13px', color: CREAM, opacity: 0.45, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.45}
            >{s}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Sections() {
  const [aboutOpen, setAboutOpen] = useState(false)

  // Listen for hash changes and clicks on #about links
  useEffect(() => {
    function checkHash() {
      if (window.location.hash === '#about') {
        setAboutOpen(true)
      }
    }
    function handleClick(e) {
      const link = e.target.closest('a[href="#about"]')
      if (link) {
        e.preventDefault()
        setAboutOpen(true)
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

  function closeAbout() {
    setAboutOpen(false)
    if (window.location.hash === '#about') {
      history.pushState(null, '', window.location.pathname)
    }
  }

  return (
    <>
      <Hero />
      {/* Balance sheet sticks, then scroll panels slide in over it */}
      <div style={{ position: 'relative', zIndex: 2 }}>
        <BalanceSheet />
        <ScrollSections />
      </div>
      <Research />
      <Newsletter />
      <Contact />
      <Footer />
      <AboutOverlay open={aboutOpen} onClose={closeAbout} />
    </>
  )
}
