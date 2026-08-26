import { c, f, EASE, maxw, label } from '../theme'
import { useReveal, rise } from '../useReveal'
import DownloadGate from './DownloadGate'

// Forward-looking capability, each one grounded in something that actually happened.
// Evidence carries the weight; the capability is only the heading it sits under.
const BRINGS = [
  {
    n: '01',
    capability: 'Scientific curiosity',
    line: 'First-principles thinking, especially around AI × biology.',
    evidence: [
      {
        where: 'Biology',
        what: 'Trained to ask what is actually happening rather than what the summary says is happening. It is still how I read a model, a business or a market.',
      },
    ],
  },
  {
    n: '02',
    capability: 'Commercial and operational judgment',
    line: 'Decision-making under constraint, with the numbers in front of me.',
    evidence: [
      {
        where: 'Fruitist',
        what: 'Built a weekly external and internal data model that informed meaningful pricing decisions. Not analysis for its own sake: it was the input a commercial call was made on.',
      },
      {
        where: 'AlixPartners',
        what: 'Cash reporting, payment runs, models, and the communication of all of it to management. Restructuring is where you learn what a real constraint is.',
      },
    ],
  },
  {
    n: '03',
    capability: 'Implementation bias',
    line: 'Turning technical capability into a workflow people genuinely use.',
    evidence: [
      {
        where: 'Signal → Action',
        what: 'An agent I rely on daily rather than a demo I showed once. The interesting problems were the hand-offs, not the model.',
      },
    ],
  },
  {
    n: '04',
    capability: 'Communication',
    line: 'Translating complexity, bringing people with you, and making ambitious work feel possible.',
    evidence: [
      {
        where: 'HBS · Field Notes',
        what: 'Two years of arguing positions in a room willing to disagree, and a public writing habit that keeps the thinking honest.',
      },
    ],
  },
]

export default function WhatIBring() {
  const [ref, on, reduced] = useReveal(0.05)

  return (
    <section id="bring" ref={ref} style={{ background: c.navy, padding: 'clamp(90px, 12vh, 140px) 32px' }}>
      <div style={{ maxWidth: maxw, margin: '0 auto' }}>

        <p style={{ ...label, color: c.white, margin: 0, ...rise(on, 0, reduced) }}>
          What I bring to applied AI
        </p>

        <h2 style={{
          fontFamily: f.display, fontWeight: 400,
          fontSize: 'clamp(38px, 5.2vw, 68px)', lineHeight: 1.06,
          letterSpacing: '-0.02em', color: c.white, margin: '24px 0 0', maxWidth: '19ch',
          ...rise(on, 70, reduced),
        }}>
          Four things, and where each one was earned.
        </h2>

        <div style={{ margin: '62px 0 0', borderTop: `1px solid ${c.rule}` }}>
          {BRINGS.map((b, i) => (
            <article
              key={b.n}
              className="ab-stack"
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(0, 290px) minmax(0, 1fr)',
                gap: '18px 56px',
                padding: 'clamp(30px, 4vh, 44px) 0',
                borderBottom: `1px solid ${c.rule}`,
                ...rise(on, 130 + i * 100, reduced),
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '12px' }}>
                  <span style={{ ...label, color: c.whiteFaint }}>{b.n}</span>
                  <h3 style={{
                    fontFamily: f.text, fontWeight: 600, fontSize: '18px',
                    lineHeight: 1.3, letterSpacing: '-0.005em',
                    color: c.white, margin: 0,
                  }}>
                    {b.capability}
                  </h3>
                </div>
                <p style={{
                  fontFamily: f.text, fontSize: '16px', lineHeight: 1.6,
                  color: c.whiteSoft, margin: 0, maxWidth: '34ch',
                }}>
                  {b.line}
                </p>
              </div>

              <div>
                {b.evidence.map((e, j) => (
                  <div
                    key={e.where}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: 'minmax(0, 150px) minmax(0, 1fr)',
                      gap: '10px 26px',
                      padding: j === 0 ? '0 0 14px' : '14px 0',
                      borderTop: j === 0 ? 'none' : `1px solid ${c.ruleSoft}`,
                    }}
                  >
                    <span style={{
                      ...label, fontSize: '10.5px', color: c.white,
                      paddingTop: '4px',
                    }}>
                      {e.where}
                    </span>
                    <p style={{
                      fontFamily: f.text, fontSize: '17.5px', lineHeight: 1.68,
                      color: c.whiteSoft, margin: 0, maxWidth: '58ch',
                    }}>
                      {e.what}
                    </p>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>

        <div style={{ margin: '40px 0 0', ...rise(on, 560, reduced) }}>
          <DownloadGate
            href="/documents/resume/Annabelle Body, HBS Class of 2026.pdf"
            label="Annabelle Body - CV"
            style={{
              display: 'inline-block',
              fontFamily: f.mono, fontSize: '12px', fontWeight: 500,
              letterSpacing: '0.14em', textTransform: 'uppercase',
              color: c.white, background: 'transparent',
              border: `1px solid ${c.rule}`, borderRadius: '2px',
              padding: '15px 24px 13px', textDecoration: 'none', cursor: 'pointer',
              transition: `border-color 0.35s ${EASE}`,
            }}
          >
            Full CV →
          </DownloadGate>
        </div>
      </div>
    </section>
  )
}
