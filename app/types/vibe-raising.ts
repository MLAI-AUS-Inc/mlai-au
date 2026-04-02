import type { User } from "~/types/user";

export type VibeRaisingRole = "founder" | "investor";

export interface VibeRaisingCompany {
  id: string;
  name: string;
  domain?: string | null;
  abn?: string | null;
  registered: boolean;
}

export interface VibeRaisingProfile {
  role: VibeRaisingRole;
  organizationName?: string | null;
  companies: VibeRaisingCompany[];
  activeCompanyId?: string | null;
}

export interface VibeRaisingAppUser {
  authUser: User;
  profile: VibeRaisingProfile;
  fullName: string;
  email: string;
  role: VibeRaisingRole;
  organizationName?: string | null;
  companies: VibeRaisingCompany[];
  activeCompanyId?: string | null;
  companyName: string;
  domain?: string | null;
  abn?: string | null;
  companyRegistered: boolean;
}

export interface VibeRaisingPastMonthSummary {
  month: string;
  highlights: string;
  challenges: string;
  asks: string;
  metrics?: Record<string, string>;
}

export interface VibeRaisingDraftedContent {
  month?: string;
  year?: number;
  highlights: string;
  challenges: string;
  asks: string;
  pastMonths: VibeRaisingPastMonthSummary[];
  metrics?: Record<string, string>;
}

export type VibeRaisingStartupUpdateState =
  | "needs_domain"
  | "auth_required"
  | "queued"
  | "running"
  | "completed"
  | "cancelled"
  | "failed";

export interface VibeRaisingStartupUpdateStepState {
  name: string;
  required: boolean;
  status: string;
  attempts: number;
  message?: string | null;
  startedAt?: string | null;
  completedAt?: string | null;
  error?: string | null;
  artifacts?: unknown[];
}

export interface VibeRaisingStartupUpdateBindingSummary {
  id?: number;
  organizationId: number;
  organizationDomain: string;
  googleConnectionId?: number | null;
  isDefaultForGmail: boolean;
}

export interface VibeRaisingStartupUpdateRunSummary {
  runId: string;
  workflow: string;
  domain: string;
  status: string;
  currentStep?: string | null;
  stepOrder?: string[];
  stepStates?: Record<string, VibeRaisingStartupUpdateStepState>;
  createdAt?: string;
  updatedAt?: string;
}

export interface VibeRaisingStartupUpdateRunProgress {
  runId: string;
  status: string;
  currentStep?: string | null;
  completedSteps: number;
  totalSteps: number;
  displayStage: string;
  lastHeartbeatAt?: string | null;
  canRetry: boolean;
  terminalState?: string | null;
  generatedDraftMonths: string[];
}

export interface VibeRaisingEmailDraftMonth {
  draftId?: number;
  isoMonth?: string;
  month: string;
  year?: number;
  highlights: string;
  challenges: string;
  asks: string;
  metrics?: Record<string, string>;
}

export interface VibeRaisingStartupUpdateBootstrapResponse {
  googleConnected: boolean;
  company: VibeRaisingCompany | null;
  binding: VibeRaisingStartupUpdateBindingSummary | null;
  oauthUrl: string;
}

export interface VibeRaisingStartupUpdateStatusResponse {
  state: VibeRaisingStartupUpdateState;
  gmailConnected: boolean;
  authUrl?: string | null;
  company: VibeRaisingCompany | null;
  binding?: VibeRaisingStartupUpdateBindingSummary | null;
  run: VibeRaisingStartupUpdateRunSummary | null;
  progress: VibeRaisingStartupUpdateRunProgress | null;
  draft: VibeRaisingDraftedContent | null;
  runId?: string | null;
  status?: string | null;
  currentStep?: string | null;
  stepStates?: Record<string, VibeRaisingStartupUpdateStepState>;
  completedSteps: number;
  totalSteps: number;
  displayStage?: string | null;
  lastHeartbeatAt?: string | null;
  canRetry: boolean;
  terminalState?: string | null;
  generatedDraftMonths: string[];
  reusedExistingRun?: boolean;
  currentMonth?: VibeRaisingEmailDraftMonth | null;
  pastMonths: VibeRaisingEmailDraftMonth[];
  error?: string | null;
}

export interface VibeRaisingDraftResultsResponse {
  runId?: string | null;
  draft: VibeRaisingDraftedContent | null;
  currentMonth?: VibeRaisingEmailDraftMonth | null;
  pastMonths: VibeRaisingEmailDraftMonth[];
  months: VibeRaisingEmailDraftMonth[];
}

export interface VibeRaisingStartupUpdateCancelResponse {
  runId: string;
  status: string;
  terminalState?: string | null;
  cancelApplied: boolean;
  cleanup: {
    draftsDeleted: number;
    eventsDeleted: number;
    metricsDeleted: number;
  };
  revokeRequested: boolean;
  revokeSucceeded: boolean;
  revokedJobIds: string[];
  missingJobIds: string[];
}
