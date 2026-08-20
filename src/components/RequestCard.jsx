import { useState } from 'react'
import { Lock } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'
import { findEntity, formatKES } from '../data/serviceCatalog.js'

const statusColor = {
  new: 'text-warn border-warn/30',
  claimed: 'text-signal-bright border-signal/30',
  'in-discussion': 'text-signal-bright border-signal/30',
  'in-progress': 'text-good border-good/30',
  completed: 'text-good border-good/30',
}

export default function RequestCard({ request, isAdmin }) {
  const { claimRequest, addReply, currentUser, developers } = useApp()
  const [draft, setDraft] = useState('')

  const entity = request.entity ? findEntity(request.entity.serviceId, request.entity.subcategoryId) : null
  const claimedByMe = request.claimedBy === currentUser?.id
  const claimedByOther = request.claimedBy && !claimedByMe
  const canReply = isAdmin || claimedByMe || !request.claimedBy

  function reply() {
    if (!draft.trim()) return
    addReply(request.id, currentUser, draft.trim(), isAdmin)
    setDraft('')
  }

  return (
    <div className="glass rounded-xl p-4">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div>
          <span className="font-mono text-xs text-fg-muted">{request.id}</span>
          <div className="text-sm text-fg-primary mt-0.5">
            {request.clientName}
            {request.clientOrg && <span className="text-fg-muted"> — {request.clientOrg}</span>}
          </div>
        </div>
        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border shrink-0 ${statusColor[request.status] ?? 'border-subtle text-fg-muted'}`}>
          {request.status}
        </span>
      </div>

      {entity && (
        <div className="text-xs font-mono text-signal-bright mb-1.5">
          {entity.service.name} — {entity.sub.name} · {formatKES(entity.sub.priceKES)}
        </div>
      )}
      <p className="text-sm text-fg-secondary leading-relaxed mb-2">{request.description}</p>
      {request.tech && <div className="text-xs text-fg-muted mb-2">Preferred stack: {request.tech}</div>}
      {(request.budgetLow || request.budgetHigh) && (
        <div className="text-xs text-fg-muted mb-3">
          Budget: {formatKES(request.budgetLow ?? 0)}{request.devsAssigned ? ` · ${request.devsAssigned} dev(s) assigned` : ''}
        </div>
      )}

      {!request.claimedBy && (
        <div className="flex flex-wrap gap-1.5 mb-3">
          {developers.slice(0, 4).map((d) => (
            <button
              key={d.id}
              onClick={() => claimRequest(request.id, d.id)}
              className="text-xs font-mono px-2.5 py-1 rounded-full border border-subtle hover:border-signal/50 hover:text-signal-bright transition-colors focus-ring"
            >
              Claim as {d.name.split(' ')[0]}
            </button>
          ))}
        </div>
      )}
      {claimedByOther && !isAdmin && (
        <div className="flex items-center gap-1.5 text-xs text-fg-muted mb-3">
          <Lock size={11} /> Claimed by {developers.find((d) => d.id === request.claimedBy)?.name ?? request.claimedBy} - only they (or an admin) can reply.
        </div>
      )}

      {request.replies.length > 0 && (
        <div className="space-y-2 mb-3">
          {request.replies.map((r, i) => (
            <div key={i} className="bg-surface-1 rounded-lg p-2.5">
              <div className="text-xs text-fg-muted mb-0.5">{r.author}</div>
              <div className="text-sm text-fg-primary">{r.text}</div>
            </div>
          ))}
        </div>
      )}

      {canReply && (
        <div className="flex gap-2">
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && reply()}
            placeholder="Reply to client..."
            className="flex-1 rounded-lg bg-surface-1 border border-subtle px-3 py-2 text-sm text-fg-primary placeholder:text-fg-muted focus-ring"
          />
          <button onClick={reply} className="px-3 py-2 rounded-lg bg-signal text-white text-sm focus-ring">
            Send
          </button>
        </div>
      )}
    </div>
  )
}
