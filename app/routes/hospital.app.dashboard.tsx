import type { Route } from "./+types/hospital.app.dashboard";
import { redirect, useLoaderData, Link } from "react-router";
import { getEnv } from "~/lib/env.server";
import { getCurrentUser, getHospitalRecentSubmissions } from "~/lib/auth";
import { getAnnouncements } from "~/services/hackathon";
import { DocumentArrowUpIcon, UsersIcon, InformationCircleIcon } from "@heroicons/react/24/outline";
import Announcements, { type Announcement } from "~/components/Announcements";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) {
        return redirect("/platform/login?app=hospital&next=/hospital/app");
    }

    let announcements: Announcement[] = [];
    try {
        announcements = await getAnnouncements(env, request, "hospital");
    } catch (error) {
        console.error("Failed to fetch announcements:", error);
    }

    const hasTeam = !!(user.hospital_team || user.team);
    let latestScore: number | null = null;
    if (hasTeam) {
        try {
            const recent = await getHospitalRecentSubmissions(env, request);
            if (Array.isArray(recent) && recent.length > 0) {
                latestScore = recent[0].score;
            }
        } catch (error) {
            console.error("Failed to fetch recent submissions:", error);
        }
    }

    return { user, announcements, latestScore, hasTeam };
}

const MEDHACK_LOGO = "https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/Team%20Formation%20Night%20Slides%20(2).png?alt=media&token=5a1b7fb7-6dd4-4699-9d88-d8db97ff68db";

