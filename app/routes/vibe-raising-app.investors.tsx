import { useLoaderData } from "react-router";
import type { Route } from "./+types/vibe-raising-app.investors";
import { getEnv } from "~/lib/env.server";
import { requireVibeRaisingFounder } from "~/lib/vibe-raising";
import {
    SparklesIcon,
    LockClosedIcon,
    PaperAirplaneIcon,
    InformationCircleIcon,
    AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/outline";
import { clsx } from "clsx";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    await requireVibeRaisingFounder(env, request);

    // Mock Founder Stats (Derived from latest update)
    const stats = {
        mrr: 127500,
        growth: 18 // percent
    };

    // Mock Investors — real Australian/APAC venture firms used as references
    // (mock descriptions, criteria, and tags; not actual investment mandates)
    const investors = [
        {
            id: 1,
            firm: "Antler",
            firmInitials: "AN",
            category: "Pre-Seed · Residency",
            bannerGradient: "linear-gradient(135deg, #1A1A2E 0%, #4A1FA0 100%)",
            tags: ["Pre-Seed", "Residency", "Global", "First Cheque"],
            criteria: {
                minMrr: 0,
                minGrowth: 0,
                description: "Day-zero pre-seed investor. Backs founders through a residency program and writes first cheques before product-market fit."
            }
        },
        {
            id: 2,
            firm: "Folklore Ventures",
            firmInitials: "FV",
            category: "Pre-Seed · First Cheque",
            bannerGradient: "linear-gradient(135deg, #00C8CC 0%, #5057E4 100%)",
            tags: ["Pre-Seed", "ANZ", "First Cheque", "Generalist"],
            criteria: {
                minMrr: 5000,
                minGrowth: 0,
                description: "ANZ-focused pre-seed fund. Backs ambitious founders early with conviction-led cheques before revenue and PMF are fully proven."
            }
        },
        {
            id: 3,
            firm: "Blackbird Ventures",
            firmInitials: "BB",
            category: "Seed · Generational",
            bannerGradient: "linear-gradient(135deg, #1A1A2E 0%, #5057E4 100%)",
            tags: ["Seed", "Series A", "ANZ", "Generalist"],
            criteria: {
                minMrr: 50000,
                minGrowth: 10,
                description: "Backs ambitious ANZ founders building generational companies. Portfolio includes Canva, SafetyCulture, Culture Amp."
            }
        },
        {
            id: 4,
            firm: "AirTree Ventures",
            firmInitials: "AT",
            category: "Seed · Series A",
            bannerGradient: "linear-gradient(135deg, #6B30D9 0%, #00C8CC 100%)",
            tags: ["Seed", "Series A", "SaaS", "Marketplaces"],
            criteria: {
                minMrr: 100000,
                minGrowth: 15,
                description: "Invests in ANZ software, marketplaces, and AI at seed and Series A. Portfolio includes Linktree, Employment Hero, Go1."
            }
        },
        {
            id: 5,
            firm: "Square Peg Capital",
            firmInitials: "SP",
            category: "Series A · Growth",
            bannerGradient: "linear-gradient(135deg, #6B30D9 0%, #5057E4 100%)",
            tags: ["Series A", "Growth", "APAC", "B2B SaaS"],
            criteria: {
                minMrr: 150000,
                minGrowth: 20,
                description: "Series A and growth-stage founders across Australia, Israel, and Southeast Asia. Backed Airwallex, Canva, Deputy, Fiverr."
            }
        },
        {
            id: 6,
            firm: "Main Sequence Ventures",
            firmInitials: "MS",
            category: "Deep Tech · CSIRO",
            bannerGradient: "linear-gradient(135deg, #4A1FA0 0%, #2D1263 100%)",
            tags: ["Deep Tech", "AI / ML", "CSIRO-backed", "Series A"],
            criteria: {
                minMrr: 200000,
                minGrowth: 10,
                description: "CSIRO-backed deep tech fund. Invests in science-led startups across AI, quantum, space, and advanced materials with defensible IP."
            }
        }
    ];

    return { stats, investors };
}

