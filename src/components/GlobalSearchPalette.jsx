import { useEffect, useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { Search, X, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const staticCommands = [
  { label: 'Go to Dashboard', to: '/dashboard', group: 'Navigate' },
  { label: 'Browse Services', to: '/services', group: 'Navigate' },
  { label: 'View Developers', to: '/developers', group: 'Navigate' },
  { label: 'Open Settings', to: '/settings', group: 'Navigate' },
  { label: 'View Pricing', to: '/pricing', group: 'Navigate' },
  { label: 'View Transparency', to: '/transparency', group: 'Navigate' },
  { label: 'Launch a new project', to: '/start-a-project', group: 'Actions' },
]

export default function GlobalSearchPalette({ open, onClose }) {
  const navigate = useNavigate()
  const { pushToast } = useApp()
  const [query, setQuery] = useState('')

  useEffect(() => {
    if (!open) setQuery('')
  }, [open])

  useEffect(() => {
    function handler(e) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        onClose('toggle')
      }
      if (e.key === 'Escape' && open) onClose(false)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open])

  const results = useMemo(() => {
    if (!query.trim()) return staticCommands
    const q = query.toLowerCase()
    return staticCommands.filter((c) => c.label.toLowerCase().includes(q))
  }, [query])

  if (!open) return null

  function go(cmd) {
    navigate(cmd.to)
    onClose(false)
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center pt-24 px-4">
      <div className="absolute inset-0 bg-black/60" onClick={() => onClose(false)} />
      <div className="relative w-full max-w-lg glass rounded-2xl overflow-hidden animate-fade_in">
        <div className="flex items-center gap-2.5 px-4 py-3.5 border-b border-subtle">
          <Search size={16} className="text-fg-muted shrink-0" />
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search pages, actions..."
            className="flex-1 bg-transparent text-sm text-fg-primary placeholder:text-fg-muted outline-none"
          />
          <button onClick={() => onClose(false)} className="text-fg-muted hover:text-fg-primary focus-ring">
            <X size={15} />
          </button>
        </div>
        <div className="max-h-80 overflow-y-auto p-2">
          {results.length === 0 && (
            <div className="px-3 py-6 text-center text-sm text-fg-muted">No matches.</div>
          )}
          {results.map((cmd) => (
            <button
              key={cmd.label}
              onClick={() => go(cmd)}
              className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-fg-secondary hover:bg-surface-1 hover:text-fg-primary focus-ring"
            >
              <span className="flex items-center gap-2.5">
                <span className="text-[10px] font-mono uppercase text-fg-muted w-16 shrink-0">{cmd.group}</span>
                {cmd.label}
              </span>
              <ArrowRight size={13} className="text-fg-muted shrink-0" />
            </button>
          ))}
        </div>
        <div className="px-4 py-2.5 border-t border-subtle text-[10px] font-mono text-fg-muted flex items-center gap-3">
          <span>↵ select</span>
          <span>esc close</span>
          <span className="ml-auto">⌘K / Ctrl+K</span>
        </div>
      </div>
    </div>
  )
}
