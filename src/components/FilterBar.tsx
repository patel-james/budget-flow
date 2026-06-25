import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, type Category, type TransactionFilters } from '../types'

interface FilterBarProps {
  filters: TransactionFilters
  onChange: (filters: TransactionFilters) => void
  onExport: () => void
  exportDisabled: boolean
}

const ALL_CATEGORIES: Array<Category | 'All'> = [
  'All',
  ...Array.from(new Set<Category>([...EXPENSE_CATEGORIES, ...INCOME_CATEGORIES])),
]

export default function FilterBar({ filters, onChange, onExport, exportDisabled }: FilterBarProps) {
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-end sm:justify-between dark:border-slate-700 dark:bg-slate-800">
      <div className="flex flex-1 flex-col gap-3 sm:flex-row">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          From
          <input
            type="date"
            value={filters.startDate}
            onChange={(e) => onChange({ ...filters, startDate: e.target.value })}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          To
          <input
            type="date"
            value={filters.endDate}
            onChange={(e) => onChange({ ...filters, endDate: e.target.value })}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          Category
          <select
            value={filters.category}
            onChange={(e) => onChange({ ...filters, category: e.target.value as Category | 'All' })}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          >
            {ALL_CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>
      </div>

      <button
        type="button"
        onClick={onExport}
        disabled={exportDisabled}
        className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium transition-colors hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-600 dark:hover:bg-slate-700"
      >
        Export CSV
      </button>
    </div>
  )
}
