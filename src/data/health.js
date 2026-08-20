function series(days, base, variance) {
  const out = []
  const now = new Date('2026-08-16')
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now)
    d.setDate(d.getDate() - i)
    out.push({
      date: `${d.getMonth() + 1}/${d.getDate()}`,
      value: +(base + (Math.sin(i / 3) * variance) + (Math.random() * variance * 0.4)).toFixed(2),
    })
  }
  return out
}

export const healthSeries = {
  7: { uptime: series(7, 99.95, 0.04), latency: series(7, 118, 14), errorRate: series(7, 0.12, 0.05) },
  30: { uptime: series(30, 99.92, 0.06), latency: series(30, 124, 20), errorRate: series(30, 0.15, 0.08) },
  90: { uptime: series(90, 99.9, 0.08), latency: series(90, 130, 24), errorRate: series(90, 0.18, 0.1) },
}

export const postmortems = [
  {
    id: 'pm-3',
    date: '2026-06-18',
    title: 'Elevated API latency during Sprint Wall rollout',
    what: 'P99 latency rose to 640ms for 22 minutes during a WebSocket fan-out deploy.',
    cause: 'A new subscription filter ran an unindexed query per connected client.',
    resolution: 'Rolled back the filter, added a covering index, and shipped canary deploys for WebSocket changes going forward.',
  },
  {
    id: 'pm-2',
    date: '2026-05-02',
    title: 'Brief outage on the public Health Dashboard',
    what: 'The dashboard itself returned 503s for 6 minutes.',
    cause: 'A metrics-ingestion job exhausted a connection pool shared with the read API.',
    resolution: 'Split ingestion onto its own pool and added pool-saturation alerts.',
  },
  {
    id: 'pm-1',
    date: '2026-03-11',
    title: 'Delayed email delivery for POC confirmations',
    what: 'Confirmation emails were delayed up to 40 minutes.',
    cause: 'Our transactional email provider throttled a shared sending IP.',
    resolution: 'Moved to a dedicated sending IP and added a queue-depth alert.',
  },
]
