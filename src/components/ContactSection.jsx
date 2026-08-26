import { useState } from 'react'
import { c, f, EASE, maxw, label } from '../theme'
import { useReveal, rise } from '../useReveal'

const OPEN_TO = [
  'Applied AI and deployment roles',
  'Strategic operating roles at frontier labs and high-growth teams',
  'Collaborators and co-founders on hard real-world problems',
  'Intelligent disagreement with anything I have written',
]

export default function ContactSection() {
  const [ref, on, reduced] = useReveal(0.1)
  const [status, setStatus] = useState('idle')

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
      if (res.ok) { setStatus('sent'); form.reset() } else { setStatus('error') }
    } catch { setStatus('error') }
  }

  const field = {
    width: '100%',
    padding: '15px 16px',
    background: 'rgba(255,255,255,0.04)',
    border: `1px solid ${c.rule}`,
    borderRadius: '2px',
    color: c.white,
    fontFamily: f.text,
    fontSize: '16px',
    outline: 'none',
    transition: `border-color 0.3s ${EASE}`,
  }

  return (
    <section id="connect" ref={ref} style={{ background: c.navy, padding: 'clamp(90px, 12vh, 140px) 32px' }}>
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>

        <p style={{ ...label, color: c.white, margin: 0, ...rise(on, 0, reduced) }}>Contact</p>

        <h2 style={{
          fontFamily: f.display, fontWeight: 400,
          fontSize: 'clamp(38px, 5.2vw, 68px)', lineHeight: 1.06,
          letterSpacing: '-0.02em', color: c.white, margin: '24px 0 0', maxWidth: '18ch',
          ...rise(on, 70, reduced),
        }}>
          An open invitation to ambitious builders, operators and collaborators.
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
          gap: '56px', margin: '54px 0 0', alignItems: 'start',
        }}>

          <div style={rise(on, 140, reduced)}>
            <p style={{ ...label, color: c.whiteFaint, margin: '0 0 20px' }}>Open to</p>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {OPEN_TO.map(t => (
                <li key={t} style={{
                  display: 'flex', gap: '14px', alignItems: 'baseline',
                  padding: '13px 0', borderBottom: `1px solid ${c.ruleSoft}`,
                }}>
                  <span aria-hidden="true" style={{
                    width: '7px', height: '7px', background: c.orange,
                    flexShrink: 0, borderRadius: '1px', transform: 'translateY(-1px)',
                  }} />
                  <span style={{ fontFamily: f.text, fontSize: '16px', lineHeight: 1.6, color: c.whiteSoft }}>{t}</span>
                </li>
              ))}
            </ul>
            <p style={{ fontFamily: f.text, fontSize: '16px', lineHeight: 1.65, color: c.whiteFaint, margin: '22px 0 0' }}>
              If you are building something hard, I would like to hear about it.
              I read everything myself and reply to what I can.
            </p>
          </div>

          <div style={rise(on, 210, reduced)}>
            {status === 'sent' ? (
              <div style={{ border: `1px solid ${c.cream}`, borderRadius: '3px', padding: '38px 32px', background: c.orange }}>
                <p style={{ fontFamily: f.display, fontSize: '30px', color: c.white, margin: '0 0 8px', letterSpacing: '0.01em' }}>
                  Message sent.
                </p>
                <p style={{ fontFamily: f.text, fontSize: '16px', color: c.creamSoft, margin: 0 }}>
                  Thank you. I will come back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <Labelled t="Name"><input name="name" type="text" required style={field}
                  onFocus={e => e.target.style.borderColor = c.cream}
                  onBlur={e => e.target.style.borderColor = c.rule} /></Labelled>
                <Labelled t="Email"><input name="email" type="email" required style={field}
                  onFocus={e => e.target.style.borderColor = c.cream}
                  onBlur={e => e.target.style.borderColor = c.rule} /></Labelled>
                <Labelled t="Message"><textarea name="message" rows={5} required style={{ ...field, resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = c.cream}
                  onBlur={e => e.target.style.borderColor = c.rule} /></Labelled>

                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    marginTop: '6px',
                    fontFamily: f.mono, fontSize: '12px', fontWeight: 500,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: c.cream, background: c.navyLight,
                    border: `1px solid ${c.cream}`, borderRadius: '2px',
                    padding: '16px 26px 14px', cursor: status === 'sending' ? 'wait' : 'pointer',
                    transition: `background 0.35s ${EASE}, color 0.35s ${EASE}`,
                  }}
                  onMouseEnter={e => { if (status !== 'sending') { e.currentTarget.style.background = c.orange; e.currentTarget.style.color = c.cream } }}
                  onMouseLeave={e => { e.currentTarget.style.background = c.cream; e.currentTarget.style.color = c.cream }}
                >
                  {status === 'sending' ? 'Sending…' : 'Send'}
                </button>

                {status === 'error' && (
                  <p style={{ fontFamily: f.text, fontSize: '15px', color: '#B3261E', margin: 0 }}>
                    Something went wrong. Try again, or reach me on LinkedIn.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function Labelled({ t, children }) {
  return (
    <label style={{ display: 'block' }}>
      <span style={{ ...label, fontSize: '10px', color: c.whiteFaint, display: 'block', marginBottom: '8px' }}>{t}</span>
      {children}
    </label>
  )
}
