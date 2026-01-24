import clsx from 'clsx'
import type { ReactNode } from 'react'

type AudienceCard = {
  title: string
  description: string
  icon?: ReactNode
  variant?: 'orange' | 'purple' | 'yellow'
}

type AudienceGridProps = {
  heading?: string
  cards: AudienceCard[]
  className?: string
}

const variantStyles = {
  orange: {
    bg: 'bg-[#ff3d00]',
    text: 'text-white',
    iconBg: 'bg-white/15',
    desc: 'text-white/90',
  },
  purple: {
    bg: 'bg-[#4b1bd1]',
    text: 'text-white',
    iconBg: 'bg-white/15',
    desc: 'text-white/90',
  },
  yellow: {
    bg: 'bg-[#ffe900]',
    text: 'text-black',
    iconBg: 'bg-black/10',
    desc: 'text-black/80',
  },
}

export function AudienceGrid({ heading, cards, className }: AudienceGridProps) {
  if (!cards || cards.length === 0) return null

  return (
    <div className={clsx('not-prose', className)}>
      {heading ? (
        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
          {heading}
        </h2>
      ) : null}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-3">
        {cards.map((card, idx) => {
          const styles = variantStyles[card.variant ?? 'orange']
          return (
            <div
              key={`${card.title}-${idx}`}
              className={clsx(
                'rounded-[22px] p-6 sm:p-7 transition-transform duration-200 hover:-translate-y-1',
                styles.bg,
                styles.text,
              )}
            >
              {card.icon ? (
                <div className={clsx('mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg', styles.iconBg)}>
                  {card.icon}
                </div>
              ) : null}
              <h3 className="text-xl font-bold mb-2">{card.title}</h3>
              <p className={clsx('text-sm leading-relaxed', styles.desc)}>
                {card.description}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default AudienceGrid
