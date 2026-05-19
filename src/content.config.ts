import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const baseSchema = {
  title: z.string(),
  pubDate: z.coerce.date(),
  description: z.string().optional(),
  updatedDate: z.coerce.date().optional(),
  ogimage: z.string().optional(),
  tags: z.array(z.string()).optional(),
  toc: z.boolean().optional(),
  draft: z.boolean().optional(),
};

const logs = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/logs' }),
  schema: z.object(baseSchema),
});

const texts = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/texts' }),
  schema: z.object(baseSchema),
});

const backtrace = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/backtrace' }),
  schema: z.object(baseSchema),
});

export const collections = {
  logs: logs,
  texts: texts,
  backtrace: backtrace,
};
