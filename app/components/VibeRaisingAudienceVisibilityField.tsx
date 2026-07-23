import { clsx } from "clsx";
import { EyeIcon, UserGroupIcon, UserIcon } from "@heroicons/react/24/outline";
import { useState, type ReactNode } from "react";
import {
  normalizeVibeRaisingAudienceVisibility,
  toggleVibeRaisingAudienceVisibility,
} from "~/lib/vibe-raising-audience-visibility";
import type {
  VibeRaisingAudienceVisibility,
  VibeRaisingAudienceVisibilitySelection,
} from "~/types/vibe-raising";

export const VIBE_RAISING_AUDIENCE_VISIBILITY_OPTIONS: Array<{
  value: VibeRaisingAudienceVisibility;
  label: string;
}> = [
  {
    value: "just_me",
    label: "Just for me",
  },
  {
    value: "community",
    label: "Show community",
  },
  {
    value: "investors",
    label: "Show it to investors",
  },
];

const optionIconMap = {
  just_me: UserIcon,
  community: UserGroupIcon,
  investors: EyeIcon,
} as const;

type Props = {
  name: string;
  value?: VibeRaisingAudienceVisibilitySelection | null;
  defaultValue?: VibeRaisingAudienceVisibilitySelection | null;
  onChange?: (value: VibeRaisingAudienceVisibilitySelection) => void;
  title?: ReactNode;
  description?: string;
  className?: string;
};

export default function VibeRaisingAudienceVisibilityField({
  name,
  value,
  defaultValue = ["just_me"],
  onChange,
  title = "Who should see this?",
  description = "Keep this private, or select one or both public audiences.",
  className,
}: Props) {
  const [localValue, setLocalValue] = useState<VibeRaisingAudienceVisibilitySelection>(() =>
    normalizeVibeRaisingAudienceVisibility(defaultValue),
  );
  const selectedValue = normalizeVibeRaisingAudienceVisibility(value ?? localValue);

  return (
    <section className={clsx("rounded-2xl border border-[var(--vr-color-border)] bg-white p-4 shadow-sm", className)}>
      <div className="flex flex-wrap items-end justify-between gap-2">
        <p className="text-base font-black text-gray-950">{title}</p>
        {description ? <p className="text-sm font-semibold text-slate-500">{description}</p> : null}
      </div>
      <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label={typeof title === "string" ? title : "Update visibility"}>
        {VIBE_RAISING_AUDIENCE_VISIBILITY_OPTIONS.map((option) => {
          const Icon = optionIconMap[option.value];
          const checked = selectedValue.includes(option.value);
          const handleSelect = () => {
            const nextValue = toggleVibeRaisingAudienceVisibility(selectedValue, option.value);
            setLocalValue(nextValue);
            onChange?.(nextValue);
          };
          return (
            <label
              key={option.value}
              className={clsx(
                "group flex min-h-24 cursor-pointer flex-col items-center justify-center rounded-xl border px-2 py-3 text-center transition active:scale-[0.98]",
                checked
                  ? "border-[var(--vr-color-primary)] bg-[rgba(0,255,215,0.14)] text-[var(--vr-color-primary)] shadow-sm ring-2 ring-[rgba(0,128,128,0.10)]"
                  : "border-[var(--vr-color-border)] bg-white text-slate-600 hover:border-[rgba(0,128,128,0.24)] hover:text-gray-950",
              )}
            >
              <input
                type="checkbox"
                name={name}
                value={option.value}
                checked={checked}
                onChange={handleSelect}
                className="sr-only"
              />
              <span
                className={clsx(
                  "inline-flex h-9 w-9 items-center justify-center rounded-full transition",
                  checked ? "bg-white text-[var(--vr-color-primary)] shadow-sm" : "bg-slate-50 text-slate-500 group-hover:bg-slate-100",
                )}
              >
                <Icon className="h-4 w-4" />
              </span>
              <span className="mt-2 max-w-full text-balance text-xs font-black leading-4 sm:text-sm">
                {option.label}
              </span>
            </label>
          );
        })}
      </div>
    </section>
  );
}
