import GlassCard from '../components/GlassCard.jsx'

const posts = [
  { title: 'Why we build every live dashboard on WebSockets, not polling', date: 'Aug 6, 2026', tag: 'Architecture' },
  { title: 'A honest postmortem template we actually use', date: 'Jul 24, 2026', tag: 'Process' },
  { title: 'Skills-based routing: matching tickets to developers automatically', date: 'Jul 10, 2026', tag: 'Engineering' },
  { title: 'What glassmorphism is for, and when to stop using it', date: 'Jun 29, 2026', tag: 'Design' },
]

export default function Blog() {
  return (
    <div className="container-page py-16 max-w-3xl">
      <h1 className="font-display text-3xl mb-2">Blog</h1>
      <p className="text-fg-muted mb-10">Technical write-ups from the team, mostly pulled from real tickets.</p>
      <div className="space-y-4">
        {posts.map((p) => (
          <GlassCard key={p.title} className="p-5 flex items-center justify-between gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase text-signal-bright">{p.tag}</span>
              <h3 className="font-display text-base text-fg-primary mt-1">{p.title}</h3>
              <span className="text-xs text-fg-muted">{p.date}</span>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
