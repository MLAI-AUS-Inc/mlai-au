import { useState } from "react";

const AI_HOSPITAL_STATIC = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Screenshot%202025-11-25%20at%2011.24.04%E2%80%AFam.png?alt=media&token=b23e69c8-f0c7-4f76-8439-49ae8056c987";
const AI_HOSPITAL_GIF = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/20251007_1211_01k6y2wqafe0bv634b3m6jkb47-ezgif.com-optimize.gif?alt=media&token=0e011323-1c97-4287-815e-3acc35344d22";
const ESAFETY_STATIC = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504";
const ESAFETY_GIF = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Hipster_Office_Evil_Grin_Video-ezgif.com-resize%20(1).gif?alt=media&token=02219364-f849-4578-b112-08e18e2f21e3";

export default function Hackathons() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,var(--brutalist-beige)_0%,#f7f2e8_100%)] px-4 py-12 sm:px-6 lg:px-8">
            {/* Preload GIFs */}
            <img src={AI_HOSPITAL_GIF} alt="" className="hidden" />
            <img src={ESAFETY_GIF} alt="" className="hidden" />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-[var(--brutalist-black)] sm:text-5xl">
                        What are you looking for?
                    </h1>
                    <p className="mt-4 text-xl text-black/55">
                        Select an MLAI product to log into
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
                    {/* Medhack: Frontiers Card — Disabled */}
                    <div
                        className="group relative aspect-video overflow-hidden rounded-2xl bg-white shadow-lg grayscale opacity-75 cursor-not-allowed"
                        onMouseEnter={() => setHoveredCard("ai-hospital")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <img
                            src={hoveredCard === "ai-hospital" ? AI_HOSPITAL_GIF : AI_HOSPITAL_STATIC}
                            alt="Medhack: Frontiers"
                            className="absolute inset-0 h-full w-full object-cover object-top"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                            <h3 className="text-2xl font-bold">Medhack: Frontiers (Coming Soon)</h3>
                            <p className="mt-2 text-sm text-gray-200">
                                Revolutionizing healthcare with AI. Join us to build the future of medicine.
                            </p>
                        </div>
                    </div>

                    {/* eSafety Hackathon Card — Disabled */}
                    <div
                        className="group relative aspect-video overflow-hidden rounded-2xl bg-white shadow-lg grayscale opacity-75 cursor-not-allowed"
                        onMouseEnter={() => setHoveredCard("esafety")}
                        onMouseLeave={() => setHoveredCard(null)}
                    >
                        <img
                            src={hoveredCard === "esafety" ? ESAFETY_GIF : ESAFETY_STATIC}
                            alt="eSafety Hackathon"
                            className="absolute inset-0 h-full w-full object-cover object-center"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-10">
                            <h3 className="text-2xl font-bold">eSafety Hackathon (Coming Soon)</h3>
                            <p className="mt-2 text-sm text-gray-200">
                                Building a safer internet for everyone. Innovate for online safety.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mx-auto mt-16 max-w-5xl">
                    <div className="relative overflow-hidden rounded-[2rem] border border-black/8 bg-[var(--brutalist-black)] text-white shadow-[0_36px_100px_rgba(17,17,17,0.18)] sm:rounded-[2.5rem]">
                        <div className="absolute -left-12 top-0 h-40 w-40 rounded-full bg-[var(--brutalist-mint)]/18 blur-3xl" />
                        <div className="absolute right-10 top-8 h-48 w-48 rounded-full bg-[var(--brutalist-orange)]/16 blur-3xl" />
                        <div className="absolute bottom-0 left-1/3 h-44 w-44 rounded-full bg-[var(--brutalist-blue)]/20 blur-3xl" />

                        <div className="relative grid items-center gap-10 px-8 py-10 md:grid-cols-[1.1fr_0.9fr] md:px-12 md:py-12">
                            <div className="max-w-2xl">
                                <p className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-sm font-semibold uppercase tracking-[0.32em] text-white/72 backdrop-blur">
                                    Founder Updates
                                </p>

                                <h2 className="mt-6 max-w-xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Vibe Raising - Build your investor network
                                </h2>

                                <p className="mt-4 max-w-xl text-base leading-7 text-white/72 sm:text-lg">
                                    Most founders start raising when it's too late. Use the Vibe Raising tool to start building your investor network 6 months before you raise
                                </p>

                                <a
                                    href="/platform/login?app=vibe-raising&next=/vibe-raising&forceLogin=1"
                                    className="mt-8 inline-flex min-h-14 items-center justify-center rounded-full bg-[var(--brutalist-yellow)] px-7 py-4 text-base font-semibold text-[var(--brutalist-black)] shadow-[0_18px_40px_rgba(254,252,34,0.2)] transition-transform duration-200 hover:scale-[1.02] hover:opacity-95"
                                >
                                    Go to Vibe Raising
                                </a>
                            </div>

                            <div>
                                <div className="grid gap-4 lg:hidden">
                                    <div className="rounded-[1.75rem] bg-[var(--brutalist-mint)] p-5 text-[var(--brutalist-black)] shadow-[0_16px_40px_rgba(0,255,215,0.2)]">
                                        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-black/55">
                                            Founder Signal
                                        </p>
                                        <p className="mt-4 text-3xl font-semibold leading-tight">
                                            Monthly update
                                        </p>
                                        <p className="mt-3 text-base text-black/70">
                                            Share traction, asks, and momentum with investors.
                                        </p>
                                    </div>

                                    <div className="rounded-[1.75rem] bg-[var(--brutalist-orange)] p-5 text-white shadow-[0_16px_40px_rgba(255,61,0,0.22)]">
                                        <p className="text-5xl font-bold leading-none">+1</p>
                                        <p className="mt-3 text-lg leading-snug">
                                            startup profile ready for investor discovery
                                        </p>
                                    </div>

                                    <div className="rounded-[1.75rem] bg-[var(--brutalist-yellow)] p-5 text-[var(--brutalist-black)] shadow-[0_16px_40px_rgba(254,252,34,0.2)]">
                                        <p className="mt-4 text-3xl font-semibold leading-tight">
                                            Create monthly update
                                        </p>
                                        <p className="mt-3 text-base text-black/72">
                                            Start building your investor network by providing updates
                                        </p>
                                    </div>
                                </div>

                                <div className="relative hidden min-h-[360px] lg:block">
                                    <div className="absolute right-8 top-0 z-10 w-[250px] rotate-[8deg] rounded-[2rem] bg-[var(--brutalist-mint)] p-6 text-[var(--brutalist-black)] shadow-[0_16px_48px_rgba(0,255,215,0.22)]">
                                        <p className="text-xs font-semibold uppercase tracking-[0.35em] text-black/55">
                                            Founder Signal
                                        </p>
                                        <div className="mt-5 rounded-[1.4rem] bg-black/10 px-5 py-4 text-3xl font-semibold">
                                            Monthly update
                                        </div>
                                        <p className="mt-4 text-lg text-black/70">
                                            Send traction and investor-ready progress.
                                        </p>
                                    </div>

                                    <div className="absolute left-8 top-28 z-20 w-[280px] -rotate-[10deg] rounded-[2rem] bg-[var(--brutalist-orange)] p-8 text-white shadow-[0_18px_56px_rgba(255,61,0,0.22)]">
                                        <p className="text-6xl font-bold leading-none">+1</p>
                                        <p className="mt-4 text-[1.75rem] font-medium leading-tight">
                                            startup profile ready for discovery
                                        </p>
                                    </div>

                                    <div className="absolute bottom-0 right-4 z-30 w-[290px] -rotate-[7deg] rounded-[2rem] bg-[var(--brutalist-yellow)] p-8 text-[var(--brutalist-black)] shadow-[0_18px_56px_rgba(254,252,34,0.2)]">
                                        <p className="text-4xl font-semibold leading-none">
                                            Create monthly update
                                        </p>
                                        <p className="mt-4 text-xl leading-tight text-black/74">
                                            Start building your investor network by providing updates
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
