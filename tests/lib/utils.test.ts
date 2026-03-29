import { describe, it, expect } from 'vitest'
import { formatDate, calcReadTime, slugify } from '@/lib/utils'

describe('formatDate', () => {
  it('formats ISO date as "Month DD, YYYY"', () => {
    expect(formatDate('2026-03-29')).toBe('March 29, 2026')
  })
})

describe('calcReadTime', () => {
  it('returns 1 for content under 200 words', () => {
    expect(calcReadTime('word '.repeat(100))).toBe(1)
  })
  it('returns 5 for ~1000 words', () => {
    expect(calcReadTime('word '.repeat(1000))).toBe(5)
  })
})

describe('slugify', () => {
  it('lowercases and replaces spaces with hyphens', () => {
    expect(slugify('Hello World')).toBe('hello-world')
  })
  it('strips special characters', () => {
    expect(slugify('VaR, SVaR & CVaR')).toBe('var-svar-cvar')
  })
})
