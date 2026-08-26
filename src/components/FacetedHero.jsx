import { useRef, useState } from 'react'

const facets = [
  { label: 'Design', code: 'aspect.design', rot: -6, x: -30, y: -10, size: 180 },
  { label: 'Build', code: 'aspect.build', rot: 4, x: 40, y: 20, size: 210 },
  { label: 'Ship', code: 'aspect.ship', rot: -3, x: -10, y: 60, size: 160 },
  { label: 'Observe', code: 'aspect.observe', rot: 8, x: 60, y: -40, size: 150 },
]

export default function FacetedHero() {
  const ref = useRef(null)
  const [tilt, setTilt] = useState({ x: 0, y: 0 })

  function handleMove(e) {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const px = (e.clientX - rect.left) / rect.width - 0.5
    const py = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: px * 10, y: py * -10 })
  }

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={() => setTilt({ x: 0, y: 0 })}
      className="relative h-[360px] md:h-[440px] w-full select-none"
      style={{ perspective: '1200px' }}
    >
      {facets.map((f, i) => (
        <div
          key={f.label}
          className="absolute glass rounded-2xl flex flex-col justify-between p-4 transition-transform duration-300 ease-out"
          style={{
            width: f.size,
            height: f.size * 0.72,
            left: `calc(50% + ${f.x}px)`,
            top: `calc(50% + ${f.y}px)`,
            transform: `translate(-50%, -50%) rotate(${f.rot}deg) rotateX(${tilt.y * (0.4 + i * 0.15)}deg) rotateY(${tilt.x * (0.4 + i * 0.15)}deg)`,
          }}
        >
          <span className="font-mono text-[10px] text-signal-bright tracking-wide">{f.code}</span>
          <span className="font-display text-lg text-fg-primary">{f.label}</span>
        </div>
      ))}
    </div>
  )
}
