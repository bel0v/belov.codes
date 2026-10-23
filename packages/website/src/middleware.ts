import { defineMiddleware } from 'astro:middleware'
import { UMAMI_SEND_URL, UMAMI_WEBSITE_ID } from 'constants/analytics'
import { detectAgent, type Agent } from 'scripts/agent-detection'

// Umami drops events sent with a bot user agent, so the agent's real one goes in the event data.
// Same value the official @umami/node SDK sends.
const UMAMI_USER_AGENT = `Mozilla/5.0 Umami/${process.version}`
const IGNORED_PATHS = /^\/(_astro\/|api\/|events\.js$)/

function trackAgentVisit(
  request: Request,
  url: URL,
  agent: Agent,
  clientIp: string | undefined
) {
  const forwardedFor = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim()
  const ip = forwardedFor || clientIp

  return fetch(UMAMI_SEND_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'User-Agent': UMAMI_USER_AGENT,
      ...(ip && { 'X-Forwarded-For': ip }),
    },
    body: JSON.stringify({
      type: 'event',
      payload: {
        website: UMAMI_WEBSITE_ID,
        hostname: url.hostname,
        url: url.pathname + url.search,
        name: 'agent-visit',
        id: agent.email,
        data: {
          identified: agent.identified,
          agent: agent.name ?? 'unknown',
          email: agent.email ?? '',
          userAgent: request.headers.get('user-agent') ?? '',
        },
      },
    }),
  }).catch(() => {})
}

export const onRequest = defineMiddleware((context, next) => {
  const { request, url } = context

  if (
    import.meta.env.PROD &&
    request.method === 'GET' &&
    !IGNORED_PATHS.test(url.pathname)
  ) {
    const agent = detectAgent(request.headers)
    if (agent) {
      let clientIp: string | undefined
      try {
        clientIp = context.clientAddress
      } catch {}
      void trackAgentVisit(request, url, agent, clientIp)
    }
  }

  return next()
})
