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
  };
  render: () => Promise<{
    Content: any;
    headings: any[];
    remarkPluginFrontmatter: any;
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

// 構造化データの基本型定義（structured-data.tsと統一）
export interface BaseStructuredData {
  "@context": "https://schema.org";
  "@type": string;
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
  data: BaseStructuredData & Record<string, any>;
}

// WebMentionsコンポーネントのProps型定義
export interface WebMentionsProps {
  url: string;
} 