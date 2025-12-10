import clsx from 'clsx'

export type ArticleTocPlaceholderProps = {
  className?: string
}

export function ArticleTocPlaceholder({ className }: ArticleTocPlaceholderProps) {
  return (
    <div
      data-article-toc-placeholder
      className={clsx('not-prose my-10', className)}
    />
  )
}

export default ArticleTocPlaceholder
