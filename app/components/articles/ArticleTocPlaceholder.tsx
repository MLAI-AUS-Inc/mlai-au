import clsx from 'clsx'

export type ArticleTocPlaceholderProps = {
  className?: string
  noMargin?: boolean
}

export function ArticleTocPlaceholder({ className, noMargin }: ArticleTocPlaceholderProps) {
  return (
    <div
      data-article-toc-placeholder
      className={clsx('not-prose', noMargin ? null : 'my-10', className)}
    />
  )
}

export default ArticleTocPlaceholder
