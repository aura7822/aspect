import StatusDot from './StatusDot.jsx'

// Simplified into the uniform micro-indicator pattern: a muted dot + clean label,
// consistent with status indicators everywhere else in the app.
export default function TechBadge({ name }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border border-subtle">
      <StatusDot tone="accent" />
      <span className="font-mono text-xs text-fg-secondary">{name}</span>
    </span>
  )
}
