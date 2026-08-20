export default function QuoteBlock({ children }) {
  return (
    <div className="flex justify-center">
      <div className="relative max-w-3xl w-full px-8 py-6 text-center">
        <span
          aria-hidden="true"
          className="absolute -top-4 left-2 font-display leading-none select-none"
          style={{ fontSize: 158, color: 'var(--accent, #C9972B)', opacity: 0.45 }}
        >
          &ldquo;
        </span>
        <p className="font-mono text-fg-secondary leading-relaxed text-lg md:text-2xl">{children}</p>
      </div>
    </div>
  )
}
