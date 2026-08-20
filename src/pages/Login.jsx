import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { LogIn, UserPlus, Briefcase, User, Code2, ShieldCheck } from 'lucide-react'
import clsx from 'clsx'
import GlassCard from '../components/GlassCard.jsx'
import Logo from '../components/Logo.jsx'
import { useApp } from '../context/AppContext.jsx'

const roleOptions = [
  { id: 'client', label: 'Client', icon: Briefcase, blurb: 'I have a project I want built' },
  { id: 'enduser', label: 'End-User', icon: User, blurb: "I use a product Aspect's already shipped" },
  { id: 'developer', label: 'Developer', icon: Code2, blurb: "I'm part of the Aspect team" },
  { id: 'admin', label: 'Sudo', icon: ShieldCheck, blurb: 'System Orchestration' },
]

export default function Login() {
  const { role, setRole, pushToast } = useApp()
  const navigate = useNavigate()
  const [mode, setMode] = useState('login')
  const [selectedRole, setSelectedRole] = useState('client')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  if (role !== 'visitor') return <Navigate to="/dashboard" replace />

  const valid = mode === 'login' ? email.trim() && password.trim() : name.trim() && email.trim() && password.trim()

  function submit() {
    if (!valid) return
    setRole(selectedRole)
    pushToast({
      title: mode === 'login' ? 'Signed in' : 'Account created',
      message: `You're in as ${roleOptions.find((r) => r.id === selectedRole)?.label}.`,
    })
    navigate('/dashboard')
  }

  return (
    <div className="container-page py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo size={36} />
          <h1 className="font-display text-2xl mt-3">Welcome to Aspect™</h1>
          <p className="text-sm text-fg-muted mt-1">Sign in to your workspace, or create an account.</p>
        </div>

        <GlassCard className="p-6 md:p-8">
          <div className="flex gap-1 mb-6 border border-subtle rounded-lg p-1">
            <button
              onClick={() => setMode('login')}
              className={clsx('flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-colors focus-ring', mode === 'login' ? 'bg-signal text-white' : 'text-fg-muted')}
            >
              <LogIn size={14} /> Log in
            </button>
            <button
              onClick={() => setMode('signup')}
              className={clsx('flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-colors focus-ring', mode === 'signup' ? 'bg-signal text-white' : 'text-fg-muted')}
            >
              <UserPlus size={14} /> Sign up
            </button>
          </div>

          <div className="mb-5">
            <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-2">I'm a...</div>
            <div className="grid grid-cols-2 gap-2">
              {roleOptions.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedRole(r.id)}
                  className={clsx(
                    'flex flex-col items-start gap-1 p-3 rounded-xl border text-left transition-colors focus-ring',
                    selectedRole === r.id ? 'border-signal bg-signal/10' : 'border-subtle hover:border-strong'
                  )}
                >
                  <r.icon size={15} className={selectedRole === r.id ? 'text-signal-bright' : 'text-fg-muted'} />
                  <span className="text-sm text-fg-primary">{r.label}</span>
                  <span className="text-[11px] text-fg-muted leading-snug">{r.blurb}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            {mode === 'signup' && (
              <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="input-field" />
            )}
            <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input-field" />
            <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="Password" className="input-field" />
          </div>

          <button
            onClick={submit}
            disabled={!valid}
            className="w-full mt-6 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring disabled:opacity-40"
          >
            {mode === 'login' ? 'Log in' : 'Create account'}
          </button>
          <p className="text-[11px] text-fg-muted mt-3 text-center">
            By proceeding you conform to our terms of services
          </p>
        </GlassCard>
      </div>
    </div>
  )
}
