// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import partytown from '@astrojs/partytown';
import { remarkAmazonCard } from './scripts/remark-amazon-card.js';
import { remarkYoutubeEmbed } from './scripts/remark-youtube-embed.js';
import { remarkInstagramEmbed } from './scripts/remark-instagram-embed.js';
import remarkBookCard from './scripts/remark-bookcard.js';
import remarkToc from 'remark-toc';
import rehypeRaw from 'rehype-raw';
import react from '@astrojs/react';
import remarkLinkCardPlus from 'remark-link-card-plus';
import { SITE } from './src/config.js';

// https://astro.build/config
export default defineConfig({
  site: 'https://nawo.to',
  integrations: [tailwind(), sitemap(), partytown(), react()],
  markdown: {
    remarkPlugins: [
      remarkToc,
      [remarkAmazonCard, { affiliateTag: SITE.affiliate.amazon }],
      remarkYoutubeEmbed,
      remarkInstagramEmbed,
      remarkBookCard,
      [
        remarkLinkCardPlus,
        {
          excludeDomains: [
            'youtube.com',
            'www.youtube.com',
            'youtu.be',
            'instagram.com',
            'www.instagram.com',
          ],
          // キャッシュを無効化して新しいOG画像URLを取得
          cache: false,
        },
      ],
    ],
    rehypePlugins: [rehypeRaw],
  },
  trailingSlash: 'ignore',
});
