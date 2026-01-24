// Shared types for submissions and teams

export interface TeamMember {
    full_name: string;
    avatar_url?: string;
}

export interface Team {
    team_id: string;
    team_name: string;
    team_avatar?: string;
    members: TeamMember[];
}

export interface Submission {
    id: string;
    team: Team;
    score: number;
    accuracy: number;
    submitted_at: string;
    file_url?: string;
}
