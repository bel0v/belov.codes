import { AGENT_EMAIL_HEADER, AGENT_NAME_HEADER } from 'constants/analytics'

export type Agent = {
  name: string | undefined
  email: string | undefined
  identified: boolean
}

const MAX_HEADER_LENGTH = 200
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const AI_CRAWLERS =
  /GPTBot|ChatGPT-User|OAI-SearchBot|ClaudeBot|Claude-User|Claude-SearchBot|anthropic-ai|PerplexityBot|Perplexity-User|Google-Extended|CCBot|Bytespider|Amazonbot|Applebot-Extended|Meta-ExternalAgent|cohere-ai|DuckAssistBot|MistralAI-User/i
const HTTP_CLIENTS =
  /^(curl|wget|python-requests|python-httpx|aiohttp|node-fetch|undici|axios|got|Go-http-client|okhttp|libwww-perl|Java|HTTPie|Deno|Bun)\b/i

function readHeader(headers: Headers, name: string) {
  const value = headers.get(name)?.trim().slice(0, MAX_HEADER_LENGTH)
  return value || undefined
}

export function detectAgent(headers: Headers): Agent | undefined {
  const name = readHeader(headers, AGENT_NAME_HEADER)
  const rawEmail = readHeader(headers, AGENT_EMAIL_HEADER)
  const email = rawEmail && EMAIL_PATTERN.test(rawEmail) ? rawEmail : undefined

  if (name || email) {
    return { name, email, identified: true }
  }

  const userAgent = headers.get('user-agent')?.trim() ?? ''
  if (!userAgent || AI_CRAWLERS.test(userAgent) || HTTP_CLIENTS.test(userAgent)) {
    return { name: undefined, email: undefined, identified: false }
  }

  return undefined
}
