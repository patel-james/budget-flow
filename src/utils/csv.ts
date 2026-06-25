import type { Transaction } from '../types'

export function transactionsToCSV(transactions: Transaction[]): string {
  const header = ['Date', 'Type', 'Category', 'Description', 'Amount']
  const rows = transactions.map((t) => [
    t.date,
    t.type,
    t.category,
    escapeCSVField(t.description),
    t.amount.toString(),
  ])

  return [header, ...rows].map((row) => row.join(',')).join('\n')
}

function escapeCSVField(field: string): string {
  if (field.includes(',') || field.includes('"') || field.includes('\n')) {
    return `"${field.replace(/"/g, '""')}"`
  }
  return field
}

export function downloadCSV(csv: string, filename: string): void {
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
