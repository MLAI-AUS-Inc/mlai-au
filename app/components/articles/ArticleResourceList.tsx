import clsx from "clsx"
import type { ReactNode } from "react"
import { Badge, type BadgeVariant } from "./Badge"

// Map legacy tone names to new Badge variants (4 colors only: red, purple, black, yellow)
const TONE_TO_VARIANT: Record<string, BadgeVariant> = {
  slate: "black",      // gray → black
  emerald: "purple",   // emerald → purple
  sky: "purple",       // sky → purple
  blue: "purple",      // blue → purple
  indigo: "purple",    // indigo → purple
  amber: "yellow",     // amber → yellow
  rose: "red",         // rose → red
  purple: "purple",    // purple → purple
}

const DEFAULT_TYPE_TONE = "yellow"  // Guide badge → yellow
const DEFAULT_STATUS_TONE = "purple"  // Official badge → purple

export type ResourceBadgeTone = BadgeVariant

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
        "not-prose mt-3 divide-y divide-gray-200 overflow-hidden rounded-2xl border border-gray-300 bg-transparent",
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
                    <Badge
                      key={`${badge.label}-${badge.tone}`}
                      variant={TONE_TO_VARIANT[badge.tone] || badge.tone}
                    >
                      {badge.label}
                    </Badge>
                  ))}
                </div>
              ) : null}
            </div>
            {item.href ? (
              <a
                href={item.href}
                target={item.openInNewTab === false ? undefined : "_blank"}
                rel={item.openInNewTab === false ? undefined : "noopener"}
                className="inline-flex items-center justify-center gap-1.5 self-start rounded-full bg-indigo-600 px-6 py-2 text-sm font-semibold text-white no-underline transition hover:bg-indigo-700 sm:self-auto"
              >
                <span>{item.ctaLabel ?? defaultCtaLabel}</span>
                {item.ctaIcon ? <span className="flex items-center">{item.ctaIcon}</span> : <span>→</span>}
              </a>
            ) : (
              <span className="inline-flex items-center justify-center self-start rounded-full border border-dashed border-slate-300 px-6 py-2 text-sm font-medium text-slate-500 sm:self-auto">
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
