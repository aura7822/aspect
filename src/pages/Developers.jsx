import { User, Briefcase, BookOpen, GitBranch, ExternalLink } from 'lucide-react'
import GlassCard from '../components/GlassCard.jsx'
import ContributionHeatmap from '../components/ContributionHeatmap.jsx'
import DeveloperInteractionHub from '../components/DeveloperInteractionHub.jsx'
import ReportMisconduct from '../components/ReportMisconduct.jsx'
import WhyYouMatter from '../components/WhyYouMatter.jsx'
import { HERO_MEDIA_URL, HERO_MEDIA_TYPE } from '../data/brand.js'
import { useApp } from '../context/AppContext.jsx'

export default function Developers() {
  // Real data from GET /api/developers (see AppContext) — no more static
  // mock file. If the backend has no developer accounts yet, this list is
  // genuinely empty rather than showing invented names.
  const { developers } = useApp()
  return (
    <div>
      {/* Dynamic banner */}
      <div className="relative h-64 md:h-80 overflow-hidden">
        {HERO_MEDIA_URL ? (
          HERO_MEDIA_TYPE === 'video' ? (
            <video className="w-full h-full object-cover" src={HERO_MEDIA_URL} autoPlay muted loop playsInline />
          ) : (
            <img className="w-full h-full object-cover" src={HERO_MEDIA_URL} alt="" />
          )
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-signal/15 via-transparent to-gold/10" />
        )}
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--page-bg)', opacity: 0.55 }} />
        <div className="absolute inset-0 flex items-end">
          <div className="container-page pb-6">
            <h1 className="font-display text-3xl text-fg-primary">Developers</h1>
            <p className="text-fg-secondary max-w-xl">🖧 Tech gurus responsible for client satisfaction</p>
          </div>
        </div>
      </div>

      <div className="container-page py-12">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-16">
          {developers.map((d) => (
            <GlassCard key={d.id} className="p-5">
              <div className="flex items-center gap-3 mb-4">
                <span className="w-12 h-12 rounded-full bg-surface-2 flex items-center justify-center overflow-hidden shrink-0">
                  {d.avatar ? <img src={d.avatar} alt="" className="w-full h-full object-cover" /> : <User size={20} className="text-fg-muted" />}
                </span>
                <div>
                  <div className="text-sm text-fg-primary">{d.name}</div>
                  <div className="text-xs text-fg-muted">{d.role}</div>
                </div>
              </div>

              <div className="text-[10px] font-mono uppercase tracking-wide text-fg-muted mb-2">Activity chart</div>
              <ContributionHeatmap seed={d.id.length + d.name.length} />

              <div className="grid grid-cols-2 gap-2 mt-4">
                <a
                  href={d.portfolio}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-subtle text-xs text-fg-secondary hover:border-strong focus-ring"
                >
                  <Briefcase size={12} /> Portfolio
                </a>
                <a
                  href={d.blog}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-subtle text-xs text-fg-secondary hover:border-strong focus-ring"
                >
                  <BookOpen size={12} /> Tech blog
                </a>
                <a
                  href={d.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-subtle text-xs text-fg-secondary hover:border-strong focus-ring"
                >
                  <GitBranch size={12} /> GitHub
                </a>
                <a
                  href={d.openSource}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg border border-subtle text-xs text-fg-secondary hover:border-strong focus-ring"
                >
                  <ExternalLink size={12} /> Open source
                </a>
              </div>
            </GlassCard>
          ))}
        </div>

        <DeveloperInteractionHub />

        <div className="mt-6">
          <ReportMisconduct />
        </div>
        <div className="mt-6">
          <WhyYouMatter />
        </div>
      </div>

    </div>
  )
}
