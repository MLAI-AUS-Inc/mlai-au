import { createApiClient } from "~/lib/api";
import type { Announcement } from "~/components/Announcements";

export interface Hackathon {
    name: string;
    slug: string;
    description: string;
    start_date: string;
    end_date: string;
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
