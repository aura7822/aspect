import { useRef, useState } from 'react'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { Bell, Menu, X, ChevronDown, LogOut, Settings, Search, Plus } from 'lucide-react'
import clsx from 'clsx'
import { useApp } from '../context/AppContext.jsx'
import Tooltip from './Tooltip.jsx'
import Logo from './Logo.jsx'
import GlobalSearchPalette from './GlobalSearchPalette.jsx'
import useClickOutside from '../hooks/useClickOutside.js'
import { getPresetAvatar } from '../data/avatars.js'

const marketingLinks = [
  { to: '/services', label: 'Services' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/developers', label: 'Developers' },
  { to: '/transparency', label: 'Transparency' },
]

const roleLabels = {
  visitor: 'Visitor',
  client: 'Client',
  enduser: 'End-User',
  developer: 'Developer',
  admin: 'Admin',
}

export default function Navbar() {
  const { role, setRole, isAuthed, currentUser, notifications, markNotificationRead, markAllRead } = useApp()
  const navigate = useNavigate()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const notifRef = useRef(null)
  const profileRef = useRef(null)
  useClickOutside(notifRef, () => setNotifOpen(false), notifOpen)
  useClickOutside(profileRef, () => setProfileOpen(false), profileOpen)
  const unread = notifications.filter((n) => !n.read).length
  const isTeam = role === 'developer' || role === 'admin'
  const publicLinks = [...marketingLinks, { to: '/changelog', label: isTeam ? 'Changelog' : 'Bulletins' }]
  const initials = currentUser?.name?.split(' ').map((p) => p[0]).slice(0, 2).join('') ?? 'V'

  function toggleSearch(mode) {
    setSearchOpen((v) => (mode === 'toggle' ? !v : mode))
  }

  function logOut() {
    setRole('visitor')
    setProfileOpen(false)
  }

  return (
    <header className="sticky top-0 z-40 glass border-b border-subtle-2">
      <div className="container-page flex items-center justify-between h-16 gap-4">
        <Link to="/" className="flex items-center gap-2 font-display font-semibold text-lg tracking-tight focus-ring rounded shrink-0">
          <Logo size={24} />
          <span className="hidden sm:inline">
            Aspect<span className="text-signal">™</span>
          </span>
        </Link>

        {/* Workspace utility bar for authenticated users */}
        {isAuthed ? (
          <div className="flex-1 flex items-center gap-2 max-w-xl">
            <button
              onClick={() => toggleSearch(true)}
              className="flex-1 flex items-center gap-2.5 px-3.5 py-2 rounded-lg border border-subtle text-sm text-fg-muted hover:border-strong focus-ring"
            >
              <Search size={15} />
              <span className="hidden sm:inline">Search or jump to...</span>
              <span className="ml-auto hidden sm:inline text-[10px] font-mono border border-subtle rounded px-1.5 py-0.5">⌘K</span>
            </button>
          </div>
        ) : (
          <nav className="hidden lg:flex items-center gap-1">
            {publicLinks.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                className={({ isActive }) =>
                  clsx('px-3 py-2 text-sm rounded-lg transition-colors focus-ring', isActive ? 'text-signal-bright' : 'text-fg-secondary hover:text-fg-primary')
                }
              >
                {l.label}
              </NavLink>
            ))}
          </nav>
        )}

        <div className="flex items-center gap-1.5 shrink-0">
          {isAuthed && (
            <Tooltip label="New request">
              <button
                onClick={() => navigate('/start-a-project')}
                className="hidden sm:flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring"
              >
                <Plus size={15} /> New request
              </button>
            </Tooltip>
          )}

          {!isAuthed && (
            <Link
              to="/login"
              className="hidden sm:inline-flex items-center px-3.5 py-2 text-sm font-medium rounded-lg border border-subtle text-fg-secondary hover:border-strong transition-colors focus-ring"
            >
              Log in
            </Link>
          )}

          {!isAuthed && (
            <Link
              to="/start-a-project"
              className="hidden md:inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg bg-signal text-white hover:bg-signal-bright transition-colors focus-ring"
            >
              Start a project
            </Link>
          )}

          {isAuthed && (
            <div className="relative" ref={notifRef}>
              <Tooltip label="Notifications">
                <button
                  onClick={() => setNotifOpen((v) => !v)}
                  className="relative p-2 rounded-lg text-fg-secondary hover:text-fg-primary focus-ring"
                  aria-label="Notifications"
                >
                  <Bell size={18} />
                  {unread > 0 && <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-signal" />}
                </button>
              </Tooltip>
              {notifOpen && (
                <div className="absolute right-0 mt-2 w-80 glass rounded-xl p-2 animate-fade_in">
                  <div className="flex items-center justify-between px-2 py-1.5">
                    <span className="text-sm font-medium">Notifications</span>
                    <button onClick={markAllRead} className="text-xs text-signal-bright hover:underline focus-ring">
                      Mark all read
                    </button>
                  </div>
                  <div className="max-h-72 overflow-y-auto">
                    {notifications.map((n) => (
                      <button
                        key={n.id}
                        onClick={() => markNotificationRead(n.id)}
                        className="w-full text-left px-2 py-2.5 rounded-lg hover:bg-surface-1 flex items-start gap-2 focus-ring"
                      >
                        {!n.read && <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-signal shrink-0" />}
                        {n.read && <span className="mt-1.5 w-1.5 h-1.5 shrink-0" />}
                        <span className="flex-1">
                          <span className="block text-sm text-fg-primary">{n.text}</span>
                          <span className="block text-xs font-mono text-fg-muted mt-0.5">{n.time}</span>
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Profile menu: role switch (demo), settings link, log out */}
          <div className="relative" ref={profileRef}>
            <Tooltip label="Profile & settings">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="flex items-center gap-1.5 pl-1 pr-2 py-1 rounded-full border border-subtle hover:border-strong focus-ring"
              >
                <span className="w-6 h-6 rounded-full bg-surface-2 flex items-center justify-center text-[10px] font-mono text-fg-primary overflow-hidden">
                  {currentUser?.avatar ? (
                    <img src={currentUser.avatar} alt="" className="w-full h-full object-cover" />
                  ) : currentUser?.avatarPreset && currentUser.avatarPreset !== 'default' ? (
                    (() => {
                      const p = getPresetAvatar(currentUser.avatarPreset)
                      return (
                        <span className="w-full h-full flex items-center justify-center" style={{ background: p.bg }}>
                          <p.icon size={12} className="text-white" />
                        </span>
                      )
                    })()
                  ) : (
                    initials
                  )}
                </span>
                <span className="text-xs font-mono text-fg-secondary hidden sm:inline">{roleLabels[role]}</span>
                <ChevronDown size={12} className="text-fg-muted" />
              </button>
            </Tooltip>
            {profileOpen && (
              <div className="absolute right-0 mt-2 w-48 glass rounded-xl p-1.5 animate-fade_in">
                <div className="px-3 py-1.5 text-[10px] font-mono uppercase text-fg-muted">Preview role</div>
                {Object.entries(roleLabels).map(([key, label]) => (
                  <button
                    key={key}
                    onClick={() => {
                      setRole(key)
                      setProfileOpen(false)
                    }}
                    className={clsx(
                      'w-full text-left px-3 py-2 text-sm rounded-lg focus-ring',
                      role === key ? 'bg-signal/20 text-signal-bright' : 'text-fg-secondary hover:bg-surface-1'
                    )}
                  >
                    {label}
                  </button>
                ))}
                {isAuthed && (
                  <>
                    <div className="my-1 border-t border-subtle" />
                    <button
                      onClick={() => {
                        navigate('/settings')
                        setProfileOpen(false)
                      }}
                      className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm rounded-lg text-fg-secondary hover:bg-surface-1 focus-ring"
                    >
                      <Settings size={14} /> Settings
                    </button>
                    <button
                      onClick={logOut}
                      className="w-full flex items-center gap-2 text-left px-3 py-2 text-sm rounded-lg text-bad hover:bg-surface-1 focus-ring"
                    >
                      <LogOut size={14} /> Log out
                    </button>
                  </>
                )}
              </div>
            )}
          </div>

          {!isAuthed && (
            <button
              className="lg:hidden p-2 rounded-lg text-fg-secondary focus-ring"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          )}
        </div>
      </div>

      {!isAuthed && mobileOpen && (
        <div className="lg:hidden border-t border-subtle-2 px-6 py-4 flex flex-col gap-1 animate-fade_in">
          {publicLinks.map((l) => (
            <NavLink key={l.to} to={l.to} onClick={() => setMobileOpen(false)} className="px-3 py-2.5 text-sm rounded-lg text-fg-secondary hover:text-fg-primary">
              {l.label}
            </NavLink>
          ))}
          <div className="px-3 py-2 text-xs font-mono text-fg-muted">Demo role</div>
          <div className="flex flex-wrap gap-1.5 px-3 pb-2">
            {Object.entries(roleLabels).map(([key, label]) => (
              <button
                key={key}
                onClick={() => setRole(key)}
                className={clsx('px-2.5 py-1 text-xs rounded-full border focus-ring', role === key ? 'border-signal text-signal-bright' : 'border-subtle text-fg-secondary')}
              >
                {label}
              </button>
            ))}
          </div>
          <Link
            to="/login"
            onClick={() => setMobileOpen(false)}
            className="mt-2 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg border border-subtle text-fg-secondary"
          >
            Log in
          </Link>
          <Link to="/start-a-project" onClick={() => setMobileOpen(false)} className="mt-2 inline-flex items-center justify-center px-4 py-2.5 text-sm font-medium rounded-lg bg-signal text-white">
            Start a project
          </Link>
        </div>
      )}

      <GlobalSearchPalette open={searchOpen} onClose={toggleSearch} />
    </header>
  )
}
