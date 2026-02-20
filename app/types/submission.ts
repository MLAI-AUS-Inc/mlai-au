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

export interface ClinicalMetrics {
    crisis_episodes_total: number;
    patients_saved: number;
    patients_at_risk: number;
    crisis_detection_rate: number;
    warning_episodes_total: number;
    warnings_caught: number;
    warnings_missed: number;
    warning_detection_rate: number;
    false_alarms: number;
    false_alarm_breakdown: {
        actual_normal: number;
        actual_warning: number;
        actual_other: number;
    };
    missed_episodes_sample: Array<{
        start_row: number;
        end_row: number;
        length: number;
        detected: boolean;
    }>;
}

export interface Feedback {
    confusion_matrix: ConfusionMatrix;
    class_stats: ClassStat[] | Record<string, Omit<ClassStat, 'name'>>;
    missed_crises: MissedCrisis[];
    missed_crises_total: number;
    first_100_public: PublicRow[];
    clinical_metrics?: ClinicalMetrics;
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
