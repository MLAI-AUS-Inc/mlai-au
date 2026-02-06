import { ImageWithFallback as Image } from "~/components/ImageWithFallback"
import { ARTICLE_FALLBACK_IMAGE } from "~/articles/registry"
import { Link } from 'react-router'

export interface ArticleCompanyHighlightCTAProps {
    title: string
    body: string
    label?: string
    primaryButton: {
        text: string
        href: string
    }
    secondaryButton?: {
        text: string
        href: string
    }
    image: {
        src: string
        alt: string
    }
    note?: string
    id?: string
    className?: string
}

export default function ArticleCompanyHighlightCTA({
    title,
    body,
    label,
    primaryButton,
    secondaryButton,
    image,
    note,
    id,
    className = '',
}: ArticleCompanyHighlightCTAProps) {
    return (
        <section
            id={id}
            className={`my-12 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm ${className}`}
        >
            <div className="grid items-center gap-8 md:grid-cols-2">
                <div className="p-8 md:p-10">
                    {label ? (
                        <p className="text-sm font-semibold uppercase tracking-wide text-indigo-700">{label}</p>
                    ) : null}
                    <h2 className="mt-2 text-2xl font-bold text-gray-900">{title}</h2>
                    <p className="mt-3 text-base text-gray-700">{body}</p>
                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
                        <Link
                            to={primaryButton.href}
                            className="inline-flex items-center justify-center rounded-full bg-[#1028E0] px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#0d1bbd]"
                        >
                            {primaryButton.text}
                        </Link>
                        {secondaryButton ? (
                            <Link
                                to={secondaryButton.href}
                                className="inline-flex items-center justify-center rounded-full border border-[#1028E0] px-6 py-3 text-sm font-semibold text-[#1028E0] transition hover:bg-[#1028E0]/10"
                            >
                                {secondaryButton.text}
                            </Link>
                        ) : null}
                    </div>
                    {note ? <p className="mt-4 text-sm text-gray-600">{note}</p> : null}
                </div>

                <div className="relative h-full w-full bg-gray-50">
                    <div className="relative mx-auto h-full w-full max-w-2xl p-6">
                        <Image
                            src={image.src}
                            fallbackSrc={ARTICLE_FALLBACK_IMAGE}
                            alt={image.alt}
                            width={1344}
                            height={840}
                            className="h-full w-full rounded-xl border border-gray-200 object-cover shadow-sm"
                            priority
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}
