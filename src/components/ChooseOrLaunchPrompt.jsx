import { useNavigate } from 'react-router-dom'
import { Sparkles, ArrowRight } from 'lucide-react'
import { useApp } from '../context/AppContext.jsx'

export default function ChooseOrLaunchPrompt() {
  const navigate = useNavigate()
  const { role, pushToast } = useApp()

  function handleLaunch() {
    if (role === 'visitor') {
      pushToast({ title: 'Please log in', message: 'Sign in to launch a project.' })
      navigate('/login', { state: { from: '/' } })
      return
    }
    navigate('/start-a-project')
  }

  return (
    <div className="h-full flex flex-col items-center justify-center text-center py-16 px-6">
      <Sparkles size={22} className="text-signal-bright mb-4" />
      <p className="text-fg-secondary max-w-xs mb-6">
        Select a card on the left to interact with tech stack and pricing ; or jump straight to a brand new project.
      </p>
      <button
        onClick={handleLaunch}
        className="flex items-center gap-2 px-5 py-3 rounded-lg bg-signal text-white text-sm font-medium hover:bg-signal-bright transition-colors focus-ring animate-glow_border"
      >
        Launch a fresh project <ArrowRight size={15} />
      </button>
    </div>
  )
}
