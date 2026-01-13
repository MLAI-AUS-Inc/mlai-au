type Step = string | { label: string }

type ArticleStepListProps = {
    title?: string
    steps: Step[]
    accent?: 'teal' | 'brand' | 'indigo'
    className?: string
}

const ACCENT_CLASSNAMES = {
    teal: {
        container: 'bg-transparent border-gray-400',
        bulletBg: 'bg-[--brand]',
        bulletText: 'text-[--accent]',
    },
    brand: {
        container: 'bg-transparent border-gray-400',
        bulletBg: 'bg-[--brand]',
        bulletText: 'text-[--accent]',
    },
    indigo: {
        container: 'bg-transparent border-gray-400',
        bulletBg: 'bg-indigo-100',
        bulletText: 'text-indigo-600',
    },
}

export function ArticleStepList({
    title,
    steps,
    accent = 'teal',
    className = '',
}: ArticleStepListProps) {
    const styles = ACCENT_CLASSNAMES[accent]

    return (
        <div className={`mt-8 rounded-xl p-6 border ${styles.container} ${className}`}>
            {title && <h3 className="text-lg font-bold text-gray-900 mb-4">{title}</h3>}
            <ul className="space-y-3">
                {steps.map((step, idx) => {
                    const label = typeof step === 'string' ? step : step.label
                    return (
                        <li key={idx} className="flex gap-3 text-gray-700">
                            <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold ${styles.bulletBg} ${styles.bulletText}`}>
                                {idx + 1}
                            </span>
                            <span>{label}</span>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}
