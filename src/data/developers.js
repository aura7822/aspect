export const developers = [
  { id: 'dev-1', name: 'Aura Joshua', role: 'Full-Stack Engineer', initials: 'SO', online: true, github: 'https://github.com/aura7822', portfolio: 'https://bespoke-phoenix-133366.netlify.app/', blog: 'https://example.com/blog/sarah', openSource: 'https://github.com/aura7822?tab=repositories' },
  { id: 'dev-2', name: 'Nevleen', role: 'Systems Engineer', initials: 'ML', online: true, github: 'https://github.com/Developer-Nevleen', portfolio: 'https://github.com/Developer-Nevleen', blog: 'https://example.com/blog/marcus', openSource: 'https://github.com/Developer-Nevleen?tab=repositories' },
  { id: 'dev-3', name: 'Nathan', role: 'ML Engineer', initials: 'PR', online: false, github: 'https://github.com/nathaokello', portfolio: 'https://example.com/portfolio/priya', blog: 'https://example.com/blog/priya', openSource: 'https://github.com/nathanokello?tab=repositories' },
  { id: 'dev-4', name: 'Alex', role: 'Frontend Engineer', initials: 'DF', online: true, github: 'https://github.com', portfolio: 'https://example.com/portfolio/diego', blog: 'https://example.com/blog/diego', openSource: 'https://github.com/diego?tab=repositories' },
  { id: 'dev-5', name: 'Timothy', role: 'Backend Engineer', initials: 'AB', online: false, github: 'https://github.com', portfolio: 'https://example.com/portfolio/amina', blog: 'https://example.com/blog/amina', openSource: 'https://github.com/amina?tab=repositories' },
  { id: 'dev-6', name: 'Daroyo', role: 'DevOps Engineer', initials: 'TL', online: true, github: 'https://github.com', portfolio: 'https://example.com/portfolio/theo', blog: 'https://example.com/blog/theo', openSource: 'https://github.com/theo?tab=repositories' },
]

const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
const hours = ['9:00', '10:00', '11:00', '13:00', '14:00', '15:00', '16:00']

export const officeHours = days.map((day) => ({
  day,
  slots: hours.map((hour) => ({
    hour,
    developerId: Math.random() > 0.45 ? developers[Math.floor(Math.random() * developers.length)].id : null,
  })),
}))
