import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import HeroVideoBackground from '../components/HeroVideoBackground.jsx'
import TypingHeadline from '../components/TypingHeadline.jsx'
import QuoteBlock from '../components/QuoteBlock.jsx'
import TechBelt from '../components/TechBelt.jsx'
import ServiceCard from '../components/ServiceCard.jsx'
import ServiceDetailPane from '../components/ServiceDetailPane.jsx'
import ScrollingCardRail from '../components/ScrollingCardRail.jsx'
import ChooseOrLaunchPrompt from '../components/ChooseOrLaunchPrompt.jsx'
import ProjectProgressPanel from '../components/ProjectProgressPanel.jsx'
import ClarifyBox from '../components/ClarifyBox.jsx'
import { useApp } from '../context/AppContext.jsx'
import { serviceCatalog } from '../data/serviceCatalog.js'

export default function Home() {
  const { role, t } = useApp()
  const [openServiceId, setOpenServiceId] = useState(null)
  const openService = serviceCatalog.find((s) => s.id === openServiceId) ?? null

  // Developers and admins land on their dashboard first.
  if (role === 'developer' || role === 'admin') {
    return <Navigate to="/dashboard" replace />
  }

  return (
    <div>
      {/* Hero */}
      <section className="relative container-page pt-16 pb-8 overflow-hidden">
        <HeroVideoBackground />
        <div className="max-w-2xl">
          <TypingHeadline lines={[t('hero_line1'), t('hero_line2')]} loop className="mt-5" />
          <p className="text-fg-muted mt-5 text-base md:text-lg max-w-md leading-relaxed">
            Aspect designs, builds, and ships full-stack products, then keeps the engineering visible
            long after launch.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            <Link
              to="/start-a-project"
              className="px-5 py-3 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring"
            >
              {t('start_project')}
            </Link>
            <Link
              to="/services"
              className="px-5 py-3 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring"
            >
              Peek at our works
            </Link>
          </div>
        </div>
      </section>

      {/* Why work with us — quote, no card background */}
      <section className="container-page py-10">
        <QuoteBlock>
          We're an enterprise studio that would rather ship working software than perform busywork. Every
          engagement comes with a live client dashboard, transparent pricing, and a team that answers its own
          Office Hours - no account managers standing between you and the people writing your code...
        </QuoteBlock>
      </section>

      <TechBelt />

      {/* Two-pane: What we build */}
      <section className="container-page py-16">
        <h2 className="font-display text-2xl mb-1 reveal in-view">{t('what_we_build')}</h2>
        <p className="text-fg-muted mb-8 reveal in-view">
          Autonomous Display : select a card for its tech stack and pricing, or launch a fresh project.
        </p>

        <div className="grid lg:grid-cols-2 gap-6">
          <ScrollingCardRail>
            {serviceCatalog.map((s) => (
              <ServiceCard
                key={s.id}
                service={s}
                active={openServiceId === s.id}
                onClick={() => setOpenServiceId(openServiceId === s.id ? null : s.id)}
              />
            ))}
          </ScrollingCardRail>

          <div className="glass rounded-2xl p-6">
            {openService ? <ServiceDetailPane service={openService} /> : <ChooseOrLaunchPrompt />}
          </div>
        </div>

        <ClarifyBox />
      </section>

      {/* Dashboard preview replaces "recent work" for client / end-user / visitor */}
      <section className="container-page py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="font-display text-2xl mb-1">My dashboard🗠</h2>
            <p className="text-fg-muted">Live status on whatever you've got in motion with us.</p>
          </div>
          <Link to="/dashboard" className="text-sm text-signal-bright hover:underline focus-ring">
            Invoke full dashboard ⮚
          </Link>
        </div>
        <ProjectProgressPanel />
      </section>
    </div>
  )
}
