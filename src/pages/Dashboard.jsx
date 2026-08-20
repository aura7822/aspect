import { useState } from 'react'
import { Users, BarChart3, Trash2, Radio, ChevronRight, LayoutGrid, ListTodo, HeartPulse } from 'lucide-react'
import clsx from 'clsx'
import GlassCard from '../components/GlassCard.jsx'
import RequestCard from '../components/RequestCard.jsx'
import ProjectProgressPanel from '../components/ProjectProgressPanel.jsx'
import GreetingBanner from '../components/GreetingBanner.jsx'
import TopSummaryBar from '../components/TopSummaryBar.jsx'
import KanbanBoard from '../components/KanbanBoard.jsx'
import HealthDashboard from '../components/HealthDashboard.jsx'
import { useApp } from '../context/AppContext.jsx'
import { findEntity, formatKES } from '../data/serviceCatalog.js'

const tabs = [
  { id: 'overview', label: 'Overview', icon: LayoutGrid },
  { id: 'tasks', label: 'Tasks', icon: ListTodo },
  { id: 'health', label: 'System Health', icon: HeartPulse },
]

export default function Dashboard() {
  const { role } = useApp()
  const [tab, setTab] = useState('overview')

  if (role === 'visitor') {
    return (
      <div className="container-page py-24 text-center">
        <h1 className="font-display text-2xl mb-3">Sign in to interact with dashboard</h1>
        <p className="text-fg-muted mb-6">Use the profile menu in the nav to preview a role.</p>
      </div>
    )
  }

  return (
    <div className="container-page py-10">
      <GreetingBanner />
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-display text-2xl mb-1">🗠 Dashboard</h1>
          <p className="text-sm text-fg-muted">
            Viewing as <span className="font-mono text-signal-bright">{role}</span>
          </p>
        </div>
      </div>

      <TopSummaryBar />

      <div className="flex gap-1 border-b border-subtle mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              'flex items-center gap-2 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors focus-ring',
              tab === t.id ? 'border-signal text-signal-bright' : 'border-transparent text-fg-muted hover:text-fg-secondary'
            )}
          >
            <t.icon size={15} /> {t.label}
          </button>
        ))}
      </div>

      {tab === 'overview' && (
        <div>
          {(role === 'client' || role === 'enduser') && <ClientView />}
          {role === 'developer' && <DeveloperView />}
          {role === 'admin' && <AdminView />}
        </div>
      )}

      {tab === 'tasks' && (
        <GlassCard className="p-6">
          <h3 className="font-display text-lg mb-1">❖ Sprint Wall Kanban</h3>
          <p className="text-sm text-fg-muted mb-5">Drag tickets across the pipeline as work moves from backlog to done.</p>
          <KanbanBoard />
        </GlassCard>
      )}

      {tab === 'health' && (
        <GlassCard className="p-6">
          <h3 className="font-display text-lg mb-1">❖ System health</h3>
          <p className="text-sm text-fg-muted mb-5">Live uptime, latency, and error rate ❖ public on the Transparency page too.</p>
          <HealthDashboard />
        </GlassCard>
      )}
    </div>
  )
}

function ClientView() {
  const { clarifications, currentUser } = useApp()
  const myClarifications = clarifications.filter((c) => c.author === currentUser?.name)

  return (
    <div className="space-y-6">
      <ProjectProgressPanel />

      {myClarifications.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="font-display text-base mb-4">Your clarification requests</h3>
          <div className="space-y-2">
            {myClarifications.map((c) => (
              <div key={c.id} className="p-3 rounded-lg bg-surface-1 text-sm text-fg-secondary">
                {c.text}
              </div>
            ))}
          </div>
        </GlassCard>
      )}

    </div>
  )
}

function workTimeMetric(request) {
  const totalWorkHours = request.estimatedDays * 8
  const elapsedRatio = request.progressPercent / 100
  const usedHours = Math.round(totalWorkHours * elapsedRatio)
  const remainingHours = totalWorkHours - usedHours
  return { totalWorkHours, usedHours, remainingHours }
}

