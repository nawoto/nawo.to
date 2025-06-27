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
    tags: string[];
    ogimage?: string;
  };
  render: () => Promise<{
    Content: any;
    headings: any[];
    remarkPluginFrontmatter: any;
  }>;
}

// 前後の記事の型定義
export interface NavigationPost {
  id: string;
  slug: string;
  collection: string;
  data: {
    title: string;
    pubDate: Date;
    updatedDate?: Date;
    description?: string;
    tags: string[];
    ogimage?: string;
  };
}

// SEO設定の型定義
export interface SEOConfig {
  openGraph?: {
    title?: string;
    description?: string;
    image?: string;
    type?: string;
    url?: string;
  };
  twitter?: {
    card?: string;
    site?: string;
    creator?: string;
    title?: string;
    description?: string;
    image?: string;
  };
  extend?: Record<string, unknown>;
}

// 構造化データの型定義
export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
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
  image?: string;
  openGraph?: SEOConfig['openGraph'];
  twitter?: SEOConfig['twitter'];
  extend?: SEOConfig['extend'];
}

// 構造化データコンポーネントのProps型定義
export interface StructuredDataProps {
  data: StructuredData;
}

// WebMentionsコンポーネントのProps型定義
export interface WebMentionsProps {
  url: string;
} 