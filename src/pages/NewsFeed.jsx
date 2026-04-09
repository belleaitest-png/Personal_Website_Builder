const CORAL = '#D47860'
const CREAM = '#F5F0E8'
const NAVY_LIGHT = '#0B1F3A'

export default function NewsFeed() {
  return (
    <section style={{
      padding: '100px 48px', background: NAVY_LIGHT,
      borderTop: '1px solid rgba(212,120,96,0.08)',
    }}>
      <div style={{ maxWidth: 1080, margin: '0 auto' }}>
        <div style={{
          fontSize: 11, letterSpacing: '.18em', textTransform: 'uppercase',
          color: CORAL, marginBottom: 16, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <span style={{ width: 24, height: 1, background: CORAL, display: 'block' }} />
          News Feed
        </div>
        <h2 style={{
          fontFamily: "'Cormorant Garamond',Georgia,serif",
          fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 300,
          color: CREAM, margin: '0 0 24px', lineHeight: 1.1,
        }}>
          What I'm reading and <em style={{ fontStyle: 'italic', color: CORAL }}>sharing.</em>
        </h2>
        <p style={{
          fontSize: 15, color: 'rgba(245,240,232,0.45)', lineHeight: 1.7, maxWidth: 520,
        }}>
          A curated feed of articles, research, and conversations at the intersection of food, health, and technology. Coming soon.
        </p>
      </div>
    </section>
  )
}