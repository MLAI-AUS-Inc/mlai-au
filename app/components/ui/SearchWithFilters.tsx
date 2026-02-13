import { useState } from "react"

export interface FilterOption {
    id: string
    label: string
    color: string
    textColor: string
}

export interface SearchWithFiltersProps {
    filters?: FilterOption[]
    placeholder?: string
    onSearch?: (query: string) => void
    onFilterChange?: (filters: string[]) => void
    className?: string
}

/**
 * Reusable search bar with optional category filter pills
 */
export default function SearchWithFilters({
    filters = [],
    placeholder = "Search...",
    onSearch,
    onFilterChange,
    className = "",
}: SearchWithFiltersProps) {
    const [query, setQuery] = useState("")
    const [activeFilters, setActiveFilters] = useState<string[]>([])

    const handleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const newQuery = e.target.value
        setQuery(newQuery)
        onSearch?.(newQuery)
    }

    const toggleFilter = (filterId: string) => {
        const newFilters = activeFilters.includes(filterId)
            ? activeFilters.filter((f) => f !== filterId)
            : [...activeFilters, filterId]
        setActiveFilters(newFilters)
        onFilterChange?.(newFilters)
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
                    placeholder={placeholder}
                    value={query}
                    onChange={handleQueryChange}
                    className="article-search-bar__input"
                    aria-label="Search"
                />

                {/* Category Filter Pills */}
                {filters.length > 0 && (
                    <div className="article-search-bar__filters">
                        {filters.map((filter) => {
                            const isActive = activeFilters.includes(filter.id)
                            return (
                                <button
                                    key={filter.id}
                                    type="button"
                                    onClick={() => toggleFilter(filter.id)}
                                    className={`article-search-bar__pill ${isActive ? "article-search-bar__pill--active" : ""}`.trim()}
                                    style={{
                                        backgroundColor: filter.color,
                                        color: filter.textColor,
                                        borderColor: "transparent",
                                        opacity: isActive ? 1 : 0.7,
                                    }}
                                    aria-pressed={isActive}
                                >
                                    {filter.label}
                                </button>
                            )
                        })}
                    </div>
                )}
            </div>
        </div>
    )
}
