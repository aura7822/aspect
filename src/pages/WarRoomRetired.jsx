import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Radio, ArrowRight } from 'lucide-react'

// Standalone "War Room" retirement page. Wired to /war-room/:id so any old link
// or nav item pointing at the retired feature lands here instead of a blank 404.
export default function WarRoomRetired() {
  const [line, setLine] = useState('')
  const fullLine = '> connection to war-room terminated — signal moved to /dashboard'

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      setLine(fullLine.slice(0, i))
      if (i >= fullLine.length) clearInterval(id)
    }, 22)
    return () => clearInterval(id)
  }, [])

  return (
    <div className="container-page py-24 flex flex-col items-center text-center">
      <div className="relative w-24 h-24 mb-8 flex items-center justify-center">
        <span className="absolute inset-0 rounded-full border border-signal/30 animate-ping" style={{ animationDuration: '2.4s' }} />
        <span className="absolute inset-3 rounded-full border border-signal/20 animate-ping" style={{ animationDuration: '2.4s', animationDelay: '0.4s' }} />
        <div className="relative w-16 h-16 rounded-2xl glass flex items-center justify-center">
          <Radio size={26} className="text-signal-bright" />
        </div>
      </div>

      <span className="font-mono text-xs text-signal-bright border border-signal/30 rounded-full px-3 py-1 mb-5">
        404 ⮚ fatal 
      </span>

      <h1 className="font-display text-3xl md:text-4xl mb-3">⚠ ERROR 404 : WAR ROOM NOT FOUND</h1>
      <p className="text-fg-muted max-w-md leading-relaxed mb-6">
        Live tickets, timeline, and status now live on your Dashboard 🗠 one workspace instead of a separate room.
      </p>

      <div className="glass rounded-xl px-4 py-3 mb-8 font-mono text-xs text-fg-secondary min-h-[2.25rem] flex items-center">
        {line}
        <span className="typing-caret ml-0.5" style={{ color: 'var(--accent)' }}>
          _
        </span>
      </div>

      <Link
        to="/dashboard"
        className="flex items-center gap-2 px-5 py-3 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring"
      >
        Go to Dashboard <ArrowRight size={15} />
      </Link>
    </div>
  )
}
