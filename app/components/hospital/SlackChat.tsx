import { useState, useEffect, useRef, useCallback } from "react";
import ReactMarkdown from "react-markdown";
import { axiosInstance } from "~/lib/api";
import { parseSlackMrkdwn } from "~/lib/slack-mrkdwn";
import { getInitials } from "~/lib/avatar";
import type {
    SlackMessage,
    SlackReaction,
    ThreadResponse,
} from "~/services/hackathon";

const ROO_AVATAR =
    "https://ca.slack-edge.com/T05N9C1QSJC-U090FV0GTT4-4884de9f0558-72";

interface SlackChatProps {
    initialMessages: SlackMessage[];
    initialCursor: string | null;
}

const EMOJI_MAP: Record<string, string> = {
    thumbsup: "\u{1F44D}",
    "+1": "\u{1F44D}",
    heart: "\u2764\uFE0F",
    fire: "\u{1F525}",
    eyes: "\u{1F440}",
    rocket: "\u{1F680}",
    tada: "\u{1F389}",
    clap: "\u{1F44F}",
    "100": "\u{1F4AF}",
    wave: "\u{1F44B}",
    pray: "\u{1F64F}",
    sparkles: "\u2728",
    star: "\u2B50",
    white_check_mark: "\u2705",
    muscle: "\u{1F4AA}",
    raised_hands: "\u{1F64C}",
    brain: "\u{1F9E0}",
    trophy: "\u{1F3C6}",
};

function reactionEmoji(name: string): string {
    return EMOJI_MAP[name] ?? `:${name}:`;
}

function buildUserMap(messages: SlackMessage[]): Map<string, string> {
    const map = new Map<string, string>();
    for (const msg of messages) {
        if (msg.user?.id && msg.user?.real_name) {
            map.set(msg.user.id, msg.user.real_name);
        }
    }
    return map;
}

function relativeTime(ts: string): string {
    const seconds = Math.floor(
        (Date.now() - parseFloat(ts) * 1000) / 1000,
    );
    if (seconds < 60) return "just now";
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
}

