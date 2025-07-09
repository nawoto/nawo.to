// コレクション設定の一元管理
export const COLLECTIONS = {
  logs: {
    name: 'LOGS',
    path: '/logs',
    slug: 'logs',
  },
  texts: {
    name: 'TEXTS',
    path: '/texts',
    slug: 'texts',
  },
  backtrace: {
    name: 'BACKTRACE',
    path: '/backtrace',
    slug: 'backtrace',
  },
} as const;

export type CollectionType = keyof typeof COLLECTIONS;

// コレクション名から設定を取得
export function getCollectionConfig(collection: CollectionType) {
  return COLLECTIONS[collection];
}

// コレクション名からパスを取得
export function getCollectionPath(collection: CollectionType): string {
  return COLLECTIONS[collection].path;
}

// コレクション名から表示名を取得
export function getCollectionName(collection: CollectionType): string {
  return COLLECTIONS[collection].name;
}

// 記事のURLを生成
export function getArticleUrl(collection: CollectionType, slug: string): string {
  if (collection === 'logs') {
    // logsコレクションは日付ベースのパス
    // slug形式: 2025-07-08-site-design-with-ai
    // URL形式: /2025/07/08/site-design-with-ai/
    const dateMatch = slug.match(/^(\d{4})-(\d{2})-(\d{2})-(.+)$/);
    if (dateMatch) {
      const [, year, month, day, title] = dateMatch;
      return `/${year}/${month}/${day}/${title}/`;
    }
    // 日付形式でない場合は従来の形式
    return `/${slug}/`;
  }
  if (collection === 'backtrace') {
    return `/backtrace/${slug}/`;
  }
  // textsはフラットslug
  return `/texts/${slug}/`;
}
