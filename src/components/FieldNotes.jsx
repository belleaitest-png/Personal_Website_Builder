import { c, f, EASE, maxw, label } from '../theme'
import { useReveal, rise } from '../useReveal'

const PILLARS = [
  {
    n: '01',
    title: 'Applied intelligence',
    body: 'Agents, implementation, workflow design, adoption, and the distance between a demo and a system someone relies on.',
  },
  {
    n: '02',
    title: 'Biological intelligence',
    body: 'AI × biology, biophysics, ageing, nature-inspired materials, and the questions living systems may already have answered.',
  },
  {
    n: '03',
    title: 'Systems in transition',
    body: 'Work, markets, demographics, food, care, infrastructure and institutions moving through a technological shift.',
  },
]

export default function FieldNotes() {
  const [ref, on, reduced] = useReveal(0.08)

  return (
    <section id="think" ref={ref} style={{ background: c.paperDeep, padding: 'clamp(90px, 12vh, 140px) 32px' }}>
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>

        <p style={{ ...label, color: c.ink, margin: 0, ...rise(on, 0, reduced) }}>Field Notes</p>

        <h2 style={{
          fontFamily: f.display, fontWeight: 400,
          fontSize: 'clamp(38px, 5.2vw, 68px)', lineHeight: 1.06,
          letterSpacing: '-0.02em', color: c.ink, margin: '24px 0 0', maxWidth: '22ch',
          ...rise(on, 70, reduced),
        }}>
          Build notes and evidence-led essays on AI, biology, and the systems
          changing human life.
        </h2>

        <p style={{
          fontFamily: f.text, fontSize: '18px', lineHeight: 1.7,
          color: c.inkSoft, margin: '30px 0 0', maxWidth: '58ch',
          ...rise(on, 130, reduced),
        }}>
          I am writing before I feel ready. The point is to test ideas in public,
          be more useful to people building the future, and get sharper through
          evidence and good disagreement. If you think I have something wrong,
          that is the most valuable email I can get.
        </p>

        <p style={{
          fontFamily: f.text, fontSize: '18px', lineHeight: 1.7,
          color: c.inkSoft, margin: '22px 0 0', maxWidth: '58ch',
          ...rise(on, 170, reduced),
        }}>
          <strong style={{ color: c.ink, fontWeight: 600 }}>Capability compounds.</strong>{' '}
          An hour returned to someone goes into the next problem, which produces the
          next tool, which returns more hours. That thread runs through most of what
          I write.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 260px), 1fr))',
          gap: '1px', background: c.rule,
          border: `1px solid ${c.rule}`, borderRadius: '3px',
          margin: '54px 0 0', overflow: 'hidden',
        }}>
          {PILLARS.map((p, i) => (
            <div key={p.n} style={{ background: c.paper, padding: '28px 26px 32px', ...rise(on, 200 + i * 100, reduced) }}>
              <span style={{ ...label, color: c.inkFaint }}>{p.n}</span>
              <h3 style={{
                fontFamily: f.display, fontWeight: 400, fontSize: '27px',
                lineHeight: 1.15, letterSpacing: '-0.015em',
                color: c.ink, margin: '14px 0 12px',
              }}>
                {p.title}
              </h3>
              <p style={{ fontFamily: f.text, fontSize: '15px', lineHeight: 1.65, color: c.inkSoft, margin: 0 }}>
                {p.body}
              </p>
            </div>
          ))}
        </div>

        <div style={{ margin: '44px 0 0', ...rise(on, 520, reduced) }}>
          <a
            href="https://annabellebody.substack.com"
            target="_blank"
            rel="noreferrer"
            style={{
              display: 'inline-block',
              fontFamily: f.mono, fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: c.paper, background: c.ink,
              border: `1px solid ${c.ink}`, borderRadius: '2px',
              padding: '16px 26px 14px', textDecoration: 'none',
              transition: `background 0.35s ${EASE}, color 0.35s ${EASE}`,
            }}
            onMouseEnter={e => { e.currentTarget.style.background = c.lime; e.currentTarget.style.color = c.ink }}
            onMouseLeave={e => { e.currentTarget.style.background = c.ink; e.currentTarget.style.color = c.paper }}
          >
            Read Field Notes ↗
          </a>
        </div>
      </div>
    </section>
  )
}
