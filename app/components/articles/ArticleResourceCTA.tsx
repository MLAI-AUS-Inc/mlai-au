import type { ReactNode } from 'react'

type ResourceCTAPreviewCard = {
    title: string
    subtitle?: string
    icon?: ReactNode
    color?: string
    textColor?: string
    rotationClass?: string
}

type ArticleResourceCTAProps = {
    eyebrow?: string
    title: ReactNode
    description: string
    buttonLabel: string
    buttonHref: string
    accent?: 'purple' | 'cyan' | 'orange'
    previewCards?: ResourceCTAPreviewCard[]
}

const ACCENT_STYLES = {
    purple: {
        background: 'bg-[#2b0f70]',
        overlay: 'bg-[radial-gradient(circle_at_20%_15%,rgba(0,255,215,0.16),transparent_32%),radial-gradient(circle_at_80%_5%,rgba(255,61,0,0.14),transparent_30%)]',
        button: 'bg-white text-black focus-visible:ring-offset-[#2b0f70]',
    },
    cyan: {
        background: 'bg-[#0d9488]',
        overlay: 'bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.2),transparent_32%),radial-gradient(circle_at_80%_5%,rgba(0,0,0,0.12),transparent_30%)]',
        button: 'bg-white text-black focus-visible:ring-offset-[#0d9488]',
    },
    orange: {
        background: 'bg-[#ff3d00]',
        overlay: 'bg-[radial-gradient(circle_at_20%_15%,rgba(255,255,255,0.2),transparent_32%),radial-gradient(circle_at_80%_5%,rgba(0,0,0,0.12),transparent_30%)]',
        button: 'bg-white text-black focus-visible:ring-offset-[#ff3d00]',
    },
} as const

const DEFAULT_PREVIEW_CARDS: ResourceCTAPreviewCard[] = [
    {
        title: 'Experiment Card',
        subtitle: 'Preview',
        icon: <span className="text-xl">🗒️</span>,
        color: 'bg-[#ff3d00]',
        textColor: 'text-white',
        rotationClass: 'rotate-[-6deg]',
    },
    {
        title: 'Decision Log',
        subtitle: 'Preview',
        icon: <span className="text-xl">🧠</span>,
        color: 'bg-[#00ffd7]',
        textColor: 'text-black',
        rotationClass: 'rotate-[7deg]',
    },
]

export function ArticleResourceCTA({
    eyebrow = 'Free download',
    title,
    description,
    buttonLabel,
    buttonHref,
    accent = 'purple',
    previewCards = DEFAULT_PREVIEW_CARDS,
}: ArticleResourceCTAProps) {
    const styles = ACCENT_STYLES[accent]

    return (
        <div className="my-12 relative overflow-hidden rounded-[36px] p-8 sm:p-12 shadow-[0_25px_80px_-30px_rgba(0,0,0,0.55)] not-prose">
            <div className={`absolute inset-0 ${styles.background}`} />
            <div className={`absolute inset-0 ${styles.overlay}`} />

            <div className="relative z-10 grid items-center gap-10 lg:grid-cols-[1.4fr_1fr]">
                <div className="space-y-5 text-white">
                    <p className="text-sm font-extrabold uppercase tracking-[0.2em] text-white">{eyebrow}</p>
                    <h3 className="text-3xl sm:text-4xl font-black leading-tight">
                        {title}
                    </h3>
                    <p className="text-white/90 leading-relaxed text-lg max-w-xl">
                        {description}
                    </p>
                    <div className="pt-2">
                        <a
                            href={buttonHref}
                            className={`inline-flex items-center justify-center rounded-full px-7 sm:px-8 py-3.5 text-lg font-black shadow-[0_16px_40px_-18px_rgba(0,0,0,0.7)] transition-transform hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black/60 focus-visible:ring-offset-2 ${styles.button}`}
                        >
                            {buttonLabel}
                        </a>
                    </div>
                </div>

                {previewCards && previewCards.length > 0 && (
                    <div className="relative flex items-end justify-center gap-6 lg:justify-end">
                        {previewCards.map((card, idx) => (
                            <div
                                key={card.title + idx}
                                className={`relative w-36 sm:w-44 md:w-48 aspect-[2/3] rounded-2xl ${card.color ?? 'bg-white'} ${card.textColor ?? 'text-black'} shadow-[0_28px_70px_-20px_rgba(0,0,0,0.78)] ${card.rotationClass ?? ''} transition-transform duration-300 hover:-translate-y-1`}
                            >
                                <div className="absolute inset-0 rounded-2xl border border-white/20" />
                                <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-4">
                                    {card.icon && (
                                        <div className={`h-10 w-10 rounded-full border-2 border-current flex items-center justify-center`}>
                                            {card.icon}
                                        </div>
                                    )}
                                    <p className="text-lg font-bold leading-tight">{card.title}</p>
                                    {card.subtitle && <p className="text-sm font-semibold opacity-80">{card.subtitle}</p>}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}
