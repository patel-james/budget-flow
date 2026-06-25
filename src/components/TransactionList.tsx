import type { Transaction } from '../types'
import { formatCurrency, formatDate } from '../utils/format'

interface TransactionListProps {
  transactions: Transaction[]
  onDelete: (id: string) => void
  hasAnyTransactions: boolean
}

export default function TransactionList({ transactions, onDelete, hasAnyTransactions }: TransactionListProps) {
  if (transactions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-slate-300 bg-white p-10 text-center dark:border-slate-600 dark:bg-slate-800">
        <p className="text-slate-500 dark:text-slate-400">
          {hasAnyTransactions
            ? 'No transactions match your filters.'
            : 'No transactions yet — add your first one above.'}
        </p>
      </div>
    )
  }

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <ul className="divide-y divide-slate-100 dark:divide-slate-700">
        {transactions.map((t) => (
          <li
            key={t.id}
            className="flex items-center justify-between gap-3 px-4 py-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-700/50"
          >
            <div className="flex min-w-0 flex-1 items-center gap-3">
              <span
                className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                  t.type === 'income'
                    ? 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400'
                    : 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-400'
                }`}
                aria-hidden="true"
              >
                {t.type === 'income' ? '+' : '-'}
              </span>
              <div className="min-w-0">
                <p className="truncate font-medium text-slate-900 dark:text-slate-100">{t.description}</p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  {t.category} · {formatDate(t.date)}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span
                className={`font-semibold ${
                  t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {t.type === 'income' ? '+' : '-'}
                {formatCurrency(t.amount)}
              </span>
              <button
                type="button"
                onClick={() => onDelete(t.id)}
                aria-label={`Delete transaction: ${t.description}`}
                className="rounded-full p-1.5 text-slate-400 transition-colors hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-900/40 dark:hover:text-rose-400"
              >
                ✕
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
