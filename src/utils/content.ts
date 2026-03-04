import type { CollectionEntry } from 'astro:content';
import type { CollectionType } from './collections';

/**
 * コンテンツ関連の共通ユーティリティ関数
 */

/**
 * 記事の抜粋を生成する関数
 * @param content 記事の本文
 * @param maxLength 最大文字数（デフォルト: 140）
 * @returns 抜粋テキスト
 */
export function generateExcerpt(content: string, maxLength: number = 140): string {
  // HTMLタグを除去
  const plainText = content.replace(/<[^>]*>/g, '');

  // 改行を除去して単一の文字列に
  const singleLine = plainText.replace(/\n+/g, ' ').trim();

  // 最大文字数で切り取り
  if (singleLine.length <= maxLength) {
    return singleLine;
  }

  // 単語の境界で切り取り
  const truncated = singleLine.substring(0, maxLength);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  if (lastSpaceIndex > 0) {
    return truncated.substring(0, lastSpaceIndex) + '...';
  }

  return truncated + '...';
}

/**
 * 日付を日本語形式でフォーマットする関数
 * @param date 日付オブジェクト
 * @returns フォーマットされた日付文字列
 */
export function formatDate(date: Date): string {
  return date
    .toLocaleDateString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
    })
    .replace(/\//g, '/');
}

/**
 * 記事の説明文を取得する関数
 * @param description 手動で設定された説明文
 * @param excerpt 自動生成された抜粋
 * @returns 説明文
 */
export function getDescription(description: string | undefined, excerpt: string): string {
  return description || excerpt;
}

// 記事を日付順でソートする共通関数
export function sortArticlesByDate<T extends CollectionEntry<CollectionType>>(articles: T[]): T[] {
  return articles.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
}

// 記事を年別にグループ化する共通関数
export function groupArticlesByYear<T extends CollectionEntry<CollectionType>>(
  articles: T[]
): Record<number, T[]> {
  return articles.reduce(
    (acc, article) => {
      const year = article.data.pubDate.getFullYear();
      if (!acc[year]) {
        acc[year] = [];
      }
      acc[year].push(article);
      return acc;
    },
    {} as Record<number, T[]>
  );
}

// 年を降順でソートする共通関数
export function getSortedYears(articlesByYear: Record<number, unknown[]>): number[] {
  return Object.keys(articlesByYear)
    .map(Number)
    .sort((a, b) => b - a);
}

// 記事の抜粋を生成する共通関数
export async function generateArticleExcerpts<T extends CollectionEntry<CollectionType>>(
  articles: T[]
): Promise<(T & { excerpt: string })[]> {
  return Promise.all(
    articles.map(async (article) => {
      const excerpt = generateExcerpt(article.body);
      return {
        ...article,
        excerpt,
      };
    })
  );
}

