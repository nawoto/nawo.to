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
    asin: "B00J1XKB6K",
    title: "アジャイルサムライ−達人開発者への道",
    author: "Jonathan Rasmusson (著)・西村 直人 (監訳)・角谷 信太郎 (監訳)・近藤 修平 (訳)・角掛 拓未 (訳)",
    coverImage: "/images/books/agile-samurai-cover.png",
    description: "アジャイル開発の実践的なガイド。プロジェクト管理からチーム運営まで、アジャイル開発の本質を学べる一冊。",
    publishedDate: "2011-07-16"
  },
  {
    asin: "B086GBXRN6",
    title: "SCRUM BOOT CAMP THE BOOK【増補改訂版】 スクラムチームではじめるアジャイル開発",
    author: "西村 直人 (著)・永瀬 美穂 (著)・吉羽 龍太郎 (著)",
    coverImage: "/images/books/scrum-bootcamp-the-book-cover.png",
    description: "スクラム開発の基礎から実践まで、体系的に学べる実践的なガイドブック。",
    publishedDate: "2020-05-20"
  }
];

export function getBookByAsin(asin: string): Book | undefined {
  return books.find(book => book.asin === asin);
} 