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
import { c } from './theme'

// Responsive rules that inline styles cannot express.
const CSS = `
@media (max-width: 820px) {
  .ab-nav-list { display: none !important; }
  .ab-nav-toggle { display: block !important; }
}
@media (min-width: 821px) {
  .ab-nav-drawer { display: none !important; }
}
@media (max-width: 720px) {
  .ab-stack { grid-template-columns: 1fr !important; gap: 18px !important; }
}
`

export default function App() {
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
    <div id="top" style={{ background: c.paper, minHeight: '100vh' }}>
      <ScrollRail />
      <Nav />
      <main>
        <Hero />
        <CurrentBuild />
        <SelectedBuilds />
        <ThroughLine />
        <WhatIBring />
        <QuestionBand />
        <FieldNotes />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}
