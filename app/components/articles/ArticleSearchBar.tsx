import SearchWithFilters, { type FilterOption } from "~/components/ui/SearchWithFilters"

interface ArticleSearchBarProps {
    onSearch?: (query: string) => void
    onFilterChange?: (filters: string[]) => void
    className?: string
}

const ARTICLE_FILTERS: FilterOption[] = [
    { id: "ai", label: "AI", color: "var(--brutalist-orange)", textColor: "white" },
    { id: "ml", label: "ML", color: "var(--brutalist-purple)", textColor: "white" },
    { id: "community", label: "Community", color: "var(--brutalist-black)", textColor: "white" },
    { id: "australia", label: "Australia", color: "var(--brutalist-yellow)", textColor: "black" },
]

/**
 * Search bar with category filter pills for the articles page
 * Wraps the generic SearchWithFilters with article-specific configuration
 */
export default function ArticleSearchBar({
    onSearch,
    onFilterChange,
    className = "",
}: ArticleSearchBarProps) {
    return (
        <SearchWithFilters
            filters={ARTICLE_FILTERS}
            placeholder="Search..."
            onSearch={onSearch}
            onFilterChange={onFilterChange}
            className={className}
        />
    )
}
