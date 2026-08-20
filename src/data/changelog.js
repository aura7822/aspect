export const changelogTags = ['Bug fix', 'New feature', 'Performance', 'Security']
export const changelogPlatforms = ['Web', 'Mobile', 'iOS', 'Android']

export const changelogEntries = [
  { id: 'cl-9', date: '2026-08-14', tag: 'New feature', platform: 'Web', title: 'Milestone billing inside the client dashboard', body: 'Clients can now review and pay milestone invoices without leaving the dashboard.', reactions: 12, new: true },
  { id: 'cl-8', date: '2026-08-11', tag: 'Performance', platform: 'Web', title: 'Sprint Wall sync latency cut to 90ms', body: 'Reworked the update fan-out so Kanban changes land under our 200ms budget with headroom.', reactions: 8, new: false },
  { id: 'cl-7', date: '2026-08-07', tag: 'Bug fix', platform: 'iOS', title: 'Fixed drag-drop ghosting on Safari', body: 'Ticket cards no longer leave a duplicate outline when dropped between columns.', reactions: 4, new: false },
  { id: 'cl-6', date: '2026-08-02', tag: 'Security', platform: 'Web', title: 'Rotated storage encryption keys', body: 'Routine key rotation for the document vault, no action needed from clients.', reactions: 6, new: false },
  { id: 'cl-5', date: '2026-07-28', tag: 'New feature', platform: 'Mobile', title: 'Status page subscriptions', body: 'Subscribe to incident alerts by email, SMS, or webhook from the Transparency page.', reactions: 15, new: false },
  { id: 'cl-4', date: '2026-07-22', tag: 'Performance', platform: 'Android', title: 'Case study images now lazy-load', body: 'Portfolio pages load 38% faster on 4G thanks to deferred image and video loading.', reactions: 5, new: false },
  { id: 'cl-3', date: '2026-07-15', tag: 'New feature', platform: 'Web', title: 'Public postmortems', body: 'Past incidents are now documented with root cause and resolution on the Transparency page.', reactions: 21, new: false },
  { id: 'cl-2', date: '2026-07-09', tag: 'Bug fix', platform: 'Web', title: 'Fixed timezone offset in the Office Hours grid', body: 'Availability slots now respect your local timezone instead of UTC.', reactions: 3, new: false },
  { id: 'cl-1', date: '2026-07-01', tag: 'New feature', platform: 'Web', title: 'Launched public Health Dashboard', body: 'Uptime, latency, and error rate are now visible in real time to everyone.', reactions: 18, new: false },
]
