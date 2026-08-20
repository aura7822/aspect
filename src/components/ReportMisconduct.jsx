import { useState } from 'react'
import { ShieldAlert } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function ReportMisconduct() {
  const { submitMisconductReport } = useApp()
  const [text, setText] = useState('')
  const [sent, setSent] = useState(false)

  function submit() {
    if (!text.trim()) return
    submitMisconductReport(text.trim())
    setText('')
    setSent(true)
    setTimeout(() => setSent(false), 3000)
  }

  return (
    <div className="glass rounded-2xl p-6 md:p-8">
      <h3 className="font-display text-lg mb-1 flex items-center gap-2">
        <ShieldAlert size={17} className="text-warn" /> Report developer misconduct
      </h3>
      <p className="text-sm text-fg-muted mb-4">
        Confidential - this goes directly to our admin team, not the developer's public profile.
      </p>
      <textarea
        rows={3}
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Describe what happened..."
        className="input-field resize-none"
      />
      <div className="flex items-center gap-3 mt-3">
        <button onClick={submit} className="px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring">
          Submit report
        </button>
        {sent && <span className="text-sm text-good">Sent - only admins can see this.</span>}
      </div>
    </div>
  )
}
