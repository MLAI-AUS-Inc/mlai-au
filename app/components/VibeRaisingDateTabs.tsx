import { clsx } from "clsx";

const MLAI_MONTH_THEMES = {
    mint: {
        tabClass: "bg-[var(--vr-palette-mint)] shadow-[rgba(0,255,215,0.24)]",
        borderClass: "border-[rgba(0,255,215,0.62)]",
        ringClass: "ring-[rgba(0,255,215,0.18)]",
        softClass: "bg-[rgba(0,255,215,0.12)]",
        inputClass: "border-[rgba(0,255,215,0.62)] focus:border-[var(--vr-palette-mint)]",
        textClass: "text-[var(--vr-palette-black)]",
        mutedTextClass: "text-black/65",
        dividerClass: "border-black/20",
        hoverClass: "hover:bg-black/10",
        focusClass: "focus-visible:outline-black/60",
        indicatorClass: "bg-[var(--vr-palette-black)]",
    },
    tealSoft: {
        tabClass: "bg-[var(--vr-palette-teal-soft)] shadow-[rgba(156,207,204,0.32)]",
        borderClass: "border-[rgba(156,207,204,0.78)]",
        ringClass: "ring-[rgba(156,207,204,0.26)]",
        softClass: "bg-[rgba(156,207,204,0.18)]",
        inputClass: "border-[rgba(156,207,204,0.78)] focus:border-[var(--vr-palette-teal-soft)]",
        textClass: "text-[var(--vr-palette-black)]",
        mutedTextClass: "text-black/65",
        dividerClass: "border-black/20",
        hoverClass: "hover:bg-black/10",
        focusClass: "focus-visible:outline-black/60",
        indicatorClass: "bg-[var(--vr-palette-black)]",
    },
    teal: {
        tabClass: "bg-[var(--vr-palette-teal)] shadow-[rgba(0,128,128,0.24)]",
        borderClass: "border-[rgba(0,128,128,0.45)]",
        ringClass: "ring-[rgba(0,128,128,0.14)]",
        softClass: "bg-[rgba(0,128,128,0.08)]",
        inputClass: "border-[rgba(0,128,128,0.45)] focus:border-[var(--vr-palette-teal)]",
        textClass: "text-white",
        mutedTextClass: "text-white/75",
        dividerClass: "border-white/30",
        hoverClass: "hover:bg-white/10",
        focusClass: "focus-visible:outline-white/70",
        indicatorClass: "bg-white",
    },
    black: {
        tabClass: "bg-[var(--vr-palette-black)] shadow-[rgba(11,11,11,0.24)]",
        borderClass: "border-[rgba(11,11,11,0.42)]",
        ringClass: "ring-[rgba(11,11,11,0.12)]",
        softClass: "bg-[rgba(11,11,11,0.05)]",
        inputClass: "border-[rgba(11,11,11,0.42)] focus:border-[var(--vr-palette-black)]",
        textClass: "text-white",
        mutedTextClass: "text-white/75",
        dividerClass: "border-white/25",
        hoverClass: "hover:bg-white/10",
        focusClass: "focus-visible:outline-white/70",
        indicatorClass: "bg-white",
    },
    orange: {
        tabClass: "bg-[var(--vr-palette-orange)] shadow-[rgba(237,95,0,0.24)]",
        borderClass: "border-[rgba(237,95,0,0.45)]",
        ringClass: "ring-[rgba(237,95,0,0.14)]",
        softClass: "bg-[rgba(237,95,0,0.08)]",
        inputClass: "border-[rgba(237,95,0,0.45)] focus:border-[var(--vr-palette-orange)]",
        textClass: "text-white",
        mutedTextClass: "text-white/75",
        dividerClass: "border-white/30",
        hoverClass: "hover:bg-white/10",
        focusClass: "focus-visible:outline-white/70",
        indicatorClass: "bg-white",
    },
    coral: {
        tabClass: "bg-[var(--vr-palette-coral)] shadow-[rgba(242,114,63,0.24)]",
        borderClass: "border-[rgba(242,114,63,0.45)]",
        ringClass: "ring-[rgba(242,114,63,0.14)]",
        softClass: "bg-[rgba(242,114,63,0.10)]",
        inputClass: "border-[rgba(242,114,63,0.45)] focus:border-[var(--vr-palette-coral)]",
        textClass: "text-[var(--vr-palette-black)]",
        mutedTextClass: "text-black/65",
        dividerClass: "border-black/20",
        hoverClass: "hover:bg-black/10",
        focusClass: "focus-visible:outline-black/60",
        indicatorClass: "bg-[var(--vr-palette-black)]",
    },
    yellow: {
        tabClass: "bg-[var(--vr-palette-yellow)] shadow-[rgba(255,200,1,0.24)]",
        borderClass: "border-[rgba(255,200,1,0.70)]",
        ringClass: "ring-[rgba(255,200,1,0.22)]",
        softClass: "bg-[rgba(255,200,1,0.18)]",
        inputClass: "border-[rgba(11,11,11,0.22)] focus:border-[var(--vr-palette-yellow)]",
        textClass: "text-[var(--vr-palette-black)]",
        mutedTextClass: "text-black/65",
        dividerClass: "border-black/20",
        hoverClass: "hover:bg-black/10",
        focusClass: "focus-visible:outline-black/60",
        indicatorClass: "bg-[var(--vr-palette-black)]",
    },
    gold: {
        tabClass: "bg-[var(--vr-palette-gold)] shadow-[rgba(247,191,78,0.24)]",
        borderClass: "border-[rgba(247,191,78,0.66)]",
        ringClass: "ring-[rgba(247,191,78,0.20)]",
        softClass: "bg-[rgba(247,191,78,0.16)]",
        inputClass: "border-[rgba(247,191,78,0.66)] focus:border-[var(--vr-palette-gold)]",
        textClass: "text-[var(--vr-palette-black)]",
        mutedTextClass: "text-black/65",
        dividerClass: "border-black/20",
        hoverClass: "hover:bg-black/10",
        focusClass: "focus-visible:outline-black/60",
        indicatorClass: "bg-[var(--vr-palette-black)]",
    },
    blue: {
        tabClass: "bg-[var(--vr-palette-blue)] shadow-[rgba(76,110,245,0.24)]",
        borderClass: "border-[rgba(76,110,245,0.45)]",
        ringClass: "ring-[rgba(76,110,245,0.14)]",
        softClass: "bg-[rgba(76,110,245,0.08)]",
        inputClass: "border-[rgba(76,110,245,0.45)] focus:border-[var(--vr-palette-blue)]",
        textClass: "text-white",
        mutedTextClass: "text-white/75",
        dividerClass: "border-white/30",
        hoverClass: "hover:bg-white/10",
        focusClass: "focus-visible:outline-white/70",
        indicatorClass: "bg-white",
    },
    blueSoft: {
        tabClass: "bg-[var(--vr-palette-blue-soft)] shadow-[rgba(130,153,248,0.26)]",
        borderClass: "border-[rgba(130,153,248,0.58)]",
        ringClass: "ring-[rgba(130,153,248,0.18)]",
        softClass: "bg-[rgba(130,153,248,0.12)]",
        inputClass: "border-[rgba(130,153,248,0.58)] focus:border-[var(--vr-palette-blue-soft)]",
        textClass: "text-[var(--vr-palette-black)]",
        mutedTextClass: "text-black/65",
        dividerClass: "border-black/20",
        hoverClass: "hover:bg-black/10",
        focusClass: "focus-visible:outline-black/60",
        indicatorClass: "bg-[var(--vr-palette-black)]",
    },
    purple: {
        tabClass: "bg-[var(--vr-palette-purple)] shadow-[rgba(150,73,210,0.24)]",
        borderClass: "border-[rgba(150,73,210,0.45)]",
        ringClass: "ring-[rgba(150,73,210,0.14)]",
        softClass: "bg-[rgba(150,73,210,0.08)]",
        inputClass: "border-[rgba(150,73,210,0.45)] focus:border-[var(--vr-palette-purple)]",
        textClass: "text-white",
        mutedTextClass: "text-white/75",
        dividerClass: "border-white/30",
        hoverClass: "hover:bg-white/10",
        focusClass: "focus-visible:outline-white/70",
        indicatorClass: "bg-white",
    },
    lavender: {
        tabClass: "bg-[var(--vr-palette-lavender)] shadow-[rgba(155,117,193,0.24)]",
        borderClass: "border-[rgba(155,117,193,0.50)]",
        ringClass: "ring-[rgba(155,117,193,0.16)]",
        softClass: "bg-[rgba(155,117,193,0.10)]",
        inputClass: "border-[rgba(155,117,193,0.50)] focus:border-[var(--vr-palette-lavender)]",
        textClass: "text-[var(--vr-palette-black)]",
        mutedTextClass: "text-black/65",
        dividerClass: "border-black/20",
        hoverClass: "hover:bg-black/10",
        focusClass: "focus-visible:outline-black/60",
        indicatorClass: "bg-[var(--vr-palette-black)]",
    },
};

