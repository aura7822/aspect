import { User, Rocket, Star, Zap, Heart, Coffee, Code2, Palette, Bubbles, Wifi, Bug, Bot } from 'lucide-react'

// Define avatars with both SVG path and React icon fallback
export const presetAvatars = [
  { id: 'default', icon: User, bg: 'var(--surface-3)', svgPath: '/avatars/1.svg' },
  { id: 'rocket', icon: Rocket, bg: '#B8442E', svgPath: '/avatars/2.svg' },
  { id: 'star', icon: Star, bg: '#C9972B', svgPath: '/avatars/3.svg' },
  { id: 'bug', icon: Bug, bg: '#3E9E6E', svgPath: '/avatars/4.svg' },
  { id: 'heart', icon: Heart, bg: '#8A3E6E', svgPath: '/avatars/5.svg' },
  { id: 'coffee', icon: Coffee, bg: '#6B4A2E', svgPath: '/avatars/6.svg' },
  { id: 'code', icon: Code2, bg: '#2E5E8A', svgPath: '/avatars/7.svg' },
  { id: 'palette', icon: Palette, bg: '#8A6E2E', svgPath: '/avatars/8.svg' },
  { id: 'wifi', icon: Wifi, bg: '#2E5E8A', svgPath: '/avatars/9.svg' },
  { id: 'bot', icon: Bot, bg: '#8A6E2E', svgPath: '/avatars/10.svg' }
]

export function getPresetAvatar(id) {
  return presetAvatars.find((p) => p.id === id) ?? presetAvatars[0]
}