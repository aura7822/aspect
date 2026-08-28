import { useState } from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { LogIn, UserPlus, Briefcase, User, Code2, ShieldCheck, Eye, EyeOff, ShieldQuestion, Mail, Clock, Compass } from 'lucide-react'
import clsx from 'clsx'
import GlassCard from '../components/GlassCard.jsx'
import Logo from '../components/Logo.jsx'
import { useApp } from '../context/AppContext.jsx'
import { api, ApiError } from '../lib/apiClient.js'

const roleOptions = [
  { id: 'client', label: 'Client', icon: Briefcase, blurb: 'I have a project I want built' },
  { id: 'enduser', label: 'End-User', icon: User, blurb: "I use a product Aspect's already shipped" },
  { id: 'developer', label: 'Developer', icon: Code2, blurb: "I'm part of the Aspect team" },
  { id: 'admin', label: 'Sudo', icon: ShieldCheck, blurb: 'I manage the Project' },
]

export default function Login() {
  const { role, completeAuth, pushToast } = useApp()
  const navigate = useNavigate()

  // 'login' | 'signup' | 'awaiting-verification' | 'mfa' | 'pending-approval'
  const [stage, setStage] = useState('login')
  const [selectedRole, setSelectedRole] = useState('client')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [verificationCode, setVerificationCode] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  // Developer signup fields
  const [github, setGithub] = useState('')
  const [openSource, setOpenSource] = useState('')

  // MFA step state
  const [challengeId, setChallengeId] = useState(null)
  const [mfaCode, setMfaCode] = useState('')

  if (role !== 'visitor') return <Navigate to="/dashboard" replace />

  const isSignup = stage === 'signup'
  const isDeveloperSignup = isSignup && selectedRole === 'developer'
  const valid = isSignup
    ? name.trim() &&
      email.trim() &&
      password.trim() &&
      (!isDeveloperSignup || (github.trim() && openSource.trim()))
    : email.trim() && password.trim()

  async function completeLogin(user) {
    completeAuth(user)
    pushToast({ title: 'Signed in', message: `You're in as ${user.name}.` })
    navigate('/dashboard')
  }

  async function submit() {
    if (!valid || loading) return
    setError(null)
    setLoading(true)
    try {
      if (isSignup) {
        await api.post('/api/auth/register', {
          email: email.trim(),
          password,
          name: name.trim(),
          role: selectedRole,
          github: isDeveloperSignup ? github.trim() : undefined,
          openSource: isDeveloperSignup ? openSource.trim() : undefined,
          formRenderedAt: Date.now() - 5000,
        })
        // Developers require admin verification; others just need email verification
        setStage(isDeveloperSignup ? 'pending-approval' : 'awaiting-verification')
      } else {
        const result = await api.post('/api/auth/login', { email: email.trim(), password })
        if (result.mfaRequired) {
          setChallengeId(result.challengeId)
          setStage('mfa')
        } else {
          await completeLogin(result.user)
        }
      }
    } catch (err) {
      if (err instanceof ApiError && err.body?.error === 'EMAIL_NOT_VERIFIED') {
        setStage('awaiting-verification')
        setError(null)
      } else if (err instanceof ApiError && err.body?.error === 'ACCOUNT_PENDING_APPROVAL') {
        setStage('pending-approval')
        setError(null)
      } else {
        setError(err instanceof ApiError ? err.message : 'Could not reach the server. Is the backend running?')
      }
    } finally {
      setLoading(false)
    }
  }

  // Visiting without an account at all — currentUser stays null, which the
  // rest of the app already treats as role: 'visitor'. No API call needed.
  function continueAsGuest() {
    navigate('/')
  }

  async function submitMfa() {
    if (!mfaCode.trim() || loading) return
    setError(null)
    setLoading(true)
    try {
      const { user } = await api.post('/api/auth/mfa/verify', { challengeId, code: mfaCode.trim() })
      await completeLogin(user)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  async function verifyEmailCode() {
    const normalized = verificationCode.replace(/\D/g, '').slice(0, 6)
    if (!normalized || loading) return

    setError(null)
    setLoading(true)
    try {
      await api.post('/api/auth/verify-email', { code: normalized })
      setStage('login')
      setVerificationCode('')
      pushToast({ title: 'Email verified', message: 'Your account is verified. You can log in now.' })
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  async function resendVerification() {
    setLoading(true)
    try {
      await api.post('/api/auth/resend-verification', { email: email.trim() })
      pushToast({ title: 'Email sent', message: 'Check your inbox for a new verification code.' })
    } finally {
      setLoading(false)
    }
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
          {stage === 'awaiting-verification' && (
            <div className="text-center py-4">
              <Mail size={28} className="text-signal-bright mx-auto mb-4" />
              <h3 className="font-display text-lg mb-2">Check your email</h3>
              <p className="text-sm text-fg-muted mb-5">
                We sent a 6-digit verification code to <span className="text-fg-secondary">{email}</span>.
              </p>

              <input
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={(e) => e.key === 'Enter' && verifyEmailCode()}
                placeholder="000000"
                inputMode="numeric"
                autoFocus
                className="input-field text-center text-2xl tracking-[0.5em] font-mono"
              />

              {error && (
                <p className="text-sm text-bad mt-3 text-center" role="alert">
                  {error}
                </p>
              )}

              <button
                onClick={verifyEmailCode}
                disabled={verificationCode.length !== 6 || loading}
                className="w-full mt-4 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring disabled:opacity-40"
              >
                {loading ? 'Verifying…' : 'Verify email'}
              </button>

              <button
                onClick={resendVerification}
                disabled={loading}
                className="mt-4 text-sm text-signal-bright hover:underline focus-ring disabled:opacity-40"
              >
                Resend verification code
              </button>
              <div className="mt-6 pt-6 border-t border-subtle">
                <button
                  onClick={() => {
                    setStage('login')
                    setVerificationCode('')
                    setError(null)
                  }}
                  className="text-sm text-fg-secondary hover:text-fg-primary focus-ring"
                >
                  ← Back to log in
                </button>
              </div>
            </div>
          )}

          {stage === 'pending-approval' && (
            <div className="text-center py-4">
              <Clock size={28} className="text-signal-bright mx-auto mb-4" />
              <h3 className="font-display text-lg mb-2">Awaiting admin approval</h3>
              <p className="text-sm text-fg-muted mb-2">
                Your developer account has been created successfully!
              </p>
              <p className="text-sm text-fg-muted mb-6">
                Our admin team at <span className="text-signal-bright font-medium">joshuaura7822@gmail.com</span> will verify your GitHub and open source URLs. You'll be notified by email once approval is complete.
              </p>
              <div className="bg-surface-1 rounded-lg p-4 mb-6 text-left text-xs text-fg-secondary">
                <p className="font-medium text-fg-primary mb-2">What happens next:</p>
                <ul className="space-y-1 list-disc list-inside">
                  <li>Admin reviews your profiles</li>
                  <li>Email verification link is sent</li>
                  <li>You can log in after verification</li>
                </ul>
              </div>
              <button onClick={() => setStage('login')} className="text-sm text-fg-secondary hover:text-fg-primary focus-ring">
                ← Back to log in
              </button>
            </div>
          )}

          {stage === 'mfa' && (
            <div>
              <div className="text-center mb-6">
                <ShieldQuestion size={28} className="text-signal-bright mx-auto mb-4" />
                <h3 className="font-display text-lg mb-1">Enter your 6-digit code</h3>
                <p className="text-sm text-fg-muted">Open your authenticator app to get the current code.</p>
              </div>
              <input
                value={mfaCode}
                onChange={(e) => setMfaCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={(e) => e.key === 'Enter' && submitMfa()}
                placeholder="000000"
                inputMode="numeric"
                autoFocus
                className="input-field text-center text-2xl tracking-[0.5em] font-mono"
              />
              {error && (
                <p className="text-sm text-bad mt-3 text-center" role="alert">
                  {error}
                </p>
              )}
              <button
                onClick={submitMfa}
                disabled={mfaCode.length !== 6 || loading}
                className="w-full mt-4 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring disabled:opacity-40"
              >
                {loading ? 'Verifying…' : 'Verify'}
              </button>
              <button
                onClick={() => {
                  setStage('login')
                  setMfaCode('')
                  setError(null)
                }}
                className="w-full mt-3 text-sm text-fg-muted hover:text-fg-primary focus-ring"
              >
                ← Back to log in
              </button>
            </div>
          )}

          {(stage === 'login' || stage === 'signup') && (
            <>
              <div className="flex gap-1 mb-6 border border-subtle rounded-lg p-1">
                <button
                  onClick={() => setStage('login')}
                  className={clsx('flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-colors focus-ring', stage === 'login' ? 'bg-signal text-white' : 'text-fg-muted')}
                >
                  <LogIn size={14} /> Log in
                </button>
                <button
                  onClick={() => setStage('signup')}
                  className={clsx('flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-sm font-medium transition-colors focus-ring', stage === 'signup' ? 'bg-signal text-white' : 'text-fg-muted')}
                >
                  <UserPlus size={14} /> Get Started
                </button>
              </div>

              {isSignup && (
                <div className="mb-5">
                  <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-2">I'm a...</div>
                  <div className="grid grid-cols-2 gap-2">
                    {roleOptions.map((r) => (
                      <button
                        key={r.id}
                        onClick={() => {
                          setSelectedRole(r.id)
                          // Reset developer fields if role changes away from developer
                          if (r.id !== 'developer') {
                            setGithub('')
                            setOpenSource('')
                          }
                        }}
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
              )}

              <div className="space-y-3">
                {isSignup && (
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="input-field" />
                )}
                <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Email" className="input-field" />
                <div className="relative">
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Password"
                    className="input-field pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-fg-muted hover:text-fg-primary focus-ring"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
                {isDeveloperSignup && (
                  <>
                    <input
                      value={github}
                      onChange={(e) => setGithub(e.target.value)}
                      type="url"
                      placeholder="GitHub profile URL (required)"
                      className="input-field"
                    />
                    <input
                      value={openSource}
                      onChange={(e) => setOpenSource(e.target.value)}
                      type="url"
                      placeholder="Open source contributions URL (required)"
                      className="input-field"
                    />
                    <div className="p-3 rounded-lg bg-signal/5 border border-signal/20">
                      <p className="text-xs text-fg-secondary">IMPORTANT: Your profile will be verified by our admin team soon</p>
                    </div>
                  </>
                )}
              </div>

              {!isSignup && (
                <div className="flex justify-end mt-2">
                  <Link to="/forgot-password" className="text-xs text-signal-bright hover:underline focus-ring">
                    Forgot password?
                  </Link>
                </div>
              )}

              {error && (
                <p className="text-sm text-bad mt-4 text-center" role="alert">
                  {error}
                </p>
              )}

              <button
                onClick={submit}
                disabled={!valid || loading}
                className="w-full mt-4 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring disabled:opacity-40"
              >
                {loading ? 'Please wait…' : isSignup ? 'Create account' : 'Log in'}
              </button>
              <p className="text-[11px] text-fg-muted mt-3 text-center">
                NOTICE: By proceeding you agree to our terms of service
                
              </p>

              <div className="flex items-center gap-3 my-5">
                <div className="flex-1 h-px bg-subtle" />
                <span className="text-xs text-fg-muted">or</span>
                <div className="flex-1 h-px bg-subtle" />
              </div>

              <button
                onClick={continueAsGuest}
                className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-subtle text-sm font-medium text-fg-secondary hover:border-strong hover:text-fg-primary transition-colors focus-ring"
              >
                <Compass size={15} /> Continue as guest
              </button>
            </>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
