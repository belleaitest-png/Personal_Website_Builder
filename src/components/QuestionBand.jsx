import { c, f, maxw, label } from '../theme'
import { useReveal, rise } from '../useReveal'

// The pivot from "who I am" to "how I think". One question, nothing competing.
export default function QuestionBand() {
  const [ref, on, reduced] = useReveal(0.2)

  return (
    <section
      ref={ref}
      style={{
        background: c.ink,
        padding: 'clamp(100px, 16vh, 170px) 32px',
      }}
    >
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>
        <p style={{ ...label, color: c.lime, margin: '0 0 34px', ...rise(on, 0, reduced) }}>
          The question underneath all of it
        </p>

        <h2 style={{
          fontFamily: f.display,
          fontWeight: 400,
          fontSize: 'clamp(34px, 4.8vw, 64px)',
          lineHeight: 1.12,
          letterSpacing: '-0.02em',
          color: c.paper,
          margin: 0,
          maxWidth: '24ch',
          ...rise(on, 90, reduced),
        }}>
          What does technological progress make possible, and{' '}
          <span style={{ color: c.lime, fontStyle: 'italic' }}>
            what must change for it to improve human lives?
          </span>
        </h2>
      </div>
    </section>
  )
}
