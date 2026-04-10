import { useState } from 'react'
import HeroTicker from './HeroTicker'

// ─── Palette ────────────────────────────────────────────────────────────────
const NAVY        = '#191A1A'
const NAVY_LIGHT  = '#222526'
const SLATE       = '#334155'
const SLATE_LIGHT = '#475569'
const CREAM       = '#F5F0E8'
const WHITE       = '#FFFFFF'
const ORANGE      = '#E8534E'
const ORANGE_DIM  = 'rgba(244,98,42,0.12)'

// ─── Shared styles ──────────────────────────────────────────────────────────
const serif = "'Cormorant Garamond', serif"
const sans  = "'Cormorant Garamond', serif"

const tag = {
  display: 'inline-block',
  fontFamily: sans,
  fontSize: '11px',
  fontWeight: '600',
  letterSpacing: '0.12em',
  textTransform: 'uppercase',
  color: ORANGE,
  marginBottom: '16px',
}

const sectionLabel = (text) => <p style={tag}>{text}</p>

const h2 = {
  fontFamily: serif,
  fontSize: 'clamp(32px, 5vw, 52px)',
  fontWeight: '700',
  color: WHITE,
  margin: '0 0 20px',
  lineHeight: 1.15,
}

const bodyText = {
  fontFamily: sans,
  fontSize: '17px',
  lineHeight: 1.75,
  color: CREAM,
  opacity: 0.85,
  margin: '0 0 28px',
}

const orangeBtn = {
  display: 'inline-block',
  fontFamily: sans,
  fontSize: '14px',
  fontWeight: '600',
  color: WHITE,
  background: ORANGE,
  border: 'none',
  borderRadius: '4px',
  padding: '14px 28px',
  cursor: 'pointer',
  letterSpacing: '0.05em',
  textDecoration: 'none',
  transition: 'opacity 0.2s',
}

const outlineBtn = {
  display: 'inline-block',
  fontFamily: sans,
  fontSize: '14px',
  fontWeight: '500',
  color: CREAM,
  background: 'transparent',
  border: `1px solid rgba(245,240,232,0.3)`,
  borderRadius: '4px',
  padding: '13px 28px',
  cursor: 'pointer',
  letterSpacing: '0.05em',
  textDecoration: 'none',
  transition: 'border-color 0.2s',
}

const divider = {
  width: '48px',
  height: '3px',
  background: ORANGE,
  margin: '0 0 32px',
  borderRadius: '2px',
}

// ─── Hero ────────────────────────────────────────────────────────────────────
function Hero() {
  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      overflow: 'hidden',
      background: NAVY,
    }}>
      {/* Full-bleed background photo — full colour, no mask */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: "url('/Gemini_Generated_Image_6sjhg96sjhg96sjh.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
      }} />

      {/* Ticker — left side, vertically centered */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: 0,
        width: '38%',
        transform: 'translateY(-50%)',
        zIndex: 10,
      }}>
        <HeroTicker overlayOpacity={0.6} align="left" />
      </div>
    </section>
  )
}

// ─── Currently Thinking ──────────────────────────────────────────────────────
const THOUGHTS = [
  {
    tag: 'Fertility',
    text: 'Why declining birth rates are a food systems problem as much as an economic one.',
  },
  {
    tag: 'Food Systems',
    text: 'The "qualitarian" case: spending more on food inputs is the most rational health investment.',
  },
  {
    tag: 'Longevity',
    text: 'Healthspan vs. lifespan — and why the distinction changes everything about how we eat.',
  },
]

