import { describe, expect, it } from 'vitest'
import type { Transaction } from '../types'
import { transactionsToCSV } from './csv'

describe('transactionsToCSV', () => {
  it('produces a header row when there are no transactions', () => {
    expect(transactionsToCSV([])).toBe('Date,Type,Category,Description,Amount')
  })

  it('converts transactions into CSV rows', () => {
    const transactions: Transaction[] = [
      { id: '1', type: 'income', amount: 1000, category: 'Salary', date: '2026-01-01', description: 'Paycheck' },
    ]
    expect(transactionsToCSV(transactions)).toBe(
      'Date,Type,Category,Description,Amount\n2026-01-01,income,Salary,Paycheck,1000',
    )
  })

  it('escapes descriptions containing commas or quotes', () => {
    const transactions: Transaction[] = [
      {
        id: '1',
        type: 'expense',
        amount: 25,
        category: 'Food',
        date: '2026-01-02',
        description: 'Lunch, with a "friend"',
      },
    ]
    const csv = transactionsToCSV(transactions)
    expect(csv).toContain('"Lunch, with a ""friend"""')
  })
})
