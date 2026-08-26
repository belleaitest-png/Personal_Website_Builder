import { c, f, EASE, maxw, label } from '../theme'
import { useReveal, rise } from '../useReveal'
import DownloadGate from './DownloadGate'

// Credentials in service of the story. Each entry leads with the capability
// it produced, not the job title or the date.
const PROOF = [
  {
    capability: 'Data into a decision',
    org: 'Fruitist',
    role: 'Strategy & Innovation',
    body: 'Built a weekly internal and industry data model that fed significant pricing decisions. The output was not analysis for its own sake; it was the input a commercial call was made on.',
  },
  {
    capability: 'Operating under constraint',
    org: 'AlixPartners',
    role: 'Turnaround & Restructuring',
    body: 'Weekly cash reporting, payment runs, accounting and modelling, and the communication of all of it to management. Restructuring is where you learn what a real constraint is and how decisions get made without complete information.',
  },
  {
    capability: 'Rigour and the standard of proof',
    org: 'ICAEW · Deloitte',
    role: 'Chartered Accountant',
    body: 'Audit is pattern recognition against a system you did not design. It sets a standard for what counts as evidence that I have not been able to unlearn, and would not want to.',
  },
  {
    capability: 'Argument and strategic judgement',
    org: 'Harvard Business School',
    role: 'MBA 2026',
    body: 'Two years of being asked whether the thing is worth doing at all, in a room full of people willing to say it is not. Research on fertility, food systems and demographics came out of it, and so did two of the tools above.',
  },
  {
    capability: 'First-principles curiosity',
    org: 'Biology',
    role: 'Undergraduate training',
    body: 'The signature lens. Living systems are where I learned that complexity is legible if you are patient with it, and it is still how I read a model, a business or a market.',
  },
]

export default function OperatingProof() {
  const [ref, on, reduced] = useReveal(0.05)

  return (
    <section id="proof" ref={ref} style={{ background: c.paper, padding: 'clamp(90px, 12vh, 140px) 32px' }}>
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>

        <p style={{ ...label, color: c.ink, margin: 0, ...rise(on, 0, reduced) }}>Operating proof</p>

        <h2 style={{
          fontFamily: f.display, fontWeight: 400,
          fontSize: 'clamp(38px, 5.2vw, 68px)', lineHeight: 1.06,
          letterSpacing: '-0.02em', color: c.ink, margin: '24px 0 0', maxWidth: '20ch',
          ...rise(on, 70, reduced),
        }}>
          What each part of the CV actually gave me.
        </h2>

        <div style={{ margin: '62px 0 0', borderTop: `1px solid ${c.rule}` }}>
          {PROOF.map((p, i) => (
            <article
              key={p.org}
              className="ab-stack"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 260px) minmax(0, 1fr)',
                gap: '14px 56px',
                padding: '32px 0',
                borderBottom: `1px solid ${c.rule}`,
                ...rise(on, 130 + i * 90, reduced),
              }}
            >
              <div>
                <h3 style={{
                  fontFamily: f.text, fontWeight: 600, fontSize: '17px',
                  lineHeight: 1.35, color: c.ink, margin: '0 0 10px',
                  letterSpacing: '-0.005em',
                }}>
                  {p.capability}
                </h3>
                <p style={{ fontFamily: f.mono, fontSize: '11.5px', letterSpacing: '0.05em', color: c.inkFaint, margin: 0, lineHeight: 1.6 }}>
                  {p.org}
                  <br />
                  {p.role}
                </p>
              </div>
              <p style={{ fontFamily: f.text, fontSize: '16.5px', lineHeight: 1.7, color: c.inkSoft, margin: 0, maxWidth: '64ch' }}>
                {p.body}
              </p>
            </article>
          ))}
        </div>

        <div style={{ margin: '40px 0 0', ...rise(on, 620, reduced) }}>
          <DownloadGate
            href="/documents/resume/Annabelle Body, HBS Class of 2026.pdf"
            label="Annabelle Body - CV"
            style={{
              display: 'inline-block',
              fontFamily: f.mono, fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: c.ink, background: 'transparent',
              border: `1px solid ${c.rule}`, borderRadius: '2px',
              padding: '15px 24px 13px', textDecoration: 'none', cursor: 'pointer',
              transition: `border-color 0.35s ${EASE}, background 0.35s ${EASE}`,
            }}
          >
            Full CV →
          </DownloadGate>
        </div>
      </div>
    </section>
  )
}
