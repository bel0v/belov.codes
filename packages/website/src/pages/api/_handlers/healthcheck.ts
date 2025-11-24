import type { APIContext } from 'astro'
import { actions } from 'astro:actions'

import { Hono } from 'hono'

export const healthcheck = new Hono<{ Bindings: APIContext }>().get('/', async (c) => {
  const { data, error } = await c.env.callAction(actions.healthCheck, undefined)

  if (error) {
    return c.json({ error }, 500)
  }
  return c.json(data)
})
