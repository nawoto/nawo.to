// コレクション設定の一元管理
export const COLLECTIONS = {
  logs: {
    name: 'LOGS',
    path: '/logs',
    slug: 'logs'
  },
  texts: {
    name: 'TEXTS',
    path: '/texts',
    slug: 'texts'
  },
  backtrace: {
    name: 'BACKTRACE',
    path: '/backtrace',
    slug: 'backtrace'
  }
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
  const config = getCollectionConfig(collection);
  return `${config.path}/${slug}/`;
}
