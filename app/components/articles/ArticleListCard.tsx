import { Link } from "react-router"
import { formatDate } from "~/lib/formatDate"

export type AccentColor = "red" | "blue" | "purple" | "teal"

export interface ArticleListCardProps {
    href: string
    title: string
    date: string
    accentColor?: AccentColor
    className?: string
}

// Rotate through accent colors based on index
const ACCENT_COLORS: AccentColor[] = ["red", "blue", "purple", "teal"]

export function getAccentColorByIndex(index: number): AccentColor {
    return ACCENT_COLORS[index % ACCENT_COLORS.length]
}

/**
 * Simple article list card with colored accent bar
 * Used in the "All Articles" section
 */
export default function ArticleListCard({
    href,
    title,
    date,
    accentColor = "red",
    className = "",
}: ArticleListCardProps) {
    return (
        <Link
            to={href}
            className={`article-list-card article-list-card--${accentColor} block ${className}`.trim()}
        >
            <time
                dateTime={date}
                className="article-list-card__date"
            >
                {formatDate(date)}
            </time>
            <h3 className="article-list-card__title">{title}</h3>
        </Link>
    )
}
