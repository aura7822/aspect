// Engagement tiers — priced in KES, aligned to the 30,000–95,000 workload-based range.
export const packages = [
  {
    name: 'POC Sprint',
    priceKES: 32000,
    duration: '1 week',
    blurb: 'A scoped proof of concept to validate direction before a full build.',
    features: ['1 developer', 'Working prototype', 'Architecture notes', 'Async updates'],
  },
  {
    name: 'Build Team',
    priceKES: 78000,
    duration: '3+ weeks',
    blurb: 'A small embedded team shipping a full-stack product on your roadmap.',
    features: ['2\u20134 developers', 'Live project dashboard', 'Weekly demos', 'CI/CD from day one'],
    featured: true,
  },
  {
    name: 'Systems Partner',
    priceKES: 95000,
    duration: 'Ongoing',
    blurb: 'Long-term infrastructure, performance, and reliability partnership.',
    features: ['Dedicated pod', 'SLA-backed uptime', 'On-call rotation', 'Quarterly architecture review'],
  },
]
