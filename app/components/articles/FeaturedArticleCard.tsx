import { Link } from "react-router"

export type FeaturedCardColor = "orange" | "purple" | "blue" | "black" | "image" | "coral-with-person"

export interface FeaturedArticleCardProps {
    href: string
    title: string
    image?: string
    imageAlt?: string
    color?: FeaturedCardColor
    personImage?: string
    className?: string
}

/**
 * Featured article card with colorful solid backgrounds or image background
 * Used in the articles page hero section
 */
export default function FeaturedArticleCard({
    href,
    title,
    image,
    imageAlt,
    color = "image",
    personImage,
    className = "",
}: FeaturedArticleCardProps) {
    const isImageVariant = color === "image"
    const isPersonVariant = color === "coral-with-person"

    // Build class list based on color variant
    let colorClass = ""
    if (isPersonVariant) {
        colorClass = "featured-card--orange featured-card--with-person"
    } else if (isImageVariant) {
        colorClass = "featured-card--image"
    } else {
        colorClass = `featured-card--${color}`
    }

    // Build style object
    let cardStyle: React.CSSProperties | undefined
    if (isPersonVariant && personImage) {
        cardStyle = { backgroundImage: `url(${personImage})` }
    } else if (isImageVariant && image) {
        cardStyle = { backgroundImage: `url(${image})` }
    }

    return (
        <Link
            to={href}
            className={`featured-card ${colorClass} ${className}`.trim()}
            style={cardStyle}
        >
            {/* Gradient overlay for image variant applied via CSS */}
            <div className="featured-card__content">
                <h3 className="featured-card__title">{title}</h3>
            </div>
        </Link>
    )
}
