import { useState, useEffect } from 'react'

const NAVY   = '#191A1A'
const CREAM  = '#F5F0E8'
const WHITE  = '#FFFFFF'
const ORANGE = '#E8534E'
const serif  = "'Cormorant Garamond', serif"

const STORAGE_KEY = 'belle_doc_email'

function getStoredEmail() {
  try {
    const e = localStorage.getItem(STORAGE_KEY)
    return e && e.includes('@') ? e : ''
  } catch { return '' }
}

function storeEmail(email) {
  try { localStorage.setItem(STORAGE_KEY, email) } catch {}
}

// ── Modal ───────────────────────────────────────────────────────────────────
function EmailModal({ label, href, onClose }) {
  const stored = getStoredEmail()
  const [mode, setMode] = useState(stored ? 'confirm' : 'input')
  const [email, setEmail] = useState(stored || '')
  const [error, setError] = useState('')

  async function send(emailToUse) {
    setMode('sending')
    try {
      const r = await fetch('/api/send-document', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: emailToUse,
          documentPath: href,
          documentName: label || undefined,
        }),
      })
      if (!r.ok) throw new Error('Failed')
      storeEmail(emailToUse)
      setMode('sent')
      setTimeout(onClose, 2500)
    } catch {
      setMode('error')
    }
  }

  function handleSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email')
      return
    }
    send(email)
  }

  const overlay = {
    position: 'fixed', inset: 0, zIndex: 1000,
    background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
    display: 'flex', justifyContent: 'center', alignItems: 'center',
    padding: '24px',
  }
  const card = {
    background: NAVY, borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.08)',
    padding: '40px', maxWidth: '400px', width: '100%',
    boxShadow: '0 24px 80px rgba(0,0,0,0.5)', textAlign: 'center',
  }
  const title = { fontFamily: serif, fontSize: '20px', fontWeight: '700', color: WHITE, margin: '0 0 8px' }
  const sub = { fontFamily: serif, fontSize: '14px', color: CREAM, opacity: 0.5, margin: '0 0 24px' }
  const btn = {
    width: '100%', fontFamily: serif, fontSize: '14px', fontWeight: '600',
    color: WHITE, background: ORANGE, border: 'none',
    borderRadius: '4px', padding: '14px', cursor: 'pointer',
  }

  const docLabel = label || 'Document'

  return (
    <div style={overlay} onClick={onClose}>
      <div style={card} onClick={e => e.stopPropagation()}>

        {mode === 'sent' ? (
          <>
            <div style={{ fontSize: '36px', marginBottom: '16px', color: '#00C896' }}>&#10003;</div>
            <p style={title}>Check your inbox</p>
            <p style={{ ...sub, marginBottom: 0 }}>{docLabel} is on its way</p>
          </>

        ) : mode === 'sending' ? (
          <>
            <div style={{
              width: 28, height: 28, borderRadius: '50%',
              border: `2px solid ${ORANGE}`, borderTopColor: 'transparent',
              animation: 'dgSpin 0.8s linear infinite',
              margin: '0 auto 16px',
            }} />
            <style>{`@keyframes dgSpin{to{transform:rotate(360deg)}}`}</style>
            <p style={{ fontFamily: serif, fontSize: '15px', color: CREAM, opacity: 0.6, margin: 0 }}>Sending...</p>
          </>

        ) : mode === 'error' ? (
          <>
            <p style={title}>Something went wrong</p>
            <p style={sub}>Please try again</p>
            <button onClick={() => setMode(getStoredEmail() ? 'confirm' : 'input')} style={btn}>
              Try Again
            </button>
          </>

        ) : mode === 'confirm' ? (
          <>
            <p style={title}>Send document</p>
            <p style={sub}>{docLabel}</p>
            <p style={{ fontFamily: serif, fontSize: '15px', color: CREAM, margin: '0 0 20px' }}>
              Send to <span style={{ color: ORANGE, fontWeight: '600' }}>{stored}</span>?
            </p>
            <button onClick={() => send(stored)} style={{ ...btn, marginBottom: '12px' }}>
              Confirm
            </button>
            <button
              onClick={() => { setMode('input'); setEmail('') }}
              style={{
                background: 'none', border: 'none', fontFamily: serif,
                fontSize: '13px', color: CREAM, opacity: 0.4,
                cursor: 'pointer', textDecoration: 'underline',
              }}
            >
              Use a different email
            </button>
          </>

        ) : (
          <>
            <p style={title}>Get this document</p>
            <p style={sub}>{docLabel}</p>
            <form onSubmit={handleSubmit}>
              <input
                type="email" value={email}
                onChange={e => { setEmail(e.target.value); setError('') }}
                placeholder="your@email.com"
                style={{
                  width: '100%', padding: '14px 16px',
                  background: 'rgba(255,255,255,0.05)',
                  border: error ? `1px solid ${ORANGE}` : '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px', color: WHITE,
                  fontFamily: serif, fontSize: '15px',
                  boxSizing: 'border-box', outline: 'none',
                }}
              />
              {error && <p style={{ fontFamily: serif, fontSize: '12px', color: ORANGE, margin: '4px 0 0', textAlign: 'left' }}>{error}</p>}
              <button type="submit" style={{ ...btn, marginTop: '12px' }}>
                Send to my email
              </button>
              <p style={{ fontFamily: serif, fontSize: '11px', color: CREAM, opacity: 0.3, margin: '12px 0 0' }}>
                We'll email you the PDF directly
              </p>
            </form>
          </>
        )}
      </div>
    </div>
  )
}

// ── Gate wrapper ─────────────────────────────────────────────────────────────
export default function DownloadGate({ href, label, children, style, className }) {
  const [showModal, setShowModal] = useState(false)

  function handleClick(e) {
    e.preventDefault()
    setShowModal(true)
  }

  return (
    <>
      <a href={href} onClick={handleClick} style={style} className={className}>
        {children}
      </a>
      {showModal && (
        <EmailModal label={label} href={href} onClose={() => setShowModal(false)} />
      )}
    </>
  )
}
