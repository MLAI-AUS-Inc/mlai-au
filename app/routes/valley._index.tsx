import { Link, useLoaderData, Form, useFetcher } from "react-router";
import { format, differenceInDays } from "date-fns";
import { useState } from "react";
import type { Route } from "./+types/valley._index";
import { getValleyUser } from "~/lib/valley-session";
import {
    ArrowRightIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    ChartBarIcon,
    PencilSquareIcon,
    SparklesIcon,
    HandThumbUpIcon,
    ChatBubbleLeftIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    PlusIcon,
    CalendarIcon,
    CheckCircleIcon,
    FunnelIcon,
    XMarkIcon,
    MagnifyingGlassIcon,
    AdjustmentsHorizontalIcon,
    EyeIcon,
    PaperAirplaneIcon,
    UsersIcon,
    LightBulbIcon,
    RocketLaunchIcon,
    TrophyIcon,
    HeartIcon,
    BoltIcon
} from "@heroicons/react/24/outline";

// Action to handle Likes, Comments, and Connection Requests
export async function action({ request }: Route.ActionArgs) {
    const user = getValleyUser(request);
    if (!user) return null;

    const formData = await request.formData();
    const intent = formData.get("intent");
    const updateId = formData.get("updateId")?.toString();

    const { toggleLike, addComment, sendConnectionRequest } = await import("~/lib/storage.server");

    if (intent === "like" && updateId) {
        await toggleLike(updateId, user.email);
        return { success: true };
    }

    if (intent === "comment" && updateId) {
        const content = formData.get("content")?.toString();
        if (content) {
            await addComment(updateId, user.email, user.fullName, content);
        }
        return { success: true };
    }

    if (intent === "connect") {
        const founderId = formData.get("founderId")?.toString();
        const founderName = formData.get("founderName")?.toString();
        const founderCompany = formData.get("founderCompany")?.toString();

        if (founderId && founderName && founderCompany && user.role === "investor") {
            try {
                await sendConnectionRequest(
                    founderId,
                    founderName,
                    founderCompany,
                    user.email,
                    user.fullName,
                    "I'd love to connect based on your recent update!"
                );
                return { success: true, connected: true };
            } catch (e) {
                return { success: false, error: "Already connected" };
            }
        }
    }

    if (intent === "connect_from_founder") {
        const investorId = formData.get("investorId")?.toString();
        const investorName = formData.get("investorName")?.toString();
        const founderCompany = formData.get("founderCompany")?.toString();

        if (investorId && investorName && founderCompany && user.role === "founder") {
            try {
                await sendConnectionRequest(
                    user.email,
                    user.fullName,
                    founderCompany,
                    investorId,
                    investorName,
                    "I'd like to connect regarding your comment."
                );
                return { success: true, connected: true };
            } catch (e) {
                return { success: false, error: "Already connected" };
            }
        }
    }

    return null;
}

export async function loader({ request }: Route.LoaderArgs) {
    const user = getValleyUser(request);
    const url = new URL(request.url);
    const showLanding = url.searchParams.get("view") === "landing";

    if (!user) return { user: null, updates: [], portfolioUpdates: [], showLanding: false };

    const { getUpdates } = await import("~/lib/storage.server");
    const allUpdatesRaw = await getUpdates();
    const allUpdates = [...allUpdatesRaw].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    const myUpdates = allUpdates;
    const portfolioUpdates = allUpdates;

    return { user, updates: myUpdates, portfolioUpdates, showLanding };
}

// ============================================
// LANDING PAGE FOR UNAUTHENTICATED USERS
// ============================================

