# Finance Tracker

A small personal finance tracker I built to replace the spreadsheet I'd been using to log expenses. Nothing fancy — add your income and expenses, see where your money is going, and export it when you need it. Everything lives in your browser, no account, no server.

## Why

I kept meaning to "properly" track spending and kept giving up because every tool either wanted a bank login or had way more features than I needed. This is the opposite: it does five things and does them locally, with no setup beyond opening the page.

## Tech stack

- React + TypeScript, built with Vite
- Tailwind CSS for styling
- Recharts for the category breakdown chart
- localStorage for persistence (no backend, no database)
- Vitest + Testing Library for tests

## Features

- Add income or expense transactions with amount, category, date, and a description
- Delete transactions
- Dashboard with total balance, total income, and total expenses
- Pie chart breakdown of spending by category
- Filter the transaction list by date range and category
- Full transaction history list with empty states for zero transactions / no matches
- Export the currently filtered transactions to CSV
- Dark mode toggle that remembers your preference across reloads

A couple of things worth calling out: the **dark mode** isn't just a CSS class swap for show — it persists in localStorage so it survives a refresh, and it's wired through Tailwind's `dark:` variants throughout. The **CSV export** respects whatever filters you currently have applied, so you can pull just "March groceries" instead of your entire history.

## Running it locally

You'll need Node 18+.

```bash
npm install
npm run dev
```

That starts the Vite dev server, usually at `http://localhost:5173`. Open it in a browser and start adding transactions — everything is saved to localStorage as you go, so closing the tab won't lose your data.

To build for production:

```bash
npm run build
npm run preview
```

`npm run build` type-checks the project and outputs a static `dist/` folder, which you can deploy anywhere that serves static files (Vercel, Netlify, GitHub Pages, an S3 bucket, whatever). There's no environment config or backend to stand up.

## Running tests

```bash
npm run test
```

This runs the Vitest suite once and exits (use `npm run test:watch` if you want it to stay open while you work). The tests focus on the utility functions — currency/date formatting, totals and category aggregation, filtering logic, and CSV generation — since that's where the actual bugs tend to hide. The components are mostly thin wrappers around those functions.

## Project structure

```
src/
  components/   Dashboard, TransactionForm, TransactionList, Charts, FilterBar, Header
  hooks/        useTheme (dark mode state + persistence)
  utils/        formatting, calculations, filtering, CSV export, localStorage helpers
  types/        shared TypeScript types
```

## Screenshots

_TODO: add screenshots of the dashboard (light and dark mode) and the category chart here._

## Notes / limitations

- Data is stored per-browser in localStorage — clearing site data wipes your transactions, and it won't sync across devices. That's a deliberate tradeoff for a zero-backend tool, not an oversight.
- Amounts are treated as plain numbers in USD formatting; there's no multi-currency support.