function CurrentlyThinking() {
  return (
    <section style={{ background: NAVY_LIGHT, padding: '100px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {sectionLabel('Currently Thinking About')}
        <div style={divider} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px', marginTop: '8px' }}>
          {THOUGHTS.map((t, i) => (
            <div key={i} style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: '8px',
              padding: '32px',
              borderTop: `3px solid ${ORANGE}`,
            }}>
              <p style={{ ...tag, marginBottom: '12px' }}>{t.tag}</p>
              <p style={{ fontFamily: serif, fontSize: '20px', color: WHITE, lineHeight: 1.4, margin: 0 }}>
                "{t.text}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── What I've Built ─────────────────────────────────────────────────────────
const BUILDS = [
  {
    num: '01',
    title: 'Mama Mosaic',
    desc: 'A community hub for mothers navigating nutrition, fertility, and the early years — connecting evidence-based tools with lived experience.',
    href: 'https://mama-mosaic-hub.lovable.app',
    cta: 'Visit Mama Mosaic',
    external: true,
  },
  {
    num: '02',
    title: 'Verifood',
    desc: 'An AI tool that decodes food labels in seconds — because you shouldn\'t need a PhD to know what you\'re eating.',
    href: 'https://verifood.app/',
    cta: 'Visit Verifood',
    external: true,
  },
  {
    num: '03',
    title: 'Gratitude App',
    desc: 'A social wellness app built around daily gratitude — coming soon.',
    href: '#',
    cta: 'Coming Soon',
    external: false,
    placeholder: true,
  },
]

function Pillars() {
  return (
    <section style={{ background: NAVY, padding: '100px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {sectionLabel('What I\'ve Built')}
        <div style={divider} />
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2px' }}>
          {BUILDS.map((p, i) => (
            <a
              key={i}
              href={p.href}
              target={p.external ? '_blank' : undefined}
              rel={p.external ? 'noreferrer' : undefined}
              style={{
                display: 'block',
                padding: '48px 40px',
                background: p.placeholder ? 'rgba(255,255,255,0.01)' : 'rgba(255,255,255,0.02)',
                borderRight: i < 2 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                textDecoration: 'none',
                transition: 'background 0.2s',
                opacity: p.placeholder ? 0.5 : 1,
              }}
              onMouseEnter={e => !p.placeholder && (e.currentTarget.style.background = 'rgba(232,83,78,0.06)')}
              onMouseLeave={e => !p.placeholder && (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')}
            >
              <p style={{ fontFamily: sans, fontSize: '12px', color: ORANGE, letterSpacing: '0.15em', marginBottom: '24px', fontWeight: '600' }}>
                {p.num}
              </p>
              <h3 style={{ fontFamily: serif, fontSize: '28px', color: WHITE, margin: '0 0 16px' }}>{p.title}</h3>
              <p style={{ fontFamily: sans, fontSize: '17px', color: CREAM, opacity: 0.7, lineHeight: 1.7, margin: '0 0 28px' }}>{p.desc}</p>
              <span style={{ fontFamily: sans, fontSize: '15px', color: p.placeholder ? CREAM : ORANGE, fontWeight: '600', letterSpacing: '0.06em', opacity: p.placeholder ? 0.4 : 1 }}>
                {p.cta} {!p.placeholder && '→'}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── About ───────────────────────────────────────────────────────────────────
function About() {
  return (
    <section id="about" style={{ background: NAVY_LIGHT, padding: '120px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <div>
          {sectionLabel('About')}
          <div style={divider} />
          <h2 style={h2}>I believe the food we eat is the most underrated lever for human flourishing.</h2>
          <p style={bodyText}>
            I'm Annabelle — an HBS MBA candidate, founder of Verifood, and researcher working at the intersection of food systems, fertility, and healthspan. Previously at Deloitte, now building at the frontier of nutrition science and applied AI.
          </p>
          <p style={bodyText}>
            My work is grounded in a simple belief: the quality of our inputs — food, information, relationships — determines the quality of our outputs as humans. I call this the qualitarian principle.
          </p>
          <a href="#contact" style={orangeBtn}>Work With Me</a>
        </div>
        <div style={{
          aspectRatio: '3/4',
          background: SLATE,
          borderRadius: '4px',
          overflow: 'hidden',
          border: `1px solid rgba(255,255,255,0.08)`,
        }}>
          <img
            src="/images/photo-headshot.png"
            alt="Annabelle Body"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'top' }}
          />
        </div>
      </div>
    </section>
  )
}

// ─── Research ────────────────────────────────────────────────────────────────
const PAPERS = [
  {
    title: 'Declining Birth Rates and the Food Systems Connection',
    venue: 'Harvard Business School',
    date: '2025',
    desc: 'Examining how ultra-processed food environments correlate with declining fertility rates across OECD nations, and the policy interventions most likely to reverse the trend.',
    href: '/birth-rates-paper.pdf',
    keywords: ['Fertility', 'Food Systems', 'Public Health'],
  },
]

function Research() {
  return (
    <section id="research" style={{ background: NAVY, padding: '120px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {sectionLabel('Research')}
        <div style={divider} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '48px', flexWrap: 'wrap', gap: '24px' }}>
          <h2 style={{ ...h2, margin: 0, maxWidth: '600px' }}>Papers & Academic Work</h2>
          <p style={{ fontFamily: sans, fontSize: '14px', color: CREAM, opacity: 0.5 }}>More papers coming soon</p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {PAPERS.map((p, i) => (
            <a key={i} href={p.href} target="_blank" rel="noreferrer" style={{
              display: 'block',
              padding: '40px 48px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.06)',
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'border-color 0.2s, background 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = ORANGE; e.currentTarget.style.background = ORANGE_DIM }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.06)'; e.currentTarget.style.background = 'rgba(255,255,255,0.02)' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '24px', flexWrap: 'wrap' }}>
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: sans, fontSize: '12px', color: ORANGE, fontWeight: '600', letterSpacing: '0.1em', marginBottom: '12px' }}>
                    {p.venue} · {p.date}
                  </p>
                  <h3 style={{ fontFamily: serif, fontSize: '22px', color: WHITE, margin: '0 0 12px', lineHeight: 1.3 }}>{p.title}</h3>
                  <p style={{ fontFamily: sans, fontSize: '15px', color: CREAM, opacity: 0.7, lineHeight: 1.7, margin: '0 0 20px' }}>{p.desc}</p>
                  <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                    {p.keywords.map(k => (
                      <span key={k} style={{
                        fontFamily: sans,
                        fontSize: '11px',
                        color: CREAM,
                        opacity: 0.5,
                        border: '1px solid rgba(245,240,232,0.2)',
                        borderRadius: '2px',
                        padding: '4px 10px',
                        letterSpacing: '0.06em',
                      }}>{k}</span>
                    ))}
                  </div>
                </div>
                <span style={{ fontFamily: sans, fontSize: '13px', color: ORANGE, fontWeight: '600', whiteSpace: 'nowrap' }}>
                  Read Paper →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Verifood ────────────────────────────────────────────────────────────────
function Verifood() {
  return (
    <section id="verifood" style={{ background: NAVY_LIGHT, padding: '120px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px', alignItems: 'center' }}>
        <div>
          {sectionLabel('Verifood')}
          <div style={divider} />
          <h2 style={h2}>Decode your food label in seconds.</h2>
          <p style={bodyText}>
            Verifood is an AI-powered tool that analyses food ingredients and nutrition labels — giving you a clear, honest verdict on what you're actually eating.
          </p>
          <p style={bodyText}>
            Built for people who care about quality but don't have time to decode every label. No jargon. No greenwashing. Just clarity.
          </p>
          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <a href="https://github.com/belleaitest-png/VeriFood" target="_blank" rel="noreferrer" style={orangeBtn}>
              Try Verifood
            </a>
            <a href="#contact" style={outlineBtn}>Partner With Us</a>
          </div>
        </div>
        <div style={{
          background: 'rgba(255,255,255,0.03)',
          border: '1px solid rgba(255,255,255,0.08)',
          borderRadius: '12px',
          padding: '48px',
          display: 'flex',
          flexDirection: 'column',
          gap: '24px',
        }}>
          {[
            { icon: '🔍', label: 'Ingredient Analysis', desc: 'Flags additives, preservatives, and ultra-processed ingredients instantly' },
            { icon: '📊', label: 'Nutrition Clarity', desc: 'Contextualises macros and micros against your health goals' },
            { icon: '✅', label: 'Honest Verdict', desc: 'A clear pass/flag/avoid rating — no paid partnerships, no bias' },
          ].map((f, i) => (
            <div key={i} style={{ display: 'flex', gap: '20px', alignItems: 'flex-start' }}>
              <span style={{ fontSize: '24px' }}>{f.icon}</span>
              <div>
                <p style={{ fontFamily: sans, fontSize: '15px', fontWeight: '600', color: WHITE, margin: '0 0 6px' }}>{f.label}</p>
                <p style={{ fontFamily: sans, fontSize: '14px', color: CREAM, opacity: 0.65, margin: 0, lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ─── Writing / Newsletter ────────────────────────────────────────────────────
const ESSAYS = [
  {
    title: 'The Qualitarian Manifesto',
    date: 'Coming soon',
    desc: 'Why spending more on food is the most rational investment you can make in yourself.',
  },
  {
    title: 'What Fertility Data Tells Us About Modern Food',
    date: 'Coming soon',
    desc: 'Connecting the dots between ultra-processed diets and declining birth rates across the developed world.',
  },
  {
    title: 'The HBS Food Systems Course Nobody Is Teaching',
    date: 'Coming soon',
    desc: 'What business schools get wrong about agriculture, nutrition science, and incentive structures.',
  },
]

function Writing() {
  return (
    <section id="writing" style={{ background: NAVY, padding: '120px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        {sectionLabel('Writing')}
        <div style={divider} />
        <div style={{ display: 'grid', gridTemplateColumns: '5fr 4fr', gap: '80px', alignItems: 'start' }}>
          <div>
            <h2 style={h2}>Essays on food, fertility, and the systems that shape us.</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginTop: '40px' }}>
              {ESSAYS.map((e, i) => (
                <div key={i} style={{
                  padding: '28px',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '6px',
                  borderLeft: `3px solid ${ORANGE}`,
                }}>
                  <p style={{ fontFamily: sans, fontSize: '11px', color: ORANGE, fontWeight: '600', letterSpacing: '0.1em', marginBottom: '10px' }}>{e.date}</p>
                  <h4 style={{ fontFamily: serif, fontSize: '18px', color: WHITE, margin: '0 0 10px' }}>{e.title}</h4>
                  <p style={{ fontFamily: sans, fontSize: '14px', color: CREAM, opacity: 0.65, margin: 0, lineHeight: 1.65 }}>{e.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Newsletter CTA */}
          <div style={{
            background: ORANGE_DIM,
            border: `1px solid rgba(244,98,42,0.25)`,
            borderRadius: '8px',
            padding: '48px 40px',
            position: 'sticky',
            top: '100px',
          }}>
            <p style={tag}>Newsletter</p>
            <h3 style={{ fontFamily: serif, fontSize: '26px', color: WHITE, margin: '0 0 16px', lineHeight: 1.3 }}>
              Thinking clearly about food, fertility, and performance.
            </h3>
            <p style={{ fontFamily: sans, fontSize: '15px', color: CREAM, opacity: 0.75, lineHeight: 1.7, margin: '0 0 28px' }}>
              Occasional dispatches on research, ideas, and what I'm building. No noise.
            </p>
            <input
              type="email"
              placeholder="your@email.com"
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: '4px',
                color: WHITE,
                fontFamily: sans,
                fontSize: '15px',
                marginBottom: '12px',
                boxSizing: 'border-box',
                outline: 'none',
              }}
            />
            <button style={{ ...orangeBtn, width: '100%', textAlign: 'center', border: 'none' }}>
              Subscribe
            </button>
            <p style={{ fontFamily: sans, fontSize: '12px', color: CREAM, opacity: 0.4, marginTop: '12px', textAlign: 'center' }}>
              No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

// ─── Contact ─────────────────────────────────────────────────────────────────
const INQUIRY_TYPES = [
  { title: 'Research Collaboration', desc: 'Food systems, fertility, or healthspan research partnerships.' },
  { title: 'Speaking & Events', desc: 'Panels, keynotes, and academic or industry events.' },
  { title: 'Verifood & Ventures', desc: 'Investment, integration, or commercial partnership inquiries.' },
  { title: 'Media & Press', desc: 'Interviews, features, and editorial collaborations.' },
]

function Contact() {
  return (
    <section id="contact" style={{ background: NAVY_LIGHT, padding: '120px 48px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '80px' }}>
        <div>
          {sectionLabel('Contact')}
          <div style={divider} />
          <h2 style={h2}>Let's work together.</h2>
          <p style={bodyText}>
            I'm open to research collaborations, speaking invitations, and strategic partnerships that align with my work in food systems, fertility, and healthspan.
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '32px' }}>
            {INQUIRY_TYPES.map((t, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '4px', height: '4px', borderRadius: '50%', background: ORANGE, marginTop: '10px', flexShrink: 0 }} />
                <div>
                  <p style={{ fontFamily: sans, fontSize: '15px', fontWeight: '600', color: WHITE, margin: '0 0 4px' }}>{t.title}</p>
                  <p style={{ fontFamily: sans, fontSize: '14px', color: CREAM, opacity: 0.6, margin: 0 }}>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <form style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
          onSubmit={e => { e.preventDefault(); alert('Message sent! I\'ll be in touch shortly.') }}>
          {[
            { label: 'Name', type: 'text', placeholder: 'Your name' },
            { label: 'Email', type: 'email', placeholder: 'your@email.com' },
            { label: 'Organisation', type: 'text', placeholder: 'Company or institution' },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontFamily: sans, fontSize: '12px', color: CREAM, opacity: 0.6, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
                {f.label}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                style={{
                  width: '100%',
                  padding: '14px 16px',
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '4px',
                  color: WHITE,
                  fontFamily: sans,
                  fontSize: '15px',
                  boxSizing: 'border-box',
                  outline: 'none',
                }}
              />
            </div>
          ))}
          <div>
            <label style={{ fontFamily: sans, fontSize: '12px', color: CREAM, opacity: 0.6, letterSpacing: '0.08em', textTransform: 'uppercase', display: 'block', marginBottom: '8px' }}>
              Message
            </label>
            <textarea
              rows={5}
              placeholder="Tell me about the collaboration or opportunity..."
              style={{
                width: '100%',
                padding: '14px 16px',
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '4px',
                color: WHITE,
                fontFamily: sans,
                fontSize: '15px',
                boxSizing: 'border-box',
                resize: 'vertical',
                outline: 'none',
              }}
            />
          </div>
          <button type="submit" style={{ ...orangeBtn, border: 'none', marginTop: '8px' }}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  )
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer style={{ background: '#101212', padding: '48px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '24px' }}>
        <p style={{ fontFamily: serif, fontSize: '18px', color: WHITE, margin: 0, fontWeight: '600' }}>Annabelle Body</p>
        <p style={{ fontFamily: sans, fontSize: '13px', color: CREAM, opacity: 0.35, margin: 0 }}>
          © {new Date().getFullYear()} Annabelle Body · HBS MBA · Founder, Verifood
        </p>
        <div style={{ display: 'flex', gap: '24px' }}>
          {['LinkedIn', 'Instagram', 'Substack'].map(s => (
            <a key={s} href="#" style={{ fontFamily: sans, fontSize: '13px', color: CREAM, opacity: 0.45, textDecoration: 'none', transition: 'opacity 0.2s' }}
              onMouseEnter={e => e.target.style.opacity = 1}
              onMouseLeave={e => e.target.style.opacity = 0.45}
            >
              {s}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}

// ─── Export ───────────────────────────────────────────────────────────────────
export default function Sections() {
  return (
    <>
      <Hero />
      <Pillars />
      <CurrentlyThinking />
      <About />
      <Research />
      <Verifood />
      <Writing />
      <Contact />
      <Footer />
    </>
  )
}