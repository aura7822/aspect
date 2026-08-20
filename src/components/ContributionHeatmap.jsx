const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8am - 7pm

function seedIntensity(dayIdx, hour, seed) {
  // Deterministic pseudo-random busy pattern, heavier mid-day on weekdays.
  const x = Math.sin(dayIdx * 12.9898 + hour * 78.233 + seed * 37.1) * 43758.5453
  const rand = x - Math.floor(x)
  const weekdayBoost = dayIdx < 5 ? 0.25 : -0.15
  const middayBoost = hour > 10 && hour < 16 ? 0.2 : 0
  const level = Math.min(1, Math.max(0, rand + weekdayBoost + middayBoost))
  return Math.round(level * 4) // 0-4 like GitHub
}

const levelColor = [
  'var(--surface-2)',
  'rgba(143, 10, 156, 0.71)',
  'rgba(196,40,60,0.5)',
  'rgba(196,40,60,0.75)',
  'var(--accent, #C9972B)',
]

export default function ContributionHeatmap({ seed = 1 }) {
  return (
    <div>
      <div className="flex gap-1">
        <div className="flex flex-col gap-1 mr-1 justify-between pt-4">
          {days.map((d) => (
            <span key={d} className="text-[9px] font-mono text-fg-muted h-3 leading-3">
              {d}
            </span>
          ))}
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="grid grid-rows-7 grid-flow-col gap-1" style={{ gridTemplateColumns: `repeat(${hours.length}, minmax(0,1fr))` }}>
            {days.map((_, dayIdx) =>
              hours.map((hour) => {
                const level = seedIntensity(dayIdx, hour, seed)
                return (
                  <div
                    key={`${dayIdx}-${hour}`}
                    className="contrib-cell"
                    title={`${days[dayIdx]} ${hour}:00 — activity level ${level}/4`}
                    style={{ backgroundColor: levelColor[level] }}
                  />
                )
              })
            )}
          </div>
          <div className="flex justify-between mt-1">
            {hours.filter((_, i) => i % 3 === 0).map((h) => (
              <span key={h} className="text-[9px] font-mono text-fg-muted">
                {h}:00
              </span>
            ))}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-1.5 mt-3 justify-end">
        <span className="text-[10px] font-mono text-fg-muted mr-1">Less</span>
        {levelColor.map((c, i) => (
          <span key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: c }} />
        ))}
        <span className="text-[10px] font-mono text-fg-muted ml-1">More</span>
      </div>
    </div>
  )
}
