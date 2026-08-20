import TypingHeadline from './TypingHeadline.jsx'
import { useApp } from '../context/AppContext.jsx'

// No background, no auto-dismiss — stays visible for the whole dashboard session.
export default function GreetingBanner() {
  const { greeting, currentUser, t } = useApp()
  if (!greeting || !currentUser) return null

  return (
    <div className="mb-6">
      <TypingHeadline
        lines={[`${t(greeting)}, ${currentUser.name.split(' ')[0]}.`]}
        loop={false}
        fontSize={26}
        className="max-w-lg"
      />
    </div>
  )
}
