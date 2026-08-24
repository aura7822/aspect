import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { ArrowLeft, Upload, Smartphone, Wallet, Bitcoin, ArrowRight } from 'lucide-react'
import GlassCard from '../components/GlassCard.jsx'
import CountdownTimer from '../components/CountdownTimer.jsx'
import { TosCheckbox } from '../components/TermsModal.jsx'
import { useApp } from '../context/AppContext.jsx'
import { findEntity, formatKES, minDeposit } from '../data/serviceCatalog.js'

const paymentMethods = [
  { id: 'mpesa', name: 'M-Pesa', icon: Smartphone, note: 'STK push to your phone' },
  { id: 'paypal', name: 'PayPal', icon: Wallet, note: 'Pay with your PayPal balance or card' },
  { id: 'bitcoin', name: 'Bitcoin', icon: Bitcoin, note: 'Pay via an on-chain transfer' },
]

const fields = ['Education', 'Finance', 'Real Estate', 'Startup', 'Wellness', 'Technology', 'Blog', 'Hospitality', 'SMEs', 'Other']
const projectTypes = [
  { id: 'new-feature', label: 'New feature addition' },
  { id: 'bug-fix', label: 'Bug fixing' },
  { id: 'new-project', label: 'Completely new project' },
]
const platforms = ['Web', 'iOS', 'Android', 'Desktop', 'Other']

function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