export default function HospitalAppDashboard() {
    const { user, announcements, latestScore, hasTeam } = useLoaderData<typeof loader>();

    return (
        <div className="min-h-screen bg-[#110822] p-4 sm:p-6">
            <div className="w-full mx-auto space-y-6">

                {/* Hero Banner */}
                <div className="relative overflow-visible rounded-2xl border border-[#e2a9f1]/30 shadow-[0_0_40px_rgba(226,169,241,0.12)] mt-16 lg:mt-20">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#783f8e] via-[#5a2d6a] to-[#2d1245]" />
                    <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-[#e2a9f1]/20 blur-3xl" />
                    <div className="absolute -bottom-10 right-1/3 h-40 w-40 rounded-full bg-[#ff69b4]/15 blur-3xl" />
                    <div className="absolute top-10 right-10 h-32 w-32 rounded-full bg-[#e2a9f1]/10 blur-2xl" />
                    <div
                        className="absolute inset-0 rounded-2xl opacity-[0.04]"
                        style={{
                            backgroundImage: 'linear-gradient(rgba(255,255,255,.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.3) 1px, transparent 1px)',
                            backgroundSize: '40px 40px',
                        }}
                    />
                    {/* Background image on right side — fades in from left */}
                    <div
                        className="hidden lg:block absolute right-0 top-0 bottom-0 w-[55%] z-[1] rounded-r-2xl overflow-hidden"
                        style={{
                            WebkitMaskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,1) 60%)',
                            maskImage: 'linear-gradient(to right, transparent 0%, rgba(0,0,0,0.4) 20%, rgba(0,0,0,0.85) 40%, rgba(0,0,0,1) 60%)',
                        }}
                    >
                        <img
                            src="https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/Screenshot%202026-02-20%20at%2011.43.40%E2%80%AFAM%20(1).png?alt=media&token=53c45f5e-419a-45d0-a23b-08b96d3a47e1"
                            alt=""
                            className="h-full w-full object-cover object-center brightness-110 saturate-[1.3]"
                        />
                    </div>
                    <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-end gap-4 sm:gap-6 p-5 sm:p-8 lg:p-12">
                        <div className="flex-1 space-y-3 sm:space-y-4">
                            <div className="flex items-center gap-3 sm:gap-4">
                                <img src={MEDHACK_LOGO} alt="" className="h-12 sm:h-16 lg:h-20" />
                                <div>
                                    <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-none tracking-tight">
                                        MEDHACK:<br />FRONTIERS
                                    </h1>
                                </div>
                            </div>
                            <p className="text-sm sm:text-lg font-bold text-white/90 tracking-widest uppercase">
                                The Future of Healthcare
                            </p>
                            <div className="flex flex-wrap gap-2 sm:gap-3 pt-2">
                                <a
                                    href="https://www.eventbrite.com.au/o/mlai-machine-learning-ai-61498883493"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-md border-2 border-white/80 bg-transparent px-3 sm:px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[#783f8e]"
                                >
                                    Hackathon Tickets
                                </a>
                                <a
                                    href="https://www.eventbrite.com.au/o/mlai-machine-learning-ai-61498883493"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-md border-2 border-white/80 bg-transparent px-3 sm:px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[#783f8e]"
                                >
                                    Pitch Night Tickets
                                </a>
                                <Link
                                    to="/medhack"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1.5 rounded-md border-2 border-white/80 bg-transparent px-3 sm:px-5 py-2 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white transition-all hover:bg-white hover:text-[#783f8e]"
                                >
                                    <InformationCircleIcon className="h-4 w-4" />
                                    Info Pack
                                </Link>
                            </div>
                        </div>
                        {/* Girls image — bottom-aligned, heads overflow above hero */}
                        <div className="hidden lg:block absolute right-8 bottom-0 z-20">
                            <img
                                src="https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/LAST%20CHANCE%20TO%20REGISTER%20(1).png?alt=media&token=50ec1b74-f1a5-48a5-a5ee-8238d034169d"
                                alt="MedHack participants"
                                className="h-[26rem] w-auto object-contain object-bottom drop-shadow-[0_0_25px_rgba(226,169,241,0.3)]"
                            />
                        </div>
                    </div>
                </div>

                {/* Second Row */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Info / Welcome Card */}
                    <div className="lg:col-span-3 relative overflow-hidden rounded-2xl border border-[#e2a9f1]/30 shadow-[0_0_30px_rgba(226,169,241,0.1)]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[#783f8e] via-[#5a2d6a] to-[#3a1a50]" />
                        <div className="absolute -bottom-10 -right-10 h-48 w-48 rounded-full bg-[#e2a9f1]/15 blur-3xl" />
                        <div className="relative z-10 p-5 sm:p-8">
                            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
                                MEDHACK: FRONTIERS
                            </h2>
                            <p className="mt-1 text-lg font-bold text-[#ff69b4] tracking-wider uppercase">
                                The Future of Healthcare
                            </p>
                            <p className="mt-4 text-base text-white/80 max-w-xl leading-relaxed">
                                Join us to build the future of medicine. Whether you're tackling AI for
                                the first time or building a game-changing solution, we've got you covered.
                            </p>
                        </div>
                    </div>

                    {/* Submissions Card */}
                    <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 shadow-[0_0_20px_rgba(226,169,241,0.06)]">
                        <div className="absolute -top-8 -right-8 h-32 w-32 rounded-full bg-[#783f8e]/20 blur-2xl" />
                        <div className="relative z-10 flex h-full flex-col p-6">
                            <div className="flex items-center gap-3">
                                <DocumentArrowUpIcon className="h-8 w-8 text-[#e2a9f1]" />
                                <h3 className="text-xl font-black text-white uppercase tracking-wide">
                                    Submissions
                                </h3>
                            </div>
                            <p className="mt-3 text-sm text-white/70 leading-relaxed flex-1">
                                Submissions are now open! Upload your predictions and see how you rank.
                            </p>
                            {latestScore !== null && (
                                <div className="mt-3 rounded-lg bg-[#e2a9f1]/10 border border-[#e2a9f1]/20 px-4 py-3">
                                    <p className="text-xs text-[#e2a9f1]/70 uppercase tracking-wide">Latest Score</p>
                                    <p className="text-2xl font-black text-white">{typeof latestScore === 'number' ? latestScore.toFixed(2) : latestScore}</p>
                                </div>
                            )}
                            <Link
                                to="/hospital/app/submit"
                                className="mt-4 block w-full rounded-lg bg-[#ff2d78] py-3 text-center text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#ff4d8e] hover:shadow-[0_0_20px_rgba(255,45,120,0.4)]"
                            >
                                Go to Submissions
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Third Row */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                    {/* Leaderboard Card */}
                    <div className="lg:col-span-3 relative overflow-hidden rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 shadow-[0_0_20px_rgba(226,169,241,0.06)]">
                        <div className="absolute -bottom-8 -left-8 h-32 w-32 rounded-full bg-[#783f8e]/20 blur-2xl" />
                        <div className="relative z-10 p-5 sm:p-6">
                            <h3 className="text-lg sm:text-xl font-black text-white tracking-wide">
                                Leaderboard: Top Teams
                            </h3>

                            <div className="mt-6 flex items-end gap-6">
                                <div className="flex items-end">
                                    {/* 2nd Place */}
                                    <div className="flex flex-col items-center">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/Team%20Formation%20Night%20Slides%20(2).png?alt=media&token=5a1b7fb7-6dd4-4699-9d88-d8db97ff68db"
                                            alt="2nd place"
                                            className="h-12 w-12 rounded-full object-cover ring-2 ring-[#e2a9f1]/40 bg-[#783f8e]/40"
                                        />
                                        <div className="mt-1.5 flex h-10 w-16 items-center justify-center rounded-l-lg bg-[#2a1540]/80 border border-[#e2a9f1]/10">
                                            <span className="text-lg font-black text-white/70">2</span>
                                        </div>
                                    </div>
                                    {/* 1st Place */}
                                    <div className="flex flex-col items-center -mx-px">
                                        <img
                                            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/MLAI-Logo.png?alt=media&token=9d844530-e3b5-4944-a1c7-5be3112d5d84"
                                            alt="1st place"
                                            className="h-14 w-14 rounded-full object-cover ring-2 ring-[#e2a9f1]/60 shadow-[0_0_12px_rgba(226,169,241,0.4)] bg-[#783f8e]/60"
                                        />
                                        <div className="mt-1.5 flex h-14 w-16 items-center justify-center bg-gradient-to-b from-[#783f8e]/80 via-[#5a2d6a]/60 to-[#3a8eff]/30 border border-[#e2a9f1]/20 shadow-[0_0_20px_rgba(120,63,142,0.4)]">
                                            <span className="text-xl font-black text-white">1</span>
                                        </div>
                                    </div>
                                    {/* 3rd Place */}
                                    <div className="flex flex-col items-center">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#783f8e]/30 ring-2 ring-[#e2a9f1]/20">
                                            <span className="text-sm font-bold text-white/60">?</span>
                                        </div>
                                        <div className="mt-1.5 flex h-8 w-16 items-center justify-center rounded-r-lg bg-[#2a1540]/60 border border-[#e2a9f1]/10">
                                            <span className="text-lg font-black text-white/50">3</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex-1 hidden sm:block">
                                    <svg viewBox="0 0 200 80" className="w-full h-20" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="pinkLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#ff69b4" stopOpacity="0.1" />
                                                <stop offset="50%" stopColor="#ff69b4" stopOpacity="0.6" />
                                                <stop offset="100%" stopColor="#ff69b4" stopOpacity="0.8" />
                                            </linearGradient>
                                            <linearGradient id="cyanLine" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="0%" stopColor="#67e8f9" stopOpacity="0.1" />
                                                <stop offset="50%" stopColor="#67e8f9" stopOpacity="0.6" />
                                                <stop offset="100%" stopColor="#67e8f9" stopOpacity="0.9" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M 0 60 Q 30 70, 60 50 T 120 55 T 180 30 L 200 35"
                                            fill="none"
                                            stroke="url(#pinkLine)"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />
                                        <path
                                            d="M 0 45 Q 40 55, 80 35 T 150 25 L 200 10"
                                            fill="none"
                                            stroke="url(#cyanLine)"
                                            strokeWidth="2.5"
                                            strokeLinecap="round"
                                        />
                                        <circle cx="150" cy="25" r="4" fill="#67e8f9" opacity="0.9" />
                                        <circle cx="150" cy="25" r="8" fill="#67e8f9" opacity="0.15" />
                                    </svg>
                                </div>
                            </div>

                            <p className="mt-4 text-center text-sm text-white/50">
                                Submissions are open — compete to claim the top spot!
                            </p>

                            <Link
                                to="/hospital/app/leaderboard"
                                className="mt-4 block w-full rounded-lg border border-[#e2a9f1]/20 py-2.5 text-center text-sm font-semibold text-[#e2a9f1] transition-all hover:bg-[#e2a9f1]/10"
                            >
                                View Full Leaderboard
                            </Link>
                        </div>
                    </div>

                    {/* My Team Card */}
                    <div className="lg:col-span-2 relative overflow-hidden rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 shadow-[0_0_20px_rgba(226,169,241,0.06)]">
                        <div className="absolute -bottom-8 -right-8 h-32 w-32 rounded-full bg-[#783f8e]/20 blur-2xl" />
                        <div className="relative z-10 flex h-full flex-col p-6">
                            <div className="flex items-center gap-3">
                                <UsersIcon className="h-8 w-8 text-[#e2a9f1]" />
                                <h3 className="text-xl font-black text-white uppercase tracking-wide">
                                    My Team
                                </h3>
                            </div>
                            <p className="mt-3 text-sm text-white/70 leading-relaxed flex-1">
                                {hasTeam
                                    ? "Manage your team, update your profile, and coordinate with teammates."
                                    : "Create or join a team to start competing."}
                            </p>
                            <Link
                                to="/hospital/app/team"
                                className="mt-4 block w-full rounded-lg bg-[#ff2d78] py-3 text-center text-sm font-bold uppercase tracking-wider text-white transition-all hover:bg-[#ff4d8e] hover:shadow-[0_0_20px_rgba(255,45,120,0.4)]"
                            >
                                Go to Team Management
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Announcements Section */}
                {announcements.length > 0 && (
                    <div className="rounded-2xl border border-[#e2a9f1]/20 overflow-hidden">
                        <Announcements announcements={announcements} />
                    </div>
                )}

                {/* Sponsors Section */}
                <div className="relative overflow-hidden rounded-2xl border border-[#e2a9f1]/15 bg-[#1a0e2e]/60">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#783f8e]/10 via-transparent to-[#783f8e]/10" />
                    <div className="relative z-10 px-6 py-6">
                        <p className="text-center text-sm font-semibold uppercase tracking-widest text-white/40 mb-6">
                            Sponsored by
                        </p>
                        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                            {[
                                { name: 'Stone & Chalk', logo: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/supporter%20logos%2F8.png?alt=media&token=eaf9c16d-7937-434f-9b83-18c83b5fe6a5' },
                                { name: 'Monash University (MIME)', logo: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/supporter%20logos%2F12.png?alt=media&token=310d1f9c-b1f8-482f-9a2e-ba8840a901a4' },
                                { name: 'MedTech Actuator', logo: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/supporter%20logos%2F13.png?alt=media&token=ab0f1919-1d21-4cb9-8608-c612440c3c63' },
                                { name: 'The Product Bus', logo: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/supporter%20logos%2F26.png?alt=media&token=9fd6b65a-2ebf-44a4-ace8-1125ce2f4d58' },
                                { name: 'StartSpace', logo: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/supporter%20logos%2F27.png?alt=media&token=1ed732ae-08fb-4428-a960-4756f164f7c8' },
                                { name: 'Heidi Health', logo: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/supporter%20logos%2F10.png?alt=media&token=cbf2dd35-4891-4f66-b39a-b2b76cc46a90' },
                                { name: 'Lyrebird Health', logo: 'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/supporter%20logos%2F11.png?alt=media&token=374416cd-666f-4f4c-bfd0-e0488e92108b' },
                            ].map((sponsor) => (
                                <div key={sponsor.name} className="flex items-center justify-center">
                                    <img
                                        src={sponsor.logo}
                                        alt={sponsor.name}
                                        className="h-8 sm:h-10 w-auto object-contain brightness-0 invert opacity-70 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
