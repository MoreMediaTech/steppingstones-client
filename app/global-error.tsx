'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <html lang="en" className="sm:scroll-smooth">
      <body className="flex min-h-screen flex-row-reverse bg-slate-100 dark:bg-slate-900">
        <h2>Something went wrong!</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  )
}
