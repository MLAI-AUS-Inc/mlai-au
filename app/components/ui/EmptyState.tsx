import type { ReactNode } from "react"

export interface EmptyStateProps {
    message: string
    icon?: ReactNode
    className?: string
}

/**
 * Reusable empty state component for when no items are found
 */
export default function EmptyState({
    message,
    icon,
    className = "",
}: EmptyStateProps) {
    return (
        <div className={`text-center py-8 ${className}`.trim()}>
            {icon && (
                <div className="mb-4 flex justify-center text-zinc-400">
                    {icon}
                </div>
            )}
            <p className="text-zinc-500">{message}</p>
        </div>
    )
}
