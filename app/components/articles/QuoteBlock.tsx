import clsx from 'clsx'
import type { ReactNode } from 'react'

type QuoteBlockProps = {
  title?: string
  icon?: ReactNode
  variant?: 'purple' | 'orange'
  children: ReactNode
  className?: string
}

export function QuoteBlock({
  title,
  icon,
  variant = 'purple',
  children,
  className,
}: QuoteBlockProps) {
  const variants = {
    purple: {
      bg: 'bg-[#4b1bd1]',
      text: 'text-white',
      accent: 'text-white',
    },
    orange: {
      bg: 'bg-[#ff3d00]',
      text: 'text-white',
      accent: 'text-white',
    },
  } as const

  const palette = variants[variant]

  return (
    <div
      className={clsx(
        'not-prose rounded-[28px] px-6 sm:px-8 py-6 sm:py-7',
        palette.bg,
        palette.text,
        className,
      )}
    >
      {(title || icon) && (
        <div className="flex items-center gap-3 mb-3">
          {icon ? <span className="text-xl">{icon}</span> : null}
          {title ? (
            <span className={clsx('text-base font-semibold leading-none', palette.accent)}>
              {title}
            </span>
          ) : null}
        </div>
      )}
      <div className="text-base sm:text-lg leading-relaxed font-medium">{children}</div>
    </div>
  )
}

export default QuoteBlock