export default function DiscoverInvestors() {
    const { stats, investors } = useLoaderData<typeof loader>();

    return (
        <div className="vr-scope space-y-8 pb-12">

            {/* Page header — eyebrow + Oswald title + subtitle + action buttons */}
            <div className="flex items-start justify-between gap-4 flex-wrap">
                <div>
                    <div className="vr-text-eyebrow mb-1.5">MLAI Vibe Raising</div>
                    <h1 className="vr-text-page-title">Discover Investors</h1>
                    <p
                        className="vr-text-body-small mt-1"
                        style={{ color: "var(--vr-color-text-mid)" }}
                    >
                        Match with investors actively looking for startups like yours.
                    </p>
                </div>
                <div className="flex items-center gap-2.5 flex-wrap">
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border transition-colors"
                        style={{
                            color: "var(--vr-color-text-mid)",
                            borderColor: "var(--vr-color-border-md)",
                            background: "transparent",
                        }}
                    >
                        <AdjustmentsHorizontalIcon className="w-4 h-4" />
                        Filter Criteria
                    </button>
                    <button
                        type="button"
                        className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg transition-all"
                        style={{
                            background: "var(--vr-color-primary)",
                            color: "#fff",
                            boxShadow: "var(--vr-shadow-sm)",
                        }}
                    >
                        <SparklesIcon className="w-4 h-4" />
                        View My Stats
                    </button>
                </div>
            </div>

            {/* Info alert — explains the unlock mechanism */}
            <div className="vr-alert vr-alert-info">
                <span className="vr-alert-icon">
                    <InformationCircleIcon className="w-4 h-4" />
                </span>
                <div>
                    <div className="vr-alert-title">Unlock connections by hitting investor criteria</div>
                    <div className="vr-alert-body">
                        As your monthly updates meet each investor's benchmarks (MRR, growth, stage), their profile unlocks and you can request a connection directly.
                    </div>
                </div>
            </div>

            {/* Investors grid — 1 col mobile, 2 tablet, 3 laptop+ */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
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
                            {/* Top row: category + unlock badge */}
                            <div className="flex items-start justify-between gap-2 px-6 pt-5 pb-3">
                                <span
                                    className="vr-text-eyebrow"
                                    style={{ color: "var(--vr-color-text-sub)" }}
                                >
                                    {investor.category}
                                </span>
                                {isUnlocked ? (
                                    <span className="vr-badge vr-badge-teal">Unlocked</span>
                                ) : (
                                    <span
                                        className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider"
                                        style={{
                                            background: "var(--vr-color-surface)",
                                            color: "var(--vr-color-text-sub)",
                                            border: "1px solid var(--vr-color-border-md)",
                                        }}
                                    >
                                        <LockClosedIcon className="w-3 h-3" />
                                        {criteriaMet}/2
                                    </span>
                                )}
                            </div>

                            {/* Banner */}
                            <div className="mx-6 mb-4 relative overflow-hidden" style={{ borderRadius: "var(--vr-radius-md)" }}>
                                <div
                                    className="vr-investor-card-banner aspect-[16/9] flex items-center justify-center relative"
                                    style={{
                                        background: investor.bannerGradient,
                                        filter: isUnlocked ? undefined : "grayscale(0.6)",
                                    }}
                                >
                                    <span
                                        className="font-bold select-none"
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
                                    {/* Decorative bubble */}
                                    <div
                                        className="absolute -top-6 -right-6 w-24 h-24 rounded-full"
                                        style={{ background: "rgba(255,255,255,0.12)" }}
                                    />
                                    {/* Locked overlay */}
                                    {!isUnlocked && (
                                        <div
                                            className="absolute inset-0 flex items-center justify-center"
                                            style={{ background: "rgba(26,26,46,0.35)" }}
                                        >
                                            <LockClosedIcon className="w-8 h-8 text-white drop-shadow" />
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Firm name — primary title */}
                            <h3
                                className={clsx("vr-text-card-title px-6", !isUnlocked && "blur-[5px] select-none")}
                                style={{ fontSize: "22px", lineHeight: 1.2 }}
                            >
                                {isUnlocked ? investor.firm : "Venture Firm"}
                            </h3>

                            {/* Description */}
                            <p
                                className="vr-text-body-small px-6 mt-2 line-clamp-3"
                                style={{ color: "var(--vr-color-text-mid)" }}
                            >
                                {investor.criteria.description}
                            </p>

                            {/* Tags */}
                            <div className="px-6 mt-4 flex flex-wrap gap-1.5">
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

                            {/* CTA — pushed to bottom via flex-1 spacer above */}
                            <div className="mt-5 flex-1" />
                            <div className="px-6 pb-5">
                                <button
                                    disabled={!isUnlocked}
                                    className="inline-flex items-center gap-2 px-4 py-2.5 font-semibold text-sm transition-all"
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
                                            <PaperAirplaneIcon className="w-4 h-4 -rotate-45" />
                                        </>
                                    ) : (
                                        <>
                                            <LockClosedIcon className="w-4 h-4" />
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
