import { useApp } from '../context/AppContext.jsx'
import { translateService } from '../data/serviceCatalogI18n.js'

export default function ServiceCard({ service: rawService, active, onClick }) {
  const { language } = useApp()
  const service = translateService(rawService, language)

  return (
    <button
      onClick={onClick}
      className={`group relative text-left w-full p-5 rounded-2xl overflow-hidden transition-all duration-300 focus-ring shrink-0 hover:-translate-y-1 hover:shadow-[0_14px_30px_-10px_rgba(0,0,0,0.45)] ${
        active
          ? 'border-2 border-signal bg-surface-2'
          : 'border border-subtle hover:border-signal/60'
      }`}
      style={{
        background: active
          ? 'linear-gradient(160deg, var(--surface-3), var(--surface-1))'
          : 'linear-gradient(160deg, var(--surface-2), var(--surface-1))',
        boxShadow: active
          ? 'inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -6px 14px rgba(0,0,0,0.25), 0 1px 0 rgba(255,255,255,0.03)'
          : 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -4px 10px rgba(0,0,0,0.18)',
      }}
    >
      <div className="relative">
        <div className="font-display text-base font-medium text-fg-primary group-hover:text-signal-bright transition-colors">
          {service.name}
        </div>
        <p className="text-sm text-fg-secondary mt-2 leading-relaxed">{service.blurb}</p>
        <span className="inline-flex items-center gap-1 text-xs font-mono text-signal-bright mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
          {active ? 'Selected — details on the right →' : 'View details →'}
        </span>
      </div>
    </button>
  )
}