function LandingPage({ user }: { user?: any } = {}) {
    return (
        <div className="bg-[var(--brutalist-beige)] min-h-screen">
            {/* Hero Section */}
            <section className="relative bg-[var(--brutalist-beige)] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
                <div className="max-w-7xl mx-auto text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-purple-50 border border-purple-200 rounded-full mb-6">
                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-purple-700">Coming soon</span>
                    </div>

                    <h1 className="text-4xl sm:text-5xl lg:text-7xl font-black text-gray-900 mb-6 tracking-tight">
                        Australia's first
                        <br />
                        <span className="text-purple-600">live startup directory</span>
                    </h1>

                    <p className="text-xl sm:text-2xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
                        Real-time insights. Exclusive data. Smarter connections.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            to="/valley/create-update"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                        >
                            Get Started as Founder
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                        <Link
                            to="/valley"
                            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 hover:bg-gray-800 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-xl text-lg"
                        >
                            Get Started as Investor
                            <ArrowRightIcon className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </section>

            {/* How It Works Section */}
            <section className="bg-[#4b0db3] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white text-center mb-16">
                        How it works
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-14 h-14 bg-[#ff6347] rounded-xl flex items-center justify-center mb-6">
                                <PaperAirplaneIcon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3">Founders share</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Regular updates keep profiles fresh and momentum visible.
                            </p>
                        </div>

                        {/* Card 2 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-14 h-14 bg-[#ff6347] rounded-xl flex items-center justify-center mb-6">
                                <UsersIcon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3">Investors discover</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Relevant, timely information about startups that match your thesis.
                            </p>
                        </div>

                        {/* Card 3 */}
                        <div className="bg-white rounded-2xl p-8 shadow-lg">
                            <div className="w-14 h-14 bg-[#ff6347] rounded-xl flex items-center justify-center mb-6">
                                <SparklesIcon className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3">Valley connects</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Unique data enables smarter, more meaningful introductions.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* For Investors Section */}
            <section className="bg-[var(--brutalist-beige)] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-3">
                            FOR INVESTORS & VCS
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
                            Source smarter. Save time.
                        </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Benefit 1 */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <ChartBarIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3">Exclusive data</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Access insights you won't find elsewhere—live metrics, growth signals, and founder updates that reveal real momentum.
                            </p>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <ClockIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3">Save hours sourcing</h3>
                            <p className="text-gray-600 leading-relaxed">
                                No more stale directories or outdated profiles. Valley surfaces active, fundable startups that match your investment thesis.
                            </p>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <LightBulbIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3">Better matching</h3>
                            <p className="text-gray-600 leading-relaxed">
                                Our unique data layer enables intelligent matching between investor preferences and startup trajectories.
                            </p>
                        </div>

                        {/* Benefit 4 */}
                        <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
                            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                <BoltIcon className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-black text-gray-900 mb-3">Early access</h3>
                            <p className="text-gray-600 leading-relaxed">
                                See emerging startups before they hit the mainstream radar. Get ahead of the deal flow.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* For Founders Section */}
            <section className="bg-[var(--brutalist-beige)] px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-12">
                        <p className="text-purple-600 font-bold text-sm uppercase tracking-wider mb-3">
                            FOR FOUNDERS
                        </p>
                        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900">
                            Your path to the right investors
                        </h2>
                    </div>

                    <div className="max-w-4xl mx-auto space-y-6">
                        {/* Benefit 1 */}
                        <div className="bg-white rounded-2xl p-8 border-l-4 border-purple-600 shadow-sm">
                            <h3 className="text-xl font-black text-gray-900 mb-2">
                                <span className="text-purple-600">Visibility that matters.</span>
                                {" "}Get discovered by investors actively looking for startups like yours.
                            </h3>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-white rounded-2xl p-8 border-l-4 border-purple-600 shadow-sm">
                            <h3 className="text-xl font-black text-gray-900 mb-2">
                                <span className="text-purple-600">Network access.</span>
                                {" "}Connect with our curated network of VCs, angels, and strategic investors.
                            </h3>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-white rounded-2xl p-8 border-l-4 border-purple-600 shadow-sm">
                            <h3 className="text-xl font-black text-gray-900 mb-2">
                                <span className="text-purple-600">Build in public.</span>
                                {" "}Share your journey and let your progress speak for itself.
                            </h3>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why We're Building This Section */}
            <section className="bg-[var(--brutalist-beige)] px-4 sm:px-6 lg:px-8 py-16 sm:py-24 pb-32">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 mb-8">
                        Why we're building this
                    </h2>

                    <p className="text-xl text-gray-600 mb-4 leading-relaxed">
                        Australia has incredible startups, but discovering them is hard.
                    </p>

                    <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                        Existing directories go stale. Opportunities get missed.
                    </p>

                    <p className="text-2xl sm:text-3xl font-black text-purple-600 leading-relaxed">
                        Valley makes freshness the core feature—not an afterthought.
                    </p>
                </div>
            </section>
        </div>
    );
}

