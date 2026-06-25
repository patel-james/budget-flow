import type { CategoryTotal, Transaction, TransactionTotals } from '../types'

export function calculateTotals(transactions: Transaction[]): TransactionTotals {
  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  return {
    income,
    expenses,
    balance: income - expenses,
  }
}

export function calculateCategoryTotals(transactions: Transaction[]): CategoryTotal[] {
  const totals = new Map<string, number>()

  for (const t of transactions) {
    if (t.type !== 'expense') continue
    totals.set(t.category, (totals.get(t.category) ?? 0) + t.amount)
  }

  return Array.from(totals.entries())
    .map(([category, total]) => ({ category, total }))
    .sort((a, b) => b.total - a.total)
}
