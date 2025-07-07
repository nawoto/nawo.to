import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';
import { generateBlogPostingStructuredData, generateBreadcrumbStructuredData } from '../data/structured-data';
import type { ArticleStructuredData } from '../types';
import { processArticleMetadata } from './metadata';

// 記事用の構造化データを生成する共通関数
export function generateArticleStructuredData(
  article: CollectionEntry<'logs' | 'texts' | 'backtrace'>,
  url: string,
  getArticleUrl: (article: CollectionEntry<'logs' | 'texts' | 'backtrace'>) => string
): ArticleStructuredData {
  const metadata = processArticleMetadata(article);
  const title = metadata.title;
  
  // BlogPosting構造化データを生成
  const blogPostingData = generateBlogPostingStructuredData({
    url,
    headline: title,
    description: metadata.description,
    image: metadata.ogImageUrl,
    author: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.url
    },
    publisher: {
      "@type": "Organization",
      name: SITE.title,
      logo: {
        "@type": "ImageObject",
        url: new URL(SITE.images.siteIcon, SITE.url).href
      }
    },
    datePublished: metadata.publishedTime,
    dateModified: metadata.modifiedTime,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url
    }
  });
  
  // BreadcrumbList構造化データを生成
  const breadcrumbData = generateBreadcrumbStructuredData({
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE.url
      },
      {
        "@type": "ListItem",
        position: 2,
        name: getListPageName(article.collection),
        item: `${SITE.url}${getListPageUrl(article.collection)}`
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: url
      }
    ]
  });
  
  return {
    blogPostingData,
    breadcrumbData
  };
}

// コレクションに応じた一覧ページのURLを生成
function getListPageUrl(collection: string): string {
  switch (collection) {
    case 'logs':
      return '/logs';
    case 'texts':
      return '/texts';
    case 'backtrace':
      return '/backtrace';
    default:
      return '/logs';
  }
}

// コレクションに応じた一覧ページの名前を取得
function getListPageName(collection: string): string {
  switch (collection) {
    case 'logs':
      return 'LOGS';
    case 'texts':
      return 'TEXTS';
    case 'backtrace':
      return 'BACKTRACE';
    default:
      return 'LOGS';
  }
}

// 記事の抜粋を生成する関数
function generateExcerpt(content: string, maxLength: number = 140): string {
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