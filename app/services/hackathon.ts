import { axiosInstance } from "~/lib/api";
import type { Announcement } from "~/components/Announcements";

export interface Hackathon {
    name: string;
    slug: string;
    description: string;
    start_date: string;
    end_date: string;
}

export async function getHackathon(slug: string, headers?: Record<string, string>): Promise<Hackathon> {
    const response = await axiosInstance.get(`/api/v1/hackathons/${slug}/`, { headers });
    return response.data;
}

export async function getAnnouncements(slug: string, headers?: Record<string, string>): Promise<Announcement[]> {
    const response = await axiosInstance.get(`/api/v1/hackathons/${slug}/announcements/`, { headers });
    return response.data;
}
