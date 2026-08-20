// Translated name/blurb for each service card, keyed by language then service id.
// Subcategory-level descriptions remain English-only for now (see README).
export const serviceCatalogI18n = {
  sw: {
    web: { name: 'Majukwaa ya Wavuti', blurb: 'Ujenzi kamili wa bidhaa kutoka mwanzo hadi mteja wa kwanza anayelipa.' },
    ai: { name: 'AI na Otomatiki', blurb: 'Mifumo ya AI, mawakala, na otomatiki ya kazi.' },
    fullstack: { name: 'Uhandisi wa Full-Stack', blurb: 'Timu za vipengele zilizojumuishwa kwenye ratiba yako.' },
    systems: { name: 'Maendeleo ya Mifumo', blurb: 'Miundombinu na mifumo iliyosambazwa yenye utendaji wa hali ya juu.' },
    iot: { name: 'IoT na Roboti', blurb: 'Vifaa vilivyounganishwa, mitandao ya sensa, na udhibiti uliopachikwa.' },
    blockchain: { name: 'Uendelezaji wa Blockchain', blurb: 'Mikataba mahiri, mifumo ya tokeni, na miundombinu ya on-chain.' },
    bots: { name: 'Boti', blurb: 'Boti za mazungumzo, otomatiki, na biashara kwenye majukwaa mbalimbali.' },
    mobile: { name: 'Uendelezaji wa Programu za Simu', blurb: 'Programu asili na za majukwaa mengi kwa iOS na Android.' },
  },
  fr: {
    web: { name: 'Plateformes Web', blurb: 'Construction complète, du zéro à votre premier client payant.' },
    ai: { name: 'IA & Automatisation', blurb: "Pipelines d'IA appliquée, agents, et automatisation des flux de travail." },
    fullstack: { name: 'Ingénierie Full-Stack', blurb: 'Équipes intégrées à votre feuille de route.' },
    systems: { name: 'Développement de Systèmes', blurb: 'Backends critiques en performance et systèmes distribués.' },
    iot: { name: 'IoT & Robotique', blurb: 'Matériel connecté, réseaux de capteurs, et contrôle embarqué.' },
    blockchain: { name: 'Développement Blockchain', blurb: "Contrats intelligents, systèmes de tokens, et infrastructure on-chain." },
    bots: { name: 'Bots', blurb: 'Bots de chat, automatisation, et trading sur plusieurs plateformes.' },
    mobile: { name: "Développement d'Applications Mobiles", blurb: 'Applications natives et multiplateformes pour iOS et Android.' },
  },
  zh: {
    web: { name: '网页平台', blurb: '从零到首位付费客户的全栈产品构建。' },
    ai: { name: 'AI 与自动化', blurb: '应用型机器学习管道、智能体与工作流自动化。' },
    fullstack: { name: '全栈工程', blurb: '嵌入您路线图的端到端功能团队。' },
    systems: { name: '系统开发', blurb: '性能关键型后端、基础设施与分布式系统。' },
    iot: { name: '物联网与机器人', blurb: '联网硬件、传感器网络与嵌入式控制。' },
    blockchain: { name: '区块链开发', blurb: '智能合约、代币系统与链上基础设施。' },
    bots: { name: '机器人', blurb: '跨平台的聊天、自动化与交易机器人。' },
    mobile: { name: '移动应用开发', blurb: '面向 iOS 和 Android 的原生与跨平台应用。' },
  },
  de: {
    web: { name: 'Web-Plattformen', blurb: 'Full-Stack-Produktentwicklung von null bis zum ersten zahlenden Kunden.' },
    ai: { name: 'KI & Automatisierung', blurb: 'Angewandte ML-Pipelines, Agenten und Workflow-Automatisierung.' },
    fullstack: { name: 'Full-Stack-Engineering', blurb: 'Eingebettete Feature-Teams für Ihre Roadmap.' },
    systems: { name: 'Systementwicklung', blurb: 'Leistungskritische Backends, Infrastruktur und verteilte Systeme.' },
    iot: { name: 'IoT & Robotik', blurb: 'Vernetzte Hardware, Sensornetzwerke und eingebettete Steuerung.' },
    blockchain: { name: 'Blockchain-Entwicklung', blurb: 'Smart Contracts, Token-Systeme und On-Chain-Infrastruktur.' },
    bots: { name: 'Bots', blurb: 'Chat-, Automatisierungs- und Trading-Bots plattformübergreifend.' },
    mobile: { name: 'Mobile App-Entwicklung', blurb: 'Native und plattformübergreifende Apps für iOS und Android.' },
  },
}

export function translateService(service, language) {
  const tr = serviceCatalogI18n[language]?.[service.id]
  if (!tr) return service
  return { ...service, name: tr.name, blurb: tr.blurb }
}
