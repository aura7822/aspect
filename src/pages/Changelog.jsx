import { useMemo, useState } from 'react'
import clsx from 'clsx'
import { ThumbsUp, Search } from 'lucide-react'
import { changelogEntries, changelogTags } from '../data/changelog.js'
import { useApp } from '../context/AppContext.jsx'

const tagColor = {
  'Bug fix': 'text-warn border-warn/30',
  'New feature': 'text-signal-bright border-signal/30',
  Performance: 'text-good border-good/30',
  Security: 'text-bad border-bad/30',
}

export default function Changelog() {
  const { role } = useApp()
  const isTeam = role === 'developer' || role === 'admin'
  const [tag, setTag] = useState('all')
  const [query, setQuery] = useState('')
  const [reactions, setReactions] = useState({})

  const filtered = useMemo(() => {
    return changelogEntries.filter((e) => {
      if (tag !== 'all' && e.tag !== tag) return false
      if (query && !e.title.toLowerCase().includes(query.toLowerCase()) && !e.body.toLowerCase().includes(query.toLowerCase())) return false
      return true
    })
  }, [tag, query])

  function react(id) {
    setReactions((r) => ({ ...r, [id]: !r[id] }))
  }

  return (
    <div className="container-page py-16 max-w-3xl">
      <h1 className="font-display text-3xl mb-2">{isTeam ? 'Changelog' : 'Bulletins'}</h1>
      <p className="text-fg-muted mb-8">
        {isTeam ? 'Sourced straight from our commit history.' : 'Updates from the studio, straight from the source.'}
      </p>

      <div className="flex flex-wrap gap-2 mb-4">
        <button
          onClick={() => setTag('all')}
          className={clsx('px-3 py-1.5 text-xs font-mono rounded-full border focus-ring', tag === 'all' ? 'border-signal text-signal-bright bg-signal/10' : 'border-subtle text-fg-secondary')}
        >
          All
        </button>
        {changelogTags.map((t) => (
          <button
            key={t}
            onClick={() => setTag(t)}
            className={clsx('px-3 py-1.5 text-xs font-mono rounded-full border focus-ring', tag === t ? 'border-signal text-signal-bright bg-signal/10' : 'border-subtle text-fg-secondary')}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="relative max-w-sm mb-10">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-fg-muted" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search changelog..."
          className="w-full pl-9 pr-3 py-2.5 rounded-lg bg-surface-1 border border-subtle text-sm text-fg-primary placeholder:text-fg-muted focus-ring"
        />
      </div>

      <div className="space-y-4 border-l border-subtle pl-6">
        {filtered.map((e) => {
          const reacted = reactions[e.id]
          return (
            <div
              key={e.id}
              className={clsx('relative glass rounded-xl p-5', e.new && 'animate-glow_border')}
            >
              <span className="absolute -left-[27px] top-6 w-2.5 h-2.5 rounded-full bg-signal" />
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono text-fg-muted">{e.date}</span>
                <div className="flex items-center gap-1.5">
                  {e.platform && (
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-subtle text-fg-muted">{e.platform}</span>
                  )}
                  <span className={clsx('text-[10px] font-mono px-2 py-0.5 rounded-full border', tagColor[e.tag])}>{e.tag}</span>
                </div>
              </div>
              <h3 className="font-display text-base text-fg-primary mb-1.5">{e.title}</h3>
              <p className="text-sm text-fg-secondary leading-relaxed mb-3">{e.body}</p>
              <button
                onClick={() => react(e.id)}
                className={clsx(
                  'flex items-center gap-1.5 text-xs font-mono px-2.5 py-1 rounded-full border transition-colors focus-ring',
                  reacted ? 'border-signal text-signal-bright bg-signal/10' : 'border-subtle text-fg-muted'
                )}
              >
                <ThumbsUp size={12} /> {e.reactions + (reacted ? 1 : 0)}
              </button>
            </div>
          )
        })}
        {filtered.length === 0 && <p className="text-fg-muted py-10">No entries match.</p>}
      </div>
    </div>
  )
}
