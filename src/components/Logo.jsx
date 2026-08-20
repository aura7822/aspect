import { LOGO_URL } from '../data/brand.js'

export default function Logo({ size = 38, className = '' }) {
  if (LOGO_URL) {
    return <img src={LOGO_URL} alt="Aspect logo" style={{ width: size, height: size }} className={className} />
  }
  // Fallback mark until a real SVG is dropped into src/data/brand.js (LOGO_URL)
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" className={className} aria-hidden="true">
      <rect x="2" y="2" width="28" height="28" rx="8" fill="none" stroke="var(--accent, #C9972B)" strokeWidth="2" />
      <path d="M16 8 L23 22 H9 Z" fill="var(--accent, #C9972B)" opacity="0.85" />
    </svg>
  )
}
