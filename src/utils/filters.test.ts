import { describe, expect, it } from 'vitest'
import type { Transaction } from '../types'
import { filterTransactions } from './filters'

const transactions: Transaction[] = [
  { id: '1', type: 'income', amount: 1000, category: 'Salary', date: '2026-01-01', description: 'Paycheck' },
  { id: '2', type: 'expense', amount: 200, category: 'Food', date: '2026-01-15', description: 'Groceries' },
  { id: '3', type: 'expense', amount: 50, category: 'Entertainment', date: '2026-02-01', description: 'Movies' },
]

describe('filterTransactions', () => {
  it('returns everything when filters are wide open', () => {
    const result = filterTransactions(transactions, { startDate: '', endDate: '', category: 'All' })
    expect(result).toHaveLength(3)
  })

  it('filters by start date', () => {
    const result = filterTransactions(transactions, { startDate: '2026-01-10', endDate: '', category: 'All' })
    expect(result.map((t) => t.id)).toEqual(['2', '3'])
  })

  it('filters by end date', () => {
    const result = filterTransactions(transactions, { startDate: '', endDate: '2026-01-31', category: 'All' })
    expect(result.map((t) => t.id)).toEqual(['1', '2'])
  })

  it('filters by category', () => {
    const result = filterTransactions(transactions, { startDate: '', endDate: '', category: 'Food' })
    expect(result.map((t) => t.id)).toEqual(['2'])
  })

  it('combines date range and category filters', () => {
    const result = filterTransactions(transactions, {
      startDate: '2026-01-01',
      endDate: '2026-01-31',
      category: 'Food',
    })
    expect(result.map((t) => t.id)).toEqual(['2'])
  })

  it('returns an empty array when nothing matches', () => {
    const result = filterTransactions(transactions, { startDate: '2030-01-01', endDate: '', category: 'All' })
    expect(result).toEqual([])
  })
})
