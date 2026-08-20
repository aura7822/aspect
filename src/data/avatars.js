import { User, Rocket, Star, Zap, Heart, Coffee, Code2, Palette } from 'lucide-react'

export const presetAvatars = [
  { id: 'default', icon: User, bg: 'var(--surface-3)' },
  { id: 'rocket', icon: Rocket, bg: '#B8442E' },
  { id: 'star', icon: Star, bg: '#C9972B' },
  { id: 'zap', icon: Zap, bg: '#3E9E6E' },
  { id: 'heart', icon: Heart, bg: '#8A3E6E' },
  { id: 'coffee', icon: Coffee, bg: '#6B4A2E' },
  { id: 'code', icon: Code2, bg: '#2E5E8A' },
  { id: 'palette', icon: Palette, bg: '#8A6E2E' },
]

export function getPresetAvatar(id) {
  return presetAvatars.find((p) => p.id === id) ?? presetAvatars[0]
}
