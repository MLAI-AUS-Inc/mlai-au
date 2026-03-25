import type { Route } from "./+types/hospital.app.pitching";
import { redirect, Link } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import { MEDHACK_JUDGING_CRITERIA } from "~/data/medhack-frontiers";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) return redirect("/platform/login?app=hospital&next=/hospital/app/pitching");
    return { user };
}

const DATASETS = [
    {
        name: "Advanced Tract Dataset 1",
        description: "Real de-identified EMR data to explore and build your solution around.",
        url: "https://kaggle.com/datasets/4dbfe5ed9320db06fc60bdf33aa2d604e15773c4e992e9e090e630c9bafb5384",
    },
    {
        name: "Advanced Tract Dataset 2",
        description: "Additional dataset with more complex patient scenarios.",
        url: "https://kaggle.com/datasets/dd6cc7f5d00dc22cfa6d500202a2ca774155cd7a49bfd3bcbe2aba1ab99082c4",
    },
];

const STEPS = [
    {
        number: 1,
        title: "Interview Mentors",
        description:
            "Talk to the healthcare pros, tech specialists, design gurus, and startup veterans. Understand the pain points and gather initial feedback on your idea.",
    },
    {
        number: 2,
        title: "Identify & Define the Problem",
        description:
            "Use the discovery phase of the double diamond (empathize, then define). Zero in on a specific challenge that\u2019s both impactful and solvable within the hackathon timeline.",
    },
    {
        number: 3,
        title: "Ideate & Prototype (Diverge & Converge)",
        description:
            "During the second diamond, brainstorm a broad range of solutions (diverge), then pick the most promising concept to prototype (converge). Keep it simple and focused\u2014an MVP or mockup is enough to illustrate your vision.",
    },
    {
        number: 4,
        title: "Test & Iterate",
        description:
            "Gather feedback from mentors and potential end-users. Refine your solution, making sure it meets real needs and is feasible.",
    },
    {
        number: 5,
        title: "Pitch Perfectly",
        description:
            "Prepare a concise pitch that tells a compelling story: the problem you\u2019re solving, who benefits, how your solution works, and why it\u2019s better than existing approaches.",
    },
];

const WINNERS = [
    {
        place: '1st Place',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/Screenshot%202026-02-02%20at%2011.11.22%E2%80%AFAM.jpg?alt=media&token=9011d94f-4897-46d1-a0c4-274f1ada05f3',
        videoId: '4CETnnpIq0I',
    },
    {
        place: '2nd Place',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/Screenshot%202026-02-02%20at%2011.12.37%E2%80%AFAM.jpg?alt=media&token=3f60a856-5318-4ffa-bc33-0d6a364ac430',
        videoId: '5JoT56Gzcm4',
    },
    {
        place: '3rd Place',
        thumbnail: 'https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/Screenshot%202026-02-02%20at%2011.12.24%E2%80%AFAM.jpg?alt=media&token=5fb1d47d-7d8b-4163-a101-3e98e8222310',
        videoId: 'IiC4-i-znjU',
    },
];

const MENTOR_TYPES = [
    {
        label: "Healthcare pros",
        description: "who understand patient care, hospital workflows, and clinical pain points.",
    },
    {
        label: "Tech specialists",
        description: "who know the best tools, platforms, and coding resources.",
    },
    {
        label: "Design gurus",
        description: "who can guide you to create user-friendly, visually appealing solutions.",
    },
    {
        label: "Startup veterans",
        description: "who\u2019ve walked the walk when it comes to pitching, scaling, and launching new ideas.",
    },
];

