import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ChevronLeft, Home } from 'lucide-react'

const labels = {
  services: 'Services',
  pricing: 'Pricing Plans',
  developers: 'Developers',
  transparency: 'Transparency',
  changelog: 'Bulletins',
  blog: 'Blog',
  about: 'About',
  careers: 'Careers',
  contact: 'Contact',
  'start-a-project': 'Launch a project',
  dashboard: 'Dashboard',
  legal: 'Legal',
  'case-studies': 'Case study',
}

export default function Breadcrumb() {
  const location = useLocation()
  const navigate = useNavigate()
  const parts = location.pathname.split('/').filter(Boolean)

  if (parts.length === 0) return null

  return (
    <div className="container-page pt-5 pb-1">
      <div className="flex items-center gap-2 text-xs font-mono text-fg-muted">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 hover:text-fg-primary focus-ring rounded" aria-label="Go back">
          <ChevronLeft size={13} /> Back
        </button>
        <span className="opacity-40">/</span>
        <Link to="/" className="flex items-center gap-1 hover:text-fg-primary focus-ring rounded">
          <Home size={12} />
        </Link>
        {parts.map((p, i) => (
          <span key={i} className="flex items-center gap-2">
            <span className="opacity-40">/</span>
            <span className={i === parts.length - 1 ? 'text-fg-secondary' : ''}>{labels[p] ?? p}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
