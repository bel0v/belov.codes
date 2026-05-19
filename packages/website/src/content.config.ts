import { defineCollection } from 'astro:content'
import { z } from 'astro/zod'
import { glob } from 'astro/loaders'

const now = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/pages/now/_entries' }),
  schema: z.object({
    publishDate: z.coerce.date(),
    locale: z.string().optional(),
  }),
})

export const collections = { now }
