import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'

export default function ChooseOrLaunchPrompt() {
  const navigate = useNavigate()

  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-16 px-6">
      <Sparkles size={22} className="text-signal-bright mb-4" />
      <p className="text-fg-secondary max-w-xs mb-6">
        Select a card on the left to see its tech stack and pricing ; or skip straight to a brand new project.
      </p>
      <button
        onClick={() => navigate('/start-a-project')}
        className="flex items-center gap-2 px-5 py-3 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring animate-glow_border"
      >
        Launch a fresh project <ArrowRight size={15} />
      </button>
    </div>
  )
}
