export interface Book {
  asin: string;
  title: string;
  author: string;
  coverImage: string;
  description: string;
  publishedDate?: string;
}

export const books: Book[] = [
  {
    asin: 'B00J1XKB6K',
    title: 'アジャイルサムライ−達人開発者への道',
    author:
      'Jonathan Rasmusson (著)・西村 直人 (監訳)・角谷 信太郎 (監訳)・近藤 修平 (訳)・角掛 拓未 (訳)',
    coverImage: '/images/books/agile-samurai-cover.png',
    description:
      'アジャイル開発の実践的なガイド。プロジェクト管理からチーム運営まで、アジャイル開発の本質を学べる一冊。',
    publishedDate: '2011-07-16',
  },
  {
    asin: 'B086GBXRN6',
    title: 'SCRUM BOOT CAMP THE BOOK【増補改訂版】 スクラムチームではじめるアジャイル開発',
    author: '西村 直人 (著)・永瀬 美穂 (著)・吉羽 龍太郎 (著)',
    coverImage: '/images/books/scrum-bootcamp-the-book-cover.png',
    description: 'スクラム開発の基礎から実践まで、体系的に学べる実践的なガイドブック。',
    publishedDate: '2020-05-20',
  },
  {
    asin: '4839924023',
    title: 'アジャイルな見積りと計画づくり ~価値あるソフトウェアを育てる概念と技法~',
    author: 'Mike Cohn (著)・マイクコーン (著)・安井力 (著)・角谷信太郎 (著)',
    coverImage: 'https://images-fe.ssl-images-amazon.com/images/I/51A8BTrHYxL._SL160_.jpg',
    description: 'アジャイル開発における見積りと計画づくりの実践的な技法を解説。',
    publishedDate: '2009-01-29',
  },
  {
    asin: '487311392X',
    title: 'Head Firstソフトウェア開発 ―頭とからだで覚えるソフトウェア開発の基本',
    author: 'Dan Pilone (著)・Russ Miles (著)・木下哲也 (監訳)・有限会社福龍興業 (著)',
    coverImage: 'https://images-fe.ssl-images-amazon.com/images/I/51YxaQry0KL._SL160_.jpg',
    description: 'ソフトウェア開発の基本を視覚的に学べるHead Firstシリーズの一冊。',
    publishedDate: '2009-01-22',
  },
  {
    asin: '4798122971',
    title: 'ビジネスモデル・ジェネレーション ビジネスモデル設計書',
    author: 'アレックス・オスターワルダー (著)・イヴ・ピニュール (著)・小山龍介 (著)',
    coverImage: 'https://images-fe.ssl-images-amazon.com/images/I/61JW%2BUp%2B6jL._SL160_.jpg',
    description: 'ビジネスモデルの設計と分析のための実践的なフレームワークを提供。',
    publishedDate: '2012-02-10',
  },
  {
    asin: '4798128147',
    title: 'ビジネスモデルYOU',
    author:
      'ティム・クラーク (著)・アレックス・オスターワルダー (著)・イヴ・ピニュール (著)・神田昌典 (著)',
    coverImage: 'https://images-fe.ssl-images-amazon.com/images/I/51pD1kmEXIL._SL160_.jpg',
    description: '個人のキャリアとビジネスモデルを組み合わせた新しいキャリア設計手法。',
    publishedDate: '2012-10-26',
  },
  {
    asin: '4873115914',
    title: 'Running Lean ―実践リーンスタートアップ (THE LEAN SERIES)',
    author: 'Ash Maurya (著)・井口耕二 (訳)',
    coverImage: 'https://images-fe.ssl-images-amazon.com/images/I/41n0JPz%2BDrL._SL160_.jpg',
    description: 'リーンスタートアップの実践的な手法とツールを体系的に解説。',
    publishedDate: '2012-03-24',
  },
];

// 書籍名キーでのアクセス
export const booksByName: Record<string, Book> = {
  'agile-samurai': books[0],
  'scrum-bootcamp': books[1],
  'agile-estimating': books[2],
  'head-first-software': books[3],
  'business-model-generation': books[4],
  'business-model-you': books[5],
  'running-lean': books[6],
};

// ASINキーでのアクセス
export const booksByAsin: Record<string, Book> = {
  B00J1XKB6K: books[0],
  B086GBXRN6: books[1],
  '4839924023': books[2],
  '487311392X': books[3],
  '4798122971': books[4],
  '4798128147': books[5],
  '4873115914': books[6],
};

export function getBookByAsin(asin: string): Book | undefined {
  return books.find((book) => book.asin === asin);
}

export function getBookByName(name: string): Book | undefined {
  return booksByName[name];
}

export function getBookByIdentifier(identifier: string): Book | undefined {
  // ASIN記法かどうか判定
  if (identifier.startsWith('ASIN:')) {
    const asin = identifier.replace('ASIN:', '');
    return booksByAsin[asin];
  } else {
    // 書籍名記法
    return booksByName[identifier];
  }
}
