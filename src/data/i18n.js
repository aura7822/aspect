export const languages = [
  { code: 'en', label: 'English' },
  { code: 'sw', label: 'Kiswahili' },
  { code: 'fr', label: 'Français' },
  { code: 'zh', label: '中文' },
  { code: 'de', label: 'Deutsch' },
]

// Core, site-wide strings. Not every page string is translated yet — this covers
// navigation, common actions, and headline copy as the i18n foundation.
export const translations = {
  en: {
    nav_services: 'Services', nav_pricing: 'Pricing', nav_developers: 'Developers',
    nav_transparency: 'Transparency', nav_bulletins: 'Bulletins', nav_changelog: 'Changelog',
    nav_dashboard: 'Dashboard', start_project: 'Start a project', get_started: 'Get started',
    log_out: 'Log out', account_settings: 'Account settings', accessibility: 'Accessibility',
    read_aloud: 'Read this page aloud', stop_reading: 'Stop reading', dark_mode: 'Dark mode',
    light_mode: 'Light mode', dyslexia_font: 'Dyslexia-friendly font', font_size: 'Text size',
    hero_line1: 'Every facet of your build,', hero_line2: 'in one studio.',
    what_we_build: 'What we build', recent_work: 'Recent work', your_project: 'Your project',
    no_active_projects: 'No active projects yet.', submit: 'Submit',
    good_morning: 'Good morning', good_afternoon: 'Good afternoon', good_evening: 'Good evening',
  },
  sw: {
    nav_services: 'Huduma', nav_pricing: 'Bei', nav_developers: 'Waendelezaji',
    nav_transparency: 'Uwazi', nav_bulletins: 'Matangazo', nav_changelog: 'Mabadiliko',
    nav_dashboard: 'Dashibodi', start_project: 'Anzisha mradi', get_started: 'Anza',
    log_out: 'Toka', account_settings: 'Mipangilio ya akaunti', accessibility: 'Ufikivu',
    read_aloud: 'Soma ukurasa kwa sauti', stop_reading: 'Acha kusoma', dark_mode: 'Hali ya giza',
    light_mode: 'Hali ya mwanga', dyslexia_font: 'Fonti rafiki kwa dyslexia', font_size: 'Ukubwa wa maandishi',
    hero_line1: 'Kila sehemu ya mradi wako,', hero_line2: 'katika studio moja.',
    what_we_build: 'Tunachojenga', recent_work: 'Kazi za hivi karibuni', your_project: 'Mradi wako',
    no_active_projects: 'Hakuna miradi inayoendelea.', submit: 'Tuma',
    good_morning: 'Habari za asubuhi', good_afternoon: 'Habari za mchana', good_evening: 'Habari za jioni',
  },
  fr: {
    nav_services: 'Services', nav_pricing: 'Tarifs', nav_developers: 'Développeurs',
    nav_transparency: 'Transparence', nav_bulletins: 'Bulletins', nav_changelog: 'Journal',
    nav_dashboard: 'Tableau de bord', start_project: 'Démarrer un projet', get_started: 'Commencer',
    log_out: 'Déconnexion', account_settings: 'Paramètres du compte', accessibility: 'Accessibilité',
    read_aloud: 'Lire cette page à voix haute', stop_reading: 'Arrêter la lecture', dark_mode: 'Mode sombre',
    light_mode: 'Mode clair', dyslexia_font: 'Police adaptée à la dyslexie', font_size: 'Taille du texte',
    hero_line1: 'Chaque facette de votre projet,', hero_line2: 'dans un seul studio.',
    what_we_build: 'Ce que nous construisons', recent_work: 'Travaux récents', your_project: 'Votre projet',
    no_active_projects: 'Aucun projet actif pour le moment.', submit: 'Envoyer',
    good_morning: 'Bonjour', good_afternoon: 'Bon après-midi', good_evening: 'Bonsoir',
  },
  zh: {
    nav_services: '服务', nav_pricing: '定价', nav_developers: '开发者',
    nav_transparency: '透明度', nav_bulletins: '公告', nav_changelog: '更新日志',
    nav_dashboard: '仪表盘', start_project: '开始项目', get_started: '开始',
    log_out: '退出登录', account_settings: '账户设置', accessibility: '无障碍',
    read_aloud: '朗读此页面', stop_reading: '停止朗读', dark_mode: '深色模式',
    light_mode: '浅色模式', dyslexia_font: '阅读障碍友好字体', font_size: '文字大小',
    hero_line1: '你项目的每一个面,', hero_line2: '尽在一个工作室。',
    what_we_build: '我们构建的内容', recent_work: '近期作品', your_project: '你的项目',
    no_active_projects: '暂无进行中的项目。', submit: '提交',
    good_morning: '早上好', good_afternoon: '下午好', good_evening: '晚上好',
  },
  de: {
    nav_services: 'Leistungen', nav_pricing: 'Preise', nav_developers: 'Entwickler',
    nav_transparency: 'Transparenz', nav_bulletins: 'Mitteilungen', nav_changelog: 'Änderungsprotokoll',
    nav_dashboard: 'Dashboard', start_project: 'Projekt starten', get_started: 'Loslegen',
    log_out: 'Abmelden', account_settings: 'Kontoeinstellungen', accessibility: 'Barrierefreiheit',
    read_aloud: 'Seite vorlesen', stop_reading: 'Vorlesen stoppen', dark_mode: 'Dunkelmodus',
    light_mode: 'Hellmodus', dyslexia_font: 'Legasthenie-freundliche Schrift', font_size: 'Textgröße',
    hero_line1: 'Jede Facette deines Projekts,', hero_line2: 'in einem Studio.',
    what_we_build: 'Was wir bauen', recent_work: 'Aktuelle Arbeiten', your_project: 'Dein Projekt',
    no_active_projects: 'Noch keine aktiven Projekte.', submit: 'Absenden',
    good_morning: 'Guten Morgen', good_afternoon: 'Guten Tag', good_evening: 'Guten Abend',
  },
}

export function t(lang, key) {
  return translations[lang]?.[key] ?? translations.en[key] ?? key
}
