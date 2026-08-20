import { useEffect, useState } from 'react'

// loop=true: types all lines, pauses, deletes, and retypes forever (used for the hero).
// loop=false: types once and stops with a steady caret (used for the sign-in greeting).
export default function TypingHeadline({ lines, className, loop = true, fontSize = 40 }) {
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [phase, setPhase] = useState('typing') // typing | pausing | deleting | done

  useEffect(() => {
    const currentLine = lines[lineIdx] ?? ''

    if (phase === 'typing') {
      if (charIdx < currentLine.length) {
        const timer = setTimeout(() => setCharIdx((c) => c + 1), 42)
        return () => clearTimeout(timer)
      }
      if (lineIdx < lines.length - 1) {
        const timer = setTimeout(() => {
          setLineIdx((l) => l + 1)
          setCharIdx(0)
        }, 260)
        return () => clearTimeout(timer)
      }
      if (!loop) {
        setPhase('done')
        return
      }
      const timer = setTimeout(() => setPhase('pausing'), 1400)
      return () => clearTimeout(timer)
    }

    if (phase === 'pausing') {
      const timer = setTimeout(() => setPhase('deleting'), 900)
      return () => clearTimeout(timer)
    }

    if (phase === 'deleting') {
      if (charIdx > 0) {
        const timer = setTimeout(() => setCharIdx((c) => c - 1), 22)
        return () => clearTimeout(timer)
      }
      if (lineIdx > 0) {
        const timer = setTimeout(() => {
          setLineIdx((l) => l - 1)
          setCharIdx((lines[lineIdx - 1] ?? '').length)
        }, 120)
        return () => clearTimeout(timer)
      }
      const timer = setTimeout(() => setPhase('typing'), 400)
      return () => clearTimeout(timer)
    }
  }, [phase, charIdx, lineIdx, lines, loop])

  const viewHeight = fontSize * 1.4 * lines.length + fontSize * 0.6

  return (
    <h1 className={className} aria-label={lines.join(' ')}>
      <svg viewBox={`0 0 620 ${viewHeight}`} className="w-full h-auto overflow-visible" role="img">
        {lines.map((line, i) => {
          const revealed = i < lineIdx ? line : i === lineIdx ? line.slice(0, charIdx) : ''
          const showCaret = phase === 'done' ? i === lines.length - 1 : i === lineIdx
          return (
            <text
              key={i}
              x="0"
              y={fontSize + 8 + i * (fontSize * 1.4)}
              className="font-display"
              style={{ fontSize, fill: 'var(--fg-primary)', fontWeight: 600 }}
            >
              {revealed}
              {showCaret && (
                <tspan className="typing-caret" dy="2" style={{ fill: 'var(--accent, #C9972B)' }}>
                  _
                </tspan>
              )}
            </text>
          )
        })}
      </svg>
    </h1>
  )
}
