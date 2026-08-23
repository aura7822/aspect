import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, ArrowLeft } from 'lucide-react'
import GlassCard from '../components/GlassCard.jsx'
import Logo from '../components/Logo.jsx'
import { api } from '../lib/apiClient.js'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function submit() {
    if (!email.trim() || loading) return
    setLoading(true)
    try {
      // Backend always returns the same generic response whether or not the
      // email exists — see controllers/auth.controller.js — so there's
      // nothing to branch on here either.
      await api.post('/api/auth/password-reset/request', { email: email.trim() })
    } finally {
      setSent(true)
      setLoading(false)
    }
  }

  return (
    <div className="container-page py-16 flex justify-center">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <Logo size={36} />
          <h1 className="font-display text-2xl mt-3">Reset your password</h1>
        </div>

        <GlassCard className="p-6 md:p-8">
          {sent ? (
            <div className="text-center py-4">
              <Mail size={28} className="text-signal-bright mx-auto mb-4" />
              <h3 className="font-display text-lg mb-2">Check your email</h3>
              <p className="text-sm text-fg-muted">
                If <span className="text-fg-secondary">{email}</span> has an account, a reset link is on its way. Links
                expire in 30 minutes.
              </p>
            </div>
          ) : (
            <>
              <p className="text-sm text-fg-muted mb-5">
                Enter the email on your account and we'll send a link to reset your password.
              </p>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submit()}
                type="email"
                placeholder="Email"
                autoFocus
                className="input-field"
              />
              <button
                onClick={submit}
                disabled={!email.trim() || loading}
                className="w-full mt-4 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring disabled:opacity-40"
              >
                {loading ? 'Sending…' : 'Send reset link'}
              </button>
            </>
          )}
          <Link to="/login" className="flex items-center justify-center gap-1.5 mt-6 text-sm text-fg-muted hover:text-fg-primary focus-ring">
            <ArrowLeft size={14} /> Back to log in
          </Link>
        </GlassCard>
      </div>
    </div>
  )
}
