import { Heart } from 'lucide-react'

const feedback = [
  { quote: "They actually listened. My change requests showed up in the build within days, not sprints.", name: 'Rhea Patel', role: 'Ledgerly' },
  { quote: 'Being able to see the pipeline stage in real time changed how we planned our own launch.', name: 'Jon Ferreira', role: 'VitalPath' },
]

export default function WhyYouMatter() {
  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="font-display text-lg mb-1 flex items-center gap-2">
        <Heart size={17} className="text-signal-bright" /> Why you matter
      </h3>
      <p className="text-sm text-fg-muted mb-5">
        Every developer profile above exists because clients like you kept telling us what to build next.
      </p>
      <div className="grid sm:grid-cols-2 gap-4">
        {feedback.map((f) => (
          <div key={f.name} className="p-4 rounded-xl bg-surface-1">
            <p className="text-sm text-fg-secondary leading-relaxed">&ldquo;{f.quote}&rdquo;</p>
            <div className="text-xs font-mono text-fg-muted mt-3">{f.name} — {f.role}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
