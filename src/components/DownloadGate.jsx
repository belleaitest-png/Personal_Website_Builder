import { useState, useEffect, useRef, useCallback } from 'react'

// ── Palette ──────────────────────────────────────────────────────────────────
const NAVY_DEEP = '#0E1010'
const NAVY      = '#191A1A'
const CREAM     = '#F5F0E8'
const WHITE     = '#FFFFFF'
const ORANGE    = '#E8534E'
const TEAL      = '#00C896'
const serif     = "'Cormorant Garamond', serif"
const mono      = "'Courier New', monospace"

const STORAGE_KEY = 'belle_access_email'
const SURVIVE_SECONDS = 8

// ── Check if visitor already has access ──────────────────────────────────────
function hasAccess() {
  try { return Boolean(localStorage.getItem(STORAGE_KEY)) }
  catch { return false }
}

function grantAccess(email) {
  try { localStorage.setItem(STORAGE_KEY, email || 'game_unlock') }
  catch { /* private browsing */ }
}

// ── Dodge Game ──────────────────────────────────────────────────────────────
function DodgeGame({ onWin }) {
  const canvasRef = useRef(null)
  const [timeLeft, setTimeLeft] = useState(SURVIVE_SECONDS)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [gameKey, setGameKey] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const W = 260
    const H = 260

    const PLAYER_R = 10
    let player = { x: W / 2, y: H - 30 }
    let bots = []
    let alive = true
    let elapsed = 0
    let lastSpawn = 0
    let keys = {}
    const SPEED = 3.5

    function spawnBot() {
      const r = 6 + Math.random() * 6
      bots.push({
        x: r + Math.random() * (W - r * 2),
        y: -r,
        r,
        vy: 1.5 + Math.random() * 2 + elapsed * 0.15,
        vx: (Math.random() - 0.5) * 1.5,
      })
    }

    function draw() {
      // Background
      ctx.fillStyle = NAVY_DEEP
      ctx.fillRect(0, 0, W, H)

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'
      ctx.lineWidth = 0.5
      for (let i = 0; i <= W; i += 20) {
        ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, H); ctx.stroke()
      }
      for (let i = 0; i <= H; i += 20) {
        ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(W, i); ctx.stroke()
      }

      // Bots
      bots.forEach(b => {
        ctx.fillStyle = '#D84535'
        ctx.beginPath()
        ctx.arc(b.x, b.y, b.r, 0, Math.PI * 2)
        ctx.fill()
        // Small glow
        ctx.shadowColor = '#D84535'
        ctx.shadowBlur = 6
        ctx.fill()
        ctx.shadowBlur = 0
      })

      // Player
      ctx.fillStyle = TEAL
      ctx.beginPath()
      ctx.arc(player.x, player.y, PLAYER_R, 0, Math.PI * 2)
      ctx.fill()
      ctx.shadowColor = TEAL
      ctx.shadowBlur = 8
      ctx.fill()
      ctx.shadowBlur = 0

      // Timer bar
      const pct = Math.max(0, (SURVIVE_SECONDS - elapsed) / SURVIVE_SECONDS)
      ctx.fillStyle = 'rgba(255,255,255,0.08)'
      ctx.fillRect(0, 0, W, 3)
      ctx.fillStyle = TEAL
      ctx.fillRect(0, 0, W * (1 - pct), 3)
    }

    let lastTime = null
    let animId

    function tick(ts) {
      if (!alive) return
      if (!lastTime) lastTime = ts
      const dt = (ts - lastTime) / 1000
      lastTime = ts
      elapsed += dt

      // Win condition
      if (elapsed >= SURVIVE_SECONDS) {
        alive = false
        setWon(true)
        setTimeLeft(0)
        onWin()
        draw()
        return
      }

      setTimeLeft(Math.ceil(SURVIVE_SECONDS - elapsed))

      // Player movement
      if (keys['ArrowLeft'] || keys['a'])  player.x -= SPEED
      if (keys['ArrowRight'] || keys['d']) player.x += SPEED
      if (keys['ArrowUp'] || keys['w'])    player.y -= SPEED
      if (keys['ArrowDown'] || keys['s'])  player.y += SPEED

      // Clamp
      player.x = Math.max(PLAYER_R, Math.min(W - PLAYER_R, player.x))
      player.y = Math.max(PLAYER_R, Math.min(H - PLAYER_R, player.y))

      // Spawn bots -rate increases over time
      const spawnInterval = Math.max(0.25, 0.7 - elapsed * 0.04)
      if (elapsed - lastSpawn > spawnInterval) {
        spawnBot()
        lastSpawn = elapsed
      }

      // Update bots
      bots.forEach(b => {
        b.y += b.vy
        b.x += b.vx
        // Bounce off walls
        if (b.x - b.r < 0 || b.x + b.r > W) b.vx *= -1
      })

      // Collision
      for (const b of bots) {
        const dx = player.x - b.x
        const dy = player.y - b.y
        if (Math.sqrt(dx * dx + dy * dy) < PLAYER_R + b.r) {
          alive = false
          setGameOver(true)
          draw()
          return
        }
      }

      // Remove off-screen bots
      bots = bots.filter(b => b.y < H + b.r + 10)

      draw()
      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)

    function handleKey(e) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'w', 'a', 's', 'd'].includes(e.key)) {
        e.preventDefault()
        keys[e.key] = true
      }
    }
    function handleKeyUp(e) {
      keys[e.key] = false
    }

    window.addEventListener('keydown', handleKey)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('keydown', handleKey)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [gameKey, onWin])

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={260}
        height={260}
        style={{
          borderRadius: '8px',
          border: '1px solid rgba(255,255,255,0.1)',
          display: 'block',
          margin: '0 auto',
        }}
      />
      <p style={{
        fontFamily: mono, fontSize: '14px', color: CREAM,
        marginTop: '12px', opacity: 0.7,
      }}>
        {won
          ? 'Unlocked!'
          : gameOver
            ? 'Hit!'
            : `${timeLeft}s -dodge the bots (arrow keys / WASD)`}
      </p>
      {gameOver && !won && (
        <button
          onClick={() => { setGameOver(false); setTimeLeft(SURVIVE_SECONDS); setWon(false); setGameKey(k => k + 1) }}
          style={{
            fontFamily: serif, fontSize: '14px', fontWeight: '600',
            color: WHITE, background: ORANGE, border: 'none',
            borderRadius: '4px', padding: '10px 24px', cursor: 'pointer',
            marginTop: '8px',
          }}
        >
          Try Again
        </button>
      )}
    </div>
  )
}