export default function StartProject() {
  const { selectedEntity, setSelectedEntity, submitProjectRequest, projectRequests, completeRequest, currentUser, pushToast, role } = useApp()
  const navigate = useNavigate()

  const [pickedEntity] = useState(() =>
    selectedEntity ? findEntity(selectedEntity.serviceId, selectedEntity.subcategoryId) : null
  )
  const [step, setStep] = useState(selectedEntity ? 'payment' : 'form')
  const [requestId, setRequestId] = useState(null)
  const [method, setMethod] = useState(null)

  // Wizard fields
  const [field, setField] = useState('')
  const [projectName, setProjectName] = useState('')
  const [projectType, setProjectType] = useState('')
  const [budgetMin, setBudgetMin] = useState('')
  const [budgetMax, setBudgetMax] = useState('')
  const [businessGoal, setBusinessGoal] = useState('')
  const [additionalDescription, setAdditionalDescription] = useState('')
  const [targetPlatforms, setTargetPlatforms] = useState([])
  const [sketchName, setSketchName] = useState(null)
  const [agreed, setAgreed] = useState(false)
  const [touched, setTouched] = useState(false)

  if (role === 'visitor') {
    return <Navigate to="/login" replace state={{ from: '/start-a-project' }} />
  }

  const typeMultiplier = { 'new-feature': 0.6, 'bug-fix': 0.35, 'new-project': 1 }[projectType] ?? 0.6

  const estimate = useMemo(() => {
    const platformCount = Math.max(1, targetPlatforms.length)
    const raw = 30000 + typeMultiplier * 40000 + (platformCount - 1) * 8000
    return clamp(Math.round(raw / 500) * 500, 30000, 95000)
  }, [typeMultiplier, targetPlatforms])

  const clientBudget = budgetMax ? Number(budgetMax) : budgetMin ? Number(budgetMin) : null
  const budgetDelta = clientBudget != null ? clientBudget - estimate : null

  const devsAssigned = clamp(Math.round(estimate / 25000), 1, 4)
  const estDays = clamp(Math.round(estimate / 3500), 5, 30)

  useEffect(() => {
    if (selectedEntity && !requestId) {
      const id = submitProjectRequest({
        description: `${pickedEntity?.service.name ?? ''} — ${pickedEntity?.sub.name ?? ''}: ${pickedEntity?.sub.description ?? ''}`,
        entity: selectedEntity,
        budgetLow: pickedEntity?.sub.priceKES,
        budgetHigh: pickedEntity?.sub.priceKES,
        estimatedDays: pickedEntity?.sub.estDays ?? 14,
        devsAssigned: pickedEntity?.sub.devsRequired ?? 2,
        depositKES: pickedEntity ? minDeposit(pickedEntity.sub.priceKES) : null,
      })
      setRequestId(id)
      setStep('payment')
      setSelectedEntity(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedEntity])

  const request = projectRequests.find((r) => r.id === requestId)

  const formValid = projectName.trim() && field && projectType && businessGoal.trim() && targetPlatforms.length > 0 && agreed

  function submitForm() {
    if (role === 'visitor') {
      pushToast({ title: 'Please log in', message: 'Create an account to submit a project request.' })
      navigate('/login', { state: { from: '/start-a-project' } })
      return
    }
    setTouched(true)
    if (!formValid) return
    const id = submitProjectRequest({
      description: additionalDescription.trim() ? `${businessGoal.trim()} — ${additionalDescription.trim()}` : businessGoal.trim(),
      projectName: projectName.trim(),
      field,
      projectType,
      businessGoal: businessGoal.trim(),
      additionalDescription: additionalDescription.trim(),
      targetPlatforms,
      clientBudget,
      estimatePrice: estimate,
      budgetLow: estimate,
      budgetHigh: estimate,
      estimatedDays: estDays,
      devsAssigned,
      depositKES: minDeposit(estimate),
    })
    setRequestId(id)
    setStep('payment')
  }

  function handleTimerComplete() {
    completeRequest(requestId)
  }

  return (
    <div className="container-page py-16 max-w-3xl">
      <h1 className="font-display text-3xl mb-2">Launch a project</h1>
      <p className="text-fg-muted mb-10">
        {pickedEntity
          ? `You're picking up where you left off — ${pickedEntity.service.name} / ${pickedEntity.sub.name}.`
          : "Tell us about your project. The more detail you give us, the sharper the estimate."}
      </p>

      {step === 'form' && (
        <GlassCard className="p-6 md:p-8">
          <Section label="What field is this project in? *">
            <div className="flex flex-wrap gap-2">
              {fields.map((f) => (
                <Chip key={f} active={field === f} onClick={() => setField(f)}>
                  {f}
                </Chip>
              ))}
            </div>
          </Section>

          <Section label="Project name *">
            <input
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
              placeholder="E.g. Client Portal Revamp"
              className="input-field"
            />
          </Section>

          <Section label="Project type *">
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((pt) => (
                <Chip key={pt.id} active={projectType === pt.id} onClick={() => setProjectType(pt.id)}>
                  {pt.label}
                </Chip>
              ))}
            </div>
          </Section>

          <Section label="Your budget range (KES)">
            <div className="flex items-center gap-3">
              <input
                type="number"
                value={budgetMin}
                onChange={(e) => setBudgetMin(e.target.value)}
                placeholder="Min"
                className="input-field"
              />
              <span className="text-fg-muted">–</span>
              <input
                type="number"
                value={budgetMax}
                onChange={(e) => setBudgetMax(e.target.value)}
                placeholder="Max"
                className="input-field"
              />
            </div>
          </Section>

          <Section label="What does success look like for this project? *">
            <textarea
              rows={3}
              value={businessGoal}
              onChange={(e) => setBusinessGoal(e.target.value)}
              placeholder="E.g. Cut manual onboarding time in half within the first quarter after launch..."
              className="input-field resize-none"
            />
          </Section>

          <Section label="Additional description (optional)">
            <textarea
              rows={3}
              value={additionalDescription}
              onChange={(e) => setAdditionalDescription(e.target.value)}
              placeholder="Anything else that helps us understand the project — constraints, integrations, existing systems..."
              className="input-field resize-none"
            />
          </Section>

          <Section label="Target platforms *">
            <div className="flex flex-wrap gap-2">
              {platforms.map((p) => (
                <Chip
                  key={p}
                  active={targetPlatforms.includes(p)}
                  onClick={() => setTargetPlatforms((list) => (list.includes(p) ? list.filter((x) => x !== p) : [...list, p]))}
                >
                  {p}
                </Chip>
              ))}
            </div>
          </Section>

          <Section label="Rough sketch or reference (optional)">
            <label className="flex items-center gap-2 px-3.5 py-2.5 rounded-lg border border-dashed border-strong text-sm text-fg-secondary cursor-pointer hover:border-signal/40 focus-ring w-fit">
              <Upload size={15} />
              {sketchName ?? 'Upload a file'}
              <input type="file" className="hidden" onChange={(e) => setSketchName(e.target.files?.[0]?.name ?? null)} />
            </label>
          </Section>

          {(projectType || targetPlatforms.length > 0) && (
            <div className="mt-2 mb-6 pt-5 border-t border-subtle">
              <div className="flex items-baseline justify-between">
                <span className="text-xs font-mono text-fg-muted">Live estimate</span>
                <span className="font-mono text-lg text-signal-bright">{formatKES(estimate)}</span>
              </div>
              {clientBudget != null && (
                <div className={`text-xs font-mono mt-1 ${budgetDelta >= 0 ? 'text-good' : 'text-bad'}`}>
                  {budgetDelta >= 0
                    ? `Your budget covers this — ${formatKES(budgetDelta)} of headroom.`
                    : `Your budget is ${formatKES(Math.abs(budgetDelta))} below our estimate.`}
                </div>
              )}
            </div>
          )}

          <div className="mb-6">
            <TosCheckbox checked={agreed} onChange={setAgreed} />
            {touched && !agreed && <p className="text-xs text-bad mt-1">You must agree to the Terms of Service to continue.</p>}
          </div>
          {touched && !formValid && <p className="text-xs text-bad mb-3">Please fill in all required fields marked with *.</p>}

          <button
            onClick={submitForm}
            className="w-full py-3 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring"
          >
            Submit request
          </button>
        </GlassCard>
      )}

      {step === 'payment' && request && (
        <GlassCard className="p-6 md:p-8">
          <span className="text-xs font-mono uppercase tracking-wide text-signal-bright">Your project</span>
          <div className="flex flex-wrap items-end justify-between gap-4 mt-2 mb-6 pb-6 border-b border-subtle">
            <div>
              <h3 className="font-display text-xl">{pickedEntity ? `${pickedEntity.service.name} — ${pickedEntity.sub.name}` : request.projectName || 'Custom project'}</h3>
              <p className="text-sm text-fg-secondary mt-1 max-w-md">{request.description}</p>
              <div className="text-xs font-mono text-fg-muted mt-2">
                {request.devsAssigned} developer{request.devsAssigned > 1 ? 's' : ''} · ~{request.estimatedDays} days
              </div>
            </div>
            <div className="text-right">
              <div className="font-mono text-2xl text-signal-bright">{formatKES(request.budgetLow)}</div>
              <div className="text-xs text-fg-muted mt-1">Minimum deposit: {formatKES(request.depositKES ?? minDeposit(request.budgetLow))}</div>
            </div>
          </div>

          <div className="text-xs font-mono uppercase tracking-wide text-fg-muted mb-3">Pay your deposit to lock in your slot</div>
          <div className="grid sm:grid-cols-3 gap-3 mb-4">
            {paymentMethods.map((m) => (
              <button
                key={m.id}
                onClick={() => setMethod(m.id)}
                className={`p-3.5 rounded-xl border text-left transition-colors focus-ring ${
                  method === m.id ? 'border-signal bg-signal/10' : 'border-subtle hover:border-strong'
                }`}
              >
                <m.icon size={18} className="text-signal-bright mb-2" />
                <div className="text-sm text-fg-primary">{m.name}</div>
                <div className="text-xs text-fg-muted mt-0.5">{m.note}</div>
              </button>
            ))}
          </div>

          <button
            onClick={() => {
              if (method) {
                pushToast({
                  title: 'Deposit request created',
                  message: `A ${paymentMethods.find((m) => m.id === method)?.name} checkout would open here once payments are connected on the backend.`,
                })
              }
              setStep('summary')
            }}
            className="w-full py-3 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring flex items-center justify-center gap-2"
          >
            {method ? `Pay ${formatKES(request.depositKES ?? minDeposit(request.budgetLow))} deposit` : 'Continue without paying now'} <ArrowRight size={15} />
          </button>
          <p className="text-[11px] text-fg-muted mt-2 text-center">You can also pay later from your dashboard.</p>
        </GlassCard>
      )}

      {step === 'summary' && request && (
        <GlassCard className="p-6 md:p-8">
          <h3 className="font-display text-lg mb-5">Project summary</h3>
          <div className="space-y-3 text-sm mb-6">
            <SummaryRow label="Request ID" value={request.id} />
            {pickedEntity && <SummaryRow label="Service" value={`${pickedEntity.service.name} — ${pickedEntity.sub.name}`} />}
            {request.projectName && <SummaryRow label="Project name" value={request.projectName} />}
            <SummaryRow label="Description" value={request.description} />
            <SummaryRow label="Price" value={formatKES(request.budgetLow)} />
            <SummaryRow label="Minimum deposit" value={formatKES(request.depositKES ?? minDeposit(request.budgetLow))} />
            <SummaryRow label="Developers assigned" value={`${request.devsAssigned} (auto-matched by our team)`} />
            <SummaryRow label="Estimated duration" value={`${request.estimatedDays} days`} />
          </div>

          {request.status !== 'completed' ? (
            <div className="text-center pt-5 border-t border-subtle">
              <div className="text-xs font-mono text-fg-muted mb-2">Time to estimated completion</div>
              {request.timerEnd ? (
                <CountdownTimer endTime={request.timerEnd} onComplete={handleTimerComplete} />
              ) : (
                <span className="text-sm text-fg-muted">Starts once your deposit is confirmed.</span>
              )}
            </div>
          ) : (
            <div className="text-center pt-5 border-t border-subtle">
              <div className="text-good text-sm font-medium">Project completed - a confirmation email has been sent to you.</div>
            </div>
          )}

          <Link
            to="/dashboard"
            className="mt-6 flex items-center justify-center gap-2 text-sm text-signal-bright hover:underline focus-ring"
          >
            <ArrowLeft size={15} /> Back to dashboard - peek at real-time progress
          </Link>
        </GlassCard>
      )}
    </div>
  )
}

function Section({ label, children }) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-fg-primary mb-1.5">{label}</label>
      {children}
    </div>
  )
}

function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3 py-1.5 rounded-lg text-sm border transition-colors focus-ring ${
        active ? 'border-signal bg-signal/15 text-signal-bright' : 'border-subtle text-fg-secondary hover:border-strong'
      }`}
    >
      {children}
    </button>
  )
}

function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 pb-3 border-b border-subtle last:border-0">
      <span className="text-fg-muted shrink-0">{label}</span>
      <span className="text-fg-primary text-right">{value}</span>
    </div>
  )
}
