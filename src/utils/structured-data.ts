import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';
import { generateBlogPostingStructuredData, generateBreadcrumbStructuredData } from '../data/structured-data';
import type { ArticleStructuredData } from '../types';
import { processArticleMetadata } from './metadata';
import type { CollectionType } from './collections';
import { getListPageUrl, getListPageName, generateExcerpt } from './content';

// 記事用の構造化データを生成する共通関数
export function generateArticleStructuredData(
  article: CollectionEntry<CollectionType>,
  url: string,
  getArticleUrl: (article: CollectionEntry<CollectionType>) => string
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
