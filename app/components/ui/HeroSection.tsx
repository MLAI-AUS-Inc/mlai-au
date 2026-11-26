import type { ReactNode } from "react"

export interface HeroSectionProps {
    title: string
    description?: string
    children?: ReactNode
    className?: string
    variant?: "yellow" | "beige" | "white"
    headingSlot?: string;
    descriptionSlot?: string;
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
  headingSlot,
  descriptionSlot,
}: HeroSectionProps) {
    const variantClasses: Record<string, string> = {
        yellow: "articles-hero",
        beige: "bg-[var(--brutalist-beige)]",
        white: "bg-white",
    }

    return (
        <div className="mp-sec mp-library-hero">
            <section
                className={`${variantClasses[variant]} mp-bill mp-bill--a3 ${className}`.trim()}
                data-mp-ink={variant === "yellow" ? "yellow" : "orange"}
                data-mp-tape="duct"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="max-w-4xl">
                        <h1 className="mp-title mp-library-title" data-cf-slot={headingSlot}>
                            {title}
                        </h1>
                        {description && (
                            <p className="mp-library-intro" data-cf-slot={descriptionSlot}>
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
