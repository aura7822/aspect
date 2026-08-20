import { useState } from 'react'
import clsx from 'clsx'
import { MessageSquare, Undo2 } from 'lucide-react'
import { columns, initialTickets } from '../data/tickets.js'

const statusColor = {
  blocker: 'bg-bad',
  review: 'bg-warn',
  ok: 'bg-good',
}

export default function KanbanBoard({ onOpenTicket }) {
  const [tickets, setTickets] = useState(initialTickets)
  const [dragId, setDragId] = useState(null)
  const [undo, setUndo] = useState(null) // { ticketId, from }

  function handleDrop(column) {
    if (!dragId) return
    setTickets((list) => {
      const prev = list.find((t) => t.id === dragId)
      if (!prev || prev.column === column) return list
      setUndo({ ticketId: dragId, from: prev.column })
      setTimeout(() => setUndo((u) => (u?.ticketId === dragId ? null : u)), 5000)
      return list.map((t) => (t.id === dragId ? { ...t, column } : t))
    })
    setDragId(null)
  }

  function handleUndo() {
    if (!undo) return
    setTickets((list) => list.map((t) => (t.id === undo.ticketId ? { ...t, column: undo.from } : t)))
    setUndo(null)
  }

  return (
    <div className="relative">
      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => (
          <div
            key={col}
            onDragOver={(e) => e.preventDefault()}
            onDrop={() => handleDrop(col)}
            className="min-w-[260px] flex-1"
          >
            <div className="flex items-center justify-between mb-3 px-1">
              <span className="text-xs font-mono uppercase tracking-wide text-fg-muted">{col}</span>
              <span className="text-xs font-mono text-fg-muted">
                {tickets.filter((t) => t.column === col).length}
              </span>
            </div>
            <div className="space-y-2 min-h-[80px]">
              {tickets
                .filter((t) => t.column === col)
                .map((t) => (
                  <div
                    key={t.id}
                    draggable
                    onDragStart={() => setDragId(t.id)}
                    onClick={() => onOpenTicket?.(t)}
                    className="glass rounded-xl p-3 cursor-grab active:cursor-grabbing hover:border-strong transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[11px] text-fg-muted">{t.id}</span>
                      <span className={clsx('w-2 h-2 rounded-full', statusColor[t.status])} />
                    </div>
                    <div className="text-sm text-fg-primary mt-1.5 leading-snug">{t.title}</div>
                    <div className="flex items-center justify-between mt-3">
                      <span className="w-6 h-6 rounded-full bg-surface-2 flex items-center justify-center text-[10px] font-mono text-fg-secondary">
                        {t.assignee}
                      </span>
                      <div className="flex items-center gap-3 text-fg-muted">
                        {t.comments > 0 && (
                          <span className="flex items-center gap-1 text-[11px] font-mono">
                            <MessageSquare size={11} /> {t.comments}
                          </span>
                        )}
                        <span className="text-[11px] font-mono">{t.points} pt</span>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        ))}
      </div>

      {undo && (
        <div className="fixed bottom-5 left-1/2 -translate-x-1/2 glass rounded-full pl-4 pr-2 py-2 flex items-center gap-3 z-40 animate-fade_in">
          <span className="text-sm text-fg-secondary">{undo.ticketId} moved</span>
          <button
            onClick={handleUndo}
            className="flex items-center gap-1 text-sm text-signal-bright font-medium px-3 py-1 rounded-full hover:bg-surface-1 focus-ring"
          >
            <Undo2 size={13} /> Undo
          </button>
        </div>
      )}
    </div>
  )
}
