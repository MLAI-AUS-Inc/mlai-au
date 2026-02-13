import type { ReactNode } from "react"

export interface HeroSectionProps {
    title: string
    description?: string
    children?: ReactNode
    className?: string
    variant?: "yellow" | "beige" | "white"
}

/**
 * Reusable hero section with title, description, and optional content slot
 * Used for page headers with prominent titles
 */
export default function HeroSection({
    title,
    description,
    children,
    className = "",
    variant = "yellow",
}: HeroSectionProps) {
    const variantClasses: Record<string, string> = {
        yellow: "articles-hero",
        beige: "bg-[var(--brutalist-beige)]",
        white: "bg-white",
    }

    return (
        <div className="p-2 lg:p-3">
            <section className={`${variantClasses[variant]} ${className}`.trim()}>
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-4xl">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-zinc-900 tracking-tight">
                            {title}
                        </h1>
                        {description && (
                            <p className="mt-4 text-base text-zinc-700">
                                {description}
                            </p>
                        )}
                        {children && (
                            <div className="mt-8">
                                {children}
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </div>
    )
}
