import { Link } from 'react-router'
import { ImageWithFallback } from '../ImageWithFallback'

export interface BreadcrumbItem {
    label: string
    href?: string
    current?: boolean
    icon?: React.ComponentType<{ className?: string }>
}

export interface ArticleHeroHeaderProps {
    /** Breadcrumb items to display at the top of the header */
    breadcrumbs?: BreadcrumbItem[]
    /** The main title - plain text */
    title: string
    /** Optional highlighted portion of title that will be styled in orange (e.g., "Use AI to Make It Easy (2026)") */
    titleHighlight?: string
    /** Background color for the hero banner */
    headerBgColor?: 'cyan' | 'purple' | 'blue' | 'orange'
    /** Quick look summary configuration */
    summary?: {
        heading: string
        intro: string
        items: Array<{
            label: string
            description: string
        }>
    }
    /** Hero image URL */
    heroImage?: string
    /** Hero image alt text */
    heroImageAlt?: string
}

export function ArticleHeroHeader({
    breadcrumbs,
    title,
    titleHighlight,
    headerBgColor = 'cyan',
    summary,
    heroImage,
    heroImageAlt = 'Article hero image',
}: ArticleHeroHeaderProps) {
    // Split the title if there's a highlight portion
    const titleParts = titleHighlight
        ? title.replace(titleHighlight, `|||${titleHighlight}|||`).split('|||').filter(Boolean)
        : [title]

    const bgColorMap = {
        cyan: 'bg-[#00ffd7]',
        purple: 'bg-[#5b21b6]',
        blue: 'bg-[#3537dc]',
        orange: 'bg-[#ff3d00]',
    }

    const textColorMap = {
        cyan: 'text-black',
        purple: 'text-white',
        blue: 'text-white',
        orange: 'text-white',
    }

    const breadcrumbLinkColor = {
        cyan: 'text-black/70 hover:text-black',
        purple: 'text-white/70 hover:text-white',
        blue: 'text-white/70 hover:text-white',
        orange: 'text-white/70 hover:text-white',
    }

    const highlightColor = headerBgColor === 'cyan' ? 'text-[#ff3d00]' : 'text-[#ff3d00]'

    return (
        <div className="not-prose mb-8">
            {/* Hero Banner */}
            <div className={`${bgColorMap[headerBgColor]} rounded-2xl px-6 py-8 sm:px-10 sm:py-12 lg:px-14 lg:py-16`}>
                {/* Breadcrumbs */}
                {breadcrumbs && breadcrumbs.length > 0 && (
                    <nav aria-label="Breadcrumb" className="mb-4">
                        <ol className="flex items-center gap-2 text-sm font-medium">
                            {breadcrumbs.map((item, index) => (
                                <li key={index} className="flex items-center gap-2">
                                    {index > 0 && (
                                        <span className={`${textColorMap[headerBgColor]} opacity-50`}>/</span>
                                    )}
                                    {item.href && !item.current ? (
                                        <Link
                                            to={item.href}
                                            className={`${breadcrumbLinkColor[headerBgColor]} transition-colors underline-offset-4 hover:underline flex items-center gap-1`}
                                        >
                                            {item.icon ? <item.icon className="h-4 w-4" /> : item.label}
                                        </Link>
                                    ) : (
                                        <span className={`${textColorMap[headerBgColor]} ${item.current ? 'font-semibold' : ''} flex items-center gap-1`}>
                                            {item.icon ? <item.icon className="h-4 w-4" /> : item.label}
                                        </span>
                                    )}
                                </li>
                            ))}
                        </ol>
                    </nav>
                )}

                {/* Title */}
                <h1
                    className={`text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight tracking-tight ${textColorMap[headerBgColor]}`}
                    style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
                >
                    {titleParts.map((part, index) => (
                        <span
                            key={index}
                            className={part === titleHighlight ? highlightColor : ''}
                        >
                            {part}
                        </span>
                    ))}
                </h1>
            </div>

            {/* Quick Look Summary + Hero Image Grid */}
            {(summary || heroImage) && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
                    {/* Orange Summary Card */}
                    {summary && (
                        <div className="bg-[#ff3d00] rounded-2xl p-6 sm:p-8 text-white">
                            <h2 className="text-xs sm:text-sm font-bold uppercase tracking-wider mb-3">
                                {summary.heading}
                            </h2>
                            <p className="text-sm sm:text-base leading-relaxed mb-4 opacity-90">
                                {summary.intro}
                            </p>
                            <ul className="space-y-3">
                                {summary.items.map((item, index) => (
                                    <li key={index} className="flex gap-3 text-sm sm:text-base">
                                        <span
                                            aria-hidden
                                            className="mt-1.5 h-2.5 w-2.5 flex-none rounded-full bg-black flex-shrink-0"
                                        />
                                        <div>
                                            <p className="font-semibold m-0">{item.label}</p>
                                            <p className="m-0 mt-0.5 opacity-85 text-sm leading-snug">
                                                {item.description}
                                            </p>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {/* Hero Image */}
                    {heroImage && (
                        <div className="rounded-2xl overflow-hidden">
                            <ImageWithFallback
                                src={heroImage}
                                alt={heroImageAlt}
                                width={800}
                                height={500}
                                className="w-full h-full object-cover min-h-[280px]"
                            />
                        </div>
                    )}
                </div>
            )}
        </div>
    )
}
