import clsx from 'clsx'
import React from 'react'

type ArticleDisclaimerProps = {
  className?: string
}

export function ArticleDisclaimer({ className }: ArticleDisclaimerProps) {
  return (
    <section
      className={clsx(
        'not-prose my-8 rounded-lg border border-slate-200 bg-slate-50 p-4',
        className,
      )}
    >
      <p className="m-0 text-sm text-slate-700">
        <strong>Disclaimer:</strong> This article provides general information and is not legal or technical advice. For official guidelines on the safe and responsible use of AI, please refer to the{' '}
        <a
          href="https://industry.gov.au/guidance-for-ai-adoption"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-700 underline hover:text-indigo-900"
        >
          Australian Government’s Guidance for AI Adoption
        </a>
        .
      </p>
    </section>
  )
}

export default ArticleDisclaimer
