import { useEffect, useState } from 'react'
import { loadTheme, saveTheme, type Theme } from '../utils/storage'

export function useTheme(): [Theme, () => void] {
  const [theme, setTheme] = useState<Theme>(loadTheme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    saveTheme(theme)
  }, [theme])

  const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))

  return [theme, toggleTheme]
}
