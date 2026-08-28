import { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, Loader2 } from 'lucide-react'
import GlassCard from '../components/GlassCard.jsx'
import Logo from '../components/Logo.jsx'
import { api, ApiError } from '../lib/apiClient.js'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const legacyToken = searchParams.get('token') ?? ''
  const [code, setCode] = useState('')
  const [status, setStatus] = useState(legacyToken ? 'verifying' : 'idle')
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  async function submitVerification(nextCode) {
    const normalized = String(nextCode ?? code).replace(/\D/g, '').slice(0, 6)
    if (!normalized) {
      setStatus('error')
      setMessage('Enter the 6-digit verification code.')
      return
    }

    setLoading(true)
    setStatus('verifying')
    setMessage('')

    try {
      const payload = legacyToken ? { token: legacyToken } : { code: normalized }
      if (!legacyToken) payload.code = normalized
      await api.post('/api/auth/verify-email', payload)
      setStatus('success')
      setMessage('')
    } catch (err) {
      setStatus('error')
      setMessage(err instanceof ApiError ? err.message : 'Could not reach the server.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!legacyToken || status !== 'verifying' || loading) return
    submitVerification(legacyToken)
  }, [legacyToken, status, loading])

  return (
    <div className="container-page py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo size={36} />
          <h1 className="font-display text-2xl mt-3">Email verification</h1>
        </div>

        <GlassCard className="p-6 md:p-8">
          {status === 'verifying' && (
            <div className="text-center py-4">
              <Loader2 size={28} className="text-signal-bright mx-auto mb-4 animate-spin" />
              <p className="text-sm text-fg-muted">Verifying your email…</p>
            </div>
          )}

          {(status === 'idle' || status === 'error') && (
            <div>
              <p className="text-sm text-fg-muted mb-5 text-center">
                Enter the 6-digit code we sent to your email to verify your account.
              </p>
              <input
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                onKeyDown={(e) => e.key === 'Enter' && submitVerification()}
                placeholder="000000"
                inputMode="numeric"
                autoFocus
                className="input-field text-center text-2xl tracking-[0.5em] font-mono"
              />
              {status === 'error' && (
                <p className="text-sm text-bad mt-3 text-center" role="alert">
                  {message}
                </p>
              )}
              <button
                onClick={() => submitVerification()}
                disabled={code.length !== 6 || loading}
                className="w-full mt-4 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring disabled:opacity-40"
              >
                {loading ? 'Verifying…' : 'Verify email'}
              </button>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center py-4">
              <CheckCircle2 size={28} className="text-good mx-auto mb-4" />
              <h3 className="font-display text-lg mb-2">Email verified</h3>
              <p className="text-sm text-fg-muted mb-6">You can log in now.</p>
              <Link to="/login" className="inline-flex px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring">
                Go to log in
              </Link>
            </div>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
