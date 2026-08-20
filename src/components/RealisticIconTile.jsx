import clsx from 'clsx'

// Layered-depth tile for high-impact icons (brand marks, stat highlights).
// Structural/table/nav icons should stay flat single-color — this is reserved
// for the small set of places an icon needs to read as a "physical" object.
export default function RealisticIconTile({ children, size = 44, tone = 'neutral', className }) {
  const toneGradient = {
    neutral: 'linear-gradient(160deg, var(--surface-3), var(--surface-1))',
    accent: 'linear-gradient(160deg, rgb(var(--accent-rgb) / 0.22), rgb(var(--accent-rgb) / 0.06))',
    good: 'linear-gradient(160deg, rgba(62,158,110,0.22), rgba(62,158,110,0.06))',
    warn: 'linear-gradient(160deg, rgba(196,131,42,0.22), rgba(196,131,42,0.06))',
  }[tone]

  return (
    <div
      className={clsx('relative rounded-2xl flex items-center justify-center shrink-0 overflow-hidden', className)}
      style={{
        width: size,
        height: size,
        background: toneGradient,
        boxShadow:
          'inset 0 1px 0 rgba(255,255,255,0.10), inset 0 -8px 16px rgba(0,0,0,0.28), 0 1px 0 rgba(255,255,255,0.02)',
        border: '1px solid var(--border-subtle)',
      }}
    >
      <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-white/[0.06] to-transparent pointer-events-none" />
      <div className="relative">{children}</div>
    </div>
  )
}
