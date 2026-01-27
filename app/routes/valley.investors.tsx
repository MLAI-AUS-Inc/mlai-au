import { Link, useLoaderData } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

import { requireFounder } from "~/lib/valley-session";
import {
    SparklesIcon,
    LockClosedIcon,
    LockOpenIcon,
    CheckIcon,
    XMarkIcon,
    PaperAirplaneIcon,
    FunnelIcon
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export async function loader({ request }: LoaderFunctionArgs) {
    const user = requireFounder(request);

    // Mock Founder Stats (Derived from latest update)
    const stats = {
        mrr: 127500,
        growth: 18 // percent
    };

    // Mock Investors
    const investors = [
        {
            id: 1,
            name: "Sarah Chen",
            firm: "Alpha Ventures",
            initials: "SC",
            color: "bg-green-100 text-green-700",
            criteria: {
                minMrr: 10000,
                minGrowth: 0,
                description: "This investor focuses on Pre-seed SaaS with >$10k MRR and B2B focus with clear enterprise potential"
            }
        },
        {
            id: 2,
            name: "Michael Rodriguez",
            firm: "Seed Capital Partners",
            initials: "MR",
            color: "bg-gray-100 text-gray-500", // Will be blurred
            criteria: {
                minMrr: 50000,
                minGrowth: 20,
                description: "This investor focuses on Seed stage SaaS with >$50k MRR, >20% MoM growth, and product-market fit indicators"
            }
        }
    ];

    return { user, stats, investors };
}

function MetricCheck({ met, label }: { met: boolean; label: string }) {
    return (
        <div className={clsx("text-xs font-medium flex items-center gap-1.5", met ? "text-green-700" : "text-gray-500")}>
            {met ? (
                <CheckIcon className="w-3.5 h-3.5" />
            ) : (
                <XMarkIcon className="w-3.5 h-3.5 text-gray-400" />
            )}
            <span className={clsx(met ? "" : "text-gray-500 italic")}>{label}</span>
        </div>
    );
}

export default function DiscoverInvestors() {
    const { user, stats, investors } = useLoaderData<typeof loader>();

    return (
        <div className="space-y-8 pb-12">

            {/* Header Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10">
                    <h1 className="text-2xl font-bold flex items-center gap-3 mb-2">
                        <SparklesIcon className="w-8 h-8" />
                        Discover Investors
                    </h1>
                    <p className="text-blue-100 max-w-2xl">
                        Hit the investment criteria in your monthly updates to unlock connection requests with investors actively looking for startups like yours.
                    </p>
                </div>
                {/* Decorative circles */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3" />
                <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-2xl translate-y-1/2 -translate-x-1/3" />
            </div>

            {/* Investors Grid */}
            <div className="space-y-6">
                {investors.map((investor) => {
                    const mrrMet = stats.mrr >= investor.criteria.minMrr;
                    const growthMet = stats.growth >= investor.criteria.minGrowth;
                    const isUnlocked = mrrMet && growthMet;

                    return (
                        <div
                            key={investor.id}
                            className={clsx(
                                "bg-white rounded-xl border-2 transition-all duration-200 overflow-hidden",
                                isUnlocked ? "border-green-400 shadow-sm" : "border-gray-100 shadow-sm opacity-90"
                            )}
                        >
                            {/* Card Header */}
                            <div className="p-6 flex items-start justify-between border-b border-gray-50">
                                <div className="flex items-center gap-4">
                                    <div className={clsx(
                                        "w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg",
                                        isUnlocked ? investor.color : "bg-gray-200 text-gray-400"
                                    )}>
                                        {isUnlocked ? investor.initials : "??"}
                                    </div>
                                    <div>
                                        <h3 className={clsx("font-bold text-lg", !isUnlocked && "blur-[6px] select-none text-gray-400")}>
                                            {isUnlocked ? investor.name : "Investor Name Used"}
                                        </h3>
                                        <p className={clsx("text-sm text-gray-500", !isUnlocked && "blur-[4px] select-none")}>
                                            {isUnlocked ? investor.firm : "Venture Firm Name"}
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    {isUnlocked ? (
                                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                            Unlocked!
                                        </span>
                                    ) : (
                                        <LockClosedIcon className="w-5 h-5 text-gray-300" />
                                    )}
                                </div>
                            </div>

                            {/* Body Content */}
                            <div className="p-6 space-y-4">
                                {/* Criteria Box */}
                                <div className="bg-blue-50/50 rounded-lg p-4 border border-blue-100">
                                    <h4 className="flex items-center gap-2 text-sm font-bold text-blue-900 mb-2">
                                        <FunnelIcon className="w-4 h-4 text-blue-600" />
                                        Investment Criteria
                                    </h4>
                                    <p className="text-sm text-blue-800 leading-relaxed">
                                        {investor.criteria.description}
                                    </p>
                                </div>

                                {/* Progress Box */}
                                <div className={clsx("rounded-lg p-4 border", isUnlocked ? "bg-green-50/50 border-green-100" : "bg-gray-50/50 border-gray-100")}>
                                    <h4 className="text-xs font-bold uppercase tracking-wide text-gray-500 mb-2">
                                        Your Progress
                                    </h4>
                                    <div className="space-y-1">
                                        <MetricCheck
                                            met={mrrMet}
                                            label={`MRR requirement met ($${stats.mrr.toLocaleString()} >= $${investor.criteria.minMrr.toLocaleString()})`}
                                        />
                                        <MetricCheck
                                            met={growthMet}
                                            label={growthMet
                                                ? `Growth requirement met (${stats.growth}% >= ${investor.criteria.minGrowth}%)`
                                                : `Growth below threshold (${stats.growth}% < ${investor.criteria.minGrowth}%)`
                                            }
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Footer Action */}
                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                                <button
                                    className={clsx(
                                        "w-full py-3 rounded-lg font-bold text-sm flex items-center justify-center gap-2 transition-colors",
                                        isUnlocked
                                            ? "bg-blue-600 text-white hover:bg-blue-700 shadow-sm"
                                            : "bg-gray-100 text-gray-400 cursor-not-allowed"
                                    )}
                                    disabled={!isUnlocked}
                                >
                                    {isUnlocked ? (
                                        <>
                                            <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
                                            Request Connection
                                        </>
                                    ) : (
                                        <>
                                            <LockClosedIcon className="w-4 h-4" />
                                            Locked - Meet criteria to unlock
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
