import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    description: z.string(),
    tags: z.array(z.string()),
    draft: z.boolean().default(false),
    devToUrl: z.string().optional(),
  }),
});

const projects = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    date: z.coerce.date(),
    githubUrl: z.string().optional(),
    demoUrl: z.string().optional(),
    featured: z.boolean().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog, projects };