// ── Gate Modal ───────────────────────────────────────────────────────────────
function GateModal({ onUnlock, onClose }) {
  const [tab, setTab] = useState('email') // 'email' | 'game'
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  function handleEmailSubmit(e) {
    e.preventDefault()
    if (!email || !email.includes('@') || !email.includes('.')) {
      setError('Please enter a valid email')
      return
    }
    grantAccess(email)
    onUnlock()
  }

  const handleGameWin = useCallback(() => {
    grantAccess('game_unlock')
    setTimeout(onUnlock, 800)
  }, [onUnlock])

  const tabStyle = (active) => ({
    fontFamily: serif,
    fontSize: '14px',
    fontWeight: '600',
    color: active ? ORANGE : CREAM,
    background: 'none',
    border: 'none',
    borderBottom: active ? `2px solid ${ORANGE}` : '2px solid transparent',
    padding: '10px 20px',
    cursor: 'pointer',
    opacity: active ? 1 : 0.5,
    transition: 'all 0.2s',
  })

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(0,0,0,0.75)',
        backdropFilter: 'blur(8px)',
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        padding: '24px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: NAVY, borderRadius: '12px',
          border: '1px solid rgba(255,255,255,0.08)',
          padding: '40px', maxWidth: '400px', width: '100%',
          boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
        }}
        onClick={e => e.stopPropagation()}
      >
        <p style={{
          fontFamily: serif, fontSize: '22px', fontWeight: '700',
          color: WHITE, margin: '0 0 8px', textAlign: 'center',
        }}>
          Unlock downloads
        </p>
        <p style={{
          fontFamily: serif, fontSize: '14px', color: CREAM,
          opacity: 0.5, margin: '0 0 24px', textAlign: 'center',
        }}>
          Enter your email or dodge the bots
        </p>

        {/* Tabs */}
        <div style={{
          display: 'flex', justifyContent: 'center',
          gap: '8px', marginBottom: '28px',
          borderBottom: '1px solid rgba(255,255,255,0.06)',
        }}>
          <button style={tabStyle(tab === 'email')} onClick={() => setTab('email')}>
            Email
          </button>
          <button style={tabStyle(tab === 'game')} onClick={() => setTab('game')}>
            Dodge
          </button>
        </div>

        {tab === 'email' ? (
          <form onSubmit={handleEmailSubmit}>
            <input
              type="email"
              value={email}
              onChange={e => { setEmail(e.target.value); setError('') }}
              placeholder="your@email.com"
              style={{
                width: '100%', padding: '14px 16px',
                background: 'rgba(255,255,255,0.05)',
                border: error ? `1px solid ${ORANGE}` : '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px', color: WHITE,
                fontFamily: serif, fontSize: '15px',
                boxSizing: 'border-box', outline: 'none',
                marginBottom: '4px',
              }}
            />
            {error && (
              <p style={{ fontFamily: serif, fontSize: '12px', color: ORANGE, margin: '4px 0 0' }}>
                {error}
              </p>
            )}
            <button
              type="submit"
              style={{
                width: '100%', marginTop: '12px',
                fontFamily: serif, fontSize: '14px', fontWeight: '600',
                color: WHITE, background: ORANGE, border: 'none',
                borderRadius: '4px', padding: '14px', cursor: 'pointer',
              }}
            >
              Unlock
            </button>
            <p style={{
              fontFamily: serif, fontSize: '11px', color: CREAM,
              opacity: 0.3, margin: '12px 0 0', textAlign: 'center',
            }}>
              Your email is stored locally on your device. We don't collect it.
            </p>
          </form>
        ) : (
          <DodgeGame onWin={handleGameWin} />
        )}
      </div>
    </div>
  )
}

// ── DownloadGate component ───────────────────────────────────────────────────
export default function DownloadGate({ href, children, style, className }) {
  const [showModal, setShowModal] = useState(false)
  const [unlocked, setUnlocked] = useState(false)

  useEffect(() => {
    setUnlocked(hasAccess())
  }, [])

  function handleClick(e) {
    if (unlocked) return // let the native link work
    e.preventDefault()
    setShowModal(true)
  }

  function handleUnlock() {
    setUnlocked(true)
    setShowModal(false)
    // auto-open the download after unlocking
    window.open(href, '_blank', 'noreferrer')
  }

  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        onClick={handleClick}
        style={style}
        className={className}
      >
        {children}
      </a>
      {showModal && (
        <GateModal
          onUnlock={handleUnlock}
          onClose={() => setShowModal(false)}
        />
      )}
    </>
  )
}
