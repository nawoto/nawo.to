import type { CollectionEntry } from 'astro:content';
import { getLogSlug, getTextSlug } from './slug';

// 記事のURLを生成する共通関数
export function generateArticleUrl(
  article: CollectionEntry<'logs' | 'texts' | 'backtrace'>,
  collectionType: 'logs' | 'texts' | 'backtrace'
): string {
  switch (collectionType) {
    case 'logs':
      return `/${getLogSlug(article.slug)}/`;
    case 'texts':
      return `/texts/${getTextSlug(article.slug)}/`;
    case 'backtrace':
      return `/backtrace/${article.data.pubDate.getFullYear()}/${String(article.data.pubDate.getMonth() + 1).padStart(2, '0')}/${String(article.data.pubDate.getDate()).padStart(2, '0')}/${article.slug.split('-').pop()}/`;
    default:
      return `/${article.slug}/`;
  }
}

// コレクション別のURL生成関数
export function getLogUrl(article: CollectionEntry<'logs' | 'texts' | 'backtrace'>): string {
  return generateArticleUrl(article, 'logs');
}

export function getTextUrl(article: CollectionEntry<'logs' | 'texts' | 'backtrace'>): string {
  return generateArticleUrl(article, 'texts');
}

export function getBacktraceUrl(article: CollectionEntry<'logs' | 'texts' | 'backtrace'>): string {
  return generateArticleUrl(article, 'backtrace');
} 