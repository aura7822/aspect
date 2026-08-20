import { useState } from 'react'
import { Link } from 'react-router-dom'
import CaseStudyCard from '../components/CaseStudyCard.jsx'
import GlassCard from '../components/GlassCard.jsx'
import { serviceCatalog as services } from '../data/serviceCatalog.js'
import { caseStudies } from '../data/caseStudies.js'

const testimonials = [
  { quote: 'Aspect shipped in six weeks what our last vendor quoted six months for.', name: 'Rhea Patel', role: 'CTO, Ledgerly' },
  { quote: 'The client dashboard made it feel like we had an internal team, not a contractor.', name: 'Jon Ferreira', role: 'Founder, VitalPath' },
  { quote: 'Their transparency dashboard is the first thing I show new hires.', name: 'Sam Okafor', role: 'VP Eng, Kernow Market' },
]

export default function Services() {
  const [filter, setFilter] = useState('all')
  const shown = filter === 'all' ? caseStudies : caseStudies.filter((c) => c.service === filter)

  return (
    <div className="container-page py-16">
      <h1 className="font-display text-3xl mb-2">☭ Services &amp; portfolio</h1>
      <p className="text-fg-muted max-w-xl mb-10">
        Four practice areas, one delivery standard. Every engagement ships with the same transparency tools
        you'll see below.
      </p>

      <div className="flex flex-wrap gap-2 mb-10">
        <button
          onClick={() => setFilter('all')}
          className={`px-3.5 py-1.5 text-sm rounded-full border focus-ring ${
            filter === 'all' ? 'border-signal text-signal-bright bg-signal/10' : 'border-subtle text-fg-secondary'
          }`}
        >
          All
        </button>
        {services.map((s) => (
          <button
            key={s.id}
            onClick={() => setFilter(s.id)}
            className={`px-3.5 py-1.5 text-sm rounded-full border focus-ring ${
              filter === s.id ? 'border-signal text-signal-bright bg-signal/10' : 'border-subtle text-fg-secondary'
            }`}
          >
            {s.name}
          </button>
        ))}
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {shown.map((c) => (
          <CaseStudyCard key={c.slug} study={c} />
        ))}
      </div>

      <h2 className="font-display text-2xl mb-6">❖ What clients remark</h2>
      <div className="grid md:grid-cols-3 gap-5 mb-20">
        {testimonials.map((t) => (
          <GlassCard key={t.name} className="p-5">
            <p className="text-sm text-fg-secondary leading-relaxed">&ldquo;{t.quote}&rdquo;</p>
            <div className="mt-4 text-xs font-mono text-fg-muted">
              {t.name} — {t.role}
            </div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-8 text-center">
        <h3 className="font-display text-xl mb-2">Not sure which service fits?</h3>
        <p className="text-fg-muted mb-5">Send us a POC request , we'll route it to the right team.</p>
        <Link to="/start-a-project" className="inline-flex px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium focus-ring">
          Start a project
        </Link>
      </GlassCard>
    </div>
  )
}
