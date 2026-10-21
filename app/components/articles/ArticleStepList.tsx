type Step = string | { label: string }

type ArticleStepListProps = {
    title?: string
    steps: Step[]
    accent?: 'teal' | 'brand' | 'indigo'
    className?: string
}

// The teal and brand chips used to read the --brand and --accent variables
// through square-bracket shorthand. Tailwind 4 compiles that shorthand to an
// invalid declaration and the site never defines --brand, so the numbers had
// no chip. They now use MLAI's mint (the app's teal-400) and QuoteBlock's purple.
const ACCENT_CLASSNAMES = {
    teal: {
        container: 'bg-transparent border-gray-400',
        bulletBg: 'bg-teal-400',
        bulletText: 'text-black',
    },
    brand: {
        container: 'bg-transparent border-gray-400',
        bulletBg: 'bg-[#4b1bd1]',
        bulletText: 'text-white',
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
    // Article content is cast past these prop types, so an unknown
    // accent can reach us at runtime and must not crash SSR.
    const styles = ACCENT_CLASSNAMES[accent] ?? ACCENT_CLASSNAMES.indigo

    return (
        <div className={`mt-8 mb-8 rounded-3xl p-6 border ${styles.container} ${className}`}>
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
