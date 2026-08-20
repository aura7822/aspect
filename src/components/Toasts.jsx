import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, X } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function Toasts() {
  const { toasts, dismissToast } = useApp()
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 w-[320px]">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass rounded-xl p-3.5 flex items-start gap-2.5 relative overflow-hidden"
          >
            {t.confetti && <Confetti />}
            <CheckCircle2 size={18} className="text-good shrink-0 mt-0.5" />
            <div className="flex-1">
              {t.title && <div className="text-sm font-medium text-fg-primary">{t.title}</div>}
              {t.message && <div className="text-xs text-fg-secondary mt-0.5">{t.message}</div>}
            </div>
            <button onClick={() => dismissToast(t.id)} className="text-fg-muted hover:text-fg-primary focus-ring">
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

function Confetti() {
  const pieces = Array.from({ length: 14 })
  const colors = ['#C9972B', '#3E9E6E', '#C4832A', '#E0B355']
  return (
    <div className="pointer-events-none absolute inset-0">
      {pieces.map((_, i) => (
        <motion.span
          key={i}
          className="absolute w-1.5 h-1.5 rounded-sm"
          style={{ left: `${(i / pieces.length) * 100}%`, backgroundColor: colors[i % colors.length], top: -8 }}
          initial={{ y: -8, opacity: 1, rotate: 0 }}
          animate={{ y: 90, opacity: 0, rotate: 180 }}
          transition={{ duration: 1.1, delay: i * 0.02, ease: 'easeIn' }}
        />
      ))}
    </div>
  )
}
