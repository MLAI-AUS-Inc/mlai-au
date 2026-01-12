import type { ReactNode } from 'react'

type ArticleCalloutVariant = 'info' | 'success' | 'warning' | 'brand'

type ArticleCalloutProps = {
    title?: string
    icon?: ReactNode
    variant?: ArticleCalloutVariant
    children: ReactNode
    className?: string
}

const VARIANT_STYLES: Record<ArticleCalloutVariant, { border: string; background: string; title: string; text: string }> = {
    info: {
        border: 'border-teal-500',
        background: 'bg-teal-50/60',
        title: 'text-gray-900',
        text: 'text-gray-800',
    },
    success: {
        border: 'border-emerald-500',
        background: 'bg-emerald-50/70',
        title: 'text-gray-900',
        text: 'text-gray-800',
    },
    warning: {
        border: 'border-amber-500',
        background: 'bg-amber-50/70',
        title: 'text-gray-900',
        text: 'text-gray-800',
    },
    brand: {
        border: 'border-[--brand]',
        background: 'bg-[--soft]',
        title: 'text-gray-900',
        text: 'text-gray-800',
    },
}

export function ArticleCallout({
    title,
    icon,
    variant = 'info',
    children,
    className = '',
}: ArticleCalloutProps) {
    const styles = VARIANT_STYLES[variant]

    return (
        <div className={`my-8 border-l-4 ${styles.border} ${styles.background} pl-6 py-4 pr-4 rounded-r-lg ${className}`}>
            {title && (
                <h4 className={`font-semibold ${styles.title} flex items-center gap-2`}>
                    {icon ?? <span className="text-xl">💡</span>}
                    {title}
                </h4>
            )}
            <div className={`mt-1 ${styles.text}`}>
                {children}
            </div>
        </div>
    )
}
