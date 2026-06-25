import type { TransactionTotals } from '../types'
import { formatCurrency } from '../utils/format'

interface DashboardProps {
  totals: TransactionTotals
}

export default function Dashboard({ totals }: DashboardProps) {
  const cards = [
    {
      label: 'Total Balance',
      value: totals.balance,
      accent: totals.balance >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400',
    },
    {
      label: 'Total Income',
      value: totals.income,
      accent: 'text-emerald-600 dark:text-emerald-400',
    },
    {
      label: 'Total Expenses',
      value: totals.expenses,
      accent: 'text-rose-600 dark:text-rose-400',
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {cards.map((card) => (
        <div
          key={card.label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
        >
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
          <p className={`mt-2 text-2xl font-bold ${card.accent}`}>{formatCurrency(card.value)}</p>
        </div>
      ))}
    </div>
  )
}
