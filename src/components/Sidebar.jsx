import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { LayoutDashboard, Layers, Users, Settings, Radio, ChevronsLeft, ChevronsRight } from 'lucide-react'
import clsx from 'clsx'
import Logo from './Logo.jsx'
import { useApp } from '../context/AppContext.jsx'

const items = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/war-room/ledgerly', label: 'War Room', icon: Radio },
  { to: '/services', label: 'Services', icon: Layers },
  { to: '/developers', label: 'Developers', icon: Users },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const { isAuthed } = useApp()
  const [collapsed, setCollapsed] = useState(false)

  if (!isAuthed) return null

  return (
    <aside
      className={clsx(
        'hidden md:flex flex-col shrink-0 border-r border-subtle-2 h-screen sticky top-0 transition-all duration-200',
        collapsed ? 'w-[68px]' : 'w-56'
      )}
      style={{ backgroundColor: 'var(--page-bg)' }}
    >
      <div className={clsx('flex items-center h-16 px-4', collapsed && 'justify-center px-0')}>
        <Logo size={24} />
        {!collapsed && <span className="ml-2 font-display font-semibold text-sm">Aspect™</span>}
      </div>

      <nav className="flex-1 px-3 py-2 space-y-1">
        {items.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            title={item.label}
            className={({ isActive }) =>
              clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors focus-ring',
                collapsed && 'justify-center px-0',
                isActive ? 'bg-signal/12 text-signal-bright' : 'text-fg-secondary hover:text-fg-primary hover:bg-surface-1'
              )
            }
          >
            <item.icon size={17} className="shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => setCollapsed((v) => !v)}
        className={clsx(
          'flex items-center gap-2 mx-3 mb-4 px-3 py-2 rounded-lg text-xs font-mono text-fg-muted hover:text-fg-primary hover:bg-surface-1 focus-ring',
          collapsed && 'justify-center px-0'
        )}
      >
        {collapsed ? <ChevronsRight size={15} /> : <ChevronsLeft size={15} />}
        {!collapsed && 'Collapse'}
      </button>
    </aside>
  )
}