function DeveloperView() {
  const { projectRequests, clarifications, advanceStage, pipelineStages } = useApp()

  return (
    <div className="space-y-6">
      {projectRequests.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="font-display text-lg mb-1">Pending &amp; active projects</h3>
          <p className="text-sm text-fg-muted mb-4">Claim to respond, and advance the pipeline stage as work progresses — clients see this live.</p>
          <div className="space-y-4">
            {projectRequests.map((r) => {
              const metric = workTimeMetric(r)
              return (
                <div key={r.id} className="space-y-2">
                  <RequestCard request={r} isAdmin={false} />
                  <div className="flex flex-wrap items-center justify-between gap-3 px-1">
                    <div className="flex items-center gap-3 text-[11px] font-mono text-fg-muted">
                      <span>Deadline: {r.estimatedDays}d ({metric.totalWorkHours}h)</span>
                      <span>·</span>
                      <span className={metric.remainingHours < metric.totalWorkHours * 0.2 ? 'text-warn' : ''}>
                        {metric.remainingHours}h remaining
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      {pipelineStages.map((s) => (
                        <span
                          key={s}
                          className={`px-2 py-1 text-[10px] font-mono rounded-md border ${
                            pipelineStages.indexOf(r.stage) >= pipelineStages.indexOf(s)
                              ? 'border-signal/50 text-signal-bright bg-signal/10'
                              : 'border-subtle text-fg-muted'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                      {r.stage !== 'deploy' && (
                        <button onClick={() => advanceStage(r.id)} className="ml-1 text-[10px] font-mono px-2 py-1 rounded-md bg-signal text-white">
                          Advance →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      )}

      {clarifications.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="font-display text-lg mb-4">Client clarifications</h3>
          <div className="space-y-2">
            {clarifications.map((c) => (
              <div key={c.id} className="p-3 rounded-lg bg-surface-1">
                <div className="text-xs text-fg-muted mb-0.5">{c.author} · {c.role}</div>
                <div className="text-sm text-fg-secondary">{c.text}</div>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  )
}

function AdminView() {
  const { projectRequests, clarifications, misconductReports, loggedInUsers, removeUser, updateUser, sendBroadcast, pushToast, vacancies, toggleVacancy, applications } = useApp()
  const [broadcastText, setBroadcastText] = useState('')
  const [editingId, setEditingId] = useState(null)

  const stats = [
    { label: 'Logged-in users', value: loggedInUsers.filter((u) => u.online).length, icon: Users },
    { label: 'Ongoing projects', value: projectRequests.filter((r) => r.status !== 'completed').length, icon: BarChart3 },
    { label: 'Completed projects', value: projectRequests.filter((r) => r.status === 'completed').length, icon: BarChart3 },
  ]

  function broadcast() {
    if (!broadcastText.trim()) return
    sendBroadcast(broadcastText.trim(), 'all')
    setBroadcastText('')
  }

  return (
    <div className="space-y-6">
      <div className="grid sm:grid-cols-3 gap-4">
        {stats.map((s) => (
          <GlassCard key={s.label} className="p-5">
            <s.icon size={16} className="text-signal-bright mb-2" />
            <div className="font-mono text-xl text-fg-primary">{s.value}</div>
            <div className="text-xs text-fg-muted mt-1">{s.label}</div>
          </GlassCard>
        ))}
      </div>

      <GlassCard className="p-6">
        <h3 className="font-display text-lg mb-1 flex items-center gap-2">
          <Radio size={16} className="text-signal-bright" /> Broadcast Toast
        </h3>
        <p className="text-sm text-fg-muted mb-3">Deployed to every dashboard and to email for all logged-in users.</p>
        <div className="flex gap-2">
          <input
            value={broadcastText}
            onChange={(e) => setBroadcastText(e.target.value)}
            placeholder="E.g. Scheduled maintenance tonight from 11pm–1am EAT"
            className="input-field"
          />
          <button onClick={broadcast} className="px-4 py-2 rounded-lg bg-signal text-white text-sm font-medium focus-ring shrink-0">
            Send
          </button>
        </div>
      </GlassCard>

      <GlassCard className="p-6">
        <h3 className="font-display text-lg mb-1">❖ Logged-in users</h3>
        <p className="text-sm text-fg-muted mb-4">Escallated CRUD - edit role, or remove a session.</p>
        <div className="space-y-2">
          {loggedInUsers.map((u) => (
            <div key={u.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-1">
              <div className="flex items-center gap-2.5">
                <span className={`w-2 h-2 rounded-full ${u.online ? 'bg-good' : 'bg-fg-muted'}`} />
                <div>
                  {editingId === u.id ? (
                    <input
                      defaultValue={u.name}
                      onBlur={(e) => {
                        updateUser(u.id, { name: e.target.value })
                        setEditingId(null)
                      }}
                      autoFocus
                      className="input-field !py-1 !px-2 text-sm"
                    />
                  ) : (
                    <div className="text-sm text-fg-primary">{u.name}</div>
                  )}
                  <div className="text-xs text-fg-muted">{u.email} · {u.role}</div>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <button onClick={() => setEditingId(u.id)} className="text-xs font-mono px-2 py-1 rounded-md border border-subtle text-fg-secondary hover:border-strong focus-ring">
                  Edit
                </button>
                <button
                  onClick={() => {
                    removeUser(u.id)
                    pushToast({ title: 'User revoked', message: `${u.name}'s session was ended.` })
                  }}
                  className="p-1.5 rounded-md border border-subtle text-bad hover:border-bad focus-ring"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>

      {projectRequests.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="font-display text-lg mb-1">❖ Live projects summary</h3>
          <div className="space-y-2 mt-3">
            {projectRequests.map((r) => {
              const entity = r.entity ? findEntity(r.entity.serviceId, r.entity.subcategoryId) : null
              return (
                <div key={r.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-1 text-sm">
                  <div>
                    <span className="font-mono text-xs text-fg-muted mr-2">{r.id}</span>
                    <span className="text-fg-primary">{entity ? `${entity.service.name} — ${entity.sub.name}` : r.projectName || r.clientName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-fg-muted">
                    <span>{formatKES(r.budgetLow ?? 0)}</span>
                    <span>{r.progressPercent}%</span>
                    <ChevronRight size={12} />
                  </div>
                </div>
              )
            })}
          </div>
        </GlassCard>
      )}

      {(projectRequests.length > 0 || clarifications.length > 0) && (
        <GlassCard className="p-6">
          <h3 className="font-display text-lg mb-1">❖ All project requests</h3>
          <p className="text-sm text-fg-muted mb-4">Admins can reply to any request, claimed or not.</p>
          <div className="space-y-3">
            {projectRequests.map((r) => (
              <RequestCard key={r.id} request={r} isAdmin />
            ))}
          </div>
        </GlassCard>
      )}

      <GlassCard className="p-6">
        <h3 className="font-display text-lg mb-1">❖ Vacancies</h3>
        <p className="text-sm text-fg-muted mb-4">Declare positions open or closed; only open ones display on the public Careers page.</p>
        <div className="space-y-2">
          {vacancies.map((v) => (
            <div key={v.id} className="flex items-center justify-between p-3 rounded-lg bg-surface-1">
              <span className="text-sm text-fg-primary">{v.title}</span>
              <button
                onClick={() => toggleVacancy(v.id)}
                className={`text-xs font-mono px-3 py-1.5 rounded-full border transition-colors focus-ring ${
                  v.open ? 'border-good/40 text-good bg-good/10' : 'border-subtle text-fg-muted'
                }`}
              >
                {v.open ? 'Open' : 'Closed'}
              </button>
            </div>
          ))}
        </div>
      </GlassCard>

      {applications.length > 0 && (
        <GlassCard className="p-6">
          <h3 className="font-display text-lg mb-1">❖ Applications</h3>
          <p className="text-sm text-fg-muted mb-4">Emailed to you as they come in.</p>
          <div className="space-y-2">
            {applications.map((a) => (
              <div key={a.id} className="p-3 rounded-lg bg-surface-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-fg-primary">{a.name}</span>
                  <span className="text-xs font-mono text-fg-muted">{a.vacancyTitle}</span>
                </div>
                <div className="text-xs text-fg-muted mt-0.5">{a.email}{a.cvName ? ` · ${a.cvName}` : ''}</div>
                {a.note && <p className="text-sm text-fg-secondary mt-1.5">{a.note}</p>}
              </div>
            ))}
          </div>
        </GlassCard>
      )}

      {misconductReports.length > 0 && (
        <GlassCard className="p-6 border-warn/30">
          <h3 className="font-display text-lg mb-1 text-warn">❖ Developer misconduct reports</h3>
          <p className="text-sm text-fg-muted mb-4">Confidential : visible only here.</p>
          <div className="space-y-2">
            {misconductReports.map((r) => (
              <div key={r.id} className="p-3 rounded-lg bg-surface-1">
                <div className="text-xs text-fg-muted mb-0.5">{r.author} · {r.time}</div>
                <p className="text-sm text-fg-secondary">{r.text}</p>
              </div>
            ))}
          </div>
        </GlassCard>
      )}
    </div>
  )
}
