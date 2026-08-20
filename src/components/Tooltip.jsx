export default function Tooltip({ label, children, className = '' }) {
  return (
    <span className={`relative group/tooltip inline-flex ${className}`}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-mono opacity-0 scale-95 group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 z-50 glass text-fg-primary"
      >
        {label}
      </span>
    </span>
  )
}
