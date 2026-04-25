export type VibeMarketingRunStatus =
  | "queued"
  | "running"
  | "completed"
  | "failed"
  | "cancelled"
  | "blocked"
  | "awaiting_confirmation"
  | "awaiting_delivery_mode"
  | "awaiting_approval"
  | "approval_required"
  | "denied"
  | string;

export interface VibeMarketingStepState {
  key: string;
  name: string;
  required: boolean;
  status: string;
  attempts: number;
  message?: string;
  error?: string;
  artifacts: unknown[];
  startedAt?: string | null;
  completedAt?: string | null;
}

export interface VibeMarketingRunSummary {
  runId: string;
  workflow: string;
  domain: string;
  githubRepo?: string | null;
  status: VibeMarketingRunStatus;
  currentStep?: string | null;
  approvalState?: string | null;
  resumeAvailable?: boolean;
  createdAt?: string;
  updatedAt?: string;
  stepOrder: string[];
  steps: VibeMarketingStepState[];
  warnings: string[];
  errors: string[];
  artifacts: unknown[];
  previewUrl?: string | null;
  prUrl?: string | null;
  routePath?: string | null;
  diagnostics: Record<string, unknown>;
  result?: Record<string, unknown>;
}

export interface VibeMarketingCompany {
  id: string;
  name: string;
  domain?: string | null;
  organizationId?: number | null;
}

export interface VibeMarketingOrganization {
  id?: number | null;
  name: string;
  domain: string;
  competitors: string[];
  seedKeywords: string[];
}

export interface VibeMarketingSettings {
  brandName?: string | null;
  companyContext?: string | null;
  articleDeliveryMode?: string | null;
  githubRepo?: string | null;
  dailyDiscoveryEnabled: boolean;
  dailyDiscoveryPriority?: number | null;
  defaultTimezone?: string | null;
  githubConnectionState?: string | null;
}

export interface VibeMarketingCheck {
  passed: boolean;
  checks?: Record<string, boolean>;
  connectionState?: string | null;
  repoSet?: boolean;
  articleSystem?: Record<string, unknown>;
}

export interface VibeMarketingBootstrap {
  company: VibeMarketingCompany;
  organization: VibeMarketingOrganization;
  settings: VibeMarketingSettings;
  checks: Record<string, VibeMarketingCheck>;
  latestRuns: VibeMarketingRunSummary[];
  recommendedNextAction?: {
    key: string;
    label: string;
  };
}
