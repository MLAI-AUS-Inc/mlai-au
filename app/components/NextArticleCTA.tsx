import { useId } from 'react';
import { Link } from "react-router";
import { ImageWithFallback } from "./ImageWithFallback";
import { ARTICLE_FALLBACK_IMAGE } from "~/articles/registry";

export default function NextArticleCTA({ label = "Next up", title, description, to, image }: {
    label?: string; title: string; description?: string; to: string; image?: string;
}) {
    const id = useId();
    return (
        <Link
            to={to}
            aria-labelledby={`${id}-title`}
            aria-describedby={description ? `${id}-reason` : undefined}
            className="group block min-w-0 rounded-[28px] border border-gray-300 bg-[#f8f3e8] p-7 md:p-9 transition-all hover:border-gray-400 hover:bg-[#fbf6eb] hover:-translate-y-[2px] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4c1d95] motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
            <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 items-center text-left">
                <div className="min-w-0 space-y-6">
                    <span className="text-lg font-semibold text-[#6d28d9] leading-none block">{label}</span>
                    <h3 id={`${id}-title`} className="break-words text-3xl md:text-4xl font-black text-[#4c1d95] leading-tight group-hover:text-[#5B21B6] transition-colors">
                        {title}
                    </h3>
                    {description && (
                        <p id={`${id}-reason`} className="text-gray-800 text-lg leading-relaxed max-w-xl">
                            {description}
                        </p>
                    )}
                </div>

                {image && (
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[26px] shadow-[0_25px_60px_-26px_rgba(0,0,0,0.35)] border border-gray-200">
                        <ImageWithFallback
                            src={image}
                            fallbackSrc={ARTICLE_FALLBACK_IMAGE}
                            // This preview is decorative; the adjacent link title
                            // and task explanation identify the destination.
                            alt=""
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                    </div>
                )}
            </div>
        </Link>
    );
}
