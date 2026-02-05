import type { ReactNode } from "react"

export type GridColumns = 1 | 2 | 3 | 4

export interface CardGridProps {
    children: ReactNode
    columns?: {
        sm?: GridColumns
        md?: GridColumns
        lg?: GridColumns
    }
    gap?: 2 | 4 | 6 | 8
    className?: string
}

// Tailwind classes must be written out fully for purging to work
const smColsMap: Record<GridColumns, string> = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
}

const mdColsMap: Record<GridColumns, string> = {
    1: "md:grid-cols-1",
    2: "md:grid-cols-2",
    3: "md:grid-cols-3",
    4: "md:grid-cols-4",
}

const lgColsMap: Record<GridColumns, string> = {
    1: "lg:grid-cols-1",
    2: "lg:grid-cols-2",
    3: "lg:grid-cols-3",
    4: "lg:grid-cols-4",
}

const gapMap: Record<2 | 4 | 6 | 8, string> = {
    2: "gap-2",
    4: "gap-4",
    6: "gap-6",
    8: "gap-8",
}

/**
 * Reusable responsive grid for displaying cards
 * Supports configurable column counts at different breakpoints
 */
export default function CardGrid({
    children,
    columns = { sm: 2, lg: 4 },
    gap = 4,
    className = "",
}: CardGridProps) {
    const smCols = columns.sm ? smColsMap[columns.sm] : ""
    const mdCols = columns.md ? mdColsMap[columns.md] : ""
    const lgCols = columns.lg ? lgColsMap[columns.lg] : ""
    const gapClass = gapMap[gap]

    return (
        <div
            className={`grid grid-cols-1 ${smCols} ${mdCols} ${lgCols} ${gapClass} ${className}`.trim()}
        >
            {children}
        </div>
    )
}
