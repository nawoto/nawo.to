import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';
import { generateExcerpt } from './content';

// 記事のメタデータを処理する共通関数
export function processArticleMetadata(
  article: CollectionEntry<'logs' | 'texts' | 'backtrace'>
) {
  const title = article.data.title;
  const description = article.data.description || generateExcerpt(article.body);
  const publishedTime = article.data.pubDate.toISOString();
  const modifiedTime = 'updatedDate' in article.data && article.data.updatedDate 
    ? article.data.updatedDate.toISOString() 
    : publishedTime;
  
  // OGP画像の決定ロジック
  let ogImageUrl;
  if ('ogimage' in article.data && article.data.ogimage) {
    ogImageUrl = new URL(article.data.ogimage, SITE.url).href;
  } else {
    const collectionName = article.collection === 'texts' ? 'texts' : 'logs';
    ogImageUrl = new URL(`/${collectionName}/${article.slug}/og.png`, SITE.url).href;
  }
  
  return {
    title,
    description,
    publishedTime,
    modifiedTime,
    ogImageUrl,
    tags: article.data.tags || []
  };
}

// 記事のURLを生成する共通関数
export function generateArticleUrl(
  article: CollectionEntry<'logs' | 'texts' | 'backtrace'>,
  shareUrl?: string
): string {
  if (shareUrl) {
    return shareUrl;
  }
  
  return new URL(`/${article.collection}/${article.slug}/`, SITE.url).href;
}

// 記事のページタイトルを生成する共通関数
export function generateArticleTitle(
  article: CollectionEntry<'logs' | 'texts' | 'backtrace'>
): string {
  return `${article.data.title} | ${SITE.title}`;
}

// 記事のメタデータを完全に処理する共通関数
export function processCompleteArticleMetadata(
  article: CollectionEntry<'logs' | 'texts' | 'backtrace'>,
  shareUrl?: string
) {
  const metadata = processArticleMetadata(article);
  const url = generateArticleUrl(article, shareUrl);
  const pageTitle = generateArticleTitle(article);
  
  return {
    ...metadata,
    url,
    pageTitle
  };
} 