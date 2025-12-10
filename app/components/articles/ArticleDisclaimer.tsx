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
        <strong>Important:</strong>{' '}
        This page provides general information. It does not replace advice from your clinician or school.
        We avoid testimonials, superiority claims and guarantees in line with{' '}
        <a
          href="https://www.ahpra.gov.au/Publications/Advertising-resources/Resources-to-help-advertisers.aspx"
          target="_blank"
          rel="noopener noreferrer"
          className="text-indigo-700 underline hover:text-indigo-900"
        >
          AHPRA advertising guidelines
        </a>
        . If you need urgent wellbeing support, contact your GP or local services.
      </p>
    </section>
  )
}

export default ArticleDisclaimer
