import { useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { Eye, EyeOff, CheckCircle2 } from 'lucide-react'
import GlassCard from '../components/GlassCard.jsx'
import Logo from '../components/Logo.jsx'
import { api, ApiError } from '../lib/apiClient.js'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token') ?? ''

  const [newPassword, setNewPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState(null)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!newPassword.trim() || loading) return
    setError(null)
    setLoading(true)
    try {
      await api.post('/api/auth/password-reset/confirm', { token, newPassword })
      setDone(true)
      // Resetting a password revokes every existing session server-side —
      // the person has to log in fresh, on this device too.
      setTimeout(() => navigate('/login'), 2500)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="container-page py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo size={36} />
          <h1 className="font-display text-2xl mt-3">Set a new password</h1>
        </div>

        <GlassCard className="p-6 md:p-8">
          {!token ? (
            <p className="text-sm text-bad text-center">
              This link is missing its token. Request a new one from the{' '}
              <Link to="/forgot-password" className="text-signal-bright hover:underline">
                forgot password
              </Link>{' '}
              page.
            </p>
          ) : done ? (
            <div className="text-center py-4">
              <CheckCircle2 size={28} className="text-good mx-auto mb-4" />
              <h3 className="font-display text-lg mb-2">Password updated</h3>
              <p className="text-sm text-fg-muted">Taking you to log in…</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-fg-muted mb-5">At least 10 characters, with upper, lower, and a number.</p>
              <div className="relative">
                <input
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && submit()}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New password"
                  autoFocus
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
              {error && (
                <p className="text-sm text-bad mt-3 text-center" role="alert">
                  {error}
                </p>
              )}
              <button
                onClick={submit}
                disabled={!newPassword.trim() || loading}
                className="w-full mt-4 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring disabled:opacity-40"
              >
                {loading ? 'Updating…' : 'Update password'}
              </button>
            </>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
