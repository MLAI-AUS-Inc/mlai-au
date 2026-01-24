import { Link, useLoaderData } from "react-router";
import { format, differenceInDays } from "date-fns";
import type { Route } from "./+types/valley._index";
import { getValleyUser } from "~/lib/valley-session";
import {
    ArrowRightIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    ChartBarIcon,
    PencilSquareIcon,
    SparklesIcon,
    HandRaisedIcon,
    HandThumbUpIcon,
    ChatBubbleLeftIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    PlusIcon,
    CalendarIcon,
    EyeIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    LockClosedIcon
} from "@heroicons/react/24/outline";

export async function loader({ request }: Route.LoaderArgs) {
    const user = getValleyUser(request);
    if (!user) return { user: null, updates: [], portfolioUpdates: [] };

    const cookieHeader = request.headers.get("Cookie") || "";
    const hasSubmitted = cookieHeader.includes("valley_submitted=true");

    // Founder Mock Data
    const mockUpdates = hasSubmitted ? [
        {
            id: 1,
            title: "Test",
            score: "A+",
            date: new Date().toISOString(),
            metrics: {
                revenue: "$127,500",
                growth: "18%",
                users: "3,420"
            },
            highlights: "Closed 3 new enterprise deals with Fortune 500 companies totaling $75K ARR. Launched new dashboard feature which increased user engagement by 32%. Featured in TechCrunch - drove 1,200+ signups. Team grew to 8 people with new Head of Sales joining.",
            challenges: "Customer onboarding time is averaging 14 days vs target of 7 days. Need to streamline our implementation process. CAC increased to $850 this month due to increased competition in paid channels.",
            asks: "Looking for introductions to VP of Customer Success at B2B SaaS companies to help optimize our onboarding process. Would appreciate feedback on our pricing strategy as we move upmarket.",
            likes: 0,
            comments: 0
        }
    ] : [];

    // Investor Mock Data
    const portfolioUpdates = [
        {
            id: 'p1',
            companyName: "TechFlow",
            founderName: "Sarah Chen",
            date: "2025-12-01T00:00:00.000Z",
            metrics: {
                revenue: "$45,000",
                growth: "23%",
                users: "1,250"
            },
            highlights: "Reached product-market fit in the enterprise segment. Major partnership signed with Global Solutions Ltd.",
            likes: 4,
            comments: 2
        }
    ];

    return { user, updates: mockUpdates, portfolioUpdates };
}

// Reuseable Components
function MetricCard({ label, value, icon: Icon, colorClass }: { label: string, value: string, icon: any, colorClass: string }) {
    return (
        <div className={`${colorClass} rounded-lg p-4 border`}>
            <p className="text-xs font-medium flex items-center gap-1 mb-1 opacity-80">
                <Icon className="w-3.5 h-3.5" /> {label}
            </p>
            <p className="text-xl font-bold text-gray-900">{value}</p>
        </div>
    );
}

