import { useEffect, useState } from 'react'

export default function CountdownTimer({ endTime, onComplete }) {
  const [remaining, setRemaining] = useState(Math.max(0, endTime - Date.now()))
  const [fired, setFired] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      const left = Math.max(0, endTime - Date.now())
      setRemaining(left)
      if (left <= 0 && !fired) {
        setFired(true)
        onComplete?.()
        clearInterval(interval)
      }
    }, 250)
    return () => clearInterval(interval)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endTime])

  const totalSeconds = Math.ceil(remaining / 1000)
  const mm = String(Math.floor(totalSeconds / 60)).padStart(2, '0')
  const ss = String(totalSeconds % 60).padStart(2, '0')

  return (
    <span className="font-mono text-2xl text-signal-bright tabular-nums">
      {remaining > 0 ? `${mm}:${ss}` : 'Done'}
    </span>
  )
}
