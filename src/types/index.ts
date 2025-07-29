// WebMention関連の型定義
export interface WebMention {
  'wm-property': string;
  'wm-source': string;
  author?: {
    name: string;
    photo?: string;
    url?: string;
  };
  'wm-received'?: string;
  'wm-id'?: string;
  'wm-private'?: boolean;
}

// 記事コンテンツの型定義（AstroのCollectionEntryと互換性を保つ）
export interface ArticleContent {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: {
    title: string;
    pubDate: Date;
    updatedDate?: Date;
    description?: string;
    ogimage?: string;
    tags?: string[];
  };
  render: () => Promise<{
    Content: unknown;
    headings: unknown[];
    remarkPluginFrontmatter: unknown;
  }>;
}

// 前後の記事の型定義
export interface NavigationPost {
  slug: string;
  collection: string;
  data: {
    title: string;
    pubDate: Date;
    updatedDate?: Date;
    description?: string;
    ogimage?: string;
    tags?: string[];
  };
}

// SEO設定の型定義
export interface SEOConfig {
  title: string;
  description?: string;
  canonical?: string;
  charset?: string;
  openGraph?: {
    basic: {
      type: string;
      title: string;
      image: string;
      url: string;
    };
    optional?: {
      description?: string;
      siteName?: string;
      locale?: string;
    };
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  extend?: {
    meta?: Array<{ name?: string; property?: string; content: string }>;
    link?: Array<{
      rel: string;
      href: string;
      type?: string;
      title?: string;
      crossorigin?: string;
    }>;
  };
}

// 構造化データの基本型定義
export interface BaseStructuredData {
  '@context': 'https://schema.org';
  '@type': string;
}

// BlogPosting構造化データ用型定義
export interface BlogPostingData {
  headline: string;
  description: string;
  image: string;
  author: {
    '@type': 'Person';
    name: string;
    url: string;
  };
  publisher: {
    '@type': 'Organization';
    name: string;
    logo: {
      '@type': 'ImageObject';
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  url: string;
  mainEntityOfPage: {
    '@type': 'WebPage';
    '@id': string;
  };
}

// BreadcrumbList構造化データ用型定義
export interface BreadcrumbData {
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item: string;
  }>;
}

// Person構造化データ用型定義
export interface PersonData {
  name: string;
  alternateName?: string[];
  image?: string;
  url?: string;
  jobTitle?: string[];
  worksFor?: Array<{
    '@type': 'Organization';
    name: string;
    description?: string;
  }>;
  address?: {
    '@type': 'PostalAddress';
    addressLocality: string;
    addressCountry: string;
  };
  birthDate?: string;
  gender?: string;
  nationality?: string;
  sameAs?: string[];
  author?: Array<{
    '@type': 'Book';
    name: string;
    isbn: string;
    publisher: string;
    datePublished: string;
  }>;
  hasCredential?: {
    '@type': 'EducationalOccupationalCredential';
    credentialCategory: string;
    name: string;
  };
  mainEntityOfPage?: {
    '@type': 'WebPage';
    '@id': string;
  };
}

// 記事レイアウトのProps型定義
export interface ArticleLayoutProps {
  title: string;
  content: ArticleContent;
  previousPost?: NavigationPost;
  nextPost?: NavigationPost;
  shareUrl?: string;
}

// SEOコンポーネントのProps型定義
export interface SEOProps {
  title: string;
  description?: string;
  canonical?: string;
  charset?: string;
  openGraph?: SEOConfig['openGraph'];
  twitter?: SEOConfig['twitter'];
  extend?: SEOConfig['extend'];
}

// 構造化データコンポーネントのProps型定義
export interface StructuredDataProps {
  data: BaseStructuredData & Record<string, unknown>;
}

// WebMentionsコンポーネントのProps型定義
export interface WebMentionsProps {
  url: string;
}

// 記事メタデータ処理用の型定義
export interface ArticleMetadata {
  title: string;
  description: string;
  publishedTime: string;
  modifiedTime: string;
  ogImageUrl: string;
  tags: string[];
  url: string;
  pageTitle: string;
}
