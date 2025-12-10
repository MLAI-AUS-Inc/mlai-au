import type { ReactNode } from "react"

export type ArticleFAQItem = {
  q?: string
  question?: string
  a?: ReactNode
  answer?: ReactNode
}

type ArticleFAQProps = {
  items: ArticleFAQItem[]
  anchorId?: string
  heading?: string
}

export function ArticleFAQ({
  items,
  anchorId = "faq",
  heading = "Frequently Asked Questions",
}: ArticleFAQProps) {
  if (!items || items.length === 0) {
    return null
  }

  return (
    <>
      <h2 id={anchorId} className="mt-10">
        {heading}
      </h2>
      <div className="mt-4 space-y-6">
        {items.map((item, index) => {
          const question = item.question ?? item.q ?? `Question ${index + 1}`
          const answer = item.answer ?? item.a ?? ""
          const key = question || `faq-${index}`

          return (
            <div key={key}>
              <h3 className="text-base font-semibold text-gray-900">{question}</h3>
              <p className="mt-2 text-sm text-gray-700">{answer}</p>
            </div>
          )
        })}
      </div>
    </>
  )
}
