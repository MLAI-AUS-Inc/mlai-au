import clsx from "clsx"
import type { ReactNode } from "react"

const BADGE_TONES = {
  slate: "bg-slate-100 text-slate-700",
  emerald: "bg-emerald-100 text-emerald-700",
  sky: "bg-sky-100 text-sky-700",
  blue: "bg-blue-100 text-blue-700",
  indigo: "bg-indigo-100 text-indigo-700",
  amber: "bg-amber-100 text-amber-900",
  rose: "bg-rose-100 text-rose-700",
  purple: "bg-violet-100 text-violet-700",
} as const

const DEFAULT_TYPE_TONE = "slate"
const DEFAULT_STATUS_TONE = "emerald"

export type ResourceBadgeTone = keyof typeof BADGE_TONES

export type ResourceBadge =
  | string
  | {
    label: string
    tone?: ResourceBadgeTone
  }

export type ArticleResource = {
  label: string
  description?: string
  href?: string | null
  /** Defaults to "Open" if not provided */
  ctaLabel?: string
  /** Defaults to opening in a new tab */
  openInNewTab?: boolean
  /** Optionally prepend an icon next to the CTA */
  ctaIcon?: ReactNode
  /** Rendered as the neutral badge (e.g. PDF, DOCX) */
  type?: ResourceBadge
  /** Rendered as the emphasised badge (e.g. Free, Official) */
  status?: ResourceBadge
  /** Additional badges rendered after type/status */
  badges?: ResourceBadge[]
}

export interface ArticleResourceListProps {
  items: ArticleResource[]
  className?: string
  itemClassName?: string
  defaultCtaLabel?: string
}

function normaliseBadge(
  badge: ResourceBadge | undefined,
  fallbackTone: ResourceBadgeTone,
): { label: string; tone: ResourceBadgeTone } | null {
  if (!badge) {
    return null
  }

  if (typeof badge === "string") {
    return { label: badge, tone: fallbackTone }
  }

  return {
    label: badge.label,
    tone: badge.tone ?? fallbackTone,
  }
}

export function ArticleResourceList({
  items,
  className,
  itemClassName,
  defaultCtaLabel = "Open",
}: ArticleResourceListProps) {
  return (
    <ul
      className={clsx(
        "not-prose mt-3 divide-y divide-slate-200 overflow-hidden rounded-lg border border-slate-200 bg-white",
        className,
      )}
    >
      {items.map((item) => {
        const typeBadge = normaliseBadge(item.type, DEFAULT_TYPE_TONE)
        const statusBadge = normaliseBadge(item.status, DEFAULT_STATUS_TONE)
        const extraBadges = item.badges?.map((badge) =>
          normaliseBadge(badge, DEFAULT_TYPE_TONE),
        )
        const badges = [typeBadge, statusBadge, ...(extraBadges ?? [])].filter(
          (badge): badge is { label: string; tone: ResourceBadgeTone } =>
            Boolean(badge?.label),
        )

        return (
          <li
            key={item.href ?? item.label}
            className={clsx(
              "flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between",
              itemClassName,
            )}
          >
            <div>
              <p className="m-0 font-medium text-slate-900">{item.label}</p>
              {item.description ? (
                <p className="m-0 mt-1 text-sm text-slate-700">{item.description}</p>
              ) : null}
              {badges.length > 0 ? (
                <div className="mt-2 flex flex-wrap gap-2">
                  {badges.map((badge) => (
                    <span
                      key={`${badge.label}-${badge.tone}`}
                      className={clsx(
                        "inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium",
                        BADGE_TONES[badge.tone],
                      )}
                    >
                      {badge.label}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            {item.href ? (
              <a
                href={item.href}
                target={item.openInNewTab === false ? undefined : "_blank"}
                rel={item.openInNewTab === false ? undefined : "noopener"}
                className="inline-flex items-center justify-center self-start rounded-lg border border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-800 no-underline transition hover:bg-slate-50 sm:self-auto"
              >
                <span>{item.ctaLabel ?? defaultCtaLabel}</span>
                {item.ctaIcon ? <span className="ml-1.5 flex items-center">{item.ctaIcon}</span> : null}
              </a>
            ) : (
              <span className="inline-flex items-center justify-center self-start rounded-lg border border-dashed border-slate-300 px-3 py-1.5 text-sm font-medium text-slate-500 sm:self-auto">
                {item.ctaLabel ?? "Coming soon"}
              </span>
            )}
          </li>
        )
      })}
    </ul>
  )
}

export default ArticleResourceList
