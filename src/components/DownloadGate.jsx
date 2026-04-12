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
const TARGET_SCORE = 3

// ── Check if visitor already has access ──────────────────────────────────────
function hasAccess() {
  try { return Boolean(localStorage.getItem(STORAGE_KEY)) }
  catch { return false }
}

function grantAccess(email) {
  try { localStorage.setItem(STORAGE_KEY, email || 'game_unlock') }
  catch { /* private browsing */ }
}

// ── Snake Game ───────────────────────────────────────────────────────────────
function SnakeGame({ onWin }) {
  const canvasRef = useRef(null)
  const [score, setScore] = useState(0)
  const [gameOver, setGameOver] = useState(false)
  const [won, setWon] = useState(false)
  const [gameKey, setGameKey] = useState(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const SIZE = 240
    const CELL = 20
    const GRID = SIZE / CELL

    let snake = [{ x: 6, y: 6 }]
    let dir = { x: 1, y: 0 }
    let nextDir = { x: 1, y: 0 }
    let alive = true
    let localScore = 0

    function spawnFood() {
      let pos
      do {
        pos = {
          x: Math.floor(Math.random() * GRID),
          y: Math.floor(Math.random() * GRID),
        }
      } while (snake.some(s => s.x === pos.x && s.y === pos.y))
      return pos
    }

    let food = spawnFood()

    function draw() {
      // Background
      ctx.fillStyle = NAVY_DEEP
      ctx.fillRect(0, 0, SIZE, SIZE)

      // Grid
      ctx.strokeStyle = 'rgba(255,255,255,0.03)'
      ctx.lineWidth = 0.5
      for (let i = 0; i <= GRID; i++) {
        ctx.beginPath(); ctx.moveTo(i * CELL, 0); ctx.lineTo(i * CELL, SIZE); ctx.stroke()
        ctx.beginPath(); ctx.moveTo(0, i * CELL); ctx.lineTo(SIZE, i * CELL); ctx.stroke()
      }

      // Food
      ctx.fillStyle = TEAL
      ctx.beginPath()
      ctx.arc(food.x * CELL + CELL / 2, food.y * CELL + CELL / 2, CELL / 2 - 3, 0, Math.PI * 2)
      ctx.fill()

      // Snake
      snake.forEach((s, i) => {
        ctx.fillStyle = i === 0 ? ORANGE : '#D47860'
        ctx.fillRect(s.x * CELL + 1, s.y * CELL + 1, CELL - 2, CELL - 2)
      })
    }

    function tick() {
      if (!alive) return

      dir = nextDir
      const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y }

      if (head.x < 0 || head.x >= GRID || head.y < 0 || head.y >= GRID ||
          snake.some(s => s.x === head.x && s.y === head.y)) {
        alive = false
        setGameOver(true)
        return
      }

      snake.unshift(head)

      if (head.x === food.x && head.y === food.y) {
        localScore++
        setScore(localScore)
        if (localScore >= TARGET_SCORE) {
          alive = false
          setWon(true)
          onWin()
          return
        }
        food = spawnFood()
      } else {
        snake.pop()
      }

      draw()
    }

    draw()
    const interval = setInterval(tick, 150)

    function handleKey(e) {
      if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
        e.preventDefault()
      }
      switch (e.key) {
        case 'ArrowUp':    if (dir.y !== 1)  nextDir = { x: 0, y: -1 }; break
        case 'ArrowDown':  if (dir.y !== -1) nextDir = { x: 0, y: 1 };  break
        case 'ArrowLeft':  if (dir.x !== 1)  nextDir = { x: -1, y: 0 }; break
        case 'ArrowRight': if (dir.x !== -1) nextDir = { x: 1, y: 0 };  break
      }
    }

    window.addEventListener('keydown', handleKey)
    return () => {
      clearInterval(interval)
      window.removeEventListener('keydown', handleKey)
    }
  }, [gameKey, onWin])

  return (
    <div style={{ textAlign: 'center' }}>
      <canvas
        ref={canvasRef}
        width={240}
        height={240}
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
        {won ? 'Unlocked!' : `${score} / ${TARGET_SCORE} — use arrow keys`}
      </p>
      {gameOver && !won && (
        <button
          onClick={() => { setGameOver(false); setScore(0); setWon(false); setGameKey(k => k + 1) }}
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
          Enter your email or beat the snake
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
            Play Snake
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
          <SnakeGame onWin={handleGameWin} />
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
