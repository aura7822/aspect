import { useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts'
import GlassCard from './GlassCard.jsx'
import { healthSeries } from '../data/health.js'

const windows = [7, 30, 90]

const charts = [
  { key: 'uptime', label: 'Uptime %', color: '#3ECF8E', suffix: '%' },
  { key: 'latency', label: 'Avg API latency', color: '#C9972B', suffix: 'ms' },
  { key: 'errorRate', label: 'Error rate', color: '#E8543C', suffix: '%' },
]

function CustomTooltip({ active, payload, label, suffix }) {
  if (!active || !payload?.length) return null
  return (
    <div className="glass rounded-lg px-3 py-2 text-xs font-mono">
      <div className="text-fg-muted">{label}</div>
      <div className="text-fg-primary mt-0.5">
        {payload[0].value}
        {suffix}
      </div>
    </div>
  )
}

export default function HealthDashboard() {
  const [window, setWindow] = useState(30)

  return (
    <div>
      <div className="flex justify-end gap-1.5 mb-4">
        {windows.map((w) => (
          <button
            key={w}
            onClick={() => setWindow(w)}
            className={`px-3 py-1.5 text-xs font-mono rounded-lg border transition-colors focus-ring ${
              window === w ? 'border-signal text-signal-bright bg-signal/10' : 'border-subtle text-fg-secondary'
            }`}
          >
            {w}d
          </button>
        ))}
      </div>
      <div className="grid md:grid-cols-3 gap-4">
        {charts.map((c) => (
          <GlassCard key={c.key} className="p-4">
            <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-3">{c.label}</div>
            <div style={{ width: '100%', height: 140 }}>
              <ResponsiveContainer>
                <LineChart data={healthSeries[window][c.key]} margin={{ top: 4, right: 4, left: -24, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-subtle)" vertical={false} />
                  <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#8A7657' }} interval="preserveStartEnd" axisLine={false} tickLine={false} />
                  <YAxis tick={{ fontSize: 10, fill: '#8A7657' }} axisLine={false} tickLine={false} width={36} domain={['auto', 'auto']} />
                  <Tooltip content={<CustomTooltip suffix={c.suffix} />} />
                  <Line type="monotone" dataKey="value" stroke={c.color} strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
