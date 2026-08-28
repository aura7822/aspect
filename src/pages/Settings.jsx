import { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { User, ShieldCheck, FileText, Activity, ChevronRight, AlertTriangle, Check } from 'lucide-react'
import clsx from 'clsx'
import GlassCard from '../components/GlassCard.jsx'
import { useApp } from '../context/AppContext.jsx'
import { languages } from '../data/i18n.js'
import { presetAvatars, getPresetAvatar } from '../data/avatars.js'

const resources = [
  { to: '/transparency', label: 'Transparency & system health', icon: Activity },
  { to: '/legal/privacy', label: 'Privacy policy', icon: ShieldCheck },
  { to: '/legal/terms', label: 'Terms of Service & SLA', icon: FileText },
]

const tabs = [
  { id: 'account', label: 'Account' },
  { id: 'resources', label: 'Resources' },
]

export default function Settings() {
  const { isAuthed } = useApp()
  const [tab, setTab] = useState('account')

  if (!isAuthed) return <Navigate to="/" replace />

  return (
    <div className="container-page py-16 max-w-2xl">
      <h1 className="font-display text-3xl mb-2">⚙ Tweaks</h1>
      <p className="text-fg-muted mb-8">Account details and resources unified.</p>

      <div className="flex gap-1 border-b border-subtle mb-8">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={clsx(
              'px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors focus-ring',
              tab === t.id ? 'border-signal text-signal-bright' : 'border-transparent text-fg-muted hover:text-fg-secondary'
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === 'account' && <AccountTab />}
      {tab === 'resources' && <ResourcesTab />}
    </div>
  )
}

function AccountTab() {
  const { currentUser, updateProfile, deactivateAccount, language, setLanguage, t } = useApp()
  const [name, setName] = useState(currentUser?.name ?? '')
  const [email, setEmail] = useState(currentUser?.email ?? '')
  const [password, setPassword] = useState('')
  const [avatar, setAvatar] = useState(currentUser?.avatar ?? null)
  const [avatarPreset, setAvatarPreset] = useState(currentUser?.avatarPreset ?? 'default')
  const [github, setGithub] = useState(currentUser?.github ?? '')
  const [openSource, setOpenSource] = useState(currentUser?.openSource ?? '')
  const [notifyProduct, setNotifyProduct] = useState(currentUser?.notifyPrefs?.product ?? true)
  const [notifyProject, setNotifyProject] = useState(currentUser?.notifyPrefs?.project ?? true)
  const [confirmDeactivate, setConfirmDeactivate] = useState(false)
  const [saved, setSaved] = useState(false)

  function handleAvatarPick(e) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      setAvatar(reader.result)
      setAvatarPreset(null)
    }
    reader.readAsDataURL(file)
  }

  function choosePreset(id) {
    setAvatarPreset(id)
    setAvatar(null)
  }

  function save() {
    updateProfile({ name, email, avatar, avatarPreset, github, openSource, notifyPrefs: { product: notifyProduct, project: notifyProject } })
    setPassword('')
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  const preset = getPresetAvatar(avatarPreset)

  return (
    <div className="space-y-6">
      <GlassCard className="p-6">
        <h3 className="font-display text-lg mb-5">{t('account_settings')}</h3>

        <div className="flex items-center gap-4 mb-4">
          <div className="w-16 h-16 rounded-full flex items-center justify-center overflow-hidden shrink-0" style={{ background: avatar ? undefined : preset.bg }}>
            {avatar ? <img src={avatar} alt="" className="w-full h-full object-cover" /> : <preset.icon size={24} className="text-white" />}
          </div>
          <label className="px-3 py-2 rounded-lg border border-subtle text-sm text-fg-secondary hover:border-strong cursor-pointer focus-ring">
            Upload a photo
            <input type="file" accept="image/*" className="hidden" onChange={handleAvatarPick} />
          </label>
        </div>

        <div className="mb-6">
          <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-2">Or select an avatar</div>
          <div className="flex flex-wrap gap-2">
            {presetAvatars.map((p) => (
              <button
                key={p.id}
                onClick={() => choosePreset(p.id)}
                className={clsx(
                  'w-10 h-10 rounded-full flex items-center justify-center focus-ring transition-transform hover:scale-105',
                  !avatar && avatarPreset === p.id && 'ring-2 ring-signal ring-offset-2 ring-offset-page'
                )}
                style={{ background: p.bg }}
              >
                <p.icon size={16} className="text-white" />
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <Field label="Username">
            <input value={name} onChange={(e) => setName(e.target.value)} className="input-field" />
          </Field>
          <Field label="Email">
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="input-field" />
          </Field>
          <Field label="Reset password">
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="New password" className="input-field" />
          </Field>
          {currentUser?.role === 'developer' && (
            <>
              <Field label="GitHub Profile URL">
                <input
                  type="url"
                  value={github}
                  onChange={(e) => setGithub(e.target.value)}
                  placeholder="https://github.com/username"
                  className="input-field"
                />
              </Field>
              <Field label="Open Source Contributions URL">
                <input
                  type="url"
                  value={openSource}
                  onChange={(e) => setOpenSource(e.target.value)}
                  placeholder="https://github.com/username?tab=repositories"
                  className="input-field"
                />
              </Field>
              <div className="p-3 rounded-lg bg-signal/5 border border-signal/20">
                <p className="text-xs text-fg-secondary">These URLs are displayed on the <a href="/developers" className="text-signal-bright hover:underline">Developers page</a> and verified by admin</p>
              </div>
            </>
          )}
          <Field label="Language">
            <select value={language} onChange={(e) => setLanguage(e.target.value)} className="input-field">
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </Field>
        </div>

        <div className="mt-6 pt-6 border-t border-subtle">
          <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-3">Notifications</div>
          <label className="flex items-center gap-2.5 py-1.5 text-sm text-fg-secondary cursor-pointer">
            <input type="checkbox" checked={notifyProduct} onChange={(e) => setNotifyProduct(e.target.checked)} className="accent-signal" />
            Product updates and bulletins
          </label>
          <label className="flex items-center gap-2.5 py-1.5 text-sm text-fg-secondary cursor-pointer">
            <input type="checkbox" checked={notifyProject} onChange={(e) => setNotifyProject(e.target.checked)} className="accent-signal" />
            Project status alerts
          </label>
        </div>

        <button onClick={save} className="w-full mt-6 py-2.5 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring flex items-center justify-center gap-2">
          {saved && <Check size={14} />} {saved ? 'Saved' : 'Save changes'}
        </button>
      </GlassCard>

      <GlassCard className="p-6 border-bad/30">
        <h3 className="font-display text-base mb-1 flex items-center gap-2 text-bad">
          <AlertTriangle size={16} /> Deactivate account
        </h3>
        <p className="text-sm text-fg-muted mb-4">
          This signs you out and disables access. You can reactivate by contacting support.
        </p>
        {!confirmDeactivate ? (
          <button onClick={() => setConfirmDeactivate(true)} className="px-4 py-2 rounded-lg border border-bad/40 text-bad text-sm font-medium hover:bg-bad/10 focus-ring">
            Deactivate my account
          </button>
        ) : (
          <div className="flex items-center gap-3">
            <span className="text-sm text-fg-secondary">Are you sure?</span>
            <button onClick={deactivateAccount} className="px-3 py-1.5 rounded-lg bg-bad text-white text-sm font-medium focus-ring">
              Yes, deactivate
            </button>
            <button onClick={() => setConfirmDeactivate(false)} className="px-3 py-1.5 rounded-lg border border-subtle text-fg-secondary text-sm focus-ring">
              Cancel
            </button>
          </div>
        )}
      </GlassCard>
    </div>
  )
}

function ResourcesTab() {
  return (
    <GlassCard className="p-2">
      <div className="px-4 py-2 text-xs font-mono uppercase tracking-wide text-fg-muted">Resources</div>
      {resources.map((r) => (
        <Link key={r.to} to={r.to} className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-surface-1 transition-colors focus-ring">
          <r.icon size={16} className="text-fg-muted shrink-0" />
          <span className="text-sm text-fg-secondary flex-1">{r.label}</span>
          <ChevronRight size={14} className="text-fg-muted" />
        </Link>
      ))}
    </GlassCard>
  )
}

function Field({ label, children }) {
  return (
    <div>
      <label className="block text-xs font-mono uppercase tracking-wide text-fg-muted mb-1.5">{label}</label>
      {children}
    </div>
  )
}
