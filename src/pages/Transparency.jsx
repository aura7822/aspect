import { useState } from 'react'
import { Play, Bookmark, BookmarkCheck, Search, Bell } from 'lucide-react'
import HealthDashboard from '../components/HealthDashboard.jsx'
import GlassCard from '../components/GlassCard.jsx'
import { postmortems } from '../data/health.js'
import { useApp } from '../context/AppContext.jsx'

const walkthroughs = [
  { id: 'w1', title: 'Cutting P99 latency with connection pooling', domain: 'Performance', duration: '8:12' },
  { id: 'w2', title: 'Rate-limiting public endpoints without breaking clients', domain: 'Security', duration: '11:04' },
  { id: 'w3', title: 'Debugging a WebSocket reconnect storm', domain: 'Performance', duration: '6:47' },
  { id: 'w4', title: 'Argon2id vs bcrypt for password hashing', domain: 'Security', duration: '5:30' },
  { id: 'w5', title: 'Designing role-scoped API authorization', domain: 'Architecture', duration: '9:58' },
  { id: 'w6', title: 'Index tuning a Postgres reconciliation job', domain: 'Performance', duration: '7:21' },
]

export default function Transparency() {
  const { pushToast } = useApp()
  const [query, setQuery] = useState('')
  const [saved, setSaved] = useState([])
  const [subscribed, setSubscribed] = useState(false)

  const filtered = walkthroughs.filter(
    (w) => w.title.toLowerCase().includes(query.toLowerCase()) || w.domain.toLowerCase().includes(query.toLowerCase())
  )

  function toggleSave(id) {
    setSaved((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]))
  }

  function subscribe() {
    setSubscribed(true)
    pushToast({ title: 'Subscribed to status alerts', message: 'You will get an email if uptime dips below target.' })
  }

  return (
    <div className="container-page py-16">
      <div className="flex flex-wrap items-start justify-between gap-4 mb-10">
        <div>
          <h1 className="font-display text-3xl mb-2"> Transparency</h1>
          <p className="text-fg-muted max-w-xl">
            Live engineering health, public since day one. Target: 99.9% uptime on this dashboard itself.
          </p>
        </div>
        <button
          onClick={subscribe}
          disabled={subscribed}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-subtle text-sm text-fg-secondary hover:border-strong disabled:opacity-50 focus-ring"
        >
          <Bell size={15} /> {subscribed ? 'Subscribed' : 'Subscribe to alerts'}
        </button>
      </div>

      <HealthDashboard />

      <h2 className="font-display text-2xl mt-16 mb-2">🗟 Code walkthroughs</h2>
      <p className="text-fg-muted mb-5">Real engineering decisions from real tickets.</p>
      <div className="relative max-w-sm mb-6">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by keyword or domain..."
          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-1 border border-subtle text-sm text-fg-primary placeholder:text-fg-muted focus-ring"
        />
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-16">
        {filtered.map((w) => (
          <GlassCard key={w.id} className="p-4">
            <div className="aspect-video rounded-lg bg-gradient-to-br from-ink-700 to-ink-800 flex items-center justify-center mb-3 relative">
              <Play size={18} className="text-white/80" />
              <span className="absolute bottom-2 right-2 font-mono text-[10px] text-fg-secondary bg-black/40 px-1.5 py-0.5 rounded">
                {w.duration}
              </span>
            </div>
            <span className="text-[10px] font-mono uppercase text-fg-muted">{w.domain}</span>
            <div className="flex items-start justify-between gap-2 mt-1">
              <h3 className="text-sm text-fg-primary leading-snug">{w.title}</h3>
              <button onClick={() => toggleSave(w.id)} className="shrink-0 text-fg-muted hover:text-signal-bright focus-ring">
                {saved.includes(w.id) ? <BookmarkCheck size={16} className="text-signal-bright" /> : <Bookmark size={16} />}
              </button>
            </div>
          </GlassCard>
        ))}
      </div>

      <h2 className="font-display text-2xl mb-2">🕷 Postmortems</h2>
      <p className="text-fg-muted mb-6">What bugs, why, and how we fixed it.</p>
      <div className="space-y-3">
        {postmortems.map((p) => (
          <details key={p.id} className="glass rounded-xl p-4 group">
            <summary className="cursor-pointer list-none flex items-center justify-between">
              <div>
                <span className="text-xs font-mono text-fg-muted">{p.date}</span>
                <div className="text-sm text-fg-primary mt-0.5">{p.title}</div>
              </div>
              <span className="text-fg-muted text-xs group-open:rotate-180 transition-transform">▾</span>
            </summary>
            <div className="mt-4 grid sm:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-[10px] font-mono uppercase text-fg-muted mb-1">What happened</div>
                <p className="text-fg-secondary">{p.what}</p>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-fg-muted mb-1">Root cause</div>
                <p className="text-fg-secondary">{p.cause}</p>
              </div>
              <div>
                <div className="text-[10px] font-mono uppercase text-fg-muted mb-1">Resolution</div>
                <p className="text-fg-secondary">{p.resolution}</p>
              </div>
            </div>
          </details>
        ))}
      </div>
    </div>
  )
}
