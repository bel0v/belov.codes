import { describe, expect, test } from 'vitest'

import { detectAgent } from './agent-detection'

const BROWSER_UA =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36'

describe('detectAgent()', () => {
  test('returns undefined for a regular browser', () => {
    expect(detectAgent(new Headers({ 'user-agent': BROWSER_UA }))).toBeUndefined()
  })

  test('identifies an agent by its headers', () => {
    const headers = new Headers({
      'user-agent': BROWSER_UA,
      'x-agent-name': 'claude-code',
      'x-agent-user-email': 'jane@example.com',
    })
    expect(detectAgent(headers)).toEqual({
      name: 'claude-code',
      email: 'jane@example.com',
      identified: true,
    })
  })

  test('keeps the agent name when the email is malformed', () => {
    const headers = new Headers({
      'x-agent-name': 'bot',
      'x-agent-user-email': 'not-an-email',
    })
    expect(detectAgent(headers)).toEqual({
      name: 'bot',
      email: undefined,
      identified: true,
    })
  })

  test('ignores a malformed email on its own', () => {
    const headers = new Headers({
      'user-agent': BROWSER_UA,
      'x-agent-user-email': 'nope',
    })
    expect(detectAgent(headers)).toBeUndefined()
  })

  test('caps overlong header values', () => {
    const headers = new Headers({ 'x-agent-name': 'a'.repeat(500) })
    expect(detectAgent(headers)?.name).toHaveLength(200)
  })

  test.each(['curl/8.7.1', 'python-requests/2.31.0', 'Go-http-client/2.0', 'wget/1.21'])(
    'flags HTTP client %s as an unidentified agent',
    (userAgent) => {
      expect(detectAgent(new Headers({ 'user-agent': userAgent }))).toEqual({
        name: undefined,
        email: undefined,
        identified: false,
      })
    }
  )

  test('flags known AI crawlers as unidentified agents', () => {
    const userAgent =
      'Mozilla/5.0 AppleWebKit/537.36 (compatible; GPTBot/1.1; +https://openai.com/gptbot)'
    expect(detectAgent(new Headers({ 'user-agent': userAgent }))?.identified).toBe(false)
  })

  test('flags a missing user agent as an unidentified agent', () => {
    expect(detectAgent(new Headers())?.identified).toBe(false)
  })
})
