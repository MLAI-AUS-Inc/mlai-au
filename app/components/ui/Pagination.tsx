import { Link } from "react-router"

export interface PaginationProps {
    currentPage: number
    totalPages: number
    baseUrl: string
    className?: string
}

/**
 * Reusable pagination component with Previous/Next links
 * Handles page 1 without query param for cleaner URLs
 */
export default function Pagination({
    currentPage,
    totalPages,
    baseUrl,
    className = "",
}: PaginationProps) {
    if (totalPages <= 1) {
        return null
    }

    const prevUrl = currentPage === 2 ? baseUrl : `${baseUrl}?page=${currentPage - 1}`
    const nextUrl = `${baseUrl}?page=${currentPage + 1}`

    return (
        <nav
            className={`mt-12 flex items-center justify-center gap-2 ${className}`.trim()}
            aria-label="Pagination"
        >
            {currentPage > 1 && (
                <Link
                    to={prevUrl}
                    className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition"
                >
                    ← Previous
                </Link>
            )}

            <span className="px-4 py-2 text-sm text-zinc-500">
                Page {currentPage} of {totalPages}
            </span>

            {currentPage < totalPages && (
                <Link
                    to={nextUrl}
                    className="px-4 py-2 text-sm font-medium text-zinc-600 hover:text-zinc-900 transition"
                >
                    Next →
                </Link>
            )}
        </nav>
    )
}
