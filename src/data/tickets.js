export const columns = ['Backlog', 'In Progress', 'Code Review', 'Staging', 'Done']

export const initialTickets = [
  { id: 'ASP-101', title: 'Wire up Stripe milestone billing', assignee: 'SO', points: 5, status: 'blocker', column: 'In Progress', comments: 3 },
  { id: 'ASP-102', title: 'Fix Kanban drag-drop on Safari', assignee: 'DF', points: 2, status: 'review', column: 'Code Review', comments: 1 },
  { id: 'ASP-103', title: 'Add audit log export to CSV', assignee: 'AB', points: 3, status: 'ok', column: 'Backlog', comments: 0 },
  { id: 'ASP-104', title: 'Set up staging env for Test Flight', assignee: 'TL', points: 5, status: 'ok', column: 'Staging', comments: 2 },
  { id: 'ASP-105', title: 'War Room document vault encryption', assignee: 'ML', points: 8, status: 'blocker', column: 'In Progress', comments: 5 },
  { id: 'ASP-106', title: 'Sprint Wall WebSocket reconnect logic', assignee: 'ML', points: 3, status: 'review', column: 'Code Review', comments: 0 },
  { id: 'ASP-107', title: 'Client-facing changelog filters', assignee: 'DF', points: 2, status: 'ok', column: 'Done', comments: 1 },
  { id: 'ASP-108', title: 'Office Hours calendar .ics export', assignee: 'SO', points: 3, status: 'ok', column: 'Done', comments: 0 },
  { id: 'ASP-109', title: 'Sticky-note feedback screenshot capture', assignee: 'PR', points: 5, status: 'review', column: 'Staging', comments: 4 },
  { id: 'ASP-110', title: 'Skills-based routing fallback SLA', assignee: 'AB', points: 5, status: 'ok', column: 'Backlog', comments: 0 },
]
