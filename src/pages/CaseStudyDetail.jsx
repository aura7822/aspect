import { useParams, Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Play, Volume2, VolumeX, ArrowLeft } from 'lucide-react'
import { caseStudies } from '../data/caseStudies.js'
import TechBadge from '../components/TechBadge.jsx'
import GlassCard from '../components/GlassCard.jsx'
import NotFound from './NotFound.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function CaseStudyDetail() {
  const { slug } = useParams()
  const navigate = useNavigate()
  const { role, pushToast } = useApp()
  const study = caseStudies.find((c) => c.slug === slug)
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)

  if (!study) return <NotFound />

  return (
    <div className="container-page py-16 max-w-4xl">
      <Link to="/services" className="inline-flex items-center gap-1.5 text-sm text-fg-muted hover:text-fg-primary mb-8 focus-ring">
        <ArrowLeft size={15} /> Back to portfolio
      </Link>

      <span className="text-xs font-mono text-fg-muted">{study.industry}</span>
      <h1 className="font-display text-3xl md:text-4xl mt-2 mb-6 leading-tight">{study.title}</h1>

      <div
        className="relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br from-ink-700 to-ink-800 flex items-center justify-center mb-8"
        onMouseEnter={() => setPlaying(true)}
        onMouseLeave={() => setPlaying(false)}
      >
        <div
          className={`absolute inset-0 opacity-40 transition-transform duration-[6000ms] ${playing ? 'scale-125' : 'scale-100'}`}
          style={{ background: 'linear-gradient(120deg, #C9972B33, #3E9E6E22, #C4832A22)' }}
        />
        {!playing && (
          <div className="w-14 h-14 rounded-full bg-black/50 flex items-center justify-center relative">
            <Play size={20} className="text-white ml-0.5" />
          </div>
        )}
        <span className="absolute top-3 left-3 font-mono text-xs text-fg-secondary bg-black/40 px-2 py-1 rounded">
          Sprint Reel — 60s timelapse
        </span>
        <button
          onClick={() => setMuted((m) => !m)}
          className="absolute bottom-3 right-3 p-2 rounded-full bg-black/50 text-white focus-ring"
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
        </button>
      </div>

      <div className="grid sm:grid-cols-3 gap-4 mb-8">
        {study.metrics.map((m) => (
          <GlassCard key={m.label} className="p-4 text-center">
            <div className="font-mono text-2xl text-signal-bright">{m.value}</div>
            <div className="text-xs text-fg-muted mt-1">{m.label}</div>
          </GlassCard>
        ))}
      </div>

      <p className="text-fg-secondary leading-relaxed text-base mb-8">{study.summary}</p>

      <div className="flex flex-wrap gap-2 mb-12">
        {study.stack.map((s) => (
          <TechBadge key={s} name={s} />
        ))}
      </div>

      <GlassCard className="p-8 text-center">
        <h3 className="font-display text-xl mb-2">Have something like this in mind?</h3>
        <button
          onClick={() => {
            if (role === 'visitor') {
              pushToast({ title: 'Please log in', message: 'Sign in to launch a project.' })
              navigate('/login', { state: { from: `/case-studies/${slug}` } })
              return
            }
            navigate('/start-a-project')
          }}
          className="inline-flex px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium focus-ring mt-2"
        >
          Launch a project
        </button>
      </GlassCard>
    </div>
  )
}
