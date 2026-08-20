// All pricing is in Kenyan Shillings only, ranging KES 30,000–95,000 depending on workload.
// devsRequired / estDays are illustrative, used to auto-assign team size and the deadline countdown.

export const serviceCatalog = [
  {
    id: 'web',
    name: 'Web Platforms',
    blurb: 'Full-stack product builds from zero to first paying customer.',
    stack: ['React', 'Next.js', 'Node.js', 'PostgreSQL'],
    industries: ['Fintech', 'E-commerce', 'Healthtech', 'DevTools'],
    subcategories: [
      { id: 'static-site', name: 'Static Website', description: 'Marketing site, portfolio, or landing page.', priceKES: 32000, devsRequired: 1, estDays: 6 },
      { id: 'web2', name: 'Web2 Application', description: 'Full-stack app with auth, database, and dashboards.', priceKES: 78000, devsRequired: 3, estDays: 21 },
      { id: 'web3', name: 'Web3 dApp Frontend', description: 'Wallet-connected frontend for a decentralized app.', priceKES: 89000, devsRequired: 3, estDays: 24 },
      { id: 'ecommerce', name: 'E-commerce Storefront', description: 'Catalog, cart, and checkout on a custom stack.', priceKES: 68000, devsRequired: 2, estDays: 18 },
    ],
  },
  {
    id: 'ai',
    name: 'AI & Automation',
    blurb: 'Applied ML pipelines, agents, and workflow automation.',
    stack: ['Python', 'PyTorch', 'LangGraph', 'Redis'],
    industries: ['Logistics', 'Climate', 'Fintech', 'Healthtech'],
    subcategories: [
      { id: 'ai-agent', name: 'Conversational Agent', description: 'LLM-powered agent for support or internal ops.', priceKES: 58000, devsRequired: 2, estDays: 14 },
      { id: 'ai-pipeline', name: 'ML Pipeline', description: 'Custom model training and inference pipeline.', priceKES: 92000, devsRequired: 3, estDays: 27 },
      { id: 'ai-automation', name: 'Workflow Automation', description: 'Automate a manual, repetitive business process.', priceKES: 45000, devsRequired: 1, estDays: 10 },
      { id: 'ai-forecasting', name: 'Forecasting & Analytics', description: 'Predictive models feeding a reporting layer.', priceKES: 74000, devsRequired: 2, estDays: 19 },
    ],
  },
  {
    id: 'fullstack',
    name: 'Full-Stack Engineering',
    blurb: 'End-to-end feature teams embedded inside your roadmap.',
    stack: ['TypeScript', 'GraphQL', 'AWS', 'Docker'],
    industries: ['Fintech', 'Healthtech', 'DevTools', 'E-commerce'],
    subcategories: [
      { id: 'mvp', name: 'MVP Build', description: 'First version of your product, scoped to validate.', priceKES: 82000, devsRequired: 3, estDays: 22 },
      { id: 'feature-team', name: 'Embedded Feature Team', description: 'Ongoing team shipping on your existing codebase.', priceKES: 95000, devsRequired: 4, estDays: 28 },
      { id: 'api-platform', name: 'API Platform', description: 'Public or partner-facing API with docs and auth.', priceKES: 66000, devsRequired: 2, estDays: 16 },
    ],
  },
  {
    id: 'systems',
    name: 'Systems Development',
    blurb: 'Performance-critical backends, infra, and distributed systems.',
    stack: ['Go', 'Rust', 'Kubernetes', 'gRPC'],
    industries: ['E-commerce', 'DevTools', 'Fintech'],
    subcategories: [
      { id: 'infra', name: 'Infrastructure & DevOps', description: 'CI/CD, container orchestration, observability.', priceKES: 56000, devsRequired: 2, estDays: 13 },
      { id: 'perf', name: 'Performance Engineering', description: 'Latency and throughput work on an existing system.', priceKES: 71000, devsRequired: 2, estDays: 17 },
      { id: 'distributed', name: 'Distributed Systems', description: 'Service mesh, queues, and fault-tolerant design.', priceKES: 95000, devsRequired: 4, estDays: 29 },
    ],
  },
  {
    id: 'iot',
    name: 'IoT & Robotics',
    blurb: 'Connected hardware, sensor networks, and embedded control.',
    stack: ['C++', 'Rust', 'MQTT', 'Raspberry Pi'],
    industries: ['Logistics', 'Climate', 'Manufacturing'],
    subcategories: [
      { id: 'sensor-network', name: 'Sensor Network', description: 'Field sensors reporting to a central dashboard.', priceKES: 84000, devsRequired: 3, estDays: 23 },
      { id: 'embedded-firmware', name: 'Embedded Firmware', description: 'Firmware for a custom device or controller.', priceKES: 70000, devsRequired: 2, estDays: 18 },
      { id: 'robotics-control', name: 'Robotics Control System', description: 'Motion control and automation logic.', priceKES: 95000, devsRequired: 4, estDays: 30 },
    ],
  },
  {
    id: 'blockchain',
    name: 'Blockchain Development',
    blurb: 'Smart contracts, token systems, and on-chain infrastructure.',
    stack: ['Solidity', 'Rust', 'Hardhat', 'IPFS'],
    industries: ['Fintech', 'E-commerce', 'DevTools'],
    subcategories: [
      { id: 'smart-contract', name: 'Smart Contract Suite', description: 'Audited contracts for your protocol logic.', priceKES: 76000, devsRequired: 2, estDays: 20 },
      { id: 'token', name: 'Token / NFT System', description: 'Token issuance, minting, and marketplace logic.', priceKES: 61000, devsRequired: 2, estDays: 15 },
      { id: 'chain-infra', name: 'Chain Infrastructure', description: 'Nodes, indexers, and on-chain data pipelines.', priceKES: 91000, devsRequired: 3, estDays: 26 },
    ],
  },
  {
    id: 'bots',
    name: 'Bots',
    blurb: 'Chat, automation, and trading bots across platforms.',
    stack: ['Node.js', 'Python', 'WebSockets', 'Redis'],
    industries: ['Fintech', 'E-commerce', 'DevTools'],
    subcategories: [
      { id: 'chatbot', name: 'Chatbot', description: 'WhatsApp, Telegram, or web chat assistant.', priceKES: 34000, devsRequired: 1, estDays: 7 },
      { id: 'trading-bot', name: 'Trading Bot', description: 'Automated strategy execution against an exchange API.', priceKES: 64000, devsRequired: 2, estDays: 16 },
      { id: 'ops-bot', name: 'Internal Ops Bot', description: 'Slack/Discord bot automating a team workflow.', priceKES: 38000, devsRequired: 1, estDays: 8 },
    ],
  },
  {
    id: 'mobile',
    name: 'Mobile App Development',
    blurb: 'Native and cross-platform apps for iOS and Android.',
    stack: ['React Native', 'Kotlin', 'Swift', 'Firebase'],
    industries: ['Healthtech', 'E-commerce', 'Fintech'],
    subcategories: [
      { id: 'cross-platform', name: 'Cross-Platform App', description: 'One codebase, shipped to iOS and Android.', priceKES: 80000, devsRequired: 3, estDays: 22 },
      { id: 'native-ios', name: 'Native iOS App', description: 'Swift app built for iOS-specific performance.', priceKES: 88000, devsRequired: 3, estDays: 25 },
      { id: 'native-android', name: 'Native Android App', description: 'Kotlin app built for Android-specific performance.', priceKES: 85000, devsRequired: 3, estDays: 24 },
    ],
  },
]

export const MIN_DEPOSIT_PERCENT = 30

export function findEntity(serviceId, subcategoryId) {
  const service = serviceCatalog.find((s) => s.id === serviceId)
  if (!service) return null
  const sub = service.subcategories.find((c) => c.id === subcategoryId)
  if (!sub) return null
  return { service, sub }
}

export function formatKES(amount) {
  return `KES ${Math.round(amount).toLocaleString()}`
}

export function minDeposit(priceKES) {
  return Math.round((priceKES * MIN_DEPOSIT_PERCENT) / 100 / 500) * 500
}
