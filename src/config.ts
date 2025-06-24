export const SITE = {
  title: '#nawoto',
  description: '@nawoto write some texts about Software Development, Life and more',
  url: 'https://nawo.to',
  author: {
    name: 'NISHIMURA Naoto',
    summary: '西村直人。おもに nawoto という名前でいろいろしています',
  },
  social: {
    twitter: 'nawoto',
    github: 'nawoto',
    speakerdeck: 'nawoto',
    instagram: 'nawoto',
    facebook: 'nishimura.nawoto',
    amazon: 'B00B46MLPG',
    suzuri: 'nawoto',
  },
  // --- ナビゲーション設定 ---
  navigation: {
    items: [
      { href: '/', label: 'top' },
      { href: '/logs', label: 'log' },
      { href: '/texts', label: 'texts' },
      { href: '/about', label: 'about' }
    ]
  },
  // --- アフィリエイト設定 ---
  affiliate: {
    amazon: 'nawoto07-22',
  },
  // --- 画像パス設定 ---
  images: {
    defaultOg: '/images/opengraph-default.png',
    siteIcon: '/images/site-icon.png',
    profilePic: '/images/profile-pic.png',
  },
  // --- OGP画像生成用設定 ---
  ogp: {
    width: 1200,
    height: 630,
    fontPath: 'public/fonts/NotoSansJP-Bold.ttf',
    fontName: 'Noto Sans JP',
    fontWeight: 700,
    iconPath: 'public/images/site-icon.png',
    defaultOgImagePath: 'public/images/opengraph-default.png',
  },
} as const; 