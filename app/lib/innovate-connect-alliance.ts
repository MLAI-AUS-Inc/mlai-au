import { axiosInstance, createApiClient } from "~/lib/api";

export interface InnovateConnectAllianceTeamMember {
    id?: number;
    full_name: string;
    email?: string;
    avatar_url?: string | null;
    role?: string;
    personas?: string[];
}

export interface InnovateConnectAllianceTeam {
    id?: number;
    name?: string;
    team_name: string;
    team_id: number;
    code?: string | null;
    avatar_url?: string | null;
    member_count?: number;
    is_valid_team_size?: boolean;
    members: InnovateConnectAllianceTeamMember[];
}

export interface InnovateConnectAllianceSubmission {
    submission_id: number;
    participant_name: string;
    title: string;
    notes?: string | null;
    video_url: string;
    original_filename: string;
    content_type: string;
    file_size_bytes: number;
    submitted_at: string;
    team: {
        team_id: number;
        team_name: string;
        code?: string | null;
        avatar_url?: string | null;
    };
}

export async function getInnovateConnectAllianceTeams(env: Env, request: Request) {
    const client = createApiClient(env, request);
    const response = await client.get("/api/v1/hackathons/innovate-connect-alliance/teams/");
    return response.data as InnovateConnectAllianceTeam[];
}

export async function getInnovateConnectAllianceTeam(env: Env, request: Request, userId: number | undefined) {
    if (userId == null || !Number.isFinite(userId)) return null;
    const client = createApiClient(env, request);
    const response = await client.get(
        `/api/v1/hackathons/innovate-connect-alliance/teams/?member_id=${userId}`
    );
    const teams = response.data as InnovateConnectAllianceTeam[];
    return Array.isArray(teams) && teams.length > 0 ? teams[0] : null;
}

export async function getInnovateConnectAllianceLatestSubmission(env?: Env, request?: Request) {
    if (env) {
        const client = createApiClient(env, request);
        const response = await client.get("/api/v1/hackathons/innovate-connect-alliance/submissions/latest/");
        return response.data as InnovateConnectAllianceSubmission;
    }

    const response = await axiosInstance.get("/api/v1/hackathons/innovate-connect-alliance/submissions/latest/");
    return response.data as InnovateConnectAllianceSubmission;
}

export async function getInnovateConnectAllianceRecentSubmissions(env?: Env, request?: Request) {
    if (env) {
        const client = createApiClient(env, request);
        const response = await client.get("/api/v1/hackathons/innovate-connect-alliance/submissions/recent/");
        return response.data as InnovateConnectAllianceSubmission[];
    }

    const response = await axiosInstance.get("/api/v1/hackathons/innovate-connect-alliance/submissions/recent/");
    return response.data as InnovateConnectAllianceSubmission[];
}

export async function getInnovateConnectAllianceAllSubmissions(env?: Env, request?: Request) {
    if (env) {
        const client = createApiClient(env, request);
        const response = await client.get("/api/v1/hackathons/innovate-connect-alliance/submissions/");
        return response.data as InnovateConnectAllianceSubmission[];
    }

    const response = await axiosInstance.get("/api/v1/hackathons/innovate-connect-alliance/submissions/");
    return response.data as InnovateConnectAllianceSubmission[];
}

export async function getInnovateConnectAllianceSubmissionById(submissionId: number) {
    const response = await axiosInstance.get(
        `/api/v1/hackathons/innovate-connect-alliance/submissions/${submissionId}/`
    );
    return response.data as InnovateConnectAllianceSubmission;
}

export async function submitInnovateConnectAllianceVideo(formData: FormData) {
    return axiosInstance.post("/api/v1/hackathons/innovate-connect-alliance/submissions/", formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
}
