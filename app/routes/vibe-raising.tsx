import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRightIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import type { Route } from "./+types/vibe-raising";
import ResponsibleInvestorsSection from "~/components/ResponsibleInvestorsSection";
import VibeRaisingIntroPopup from "~/components/VibeRaisingIntroPopup";
import { VIBE_RAISING_APP_PATH } from "~/lib/vibe-raising-session";

const PAGE_DESCRIPTION =
    "Build investor trust and secure funding through consistent, transparent monthly updates.";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Vibe Raising | MLAI Community" },
        { name: "description", content: PAGE_DESCRIPTION },
        { tagName: "link", rel: "canonical", href: "https://www.mlai.au/vibe-raising" },
    ];
}

export async function loader({ }: Route.LoaderArgs) {
    return {};
}

const VIBE_RAISING_INTRO_SEEN_KEY = "vibe-raising-intro-seen";

export default function VibeRaisingPage({ }: Route.ComponentProps) {
    const navigate = useNavigate();
    const [hasSeenIntro, setHasSeenIntro] = useState(false);
    const [showIntro, setShowIntro] = useState(false);

    useEffect(() => {
        if (typeof window === "undefined") return;
        setHasSeenIntro(window.localStorage.getItem(VIBE_RAISING_INTRO_SEEN_KEY) === "true");
    }, []);

    const markIntroSeen = () => {
        if (typeof window !== "undefined") {
            window.localStorage.setItem(VIBE_RAISING_INTRO_SEEN_KEY, "true");
        }
        setHasSeenIntro(true);
    };

    const continueToSignUp = () => {
        markIntroSeen();
        navigate(VIBE_RAISING_APP_PATH);
    };

    const handleSignUpClick = () => {
        if (hasSeenIntro) {
            navigate(VIBE_RAISING_APP_PATH);
            return;
        }

        setShowIntro(true);
    };

    return (
        <main className="bg-white">
            {showIntro && (
                <VibeRaisingIntroPopup
                    onDismiss={() => setShowIntro(false)}
                    onComplete={continueToSignUp}
                    onSkip={continueToSignUp}
                />
            )}

            <div className="relative min-h-[calc(100vh-64px)] overflow-hidden">
                <img
                    src="/hero-bg.jpg"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover object-top"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/50 to-black/70" />

                <div className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col items-center justify-center px-6 py-16 text-center">
                    <p className="mb-4 text-xs font-semibold uppercase tracking-[0.28em] text-white/70">
                        Vibe Raising
                    </p>
                    <h1 className="mb-4 max-w-5xl text-4xl font-extrabold tracking-tight text-white drop-shadow-lg sm:text-5xl lg:text-6xl">
                        Let&apos;s get you ready to raise.
                    </h1>
                    <p className="mx-auto mb-8 max-w-xl text-base leading-snug text-white/80 sm:text-lg">
                        Build investor trust and secure funding through consistent,
                        transparent monthly updates.
                    </p>
                    <div className="flex items-center justify-center">
                        <button
                            type="button"
                            onClick={handleSignUpClick}
                            className="inline-flex items-center gap-3 rounded-xl bg-white px-10 py-4 text-base font-bold text-gray-900 shadow-lg shadow-black/20 transition-all hover:bg-gray-100 active:scale-[0.98]"
                        >
                            Sign Up
                            <ArrowRightIcon className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>

            <ResponsibleInvestorsSection />

            <section className="px-6 py-14">
                <div className="mx-auto max-w-5xl">
                    <h2 className="mb-12 text-center text-2xl font-bold text-gray-900">How It Works</h2>
                    <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-0">
                        {[
                            { step: 1, title: "Sign Up", desc: "Create your founder account" },
                            { step: 2, title: "Company Details", desc: "Add the basics once" },
                            { step: 3, title: "Monthly Update", desc: "Share progress in minutes" },
                            { step: 4, title: "Dashboard", desc: "Track your updates and traction" },
                        ].map((item, idx, items) => (
                            <div key={item.step} className="flex items-center">
                                <div className="space-y-2 px-8 text-center sm:px-10">
                                    <span className="text-3xl font-extrabold text-violet-600">{item.step}</span>
                                    <p className="text-sm font-bold text-gray-900 whitespace-nowrap">{item.title}</p>
                                    <p className="text-xs text-gray-500 whitespace-nowrap">{item.desc}</p>
                                </div>
                                {idx < items.length - 1 && (
                                    <div className="hidden h-16 w-px flex-shrink-0 bg-gray-300 md:block" />
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-4xl px-6 pb-14">
                <div className="relative rounded-2xl border border-red-100 bg-white p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                    <div className="flex items-start gap-5">
                        <div className="mt-1 rounded-lg bg-red-50 p-2">
                            <ExclamationTriangleIcon className="h-7 w-7 text-red-500" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Don&apos;t Wait Until You Need Money</h2>
                            <p className="text-lg leading-relaxed text-gray-600">
                                The best founders build investor trust before the round starts.
                                Send consistent updates, stay transparent about progress and challenges,
                                and make it easy for the right investors to understand your momentum.
                            </p>
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 top-0 w-1.5 rounded-l-2xl bg-red-400" />
                </div>
            </section>
        </main>
    );
}
