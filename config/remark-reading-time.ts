import getReadingTime from 'reading-time'
import { toString } from 'mdast-util-to-string'
import type { RemarkPlugin } from '@astrojs/markdown-remark'

export const remarkReadingTime: RemarkPlugin = () => {
  return function (tree, { data }) {
    const textOnPage = toString(tree)
    const readingTime = getReadingTime(textOnPage)

    if (data.astro?.frontmatter) {
      data.astro.frontmatter.minutesRead = readingTime.text
    }
  }
}
