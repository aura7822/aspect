import { useRef, useState } from 'react'
import { LifeBuoy, X, Send, StickyNote, Accessibility as AccessibilityIcon, MessageCircle, Volume2, VolumeX, Sun, Moon, Type } from 'lucide-react'
import clsx from 'clsx'
import { useApp } from '../context/AppContext.jsx'
import { developers } from '../data/developers.js'
import RealisticIconTile from './RealisticIconTile.jsx'
import WhatsAppIcon from './icons/WhatsAppIcon.jsx'
import StatusDot from './StatusDot.jsx'
import useClickOutside from '../hooks/useClickOutside.js'
import { languages } from '../data/i18n.js'

const tabs = [
  { id: 'chat', label: 'Chat', icon: MessageCircle },
  { id: 'feedback', label: 'Feedback', icon: StickyNote },
  { id: 'accessibility', label: 'Accessibility', icon: AccessibilityIcon },
]

// Single floating Command Palette / Help Hub replacing four separate widgets
// (WhatsApp bubble, sticky feedback note, chat widget, accessibility menu).
export default function HelpHub() {
  const [open, setOpen] = useState(false)
  const [tab, setTab] = useState('chat')
  const ref = useRef(null)
  useClickOutside(ref, () => setOpen(false), open)

  return (
    <div className="fixed bottom-5 right-5 z-40" ref={ref}>
      {open && (
        <div className="mb-3 w-80 glass rounded-2xl overflow-hidden animate-fade_in flex flex-col" style={{ maxHeight: 460 }}>
          <div className="flex items-center justify-between px-3.5 pt-3.5">
            <span className="text-sm font-medium text-fg-primary">Help &amp; tools</span>
            <button onClick={() => setOpen(false)} className="text-fg-muted hover:text-fg-primary focus-ring">
              <X size={16} />
            </button>
          </div>

          <div className="flex gap-1 px-3.5 pt-3">
            {tabs.map((t) => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={clsx(
                  'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors focus-ring',
                  tab === t.id ? 'bg-signal/15 text-signal-bright' : 'text-fg-muted hover:text-fg-primary'
                )}
              >
                <t.icon size={13} /> {t.label}
              </button>
            ))}
          </div>

          <div className="flex-1 overflow-y-auto px-3.5 py-3">
            {tab === 'chat' && <ChatTab />}
            {tab === 'feedback' && <FeedbackTab />}
            {tab === 'accessibility' && <AccessibilityTab />}
          </div>

          <a
            href="https://wa.me/000000000"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2.5 px-3.5 py-3 border-t border-subtle hover:bg-surface-1 transition-colors focus-ring"
          >
            <RealisticIconTile size={30} tone="good">
              <WhatsAppIcon size={16} />
            </RealisticIconTile>
            <span className="text-xs text-fg-secondary">Prefer WhatsApp? Chat with us there</span>
          </a>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="w-13 h-13 rounded-full bg-signal text-white flex items-center justify-center shadow-glass hover:bg-signal-bright transition-colors focus-ring p-3.5"
        aria-label="Help and tools"
      >
        <LifeBuoy size={20} />
      </button>
    </div>
  )
}

function ChatTab() {
  const { pushToast } = useApp()
  const [dev] = useState(() => developers[Math.floor(Math.random() * developers.length)])
  const [messages, setMessages] = useState([
    { from: 'dev', text: dev.online ? `Hey, I'm ${dev.name.split(' ')[0]} - what can I help with?` : null },
  ])
  const [draft, setDraft] = useState('')
  const [ticketSent, setTicketSent] = useState(false)

  function send() {
    if (!draft.trim()) return
    if (dev.online) {
      setMessages((m) => [...m, { from: 'me', text: draft }])
      setDraft('')
      setTimeout(() => setMessages((m) => [...m, { from: 'dev', text: 'Got it - looking into that now.' }]), 900)
    } else {
      setTicketSent(true)
      pushToast({ title: 'Message queued', message: `${dev.name} will reply by email when back online.` })
      setDraft('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center gap-2 mb-2.5">
        <span className="w-7 h-7 rounded-full bg-surface-2 flex items-center justify-center text-[10px] font-mono">{dev.initials}</span>
        <div>
          <div className="text-xs text-fg-primary">{dev.name}</div>
          <StatusDot tone={dev.online ? 'good' : 'neutral'} label={dev.online ? 'Online now' : 'Offline'} />
        </div>
      </div>
      <div className="space-y-1.5 mb-2.5 max-h-40 overflow-y-auto">
        {!dev.online && !ticketSent && (
          <div className="text-xs text-fg-muted bg-surface-1 rounded-lg p-2">
            Offline right now — your message becomes a ticket.
          </div>
        )}
        {ticketSent && <div className="text-xs text-good bg-good/10 rounded-lg p-2">Queued : you'll get an email reply.</div>}
        {messages.filter((m) => m.text).map((m, i) => (
          <div key={i} className={clsx('max-w-[85%] rounded-xl px-2.5 py-1.5 text-xs', m.from === 'me' ? 'ml-auto bg-signal text-white' : 'bg-surface-1 text-fg-primary')}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="flex gap-2 mt-auto">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Type a message..."
          className="input-field !py-1.5 text-xs"
        />
        <button onClick={send} className="p-2 rounded-lg bg-signal text-white focus-ring shrink-0" aria-label="Send">
          <Send size={13} />
        </button>
      </div>
    </div>
  )
}

const severities = [
  { id: 'cosmetic', label: 'Cosmetic', tone: 'neutral' },
  { id: 'functional', label: 'Functional', tone: 'warn' },
  { id: 'blocker', label: 'Blocker', tone: 'bad' },
]

function FeedbackTab() {
  const { pushToast } = useApp()
  const [severity, setSeverity] = useState('functional')
  const [note, setNote] = useState('')

  function fileTicket() {
    if (!note.trim()) return
    pushToast({ title: 'Feedback filed', message: `Severity: ${severity}. Screenshot attached automatically.` })
    setNote('')
  }

  return (
    <div>
      <div className="flex gap-1.5 mb-3">
        {severities.map((s) => (
          <button
            key={s.id}
            onClick={() => setSeverity(s.id)}
            className={clsx(
              'flex-1 flex items-center justify-center gap-1.5 text-[11px] py-1.5 rounded-lg border transition-colors focus-ring',
              severity === s.id ? 'border-signal text-signal-bright bg-signal/10' : 'border-subtle text-fg-secondary'
            )}
          >
            <StatusDot tone={s.tone} /> {s.label}
          </button>
        ))}
      </div>
      <textarea
        rows={3}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="What went wrong?"
        className="input-field resize-none text-xs"
      />
      <button onClick={fileTicket} className="w-full mt-2.5 py-2 rounded-lg bg-signal text-white text-xs font-medium focus-ring">
        File ticket
      </button>
    </div>
  )
}

function AccessibilityTab() {
  const { theme, toggleTheme, dyslexiaFont, setDyslexiaFont, fontScale, setFontScale, reading, readAloud, stopReading, language, setLanguage, t } = useApp()

  function handleReadAloud() {
    if (reading) return stopReading()
    const main = document.querySelector('main')
    readAloud(main ? main.innerText.slice(0, 4000) : document.title)
  }

  return (
    <div className="space-y-1">
      <button onClick={handleReadAloud} className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-surface-1 text-sm text-fg-secondary focus-ring">
        {reading ? <VolumeX size={15} className="text-signal-bright" /> : <Volume2 size={15} />}
        {reading ? t('stop_reading') : t('read_aloud')}
      </button>
      <button onClick={toggleTheme} className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-surface-1 text-sm text-fg-secondary focus-ring">
        {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        {theme === 'dark' ? t('light_mode') : t('dark_mode')}
      </button>
      <label className="w-full flex items-center gap-2.5 px-2.5 py-2 rounded-lg hover:bg-surface-1 text-sm text-fg-secondary cursor-pointer">
        <input type="checkbox" checked={dyslexiaFont} onChange={(e) => setDyslexiaFont(e.target.checked)} className="accent-signal" />
        <Type size={15} /> {t('dyslexia_font')}
      </label>
      <div className="flex items-center justify-between px-2.5 py-2 text-sm text-fg-secondary">
        <span>{t('font_size')}</span>
        <div className="flex items-center gap-1">
          <button onClick={() => setFontScale((s) => Math.max(0.9, +(s - 0.1).toFixed(1)))} className="w-6 h-6 rounded border border-subtle text-xs">
            −
          </button>
          <span className="w-8 text-center font-mono text-xs">{Math.round(fontScale * 100)}%</span>
          <button onClick={() => setFontScale((s) => Math.min(1.3, +(s + 0.1).toFixed(1)))} className="w-6 h-6 rounded border border-subtle text-xs">
            +
          </button>
        </div>
      </div>
      <div className="px-2.5 py-2">
        <div className="text-xs text-fg-muted mb-1.5">Language</div>
        <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input-field !py-1.5 text-sm">
          {languages.map((l) => (
            <option key={l.code} value={l.code}>
              {l.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
