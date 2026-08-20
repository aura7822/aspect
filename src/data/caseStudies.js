export const caseStudies = [
  {
    slug: 'ledgerly',
    client: 'Ledgerly',
    title: 'Rebuilding a reconciliation engine for 40% faster checkout',
    service: 'fullstack',
    industry: 'Fintech',
    stack: ['TypeScript', 'GraphQL', 'PostgreSQL', 'AWS'],
    metrics: [
      { label: 'Checkout speed', value: '+40%' },
      { label: 'Uptime since launch', value: '99.98%' },
      { label: 'Time to first PR', value: '6 days' },
    ],
    summary:
      'Ledgerly needed to reconcile ten thousand daily transactions without blocking checkout. We split the reconciliation path into an async queue and cut the critical path down to a single write.',
    logo: 'LG',
  },
  {
    slug: 'vitalpath',
    client: 'VitalPath',
    title: 'A HIPAA-ready patient portal built in one quarter',
    service: 'web',
    industry: 'Healthtech',
    stack: ['Next.js', 'PostgreSQL', 'Node.js'],
    metrics: [
      { label: 'Patient onboarding time', value: '-62%' },
      { label: 'Support tickets', value: '-31%' },
      { label: 'Uptime since launch', value: '99.95%' },
    ],
    summary:
      'VitalPath came to us with a compliance deadline and a spreadsheet-driven intake process. We shipped a portal with document e-sign, appointment sync, and encrypted messaging.',
    logo: 'VP',
  },
  {
    slug: 'northbound',
    client: 'Northbound',
    title: 'An automation layer that removed 900 manual hours a month',
    service: 'ai',
    industry: 'Logistics',
    stack: ['Python', 'LangGraph', 'Redis'],
    metrics: [
      { label: 'Manual hours saved / mo', value: '900+' },
      { label: 'Routing accuracy', value: '97.4%' },
      { label: 'Payback period', value: '5 weeks' },
    ],
    summary:
      'Northbound dispatchers were manually triaging freight exceptions. We built an agent pipeline that resolves 80% of exceptions without a human in the loop.',
    logo: 'NB',
  },
  {
    slug: 'kernow',
    client: 'Kernow Market',
    title: 'A checkout that survives Black Friday without a war room',
    service: 'systems',
    industry: 'E-commerce',
    stack: ['Go', 'Kubernetes', 'gRPC'],
    metrics: [
      { label: 'Peak throughput', value: '12k req/s' },
      { label: 'P99 latency', value: '84ms' },
      { label: 'Incidents last peak', value: '0' },
    ],
    summary:
      'Kernow\u2019s monolith fell over every Black Friday. We extracted the checkout path into a Go service mesh with circuit breakers and load-shedding baked in.',
    logo: 'KM',
  },
  {
    slug: 'greenline',
    client: 'Greenline',
    title: 'Modeling carbon offsets at a scale spreadsheets couldn\u2019t hold',
    service: 'ai',
    industry: 'Climate',
    stack: ['Python', 'PyTorch', 'PostgreSQL'],
    metrics: [
      { label: 'Model accuracy', value: '94.1%' },
      { label: 'Report generation', value: '-88% time' },
      { label: 'Uptime since launch', value: '99.9%' },
    ],
    summary:
      'Greenline\u2019s analysts modeled offset projects by hand. We trained a forecasting pipeline that turned a two-week report cycle into same-day turnaround.',
    logo: 'GL',
  },
  {
    slug: 'hatchbox',
    client: 'Hatchbox',
    title: 'Developer tooling that cut onboarding from 3 weeks to 3 days',
    service: 'systems',
    industry: 'DevTools',
    stack: ['Rust', 'Docker', 'Kubernetes'],
    metrics: [
      { label: 'Onboarding time', value: '-85%' },
      { label: 'Build times', value: '-54%' },
      { label: 'Dev satisfaction', value: '+38 NPS' },
    ],
    summary:
      'Hatchbox engineers spent their first weeks fighting local environments. We shipped a reproducible dev-container platform with one-command setup.',
    logo: 'HB',
  },
]
