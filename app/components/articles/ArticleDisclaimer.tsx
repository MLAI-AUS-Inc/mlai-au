import clsx from 'clsx'
import React from 'react'
import { Lightbulb } from 'lucide-react'

type ArticleDisclaimerProps = {
  className?: string
}

export function ArticleDisclaimer({ className }: ArticleDisclaimerProps) {
  return (
    <section
      className={clsx(
        'not-prose my-12 rounded-full bg-black px-6 sm:px-8 py-4 text-white flex items-center gap-4 border border-black',
        className,
      )}
    >
      <Lightbulb className="w-6 h-6 text-white flex-shrink-0" />
      <p className="m-0 text-sm leading-relaxed font-normal text-white/90">
        <span className="font-medium text-white">Disclaimer:</span> This article provides general information and is not legal or technical advice. For official guidelines on the safe and responsible use of AI, please refer to the{' '}
        <a
          href="https://industry.gov.au/guidance-for-ai-adoption"
          target="_blank"
          rel="noopener noreferrer"
          className="text-white underline underline-offset-4 hover:opacity-80 transition-opacity"
        >
          Australian Government’s Guidance for AI Adoption
        </a>
        {' '}&rarr;
      </p>
    </section>
  )
}

export default ArticleDisclaimer