export const VIBE_RAISING_MONTH_OPTIONS = [
    { name: "January", ...MLAI_MONTH_THEMES.mint },
    { name: "February", ...MLAI_MONTH_THEMES.tealSoft },
    { name: "March", ...MLAI_MONTH_THEMES.teal },
    { name: "April", ...MLAI_MONTH_THEMES.black },
    { name: "May", ...MLAI_MONTH_THEMES.orange },
    { name: "June", ...MLAI_MONTH_THEMES.coral },
    { name: "July", ...MLAI_MONTH_THEMES.yellow },
    { name: "August", ...MLAI_MONTH_THEMES.gold },
    { name: "September", ...MLAI_MONTH_THEMES.blue },
    { name: "October", ...MLAI_MONTH_THEMES.blueSoft },
    { name: "November", ...MLAI_MONTH_THEMES.purple },
    { name: "December", ...MLAI_MONTH_THEMES.lavender },
];

export function getVibeRaisingMonthTheme(month: string) {
    return VIBE_RAISING_MONTH_OPTIONS.find((option) => option.name === month) || VIBE_RAISING_MONTH_OPTIONS[0];
}

export function parseVibeRaisingMonthYear(value?: string | null) {
    const parts = (value || "").trim().split(/\s+/).filter(Boolean);
    const parsedYear = Number(parts[parts.length - 1]);
    const year = Number.isFinite(parsedYear) ? parsedYear : new Date().getFullYear();
    const monthText = Number.isFinite(parsedYear) ? parts.slice(0, -1).join(" ") : parts.join(" ");
    const month = VIBE_RAISING_MONTH_OPTIONS.find((option) => option.name === monthText)?.name || monthText || "Update";

    return { month, year };
}

export function VibeRaisingDateTabs({
    month,
    year,
    className,
    size = "default",
}: {
    month: string;
    year: number | string;
    className?: string;
    size?: "default" | "compact";
}) {
    const monthTheme = getVibeRaisingMonthTheme(month);
    const isCompact = size === "compact";

    return (
        <div className={clsx("flex items-stretch gap-2", className)}>
            <div
                className={clsx(
                    "flex items-center rounded-t-2xl rounded-b-lg shadow-lg ring-1 ring-white/30",
                    isCompact
                        ? "min-w-[124px] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.1em]"
                        : "min-w-[176px] px-4 py-2.5 text-sm font-black uppercase tracking-[0.12em]",
                    monthTheme.tabClass,
                    monthTheme.textClass,
                )}
            >
                {month}
            </div>
            <div
                className={clsx(
                    "flex items-center justify-center rounded-t-2xl rounded-b-lg bg-gray-950 font-black tracking-[0.12em] text-white shadow-lg shadow-black/20 ring-1 ring-white/10",
                    isCompact ? "min-w-[82px] px-3 py-1.5 text-[11px]" : "min-w-[108px] px-4 py-2.5 text-sm",
                )}
            >
                {year}
            </div>
        </div>
    );
}
