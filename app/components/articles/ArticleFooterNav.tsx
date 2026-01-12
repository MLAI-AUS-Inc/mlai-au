import { Link } from 'react-router'

type ArticleFooterNavProps = {
    backHref?: string
    backLabel?: string
    topHref?: string
    className?: string
}

export function ArticleFooterNav({
    backHref = '/articles',
    backLabel = '← Back to Articles',
    topHref = '#',
    className = '',
}: ArticleFooterNavProps) {
    return (
        <div className={`mt-12 pt-6 border-t border-gray-100 text-sm text-gray-500 flex justify-between ${className}`}>
            <Link to={backHref} className="hover:text-[--brand-ink] underline-offset-4 hover:underline">
                {backLabel}
            </Link>
            <a href={topHref} className="hover:text-[--brand-ink] underline-offset-4 hover:underline">
                Top of page ↑
            </a>
        </div>
    )
}
