import { axiosInstance } from "~/lib/api";

export async function getHackathon(slug: string, headers?: Record<string, string>) {
    const response = await axiosInstance.get(`/api/v1/hackathons/${slug}/`, { headers });
    return response.data;
}

export async function getAnnouncements(slug: string, headers?: Record<string, string>) {
    const response = await axiosInstance.get(`/api/v1/hackathons/${slug}/announcements/`, { headers });
    return response.data;
}
