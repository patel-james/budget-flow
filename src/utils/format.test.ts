import { describe, expect, it } from 'vitest'
import { formatCurrency, formatDate } from './format'

describe('formatCurrency', () => {
  it('formats positive amounts as USD', () => {
    expect(formatCurrency(1234.5)).toBe('$1,234.50')
  })

  it('formats zero', () => {
    expect(formatCurrency(0)).toBe('$0.00')
  })

  it('formats negative amounts', () => {
    expect(formatCurrency(-50)).toBe('-$50.00')
  })

  it('rounds to two decimal places', () => {
    expect(formatCurrency(10.005)).toBe('$10.01')
  })
})

describe('formatDate', () => {
  it('formats an ISO date string', () => {
    expect(formatDate('2026-01-15')).toBe('Jan 15, 2026')
  })

  it('returns the original string when the date is invalid', () => {
    expect(formatDate('not-a-date')).toBe('not-a-date')
  })
})
