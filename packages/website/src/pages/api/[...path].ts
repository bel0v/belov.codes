import type { APIContext, APIRoute } from 'astro'
import { Hono } from 'hono'
import { logger } from 'hono/logger'
import { NONCE, secureHeaders } from 'hono/secure-headers'
import { healthcheck } from './_handlers'

const app = new Hono<{ Bindings: APIContext }>()
  .basePath('/api/')
  .route('/healthcheck', healthcheck)

app.use(
  logger(),
  secureHeaders({
    contentSecurityPolicy: {
      scriptSrc: [NONCE, import.meta.env.PUBLIC_APP_URL, "'strict-dynamic' https: http:"],
      objectSrc: ["'none'"],
      baseUri: ["'none'"],
    },
  })
)

export const ALL: APIRoute = (context) => app.fetch(context.request, context)

export const prerender = false

export type API = typeof app
