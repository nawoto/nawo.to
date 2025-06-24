import { SITE } from '../config.js';

// 基本型定義
interface BaseStructuredData {
  "@context": "https://schema.org";
  "@type": string;
}

interface PersonData {
  name: string;
  alternateName?: string[];
  image?: string;
  url?: string;
  jobTitle?: string[];
  worksFor?: Array<{
    "@type": "Organization";
    name: string;
    description?: string;
  }>;
  address?: {
    "@type": "PostalAddress";
    addressLocality: string;
    addressCountry: string;
  };
  birthDate?: string;
  gender?: string;
  nationality?: string;
  sameAs?: string[];
  author?: Array<{
    "@type": "Book";
    name: string;
    isbn: string;
    publisher: string;
    datePublished: string;
  }>;
  hasCredential?: {
    "@type": "EducationalOccupationalCredential";
    credentialCategory: string;
    name: string;
  };
  mainEntityOfPage?: {
    "@type": "WebPage";
    "@id": string;
  };
}

interface BlogPostingData {
  headline: string;
  description: string;
  image: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    logo: {
      "@type": "ImageObject";
      url: string;
    };
  };
  datePublished: string;
  dateModified: string;
  url: string;
  mainEntityOfPage: {
    "@type": "WebPage";
    "@id": string;
  };
}

interface BreadcrumbData {
  itemListElement: Array<{
    "@type": "ListItem";
    position: number;
    name: string;
    item: string;
  }>;
}

// WebSite構造化データ
export function generateWebSiteStructuredData(): BaseStructuredData & {
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  author: {
    "@type": "Person";
    name: string;
    url: string;
  };
  publisher: {
    "@type": "Organization";
    name: string;
    description: string;
    url: string;
    logo: {
      "@type": "ImageObject";
      url: string;
      width: number;
      height: number;
    };
    sameAs: string[];
  };
  potentialAction: {
    "@type": "SearchAction";
    target: {
      "@type": "EntryPoint";
      urlTemplate: string;
    };
    "query-input": string;
  };
} {
  const socialLinks = [
    `https://twitter.com/${SITE.social.twitter}`,
    `https://github.com/${SITE.social.github}/`,
    `https://speakerdeck.com/${SITE.social.speakerdeck}`,
    `https://www.instagram.com/${SITE.social.instagram}/`,
    `https://www.facebook.com/${SITE.social.facebook}`,
    `https://www.amazon.co.jp/~/e/${SITE.social.amazon}`
  ];

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.title,
    description: SITE.description,
    url: SITE.url,
    author: {
      "@type": "Person",
      name: SITE.author.name,
      url: SITE.url
    },
    publisher: {
      "@type": "Organization",
      name: SITE.title,
      description: SITE.description,
      url: SITE.url,
      logo: {
        "@type": "ImageObject",
        url: new URL(SITE.images.siteIcon, SITE.url).href,
        width: 512,
        height: 512
      },
      sameAs: socialLinks
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE.url}/search?q={search_term_string}`
      },
      "query-input": "required name=search_term_string"
    }
  };
}

// Person構造化データ
export function generatePersonStructuredData(data: PersonData): BaseStructuredData & {
  "@type": "Person";
} & PersonData {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    ...data
  };
}

// BlogPosting構造化データ
export function generateBlogPostingStructuredData(data: BlogPostingData): BaseStructuredData & {
  "@type": "BlogPosting";
} & BlogPostingData {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    ...data
  };
}

// BreadcrumbList構造化データ
export function generateBreadcrumbStructuredData(data: BreadcrumbData): BaseStructuredData & {
  "@type": "BreadcrumbList";
} & BreadcrumbData {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    ...data
  };
}

// デフォルトのPersonデータ（aboutページ用）
export const DEFAULT_PERSON_DATA: PersonData = {
  name: "西村 直人",
  alternateName: ["NISHIMURA Naoto", "nawoto"],
  image: `${SITE.url}/images/profile-pic.png`,
  url: `${SITE.url}/about`,
  jobTitle: ["エンジニアリングマネージャー", "スクラムマスター"],
  worksFor: [
    {
      "@type": "Organization",
      name: "株式会社エス・エム・エス"
    },
    {
      "@type": "Organization", 
      name: "一般社団法人アジャイルチームを支える会",
      description: "代表理事"
    }
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Asakusa, Tokyo",
    addressCountry: "JP"
  },
  birthDate: "1974-05-24",
  gender: "Male",
  nationality: "Japanese",
  sameAs: [
    "https://twitter.com/nawoto",
    "https://github.com/nawoto/",
    "https://speakerdeck.com/nawoto",
    "https://www.instagram.com/nawoto/",
    "https://suzuri.jp/nawoto/",
    "https://www.amazon.co.jp/~/e/B00B46MLPG"
  ],
  author: [
    {
      "@type": "Book",
      name: "SCRUM BOOT CAMP THE BOOK【増補改訂版】",
      isbn: "9784798163673",
      publisher: "翔泳社",
      datePublished: "2020-05-20"
    },
    {
      "@type": "Book", 
      name: "SCRUM BOOT CAMP THE BOOK",
      isbn: "9784798129716",
      publisher: "翔泳社",
      datePublished: "2013-02-13"
    }
  ],
  hasCredential: {
    "@type": "EducationalOccupationalCredential",
    credentialCategory: "Award",
    name: "楽天テクロノロジーアワード 2011 Ruby 賞"
  },
  mainEntityOfPage: {
    "@type": "WebPage",
    "@id": `${SITE.url}/about`
  }
}; 