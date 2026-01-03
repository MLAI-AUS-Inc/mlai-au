import ArticleCard, { type ArticleAuthor } from "./ArticleCard"
import { getArticleBySlug, resolveArticleRouteSlug } from "~/articles/registry"
import { getDefaultArticleAuthorDetails as getDefaultArticleAuthor } from "~/articles/authors"

type Props = {
  slug: string
  ctaText?: string
  className?: string
  descriptionOverride?: string
  variant?: "default" | "compact"
  authorOverride?: ArticleAuthor
}

const FALLBACK_IMAGE =
  'https://firebasestorage.googleapis.com/v0/b/a-duet.appspot.com/o/OpenGraph%20Images%2FOpenGraph%20Fallback.jpg?alt=media&token=9c2374d3-d994-4094-850a-22592a50f624'

const formatArticleDate = (isoDate?: string) => {
  if (!isoDate) return undefined
  const parsed = new Date(isoDate)
  if (Number.isNaN(parsed.getTime())) return undefined
  return new Intl.DateTimeFormat("en-AU", { day: "2-digit", month: "short", year: "numeric" }).format(parsed)
}

export default function ArticleCardBySlug({
  slug,
  ctaText,
  className = "",
  descriptionOverride,
  variant,
  authorOverride,
}: Props) {
  const article = getArticleBySlug(slug)
  if (!article) return null

  const routeSlug = resolveArticleRouteSlug(article.slug)
  const href = `/articles/${routeSlug}`
  const title = article.title
  const description = descriptionOverride ?? article.description
  const image = article.image ?? FALLBACK_IMAGE
  const imageAlt = article.imageAlt ?? article.title
  const datetime = article.date
  const dateLabel = formatArticleDate(article.date)
  const authorName = article.author
  const author: ArticleAuthor | undefined = authorOverride
    ?? (authorName ? { name: authorName } : getDefaultArticleAuthor())

  return (
    <ArticleCard
      href={href}
      title={title}
      description={description}
      image={image}
      imageAlt={imageAlt}
      date={dateLabel}
      datetime={datetime}
      author={author}
      ctaText={ctaText}
      className={className}
      variant={variant}
    />
  )
}