// 1. Founder Dashboard View
function FounderDashboard({ user, updates }: { user: any, updates: any[] }) {
    const firstName = user.fullName.split(' ')[0];
    const hasUpdates = updates.length > 0;

    const latestUpdate = hasUpdates ? updates[0] : null;
    const daysSinceLast = latestUpdate ? differenceInDays(new Date(), new Date(latestUpdate.date)) : 0;
    const isOverdue = daysSinceLast > 21;
    const daysOverdue = daysSinceLast - 21;

    if (!hasUpdates) {
        return (
            <div className="max-w-4xl mx-auto space-y-12 py-8">
                <div className="text-center">
                    <span className="inline-block px-4 py-1.5 bg-blue-50 text-blue-600 text-sm font-semibold rounded-full mb-6 border border-blue-100">
                        Welcome to Valley
                    </span>
                    <h1 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">
                        Welcome, {firstName}! 👋
                    </h1>
                    <p className="text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed">
                        Transform how you communicate with investors through consistent monthly updates.
                    </p>
                    <Link
                        to="/valley/create-update"
                        className="inline-flex items-center gap-3 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98]"
                    >
                        Create Your First Update
                        <ArrowRightIcon className="w-5 h-5" />
                    </Link>
                </div>

                <div className="bg-blue-50/50 rounded-3xl p-12 border border-blue-100/50">
                    <h2 className="text-2xl font-bold text-gray-900 text-center mb-12">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            { step: 1, title: "Create Your Update" },
                            { step: 2, title: "Get AI Feedback" },
                            { step: 3, title: "Engage with Investors" }
                        ].map((item) => (
                            <div key={item.step} className="text-center space-y-4">
                                <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-md">
                                    {item.step}
                                </div>
                                <p className="font-bold text-gray-900">{item.title}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-white rounded-2xl p-10 border border-red-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative">
                    <div className="flex items-start gap-5">
                        <div className="mt-1 p-2 bg-red-50 rounded-lg">
                            <ExclamationTriangleIcon className="w-7 h-7 text-red-500" />
                        </div>
                        <div className="space-y-4">
                            <h2 className="text-2xl font-bold text-gray-900">Why Startups Fail</h2>
                            <p className="text-gray-600 leading-relaxed text-lg">
                                Investors value consistency and transparency. When updates only appear at "wow" moments,
                                it creates distance rather than confidence. By the time a company urgently needs capital,
                                investors hesitate—not because the vision isn't exciting, but because the relationship
                                hasn't been built. Regular, honest monthly updates turn progress into trust, and trust
                                into continued support.
                            </p>
                        </div>
                    </div>
                    <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-red-400 rounded-l-2xl" />
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-12">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Your Monthly Updates</h1>
                    <p className="text-gray-500 mt-1">Share progress with your investors</p>
                </div>
                <Link
                    to="/valley/create-update"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                    <PlusIcon className="w-4 h-4" />
                    Create Update
                </Link>
            </div>

            {isOverdue && (
                <div className="bg-orange-50 border border-orange-200 rounded-xl p-6 shadow-sm relative overflow-hidden">
                    <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div className="flex items-start gap-4">
                            <div className="p-3 bg-white rounded-full border border-orange-100 shadow-sm text-orange-500">
                                <ClockIcon className="w-8 h-8" />
                            </div>
                            <div>
                                <div className="flex items-center gap-3 mb-1">
                                    <h2 className="text-lg font-bold text-gray-900">Time for Your Monthly Update!</h2>
                                    <span className="px-2.5 py-0.5 bg-orange-200 text-orange-800 text-xs font-bold rounded-full">
                                        {daysOverdue} days overdue
                                    </span>
                                </div>
                                <p className="text-gray-700 mb-4">
                                    Your last update was on <span className="font-semibold">{format(new Date(latestUpdate!.date), "MMMM d, yyyy")}</span>.
                                    Keep your investors engaged with your latest progress!
                                </p>
                            </div>
                        </div>
                        <Link
                            to="/valley/create-update"
                            className="px-6 py-3 bg-orange-600 text-white font-bold rounded-lg hover:bg-orange-700 transition-colors shadow-sm whitespace-nowrap"
                        >
                            Create Update Now
                        </Link>
                    </div>
                </div>
            )}

            <div className="space-y-6">
                {updates.map((update) => (
                    <div key={update.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center text-lg font-bold text-blue-600">
                                    {update.title[0]}
                                </div>
                                <div>
                                    <div className="flex items-center gap-3">
                                        <h3 className="text-lg font-bold text-gray-900">{update.title}</h3>
                                        <span className="px-2.5 py-0.5 bg-purple-100 text-purple-700 text-xs font-bold rounded-full">
                                            AI Score: {update.score}
                                        </span>
                                    </div>
                                    <p className="text-sm text-gray-500">{user.fullName}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 text-gray-400">
                                <div className="flex items-center gap-1.5 text-sm">
                                    <CalendarIcon className="w-4 h-4" />
                                    {format(new Date(update.date), "MMMM yyyy")}
                                </div>
                                <Link to={`/valley/create-update?edit=${update.id}`} className="hover:text-gray-600">
                                    <PencilSquareIcon className="w-5 h-5" />
                                </Link>
                            </div>
                        </div>

                        <div className="p-6 space-y-8">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <MetricCard label="Revenue" value={update.metrics.revenue} icon={CurrencyDollarIcon} colorClass="bg-green-50/50 border-green-100" />
                                <MetricCard label="Growth" value={update.metrics.growth} icon={ChartBarIcon} colorClass="bg-blue-50/50 border-blue-100" />
                                <MetricCard label="Users" value={update.metrics.users} icon={UserGroupIcon} colorClass="bg-purple-50/50 border-purple-100" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <SparklesIcon className="w-5 h-5 text-yellow-500" />
                                    Highlights
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm">{update.highlights}</p>
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <ExclamationTriangleIcon className="w-5 h-5 text-orange-500" />
                                    Challenges
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm">{update.challenges}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// 2. Investor Dashboard View
function InvestorDashboard({ portfolioUpdates }: { portfolioUpdates: any[] }) {
    return (
        <div className="space-y-8 pb-12">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Portfolio Updates</h1>
                <p className="text-gray-500 mt-1">Stay connected with your portfolio companies</p>
            </div>

            {/* Free Preview Mode Banner */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                <div className="relative z-10 space-y-4">
                    <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-90">
                        <EyeIcon className="w-5 h-5" />
                        Free Preview Mode
                    </div>
                    <p className="text-lg">
                        You've viewed <span className="font-bold">0 of 3</span> free monthly updates. Upgrade to view unlimited updates!
                    </p>
                    {/* Progress Bar */}
                    <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-white h-full w-[5%]" />
                    </div>
                    <button className="bg-white text-blue-600 px-6 py-2.5 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors hover:bg-blue-50">
                        <SparklesIcon className="w-4 h-4" />
                        Upgrade for $8.99/month
                    </button>
                </div>
                <div className="absolute -right-12 -bottom-12 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
            </div>

            {/* Search and Filter */}
            <div className="flex gap-4">
                <div className="flex-1 relative">
                    <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search by company or founder name..."
                        className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                    />
                </div>
                <button className="px-6 py-3 border border-gray-200 rounded-xl font-bold text-gray-600 flex items-center gap-2 hover:bg-gray-50 transition-colors">
                    <AdjustmentsHorizontalIcon className="w-5 h-5 text-gray-400" />
                    Filter Updates
                    <LockClosedIcon className="w-4 h-4 text-gray-400" />
                </button>
            </div>

            {/* Portfolio List */}
            <div className="space-y-6">
                {portfolioUpdates.map((update) => (
                    <div key={update.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                        <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                            <div className="flex items-center gap-4">
                                <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-black text-gray-400">
                                    {update.companyName[0]}
                                </div>
                                <div>
                                    <h3 className="text-lg font-bold text-gray-900">{update.companyName}</h3>
                                    <p className="text-sm text-gray-500 font-medium">{update.founderName}</p>
                                    <p className="text-xs text-orange-600 font-bold mt-1 flex items-center gap-1">
                                        <LockClosedIcon className="w-3 h-3" />
                                        Update History (Premium Only)
                                    </p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400 font-medium flex items-center gap-1.5">
                                <CalendarIcon className="w-4 h-4" />
                                {format(new Date(update.date), "MMMM yyyy")}
                            </div>
                        </div>

                        <div className="p-6 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <MetricCard label="Revenue" value={update.metrics.revenue} icon={CurrencyDollarIcon} colorClass="bg-green-50/50 border-green-100" />
                                <MetricCard label="Growth" value={update.metrics.growth} icon={ChartBarIcon} colorClass="bg-blue-50/50 border-blue-100" />
                                <MetricCard label="Users" value={update.metrics.users} icon={UserGroupIcon} colorClass="bg-purple-50/50 border-purple-100" />
                            </div>
                            <div>
                                <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
                                    <SparklesIcon className="w-5 h-5 text-yellow-500" />
                                    Highlights
                                </h4>
                                <p className="text-gray-600 leading-relaxed text-sm">{update.highlights}</p>
                            </div>
                        </div>

                        <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-center gap-6 text-sm font-bold text-gray-400">
                            <button className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                                <HandThumbUpIcon className="w-5 h-5" />
                                {update.likes}
                            </button>
                            <button className="flex items-center gap-2 hover:text-gray-600 transition-colors">
                                <ChatBubbleLeftIcon className="w-5 h-5" />
                                {update.comments}
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default function ValleyHome() {
    const { user, updates, portfolioUpdates } = useLoaderData<typeof loader>();
    if (!user) return null;

    if (user.role === 'investor') {
        return <InvestorDashboard portfolioUpdates={portfolioUpdates} />;
    }

    return <FounderDashboard user={user} updates={updates} />;
}
