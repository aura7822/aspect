import { useEffect, useRef } from 'react'

export default function ScrollingCardRail({ children, paused }) {
  const ref = useRef(null)
  const hovering = useRef(false)
  const rafId = useRef(null)
  const pos = useRef(0) // fractional scroll position tracked ourselves — el.scrollTop truncates sub-pixel writes

  useEffect(() => {
    const el = ref.current
    if (!el) return
    pos.current = el.scrollTop

    function tick() {
      if (!hovering.current && !paused && el) {
        const max = el.scrollHeight - el.clientHeight
        if (max > 0) {
          pos.current += 0.5
          if (pos.current >= max) pos.current = 0
          el.scrollTop = pos.current
        }
      }
      rafId.current = requestAnimationFrame(tick)
    }
    rafId.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId.current)
  }, [paused])

  return (
    <div
      ref={ref}
      onMouseEnter={() => (hovering.current = true)}
      onMouseLeave={() => (hovering.current = false)}
      className="curved-scroll-rail overflow-y-auto flex flex-col gap-3 pr-1"
      style={{ maxHeight: 640 }}
    >
      {children}
    </div>
  )
}
