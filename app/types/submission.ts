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

// ─── Feedback types (hospital hackathon) ──────────────────────────────────────

export interface ConfusionMatrix {
    [actual: string]: { [predicted: string]: number };
}

export interface ClassStat {
    name: string;
    total: number;
    correct: number;
    accuracy: number;
}

export interface MissedCrisis {
    row: number;
    predicted: number;
    predicted_name: string;
}

export interface PublicRow {
    row: number;
    actual: number;
    actual_name: string;
    predicted: number;
    predicted_name: string;
    correct: boolean;
}

export interface Feedback {
    confusion_matrix: ConfusionMatrix;
    class_stats: ClassStat[] | Record<string, Omit<ClassStat, 'name'>>;
    missed_crises: MissedCrisis[];
    missed_crises_total: number;
    first_100_public: PublicRow[];
}

/** Normalize class_stats from either array or object form into a ClassStat[] */
export function normalizeClassStats(
    raw: Feedback['class_stats'] | undefined
): ClassStat[] | undefined {
    if (!raw) return undefined;
    if (Array.isArray(raw)) return raw;
    return Object.entries(raw).map(([name, stat]) => ({ name, ...stat }));
}

export interface SubmissionSummary {
    submission_id: number;
    participant_name?: string;
    score: number;
    accuracy?: number;
    submitted_at: string;
    team?: Team;
}

export interface HospitalSubmission {
    submission_id: number;
    participant_name?: string;
    user_name?: string;
    team?: Team;
    score: number;
    accuracy?: number;
    submitted_at: string;
    feedback?: Feedback | null;
}
