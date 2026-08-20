import React, { createContext, useContext, useEffect, useState, useCallback, useRef } from 'react'
import { notifications as seedNotifications } from '../data/notifications.js'
import { developers as seedDevelopers } from '../data/developers.js'
import { t as translate } from '../data/i18n.js'

const AppContext = createContext(null)

const mockUsers = {
  visitor: null,
  client: { name: 'client1', org: 'Ledgerly', role: 'client', email: 'rhea@ledgerly.io', avatar: null },
  enduser: { name: 'user1', org: null, role: 'enduser', email: 'alex@example.com', avatar: null },
  developer: { name: 'Aura Joshua', id: 'dev-1', role: 'developer', email: 'sarah@aspect.dev', avatar: '../public/avatars/avatar1.svg' },
  admin: { name: 'Aura', role: 'admin', email: 'admin@aspect.dev', avatar: null },
}

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
    if (typeof window === 'undefined') return 'light'
    return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark'
  })
  const [role, setRoleState] = useState('visitor') // visitor | client | enduser | developer | admin
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

  const isAuthed = role !== 'visitor'

  // --- Account (mutable profile fields layered on top of the mock user for the active role) ---
  const [profileOverrides, setProfileOverrides] = useState({})
  const currentUser = mockUsers[role] ? { ...mockUsers[role], ...profileOverrides[role] } : null

  const updateProfile = useCallback(
    (fields) => {
      setProfileOverrides((all) => ({ ...all, [role]: { ...all[role], ...fields } }))
      pushToast({ title: 'Account updated', message: 'Your changes have been saved.' })
    },
    [role, pushToast]
  )

  const deactivateAccount = useCallback(() => {
    pushToast({ title: 'Account deactivated', message: 'You have been signed out.' })
    setRoleState('visitor')
  }, [pushToast])

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

  const setRole = useCallback((r) => {
    prevRole.current = role === 'visitor' ? 'visitor' : prevRole.current
    setRoleState(r)
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

  // Pre-selected service entity carried from a service card / pricing pick into Start a Project
  const [selectedEntity, setSelectedEntity] = useState(null) // { serviceId, subcategoryId }

  // Project requests (Start a Project submissions) — visible to developer/admin dashboards
  const [projectRequests, setProjectRequests] = useState([])

  const submitProjectRequest = useCallback(
    (data) => {
      const id = genId('REQ')
      const demoMs = Math.min(data.estimatedDays ?? 14, 30) * 2000
      const record = {
        id,
        clientName: currentUser?.name ?? 'Anonymous visitor',
        clientOrg: currentUser?.org ?? null,
        clientRole: role,
        description: data.description,
        projectName: data.projectName ?? '',
        field: data.field ?? '',
        projectType: data.projectType ?? '',
        businessGoal: data.businessGoal ?? '',
        additionalDescription: data.additionalDescription ?? '',
        targetPlatforms: data.targetPlatforms ?? [],
        clientBudget: data.clientBudget ?? null,
        estimatePrice: data.estimatePrice ?? null,
        tech: data.tech ?? '',
        budgetLow: data.budgetLow,
        budgetHigh: data.budgetHigh,
        entity: data.entity ?? null,
        status: 'in-progress',
        claimedBy: null,
        replies: [],
        selectedDeveloperIds: [],
        devsAssigned: data.devsAssigned ?? null,
        satisfied: true,
        timerEnd: Date.now() + demoMs,
        estimatedDays: data.estimatedDays ?? 14,
        depositKES: data.depositKES ?? null,
        progressPercent: 5,
        stage: 'commit',
        screenshots: [{ id: 'shot-1', label: 'Kickoff - repo scaffolded', time: 'just now' }],
        changeRequests: [],
        createdAt: Date.now(),
      }
      setProjectRequests((list) => [record, ...list])
      pushToast({
        title: 'Request submitted successfully',
        message: 'Sent to our developers - confirmation emailed to you.',
        confetti: true,
      })
      return id
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [currentUser, role]
  )

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
          screenshots: [{ id: 'shot-1', label: 'Kickoff - repo scaffolded', time: 'just now' }],
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
      pushToast({ title: 'Application sent', message: "Emailed to our hiring admin - we'll follow up if it's a fit." })
    },
    [pushToast]
  )

  const [loggedInUsers, setLoggedInUsers] = useState([
    { id: 'u1', name: 'Gideon Okune', role: 'client', email: 'rhea@ledgerly.io', online: true },
    { id: 'u2', name: 'Jesicah Kageha', role: 'enduser', email: 'alex@example.com', online: true },
    { id: 'u3', name: 'Nathan Okello', role: 'developer', email: 'sarah@aspect.dev', online: true },
    { id: 'u4', name: 'Nevleen', role: 'developer', email: 'marcus@aspect.dev', online: false },
    { id: 'u5', name: 'Moses', role: 'client', email: 'jon@vitalpath.io', online: false },
  ])

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
    setRole,
    isAuthed,
    currentUser,
    updateProfile,
    deactivateAccount,
    greeting,
    dismissGreeting: () => setGreeting(null),
    developers: seedDevelopers,
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
