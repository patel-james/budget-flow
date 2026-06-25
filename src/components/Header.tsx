import type { Theme } from '../utils/storage'

interface HeaderProps {
  theme: Theme
  onToggleTheme: () => void
}

export default function Header({ theme, onToggleTheme }: HeaderProps) {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-slate-700">
      <div className="flex items-center gap-2">
        <span className="text-2xl">💰</span>
        <h1 className="text-xl font-bold tracking-tight">Finance Tracker</h1>
      </div>
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label="Toggle dark mode"
        className="flex items-center gap-2 rounded-full border border-slate-300 px-3 py-1.5 text-sm font-medium transition-colors hover:bg-slate-100 dark:border-slate-600 dark:hover:bg-slate-800"
      >
        <span aria-hidden="true">{theme === 'dark' ? '🌙' : '☀️'}</span>
        {theme === 'dark' ? 'Dark' : 'Light'}
      </button>
    </header>
  )
}
