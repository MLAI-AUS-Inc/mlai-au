import type { ReactNode } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type VibeRaisingStickyStepBarProps = {
    statusIcon?: ReactNode;
    statusTitle: string;
    statusDetail?: string;
    backLabel?: string;
    onBack?: () => void;
    primaryLabel: string;
    onPrimary?: () => void;
    primaryDisabled?: boolean;
    primaryType?: "button" | "submit";
    primaryForm?: string;
};

export default function VibeRaisingStickyStepBar({
    statusIcon,
    statusTitle,
    statusDetail,
    backLabel = "Back",
    onBack,
    primaryLabel,
    onPrimary,
    primaryDisabled = false,
    primaryType = "button",
    primaryForm,
}: VibeRaisingStickyStepBarProps) {
    return (
        <div className="fixed inset-x-4 bottom-4 z-40 lg:left-24">
            <div className="mx-auto flex max-w-6xl flex-col gap-4 rounded-2xl border border-[var(--vr-color-border)] bg-white/95 px-4 py-4 shadow-2xl shadow-black/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5">
                <div className="flex min-w-0 items-center gap-3">
                    {statusIcon ? (
                        <div className="flex flex-shrink-0 items-center justify-center">
                            {statusIcon}
                        </div>
                    ) : null}
                    <div className="min-w-0">
                        <p className="truncate text-sm font-black text-gray-950">{statusTitle}</p>
                        {statusDetail ? (
                            <p className="mt-0.5 truncate text-xs font-semibold text-slate-500">{statusDetail}</p>
                        ) : null}
                    </div>
                </div>

                <div className="flex flex-shrink-0 items-center justify-end gap-3">
                    {onBack ? (
                        <button
                            type="button"
                            onClick={onBack}
                            className="inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-slate-500 transition hover:bg-gray-50 hover:text-gray-950"
                        >
                            {backLabel}
                        </button>
                    ) : null}
                    <button
                        type={primaryType}
                        form={primaryForm}
                        onClick={primaryType === "button" ? onPrimary : undefined}
                        disabled={primaryDisabled}
                        className="inline-flex min-w-44 items-center justify-center gap-2 rounded-xl bg-[var(--vr-palette-purple)] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-[rgba(150,73,210,0.25)] transition hover:-translate-y-0.5 hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0"
                    >
                        {primaryLabel}
                        <ArrowRightIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
