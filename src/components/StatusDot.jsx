import clsx from 'clsx'

const toneDot = {
  neutral: 'bg-fg-muted',
  good: 'bg-good',
  warn: 'bg-warn',
  bad: 'bg-bad',
  accent: 'bg-signal',
}

// Uniform micro status indicator — a muted dot + clean label. Used anywhere the UI
// previously rendered ad-hoc colored pills, online/offline rings, or legend swatches.
export default function StatusDot({ tone = 'neutral', label, size = 6, className }) {
  return (
    <span className={clsx('inline-flex items-center gap-1.5', className)}>
      <span
        className={clsx('rounded-full shrink-0', toneDot[tone])}
        style={{ width: size, height: size }}
      />
      {label && <span className="text-xs text-fg-muted font-mono">{label}</span>}
    </span>
  )
}
