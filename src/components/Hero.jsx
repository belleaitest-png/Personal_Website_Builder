import { useState, useEffect } from 'react'
import { c, f, EASE, label } from '../theme'
import { usePrefersReducedMotion } from '../useReveal'
import HeroShader from './HeroShader'

// Her line, verbatim. This is the statement; the questions below are the thesis.
const HEADLINE = "I’m a scientist-turned-operator learning, in public, how to build useful AI systems and think clearly about what they change."

// One per writing pillar: applied intelligence, systems in transition,
// biological intelligence.
const QUESTIONS = [
  'What does technological progress make possible, and what must change for it to improve human lives?',
  'What has to be true before an agent can do real work?',
  'What does biology already know that our algorithms do not?',
]

const ROTATE_MS = 7000

function useRotatingQuestion(reduced) {
  const [i, setI] = useState(0)
  const [show, setShow] = useState(true)

  useEffect(() => {
    if (reduced) return          // one question, no rotation
    let outT
    const t = setInterval(() => {
      setShow(false)
      outT = setTimeout(() => {
        setI(n => (n + 1) % QUESTIONS.length)
        setShow(true)
      }, 620)
    }, ROTATE_MS)
    return () => { clearInterval(t); clearTimeout(outT) }
  }, [reduced])

  return [QUESTIONS[i], reduced ? true : show]
}

export default function Hero() {
  const reduced = usePrefersReducedMotion()
  const [question, visible] = useRotatingQuestion(reduced)
  const [entered, setEntered] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setEntered(true), 60)
    return () => clearTimeout(t)
  }, [])

  const rise = (delay) => reduced ? {} : {
    opacity: entered ? 1 : 0,
    transform: entered ? 'translateY(0)' : 'translateY(16px)',
    transition: `opacity 1s ${EASE} ${delay}ms, transform 1s ${EASE} ${delay}ms`,
  }

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: c.navy,
        zIndex: 1,
      }}
    >
      {/* The visual layer. One swappable child: shader now, video later. */}
      <HeroShader />

      <div
        className="ab-hero-copy"
        style={{
          position: 'absolute',
          top: '50%',
          left: 0,
          width: '46%',
          maxWidth: '620px',
          transform: 'translateY(-50%)',
          padding: '0 48px',
          zIndex: 10,
        }}
      >
        <p style={{ ...label, color: c.orange, margin: '0 0 26px', ...rise(120) }}>
          Applied AI Builder &amp; Operator
        </p>

        <h1
          style={{
            fontFamily: f.display,
            fontWeight: 500,
            fontSize: 'clamp(26px, 2.9vw, 40px)',
            lineHeight: 1.28,
            letterSpacing: '0.005em',
            color: c.white,
            margin: 0,
            ...rise(220),
          }}
        >
          {HEADLINE}
        </h1>

        <div
          aria-hidden="true"
          style={{
            width: '44px', height: '2px', background: c.orange,
            margin: '34px 0 26px', borderRadius: '1px',
            transformOrigin: 'left',
            transform: reduced || entered ? 'scaleX(1)' : 'scaleX(0)',
            transition: reduced ? 'none' : `transform 0.9s ${EASE} 700ms`,
          }}
        />

        {/* The rotating thesis question, quieter than the headline on purpose. */}
        <p
          aria-live="polite"
          style={{
            fontFamily: f.display,
            fontStyle: 'italic',
            fontWeight: 300,
            fontSize: 'clamp(17px, 1.5vw, 21px)',
            lineHeight: 1.6,
            color: c.cream,
            opacity: visible ? 0.78 : 0,
            margin: 0,
            minHeight: '3.2em',
            transition: reduced ? 'none' : `opacity 0.6s ${EASE}`,
            ...rise(340),
          }}
        >
          {question}
        </p>
      </div>

      {/* Scroll hint. Sits in the copy column, where the scrim guarantees
          contrast: centred it fell over the chair and vanished. */}
      <a
        href="#build"
        className="ab-hero-hint"
        aria-label="Scroll to what I'm building"
        style={{
          position: 'absolute', bottom: '40px', left: '48px', zIndex: 10,
          display: 'inline-flex', alignItems: 'center', gap: '12px',
          textDecoration: 'none',
          ...rise(900),
        }}
      >
        <span
          aria-hidden="true"
          style={{
            width: '30px', height: '1px', background: c.orange,
            transformOrigin: 'left',
            animation: reduced ? 'none' : 'heroSweep 2.8s ease-in-out infinite',
          }}
        />
        <span style={{ ...label, fontSize: '10px', color: c.orange }}>
          Currently building
        </span>
      </a>
    </header>
  )
}
