import { redirect, useLoaderData } from "react-router";
import type { Route } from "./+types/vibe-raising-app.investors";
import { getEnv } from "~/lib/env.server";
import { isFounderToolsDiscoverEnabledServer } from "~/lib/founder-tools-preview.server";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";
import {
    AdjustmentsHorizontalIcon,
    InformationCircleIcon,
    LockClosedIcon,
    PaperAirplaneIcon,
    SparklesIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

const investorProfiles = [
    {
        id: 1,
        firm: "Antler",
        firmInitials: "AN",
        category: "Pre-Seed - Residency",
        bannerGradient: "linear-gradient(135deg, #1A1A2E 0%, #4A1FA0 100%)",
        tags: ["Pre-Seed", "Residency", "Global", "First Cheque"],
        criteria: {
            minMrr: 0,
            minGrowth: 0,
            description: "Day-zero pre-seed investor. Backs founders through a residency program and writes first cheques before product-market fit.",
        },
    },
    {
        id: 2,
        firm: "Folklore Ventures",
        firmInitials: "FV",
        category: "Pre-Seed - First Cheque",
        bannerGradient: "linear-gradient(135deg, #00C8CC 0%, #5057E4 100%)",
        tags: ["Pre-Seed", "ANZ", "First Cheque", "Generalist"],
        criteria: {
            minMrr: 5000,
            minGrowth: 0,
            description: "ANZ-focused pre-seed fund. Backs ambitious founders early before revenue and product-market fit are fully proven.",
        },
    },
    {
        id: 3,
        firm: "Blackbird Ventures",
        firmInitials: "BB",
        category: "Seed - Generational",
        bannerGradient: "linear-gradient(135deg, #1A1A2E 0%, #5057E4 100%)",
        tags: ["Seed", "Series A", "ANZ", "Generalist"],
        criteria: {
            minMrr: 50000,
            minGrowth: 10,
            description: "Backs ambitious ANZ founders building generational companies. Portfolio includes Canva, SafetyCulture, and Culture Amp.",
        },
    },
    {
        id: 4,
        firm: "AirTree Ventures",
        firmInitials: "AT",
        category: "Seed - Series A",
        bannerGradient: "linear-gradient(135deg, #6B30D9 0%, #00C8CC 100%)",
        tags: ["Seed", "Series A", "SaaS", "Marketplaces"],
        criteria: {
            minMrr: 100000,
            minGrowth: 15,
            description: "Invests in ANZ software, marketplaces, and AI at seed and Series A. Portfolio includes Linktree, Employment Hero, and Go1.",
        },
    },
    {
        id: 5,
        firm: "Square Peg Capital",
        firmInitials: "SP",
        category: "Series A - Growth",
        bannerGradient: "linear-gradient(135deg, #6B30D9 0%, #5057E4 100%)",
        tags: ["Series A", "Growth", "APAC", "B2B SaaS"],
        criteria: {
            minMrr: 150000,
            minGrowth: 20,
            description: "Series A and growth-stage founders across Australia, Israel, and Southeast Asia. Backed Airwallex, Canva, Deputy, and Fiverr.",
        },
    },
    {
        id: 6,
        firm: "Main Sequence Ventures",
        firmInitials: "MS",
        category: "Deep Tech - CSIRO",
        bannerGradient: "linear-gradient(135deg, #4A1FA0 0%, #2D1263 100%)",
        tags: ["Deep Tech", "AI / ML", "CSIRO-backed", "Series A"],
        criteria: {
            minMrr: 200000,
            minGrowth: 10,
            description: "CSIRO-backed deep tech fund. Invests in science-led startups across AI, quantum, space, and advanced materials with defensible IP.",
        },
    },
];

export async function loader({ request, context }: Route.LoaderArgs) {
    if (!isFounderToolsDiscoverEnabledServer(context)) {
        throw redirect("/founder-tools/updates");
    }

    const env = getEnv(context);
    await requireVibeRaisingFounder(env, request);

    return {
        stats: {
            mrr: 127500,
            growth: 18,
        },
        investors: investorProfiles,
    };
}

export default function DiscoverInvestors() {
    const { stats, investors } = useLoaderData<typeof loader>();

    return (
        <div className="vr-scope space-y-8 pb-12">
            <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                    <div className="vr-text-eyebrow mb-1.5">MLAI Vibe Raising</div>
                    <h1 className="vr-text-page-title">Discover Investors</h1>
                    <p className="vr-text-body-small mt-1" style={{ color: "var(--vr-color-text-mid)" }}>
                        Match with investors actively looking for startups like yours.
                    </p>
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg border px-4 py-2.5 text-sm font-medium transition-colors"
                        style={{
                            color: "var(--vr-color-text-mid)",
                            borderColor: "var(--vr-color-border-md)",
                            background: "transparent",
                        }}
                    >
                        <AdjustmentsHorizontalIcon className="h-4 w-4" />
                        Filter Criteria
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm font-medium transition-all"
                        style={{
                            background: "var(--vr-color-primary)",
                            color: "#fff",
                            boxShadow: "var(--vr-shadow-sm)",
                        }}
                    >
                        <SparklesIcon className="h-4 w-4" />
                        View My Stats
                    </button>
                </div>
            </div>

            <div className="vr-alert vr-alert-info">
                <span className="vr-alert-icon">
                    <InformationCircleIcon className="h-4 w-4" />
                </span>
                <div>
                    <div className="vr-alert-title">Unlock connections by hitting investor criteria</div>
                    <div className="vr-alert-body">
                        As your monthly updates meet each investor&apos;s benchmarks, their profile unlocks and you can request a connection directly.
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {investors.map((investor) => {
                    const mrrMet = stats.mrr >= investor.criteria.minMrr;
                    const growthMet = stats.growth >= investor.criteria.minGrowth;
                    const isUnlocked = mrrMet && growthMet;
                    const criteriaMet = [mrrMet, growthMet].filter(Boolean).length;

                    return (
                        <div
                            key={investor.id}
                            className="vr-investor-card flex flex-col overflow-hidden"
                            style={{
                                background: "var(--vr-color-bg)",
                                borderRadius: "var(--vr-radius-lg)",
                                opacity: isUnlocked ? 1 : 0.96,
                            }}
                        >
                            <div className="flex items-start justify-between gap-2 px-6 pb-3 pt-5">
                                <span className="vr-text-eyebrow" style={{ color: "var(--vr-color-text-sub)" }}>
                                    {investor.category}
                                </span>
                                {isUnlocked ? (
                                    <span className="vr-badge vr-badge-teal">Unlocked</span>
                                ) : (
                                    <span
                                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider"
                                        style={{
                                            background: "var(--vr-color-surface)",
                                            color: "var(--vr-color-text-sub)",
                                            border: "1px solid var(--vr-color-border-md)",
                                        }}
                                    >
                                        <LockClosedIcon className="h-3 w-3" />
                                        {criteriaMet}/2
                                    </span>
                                )}
                            </div>

                            <div className="relative mx-6 mb-4 overflow-hidden" style={{ borderRadius: "var(--vr-radius-md)" }}>
                                <div
                                    className="vr-investor-card-banner relative flex aspect-[16/9] items-center justify-center"
                                    style={{
                                        background: investor.bannerGradient,
                                        filter: isUnlocked ? undefined : "grayscale(0.6)",
                                    }}
                                >
                                    <span
                                        className="select-none font-bold"
                                        style={{
                                            fontFamily: "var(--vr-font-title)",
                                            color: "rgba(255,255,255,0.92)",
                                            fontSize: "56px",
                                            letterSpacing: "0.02em",
                                            textShadow: "0 2px 8px rgba(0,0,0,0.15)",
                                        }}
                                    >
                                        {investor.firmInitials}
                                    </span>
                                    <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full" style={{ background: "rgba(255,255,255,0.12)" }} />
                                    {!isUnlocked ? (
                                        <div className="absolute inset-0 flex items-center justify-center" style={{ background: "rgba(26,26,46,0.35)" }}>
                                            <LockClosedIcon className="h-8 w-8 text-white drop-shadow" />
                                        </div>
                                    ) : null}
                                </div>
                            </div>

                            <h3
                                className={clsx("vr-text-card-title px-6", !isUnlocked && "select-none blur-[5px]")}
                                style={{ fontSize: "22px", lineHeight: 1.2 }}
                            >
                                {isUnlocked ? investor.firm : "Venture Firm"}
                            </h3>

                            <p className="vr-text-body-small mt-2 line-clamp-3 px-6" style={{ color: "var(--vr-color-text-mid)" }}>
                                {investor.criteria.description}
                            </p>

                            <div className="mt-4 flex flex-wrap gap-1.5 px-6">
                                {investor.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="inline-flex items-center px-2.5 py-1 text-xs font-medium"
                                        style={{
                                            background: "var(--vr-color-purple-50)",
                                            color: "var(--vr-color-purple-700)",
                                            borderRadius: "var(--vr-radius-sm)",
                                        }}
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-5 flex-1" />
                            <div className="px-6 pb-5">
                                <button
                                    type="button"
                                    disabled={!isUnlocked}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold transition-all"
                                    style={
                                        isUnlocked
                                            ? {
                                                  background: "var(--vr-color-primary)",
                                                  color: "#fff",
                                                  boxShadow: "var(--vr-shadow-sm)",
                                                  borderRadius: "var(--vr-radius-md)",
                                              }
                                            : {
                                                  background: "var(--vr-color-neutral-100)",
                                                  color: "var(--vr-color-text-sub)",
                                                  cursor: "not-allowed",
                                                  borderRadius: "var(--vr-radius-md)",
                                              }
                                    }
                                >
                                    {isUnlocked ? (
                                        <>
                                            Request Connection
                                            <PaperAirplaneIcon className="h-4 w-4 -rotate-45" />
                                        </>
                                    ) : (
                                        <>
                                            <LockClosedIcon className="h-4 w-4" />
                                            Meet criteria to unlock
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
