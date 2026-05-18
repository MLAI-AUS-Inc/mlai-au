import type { ReactNode } from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

type VibeRaisingStickyStepBarProps = {
    className?: string;
    hideStatusOnMobile?: boolean;
    hideBackOnMobile?: boolean;
    compactOnMobile?: boolean;
    statusIcon?: ReactNode;
    statusTitle: string;
    statusDetail?: string;
    backLabel?: string;
    mobileBackLabel?: string;
    onBack?: () => void;
    secondaryLabel?: string;
    mobileSecondaryLabel?: string;
    onSecondary?: () => void;
    secondaryDisabled?: boolean;
    primaryLabel: string;
    mobilePrimaryLabel?: string;
    onPrimary?: () => void;
    primaryDisabled?: boolean;
    primaryType?: "button" | "submit";
    primaryForm?: string;
};

export default function VibeRaisingStickyStepBar({
    className,
    hideStatusOnMobile = false,
    hideBackOnMobile = false,
    compactOnMobile = false,
    statusIcon,
    statusTitle,
    statusDetail,
    backLabel = "Back",
    mobileBackLabel,
    onBack,
    secondaryLabel,
    mobileSecondaryLabel,
    onSecondary,
    secondaryDisabled = false,
    primaryLabel,
    mobilePrimaryLabel,
    onPrimary,
    primaryDisabled = false,
    primaryType = "button",
    primaryForm,
}: VibeRaisingStickyStepBarProps) {
    const resolvedBackLabel = mobileBackLabel ?? backLabel;
    const resolvedSecondaryLabel = mobileSecondaryLabel ?? secondaryLabel;
    const resolvedPrimaryLabel = mobilePrimaryLabel ?? primaryLabel;

    return (
        <div className={["fixed inset-x-4 bottom-4 z-40 lg:left-24", className].filter(Boolean).join(" ")}>
            <div
                className={[
                    "mx-auto flex max-w-6xl flex-col rounded-2xl border border-[var(--vr-color-border)] bg-white/95 shadow-2xl shadow-black/10 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4",
                    compactOnMobile ? "gap-3 px-3 py-3" : "gap-4 px-4 py-4",
                ].join(" ")}
            >
                <div className={["flex min-w-0 items-center gap-3", hideStatusOnMobile ? "hidden sm:flex" : ""].filter(Boolean).join(" ")}>
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

                <div
                    className={[
                        compactOnMobile
                            ? "grid grid-cols-2 gap-2 sm:flex sm:flex-shrink-0 sm:flex-row sm:items-center sm:justify-end"
                            : "flex flex-col gap-3 sm:flex-shrink-0 sm:flex-row sm:items-center sm:justify-end",
                    ].join(" ")}
                >
                    {onBack && !hideBackOnMobile ? (
                        <button
                            type="button"
                            onClick={onBack}
                            className={[
                                "inline-flex items-center justify-center rounded-xl px-4 py-3 text-sm font-extrabold text-slate-500 transition hover:bg-gray-50 hover:text-gray-950",
                                compactOnMobile ? "w-full sm:w-auto" : "w-full sm:w-auto",
                            ].join(" ")}
                        >
                            <span className="sm:hidden">{resolvedBackLabel}</span>
                            <span className="hidden sm:inline">{backLabel}</span>
                        </button>
                    ) : null}
                    {secondaryLabel && onSecondary ? (
                        <button
                            type="button"
                            onClick={onSecondary}
                            disabled={secondaryDisabled}
                            className={[
                                "inline-flex items-center justify-center rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-extrabold text-slate-700 shadow-sm transition hover:bg-gray-50 hover:text-gray-950 disabled:cursor-not-allowed disabled:opacity-55",
                                compactOnMobile ? "w-full sm:w-auto" : "w-full sm:w-auto",
                            ].join(" ")}
                        >
                            <span className="sm:hidden">{resolvedSecondaryLabel}</span>
                            <span className="hidden sm:inline">{secondaryLabel}</span>
                        </button>
                    ) : null}
                    <button
                        type={primaryType}
                        form={primaryForm}
                        onClick={primaryType === "button" ? onPrimary : undefined}
                        disabled={primaryDisabled}
                        className={[
                            "inline-flex items-center justify-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-5 py-3 text-sm font-extrabold text-white shadow-lg shadow-[rgba(0,128,128,0.18)] transition hover:-translate-y-0.5 hover:bg-[var(--vr-palette-black)] disabled:cursor-not-allowed disabled:opacity-55 disabled:hover:translate-y-0",
                            compactOnMobile ? "col-span-1 w-full sm:min-w-44 sm:w-auto" : "w-full sm:min-w-44 sm:w-auto",
                        ].join(" ")}
                    >
                        <span className="sm:hidden">{resolvedPrimaryLabel}</span>
                        <span className="hidden sm:inline">{primaryLabel}</span>
                        <ArrowRightIcon className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
}
