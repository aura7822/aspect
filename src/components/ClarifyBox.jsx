import { useState } from 'react'
import { useApp } from '../context/AppContext.jsx'
import { serviceCatalog } from '../data/serviceCatalog.js'

export default function ClarifyBox() {
  const { role, submitClarification } = useApp()
  const [text, setText] = useState('')
  const [tagged, setTagged] = useState(null)
  const [sent, setSent] = useState(false)

  // Only visitors, clients, and end-users clarify build requests here.
  // Developers and admins receive these in their dashboard instead.
  if (role === 'developer' || role === 'admin') return null

  function submit() {
    if (!text.trim()) return
    submitClarification(text.trim(), tagged)
    setText('')
    setTagged(null)
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="glass rounded-2xl p-6 md:p-8 mt-14">
      <h3 className="font-display text-xl mb-1">Have something unique in mind?</h3>
      <p className="text-sm text-fg-muted mb-4">
        Describe what you'd like built  optionally tag a service  and a developer will follow up.
      </p>
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="E.g. We need an internal tool that syncs inventory between two systems..."
        className="input-field resize-none"
      />
      <div className="flex flex-wrap gap-1.5 mt-3">
        {serviceCatalog.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => setTagged(tagged === s.id ? null : s.id)}
            className={`text-xs font-mono px-2.5 py-1 rounded-full border transition-colors focus-ring ${
              tagged === s.id ? 'border-signal bg-signal/15 text-signal-bright' : 'border-subtle text-fg-muted hover:border-strong'
            }`}
          >
            #{s.name}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-4">
        <button
          onClick={submit}
          className="px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring"
        >
          Submit
        </button>
        {sent && <span className="text-sm text-good">Submitted successfully to developers ; a confirmation email is on its way.</span>}
      </div>
    </div>
  )
}
