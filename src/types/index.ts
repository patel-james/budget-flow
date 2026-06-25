export type TransactionType = 'income' | 'expense'

export const EXPENSE_CATEGORIES = [
  'Food',
  'Rent',
  'Utilities',
  'Transportation',
  'Entertainment',
  'Health',
  'Shopping',
  'Other',
] as const

export const INCOME_CATEGORIES = [
  'Salary',
  'Freelance',
  'Investment',
  'Gift',
  'Other',
] as const

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]
export type IncomeCategory = (typeof INCOME_CATEGORIES)[number]
export type Category = ExpenseCategory | IncomeCategory

export interface Transaction {
  id: string
  type: TransactionType
  amount: number
  category: Category
  date: string
  description: string
}

export type NewTransaction = Omit<Transaction, 'id'>

export interface TransactionFilters {
  startDate: string
  endDate: string
  category: Category | 'All'
}

export interface CategoryTotal {
  category: string
  total: number
}

export interface TransactionTotals {
  balance: number
  income: number
  expenses: number
}
