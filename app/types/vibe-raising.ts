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
  | "needs_google_auth"
  | "processing"
  | "ready"
  | "failed";

export interface VibeRaisingStartupUpdateBindingSummary {
  organizationId: number;
  organizationDomain: string;
  isDefaultForGmail: boolean;
}

export interface VibeRaisingStartupUpdateRunSummary {
  runId: string;
  workflow: string;
  domain: string;
  status: string;
  currentStep?: string | null;
  createdAt?: string;
  updatedAt?: string;
}

export interface VibeRaisingStartupUpdateBootstrapResponse {
  googleConnected: boolean;
  company: VibeRaisingCompany | null;
  binding: VibeRaisingStartupUpdateBindingSummary | null;
  oauthUrl: string;
}

export interface VibeRaisingStartupUpdateStatusResponse {
  state: VibeRaisingStartupUpdateState;
  googleConnected: boolean;
  company: VibeRaisingCompany | null;
  run: VibeRaisingStartupUpdateRunSummary | null;
  draft: VibeRaisingDraftedContent | null;
  error?: string | null;
}
