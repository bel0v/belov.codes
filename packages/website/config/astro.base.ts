import type { AstroUserConfig } from 'astro'
import { remarkReadingTime } from './remark-reading-time'
import mdx from '@astrojs/mdx'
import sitemap from '@astrojs/sitemap'
import node from '@astrojs/node'
import { FontaineTransform } from 'fontaine'

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
    plugins: [
      FontaineTransform.vite({
        resolvePath: (id) => new URL(`./public${id}`, import.meta.url),
        fallbacks: {
          'Space Grotesk Variable': ['Helvetica'],
          'Source Code Pro Variable': ['Courier New'],
          'Work Sans Variable': ['Arial'],
        },
      }),
    ],
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  redirects: {
    '/': '/about',
  },
}

export default config
