import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';
import { generateExcerpt } from './content';
import type { CollectionType } from './collections';

// 記事のメタデータを処理する共通関数
export function processArticleMetadata(article: CollectionEntry<CollectionType>) {
  const title = article.data.title;
  const description = article.data.description || generateExcerpt(article.body ?? '');
  const publishedTime = article.data.pubDate.toISOString();
  const modifiedTime =
    'updatedDate' in article.data && article.data.updatedDate
      ? article.data.updatedDate.toISOString()
      : publishedTime;

  // OGP画像の決定ロジック
  let ogImageUrl;
  if ('ogimage' in article.data && article.data.ogimage) {
    // frontmatterで指定された場合のみその画像を使う
    ogImageUrl = new globalThis.URL(article.data.ogimage, SITE.url).href;
  } else {
    // デフォルト画像を使用
    ogImageUrl = new globalThis.URL('/images/og/opengraph-default.png', SITE.url).href;
  }

  return {
    title,
    description,
    publishedTime,
    modifiedTime,
    ogImageUrl,
    tags: article.data.tags || [],
  };
}

// 記事のメタデータを完全に処理する共通関数
export function processCompleteArticleMetadata(
  article: CollectionEntry<CollectionType>,
  shareUrl: string
) {
  const metadata = processArticleMetadata(article);
  const pageTitle = `${article.data.title} | ${SITE.title}`;

  return {
    ...metadata,
    url: shareUrl,
    pageTitle,
  };
}
