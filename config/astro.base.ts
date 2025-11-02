import type { AstroUserConfig } from 'astro'
import { remarkReadingTime } from './remark-reading-time'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import node from '@astrojs/node'

const config: AstroUserConfig = {
  site: 'https://belov.codes',
  adapter: node({
    mode: 'standalone',
  }),
  integrations: [
    sitemap(),
    mdx({
      optimize: true,
    }),
  ],
  vite: {
    css: {
      transformer: 'lightningcss',
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  redirects: {
    '/': '/blog',
  },
}

export default config
