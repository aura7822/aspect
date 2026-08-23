import { useEffect, useRef, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { CheckCircle2, XCircle, Loader2 } from 'lucide-react'
import GlassCard from '../components/GlassCard.jsx'
import Logo from '../components/Logo.jsx'
import { api, ApiError } from '../lib/apiClient.js'

export default function VerifyEmail() {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token') ?? ''
  const [status, setStatus] = useState('verifying') // verifying | success | error
  const [message, setMessage] = useState('')
  // Verification tokens are single-use, so React StrictMode's dev-mode
  // double-invocation of effects would otherwise fire the request twice —
  // the second call correctly fails (token already consumed) and would
  // clobber the first call's success. This ref makes the request fire once.
  const requested = useRef(false)

  useEffect(() => {
    if (!token) {
      setStatus('error')
      setMessage('This link is missing its token.')
      return
    }
    if (requested.current) return
    requested.current = true
    api
      .post('/api/auth/verify-email', { token })
      .then(() => setStatus('success'))
      .catch((err) => {
        setStatus('error')
        setMessage(err instanceof ApiError ? err.message : 'Could not reach the server.')
      })
  }, [token])

  return (
    <div className="container-page py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo size={36} />
          <h1 className="font-display text-2xl mt-3">Email verification</h1>
        </div>

        <GlassCard className="p-6 md:p-8 text-center py-10">
          {status === 'verifying' && (
            <>
              <Loader2 size={28} className="text-signal-bright mx-auto mb-4 animate-spin" />
              <p className="text-sm text-fg-muted">Verifying your email…</p>
            </>
          )}
          {status === 'success' && (
            <>
              <CheckCircle2 size={28} className="text-good mx-auto mb-4" />
              <h3 className="font-display text-lg mb-2">Email verified</h3>
              <p className="text-sm text-fg-muted mb-6">You can log in now.</p>
              <Link to="/login" className="inline-flex px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring">
                Go to log in
              </Link>
            </>
          )}
          {status === 'error' && (
            <>
              <XCircle size={28} className="text-bad mx-auto mb-4" />
              <h3 className="font-display text-lg mb-2">Verification failed</h3>
              <p className="text-sm text-fg-muted">{message}</p>
            </>
          )}
        </GlassCard>
      </div>
    </div>
  )
}
