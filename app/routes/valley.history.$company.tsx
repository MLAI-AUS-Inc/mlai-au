import { Link, useLoaderData, useFetcher } from "react-router";
import { format } from "date-fns";
import { getValleyUser } from "~/lib/valley-session";
import {
    ArrowLeftIcon,
    CalendarIcon,
    ChartBarIcon,
    CurrencyDollarIcon,
    UserGroupIcon,
    SparklesIcon,
    ExclamationTriangleIcon,
    ClockIcon,
    CheckCircleIcon
} from "@heroicons/react/24/outline";

export async function loader({ request, params }: any) {
    const user = getValleyUser(request);
    if (!user || user.role !== 'investor') {
        // Redirect if not authorized (simple check)
        // return redirect("/valley"); 
    }

    const companyName = params.company;
    const { getUpdates } = await import("~/lib/storage.server");
    const allUpdates = await getUpdates();

    const companyUpdates = allUpdates
        .filter(u => u.companyName === companyName)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { companyUpdates, companyName, user };
}

export async function action({ request }: any) {
    const user = getValleyUser(request);
    if (!user || user.role !== "investor") return null;

    const formData = await request.formData();
    const intent = formData.get("intent");

    if (intent === "connect") {
        const { sendConnectionRequest } = await import("~/lib/storage.server");
        const founderId = formData.get("founderId")?.toString();
        const founderName = formData.get("founderName")?.toString();
        const founderCompany = formData.get("founderCompany")?.toString();

        if (founderId && founderName && founderCompany) {
            try {
                await sendConnectionRequest(
                    founderId,
                    founderName,
                    founderCompany,
                    user.email,
                    user.fullName,
                    "I'd love to connect based on your history!"
                );
                return { success: true, connected: true };
            } catch (e) {
                return { success: false, error: "Already connected" };
            }
        }
    }
    return null;
}

function MetricCard({ label, value, icon: Icon, colorClass }: { label: string, value: string, icon: any, colorClass: string }) {
    return (
        <div className={`${colorClass} rounded-lg p-3 border`}>
            <p className="text-xs font-medium flex items-center gap-1 mb-1 opacity-80">
                <Icon className="w-3.5 h-3.5" /> {label}
            </p>
            <p className="text-lg font-bold text-gray-900">{value}</p>
        </div>
    );
}

function ConnectButton({ companyName, founderName }: { companyName: string, founderName: string }) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";
    const data = fetcher.data;
    const wasConnected = data?.connected || (data?.success === false && data?.error === "Already connected");

    if (wasConnected) {
        return (
            <span className="flex items-center gap-2 text-green-600 font-bold text-sm px-6 py-3 bg-green-50 rounded-b-xl border-t border-green-100 w-full">
                <CheckCircleIcon className="w-5 h-5" />
                Request Sent!
            </span>
        );
    }

    return (
        <fetcher.Form method="POST" className="w-full">
            <input type="hidden" name="intent" value="connect" />
            <input type="hidden" name="founderId" value={founderName.toLowerCase().replace(' ', '.') + "@example.com"} />
            <input type="hidden" name="founderName" value={founderName} />
            <input type="hidden" name="founderCompany" value={companyName} />
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-gray-50 hover:bg-blue-50 text-gray-600 hover:text-blue-600 font-bold text-sm border-t border-gray-100 transition-colors disabled:opacity-50"
            >
                <UserGroupIcon className="w-4 h-4" />
                {isSubmitting ? "Connecting..." : "Request Connection"}
            </button>
        </fetcher.Form>
    );
}

export default function CompanyHistory() {
    const { companyUpdates, companyName, user } = useLoaderData<typeof loader>();

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <div className="mb-8">
                <Link to="/valley" className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 mb-4 transition-colors">
                    <ArrowLeftIcon className="w-4 h-4" />
                    Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">{companyName}</h1>
                <p className="text-gray-500">Update History</p>
            </div>

            {companyUpdates.length === 0 ? (
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-12 text-center border border-blue-100">
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <ClockIcon className="w-8 h-8 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No Updates Yet</h3>
                    <p className="text-gray-600 max-w-md mx-auto">
                        This founder hasn't published any previous updates yet. Stay tuned for their first monthly update!
                    </p>
                </div>
            ) : (
                <div className="relative border-l-2 border-gray-200 ml-4 space-y-12">
                    {companyUpdates.map((update, idx) => (
                        <div key={update.id} className="relative pl-8">
                            {/* Timeline Dot */}
                            <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-600 border-4 border-white shadow-sm" />

                            <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900">{update.title}</h3>
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                                            <CalendarIcon className="w-4 h-4" />
                                            {format(new Date(update.date), "MMMM d, yyyy")}
                                        </div>
                                    </div>
                                    {idx === 0 && (
                                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">
                                            Latest
                                        </span>
                                    )}
                                </div>

                                <div className="p-6 space-y-6">
                                    {/* Metrics */}
                                    <div className="grid grid-cols-3 gap-4">
                                        <MetricCard label="Revenue" value={update.metrics.revenue} icon={CurrencyDollarIcon} colorClass="bg-green-50/50 border-green-100" />
                                        <MetricCard label="Growth" value={update.metrics.growth} icon={ChartBarIcon} colorClass="bg-blue-50/50 border-blue-100" />
                                        <MetricCard label="Users" value={update.metrics.users} icon={UserGroupIcon} colorClass="bg-purple-50/50 border-purple-100" />
                                    </div>

                                    {/* Highlights/Challenges */}
                                    <div className="grid grid-cols-1 gap-6">
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70">
                                                <SparklesIcon className="w-4 h-4 text-yellow-500" />
                                                Highlights
                                            </h4>
                                            <p className="text-gray-700 text-sm leading-relaxed bg-yellow-50/30 p-4 rounded-lg border border-yellow-100/50">
                                                {update.highlights}
                                            </p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2 text-sm uppercase tracking-wide opacity-70">
                                                <ExclamationTriangleIcon className="w-4 h-4 text-orange-500" />
                                                Challenges
                                            </h4>
                                            <p className="text-gray-700 text-sm leading-relaxed bg-orange-50/30 p-4 rounded-lg border border-orange-100/50">
                                                {update.challenges}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Connection Button */}
                                <ConnectButton companyName={update.companyName} founderName={update.founderName} />
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
