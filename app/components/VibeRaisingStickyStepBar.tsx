import type { ReactNode } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type VibeRaisingStickyStepBarProps = {
    className?: string;
    statusIcon?: ReactNode;
    statusTitle: string;
    statusDetail?: string;
    backLabel?: string;
    onBack?: () => void;
    secondaryLabel?: string;
    onSecondary?: () => void;
    secondaryDisabled?: boolean;
    primaryLabel: string;
    onPrimary?: () => void;
    primaryDisabled?: boolean;
    primaryType?: "button" | "submit";
    primaryForm?: string;
};

export default function VibeRaisingStickyStepBar({
    className,
    statusIcon,
    statusTitle,
    statusDetail,
    backLabel = "Back",
    onBack,
    secondaryLabel,
    onSecondary,
    secondaryDisabled = false,
    primaryLabel,
    onPrimary,
    primaryDisabled = false,
    primaryType = "button",
    primaryForm,
}: VibeRaisingStickyStepBarProps) {
    return (
        <div className={["fixed inset-x-4 bottom-4 z-40 lg:left-24", className].filter(Boolean).join(" ")}>
            <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-[var(--vr-color-border)] bg-white/95 px-4 py-4 shadow-2xl shadow-black/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                    {statusIcon ? (
                        <div className="flex flex-shrink-0 items-center justify-center">
                            {statusIcon}
                        </div>
                    ) : null}
                    <div className="min-w-0">
                        <p className="text-sm font-black leading-tight text-gray-950 sm:truncate">{statusTitle}</p>
                        {statusDetail ? (
                            <p className="mt-0.5 text-xs font-semibold leading-tight text-slate-500 sm:truncate">{statusDetail}</p>
                        ) : null}
                    </div>
                </div>

                <div className="flex flex-col gap-3 sm:flex-shrink-0 sm:flex-row sm:items-center sm:justify-end">
                    {onBack ? (
                        <button
                            type="button"
                            onClick={onBack}
                            className="inline-flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-slate-500 transition hover:bg-gray-50 hover:text-gray-950 sm:w-auto"
                        >
                            {backLabel}
                        </button>
                    ) : null}
                    {secondaryLabel && onSecondary ? (
                        <button
                            type="button"
                            onClick={onSecondary}
                            disabled={secondaryDisabled}
                            className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-950 disabled:cursor-not-allowed disabled:opacity-55 sm:w-auto"
                        >
                            {secondaryLabel}
                        </button>
                    ) : null}
                    <button
                        type={primaryType}
                        form={primaryForm}
                        onClick={primaryType === "button" ? onPrimary : undefined}
                        disabled={primaryDisabled}
                        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[var(--vr-palette-purple)] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-[rgba(150,73,210,0.25)] transition hover:-translate-y-0.5 hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0 sm:min-w-44 sm:w-auto"
                    >
                        {primaryLabel}
                        <ArrowRightIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
