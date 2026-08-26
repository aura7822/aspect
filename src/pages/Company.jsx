import { useEffect, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import GlassCard from '../components/GlassCard.jsx'
import { useApp } from '../context/AppContext.jsx'

export default function Company({ page }) {
  if (page === 'about') return <About />
  if (page === 'careers') return <Careers />
  return <Contact />
}

function About() {
  return (
    <div className="container-page py-16 max-w-2xl">
      <h1 className="font-display text-3xl mb-4">About Aspect™</h1>
      <p className="text-fg-secondary leading-relaxed mb-4">
        Aspect is an enterprise small, developer-led studio. We started because too many software builds felt opaque to
        the people paying for them; status came in vague updates instead of visible, working software.
      </p>
      <p className="text-fg-secondary leading-relaxed">
        Every engagement gets a live client dashboard, a public health dashboard, and a team that answers its own Office
        Hours. 
      </p>
    </div>
  )
}

function Careers() {
  const navigate = useNavigate()
  const { vacancies, submitApplication, role, pushToast } = useApp()
  const [openFor, setOpenFor] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [note, setNote] = useState('')
  const [cvName, setCvName] = useState(null)
  const [submittedFor, setSubmittedFor] = useState(null)

  useEffect(() => {
    if (role === 'visitor') {
      pushToast({ title: 'Please log in', message: 'Sign in to apply for a role.' })
    }
  }, [pushToast, role])

  // Vacancy listings are only for clients, end-users, and visitors — not staff.
  if (role === 'developer' || role === 'admin') return <Navigate to="/dashboard" replace />

  if (role === 'visitor') return <Navigate to="/login" replace state={{ from: '/careers' }} />

  const openRoles = vacancies.filter((v) => v.open)

  function apply(vacancy) {
    if (!name.trim() || !email.trim()) return
    submitApplication({ vacancyId: vacancy.id, vacancyTitle: vacancy.title, name: name.trim(), email: email.trim(), note: note.trim(), cvName })
    setSubmittedFor(vacancy.id)
    setOpenFor(null)
    setName('')
    setEmail('')
    setNote('')
    setCvName(null)
  }

  return (
    <div className="container-page py-16 max-w-2xl">
      <h1 className="font-display text-3xl mb-4">Careers</h1>
      <p className="text-fg-secondary leading-relaxed mb-8">
        We hire developers who'd rather ship than perform busywork. Fully remote, async-first, real ownership.
      </p>

      {openRoles.length === 0 && (
        <GlassCard className="p-6 text-center text-sm text-fg-muted">No open vacancies right now — check back soon.</GlassCard>
      )}

      <div className="space-y-3">
        {openRoles.map((v) => (
          <GlassCard key={v.id} className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-fg-primary">{v.title}</span>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-fg-muted">Remote</span>
                <button
                  onClick={() => setOpenFor(openFor === v.id ? null : v.id)}
                  className="text-xs font-mono px-3 py-1.5 rounded-full border border-subtle text-fg-secondary hover:border-strong focus-ring"
                >
                  {openFor === v.id ? 'Close' : 'Apply'}
                </button>
              </div>
            </div>

            {submittedFor === v.id && (
              <p className="text-sm text-good mt-3">Application sent — emailed straight to our hiring admin.</p>
            )}

            {openFor === v.id && (
              <div className="mt-4 pt-4 border-t border-subtle space-y-3">
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" className="input-field" />
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input-field" />
                <textarea value={note} onChange={(e) => setNote(e.target.value)} rows={2} placeholder="Anything you'd like us to know (optional)" className="input-field resize-none" />
                <label className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-dashed border-strong text-sm text-fg-secondary cursor-pointer hover:border-signal/40 focus-ring w-fit">
                  {cvName ?? 'Upload CV *'}
                  <input type="file" className="hidden" onChange={(e) => setCvName(e.target.files?.[0]?.name ?? null)} />
                </label>
                <button
                  onClick={() => apply(v)}
                  disabled={!name.trim() || !email.trim()}
                  className="px-4 py-2 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring disabled:opacity-40"
                >
                  Submit application
                </button>
              </div>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  )
}

function Contact() {
  const { pushToast } = useApp()
  const [sent, setSent] = useState(false)

  function submit(e) {
    e.preventDefault()
    setSent(true)
    pushToast({ title: 'Message sent', message: "We'll get back to you within one business day." })
  }

  return (
    <div className="container-page py-16 max-w-lg">
      <h1 className="font-display text-3xl mb-2">Contact</h1>
      <p className="text-fg-muted mb-8">General inquiries only — for project requests, use Launch a Project.</p>
      {sent ? (
        <GlassCard className="p-6 text-center">
          <p className="text-fg-secondary">Thanks — your message is in. We'll reply soon.</p>
        </GlassCard>
      ) : (
        <form onSubmit={submit} className="space-y-4">
          <input required placeholder="Your name" className="w-full rounded-lg bg-surface-1 border border-subtle px-3.5 py-2.5 text-sm text-fg-primary placeholder:text-fg-muted focus-ring" />
          <input required type="email" placeholder="Email" className="w-full rounded-lg bg-surface-1 border border-subtle px-3.5 py-2.5 text-sm text-fg-primary placeholder:text-fg-muted focus-ring" />
          <textarea required rows={4} placeholder="How can we help?" className="w-full rounded-lg bg-surface-1 border border-subtle px-3.5 py-2.5 text-sm text-fg-primary placeholder:text-fg-muted focus-ring resize-none" />
          <button type="submit" className="px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium focus-ring">
            Send message
          </button>
        </form>
      )}
    </div>
  )
}
