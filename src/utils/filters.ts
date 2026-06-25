import type { Transaction, TransactionFilters } from '../types'

export function filterTransactions(
  transactions: Transaction[],
  filters: TransactionFilters,
): Transaction[] {
  return transactions.filter((t) => {
    if (filters.startDate && t.date < filters.startDate) return false
    if (filters.endDate && t.date > filters.endDate) return false
    if (filters.category !== 'All' && t.category !== filters.category) return false
    return true
  })
}
