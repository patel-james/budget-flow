import { useEffect, useMemo, useState } from 'react'
import Charts from './components/Charts'
import Dashboard from './components/Dashboard'
import FilterBar from './components/FilterBar'
import Header from './components/Header'
import TransactionForm from './components/TransactionForm'
import TransactionList from './components/TransactionList'
import { useTheme } from './hooks/useTheme'
import type { NewTransaction, Transaction, TransactionFilters } from './types'
import { calculateCategoryTotals, calculateTotals } from './utils/calculations'
import { downloadCSV, transactionsToCSV } from './utils/csv'
import { filterTransactions } from './utils/filters'
import { loadTransactions, saveTransactions } from './utils/storage'

const EMPTY_FILTERS: TransactionFilters = { startDate: '', endDate: '', category: 'All' }

export default function App() {
  const [theme, toggleTheme] = useTheme()
  const [transactions, setTransactions] = useState<Transaction[]>(loadTransactions)
  const [filters, setFilters] = useState<TransactionFilters>(EMPTY_FILTERS)

  useEffect(() => {
    saveTransactions(transactions)
  }, [transactions])

  const filteredTransactions = useMemo(
    () => filterTransactions(transactions, filters).sort((a, b) => b.date.localeCompare(a.date)),
    [transactions, filters],
  )

  const totals = useMemo(() => calculateTotals(transactions), [transactions])
  const categoryTotals = useMemo(() => calculateCategoryTotals(filteredTransactions), [filteredTransactions])

  const handleAdd = (transaction: NewTransaction) => {
    setTransactions((current) => [...current, { ...transaction, id: crypto.randomUUID() }])
  }

  const handleDelete = (id: string) => {
    setTransactions((current) => current.filter((t) => t.id !== id))
  }

  const handleExport = () => {
    const csv = transactionsToCSV(filteredTransactions)
    downloadCSV(csv, `transactions-${new Date().toISOString().slice(0, 10)}.csv`)
  }

  return (
    <div className="min-h-screen">
      <Header theme={theme} onToggleTheme={toggleTheme} />

      <main className="mx-auto flex max-w-5xl flex-col gap-6 px-4 py-6">
        <Dashboard totals={totals} />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <TransactionForm onAdd={handleAdd} />
          <Charts categoryTotals={categoryTotals} />
        </div>

        <FilterBar
          filters={filters}
          onChange={setFilters}
          onExport={handleExport}
          exportDisabled={filteredTransactions.length === 0}
        />

        <TransactionList
          transactions={filteredTransactions}
          onDelete={handleDelete}
          hasAnyTransactions={transactions.length > 0}
        />
      </main>
    </div>
  )
}
