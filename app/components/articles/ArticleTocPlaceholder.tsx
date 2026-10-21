import clsx from 'clsx'

import { TableOfContents, type TableOfContentsItem } from './TableOfContents'

/** Present on the slot when its list was rendered on the server. ArticleEnhancer reads it. */
export const SERVER_RENDERED_TOC_ATTRIBUTE = 'data-article-toc-server-rendered'

export type ArticleTocPlaceholderProps = {
  className?: string
  noMargin?: boolean
  /**
   * Contents entries rendered on the server, in reading order. Each `href` must
   * point at an element id in the same article (for example `#pricing`).
   *
   * With entries, the list is part of the server HTML, so it shows without
   * JavaScript (crawlers, script-free previews), and ArticleEnhancer does not add
   * a second list. Without entries the slot stays empty for ArticleEnhancer to
   * fill after hydration.
   */
  items?: TableOfContentsItem[]
}

export function ArticleTocPlaceholder({ className, noMargin, items }: ArticleTocPlaceholderProps) {
  const entries = (items ?? []).filter((item) => String(item?.href ?? '').trim() && String(item?.label ?? '').trim())
  const serverRendered = entries.length > 0

  return (
    <div
      data-article-toc-placeholder
      {...(serverRendered ? { [SERVER_RENDERED_TOC_ATTRIBUTE]: 'true' } : {})}
      data-cf-component-id="toc"
      data-cf-component-type="toc"
      data-cf-component-label="Table of contents"
      className={clsx(
        'not-prose rounded-[32px] border border-gray-300 bg-transparent px-8 py-7 text-gray-900',
        noMargin ? null : 'my-12',
        // An empty slot waits for ArticleEnhancer. Until something is rendered
        // into it (or if nothing ever is), never show an empty bordered box.
        'empty:hidden',
        className,
      )}
    >
      {serverRendered ? (
        <TableOfContents items={entries} title="In this guide:" ariaLabel="Table of contents" />
      ) : null}
    </div>
  )
}

export default ArticleTocPlaceholder