export default function SlackChat({
    initialMessages,
    initialCursor,
}: SlackChatProps) {
    const [messages, setMessages] = useState<SlackMessage[]>(initialMessages);
    const [cursor, setCursor] = useState<string | null>(initialCursor);
    const [loadingMore, setLoadingMore] = useState(false);
    const [expandedThreads, setExpandedThreads] = useState<
        Record<string, SlackMessage[]>
    >({});
    const [loadingThreads, setLoadingThreads] = useState<
        Record<string, boolean>
    >({});
    const latestTsRef = useRef<string | null>(
        initialMessages.length > 0 ? initialMessages[0].ts : null,
    );

    // Keep latestTsRef in sync
    useEffect(() => {
        if (messages.length > 0) {
            latestTsRef.current = messages[0].ts;
        }
    }, [messages]);

    // Polling for new messages every 30s
    useEffect(() => {
        const interval = setInterval(async () => {
            try {
                const res = await axiosInstance.get(
                    "/api/v1/hackathons/hospital/channel/",
                    { params: { limit: 10 } },
                );
                const data = res.data as {
                    messages: SlackMessage[];
                    next_cursor: string | null;
                };
                if (data.messages.length > 0) {
                    setMessages((prev) => {
                        const existingTs = new Set(prev.map((m) => m.ts));
                        const newMsgs = data.messages.filter(
                            (m) => !existingTs.has(m.ts),
                        );
                        if (newMsgs.length === 0) return prev;
                        return [...newMsgs, ...prev];
                    });
                }
            } catch {
                // Silently ignore polling errors
            }
        }, 30_000);
        return () => clearInterval(interval);
    }, []);

    const loadMore = useCallback(async () => {
        if (!cursor || loadingMore) return;
        setLoadingMore(true);
        try {
            const res = await axiosInstance.get(
                "/api/v1/hackathons/hospital/channel/",
                { params: { limit: 20, cursor } },
            );
            const data = res.data as {
                messages: SlackMessage[];
                next_cursor: string | null;
            };
            setMessages((prev) => {
                const existingTs = new Set(prev.map((m) => m.ts));
                const newMsgs = data.messages.filter(
                    (m) => !existingTs.has(m.ts),
                );
                return [...prev, ...newMsgs];
            });
            setCursor(data.next_cursor);
        } catch {
            // Silently ignore
        } finally {
            setLoadingMore(false);
        }
    }, [cursor, loadingMore]);

    const toggleThread = useCallback(
        async (threadTs: string) => {
            if (expandedThreads[threadTs]) {
                setExpandedThreads((prev) => {
                    const next = { ...prev };
                    delete next[threadTs];
                    return next;
                });
                return;
            }
            setLoadingThreads((prev) => ({ ...prev, [threadTs]: true }));
            try {
                const res = await axiosInstance.get(
                    `/api/v1/hackathons/hospital/channel/thread/${threadTs}/`,
                );
                const data = res.data as ThreadResponse;
                setExpandedThreads((prev) => ({
                    ...prev,
                    [threadTs]: data.messages,
                }));
            } catch {
                // Silently ignore
            } finally {
                setLoadingThreads((prev) => ({ ...prev, [threadTs]: false }));
            }
        },
        [expandedThreads],
    );

    const userMap = buildUserMap(messages);

    return (
        <div className="relative overflow-hidden rounded-2xl border border-[#e2a9f1]/20 bg-[#1a0e2e]/80 shadow-[0_0_20px_rgba(226,169,241,0.06)]">
            <div className="absolute -bottom-10 -left-10 h-48 w-48 rounded-full bg-[#783f8e]/20 blur-3xl" />
            <div className="relative z-10 p-5 sm:p-6">
                <div className="flex items-center gap-3 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-7 w-7 text-[#e2a9f1]"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 8.511c.884.284 1.5 1.128 1.5 2.097v4.286c0 1.136-.847 2.1-1.98 2.193-.34.027-.68.052-1.02.072v3.091l-3-3c-1.354 0-2.694-.055-4.02-.163a2.115 2.115 0 0 1-.825-.242m9.345-8.334a2.126 2.126 0 0 0-.476-.095 48.64 48.64 0 0 0-8.048 0c-1.131.094-1.976 1.057-1.976 2.192v4.286c0 .837.46 1.58 1.155 1.951m9.345-8.334V6.637c0-1.621-1.152-3.026-2.76-3.235A48.455 48.455 0 0 0 11.25 3c-2.115 0-4.198.137-6.24.402-1.608.209-2.76 1.614-2.76 3.235v6.226c0 1.621 1.152 3.026 2.76 3.235.577.075 1.157.14 1.74.194V21l4.155-4.155"
                        />
                    </svg>
                    <h3 className="text-xl font-black text-white uppercase tracking-wide">
                        Slack Chat
                    </h3>
                    <span className="text-xs text-white/40 ml-auto">
                        #medhack-frontiers
                    </span>
                </div>

                {messages.length === 0 ? (
                    <p className="text-sm text-white/40 py-6 text-center">
                        No messages yet.
                    </p>
                ) : (
                    <div className="max-h-[500px] overflow-y-auto space-y-1 pr-1 scrollbar-thin scrollbar-thumb-[#e2a9f1]/20 scrollbar-track-transparent">
                        {messages.map((msg) => (
                            <div key={msg.ts}>
                                <MessageRow
                                    msg={msg}
                                    userMap={userMap}
                                />
                                {msg.reply_count > 0 && (
                                    <div className="ml-10 sm:ml-12 mt-1">
                                        <button
                                            onClick={() =>
                                                toggleThread(
                                                    msg.thread_ts ?? msg.ts,
                                                )
                                            }
                                            className="text-xs font-medium text-[#e2a9f1] hover:text-[#e2a9f1]/80 focus:outline-none"
                                        >
                                            {loadingThreads[
                                                msg.thread_ts ?? msg.ts
                                            ]
                                                ? "Loading..."
                                                : expandedThreads[
                                                        msg.thread_ts ?? msg.ts
                                                    ]
                                                    ? "Hide replies"
                                                    : `View ${msg.reply_count} ${msg.reply_count === 1 ? "reply" : "replies"}`}
                                        </button>
                                        {expandedThreads[
                                            msg.thread_ts ?? msg.ts
                                        ] && (
                                            <div className="mt-2 space-y-1 border-l-2 border-[#e2a9f1]/20 pl-4">
                                                {expandedThreads[
                                                    msg.thread_ts ?? msg.ts
                                                ].map((reply) => (
                                                    <MessageRow
                                                        key={reply.ts}
                                                        msg={reply}
                                                        userMap={userMap}
                                                        isReply
                                                    />
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        ))}

                        {cursor && (
                            <div className="pt-3 text-center">
                                <button
                                    onClick={loadMore}
                                    disabled={loadingMore}
                                    className="text-xs font-semibold text-[#e2a9f1] hover:text-[#e2a9f1]/80 disabled:text-white/30 focus:outline-none"
                                >
                                    {loadingMore
                                        ? "Loading..."
                                        : "Load more messages"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

function resolveAvatar(user: SlackMessage["user"]): string | null {
    if (user.name === "roo" || user.real_name === "Roo") return ROO_AVATAR;
    return user.avatar || null;
}

function MessageRow({
    msg,
    userMap,
    isReply,
}: {
    msg: SlackMessage;
    userMap: Map<string, string>;
    isReply?: boolean;
}) {
    const parsed = parseSlackMrkdwn(msg.text, userMap);
    const avatarSrc = resolveAvatar(msg.user);
    const [imgError, setImgError] = useState(false);
    const size = isReply ? "h-6 w-6" : "h-8 w-8";
    const textSize = isReply ? "text-[10px]" : "text-xs";

    return (
        <div
            className={`flex gap-3 py-2.5 ${isReply ? "py-1.5" : ""}`}
        >
            {avatarSrc && !imgError ? (
                <img
                    src={avatarSrc}
                    alt=""
                    onError={() => setImgError(true)}
                    className={`rounded-full object-cover ring-1 ring-[#e2a9f1]/30 flex-shrink-0 ${size}`}
                />
            ) : (
                <div
                    className={`rounded-full ring-1 ring-[#e2a9f1]/30 flex-shrink-0 flex items-center justify-center bg-[#783f8e]/60 ${size}`}
                >
                    <span className={`font-bold text-white/90 leading-none ${textSize}`}>
                        {getInitials(msg.user.real_name)}
                    </span>
                </div>
            )}
            <div className="min-w-0 flex-1">
                <div className="flex items-baseline gap-2">
                    <span
                        className={`font-semibold text-[#e2a9f1] truncate ${isReply ? "text-xs" : "text-sm"}`}
                    >
                        {msg.user.real_name}
                    </span>
                    <span className="text-xs text-white/40 flex-shrink-0">
                        {relativeTime(msg.ts)}
                    </span>
                </div>
                <div
                    className={`mt-0.5 text-white/70 prose prose-sm prose-invert max-w-none prose-p:my-0.5 prose-headings:text-white prose-strong:text-white prose-a:text-[#e2a9f1] ${isReply ? "text-xs" : "text-sm"}`}
                >
                    <ReactMarkdown>{parsed}</ReactMarkdown>
                </div>
                {msg.reactions && msg.reactions.length > 0 && (
                    <div className="mt-1.5 flex flex-wrap gap-1.5">
                        {msg.reactions.map((r: SlackReaction) => (
                            <span
                                key={r.name}
                                className="inline-flex items-center gap-1 rounded-full bg-[#e2a9f1]/10 px-2 py-0.5 text-xs text-[#e2a9f1]"
                            >
                                {reactionEmoji(r.name)} {r.count}
                            </span>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
