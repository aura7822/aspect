import { CheckCircle2, X } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function Toasts() {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-[320px]">
      {toasts.map((t) => (
        <div key={t.id} className="glass rounded-xl p-3.5 flex items-start gap-2.5 relative overflow-hidden animate-fade_in">
          {t.confetti && <Confetti />}
          <CheckCircle2 size={18} className="text-good shrink-0 mt-0.5" />
          <div className="flex-1">
            {t.title && <div className="text-sm font-medium text-fg-primary">{t.title}</div>}
            {t.message && <div className="text-xs text-fg-secondary mt-0.5">{t.message}</div>}
          </div>
          <button onClick={() => dismissToast(t.id)} className="text-fg-muted hover:text-fg-primary focus-ring">
            <X size={14} />
          </button>
        </div>
      ))}
    </div>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 14 })
  const colors = ['#C9972B', '#3E9E6E', '#C4832A', '#E0B355']
  return (
    <div className="pointer-events-none absolute inset-0">
      {pieces.map((_, i) => (
        <span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-sm animate-[confetti_1.1s_ease-in_forwards]"
          style={{
            left: `${(i / pieces.length) * 100}%`,
            backgroundColor: colors[i % colors.length],
            top: -8,
            animationDelay: `${i * 0.02}s`,
          }}
        />
      ))}
    </div>
  )
}
