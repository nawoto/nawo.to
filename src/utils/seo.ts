import type { CollectionEntry } from 'astro:content';
import { SITE } from '../config';
import { processArticleMetadata } from './metadata';
import type { CollectionType } from './collections';

// 基本的なSEO設定を生成する共通関数
export function generateBasicSEO(
  title: string,
  description: string,
  url: string,
  image?: string
) {
  const ogImageUrl = image ? new URL(image, SITE.url).href : new URL(SITE.images.defaultOg, SITE.url).href;

  return {
    title,
    description,
    canonical: url,
    charset: "UTF-8",
    openGraph: {
      basic: {
        type: "website",
        title,
        image: ogImageUrl,
        url
      },
      optional: {
        description,
        siteName: SITE.title,
        locale: "ja_JP"
      }
    },
    twitter: {
      card: "summary_large_image",
      site: `@${SITE.social.twitter}`,
      creator: `@${SITE.social.twitter}`,
      title,
      description,
      image: ogImageUrl
    },
    extend: {
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1.0" },
        { name: "author", content: SITE.author.name },
        { name: "robots", content: "index, follow" },
        { name: "googlebot", content: "index, follow" }
      ],
      link: [
        { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: "preconnect", href: "https://fonts.gstatic.com", crossorigin: "" },
        { rel: "preload", as: "style", href: "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;900&display=swap" },
        { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Titillium+Web:wght@400;600;900&display=swap" },
        { rel: "me authn", href: `https://twitter.com/${SITE.social.twitter}` },
        { rel: "me", href: "https://github.com/nawoto/" },
        { rel: "me", href: "https://speakerdeck.com/nawoto" },
        { rel: "me", href: "https://www.instagram.com/nawoto/" },
        { rel: "me", href: "https://www.facebook.com/nishimura.nawoto" },
        { rel: "me", href: "https://www.amazon.co.jp/~/e/B00B46MLPG" },
        { rel: "me", href: `https://bsky.app/profile/${SITE.social.bluesky}` },
        { rel: "webmention", href: "https://webmention.io/nawo.to/webmention" },
        { rel: "pingback", href: "https://webmention.io/nawo.to/xmlrpc" },
        { rel: "alternate", type: "application/rss+xml", title: SITE.title, href: "/rss.xml" },
        { rel: "icon", type: "image/x-icon", href: "/favicon.ico" },
        { rel: "apple-touch-icon", href: "/images/site-icon.png" }
      ]
    }
  };
}

// 記事用のSEO設定を生成する共通関数
export function generateArticleSEO(
  article: CollectionEntry<CollectionType>,
  url: string,
  getArticleUrl: (article: CollectionEntry<CollectionType>) => string
) {
  const metadata = processArticleMetadata(article);
  const title = `${article.data.title} | ${SITE.title}`;

  const basicSEO = generateBasicSEO(title, metadata.description, url, metadata.ogImageUrl);

  return {
    ...basicSEO,
    extend: {
      ...basicSEO.extend,
      meta: [
        ...basicSEO.extend.meta,
        { property: "article:published_time", content: metadata.publishedTime },
        ...(metadata.modifiedTime !== metadata.publishedTime ? [{ property: "article:modified_time", content: metadata.modifiedTime }] : []),
        { property: "article:author", content: SITE.author.name },
        { property: "article:section", content: "Technology" }
      ]
    }
  };
}

// プロフィール用のSEO設定を生成する共通関数
export function generateProfileSEO(
  title: string,
  description: string,
  url: string,
  profileImage: string
) {
  const basicSEO = generateBasicSEO(title, description, url, profileImage);

  return {
    ...basicSEO,
    openGraph: {
      ...basicSEO.openGraph,
      basic: {
        ...basicSEO.openGraph.basic,
        type: "profile"
      }
    },
    extend: {
      ...basicSEO.extend,
      meta: [
        ...basicSEO.extend.meta,
        { property: "profile:first_name", content: "Naoto" },
        { property: "profile:last_name", content: "Nishimura" },
        { property: "profile:username", content: "nawoto" },
        { property: "profile:gender", content: "male" }
      ]
    }
  };
}