// ============================================
// DASHBOARD COMPONENTS (UNCHANGED)
// ============================================

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

// Removed SwitchRoleButton

function LikeButton({ update, userEmail }: { update: any, userEmail: string }) {
    const fetcher = useFetcher();
    const isLiked = update.likes.includes(userEmail);
    const likeCount = update.likes.length;

    const isOptimisticLiked = fetcher.formData
        ? fetcher.formData.get("intent") === "like"
            ? !isLiked
            : isLiked
        : isLiked;

    let optimisticCount = likeCount;
    if (fetcher.formData && fetcher.formData.get("intent") === "like") {
        optimisticCount = isLiked ? likeCount - 1 : likeCount + 1;
    }

    return (
        <fetcher.Form method="POST">
            <input type="hidden" name="intent" value="like" />
            <input type="hidden" name="updateId" value={update.id} />
            <button
                type="submit"
                className={`flex items-center gap-2 transition-colors ${isOptimisticLiked ? "text-blue-600 font-bold" : "hover:text-gray-600"}`}
            >
                {isOptimisticLiked ? <HandThumbUpIcon className="w-5 h-5 fill-current" /> : <HandThumbUpIcon className="w-5 h-5" />}
                {optimisticCount}
            </button>
        </fetcher.Form>
    );
}

function ConnectButton({ update }: { update: any }) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const data = fetcher.data;
    const wasConnected = data?.connected || (data?.success === false && data?.error === "Already connected");

    if (wasConnected) {
        return (
            <span className="flex items-center gap-1.5 text-green-600 font-bold text-xs">
                <CheckCircleIcon className="w-4 h-4" />
                Request Sent!
            </span>
        );
    }

    return (
        <fetcher.Form method="POST">
            <input type="hidden" name="intent" value="connect" />
            <input type="hidden" name="founderId" value={update.founderName.toLowerCase().replace(' ', '.') + "@example.com"} />
            <input type="hidden" name="founderName" value={update.founderName} />
            <input type="hidden" name="founderCompany" value={update.companyName} />
            <button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center gap-1.5 px-3 py-1 bg-blue-50 text-blue-600 hover:bg-blue-100 text-xs font-bold rounded-md transition-colors disabled:opacity-50 border border-blue-200"
            >
                <UserGroupIcon className="w-4 h-4" />
                {isSubmitting ? "Connecting..." : "Request Connection"}
            </button>
        </fetcher.Form>
    );
}

function ConnectFromCommentButton({ comment, founderCompany }: { comment: any, founderCompany: string }) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const data = fetcher.data;
    const wasConnected = data?.connected || (data?.success === false && data?.error === "Already connected");

    if (wasConnected) {
        return (
            <span className="flex items-center gap-1 text-green-600 font-bold text-xs ml-2">
                <CheckCircleIcon className="w-4 h-4" />
                Sent
            </span>
        );
    }

    return (
        <fetcher.Form method="POST" className="ml-2">
            <input type="hidden" name="intent" value="connect_from_founder" />
            <input type="hidden" name="investorId" value={comment.userId} />
            <input type="hidden" name="investorName" value={comment.userName} />
            <input type="hidden" name="founderCompany" value={founderCompany} />

            <button
                type="submit"
                disabled={isSubmitting}
                className="text-xs bg-blue-100 hover:bg-blue-200 text-blue-700 px-2 py-1 rounded font-bold transition-colors disabled:opacity-50"
            >
                {isSubmitting ? "..." : "Connect"}
            </button>
        </fetcher.Form>
    );
}

