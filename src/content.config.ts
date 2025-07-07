import { defineCollection, z } from 'astro:content';

const logs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    updatedDate: z.date().optional(),
    heroImage: z.string().optional(),
    ogimage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const texts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    updatedDate: z.date().optional(),
    ogimage: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

const backtrace = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    pubDate: z.date(),
    description: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = {
  'logs': logs,
  'texts': texts,
  'backtrace': backtrace,
}; 