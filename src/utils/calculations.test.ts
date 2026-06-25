import { describe, expect, it } from 'vitest'
import type { Transaction } from '../types'
import { calculateCategoryTotals, calculateTotals } from './calculations'

const transactions: Transaction[] = [
  { id: '1', type: 'income', amount: 1000, category: 'Salary', date: '2026-01-01', description: 'Paycheck' },
  { id: '2', type: 'expense', amount: 200, category: 'Food', date: '2026-01-02', description: 'Groceries' },
  { id: '3', type: 'expense', amount: 100, category: 'Food', date: '2026-01-03', description: 'Takeout' },
  { id: '4', type: 'expense', amount: 50, category: 'Entertainment', date: '2026-01-04', description: 'Movies' },
]

describe('calculateTotals', () => {
  it('sums income, expenses, and balance', () => {
    expect(calculateTotals(transactions)).toEqual({
      income: 1000,
      expenses: 350,
      balance: 650,
    })
  })

  it('returns zeros for an empty list', () => {
    expect(calculateTotals([])).toEqual({ income: 0, expenses: 0, balance: 0 })
  })

  it('handles an all-income list', () => {
    const onlyIncome = transactions.filter((t) => t.type === 'income')
    expect(calculateTotals(onlyIncome)).toEqual({ income: 1000, expenses: 0, balance: 1000 })
  })
})

describe('calculateCategoryTotals', () => {
  it('groups expense totals by category, sorted descending', () => {
    expect(calculateCategoryTotals(transactions)).toEqual([
      { category: 'Food', total: 300 },
      { category: 'Entertainment', total: 50 },
    ])
  })

  it('excludes income transactions', () => {
    const result = calculateCategoryTotals(transactions)
    expect(result.find((c) => c.category === 'Salary')).toBeUndefined()
  })

  it('returns an empty array when there are no expenses', () => {
    const onlyIncome = transactions.filter((t) => t.type === 'income')
    expect(calculateCategoryTotals(onlyIncome)).toEqual([])
  })
})
