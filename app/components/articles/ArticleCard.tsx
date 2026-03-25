import { Link } from "react-router"
import { ImageWithFallback } from "../ImageWithFallback"
import { ARTICLE_FALLBACK_IMAGE } from "~/articles/registry"

export type ArticleAuthor = {
  name: string
  imageUrl?: string
  imageAlt?: string
}

export type ArticleCardProps = {
  href: string
  title: string
  description?: string
  image: string
  imageAlt?: string
  date?: string
  datetime?: string
  author?: ArticleAuthor
  ctaText?: string
  className?: string
  variant?: "default" | "compact"
}

const FALLBACK_IMAGE = ARTICLE_FALLBACK_IMAGE

export default function ArticleCard({
  href,
  title,
  description,
  image,
  imageAlt,
  date,
  datetime,
  author,
  ctaText,
  className = "",
  variant = "default",
}: ArticleCardProps) {
  const showDate = Boolean(date)
  const showAuthor = Boolean(author?.name)
  const ariaLabelParts = [title]
  if (description) ariaLabelParts.push(description)
  if (ctaText) ariaLabelParts.push(ctaText)
  const ariaLabel = ariaLabelParts.join(" – ")

  const isCompact = variant === "compact"
  const paddingClasses = isCompact
    ? "px-6 pb-6 pt-60 sm:pt-40 lg:pt-56"
    : "px-8 pb-8 pt-72 sm:pt-48 lg:pt-72"
  const titleClasses = isCompact ? "mt-2 text-base/6 font-semibold text-white line-clamp-2" : "mt-3 text-lg/6 font-semibold text-white"
  const descriptionClasses = isCompact
    ? "mt-3 text-sm leading-5 text-gray-200/80 line-clamp-3"
    : "mt-4 text-base leading-7 text-gray-200/90 line-clamp-3"

  return (
    <article
      className={`not-prose relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 ${paddingClasses} ${className}`.trim()}
    >
      <ImageWithFallback
        src={image ?? FALLBACK_IMAGE}
        fallbackSrc={FALLBACK_IMAGE}
        alt={imageAlt ?? title}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        className="absolute inset-0 -z-10 h-full w-full object-cover"
        priority={false}
      />
      <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
      <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />

      {(showDate || showAuthor) && (
        <div className="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm/6 text-gray-300">
          {showDate && (
            <time dateTime={datetime ?? date} className={`mr-8 ${showAuthor ? "" : "mr-0"}`}>
              {date}
            </time>
          )}
          {showAuthor && (
            <div className={`${showDate ? "-ml-4" : ""} flex items-center gap-x-4`}>
              {showDate && (
                <svg viewBox="0 0 2 2" className="-ml-0.5 size-0.5 flex-none fill-white/50" aria-hidden="true">
                  <circle r={1} cx={1} cy={1} />
                </svg>
              )}
              <div className="flex items-center gap-x-2.5">
                {author?.imageUrl ? (
                  <ImageWithFallback
                    src={author.imageUrl}
                    alt={author.imageAlt ?? author.name}
                    width={24}
                    height={24}
                    className="size-6 flex-none rounded-full bg-white/10 object-cover"
                    priority={false}
                  />
                ) : null}
                <span>{author?.name}</span>
              </div>
            </div>
          )}
        </div>
      )}

      <h3 className={titleClasses}>
        <Link to={href} aria-label={ariaLabel} className="relative block">
          <span className="absolute inset-0" aria-hidden="true" />
          {title}
        </Link>
      </h3>

      {description ? <p className={descriptionClasses}>{description}</p> : null}
    </article>
  )
}
