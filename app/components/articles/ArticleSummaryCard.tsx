export type ArticleSummaryHighlight = {
  label: string
  description?: string
}

export type ArticleSummaryConfig = {
  heading?: string
  intro?: string
  items: ArticleSummaryHighlight[]
}

export function ArticleSummaryCard({ summary }: { summary: ArticleSummaryConfig }) {
  const heading = summary.heading ?? 'Key points'
  const items = Array.isArray(summary.items) ? summary.items : []

  if (items.length === 0) {
    return null
  }

  return (
    <section className="not-prose rounded-2xl border border-indigo-100 bg-indigo-50/80 p-6 shadow-sm">
      <h2 className="text-base font-semibold uppercase tracking-wide text-indigo-900">{heading}</h2>
      {summary.intro ? (
        <p className="mt-2 text-sm text-indigo-900/80">{summary.intro}</p>
      ) : null}
      <ul className="mt-4 space-y-3">
        {items.map((item, index) => (
          <li key={`${item.label}-${index}`} className="flex gap-3 text-sm text-indigo-900">
            <span aria-hidden className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-indigo-500" />
            <div>
              <p className="m-0 font-semibold text-indigo-950">{item.label}</p>
              {item.description ? (
                <p className="m-0 mt-1 text-indigo-900/75">{item.description}</p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}
