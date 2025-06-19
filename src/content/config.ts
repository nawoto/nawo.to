import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.string().or(z.date()).transform((str) => new Date(str)),
    updatedDate: z.string().or(z.date()).transform((str) => new Date(str)).optional(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    ogimage: z.string().optional(),
  }),
});

const texts = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    pubDate: z.string().or(z.date()).transform((str) => new Date(str)),
    updatedDate: z.string().or(z.date()).transform((str) => new Date(str)).optional(),
    heroImage: z.string().optional(),
    ogimage: z.string().optional(),
  }),
});

export const collections = {
  'blog': blog,
  'texts': texts,
}; 