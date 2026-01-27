import { useLoaderData, useFetcher, redirect, Form } from "react-router";
import { useState } from "react";
import { format } from "date-fns";
import { getValleyUser } from "~/lib/valley-session";
import {
    CheckCircleIcon,
    XMarkIcon,
    CurrencyDollarIcon,
    ChartBarIcon,
    UserGroupIcon,
    BuildingOffice2Icon
} from "@heroicons/react/24/outline";

export async function loader({ request }: any) {
    const user = getValleyUser(request);
    if (!user) {
        return redirect("/valley");
    }

    const { getConnectionRequests } = await import("~/lib/storage.server");
    const requests = await getConnectionRequests(user.email, user.role);

    return { user, requests };
}

export async function action({ request }: any) {
    const formData = await request.formData();
    const intent = formData.get("intent");
    const requestId = formData.get("requestId")?.toString();

    if (!requestId) return null;

    const { updateConnectionStatus } = await import("~/lib/storage.server");

    if (intent === "accept") {
        await updateConnectionStatus(requestId, 'accepted');
        return { success: true };
    }

    if (intent === "reject") {
        await updateConnectionStatus(requestId, 'rejected');
        return { success: true };
    }

    return null;
}

function AcceptButton({ requestId }: { requestId: string }) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    return (
        <fetcher.Form method="POST" className="flex-1">
            <input type="hidden" name="intent" value="accept" />
            <input type="hidden" name="requestId" value={requestId} />
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
                <CheckCircleIcon className="w-5 h-5" />
                Accept Connection
            </button>
        </fetcher.Form>
    );
}

function DeclineButton({ requestId }: { requestId: string }) {
    const fetcher = useFetcher();
    const isSubmitting = fetcher.state === "submitting";

    return (
        <fetcher.Form method="POST" className="flex-1">
            <input type="hidden" name="intent" value="reject" />
            <input type="hidden" name="requestId" value={requestId} />
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:opacity-50"
            >
                <XMarkIcon className="w-5 h-5" />
                Decline
            </button>
        </fetcher.Form>
    );
}

// Request Card matching the design
function RequestCard({ request }: { request: any }) {
    return (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-4">
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div className="flex gap-4">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-lg">
                        {request.founderName.split(' ').map((n: string) => n[0]).join('')}
                    </div>
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">{request.founderName}</h3>
                        <div className="flex items-center gap-1 text-sm text-gray-500">
                            <BuildingOffice2Icon className="w-4 h-4" />
                            {request.founderCompany}
                        </div>
                    </div>
                </div>
                <span className="text-xs text-gray-400 font-medium">
                    {format(new Date(request.createdAt), "dd/MM/yyyy")}
                </span>
            </div>

            {/* Match Reason Banner */}
            {request.matchReason && (
                <div className="bg-blue-50/50 border border-blue-100 rounded-lg p-4 mb-4">
                    <p className="text-sm">
                        <span className="font-bold text-blue-800">Why this match:</span>{" "}
                        <span className="text-blue-600">{request.matchReason}</span>
                    </p>

                    {/* Metrics Integration (inside the banner or below? Design shows inside/below context) */
                     /* Based on screenshot, metrics are inside the blue container? actually looks like inside. Let's try that. */}

                    {request.metrics && (
                        <div className="grid grid-cols-3 gap-4 mt-4 bg-white rounded-lg p-3 border border-blue-100/50 shadow-sm">
                            <div>
                                <p className="text-xs font-bold text-green-600 mb-0.5 flex items-center gap-1">
                                    <CurrencyDollarIcon className="w-3 h-3" /> Revenue
                                </p>
                                <p className="text-sm font-bold text-gray-900">{request.metrics.revenue}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-blue-600 mb-0.5 flex items-center gap-1">
                                    <ChartBarIcon className="w-3 h-3" /> Growth
                                </p>
                                <p className="text-sm font-bold text-gray-900">{request.metrics.growth}</p>
                            </div>
                            <div>
                                <p className="text-xs font-bold text-purple-600 mb-0.5 flex items-center gap-1">
                                    <UserGroupIcon className="w-3 h-3" /> Users
                                </p>
                                <p className="text-sm font-bold text-gray-900">{request.metrics.users}</p>
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Actions */}
            <div className="flex gap-4">
                <AcceptButton requestId={request.id} />
                <DeclineButton requestId={request.id} />
            </div>
        </div>
    );
}

export default function Connections() {
    const { user, requests } = useLoaderData<typeof loader>();
    const [activeTab, setActiveTab] = useState<'requests' | 'connections'>('requests');

    if (!user) return null;

    const pendingRequests = requests.filter((r: any) => r.status === 'pending');
    const acceptedRequests = requests.filter((r: any) => r.status === 'accepted');

    return (
        <div className="max-w-4xl mx-auto pb-12">
            {/* Header */}
            <div className="border-b border-gray-200 mb-8">
                <div className="flex gap-8">
                    <button
                        onClick={() => setActiveTab('requests')}
                        className={`pb-4 px-1 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'requests'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        Connection Requests
                        {pendingRequests.length > 0 && (
                            <span className="bg-red-500 text-white text-xs px-1.5 py-0.5 rounded-full">
                                {pendingRequests.length}
                            </span>
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('connections')}
                        className={`pb-4 px-1 text-sm font-bold flex items-center gap-2 border-b-2 transition-colors ${activeTab === 'connections'
                            ? 'border-blue-600 text-blue-600'
                            : 'border-transparent text-gray-500 hover:text-gray-700'
                            }`}
                    >
                        My Connections ({acceptedRequests.length})
                    </button>
                </div>
            </div>

            {/* Content */}
            {activeTab === 'requests' ? (
                <div>
                    <div className="mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Connection Requests</h2>
                        <p className="text-gray-500">Founders who meet your investment criteria</p>
                    </div>

                    {pendingRequests.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                            No pending requests
                        </div>
                    ) : (
                        <div>
                            {pendingRequests.map((req: any) => (
                                <RequestCard key={req.id} request={req} />
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">My Connections</h2>
                    {acceptedRequests.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-xl border border-gray-200 border-dashed">
                            No active connections yet
                        </div>
                    ) : (
                        <div className="grid gap-4">
                            {acceptedRequests.map((req: any) => (
                                <div key={req.id} className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-700 font-bold">
                                            {req.founderName[0]}
                                        </div>
                                        <div>
                                            <p className="font-bold text-gray-900">{req.founderName}</p>
                                            <p className="text-sm text-gray-500">{req.founderCompany}</p>
                                        </div>
                                    </div>
                                    <a
                                        href={`/valley/chat/${req.id}`}
                                        className="px-4 py-2 bg-blue-600 text-white text-sm font-bold rounded-lg hover:bg-blue-700 transition-colors"
                                    >
                                        Message
                                    </a>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
