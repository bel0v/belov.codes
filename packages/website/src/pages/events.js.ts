import type { APIRoute } from 'astro'

export const GET: APIRoute = async () => {
  const response = await fetch('https://cloud.umami.is/script.js')
  const content = await response.text()

  return new Response(content, {
    headers: {
      'Content-Type': 'text/javascript',
    },
  })
}
