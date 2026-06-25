import { Cell, Legend, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'
import type { CategoryTotal } from '../types'
import { formatCurrency } from '../utils/format'

interface ChartsProps {
  categoryTotals: CategoryTotal[]
}

const COLORS = ['#6366f1', '#22c55e', '#f59e0b', '#ef4444', '#06b6d4', '#a855f7', '#ec4899', '#84cc16']

export default function Charts({ categoryTotals }: ChartsProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800">
      <h2 className="mb-4 text-lg font-semibold">Spending by Category</h2>

      {categoryTotals.length === 0 ? (
        <div className="flex h-64 items-center justify-center text-center text-slate-500 dark:text-slate-400">
          No expenses to chart yet.
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={categoryTotals}
              dataKey="total"
              nameKey="category"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
            >
              {categoryTotals.map((entry, index) => (
                <Cell key={entry.category} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value: number) => formatCurrency(value)} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  )
}
