import { useEffect } from 'react'
import { Nav, Footer, ScrollRail } from './components/Chrome'
import Hero from './components/Hero'
import CurrentBuild from './components/CurrentBuild'
import ThroughLine from './components/ThroughLine'
import SelectedBuilds from './components/SelectedBuilds'
import WhatIBring from './components/WhatIBring'
import QuestionBand from './components/QuestionBand'
import FieldNotes from './components/FieldNotes'
import ContactSection from './components/ContactSection'
import AboutOverlay, { useAboutOverlay } from './components/AboutOverlay'
import { c } from './theme'

// Responsive rules that inline styles cannot express.
const CSS = `
@keyframes heroSweep {
  0%, 100% { opacity: 0.4; transform: scaleX(0.55); }
  50%      { opacity: 1;   transform: scaleX(1); }
}
@media (max-width: 820px) {
  .ab-nav-list { display: none !important; }
  .ab-nav-toggle { display: block !important; }
}
@media (min-width: 821px) {
  .ab-nav-drawer { display: none !important; }
}
@media (max-width: 900px) {
  .ab-hero-copy { width: 88% !important; max-width: none !important; padding: 0 28px !important; }
  .ab-hero-hint { left: 28px !important; }
}
@media (max-width: 720px) {
  .ab-stack { grid-template-columns: 1fr !important; gap: 18px !important; }
  .ab-about-top { grid-template-columns: 1fr !important; gap: 28px !important; }
}
`

export default function App() {
  const [aboutOpen, closeAbout] = useAboutOverlay()

  useEffect(() => {
    const id = 'ab-responsive'
    if (!document.getElementById(id)) {
      const s = document.createElement('style')
      s.id = id
      s.textContent = CSS
      document.head.appendChild(s)
    }
  }, [])

  return (
    <div id="top" style={{ background: c.navy, minHeight: '100vh' }}>
      <ScrollRail />
      <Nav />
      <Hero />
      <main style={{ position: 'relative', zIndex: 2 }}>
        <CurrentBuild />
        <SelectedBuilds />
        <ThroughLine />
        <WhatIBring />
        <QuestionBand />
        <FieldNotes />
        <ContactSection />
      </main>
      <Footer />
      <AboutOverlay open={aboutOpen} onClose={closeAbout} />
    </div>
  )
}
