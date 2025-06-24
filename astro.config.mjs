// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { remarkAmazonCard } from './scripts/remark-amazon-card.js';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';
import react from '@astrojs/react';
import { ogImageGenerator } from './src/integrations/og-image-generator.tsx';
import remarkLinkCardPlus from 'remark-link-card-plus';
import { SITE } from './src/config.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://nawo.to',
  integrations: [
    tailwind(),
    sitemap(),
    partytown(),
    react(),
    ogImageGenerator({
      blogPath: 'logs/',
      textPath: 'texts/',
    }),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkAmazonCard, { affiliateTag: SITE.affiliate.amazon }],
      remarkLinkCardPlus,
    ],
    rehypePlugins: [
      rehypeRaw,
    ],
  },
  trailingSlash: 'ignore',
});
