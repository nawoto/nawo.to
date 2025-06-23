// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { remarkAmazonCard } from './scripts/remark-amazon-card.js';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';

console.log('Loading astro config...');
console.log('remarkAmazonCard plugin:', remarkAmazonCard);
console.log('remarkToc plugin:', remarkToc);
console.log('rehypeRaw plugin:', rehypeRaw);

// https://astro.build/config
export default defineConfig({
  site: 'https://nawo.to',
  integrations: [
    tailwind(),
    sitemap(),
    partytown(),
  ],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkAmazonCard, { affiliateTag: 'nawoto07-22' }],
    ],
    rehypePlugins: [
      rehypeRaw,
    ],
  },
  trailingSlash: 'ignore',
});
