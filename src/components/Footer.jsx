import { NavLink } from 'react-router-dom'
import { GitBranch, Camera, MessageCircle } from 'lucide-react'
import clsx from 'clsx'
import Logo from './Logo.jsx'

const columns = [
  {
    title: 'Studio',
    links: [
      { to: '/services', label: '☭ Services' },
      { to: '/pricing', label: '🄏 Pricing Plans' },
      { to: '/about', label: '🛈 About' },
      { to: '/careers', label: '💼 Careers' },
    ],
  },
  {
    title: 'Proof',
    links: [
      { to: '/services', label: '🖋 Case studies' },
      { to: '/transparency', label: '🎔 Health dashboard' },
      { to: '/changelog', label: '䀹 Changelog' },
      { to: '/blog', label: '🎙 Blog' },
    ],
  },
  {
    title: 'Company',
    links: [
      { to: '/contact', label: '🕾 Contact' },
      { to: '/legal/privacy', label: '🗒 Privacy' },
      { to: '/legal/terms', label: '⚚ Terms' },
    ],
  },
]

const socials = [
  { icon: GitBranch, href: 'https://github.com', label: 'GitHub' },
  { icon: Camera, href: 'https://instagram.com', label: 'Instagram' },
  { icon: MessageCircle, href: 'https://wa.me/000000000', label: 'WhatsApp' },
]

export default function Footer() {
  return (
    <footer className="border-t border-subtle-2 mt-24">
      <div className="container-page py-14 grid grid-cols-2 md:grid-cols-5 gap-10">
        <div className="col-span-2">
          <Logo size={32} className="mb-3" />
          <div className="font-display font-semibold text-lg">
            Aspect<span className="text-signal">™</span>
          </div>
          <p className="mt-3 text-sm text-fg-muted max-w-xs">
            An intelligent software systems startup. Every facet of your build, in one place.
          </p>
          <div className="flex items-center gap-3 mt-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                aria-label={s.label}
                className="w-8 h-8 rounded-full border border-subtle flex items-center justify-center text-fg-muted hover:text-signal-bright hover:border-signal/50 transition-colors focus-ring"
              >
                <s.icon size={15} />
              </a>
            ))}
          </div>
        </div>
        {columns.map((col) => (
          <div key={col.title}>
            <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-3">{col.title}</div>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.to + l.label}>
                  <NavLink
                    to={l.to}
                    className={({ isActive }) =>
                      clsx(
                        'text-sm focus-ring rounded transition-colors',
                        isActive ? 'text-signal-bright font-medium' : 'text-fg-secondary hover:text-fg-primary'
                      )
                    }
                  >
                    {l.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-page py-6 border-t border-subtle-2 text-xs font-mono text-fg-muted flex flex-col sm:flex-row justify-between gap-2">
        <span>© 2026 Aspect™ Intelligent Softwares. All rights reserved.</span>
       
      </div>
    </footer>
  )
}
