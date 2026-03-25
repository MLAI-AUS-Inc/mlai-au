import type { Route } from "./+types/hospital.app.coding";
import { redirect, Link } from "react-router";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";

export async function loader({ request, context }: Route.LoaderArgs) {
    const env = getEnv(context);
    const user = await getCurrentUser(env, request);
    if (!user) return redirect("/platform/login?app=hospital&next=/hospital/app/coding");
    return { user };
}

const NOTEBOOKS = [
    {
        number: 1,
        title: "Introduction & Data Tour",
        description: "Meet your data, learn about the challenge, and poke around those vitals.",
        url: "https://www.kaggle.com/code/mlaiaus/1-introduction-data-tour-public",
    },
    {
        number: 2,
        title: "Visualising the Chaos",
        description: "Plot heart rates and blood pressures, and see how to distinguish normal from bizarre.",
        url: "https://www.kaggle.com/code/mlaiaus/2-visualizing-the-chaos",
    },
    {
        number: 3,
        title: "Hello, Logistic Regression",
        description: "A simple model that just looks at one or two vitals — see how it guesses if someone's in crisis.",
        url: "https://www.kaggle.com/code/mlaiaus/3-hello-logistic-regression-public",
    },
    {
        number: 4,
        title: "Limits of a Simple Model",
        description: "Watch logistic regression struggle with complex patterns — time for a bigger model.",
        url: "https://www.kaggle.com/code/mlaiaus/4-limits-of-a-simple-model-public",
    },
    {
        number: 5,
        title: "Enter, Deep Neural Networks",
        description: "Build a small neural net to juggle all the vitals at once. Watch your accuracy skyrocket.",
        url: "https://www.kaggle.com/code/mlaiaus/5-enter-deep-neural-networks-public",
    },
    {
        number: 6,
        title: "Tuning & Advanced Tricks",
        description: "Add more features, tweak hyperparameters, handle time-series patterns more elegantly.",
        url: "https://www.kaggle.com/code/mlaiaus/6-my-deep-neural-network-says-you-re-fine",
    },
    {
        number: 7,
        title: "Submission & Scoring",
        description: "Learn how to submit your final predictions and see your name on the leaderboard!",
        url: "https://www.kaggle.com/code/mlaiaus/7-submission-and-scoring",
    },
];

const PATIENT_STATES = [
    {
        label: "Normal",
        value: 0,
        color: "bg-emerald-500/20 border-emerald-500/30 text-emerald-400",
        description: "Patient is fine — could be daydreaming or heading to the bathroom.",
    },
    {
        label: "Warning",
        value: 1,
        color: "bg-yellow-500/20 border-yellow-500/30 text-yellow-400",
        description: "Something's off; maybe early signs of a more serious event.",
    },
    {
        label: "Crisis",
        value: 2,
        color: "bg-red-500/20 border-red-500/30 text-red-400",
        description: "Full-blown emergency — patient needs immediate help.",
    },
    {
        label: "Death",
        value: 3,
        color: "bg-gray-500/20 border-gray-500/30 text-gray-400",
        description: "No coming back from this state.",
    },
];

const SCORING_ROWS = [
    {
        trueLabel: "Normal (0)",
        predictions: [
            { guess: "Normal", points: "0", style: "text-white/50" },
            { guess: "Warning", points: "-2", style: "text-red-400" },
            { guess: "Crisis", points: "-2", style: "text-red-400" },
        ],
    },
    {
        trueLabel: "Warning (1)",
        predictions: [
            { guess: "Normal", points: "-3", style: "text-red-400" },
            { guess: "Warning", points: "+2", style: "text-emerald-400" },
            { guess: "Crisis", points: "-1", style: "text-yellow-400" },
        ],
    },
    {
        trueLabel: "Crisis (2)",
        predictions: [
            { guess: "Normal", points: "-10", style: "text-red-400" },
            { guess: "Warning", points: "-3", style: "text-red-400" },
            { guess: "Crisis", points: "+3", style: "text-emerald-400" },
        ],
    },
];

const DATASETS = [
    {
        name: "Kaggle Competition",
        description: "Join the competition, download the beginner tract dataset, and submit your predictions.",
        url: "https://www.kaggle.com/competitions/medhack-frontiers",
        primary: true,
    },
    {
        name: "Big Tract Dataset 1",
        description: "Extended dataset for teams looking for a bigger challenge.",
        url: "https://www.kaggle.com/competitions/medhack-frontiers",
        primary: false,
    },
    {
        name: "Big Tract Dataset 2",
        description: "Additional dataset with more complex patient scenarios.",
        url: "https://www.kaggle.com/competitions/medhack-frontiers",
        primary: false,
    },
];

