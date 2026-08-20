import { useState } from 'react'
import { Camera } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { findEntity } from '../data/serviceCatalog.js'

export default function ProjectProgressPanel() {
  const { currentUser, projectRequests, submitChangeRequest, t } = useApp()
  const [changeText, setChangeText] = useState('')

  const mine = projectRequests
    .filter((r) => r.clientName === currentUser?.name && r.status !== 'new')
    .sort((a, b) => b.createdAt - a.createdAt)
  const active = mine[0]

  if (!active) {
    return (
      <div className="glass rounded-2xl p-8 text-center">
        <p className="text-fg-muted">{t('no_active_projects')}</p>
      </div>
    )
  }

  const entity = active.entity ? findEntity(active.entity.serviceId, active.entity.subcategoryId) : null

  function submit() {
    if (!changeText.trim()) return
    submitChangeRequest(active.id, changeText.trim())
    setChangeText('')
  }

  return (
    <div className="glass rounded-2xl p-6">
      <div className="flex items-center justify-between mb-1">
        <span className="font-mono text-xs text-fg-muted">{active.id}</span>
        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full border border-subtle text-fg-secondary">{active.status}</span>
      </div>
      <h3 className="font-display text-lg mb-1">{entity ? `${entity.service.name} — ${entity.sub.name}` : active.projectName || 'Your project'}</h3>

      <div className="mt-4">
        <div className="flex items-center justify-between text-xs text-fg-muted mb-1.5">
          <span>Progress</span>
          <span className="font-mono">{active.progressPercent}%</span>
        </div>
        <div className="h-2 rounded-full bg-surface-2 overflow-hidden">
          <div className="h-full bg-signal transition-all duration-700" style={{ width: `${active.progressPercent}%` }} />
        </div>
        <div className="text-xs text-fg-muted mt-1.5 font-mono">Stage: {active.stage}</div>
      </div>

      {active.screenshots.length > 0 && (
        <div className="mt-5">
          <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-2">Screenshots</div>
          <div className="grid grid-cols-2 gap-2">
            {active.screenshots.map((s) => (
              <div key={s.id} className="rounded-lg bg-surface-1 border border-subtle p-3 flex flex-col items-center gap-1.5 text-center">
                <Camera size={16} className="text-fg-muted" />
                <span className="text-xs text-fg-secondary leading-snug">{s.label}</span>
                <span className="text-[10px] font-mono text-fg-muted">{s.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 pt-5 border-t border-subtle">
        <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-2">Submit a change request</div>
        <textarea
          rows={2}
          value={changeText}
          onChange={(e) => setChangeText(e.target.value)}
          placeholder="Something you'd like adjusted..."
          className="input-field resize-none"
        />
        <button
          onClick={submit}
          className="mt-2 px-4 py-2 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring"
        >
          {t('submit')}
        </button>
        {active.changeRequests.length > 0 && (
          <div className="mt-3 space-y-1.5">
            {active.changeRequests.map((c) => (
              <div key={c.id} className="text-xs text-fg-secondary bg-surface-1 rounded-md p-2">
                {c.text}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
