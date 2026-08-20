import { HERO_MEDIA_URL, HERO_MEDIA_TYPE, LOGO_URL } from '../data/brand.js'
import Logo from './Logo.jsx'

// Accepts a video (mp4/webm) OR a static image/gif — set HERO_MEDIA_TYPE in src/data/brand.js.
export default function HeroVideoBackground() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {HERO_MEDIA_URL && HERO_MEDIA_TYPE === 'video' && (
        <video className="w-full h-full object-cover" src={HERO_MEDIA_URL} autoPlay muted loop playsInline />
      )}
      {HERO_MEDIA_URL && HERO_MEDIA_TYPE === 'image' && (
        <img className="w-full h-full object-cover" src={HERO_MEDIA_URL} alt="" />
      )}
      {!HERO_MEDIA_URL && (
        <div className="w-full h-full bg-gradient-to-br from-signal/10 via-transparent to-gold/5" />
      )}
      <div className="absolute inset-0" style={{ backgroundColor: 'var(--page-bg)', opacity: 0.35 }} />
      {/* Logo watermark, far right of the hero media */}
      <div className="hidden lg:block absolute top-8 right-8 opacity-70">
        <Logo size={76} />
      </div>
    </div>
  )
}
