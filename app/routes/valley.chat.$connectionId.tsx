import { useLoaderData, useFetcher, redirect, Link } from "react-router";
import { useState, useEffect, useRef } from "react";
import { format } from "date-fns";
import { getValleyUser } from "~/lib/valley-session";
import {
    ArrowLeftIcon,
    PaperAirplaneIcon,
    UserCircleIcon,
} from "@heroicons/react/24/outline";

export async function loader({ request, params }: any) {
    const user = getValleyUser(request);
    if (!user) {
        return redirect("/valley");
    }

    const connectionId = params.connectionId;
    const { getConnectionById, getMessages } = await import("~/lib/storage.server");

    const connection = await getConnectionById(connectionId);
    if (!connection) {
        return redirect("/valley/connections");
    }

    // Verify user is part of this connection
    const isInvestor = user.email === connection.investorId || connection.investorId === "investor@example.com";
    const isFounder = user.email === connection.founderId;

    if (!isInvestor && !isFounder) {
        return redirect("/valley/connections");
    }

    const messages = await getMessages(connectionId);

    // Determine the other party's info
    const otherParty = isInvestor
        ? { name: connection.founderName, company: connection.founderCompany }
        : { name: connection.investorName, company: "Investor" };

    return { user, connection, messages, otherParty };
}

export async function action({ request, params }: any) {
    const user = getValleyUser(request);
    if (!user) return null;

    const formData = await request.formData();
    const content = formData.get("content")?.toString();
    const connectionId = params.connectionId;

    if (!content?.trim()) return null;

    const { sendMessage } = await import("~/lib/storage.server");
    await sendMessage(connectionId, user.email, user.fullName, content.trim());

    return { success: true };
}

function MessageBubble({ message, isOwn }: { message: any, isOwn: boolean }) {
    return (
        <div className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}>
            <div className={`max-w-[70%] ${isOwn ? 'order-2' : 'order-1'}`}>
                <div className={`px-4 py-3 rounded-2xl ${isOwn
                        ? 'bg-blue-600 text-white rounded-br-md'
                        : 'bg-gray-100 text-gray-900 rounded-bl-md'
                    }`}>
                    <p className="text-sm">{message.content}</p>
                </div>
                <p className={`text-xs text-gray-400 mt-1 ${isOwn ? 'text-right' : 'text-left'}`}>
                    {format(new Date(message.createdAt), "h:mm a")}
                </p>
            </div>
        </div>
    );
}

export default function Chat() {
    const { user, connection, messages, otherParty } = useLoaderData<typeof loader>();
    const [inputValue, setInputValue] = useState("");
    const fetcher = useFetcher();
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const isSubmitting = fetcher.state === "submitting";

    // Scroll to bottom when messages change
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // Clear input after successful submit
    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data?.success) {
            setInputValue("");
        }
    }, [fetcher.state, fetcher.data]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!inputValue.trim() || isSubmitting) return;

        fetcher.submit(
            { content: inputValue },
            { method: "POST" }
        );
        setInputValue(""); // Optimistic clear
    };

    return (
        <div className="flex flex-col h-[calc(100vh-200px)] max-w-3xl mx-auto">
            {/* Header */}
            <div className="flex items-center gap-4 pb-4 border-b border-gray-200 mb-4">
                <Link
                    to="/valley/connections"
                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                    <ArrowLeftIcon className="w-5 h-5 text-gray-600" />
                </Link>
                <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-blue-600 font-bold">
                        {otherParty.name.split(' ').map((n: string) => n[0]).join('')}
                    </span>
                </div>
                <div>
                    <h2 className="font-bold text-gray-900">{otherParty.name}</h2>
                    <p className="text-sm text-gray-500">{otherParty.company}</p>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto px-2">
                {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center text-gray-400">
                        <UserCircleIcon className="w-16 h-16 mb-4 opacity-50" />
                        <p>No messages yet</p>
                        <p className="text-sm">Say hello to start the conversation!</p>
                    </div>
                ) : (
                    <>
                        {messages.map((msg: any) => (
                            <MessageBubble
                                key={msg.id}
                                message={msg}
                                isOwn={msg.senderId === user.email}
                            />
                        ))}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Input Area */}
            <form onSubmit={handleSubmit} className="pt-4 border-t border-gray-200 mt-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 px-4 py-3 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        disabled={isSubmitting}
                    />
                    <button
                        type="submit"
                        disabled={!inputValue.trim() || isSubmitting}
                        className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                    >
                        <PaperAirplaneIcon className="w-5 h-5" />
                        Send
                    </button>
                </div>
            </form>
        </div>
    );
}
