import { createApiClient } from "~/lib/api";
import type { Announcement } from "~/components/Announcements";

export interface Hackathon {
    name: string;
    slug: string;
    description: string;
    start_date: string;
    end_date: string;
}

export interface SlackUser {
    id: string;
    name: string;
    real_name: string;
    avatar: string;
}

export interface SlackReaction {
    name: string;
    count: number;
    users: string[];
}

export interface SlackMessage {
    ts: string;
    text: string;
    user: SlackUser;
    thread_ts: string | null;
    reply_count: number;
    reactions: SlackReaction[];
}

export interface ChannelResponse {
    channel: string;
    messages: SlackMessage[];
    next_cursor: string | null;
}

export interface ThreadResponse {
    thread_ts: string;
    messages: SlackMessage[];
}

export async function getHackathon(env: Env, request: Request, slug: string): Promise<Hackathon> {
    const client = createApiClient(env, request);
    const response = await client.get(`/api/v1/hackathons/${slug}/`);
    return response.data;
}

export async function getAnnouncements(env: Env, request: Request, slug: string): Promise<Announcement[]> {
    const client = createApiClient(env, request);
    const response = await client.get(`/api/v1/hackathons/${slug}/announcements/`);
    return response.data;
}

export async function getChannelMessages(
    env: Env,
    request: Request,
    slug: string,
    limit?: number,
    cursor?: string,
): Promise<ChannelResponse> {
    const client = createApiClient(env, request);
    const params: Record<string, string | number> = {};
    if (limit) params.limit = limit;
    if (cursor) params.cursor = cursor;
    const response = await client.get(`/api/v1/hackathons/${slug}/channel/`, { params });
    return response.data;
}

export async function getThreadMessages(
    env: Env,
    request: Request,
    slug: string,
    threadTs: string,
): Promise<ThreadResponse> {
    const client = createApiClient(env, request);
    const response = await client.get(`/api/v1/hackathons/${slug}/channel/thread/${threadTs}/`);
    return response.data;
}
