import { useState } from 'react'
import { X, Upload, ChevronRight, ChevronLeft } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

const techOptions = ['React', 'Next.js', 'Node.js', 'Python', 'Go', 'Rust', 'TypeScript', 'PostgreSQL', 'Not sure yet']

function genTicketId() {
  return 'POC-' + Math.floor(1000 + Math.random() * 9000)
}

export default function POCModal({ open, onClose }) {
  const { pushToast } = useApp()
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({ description: '', file: null, tech: '' })
  const [ticketId, setTicketId] = useState(null)

  if (!open) return null

  function reset() {
    setStep(1)
    setForm({ description: '', file: null, tech: '' })
    setTicketId(null)
  }

  function handleClose() {
    reset()
    onClose()
  }

  function submit() {
    const id = genTicketId()
    setTicketId(id)
    setStep(4)
    pushToast({
      title: 'Your request reached Aura',
      message: `Ticket ${id} routed to a matched developer.`,
      confetti: true,
    })
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={handleClose} />
      <div className="relative w-full max-w-lg glass rounded-2xl p-6 animate-fade_in">
        <button onClick={handleClose} className="absolute top-4 right-4 text-fg-muted hover:text-fg-primary focus-ring">
          <X size={18} />
        </button>

        {step < 4 && (
          <>
            <div className="text-xs font-mono text-fg-muted mb-1">Step {step} of 3</div>
            <div className="flex gap-1.5 mb-6">
              {[1, 2, 3].map((s) => (
                <div key={s} className={`h-1 flex-1 rounded-full transition-colors ${s <= step ? 'bg-signal' : 'bg-surface-2'}`} />
              ))}
            </div>
          </>
        )}

        {step === 1 && (
          <div>
            <h3 className="font-display text-lg mb-1">Describe your project</h3>
            <p className="text-sm text-fg-muted mb-4">A few sentences is enough to get started.</p>
            <textarea
              rows={5}
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="We need a customer portal that syncs with our billing system..."
              className="w-full rounded-xl bg-surface-1 border border-subtle p-3 text-sm text-fg-primary placeholder:text-fg-muted focus-ring resize-none"
            />
          </div>
        )}

        {step === 2 && (
          <div>
            <h3 className="font-display text-lg mb-1">Attach files</h3>
            <p className="text-sm text-fg-muted mb-4">Figma files or PDFs, up to 50MB.</p>
            <label className="flex flex-col items-center justify-center gap-2 border border-dashed border-strong rounded-xl py-8 cursor-pointer hover:border-signal/40 transition-colors">
              <Upload size={20} className="text-fg-muted" />
              <span className="text-sm text-fg-secondary">
                {form.file ? form.file : 'Click to choose a file'}
              </span>
              <input
                type="file"
                className="hidden"
                onChange={(e) => setForm({ ...form, file: e.target.files?.[0]?.name ?? null })}
              />
            </label>
          </div>
        )}

        {step === 3 && (
          <div>
            <h3 className="font-display text-lg mb-1">Tech stack</h3>
            <p className="text-sm text-fg-muted mb-4">Pick one, or let us recommend it.</p>
            <div className="grid grid-cols-3 gap-2">
              {techOptions.map((t) => (
                <button
                  key={t}
                  onClick={() => setForm({ ...form, tech: t })}
                  className={`px-3 py-2 rounded-lg text-sm font-mono border transition-colors focus-ring ${
                    form.tech === t ? 'border-signal bg-signal/15 text-signal-bright' : 'border-subtle text-fg-secondary hover:border-strong'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 4 && (
          <div className="text-center py-4">
            <div className="w-12 h-12 rounded-full bg-good/15 flex items-center justify-center mx-auto mb-4">
              <span className="text-good text-xl">✓</span>
            </div>
            <h3 className="font-display text-lg mb-1">Request submitted</h3>
            <p className="text-sm text-fg-muted mb-4">
              Ticket <span className="font-mono text-fg-primary">{ticketId}</span> was routed to a matched developer.
              You'll hear back within your SLA window.
            </p>
            <button onClick={handleClose} className="px-5 py-2.5 rounded-lg bg-signal text-white text-sm font-medium focus-ring">
              Done
            </button>
          </div>
        )}

        {step < 4 && (
          <div className="flex items-center justify-between mt-6">
            <button
              onClick={() => setStep((s) => Math.max(1, s - 1))}
              disabled={step === 1}
              className="flex items-center gap-1 text-sm text-fg-muted disabled:opacity-0 focus-ring"
            >
              <ChevronLeft size={15} /> Back
            </button>
            {step < 3 ? (
              <button
                onClick={() => setStep((s) => s + 1)}
                className="flex items-center gap-1 px-4 py-2 rounded-lg bg-signal text-white text-sm font-medium focus-ring"
              >
                Next <ChevronRight size={15} />
              </button>
            ) : (
              <button
                onClick={submit}
                className="px-4 py-2 rounded-lg bg-signal text-white text-sm font-medium focus-ring"
              >
                Submit request
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
