import { useState } from 'react'
import { HelpCircle, GitPullRequest, AlertTriangle } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const modes = [
  { id: 'question', label: 'Ask a technical question', icon: HelpCircle, placeholder: "What's the question on your mind?" },
  { id: 'review', label: 'Request a code review', icon: GitPullRequest, placeholder: 'Link or paste the code/PR you want reviewed...' },
  { id: 'complaint', label: 'Submit a project or code complaint', icon: AlertTriangle, placeholder: 'Tell us what went wrong...' },
]

export default function DeveloperInteractionHub() {
  const { submitClarification, pushToast } = useApp()
  const [mode, setMode] = useState('question')
  const [text, setText] = useState('')

  const active = modes.find((m) => m.id === mode)

  function submit() {
    if (!text.trim()) return
    submitClarification(`[${active.label}] ${text.trim()}`)
    setText('')
    pushToast({ title: 'Sent to the team', message: 'A developer will follow up shortly.' })
  }

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="font-display text-lg mb-4">🖏 Get in touch</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors focus-ring ${
              mode === m.id ? 'border-signal bg-signal/10 text-signal-bright' : 'border-subtle text-fg-secondary hover:border-strong'
            }`}
          >
            <m.icon size={14} /> {m.label}
          </button>
        ))}
      </div>
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder={active.placeholder}
        className="input-field resize-none"
      />
      <button
        onClick={submit}
        className="mt-3 px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring"
      >
        Send
      </button>
    </div>
  )
}
