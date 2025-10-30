import type { AstroUserConfig } from 'astro'
import { remarkReadingTime } from './remark-reading-time'

const config: AstroUserConfig = {
  vite: {
    css: {
      transformer: 'lightningcss',
    },
  },
  markdown: {
    remarkPlugins: [remarkReadingTime],
  },
}

export default config
