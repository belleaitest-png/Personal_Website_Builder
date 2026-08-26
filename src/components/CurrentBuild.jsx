import { c, f, EASE, maxw, label } from '../theme'
import { useReveal, rise } from '../useReveal'

// The workflow, made tactile. Movement here exists to explain the mechanism,
// not to decorate: each step lands in sequence, the way the system runs.
const STEPS = [
  {
    k: '01',
    place: 'Telegram',
    line: '"apply to this" · "research this person" · "follow up here"',
    note: 'A link, a voice note, or an instruction. Captured wherever I am.',
  },
  {
    k: '02',
    place: 'Task queue',
    line: 'intent → structured task',
    note: 'The intention stops being a saved post and becomes work.',
  },
  {
    k: '03',
    place: 'Claude',
    line: 'sweeps at set intervals',
    note: 'Completes defined work, and flags what it could not resolve.',
  },
  {
    k: '04',
    place: 'Back to me',
    line: 'a usable output',
    note: 'A draft, a shortlist, a decision I can act on.',
  },
]

export default function CurrentBuild() {
  const [ref, on, reduced] = useReveal(0.08)

  return (
    <section
      id="build"
      ref={ref}
      style={{
        background: c.ink,
        color: c.paper,
        padding: 'clamp(90px, 12vh, 140px) 32px',
      }}
    >
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>

        <div style={{ display: 'flex', alignItems: 'baseline', gap: '18px', flexWrap: 'wrap', ...rise(on, 0, reduced) }}>
          <p style={{ ...label, color: c.lime, margin: 0 }}>Current build</p>
          <span style={{
            ...label,
            color: c.ink, background: c.lime,
            padding: '6px 11px 5px', borderRadius: '2px',
          }}>
            Active prototype
          </span>
        </div>

        <h2
          style={{
            fontFamily: f.display,
            fontWeight: 400,
            fontSize: 'clamp(40px, 5.6vw, 76px)',
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
            color: c.paper,
            margin: '26px 0 0',
            ...rise(on, 80, reduced),
          }}
        >
          Signal <span style={{ color: c.lime }}>→</span> Action
        </h2>

        <p
          style={{
            fontFamily: f.display,
            fontWeight: 400,
            fontStyle: 'italic',
            fontSize: 'clamp(22px, 2.4vw, 31px)',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            color: c.lime,
            margin: '18px 0 0',
            ...rise(on, 110, reduced),
          }}
        >
          An AI agent for turning intent into action.
        </p>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 330px), 1fr))',
            gap: '38px 64px',
            margin: '44px 0 0',
            maxWidth: '860px',
            ...rise(on, 140, reduced),
          }}
        >
          <Field
            head="The friction"
            body="Interesting opportunities, links and intentions disappear into saved posts and half-written task lists."
          />
          <Field
            head="What I built"
            body="I send a link, voice note, or instruction to Telegram: apply to this, research this person, follow up here. It enters a task queue. Claude sweeps it at set intervals, completes defined work, and sends an output back."
          />
          <Field
            head="Why it matters"
            body="It closes the gap between noticing something and acting on it, which is where most personal systems quietly fail."
          />
          <Field
            head="What's next"
            body="Improving reliability, and the hand-offs between capture, judgement and output. It is in daily use, not finished."
          />
        </div>

        {/* The mechanism itself */}
        <ol
          style={{
            listStyle: 'none',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 210px), 1fr))',
            gap: '1px',
            background: 'rgba(244,241,233,0.14)',
            border: '1px solid rgba(244,241,233,0.14)',
            margin: '68px 0 0',
            borderRadius: '3px',
            overflow: 'hidden',
          }}
        >
          {STEPS.map((s, i) => (
            <li
              key={s.k}
              style={{
                background: c.ink,
                padding: '26px 24px 28px',
                ...rise(on, 260 + i * 110, reduced),
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                <span style={{ ...label, color: c.lime }}>{s.k}</span>
                <span aria-hidden="true" style={{ flex: 1, height: '1px', background: 'rgba(244,241,233,0.18)' }} />
              </div>
              <p style={{
                fontFamily: f.text, fontSize: '15px', fontWeight: 600,
                color: c.paper, margin: '0 0 10px', letterSpacing: '0.01em',
              }}>
                {s.place}
              </p>
              <p style={{
                fontFamily: f.mono, fontSize: '12.5px', lineHeight: 1.6,
                color: c.lime, margin: '0 0 12px',
              }}>
                {s.line}
              </p>
              <p style={{
                fontFamily: f.text, fontSize: '14px', lineHeight: 1.6,
                color: 'rgba(244,241,233,0.58)', margin: 0,
              }}>
                {s.note}
              </p>
            </li>
          ))}
        </ol>

        <p style={{
          fontFamily: f.text, fontSize: '14px', lineHeight: 1.6,
          color: 'rgba(244,241,233,0.42)', margin: '22px 0 0', maxWidth: '62ch',
          ...rise(on, 720, reduced),
        }}>
          It is not autonomous and I would not claim it is. It handles a defined
          set of work reliably enough that I trust it with my own week.
        </p>
      </div>
    </section>
  )
}

function Field({ head, body }) {
  return (
    <div>
      <p style={{ ...label, color: 'rgba(244,241,233,0.45)', margin: '0 0 12px' }}>{head}</p>
      <p style={{ fontFamily: f.text, fontSize: '16.5px', lineHeight: 1.62, color: 'rgba(244,241,233,0.9)', margin: 0 }}>
        {body}
      </p>
    </div>
  )
}
