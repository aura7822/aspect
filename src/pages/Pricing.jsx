import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import clsx from 'clsx'
import { Check, Smartphone, Wallet, Bitcoin } from 'lucide-react'
import { packages } from '../data/pricing.js'
import { serviceCatalog, formatKES, minDeposit, findEntity } from '../data/serviceCatalog.js'
import GlassCard from '../components/GlassCard.jsx'
import { useApp } from '../context/AppContext.jsx'

const paymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', icon: Smartphone, note: 'STK push to your phone' },
  { id: 'paypal', name: 'PayPal', icon: Wallet, note: 'Pay with your PayPal balance or card' },
  { id: 'bitcoin', name: 'Bitcoin', icon: Bitcoin, note: 'Pay via an on-chain transfer' },
]

export default function Pricing() {
  const navigate = useNavigate()
  const { selectedEntity, setSelectedEntity, pushToast, role } = useApp()
  const [browseServiceId, setBrowseServiceId] = useState(serviceCatalog[0].id)
  const [method, setMethod] = useState(null)

  const picked = selectedEntity ? findEntity(selectedEntity.serviceId, selectedEntity.subcategoryId) : null

  function requireLogin() {
    if (role === 'visitor') {
      pushToast({ title: 'Please log in', message: 'Create an account to continue with pricing and project requests.' })
      navigate('/login', { state: { from: '/pricing' } })
      return true
    }
    return false
  }

  function pick(serviceId, subcategoryId) {
    if (requireLogin()) return
    setSelectedEntity({ serviceId, subcategoryId })
    setMethod(null)
  }

  function payDeposit() {
    if (requireLogin()) return
    if (!method) return
    pushToast({
      title: 'Deposit request created',
      message: `A ${paymentMethods.find((m) => m.id === method)?.name} checkout would open here once payments are connected on the backend.`,
    })
  }

  return (
    <div className="container-page py-16">
      <h1 className="font-display text-3xl mb-2">🄏 ₱ricing</h1>
      <p className="text-fg-muted max-w-xl mb-10">
        Our rates shift in between KES 30000 to KES 20000 [$230-$1600] or above depending on the workload.
      </p>

      {picked && (
        <GlassCard className="p-6 mb-8 border-signal/40 ring-1 ring-signal/20">
          <span className="text-xs font-mono uppercase tracking-wide text-signal-bright">Your selection</span>
          <div className="flex flex-wrap items-end justify-between gap-4 mt-2">
            <div>
              <h3 className="font-display text-xl">
                {picked.service.name} — {picked.sub.name}
              </h3>
              <p className="text-sm text-fg-secondary mt-1 max-w-md">{picked.sub.description}</p>
              <div className="flex items-center gap-3 mt-2 text-xs font-mono text-fg-muted">
                <span>{picked.sub.devsRequired} developer{picked.sub.devsRequired > 1 ? 's' : ''}</span>
                <span>·</span>
                <span>~{picked.sub.estDays} days</span>
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-2xl text-signal-bright">{formatKES(picked.sub.priceKES)}</div>
              <div className="text-xs text-fg-muted mt-1">Minimum deposit: {formatKES(minDeposit(picked.sub.priceKES))}</div>
              <button
                onClick={() => {
                  if (requireLogin()) return
                  navigate('/start-a-project')
                }}
                className="mt-2 px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring"
              >
                Get started
              </button>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-subtle">
            <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-3">Pay your deposit</div>
            <div className="grid sm:grid-cols-3 gap-3 mb-4">
              {paymentMethods.map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={clsx(
                    'p-3.5 rounded-xl border text-left transition-colors focus-ring',
                    method === m.id ? 'border-signal bg-signal/10' : 'border-subtle hover:border-strong'
                  )}
                >
                  <m.icon size={18} className="text-signal-bright mb-2" />
                  <div className="text-sm text-fg-primary">{m.name}</div>
                  <div className="text-xs text-fg-muted mt-0.5">{m.note}</div>
                </button>
              ))}
            </div>
            <button
              onClick={payDeposit}
              disabled={!method}
              className="w-full py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring disabled:opacity-40"
            >
              Pay {formatKES(minDeposit(picked.sub.priceKES))} deposit
            </button>
            <p className="text-[11px] text-fg-muted mt-2">
              No personal user information is stored during this exercise

            </p>
          </div>
        </GlassCard>
      )}

      <div className="grid md:grid-cols-3 gap-5 mb-16">
        {packages.map((p) => (
          <GlassCard
            key={p.name}
            className={clsx('p-6 flex flex-col', p.featured && 'border-signal/50 ring-1 ring-signal/30')}
          >
            {p.featured && (
              <span className="self-start text-[10px] font-mono uppercase tracking-wide text-signal-bright bg-signal/15 px-2 py-1 rounded-full mb-3">
                Most common
              </span>
            )}
            <h3 className="font-display text-lg">{p.name}</h3>
            <div className="font-mono text-2xl text-fg-primary mt-2">From {formatKES(p.priceKES)}</div>
            <div className="text-xs text-fg-muted mt-0.5">{p.duration}</div>
            <p className="text-sm text-fg-secondary mt-4 leading-relaxed">{p.blurb}</p>
            <ul className="mt-5 space-y-2 flex-1">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-fg-secondary">
                  <Check size={14} className="text-good shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                if (requireLogin()) return
                navigate('/start-a-project')
              }}
              className={clsx(
                'mt-6 text-center px-4 py-2.5 rounded-lg text-sm font-medium focus-ring transition-colors',
                p.featured ? 'bg-signal text-white hover:bg-signal-bright' : 'border border-subtle text-fg-secondary hover:border-strong'
              )}
            >
              Get started
            </button>
          </GlassCard>
        ))}
      </div>

      <h2 className="font-display text-2xl mb-2">❖ Browse by category</h2>
      <p className="text-fg-muted mb-6">Pick a service, then a category, to lock in a price.</p>
      <div className="flex flex-wrap gap-2 mb-6">
        {serviceCatalog.map((s) => (
          <button
            key={s.id}
            onClick={() => setBrowseServiceId(s.id)}
            className={clsx(
              'px-3.5 py-1.5 text-sm rounded-full border focus-ring',
              browseServiceId === s.id ? 'border-signal text-signal-bright bg-signal/10' : 'border-subtle text-fg-secondary'
            )}
          >
            {s.name}
          </button>
        ))}
      </div>
      <div className="grid sm:grid-cols-2 gap-3">
        {serviceCatalog
          .find((s) => s.id === browseServiceId)
          .subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => pick(browseServiceId, sub.id)}
              className={clsx(
                'text-left p-4 rounded-xl border transition-colors focus-ring flex items-center justify-between gap-3',
                selectedEntity?.subcategoryId === sub.id && selectedEntity?.serviceId === browseServiceId
                  ? 'border-signal bg-signal/10'
                  : 'border-subtle hover:border-strong'
              )}
            >
              <span>
                <span className="block text-sm text-fg-primary">{sub.name}</span>
                <span className="block text-xs text-fg-muted mt-0.5">{sub.description}</span>
              </span>
              <span className="font-mono text-sm text-signal-bright shrink-0">{formatKES(sub.priceKES)}</span>
            </button>
          ))}
      </div>
    </div>
  )
}
