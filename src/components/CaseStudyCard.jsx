import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Play, Volume2, VolumeX } from 'lucide-react'
import GlassCard from './GlassCard.jsx'
import TechBadge from './TechBadge.jsx'

export default function CaseStudyCard({ study }) {
  const [muted, setMuted] = useState(true)
  const [playing, setPlaying] = useState(false)

  return (
    <GlassCard className="overflow-hidden group animate-fade_in">
      <Link to={`/case-studies/${study.slug}`} className="block focus-ring">
        <div
          className="relative aspect-video bg-gradient-to-br from-ink-700 to-ink-800 flex items-center justify-center overflow-hidden"
          onMouseEnter={() => setPlaying(true)}
          onMouseLeave={() => setPlaying(false)}
        >
          {/* Simulated Sprint Reel: scrubbing gradient stands in for a video timelapse */}
          <div
            className={`absolute inset-0 opacity-40 transition-transform duration-[6000ms] ${playing ? 'scale-125' : 'scale-100'}`}
            style={{
              background: `linear-gradient(120deg, #C9972B33, #3E9E6E22, #C4832A22)`,
            }}
          />
          <span className="relative font-mono text-xs text-fg-secondary bg-black/40 px-2 py-1 rounded">
            {playing ? 'Sprint Reel · 0:0{i}s'.replace('{i}', String((Date.now() % 6))) : '60s Sprint Reel'}
          </span>
          {!playing && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-11 h-11 rounded-full bg-black/50 flex items-center justify-center">
                <Play size={16} className="text-white ml-0.5" />
              </div>
            </div>
          )}
          <button
            onClick={(e) => {
              e.preventDefault()
              setMuted((m) => !m)
            }}
            className="absolute bottom-2 right-2 p-1.5 rounded-full bg-black/50 text-white focus-ring"
            aria-label="Toggle mute"
          >
            {muted ? <VolumeX size={13} /> : <Volume2 size={13} />}
          </button>
        </div>

        <div className="p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-mono text-fg-muted">{study.industry}</span>
            <span className="w-7 h-7 rounded-md bg-surface-1 flex items-center justify-center text-[10px] font-mono text-fg-secondary">
              {study.logo}
            </span>
          </div>
          <h3 className="font-display text-base text-fg-primary leading-snug">{study.title}</h3>
          <div className="grid grid-cols-3 gap-2 mt-4">
            {study.metrics.slice(0, 3).map((m) => (
              <div key={m.label}>
                <div className="font-mono text-sm text-signal-bright">{m.value}</div>
                <div className="text-[10px] text-fg-muted mt-0.5 leading-tight">{m.label}</div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-1.5 mt-4">
            {study.stack.map((s) => (
              <TechBadge key={s} name={s} />
            ))}
          </div>
        </div>
      </Link>
    </GlassCard>
  )
}
