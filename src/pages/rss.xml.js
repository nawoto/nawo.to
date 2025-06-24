import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';
import { getTextSlug, getLogsUrl } from '../utils/slug';

export async function GET(context) {
  const posts = await getCollection('logs');
  const texts = await getCollection('texts');
  
  // 投稿と記事を統合してソート
  const allContent = [
    ...posts.map(post => ({
      ...post,
      type: 'logs'
    })),
    ...texts.map(text => ({
      ...text,
      type: 'texts'
    }))
  ].sort((a, b) => new Date(b.data.pubDate) - new Date(a.data.pubDate));

  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: allContent.map((item) => {
      let link;
      if (item.type === 'logs') {
        link = getLogsUrl(item.slug);
      } else {
        const slug = getTextSlug(item.slug);
        link = `/texts/${slug}/`;
      }
      
      return {
        title: item.data.title,
        pubDate: item.data.pubDate,
        description: item.data.description,
        link: link,
      };
    }),
  });
} 