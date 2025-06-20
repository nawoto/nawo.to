// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';
import remarkLinkCard from 'remark-link-card-plus';

// https://astro.build/config
export default defineConfig({
  site: 'https://nawo.to',
  integrations: [
    tailwind(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [
      [
        remarkLinkCard, {
          cache: true,
          shortenUrl: true,
          thumbnailPosition: "right",
          noThumbnail: false,
          noFavicon: false,
          ignoreExtensions: ['.mp4', '.pdf'],
        },
      ],
    ],
  },
  trailingSlash: 'always',
});