export default function HospitalAppCoding() {
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
                            Small Tract (Coding)
                        </h1>
                        <p className="mt-4 text-lg text-white/80 max-w-2xl leading-relaxed">
                            Build an AI that monitors simulated hospital patients and sounds the alarm when something
                            truly serious is happening. Follow our step-by-step notebooks from zero to deep neural networks.
                        </p>
                        <div className="flex flex-wrap gap-3 mt-6">
                            <a
                                href="https://www.kaggle.com/competitions/medhack-frontiers"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center rounded-md bg-white px-5 py-2.5 text-sm font-bold text-[#783f8e] transition-all hover:bg-white/90 hover:shadow-lg"
                            >
                                Go to Kaggle Competition
                            </a>
                            <Link
                                to="/hospital/app/submit"
                                className="inline-flex items-center rounded-md border-2 border-white/80 bg-transparent px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-white hover:text-[#783f8e]"
                            >
                                Submit Predictions
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Challenge Overview */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">The Challenge</h2>
                    <div className="space-y-4 text-white/70 leading-relaxed">
                        <p>
                            <strong className="text-white">Welcome to the AI General&apos;s Emergency Department!</strong> Funding
                            cuts and poor working conditions have left the hospital terribly short-staffed — but the patients
                            just keep pouring in.
                        </p>
                        <p>
                            Can you help this <em>simulated</em> hospital by building an AI that monitors patients and sounds
                            the alarm only when something truly serious is happening? If every beep is a &quot;Code Red,&quot; the
                            team will ignore them all!
                        </p>
                        <p>
                            Your job is to strike the perfect balance between saving lives (catching genuine emergencies)
                            and not overloading staff with false alarms.
                        </p>
                    </div>
                </div>

                {/* Data Overview + Patient States */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Data Overview */}
                    <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">The Data</h2>
                        <ul className="space-y-4">
                            <li className="flex gap-3 text-white/70">
                                <span className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-[#783f8e] flex items-center justify-center">
                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </span>
                                <span><strong className="text-white">5,000 patient records</strong> from the AI Hospital&apos;s emergency department.</span>
                            </li>
                            <li className="flex gap-3 text-white/70">
                                <span className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-[#783f8e] flex items-center justify-center">
                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </span>
                                <span><strong className="text-white">4 hours of vitals</strong> per patient, sampled every 5 seconds.</span>
                            </li>
                            <li className="flex gap-3 text-white/70">
                                <span className="flex-shrink-0 mt-1 h-5 w-5 rounded-full bg-[#783f8e] flex items-center justify-center">
                                    <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                                </span>
                                <span><strong className="text-white">100 test patients</strong> with hidden labels for your AI to predict.</span>
                            </li>
                        </ul>
                        <div className="mt-6 rounded-lg bg-[#110822] border border-[#e2a9f1]/10 p-4">
                            <p className="text-xs font-bold uppercase tracking-wider text-[#e2a9f1]/60 mb-2">Vitals Tracked</p>
                            <div className="flex flex-wrap gap-2">
                                {["heart_rate", "systolic_bp", "diastolic_bp", "respiratory_rate", "oxygen_saturation"].map((vital) => (
                                    <span key={vital} className="inline-flex items-center rounded-md bg-[#783f8e]/20 px-2.5 py-1 text-xs font-mono text-[#e2a9f1]">
                                        {vital}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Patient States */}
                    <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6">
                        <h2 className="text-2xl font-bold text-white mb-4">Patient States</h2>
                        <p className="text-sm text-white/60 mb-4">
                            Each 5-second snapshot of vitals is labelled with one of 4 states. Your AI must predict the correct state.
                        </p>
                        <div className="space-y-3">
                            {PATIENT_STATES.map((state) => (
                                <div key={state.value} className={`rounded-lg border p-4 ${state.color}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="text-lg font-black">{state.value}</span>
                                        <span className="font-bold">{state.label}</span>
                                    </div>
                                    <p className="mt-1 text-sm opacity-80">{state.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Scoring System */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Scoring System</h2>
                    <p className="text-sm text-white/60 mb-6">
                        Missing a crisis is far worse than raising a few false alarms. Your total score is the sum of points across all predictions.
                    </p>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-[#e2a9f1]/10">
                                    <th className="text-left py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#e2a9f1]/60">True Label</th>
                                    <th className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#e2a9f1]/60">Guess Normal</th>
                                    <th className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#e2a9f1]/60">Guess Warning</th>
                                    <th className="text-center py-3 px-4 text-xs font-bold uppercase tracking-wider text-[#e2a9f1]/60">Guess Crisis</th>
                                </tr>
                            </thead>
                            <tbody>
                                {SCORING_ROWS.map((row) => (
                                    <tr key={row.trueLabel} className="border-b border-[#e2a9f1]/5">
                                        <td className="py-3 px-4 font-semibold text-white">{row.trueLabel}</td>
                                        {row.predictions.map((pred) => (
                                            <td key={pred.guess} className={`py-3 px-4 text-center font-bold ${pred.style}`}>
                                                {pred.points}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Datasets */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Datasets</h2>
                    <p className="text-sm text-white/60 mb-6">
                        Download the datasets from Kaggle to train and test your model.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {DATASETS.map((ds) => (
                            <a
                                key={ds.name}
                                href={ds.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`rounded-xl border p-5 transition-all hover:shadow-lg ${
                                    ds.primary
                                        ? "border-[#e2a9f1]/30 bg-gradient-to-br from-[#783f8e]/30 to-[#5a2d6a]/20 hover:border-[#e2a9f1]/50"
                                        : "border-[#e2a9f1]/10 bg-[#110822]/60 hover:border-[#e2a9f1]/30"
                                }`}
                            >
                                <p className="font-bold text-white">{ds.name}</p>
                                <p className="mt-1 text-xs text-white/50">{ds.description}</p>
                                <span className="mt-3 inline-flex text-xs font-semibold text-[#e2a9f1]">
                                    Open on Kaggle &rarr;
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Learning Path */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-2">Learning Path</h2>
                    <p className="text-sm text-white/60 mb-6">
                        Follow our step-by-step notebooks from zero to deep neural networks. Already comfortable with AI? Jump straight to Notebook 7 to learn how to submit.
                    </p>
                    <div className="space-y-3">
                        {NOTEBOOKS.map((nb) => (
                            <a
                                key={nb.number}
                                href={nb.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="group flex items-start gap-4 rounded-xl border border-[#e2a9f1]/10 bg-[#110822]/40 p-4 transition-all hover:border-[#e2a9f1]/30 hover:bg-[#110822]/80"
                            >
                                <span className="flex-shrink-0 flex items-center justify-center h-8 w-8 rounded-lg bg-[#783f8e] text-white text-sm font-bold">
                                    {nb.number}
                                </span>
                                <div className="flex-1 min-w-0">
                                    <p className="font-semibold text-white group-hover:text-[#e2a9f1] transition-colors">
                                        {nb.title}
                                    </p>
                                    <p className="mt-0.5 text-sm text-white/50">{nb.description}</p>
                                </div>
                                <span className="hidden sm:inline-flex flex-shrink-0 text-xs font-semibold text-[#e2a9f1]/60 group-hover:text-[#e2a9f1] transition-colors mt-1">
                                    Open &rarr;
                                </span>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Your Task / How to Submit */}
                <div className="rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 p-6 sm:p-8">
                    <h2 className="text-2xl font-bold text-white mb-4">Your Task</h2>
                    <div className="space-y-4 text-white/70 leading-relaxed">
                        <p>
                            Train your AI on the 5,000 patient records. Once it has learned to spot patterns in the data,
                            we&apos;ll test it on <strong className="text-white">100 new patients</strong> it has never seen before.
                        </p>
                        <p>
                            Each 5-second window in the test data must be classified as <strong className="text-white">Normal</strong>,{" "}
                            <strong className="text-white">Warning</strong>, or <strong className="text-white">Crisis</strong>.
                            Upload your predictions CSV and see how you score on the leaderboard!
                        </p>
                    </div>
                    <div className="mt-6 flex flex-wrap gap-3">
                        <Link
                            to="/hospital/app/submit"
                            className="inline-flex items-center rounded-md bg-[#ff2d78] px-5 py-2.5 text-sm font-bold text-white transition-all hover:bg-[#ff4d8e] hover:shadow-[0_0_20px_rgba(255,45,120,0.4)]"
                        >
                            Go to Submissions
                        </Link>
                        <Link
                            to="/hospital/app/leaderboard"
                            className="inline-flex items-center rounded-md border border-[#e2a9f1]/20 px-5 py-2.5 text-sm font-semibold text-[#e2a9f1] transition-all hover:bg-[#e2a9f1]/10"
                        >
                            View Leaderboard
                        </Link>
                    </div>
                </div>

            </div>
        </main>
    );
}
