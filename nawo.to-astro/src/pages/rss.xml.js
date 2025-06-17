import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import { SITE } from '../config';

export async function GET(context) {
  const posts = await getCollection('blog');
  const texts = await getCollection('texts');
  
  // 投稿と記事を統合してソート
  const allContent = [
    ...posts.map(post => ({
      ...post,
      type: 'blog'
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
    items: allContent.map((item) => ({
      title: item.data.title,
      pubDate: item.data.pubDate,
      description: item.data.description,
      link: `/${item.type}/${item.slug}/`,
    })),
  });
} 