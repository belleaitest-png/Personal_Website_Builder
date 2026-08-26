import { c, f, maxw, label } from '../theme'
import { useReveal, rise } from '../useReveal'

// Not a chronology. Three ways of seeing that stack, and what each one
// contributes to the work now.
const STAGES = [
  {
    n: 'I',
    title: 'Scientist',
    sub: 'Biology',
    body: "Biology is where I learned to ask what is actually happening, rather than what the summary says is happening. Living systems are the best available argument that complexity can be legible if you are patient with it. It is still how I read a business, a model, or a market.",
    gives: 'First-principles curiosity',
  },
  {
    n: 'II',
    title: 'Operator',
    sub: 'ICAEW · AlixPartners · Fruitist',
    body: "Restructuring is operating without slack. Weekly cash reporting, payment runs, models that management acted on the same afternoon. You learn what a constraint really is, how decisions get made when the information is incomplete, and how to be the calm person in the room when the numbers are not good.",
    gives: 'Judgement under constraint',
  },
  {
    n: 'III',
    title: 'Builder',
    sub: 'Now',
    body: "The interesting work is where frontier model capability meets a real business with real users and real limits. Most of that job is not prompting. It is translation: finding the friction worth removing, designing the workflow, and getting people to actually adopt it.",
    gives: 'Translation and adoption',
  },
]

export default function ThroughLine() {
  const [ref, on, reduced] = useReveal(0.06)

  return (
    <section id="arc" ref={ref} style={{ background: c.navy, padding: 'clamp(90px, 12vh, 140px) 32px' }}>
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>

        <p style={{ ...label, color: c.white, margin: 0, ...rise(on, 0, reduced) }}>The through-line</p>

        <h2 style={{
          fontFamily: f.display, fontWeight: 400,
          fontSize: 'clamp(38px, 5.2vw, 68px)',
          lineHeight: 1.06, letterSpacing: '-0.02em',
          color: c.white, margin: '24px 0 0', maxWidth: '20ch',
          ...rise(on, 70, reduced),
        }}>
          Three trainings, one question.
        </h2>

        <p style={{
          fontFamily: f.text, fontSize: '18px', lineHeight: 1.65,
          color: c.whiteSoft, margin: '26px 0 0', maxWidth: '56ch',
          ...rise(on, 130, reduced),
        }}>
          How do new technologies change what people are capable of, and the
          systems they depend on? I have approached it three ways.
        </p>

        <div style={{ margin: '72px 0 0', borderTop: `1px solid ${c.rule}` }}>
          {STAGES.map((s, i) => (
            <article
              key={s.n}
              className="ab-stack"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 200px) minmax(0, 1fr)',
                gap: '20px 56px',
                padding: 'clamp(34px, 5vh, 54px) 0',
                borderBottom: `1px solid ${c.rule}`,
                ...rise(on, 180 + i * 130, reduced),
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '10px' }}>
                  <span style={{ ...label, color: c.whiteFaint }}>{s.n}</span>
                  <h3 style={{
                    fontFamily: f.display, fontWeight: 400,
                    fontSize: 'clamp(28px, 3vw, 40px)', lineHeight: 1.1,
                    letterSpacing: '-0.015em', color: c.white, margin: 0,
                  }}>
                    {s.title}
                  </h3>
                </div>
                <p style={{
                  fontFamily: f.mono, fontSize: '11.5px', letterSpacing: '0.06em',
                  color: c.whiteFaint, margin: 0,
                }}>
                  {s.sub}
                </p>
              </div>

              <div>
                <p style={{
                  fontFamily: f.text, fontSize: '17px', lineHeight: 1.72,
                  color: c.whiteSoft, margin: '0 0 20px', maxWidth: '62ch',
                }}>
                  {s.body}
                </p>
                <span style={{
                  ...label, color: c.white,
                  background: c.orange, padding: '7px 12px 6px',
                  borderRadius: '2px', display: 'inline-block',
                }}>
                  {s.gives}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
