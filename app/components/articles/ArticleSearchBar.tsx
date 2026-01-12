import { useState } from "react"

interface ArticleSearchBarProps {
    onSearch?: (query: string) => void
    onFilterChange?: (filters: string[]) => void
    className?: string
}

const CATEGORY_FILTERS = [
    { id: "ai", label: "AI", color: "var(--brutalist-orange)", textColor: "white" },
    { id: "ml", label: "ML", color: "var(--brutalist-purple)", textColor: "white" },
    { id: "community", label: "Community", color: "var(--brutalist-black)", textColor: "white" },
    { id: "australia", label: "Australia", color: "var(--brutalist-yellow)", textColor: "black" },
]

/**
 * Search bar with category filter pills for the articles page
 */
export default function ArticleSearchBar({
    onSearch,
    onFilterChange,
    className = "",
}: ArticleSearchBarProps) {
    const [query, setQuery] = useState("")

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery)
        onSearch?.(newQuery)
    }

    return (
        <div className={`article-search-bar ${className}`.trim()}>
            <div className="article-search-bar__container">
                {/* Search Icon */}
                <svg
                    className="article-search-bar__icon"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                </svg>

                {/* Search Input */}
                <input
                    type="text"
                    placeholder="Search..."
                    value={query}
                    onChange={handleQueryChange}
                    className="article-search-bar__input"
                    aria-label="Search articles"
                />

                {/* Category Filter Pills */}
                <div className="article-search-bar__filters">
                    {CATEGORY_FILTERS.map((filter) => (
                        <button
                            key={filter.id}
                            type="button"
                            className="article-search-bar__pill"
                            style={{
                                backgroundColor: filter.color,
                                color: filter.textColor,
                                borderColor: "transparent",
                            }}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    )
}
