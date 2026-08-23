import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { notifications as seedNotifications } from '../data/notifications.js'
import { t as translate } from '../data/i18n.js'
import { api, ApiError } from '../lib/apiClient.js'

const AppContext = createContext(null)

const pipelineStages = ['commit', 'build', 'test', 'deploy']

function genId(prefix) {
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`
}

function greetingKey() {
  const h = new Date().getHours()
  if (h < 12) return '<good_morning/>'
  if (h < 18) return '<good_afternoon/>'
  return '<good_evening/>'
}
export function AppProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    if (typeof window === 'undefined') return 'dark'
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  // The only source of truth for "who is signed in" is the backend session.
  // No local role-switcher, no mock user table — currentUser is either the
  // real account the session cookie resolves to, or null.
  const [currentUser, setCurrentUser] = useState(null)
  const [authChecked, setAuthChecked] = useState(false)
  const role = currentUser?.role ?? 'visitor'
  const isAuthed = currentUser !== null

  const [toasts, setToasts] = useState([])
  const [notifications, setNotifications] = useState(seedNotifications)

  useEffect(() => {
    const root = document.documentElement
    root.classList.remove('dark', 'light')
    root.classList.add(theme)
  }, [theme])

  const pushToast = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2)
    setToasts((t) => [...t, { id, ...toast }])
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id))
    }, toast.duration ?? 4000)
  }, [])

  const dismissToast = useCallback((id) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  const markNotificationRead = useCallback((id) => {
    setNotifications((list) => list.map((n) => (n.id === id ? { ...n, read: true } : n)))
  }, [])

  const markAllRead = useCallback(() => {
    setNotifications((list) => list.map((n) => ({ ...n, read: true })))
  }, [])

  const updateProfile = useCallback(
    (fields) => {
      setCurrentUser((u) => (u ? { ...u, ...fields } : u))
      pushToast({ title: 'Account updated', message: 'Your changes have been saved.' })
      // NOTE: this updates local state only — there's no PUT /api/account
      // endpoint yet to persist name/avatar/language changes server-side.
      // Add one and call it here before this can be trusted across devices.
    },
    [pushToast]
  )

  // On first load, ask the backend whether an existing (httpOnly, so
  // unreadable from here directly) session cookie is still valid. If so,
  // restore the real signed-in user — this is what makes a page refresh not
  // silently log the person out. A 401 here just means "visitor", not an error.
  useEffect(() => {
    let cancelled = false
    api
      .get('/api/auth/me')
      .then(({ user }) => {
        if (!cancelled) setCurrentUser(user)
      })
      .catch(() => {})
      .finally(() => {
        if (!cancelled) setAuthChecked(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  // Called by Login.jsx after a successful login/register/MFA verification —
  // the backend has already established the session cookie by this point.
  const completeAuth = useCallback((user) => {
    setCurrentUser(user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await api.post('/api/auth/logout')
    } catch {
      // Drop local state regardless — an unreachable backend shouldn't trap
      // someone in a "logged in" UI they can no longer act on.
    }
    setCurrentUser(null)
  }, [])

  const deactivateAccount = useCallback(async () => {
    // NOTE: no DELETE/deactivate endpoint exists on the backend yet — this
    // only ends the local session. Add POST /api/account/deactivate and call
    // it here before this is a real account action rather than a local sign-out.
    await logout()
    pushToast({ title: 'Signed out', message: 'Account deactivation needs a backend endpoint — see code comment.' })
  }, [logout, pushToast])

  // --- Greeting: fires once per login (role change away from visitor) and persists until dismissed ---
  const [greeting, setGreeting] = useState(null)
  const prevRole = useRef('visitor')
  useEffect(() => {
    if (prevRole.current === 'visitor' && role !== 'visitor') {
      setGreeting(greetingKey())
    }
    if (role === 'visitor') {
      setGreeting(null)
    }
    prevRole.current = role
  }, [role])

  // --- Accessibility ---
  const [dyslexiaFont, setDyslexiaFont] = useState(false)
  const [fontScale, setFontScale] = useState(1) // 0.9 - 1.3
  const [reading, setReading] = useState(false)

  useEffect(() => {
    document.documentElement.style.setProperty('--font-scale', fontScale)
    document.documentElement.classList.toggle('dyslexia-font', dyslexiaFont)
  }, [fontScale, dyslexiaFont])

  const readAloud = useCallback((text) => {
    if (typeof window === 'undefined' || !window.speechSynthesis) return
    window.speechSynthesis.cancel()
    const utter = new SpeechSynthesisUtterance(text)
    utter.rate = 0.98
    utter.onend = () => setReading(false)
    utter.onerror = () => setReading(false)
    window.speechSynthesis.speak(utter)
    setReading(true)
  }, [])

  const stopReading = useCallback(() => {
    if (typeof window !== 'undefined' && window.speechSynthesis) window.speechSynthesis.cancel()
    setReading(false)
  }, [])

  // --- Language / i18n ---
  const [language, setLanguage] = useState('en')
  const t = useCallback((key) => translate(language, key), [language])

  // --- Developers: fetched from the real API, no more static mock file ---
  const [developers, setDevelopers] = useState([])
  useEffect(() => {
    api
      .get('/api/developers')
      .then(({ developers: rows }) => {
        // Normalize the backend's column names to the shape the rest of the
        // app expects, and fill in fields the backend doesn't track yet
        // (online presence, initials) with honest computed defaults rather
        // than inventing data.
        setDevelopers(
          rows.map((d) => ({
            id: d.id,
            name: d.name,
            role: d.headline || 'Developer',
            avatar: d.avatar_url,
            portfolio: d.portfolio_url,
            blog: d.blog_url,
            github: d.github_url,
            openSource: d.open_source_url,
            initials: d.name.split(' ').map((p) => p[0]).slice(0, 2).join('').toUpperCase(),
            // No real presence/online tracking exists yet (would need
            // WebSocket or last-seen heartbeats) — defaulting to false
            // rather than faking "online" status for a real account.
            online: false,
          }))
        )
      })
      .catch(() => {
        // Backend unreachable — leave the list empty rather than silently
        // falling back to fake developer names.
      })
  }, [])

  // Pre-selected service entity carried from a service card / pricing pick into Start a Project
  const [selectedEntity, setSelectedEntity] = useState(null) // { serviceId, subcategoryId }

  // Project requests — the client's own list comes from the real API.
  // Developer/admin cross-account views (claim, reply, advance stage) still
  // operate on local state below, because those backend endpoints don't
  // exist yet — see the comments on each function for what's still needed.
  const [projectRequests, setProjectRequests] = useState([])

  useEffect(() => {
    if (!isAuthed) {
      setProjectRequests([])
      return
    }
    api
      .get('/api/projects')
      .then(({ projects }) => {
        // Adapt the backend's row shape to what the dashboard components
        // expect. Fields the backend doesn't track yet (stage, screenshots,
        // replies, claimedBy...) default to sensible empty values — those
        // still need real columns/endpoints, noted inline below.
        setProjectRequests(
          projects.map((p) => ({
            id: p.id,
            clientName: currentUser?.name,
            clientRole: role,
            description: p.description,
            entity: { serviceId: p.service_id, subcategoryId: p.subcategory_id },
            budgetLow: p.price_kes,
            budgetHigh: p.price_kes,
            depositKES: p.deposit_kes,
            status: p.status,
            claimedBy: null,
            replies: [],
            selectedDeveloperIds: [],
            devsAssigned: null,
            satisfied: true,
            timerEnd: null,
            estimatedDays: null,
            progressPercent: p.status === 'completed' ? 100 : p.status === 'deposit_paid' ? 10 : 0,
            stage: 'commit',
            screenshots: [],
            changeRequests: [],
            createdAt: new Date(p.created_at).getTime(),
          }))
        )
      })
      .catch(() => {})
  }, [isAuthed, currentUser, role])

  const submitProjectRequest = useCallback(
    async (data) => {
      try {
        const { project } = await api.post('/api/projects', {
          serviceId: data.entity?.serviceId ?? data.field ?? 'custom',
          subcategoryId: data.entity?.subcategoryId ?? data.projectType ?? 'custom',
          description: data.description,
          // Sent for display continuity only — the backend always recomputes
          // the authoritative price server-side and ignores this number.
          price: data.estimatePrice ?? data.budgetLow,
        })
        setProjectRequests((list) => [
          {
            id: project.id,
            clientName: currentUser?.name,
            clientRole: role,
            description: project.description,
            entity: data.entity ?? { serviceId: project.service_id, subcategoryId: project.subcategory_id },
            budgetLow: project.price_kes,
            budgetHigh: project.price_kes,
            depositKES: project.deposit_kes,
            status: project.status,
            claimedBy: null,
            replies: [],
            selectedDeveloperIds: [],
            devsAssigned: data.devsAssigned ?? null,
            satisfied: true,
            timerEnd: Date.now() + Math.min(data.estimatedDays ?? 14, 30) * 2000,
            estimatedDays: data.estimatedDays ?? 14,
            progressPercent: 5,
            stage: 'commit',
            screenshots: [{ id: 'shot-1', label: 'Kickoff — repo scaffolded', time: 'just now' }],
            changeRequests: [],
            createdAt: Date.now(),
          },
          ...list,
        ])
        pushToast({
          title: 'Request submitted successfully',
          message: 'Sent to our developers — confirmation emailed to you.',
          confetti: true,
        })
        return project.id
      } catch (err) {
        pushToast({
          title: 'Could not submit request',
          message: err instanceof ApiError ? err.message : 'The server could not be reached.',
        })
        return null
      }
    },
    [currentUser, role, pushToast]
  )

  // NOTE: everything below this line (claim/reply/dev-selection/stage
  // advance/satisfaction/completion, plus clarifications, misconduct
  // reports, vacancies, applications, logged-in-user admin, and broadcasts)
  // still operates on local component state, not the backend. None of those
  // have API routes yet. Treat this as the honest boundary of "real data" in
  // this app right now — wiring each of these up follows the exact same
  // pattern as submitProjectRequest above once the corresponding Express
  // route exists.

  const claimRequest = useCallback((requestId, devId) => {
    setProjectRequests((list) =>
      list.map((r) => (r.id === requestId && !r.claimedBy ? { ...r, claimedBy: devId, status: 'claimed' } : r))
    )
  }, [])

  const addReply = useCallback((requestId, author, text, isAdmin) => {
    setProjectRequests((list) =>
      list.map((r) => {
        if (r.id !== requestId) return r
        if (!isAdmin && r.claimedBy && author.id !== r.claimedBy) return r
        return { ...r, replies: [...r.replies, { author: author.name, time: 'just now', text }], status: 'in-discussion' }
      })
    )
  }, [])

  const setRequestDevelopers = useCallback((requestId, devIds) => {
    setProjectRequests((list) => list.map((r) => (r.id === requestId ? { ...r, selectedDeveloperIds: devIds } : r)))
  }, [])

  const setRequestSatisfaction = useCallback((requestId, satisfied) => {
    setProjectRequests((list) =>
      list.map((r) => {
        if (r.id !== requestId) return r
        if (!satisfied) return { ...r, satisfied: false }
        const demoMs = Math.min(r.estimatedDays, 30) * 2000
        return {
          ...r,
          satisfied: true,
          status: 'in-progress',
          timerEnd: Date.now() + demoMs,
          progressPercent: 5,
          screenshots: [{ id: 'shot-1', label: 'Kickoff — repo scaffolded', time: 'just now' }],
        }
      })
    )
  }, [])

  const completeRequest = useCallback(
    (requestId) => {
      setProjectRequests((list) =>
        list.map((r) => (r.id === requestId ? { ...r, status: 'completed', progressPercent: 100, stage: 'deploy' } : r))
      )
      pushToast({ title: 'Project completed', message: 'A completion email has been sent to the client.', confetti: true })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  )

  const advanceStage = useCallback((requestId) => {
    setProjectRequests((list) =>
      list.map((r) => {
        if (r.id !== requestId) return r
        const idx = pipelineStages.indexOf(r.stage)
        const nextStage = pipelineStages[Math.min(idx + 1, pipelineStages.length - 1)]
        const bump = Math.round(100 / pipelineStages.length)
        return { ...r, stage: nextStage, progressPercent: Math.min(100, r.progressPercent + bump) }
      })
    )
  }, [])

  const submitChangeRequest = useCallback(
    (requestId, text) => {
      setProjectRequests((list) =>
        list.map((r) =>
          r.id === requestId
            ? { ...r, changeRequests: [...r.changeRequests, { id: genId('CR'), text, time: 'just now', from: currentUser?.name }] }
            : r
        )
      )
      pushToast({ title: 'Change request submitted', message: 'Your development team has been notified in real time.' })
    },
    [currentUser, pushToast]
  )

  // Clarification requests posted under "What we build" — visible to developer/admin dashboards
  const [clarifications, setClarifications] = useState([])

  const submitClarification = useCallback(
    (text, taggedServiceId) => {
      const id = genId('CLR')
      setClarifications((list) => [
        { id, author: currentUser?.name ?? 'Anonymous visitor', role, text, taggedServiceId: taggedServiceId ?? null, time: 'just now' },
        ...list,
      ])
      pushToast({
        title: 'Submitted successfully to developers',
        message: 'An email confirmation has been sent to you.',
      })
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, role]
  )

  // --- Developer misconduct reports — visible only on the admin dashboard ---
  const [misconductReports, setMisconductReports] = useState([])
  const submitMisconductReport = useCallback(
    (text) => {
      setMisconductReports((list) => [
        { id: genId('MC'), text, author: currentUser?.name ?? 'Anonymous', time: 'just now' },
        ...list,
      ])
      pushToast({ title: 'Report submitted', message: 'Our admin team has been notified confidentially.' })
    },
    [currentUser, pushToast]
  )

  // --- Vacancies (admin-managed) + job applications ---
  const [vacancies, setVacancies] = useState([
    { id: 'v1', title: 'Senior Full-Stack Engineer', open: true },
    { id: 'v2', title: 'ML Engineer', open: true },
    { id: 'v3', title: 'DevOps Engineer', open: false },
    { id: 'v4', title: 'Product Designer', open: true },
  ])
  const toggleVacancy = useCallback((id) => {
    setVacancies((list) => list.map((v) => (v.id === id ? { ...v, open: !v.open } : v)))
  }, [])

  const [applications, setApplications] = useState([])
  const submitApplication = useCallback(
    (data) => {
      setApplications((list) => [{ id: genId('APP'), time: 'just now', ...data }, ...list])
      pushToast({ title: 'Application sent', message: "Emailed to our hiring admin — we'll follow up if it's a fit." })
    },
    [pushToast]
  )

  const [loggedInUsers, setLoggedInUsers] = useState([])
  // Real data from the backend's admin-only user list — note the route path
  // itself is deliberately non-default (see ADMIN_ROUTE_PREFIX in the
  // backend's .env), so VITE_ADMIN_ROUTE_PREFIX must match it.
  useEffect(() => {
    if (role !== 'admin') return
    const prefix = import.meta.env.VITE_ADMIN_ROUTE_PREFIX ?? 'ops-console-7f3a'
    api
      .get(`/api/${prefix}/users`)
      .then(({ users }) =>
        // "online" here is approximated from lockout state, not a real
        // presence signal — there's no session-presence tracking on the
        // backend yet. Good enough for now, not something to build UI trust on.
        setLoggedInUsers(users.map((u) => ({ id: u.id, name: u.name, role: u.role, email: u.email, online: !u.locked_until })))
      )
      .catch(() => {})
  }, [role])

  const removeUser = useCallback((id) => setLoggedInUsers((list) => list.filter((u) => u.id !== id)), [])
  const updateUser = useCallback(
    (id, fields) => setLoggedInUsers((list) => list.map((u) => (u.id === id ? { ...u, ...fields } : u))),
    []
  )
  const addUser = useCallback((user) => setLoggedInUsers((list) => [...list, { id: genId('u'), online: false, ...user }]), [])

  const [broadcasts, setBroadcasts] = useState([])
  const sendBroadcast = useCallback(
    (text, targetIds) => {
      setBroadcasts((list) => [{ id: genId('BC'), text, targetIds: targetIds ?? 'all', time: 'just now' }, ...list])
      pushToast({ title: 'Broadcast sent', message: 'Delivered to dashboards and email for the selected recipients.' })
    },
    [pushToast]
  )

  const value = {
    theme,
    toggleTheme: () => setTheme((t) => (t === 'dark' ? 'light' : 'dark')),
    role,
    isAuthed,
    authChecked,
    currentUser,
    completeAuth,
    logout,
    updateProfile,
    deactivateAccount,
    greeting,
    dismissGreeting: () => setGreeting(null),
    developers,
    toasts,
    pushToast,
    dismissToast,
    notifications,
    markNotificationRead,
    markAllRead,
    dyslexiaFont,
    setDyslexiaFont,
    fontScale,
    setFontScale,
    reading,
    readAloud,
    stopReading,
    language,
    setLanguage,
    t,
    selectedEntity,
    setSelectedEntity,
    projectRequests,
    submitProjectRequest,
    claimRequest,
    addReply,
    setRequestDevelopers,
    setRequestSatisfaction,
    completeRequest,
    advanceStage,
    submitChangeRequest,
    pipelineStages,
    clarifications,
    submitClarification,
    misconductReports,
    submitMisconductReport,
    vacancies,
    toggleVacancy,
    applications,
    submitApplication,
    loggedInUsers,
    removeUser,
    updateUser,
    addUser,
    broadcasts,
    sendBroadcast,
  }

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export function useApp() {
  const ctx = useContext(AppContext)
  if (!ctx) throw new Error('useApp must be used within AppProvider')
  return ctx
}
