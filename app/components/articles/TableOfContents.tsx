import clsx from 'clsx'
import type { HTMLAttributes } from 'react'

export type TableOfContentsItem = {
  href: string
  label: string
  level?: number
}

type TocGroup = {
  heading: TableOfContentsItem
  children: TableOfContentsItem[]
}

type TableOfContentsProps = {
  items: TableOfContentsItem[]
  title?: string
  ariaLabel?: string
} & HTMLAttributes<HTMLElement>

export function TableOfContents({
  items,
  title = 'In this guide:',
  ariaLabel = 'Table of contents',
  className,
  ...props
}: TableOfContentsProps) {
  if (!items.length) {
    return null
  }

  const removeEmoji = (label: string) =>
    label
      // Remove most emoji and pictographs to keep the TOC concise and readable.
      .replace(/[\p{Emoji_Presentation}\p{Extended_Pictographic}]/gu, '')
      .replace(/\s{2,}/g, ' ')
      .trim() || label

  const groups: TocGroup[] = []
  let currentGroup: TocGroup | null = null

  items.forEach((item) => {
    const level = item.level ?? 2

    if (level <= 2) {
      currentGroup = {
        heading: item,
        children: [],
      }
      groups.push(currentGroup)
      return
    }

    if (currentGroup) {
      currentGroup.children.push(item)
      return
    }

    // Fallback: treat orphaned sub-headings as standalone groups
    groups.push({ heading: item, children: [] })
  })

  // Prefer a high-level overview that highlights h2 anchors.
  const primaryGroups = groups.filter((group) => (group.heading.level ?? 2) <= 2)

  // If no h2s exist, fall back to the first few headings to avoid an empty TOC.
  const displayGroups = primaryGroups.length ? primaryGroups : groups.slice(0, 8)

  return (
    <nav
      aria-label={ariaLabel}
      className={clsx('text-gray-900', className)}
      data-article-toc-component="true"
      {...props}
    >
      {title ? (
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-700">
          {title}
        </h3>
      ) : null}
      <ol className="space-y-2" role="list" data-article-toc-collapsible="true">
        {displayGroups.map(({ heading }) => (
          <li key={heading.href} className="list-none">
            <a
              href={heading.href}
              className="text-sm leading-5 font-medium text-indigo-700 underline underline-offset-4 hover:text-indigo-800 transition-colors"
            >
              {removeEmoji(heading.label)}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export default TableOfContents
