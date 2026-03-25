import { useState } from "react";

const AI_HOSPITAL_STATIC = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Screenshot%202025-11-25%20at%2011.24.04%E2%80%AFam.png?alt=media&token=b23e69c8-f0c7-4f76-8439-49ae8056c987";
const AI_HOSPITAL_GIF = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/20251007_1211_01k6y2wqafe0bv634b3m6jkb47-ezgif.com-optimize.gif?alt=media&token=0e011323-1c97-4287-815e-3acc35344d22";
const ESAFETY_STATIC = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Gemini_Generated_Image_3lirg63lirg63lir-min.jpg?alt=media&token=714825f8-44bf-4ad3-ad5c-561c9dc0d504";
const ESAFETY_GIF = "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Hipster_Office_Evil_Grin_Video-ezgif.com-resize%20(1).gif?alt=media&token=02219364-f849-4578-b112-08e18e2f21e3";

export default function Hackathons() {
    const [hoveredCard, setHoveredCard] = useState<string | null>(null);

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            {/* Preload GIFs */}
            <img src={AI_HOSPITAL_GIF} alt="" className="hidden" />
            <img src={ESAFETY_GIF} alt="" className="hidden" />
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Choose Your Hackathon
                    </h1>
                    <p className="mt-4 text-xl text-gray-500">
                        Select a hackathon to log in and access your dashboard.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12 max-w-5xl mx-auto">
                    {/* Medhack: Frontiers Card — Active */}
                    <a
                        href="/platform/login?app=hospital&next=/hospital/app"
                        className="group relative aspect-video overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
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
                            <h3 className="text-2xl font-bold">Medhack: Frontiers</h3>
                            <p className="mt-2 text-sm text-gray-200">
                                Revolutionizing healthcare with AI. Join us to build the future of medicine.
                            </p>
                        </div>
                    </a>

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
                    <div className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-600 via-indigo-600 to-slate-900 shadow-2xl">
                        <div className="grid gap-8 px-8 py-10 md:grid-cols-[1.4fr_0.8fr] md:px-12 md:py-12">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.24em] text-blue-100/80">
                                    Founder Updates
                                </p>
                                <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                    Open the Vibe Raising app
                                </h2>
                                <p className="mt-4 max-w-2xl text-base text-blue-100/90 sm:text-lg">
                                    Log in with your MLAI account to share monthly founder updates, manage your startup profile, and unlock investor discovery inside Vibe Raising.
                                </p>
                            </div>

                            <div className="flex items-center md:justify-end">
                                <a
                                    href="/platform/login?app=vibe-raising&next=/vibe-raising"
                                    className="inline-flex w-full items-center justify-center rounded-2xl bg-white px-6 py-4 text-base font-semibold text-slate-900 shadow-lg transition-transform duration-200 hover:-translate-y-0.5 hover:bg-blue-50 md:w-auto"
                                >
                                    Go to Vibe Raising
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
