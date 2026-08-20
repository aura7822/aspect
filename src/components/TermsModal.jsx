import { useState } from 'react'
import { X } from 'lucide-react'

const terms = [
  { title: 'Response SLA', body: 'We acknowledge every project request within 4 business hours and assign a matched developer within 1 business day.' },
  { title: 'Uptime commitment', body: 'Delivered platforms target 99.9% uptime, tracked publicly on our Transparency dashboard.' },
  { title: 'Milestone billing', body: 'Engagements are billed by milestone. No milestone is invoiced until its deliverable is reviewed and accepted.' },
  { title: 'Change requests', body: 'Scope changes are quoted separately and require written approval before work begins.' },
  { title: 'Data handling', body: 'Client data and credentials are stored in an encrypted vault and never shared outside the assigned team.' },
  { title: 'Cancellation', body: 'Either party may cancel with 14 days notice; completed milestones remain billable.' },
]

export function TermsModal({ open, onClose }) {
  if (!open) return null
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full max-w-lg glass rounded-2xl p-6 max-h-[80vh] overflow-y-auto animate-fade_in">
        <button onClick={onClose} className="absolute top-4 right-4 text-fg-muted hover:text-fg-primary focus-ring">
          <X size={18} />
        </button>
        <h3 className="font-display text-lg mb-4">Terms of Service &amp; SLA</h3>
        <div className="space-y-4">
          {terms.map((t) => (
            <div key={t.title}>
              <div className="text-sm font-medium text-fg-primary">{t.title}</div>
              <p className="text-sm text-fg-secondary mt-1 leading-relaxed">{t.body}</p>
            </div>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full py-2.5 rounded-lg bg-signal text-white text-sm font-medium focus-ring"
        >
          Close
        </button>
      </div>
    </div>
  )
}

export function TosCheckbox({ checked, onChange }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <label className="flex items-start gap-2.5 text-sm text-fg-secondary cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 accent-signal w-4 h-4"
        />
        <span>
          I agree to Aspect's{' '}
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault()
              setOpen(true)
            }}
            className="text-signal-bright underline underline-offset-2 hover:text-signal focus-ring"
          >
            Terms of Service &amp; SLA
          </button>
        </span>
      </label>
      <TermsModal open={open} onClose={() => setOpen(false)} />
    </>
  )
}
