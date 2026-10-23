import type { APIRoute } from 'astro'
import { AGENT_EMAIL_HEADER, AGENT_NAME_HEADER } from 'constants/analytics'

export const GET: APIRoute = ({ site }) => {
  const lines = [
    `# AI agents: please identify yourself with the ${AGENT_NAME_HEADER} and ${AGENT_EMAIL_HEADER} headers, see /llms.txt`,
    'User-agent: *',
    'Allow: /',
  ]

  if (site) {
    lines.push('', `Sitemap: ${new URL('sitemap-index.xml', site).href}`)
  }

  return new Response(`${lines.join('\n')}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
