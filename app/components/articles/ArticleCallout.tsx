import clsx from 'clsx'
import type { ReactNode } from 'react'

type ArticleCalloutVariant = 'info' | 'success' | 'warning' | 'brand'

type ArticleCalloutProps = {
    title?: string
    icon?: ReactNode
    variant?: ArticleCalloutVariant
    children: ReactNode
    className?: string
}

// A callout is drawn exactly like QuoteBlock, MLAI's main article callout: a
// solid brand block with white text and the 28px radius. Warnings use the
// orange block and every calmer variant uses the purple one, so no variant
// falls back to a generic notice style.
const VARIANT_BACKGROUNDS: Record<ArticleCalloutVariant, string> = {
    info: 'bg-[#4b1bd1]',
    success: 'bg-[#4b1bd1]',
    brand: 'bg-[#4b1bd1]',
    warning: 'bg-[#ff3d00]',
}

// Older articles pass body copy written for the previous pale callout, such as
// `text-gray-800` paragraphs, `text-sm` notes and brand-coloured links. These
// descendant rules outrank those single classes, so that copy takes the
// block's white text, body size and underlined links instead.
const BODY_CLASSES = clsx(
    'text-base leading-relaxed font-normal',
    '[&_:is(p,li,span,em,strong,b,i,small)]:text-inherit',
    '[&_p]:text-base',
    '[&_a]:font-semibold [&_a]:text-inherit [&_a]:underline [&_a]:underline-offset-4',
    '[&_a:hover]:opacity-80',
)

export function ArticleCallout({
    title,
    icon,
    variant = 'info',
    children,
    className,
}: ArticleCalloutProps) {
    // Article content is cast past these prop types, so an unknown
    // variant can reach us at runtime and must not crash SSR.
    const background = VARIANT_BACKGROUNDS[variant] ?? VARIANT_BACKGROUNDS.info

    return (
        <div
            role="note"
            className={clsx(
                'not-prose my-8 rounded-[28px] px-6 sm:px-8 py-6 sm:py-7 text-white',
                background,
                className,
            )}
        >
            {(title || icon) && (
                <div className="flex items-center gap-3 mb-3">
                    {icon ? <span className="text-xl" aria-hidden="true">{icon}</span> : null}
                    {title ? <span className="text-base font-semibold leading-none">{title}</span> : null}
                </div>
            )}
            <div className={BODY_CLASSES}>{children}</div>
        </div>
    )
}
