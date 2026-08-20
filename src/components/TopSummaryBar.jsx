import { Ticket, Activity, Gauge } from 'lucide-react'
import StatusDot from './StatusDot.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function TopSummaryBar() {
  const { projectRequests } = useApp()
  const activeTickets = projectRequests.filter((r) => r.status !== 'completed').length

  const metrics = [
    { icon: Ticket, label: 'Active tickets', value: activeTickets },
    { icon: Activity, label: 'System status', value: 'Operational', tone: 'good' },
    { icon: Gauge, label: 'API usage', value: '42% of quota' },
  ]

  return (
    <div className="grid sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-subtle border border-subtle rounded-xl overflow-hidden mb-8">
      {metrics.map((m) => (
        <div key={m.label} className="flex items-center gap-3 px-5 py-4">
          <m.icon size={16} className="text-fg-muted shrink-0" />
          <div>
            <div className="text-[10px] font-mono uppercase tracking-wide text-fg-muted">{m.label}</div>
            <div className="flex items-center gap-1.5 mt-0.5">
              {m.tone && <StatusDot tone={m.tone} />}
              <span className="text-sm font-medium text-fg-primary">{m.value}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}
