import { useNavigate } from 'react-router-dom'
import TechBadge from './TechBadge.jsx'
import { useApp } from '../context/AppContext.jsx'
import { formatKES } from '../data/serviceCatalog.js'
import { translateService } from '../data/serviceCatalogI18n.js'

export default function ServiceDetailPane({ service: rawService }) {
  const navigate = useNavigate()
  const { setSelectedEntity, language, role, pushToast } = useApp()
  const service = translateService(rawService, language)

  function chooseSubcategory(sub) {
    if (role === 'visitor') {
      setSelectedEntity({ serviceId: service.id, subcategoryId: sub.id })
      pushToast({ title: 'Identity required', message: 'Please log in or sign up to continue with this service.' })
      navigate('/login', { state: { from: '/pricing' } })
      return
    }

    setSelectedEntity({ serviceId: service.id, subcategoryId: sub.id })
    navigate('/pricing')
  }

  return (
    <div className="max-h-[640px] overflow-y-auto pr-1">
      <h3 className="font-display text-xl text-fg-primary mb-1">{service.name}</h3>
      <p className="text-sm text-fg-secondary mb-5">{service.blurb}</p>

      <div className="mb-5">
        <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-2">Tech stack</div>
        <div className="flex flex-wrap gap-1.5">
          {service.stack.map((s) => (
            <TechBadge key={s} name={s} />
          ))}
        </div>
      </div>

      <div className="mb-5">
        <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-2">Applicable industries</div>
        <div className="flex flex-wrap gap-1.5">
          {service.industries.map((i) => (
            <span key={i} className="text-xs px-2.5 py-1 rounded-full border border-subtle text-fg-secondary">
              {i}
            </span>
          ))}
        </div>
      </div>

      <div>
        <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-2">
          Categories — pick one to lock in pricing
        </div>
        <div className="space-y-2 pb-2">
          {service.subcategories.map((sub) => (
            <button
              key={sub.id}
              onClick={() => chooseSubcategory(sub)}
              className="w-full text-left p-3.5 rounded-xl border border-subtle hover:border-signal/50 hover:bg-surface-1 transition-colors focus-ring"
            >
              <div className="flex items-center justify-between gap-3">
                <span className="text-sm text-fg-primary">{sub.name}</span>
                <span className="font-mono text-sm text-signal-bright shrink-0">{formatKES(sub.priceKES)}</span>
              </div>
              <span className="block text-xs text-fg-muted mt-0.5">{sub.description}</span>
              <div className="flex items-center gap-3 mt-2 text-[11px] font-mono text-fg-muted">
                <span>{sub.devsRequired} developer{sub.devsRequired > 1 ? 's' : ''}</span>
                <span>·</span>
                <span>~{sub.estDays} days</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
