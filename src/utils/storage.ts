import type { Transaction } from '../types'

const TRANSACTIONS_KEY = 'finance-tracker:transactions'
const THEME_KEY = 'finance-tracker:theme'

export function loadTransactions(): Transaction[] {
  try {
    const raw = localStorage.getItem(TRANSACTIONS_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    return parsed
  } catch {
    return []
  }
}

export function saveTransactions(transactions: Transaction[]): void {
  localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions))
}

export type Theme = 'light' | 'dark'

export function loadTheme(): Theme {
  const stored = localStorage.getItem(THEME_KEY)
  return stored === 'dark' ? 'dark' : 'light'
}

export function saveTheme(theme: Theme): void {
  localStorage.setItem(THEME_KEY, theme)
}