function CommentSection({ update, user }: { update: any, user: any }) {
    const [isOpen, setIsOpen] = useState(false);
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    return (
        <div className="w-full">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-2 hover:text-gray-600 transition-colors"
            >
                <ChatBubbleLeftIcon className="w-5 h-5" />
                {update.comments.length}
            </button>

            {isOpen && (
                <div className="mt-4 pt-4 border-t border-gray-100 animate-in slide-in-from-top-2 duration-200">
                    <div className="space-y-4 mb-4 max-h-60 overflow-y-auto">
                        {update.comments.length === 0 && (
                            <p className="text-sm text-gray-400 italic">No comments yet. Be the first!</p>
                        )}
                        {update.comments.map((comment: any) => (
                            <div key={comment.id} className="flex gap-3 text-sm">
                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-500 flex-shrink-0">
                                    {comment.userName[0]}
                                </div>
                                <div className="bg-gray-50 rounded-lg p-3 w-full">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center">
                                            <span className="font-bold text-gray-900">{comment.userName}</span>
                                            {user.role === 'founder' && comment.userId !== user.email && (
                                                <ConnectFromCommentButton comment={comment} founderCompany={user.companyName} />
                                            )}
                                        </div>
                                        <span className="text-xs text-gray-400">{format(new Date(comment.createdAt), "MMM d")}</span>
                                    </div>
                                    <p className="text-gray-700 mt-1">{comment.content}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <fetcher.Form method="POST" className="flex gap-2">
                        <input type="hidden" name="intent" value="comment" />
                        <input type="hidden" name="updateId" value={update.id} />
                        <input
                            name="content"
                            type="text"
                            placeholder="Write a comment..."
                            required
                            className="flex-1 px-4 py-2 bg-gray-50 border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 disabled:opacity-50"
                        >
                            Send
                        </button>
                    </fetcher.Form>
                </div>
            )}
        </div>
    );
}

function FounderDashboard({ user, updates }: { user: any, updates: any[] }) {
    const firstName = user.fullName.split(' ')[0];
    const hasUpdates = updates.length > 0;

    const latestUpdate = hasUpdates ? updates[0] : null;
    const daysSinceLast = latestUpdate ? differenceInDays(new Date(), new Date(latestUpdate.date)) : 0;
    const isOverdue = daysSinceLast > 21;
    const daysOverdue = daysSinceLast - 21;

    if (!hasUpdates) {
        return (
            <>
                <div className="max-w-4xl mx-auto space-y-12 py-8">
                    <div className="text-center relative">
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
            </>
        );
    }

    return (
        <>
            <div className="space-y-8 pb-12">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Your Monthly Updates</h1>
                        <p className="text-gray-500 mt-1">Share progress with your investors</p>
                    </div>
                    <div className="flex items-center gap-4">
                        {!isOverdue && (
                            <Link
                                to="/valley/create-update"
                                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <PlusIcon className="w-4 h-4" />
                                Create Update
                            </Link>
                        )}
                    </div>
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
                                    <Link
                                        to={`/valley/create-update?edit=${update.id}`}
                                        className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 hover:bg-blue-50 text-gray-600 hover:text-blue-600 rounded-lg transition-colors font-bold text-xs"
                                    >
                                        <PencilSquareIcon className="w-4 h-4" />
                                        Edit
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

                            <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-start gap-6 text-sm font-bold text-gray-400 flex-col sm:flex-row">
                                <div className="flex items-center gap-6">
                                    <LikeButton update={update} userEmail={user.email} />
                                </div>
                                <div className="flex-1 w-full">
                                    <CommentSection update={update} user={user} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

function FilterModal({
    isOpen,
    onClose,
    selectedIndustries,
    selectedStages,
    onApply
}: {
    isOpen: boolean;
    onClose: () => void;
    selectedIndustries: string[];
    selectedStages: string[];
    onApply: (industries: string[], stages: string[]) => void;
}) {
    const [tempIndustries, setTempIndustries] = useState<string[]>(selectedIndustries);
    const [tempStages, setTempStages] = useState<string[]>(selectedStages);

    if (!isOpen) return null;

    const INDUSTRIES = ["SaaS", "HealthTech", "FinTech", "EdTech", "E-commerce", "AI/ML", "Blockchain", "CleanTech", "FoodTech", "PropTech"];
    const STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth"];

    const toggleIndustry = (item: string) => {
        if (tempIndustries.includes(item)) {
            setTempIndustries(tempIndustries.filter(i => i !== item));
        } else {
            setTempIndustries([...tempIndustries, item]);
        }
    };

    const toggleStage = (item: string) => {
        if (tempStages.includes(item)) {
            setTempStages(tempStages.filter(s => s !== item));
        } else {
            setTempStages([...tempStages, item]);
        }
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={onClose} />
            <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl relative z-10 overflow-hidden flex flex-col max-h-[90vh]">
                <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
                    <div className="flex items-center gap-2 text-lg font-bold text-gray-900">
                        <FunnelIcon className="w-5 h-5" />
                        Filter Updates
                    </div>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600 p-1">
                        <XMarkIcon className="w-6 h-6" />
                    </button>
                </div>

                <div className="p-8 overflow-y-auto flex-1">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Industry</h3>
                            <div className="space-y-3">
                                {INDUSTRIES.map(item => (
                                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${tempIndustries.includes(item)
                                            ? "bg-blue-600 border-blue-600"
                                            : "border-gray-300 bg-white group-hover:border-blue-400"
                                            }`}>
                                            {tempIndustries.includes(item) && <CheckCircleIcon className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <span className="text-gray-600">{item}</span>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={tempIndustries.includes(item)}
                                            onChange={() => toggleIndustry(item)}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h3 className="font-bold text-gray-900 mb-4">Stage</h3>
                            <div className="space-y-3">
                                {STAGES.map(item => (
                                    <label key={item} className="flex items-center gap-3 cursor-pointer group">
                                        <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${tempStages.includes(item)
                                            ? "bg-blue-600 border-blue-600"
                                            : "border-gray-300 bg-white group-hover:border-blue-400"
                                            }`}>
                                            {tempStages.includes(item) && <CheckCircleIcon className="w-3.5 h-3.5 text-white" />}
                                        </div>
                                        <span className="text-gray-600">{item}</span>
                                        <input
                                            type="checkbox"
                                            className="hidden"
                                            checked={tempStages.includes(item)}
                                            onChange={() => toggleStage(item)}
                                        />
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="px-6 py-4 border-t border-gray-100 bg-gray-50 flex items-center justify-between">
                    <button
                        onClick={() => { setTempIndustries([]); setTempStages([]); }}
                        className="text-gray-500 font-medium hover:text-gray-800 px-2 py-1"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={() => onApply(tempIndustries, tempStages)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm transition-colors"
                    >
                        Apply Filters
                    </button>
                </div>
            </div>
        </div>
    );
}

// Removed SidebarFooter and navigation - now handled in layout

function InvestorDashboard({ portfolioUpdates, user }: { portfolioUpdates: any[], user: any }) {
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [selectedIndustries, setSelectedIndustries] = useState<string[]>([]);
    const [selectedStages, setSelectedStages] = useState<string[]>([]);

    const INDUSTRIES = ["SaaS", "HealthTech", "FinTech", "EdTech", "E-commerce", "AI/ML", "Blockchain", "CleanTech", "FoodTech", "PropTech"];
    const STAGES = ["Pre-Seed", "Seed", "Series A", "Series B", "Series C+", "Growth"];

    const toggleIndustry = (item: string) => {
        if (selectedIndustries.includes(item)) {
            setSelectedIndustries(selectedIndustries.filter(i => i !== item));
        } else {
            setSelectedIndustries([...selectedIndustries, item]);
        }
    };

    const toggleStage = (item: string) => {
        if (selectedStages.includes(item)) {
            setSelectedStages(selectedStages.filter(s => s !== item));
        } else {
            setSelectedStages([...selectedStages, item]);
        }
    };

    const activeFilterCount = selectedIndustries.length + selectedStages.length;

    const filteredUpdates = portfolioUpdates.filter(update => {
        const industryMatch = selectedIndustries.length === 0 || (update.industry && selectedIndustries.includes(update.industry));
        const stageMatch = selectedStages.length === 0 || (update.stage && selectedStages.includes(update.stage));
        return industryMatch && stageMatch;
    });

    return (
        <>
            <div className="space-y-8 pb-12">
                <FilterModal
                    isOpen={isFilterOpen}
                    onClose={() => setIsFilterOpen(false)}
                    selectedIndustries={selectedIndustries}
                    selectedStages={selectedStages}
                    onApply={(industries, stages) => {
                        setSelectedIndustries(industries);
                        setSelectedStages(stages);
                        setIsFilterOpen(false);
                    }}
                />

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">Portfolio Updates</h1>
                        <p className="text-gray-500 mt-1">Stay connected with your portfolio companies</p>
                    </div>
                </div>

                <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white shadow-lg relative overflow-hidden">
                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-90">
                            <EyeIcon className="w-5 h-5" />
                            Free Preview Mode
                        </div>
                        <p className="text-lg">
                            You've viewed <span className="font-bold">0 of 3</span> free monthly updates. Upgrade to view unlimited updates!
                        </p>
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

                <div className="flex gap-4 flex-col sm:flex-row">
                    <div className="flex-1 relative">
                        <MagnifyingGlassIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search by company or founder name..."
                            className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all font-medium"
                        />
                    </div>
                    <button
                        onClick={() => setIsFilterOpen(true)}
                        className={`px-6 py-3 border rounded-xl font-bold flex items-center gap-2 transition-colors ${activeFilterCount > 0
                            ? "bg-blue-50 border-blue-200 text-blue-600"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50"
                            }`}
                    >
                        <AdjustmentsHorizontalIcon className="w-5 h-5" />
                        Filter Updates
                        {activeFilterCount > 0 && (
                            <span className="ml-1 bg-blue-600 text-white text-xs px-2 py-0.5 rounded-full">{activeFilterCount}</span>
                        )}
                    </button>
                </div>

                <div className="space-y-6">
                    {filteredUpdates.length === 0 ? (
                        <div className="text-center py-12 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                            <FunnelIcon className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                            <h3 className="text-lg font-bold text-gray-900">No updates match your filters</h3>
                            <p className="text-gray-500">Try adjusting your industry or stage selection.</p>
                            <button
                                onClick={() => { setSelectedIndustries([]); setSelectedStages([]); }}
                                className="mt-4 text-blue-600 font-bold hover:underline"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        filteredUpdates.map((update) => (
                            <div key={update.id} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="h-12 w-12 rounded-lg bg-gray-100 flex items-center justify-center text-xl font-black text-gray-400">
                                            {update.companyName[0]}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900">{update.companyName}</h3>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <p className="text-sm text-gray-500 font-medium">{update.founderName}</p>
                                                <ConnectButton update={update} />
                                            </div>
                                            <Link
                                                to={`/valley/history/${encodeURIComponent(update.companyName)}`}
                                                className="text-xs text-blue-600 font-bold mt-1 flex items-center gap-1 hover:underline"
                                            >
                                                <ClockIcon className="w-3 h-3" />
                                                View Update History
                                            </Link>
                                        </div>
                                    </div>
                                    <div className="flex flex-col items-end gap-1">
                                        <div className="text-sm text-gray-400 font-medium flex items-center gap-1.5">
                                            <CalendarIcon className="w-4 h-4" />
                                            {format(new Date(update.date), "MMMM yyyy")}
                                        </div>
                                        {(update.industry || update.stage) && (
                                            <div className="flex gap-2 mt-1">
                                                {update.industry && <span className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full font-medium">{update.industry}</span>}
                                                {update.stage && <span className="text-xs px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full font-medium">{update.stage}</span>}
                                            </div>
                                        )}
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

                                <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex items-start gap-6 text-sm font-bold text-gray-400 flex-col sm:flex-row">
                                    <div className="flex items-center gap-6">
                                        <LikeButton update={update} userEmail={user.email} />
                                    </div>
                                    <div className="flex-1 w-full">
                                        <CommentSection update={update} user={user} />
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}

export default function ValleyHome() {
    const { user, updates, portfolioUpdates, showLanding } = useLoaderData<typeof loader>();

    // Show landing page if strictly requested via ?view=landing OR if unauthenticated
    if (showLanding || !user) {
        return <LandingPage user={user} />;
    }

    // Show appropriate dashboard for authenticated users
    if (user.role === 'investor') {
        return <InvestorDashboard portfolioUpdates={portfolioUpdates} user={user} />;
    }

    return <FounderDashboard user={user} updates={updates} />;
}
