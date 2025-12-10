import { Link } from "react-router"

import { ImageWithFallback } from "~/components/ImageWithFallback"

export type PillarChildLink = {
    title: string
    href: string
}

export type PillarCardProps = {
    href: string
    title: string
    heading?: string
    description: string
    image?: string | null
    imageAlt?: string | null
    fallbackImage?: string
    childLinks?: PillarChildLink[]
    maxChildren?: number
    ctaLabel?: string
    ctaHref?: string
    priority?: boolean
}

const DEFAULT_FALLBACK_IMAGE =
    "https://firebasestorage.googleapis.com/v0/b/a-duet.appspot.com/o/OpenGraph%20Images%2FOpenGraph%20Fallback.jpg?alt=media&token=9c2374d3-d994-4094-850a-22592a50f624"

export function PillarCard({
    href,
    title,
    heading,
    description,
    image,
    imageAlt,
    fallbackImage,
    childLinks = [],
    maxChildren,
    ctaLabel = "View all",
    ctaHref,
    priority = false,
}: PillarCardProps) {
    const resolvedImage = image ?? fallbackImage ?? DEFAULT_FALLBACK_IMAGE
    const displayTitle = heading ?? title
    const resolvedAlt = imageAlt ?? displayTitle
    const resolvedChildLinks =
        typeof maxChildren === "number" ? childLinks.slice(0, maxChildren) : childLinks
    const resolvedCtaHref = ctaHref ?? href

    return (
        <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md">
            <Link to={href} className="relative block aspect-[16/9]">
                <ImageWithFallback
                    src={resolvedImage}
                    fallbackSrc={fallbackImage ?? DEFAULT_FALLBACK_IMAGE}
                    alt={resolvedAlt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="absolute inset-0 h-full w-full object-cover"
                    priority={priority}
                />
                <span className="sr-only">Read {displayTitle}</span>
            </Link>

            <div className="flex flex-1 flex-col px-6 py-6">
                <h3 className="text-base font-semibold text-gray-900 line-clamp-2">
                    <Link to={href} className="hover:text-[#1028E0]">
                        {displayTitle}
                    </Link>
                </h3>
                <p className="mt-2 text-sm leading-5 text-gray-600 line-clamp-2">{description}</p>

                {resolvedChildLinks.length ? (
                    <ul className="mt-4 divide-y divide-gray-200 overflow-hidden">
                        {resolvedChildLinks.map((child) => (
                            <li
                                key={child.href}
                                className="flex items-center justify-between gap-4 py-2"
                            >
                                <span className="text-xs font-normal text-gray-800 line-clamp-2">
                                    {child.title}
                                </span>
                                <Link
                                    to={child.href}
                                    className="flex h-6 min-w-[3rem] items-center justify-center rounded text-xs font-semibold text-[#1028E0] hover:text-[#0c1fa6]"
                                >
                                    View
                                </Link>
                            </li>
                        ))}
                    </ul>
                ) : null}

                <div className="mt-4 flex justify-end">
                    <Link
                        to={resolvedCtaHref}
                        className="inline-flex items-center gap-1 text-sm font-semibold text-[#1028E0] hover:text-[#0c1fa6]"
                    >
                        {ctaLabel}
                        <span aria-hidden="true">→</span>
                    </Link>
                </div>
            </div>
        </article>
    )
}

export default PillarCard
