import clsx from "clsx"

const BADGE_VARIANTS = {
  // Reference badge colors only (AI, ML, Community, Australia)
  red: "bg-red-600 text-white",           // AI
  purple: "bg-purple-600 text-white",     // ML
  black: "bg-gray-900 text-white",        // Community
  yellow: "bg-yellow-400 text-gray-900",  // Australia
  // Legacy mappings for compatibility
  slate: "bg-gray-900 text-white",
  emerald: "bg-purple-600 text-white",
  sky: "bg-purple-600 text-white",
  blue: "bg-purple-600 text-white",
  indigo: "bg-purple-600 text-white",
  amber: "bg-yellow-400 text-gray-900",
  rose: "bg-red-600 text-white",
  orange: "bg-red-600 text-white",
  teal: "bg-purple-600 text-white",
} as const

export type BadgeVariant = keyof typeof BADGE_VARIANTS

export interface BadgeProps {
  variant?: BadgeVariant
  children: React.ReactNode
  className?: string
}

export function Badge({ variant = "slate", children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold",
        BADGE_VARIANTS[variant],
        className,
      )}
    >
      {children}
    </span>
  )
}

export default Badge
