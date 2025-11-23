import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'

import { getDanielsAge } from './daniels-age'

// Non-breaking space character used by Intl.ListFormat
const NBSP = '\u00A0'

describe('getDanielsAge()', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  test('returns formatted age for exactly 1 month old', () => {
    // Birth date: 2025-09-13, current date: 2025-10-13 (1 month)
    vi.setSystemTime(new Date('2025-10-13'))
    expect(getDanielsAge()).toBe(`1${NBSP}month`)
  })

  test('returns formatted age for 1 month and multiple weeks', () => {
    // Birth date: 2025-09-13, current date: 2025-10-27 (1 month, 2 weeks)
    vi.setSystemTime(new Date('2025-10-27'))
    expect(getDanielsAge()).toBe(`1${NBSP}month and 2${NBSP}weeks`)
  })

  test('returns formatted age for multiple months but less than 1 year', () => {
    // Birth date: 2025-09-13, current date: 2025-12-13 (3 months)
    vi.setSystemTime(new Date('2025-12-13'))
    expect(getDanielsAge()).toBe(`3${NBSP}months`)
  })

  test('returns formatted age for multiple months with weeks', () => {
    // Birth date: 2025-09-13, current date: 2026-01-10 (3 months, 4 weeks)
    vi.setSystemTime(new Date('2026-01-10'))
    expect(getDanielsAge()).toBe(`3${NBSP}months and 4${NBSP}weeks`)
  })

  test('returns formatted age for exactly 1 year old', () => {
    // Birth date: 2025-09-13, current date: 2026-09-13 (1 year)
    vi.setSystemTime(new Date('2026-09-13'))
    expect(getDanielsAge()).toBe(`1${NBSP}year`)
  })

  test('returns formatted age for 1 year and 1 month', () => {
    // Birth date: 2025-09-13, current date: 2026-10-13 (1 year, 1 month)
    vi.setSystemTime(new Date('2026-10-13'))
    expect(getDanielsAge()).toBe(`1${NBSP}year and 1${NBSP}month`)
  })

  test('returns formatted age for multiple years and months', () => {
    // Birth date: 2025-09-13, current date: 2028-12-13 (3 years, 3 months)
    vi.setSystemTime(new Date('2028-12-13'))
    expect(getDanielsAge()).toBe(`3${NBSP}years and 3${NBSP}months`)
  })

  test('returns formatted age with singular forms', () => {
    // Birth date: 2025-09-13, current date: 2026-09-20 (1 year, 0 months)
    vi.setSystemTime(new Date('2026-09-20'))
    expect(getDanielsAge()).toBe(`1${NBSP}year`)
  })

  test('returns formatted age with plural forms', () => {
    // Birth date: 2025-09-13, current date: 2029-03-13 (3 years, 6 months)
    vi.setSystemTime(new Date('2029-03-13'))
    expect(getDanielsAge()).toBe(`3${NBSP}years and 6${NBSP}months`)
  })

  test('does not include weeks when years >= 1', () => {
    // Birth date: 2025-09-13, current date: 2026-09-20 (1 year, ~1 week, but weeks shouldn't show)
    vi.setSystemTime(new Date('2026-09-20'))
    const result = getDanielsAge()
    expect(result).not.toContain('week')
    expect(result).toBe(`1${NBSP}year`)
  })

  test('does not include months when months is 0 and years >= 1', () => {
    // Birth date: 2025-09-13, current date: 2026-09-13 (1 year, 0 months)
    vi.setSystemTime(new Date('2026-09-13'))
    const result = getDanielsAge()
    expect(result).not.toContain('month')
    expect(result).toBe(`1${NBSP}year`)
  })

  test('handles edge case: just before 1 year', () => {
    // Birth date: 2025-09-13, current date: 2026-09-12 (11 months, 4 weeks)
    vi.setSystemTime(new Date('2026-09-12'))
    expect(getDanielsAge()).toBe(`11${NBSP}months and 4${NBSP}weeks`)
  })

  test('handles leap year correctly', () => {
    // Birth date: 2025-09-13, current date: 2028-02-29 (leap day) (2 years, 5 months, 2 weeks)
    vi.setSystemTime(new Date('2028-02-29'))
    expect(getDanielsAge()).toBe(`2${NBSP}years and 5${NBSP}months`)
  })
})
