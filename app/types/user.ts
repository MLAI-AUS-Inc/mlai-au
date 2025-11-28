export interface TeamMember {
    full_name: string;
}

export interface Team {
    team_name: string;
    team_id: number;
    members: TeamMember[];
}

export type UserRole = 'admin' | 'participant' | 'professional';

export interface User {
    full_name: string;
    email: string;
    role: UserRole;
    is_superuser: boolean;
    is_active: boolean;
    has_team: boolean;
    avatar_url: string | null;

    // Team information
    // 'team' is for backward compatibility, prefer specific app teams
    team?: Team | null;
    hospital_team?: Team | null;
    esafety_team?: Team | null;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
}
