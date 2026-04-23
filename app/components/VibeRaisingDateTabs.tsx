import { clsx } from "clsx";

export const VIBE_RAISING_MONTH_OPTIONS = [
  { name: "January", tabClass: "bg-[#2563eb] shadow-blue-500/25", borderClass: "border-blue-300", ringClass: "ring-blue-100", softClass: "bg-blue-50/60", inputClass: "border-blue-300 focus:border-blue-500" },
  { name: "February", tabClass: "bg-[#db2777] shadow-pink-500/25", borderClass: "border-pink-300", ringClass: "ring-pink-100", softClass: "bg-pink-50/60", inputClass: "border-pink-300 focus:border-pink-500" },
  { name: "March", tabClass: "bg-[#16a34a] shadow-green-500/25", borderClass: "border-green-300", ringClass: "ring-green-100", softClass: "bg-green-50/60", inputClass: "border-green-300 focus:border-green-500" },
  { name: "April", tabClass: "bg-[#7c3aed] shadow-violet-500/25", borderClass: "border-violet-300", ringClass: "ring-violet-100", softClass: "bg-violet-50/60", inputClass: "border-violet-300 focus:border-violet-500" },
  { name: "May", tabClass: "bg-[#ea580c] shadow-orange-500/25", borderClass: "border-orange-300", ringClass: "ring-orange-100", softClass: "bg-orange-50/60", inputClass: "border-orange-300 focus:border-orange-500" },
  { name: "June", tabClass: "bg-[#0891b2] shadow-cyan-500/25", borderClass: "border-cyan-300", ringClass: "ring-cyan-100", softClass: "bg-cyan-50/60", inputClass: "border-cyan-300 focus:border-cyan-500" },
  { name: "July", tabClass: "bg-[#be123c] shadow-rose-500/25", borderClass: "border-rose-300", ringClass: "ring-rose-100", softClass: "bg-rose-50/60", inputClass: "border-rose-300 focus:border-rose-500" },
  { name: "August", tabClass: "bg-[#4f46e5] shadow-indigo-500/25", borderClass: "border-indigo-300", ringClass: "ring-indigo-100", softClass: "bg-indigo-50/60", inputClass: "border-indigo-300 focus:border-indigo-500" },
  { name: "September", tabClass: "bg-[#65a30d] shadow-lime-500/25", borderClass: "border-lime-300", ringClass: "ring-lime-100", softClass: "bg-lime-50/60", inputClass: "border-lime-300 focus:border-lime-500" },
  { name: "October", tabClass: "bg-[#c026d3] shadow-fuchsia-500/25", borderClass: "border-fuchsia-300", ringClass: "ring-fuchsia-100", softClass: "bg-fuchsia-50/60", inputClass: "border-fuchsia-300 focus:border-fuchsia-500" },
  { name: "November", tabClass: "bg-[#0f766e] shadow-teal-500/25", borderClass: "border-teal-300", ringClass: "ring-teal-100", softClass: "bg-teal-50/60", inputClass: "border-teal-300 focus:border-teal-500" },
  { name: "December", tabClass: "bg-[#dc2626] shadow-red-500/25", borderClass: "border-red-300", ringClass: "ring-red-100", softClass: "bg-red-50/60", inputClass: "border-red-300 focus:border-red-500" },
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
          "flex items-center rounded-t-2xl rounded-b-lg text-white shadow-lg ring-1 ring-white/30",
          isCompact
            ? "min-w-[124px] px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.1em]"
            : "min-w-[176px] px-4 py-2.5 text-sm font-black uppercase tracking-[0.12em]",
          monthTheme.tabClass,
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
