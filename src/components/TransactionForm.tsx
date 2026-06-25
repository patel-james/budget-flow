import { useState, type FormEvent } from 'react'
import { EXPENSE_CATEGORIES, INCOME_CATEGORIES, type Category, type NewTransaction, type TransactionType } from '../types'

interface TransactionFormProps {
  onAdd: (transaction: NewTransaction) => void
}

function todayISO(): string {
  return new Date().toISOString().slice(0, 10)
}

export default function TransactionForm({ onAdd }: TransactionFormProps) {
  const [type, setType] = useState<TransactionType>('expense')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState<Category>(EXPENSE_CATEGORIES[0])
  const [date, setDate] = useState(todayISO())
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)

  const categories = type === 'income' ? INCOME_CATEGORIES : EXPENSE_CATEGORIES

  const handleTypeChange = (nextType: TransactionType) => {
    setType(nextType)
    setCategory(nextType === 'income' ? INCOME_CATEGORIES[0] : EXPENSE_CATEGORIES[0])
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsedAmount = Number(amount)
    if (!amount || Number.isNaN(parsedAmount) || parsedAmount <= 0) {
      setError('Enter an amount greater than zero.')
      return
    }
    if (!date) {
      setError('Pick a date.')
      return
    }
    if (!description.trim()) {
      setError('Add a short description.')
      return
    }

    onAdd({
      type,
      amount: Math.round(parsedAmount * 100) / 100,
      category,
      date,
      description: description.trim(),
    })

    setAmount('')
    setDescription('')
    setError(null)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-700 dark:bg-slate-800"
    >
      <h2 className="mb-4 text-lg font-semibold">Add Transaction</h2>

      <div className="mb-4 flex gap-2">
        {(['expense', 'income'] as const).map((option) => (
          <button
            key={option}
            type="button"
            onClick={() => handleTypeChange(option)}
            className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium capitalize transition-colors ${
              type === option
                ? option === 'income'
                  ? 'bg-emerald-600 text-white'
                  : 'bg-rose-600 text-white'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600'
            }`}
          >
            {option}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          Amount
          <input
            type="number"
            inputMode="decimal"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          Category
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as Category)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          Date
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>

        <label className="flex flex-col gap-1 text-sm font-medium text-slate-600 dark:text-slate-300">
          Description
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 outline-none transition-colors focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-100"
          />
        </label>
      </div>

      {error && <p className="mt-3 text-sm font-medium text-rose-600 dark:text-rose-400">{error}</p>}

      <button
        type="submit"
        className="mt-4 w-full rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-indigo-700 active:bg-indigo-800"
      >
        Add Transaction
      </button>
    </form>
  )
}