export default function HospitalAppPitching() {
    const totalScore = MEDHACK_JUDGING_CRITERIA.reduce((sum, c) => sum + c.maxScore, 0);

    return (
        <main className="min-h-screen bg-[#110822] px-4 sm:px-6 lg:px-8 py-8">
            <div className="mx-auto max-w-5xl space-y-8">

                {/* Hero */}
                <div className="relative overflow-hidden rounded-2xl border border-[#e2a9f1]/30 shadow-[0_0_40px_rgba(226,169,241,0.12)]">
                    <div className="absolute inset-0 bg-gradient-to-r from-[#783f8e] via-[#5a2d6a] to-[#2d1245]" />
                    <div className="absolute -top-20 -left-20 h-60 w-60 rounded-full bg-[#e2a9f1]/20 blur-3xl" />
                    <div className="absolute -bottom-10 right-1/3 h-40 w-40 rounded-full bg-[#ff69b4]/15 blur-3xl" />
                    <div className="relative z-10 p-8 lg:p-12">
                        <p className="text-sm font-bold uppercase tracking-widest text-[#e2a9f1]">MedHack: Frontiers 2026</p>
                        <h1 className="mt-2 text-3xl lg:text-4xl font-black text-white tracking-tight">
                            Big Tract (Pitching)
                        </h1>
                        <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed">
                            Feeling ambitious? Ready to dive into a real-world healthcare challenge and come up with a
                            solution&mdash;tech, process, or otherwise? The Advanced Tract might be less about coding and more
                            about teamwork, creativity, and planning. Bonus: there&apos;s a bigger prize at the end!
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6">
                            {DATASETS.map((ds) => (
                                <a
                                    key={ds.name}
                                    href={ds.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center rounded-md border-2 border-white/80 bg-transparent px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#783f8e]"
                                >
                                    {ds.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* What's This All About? */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">What&apos;s This All About?</h2>
                    <div className="space-y-4 text-white/70 leading-relaxed">
                        <p>
                            In the Advanced Tract, you and your team will identify a healthcare challenge, brainstorm a solution,
                            build a small demo or MVP, and then pitch your idea to our panel of judges on{" "}
                            <strong className="text-white">Pitch Night (March 4)</strong>. Don&apos;t be intimidated by the word
                            &quot;Advanced&quot;&mdash;it&apos;s not necessarily harder from a technical standpoint, but it does take
                            more time, research, and collaboration.
                        </p>
                        <p>
                            Remember: <strong className="text-white">your solution can be anything</strong>&mdash;it doesn&apos;t have
                            to be code. It could be a new hospital workflow, a hardware device, a novel way to schedule patients,
                            or any other brilliant idea that tackles a real healthcare challenge. As long as it addresses a user
                            need and meets the judging criteria, you&apos;ll score high.
                        </p>
                    </div>
                </div>

                {/* How to Win the Advanced Track */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">How to Win the Advanced Track</h2>
                    <p className="text-sm text-white/60 mb-6">
                        This process aligns with the <em>Double Diamond</em> framework: Discover, Define, Develop, and Deliver.
                        It&apos;s all about understanding user needs deeply, exploring multiple ideas, then refining and honing
                        in on the solution with the biggest potential impact.
                    </p>
                    <div className="space-y-3">
                        {STEPS.map((step) => (
                            <div
                                key={step.number}
                                className="flex items-start gap-4 rounded-xl border border-[#e2a9f1]/10 bg-[#110822]/40 p-4"
                            >
                                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-[#783f8e] text-white text-sm font-bold">
                                    {step.number}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white">{step.title}</p>
                                    <p className="mt-0.5 text-sm text-white/50">{step.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Mentors: Your Secret Weapons */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Mentors: Your Secret Weapons</h2>
                    <p className="text-sm text-white/60 mb-6">
                        We have mentors ready to help you. They come from various backgrounds:
                    </p>
                    <div className="space-y-3">
                        {MENTOR_TYPES.map((mentor) => (
                            <div
                                key={mentor.label}
                                className="flex items-start gap-3 text-white/70"
                            >
                                <span className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-[#783f8e] flex items-center justify-center">
                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </span>
                                <span>
                                    <strong className="text-white">{mentor.label}</strong> {mentor.description}
                                </span>
                            </div>
                        ))}
                    </div>
                    <p className="mt-6 text-sm text-white/50">
                        Tap into their expertise! Ask questions, refine your idea, and let them poke holes in your
                        plan&mdash;so your final solution is stronger than ever.
                    </p>
                </div>

                {/* Judging Criteria */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Judging Criteria</h2>
                    <p className="text-sm text-white/60 mb-6">
                        Your pitch will be assessed across {MEDHACK_JUDGING_CRITERIA.length} categories totalling {totalScore} points.
                        Not all criteria are weighted equally.
                    </p>
                    <div className="overflow-x-auto mb-6">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[#e2a9f1]/10">
                                    <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#e2a9f1]/60">Category</th>
                                    <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#e2a9f1]/60">Description</th>
                                    <th className="text-right py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#e2a9f1]/60">Max Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {MEDHACK_JUDGING_CRITERIA.map((c) => (
                                    <tr key={c.name} className="border-b border-[#e2a9f1]/5">
                                        <td className="py-3 px-4 font-semibold text-white">{c.name}</td>
                                        <td className="py-3 px-4 text-white/50 text-sm">{c.description}</td>
                                        <td className="py-3 px-4 text-right text-[#e2a9f1] font-bold">/{c.maxScore}</td>
                                    </tr>
                                ))}
                                <tr>
                                    <td className="py-3 px-4 font-bold text-white">Total</td>
                                    <td className="py-3 px-4" />
                                    <td className="py-3 px-4 text-right text-[#e2a9f1] font-bold">/{totalScore}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <p className="text-sm text-white/50">
                        Scores between semifinal judges are normalised to ensure fairness across judging panels.
                    </p>
                </div>

                {/* Pitch Night */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Pitch Night</h2>
                    <div className="space-y-4 text-white/70 leading-relaxed">
                        <p>
                            Pitch Night is on <strong className="text-white">Wednesday 4th March</strong> at{" "}
                            <strong className="text-white">Monash College City Campus, Docklands</strong>. The most promising teams
                            from their video submissions are selected to pitch live to judges, investors, and a live audience.
                        </p>
                        <p>
                            We&apos;ll give you resources on how to craft your pitch, so even if you&apos;ve never done one before, no
                            worries. You&apos;ll present your idea, show off your demo, and (hopefully) impress the judges!
                        </p>
                    </div>
                </div>

                {/* Last Year's Winners */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Last Year&apos;s Winners</h2>
                    <p className="text-sm text-white/60 mb-6">
                        Watch the winning pitches from last year&apos;s hackathon to see what the judges loved.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {WINNERS.map((w) => (
                            <a
                                key={w.videoId}
                                href={`https://www.youtube.com/watch?v=${w.videoId}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group relative overflow-hidden rounded-xl border border-[#e2a9f1]/10 bg-[#110822]/40 transition-all hover:border-[#e2a9f1]/30 hover:shadow-lg"
                            >
                                <div className="relative aspect-video">
                                    <img
                                        src={w.thumbnail}
                                        alt={`${w.place} pitch`}
                                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                                    />
                                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 group-hover:bg-black/20 transition-colors">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 shadow-lg group-hover:scale-110 transition-transform">
                                            <svg className="h-5 w-5 text-[#783f8e] ml-0.5" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M6.3 2.841A1.5 1.5 0 004 4.11v11.78a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="p-3">
                                    <p className="text-sm font-bold text-white">{w.place}</p>
                                    <p className="text-xs text-[#e2a9f1]/60 group-hover:text-[#e2a9f1] transition-colors">
                                        Watch on YouTube &rarr;
                                    </p>
                                </div>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Big Prize, Bigger Impact */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Big Prize, Bigger Impact</h2>
                    <div className="space-y-4 text-white/70 leading-relaxed">
                        <p>
                            The Advanced Tract has a <strong className="text-white">large prize</strong> at stake, but the real win
                            is creating a solution that could genuinely help patients, providers, and entire health systems.
                            Think outside the box, collaborate with your amazing team, and show us what you&apos;ve got!
                        </p>
                    </div>
                </div>

                {/* Final Words */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Final Words</h2>
                    <div className="space-y-4 text-white/70 leading-relaxed">
                        <p>
                            If you&apos;re itching to create real-world impact and love brainstorming solutions, this is your jam.
                            Yes, it&apos;s more work and collaboration&mdash;but you&apos;ll gain invaluable experience, meet incredible
                            mentors, and might just change lives in the process.
                        </p>
                        <p>
                            Now get out there, dream big, and have fun tackling the world&apos;s healthcare challenges head-on.
                            We can&apos;t wait to see what you come up with!
                        </p>
                    </div>
                    <div className="mt-6">
                        <Link
                            to="/articles/featured/how-to-pitch-your-idea"
                            className="inline-flex items-center rounded-md bg-[#ff2d78] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#ff4d8e] hover:shadow-[0_0_20px_rgba(255,45,120,0.4)]"
                        >
                            Learn How to Pitch Your Idea
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
