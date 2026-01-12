import clsx from 'clsx'

export type ArticleTocPlaceholderProps = {
  className?: string
  noMargin?: boolean
}

export function ArticleTocPlaceholder({ className, noMargin }: ArticleTocPlaceholderProps) {
  return (
    <div
      data-article-toc-placeholder
      className={clsx(
        'not-prose rounded-[32px] border border-gray-300 bg-transparent px-8 py-7 text-gray-900',
        noMargin ? null : 'my-12',
        className,
      )}
    />
  )
}

export default ArticleTocPlaceholder
