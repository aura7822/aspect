export default function ScrollingCardRail({ children, paused }) {
  return (
    <div
      className="curved-scroll-rail overflow-y-auto flex flex-col gap-3 pr-1"
      style={{ maxHeight: 640 }}
      aria-label="Services list"
    >
      {children}
    </div>
  )
}
