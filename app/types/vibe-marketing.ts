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

export type VibeMarketingDeliveryMode = "publish_code" | "content_only";

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
  contentPackage?: VibeMarketingContentPackage | null;
  componentManifest?: VibeMarketingComponentManifest | null;
  livePreview?: VibeMarketingLivePreview | null;
  componentFeedback?: VibeMarketingComponentFeedback | null;
  workflowProgress?: VibeMarketingWorkflowProgress | null;
  result?: Record<string, unknown>;
}

export interface VibeMarketingAutofillSource {
  url: string;
  title?: string;
  type?: string;
  query?: string;
  description?: string;
  source?: string;
}

export interface VibeMarketingAutofillLinkedInProfile {
  url?: string;
  title?: string;
  description?: string;
  vanityName?: string;
  blocked?: boolean;
  warnings?: string[];
}

export interface VibeMarketingAutofillCompetitor {
  name: string;
  domain?: string;
  linkedinUrl?: string;
  type?: "direct" | "seo" | "adjacent" | string;
  score?: number | null;
  reason?: string;
  source?: string;
  evidence?: string[];
  confidence?: "high" | "medium" | "low" | string;
}

export interface VibeMarketingAutofillKeywordGroup {
  group?: string;
  intent?: string;
  keywords: string[];
}

export interface VibeMarketingAutofillResult {
  brandName?: string | null;
  companyLinkedInUrl?: string | null;
  companyContext?: string | null;
  competitors?: string[];
  competitorSuggestions?: VibeMarketingAutofillCompetitor[];
  directCompetitors?: VibeMarketingAutofillCompetitor[];
  seoCompetitors?: VibeMarketingAutofillCompetitor[];
  adjacentOrganizations?: VibeMarketingAutofillCompetitor[];
  competitorGroups?: {
    directCompetitors: VibeMarketingAutofillCompetitor[];
    seoCompetitors: VibeMarketingAutofillCompetitor[];
    adjacentOrganizations: VibeMarketingAutofillCompetitor[];
  };
  seedKeywords?: string[];
  keywordGroups?: VibeMarketingAutofillKeywordGroup[];
  sources?: VibeMarketingAutofillSource[];
  linkedinProfile?: VibeMarketingAutofillLinkedInProfile;
  linkedinSimilarSignals?: VibeMarketingAutofillSource[];
  researchSummary?: string | null;
  researchDepth?: Record<string, number>;
  researchQuality?: Record<string, unknown>;
  modelTrace?: Record<string, unknown>[];
  queryLog?: Record<string, unknown>[];
  evidenceMap?: Record<string, unknown>;
  stepDurations?: Record<string, number>;
  minimumsMet?: Record<string, boolean>;
  sourceCount?: number;
  competitorCount?: number;
  seedKeywordCount?: number;
  warnings?: string[];
}

export interface VibeMarketingCompany {
  id: string;
  name: string;
  domain?: string | null;
  companyLinkedInUrl?: string | null;
  location?: string | null;
  abn?: string | null;
  organizationId?: number | null;
}

export interface VibeMarketingOrganization {
  id?: number | null;
  name: string;
  domain: string;
  companyLinkedInUrl?: string | null;
  competitors: string[];
  seedKeywords: string[];
}

export interface VibeMarketingSettings {
  brandName?: string | null;
  companyContext?: string | null;
  articleDeliveryMode?: VibeMarketingDeliveryMode | null;
  githubRepo?: string | null;
  dailyDiscoveryEnabled: boolean;
  dailyDiscoveryPriority?: number | null;
  defaultTimezone?: string | null;
  githubConnectionState?: string | null;
}

export interface VibeMarketingStartupProfile {
  founderNames: string[];
  stage?: string | null;
  organizationKind?: string | null;
  notes?: string | null;
  companyAliases?: string[];
  domainAliases?: string[];
  competitorDomains?: string[];
  positiveKeywords?: string[];
}

export interface VibeMarketingCheck {
  passed: boolean;
  checks?: Record<string, boolean>;
  connectionState?: string | null;
  repoSet?: boolean;
  articleSystem?: Record<string, unknown>;
}

export interface VibeMarketingTopicCandidate {
  id: string;
  keyword: string;
  title: string;
  reason?: string | null;
  source?: string | null;
  sourceRunId?: string | null;
  intent?: unknown;
  difficulty?: unknown;
  opportunityScore?: unknown;
  volume?: unknown;
}

export interface VibeMarketingContentPackage {
  title?: string | null;
  slug?: string | null;
  targetKeyword?: string | null;
  artifactPaths?: Record<string, string>;
  imageManifestStatus?: string | null;
  heroImagePresent?: boolean;
  generatedInlineImageCount?: number | null;
  imageErrorCount?: number | null;
  contentPackaged?: boolean;
}

export interface VibeMarketingComponentManifestItem {
  id: string;
  type: string;
  label?: string;
  selector?: string;
  sourceSectionId?: string;
  editable?: boolean;
}

export interface VibeMarketingComponentManifest {
  components: VibeMarketingComponentManifestItem[];
  artifactPath?: string | null;
  routePath?: string | null;
  articlePath?: string | null;
}

export interface VibeMarketingLivePreview {
  available: boolean;
  status: string;
  previewUrl?: string | null;
  routePath?: string | null;
  exactRender?: boolean;
  inspectorProtocolVersion?: number | null;
  inspectorMode?: string | null;
  error?: string | null;
  workspacePath?: string | null;
  logPath?: string | null;
}

export type VibeMarketingComponentCommentStatus = "draft" | "submitted" | "applied" | "superseded" | string;

export interface VibeMarketingComponentCommentAnchor {
  x: number;
  y: number;
  createdFrom?: string | null;
}

export interface VibeMarketingComponentFeedbackComment {
  id: string;
  componentId: string;
  componentType: string;
  componentLabel?: string | null;
  sourceSectionId?: string | null;
  selector?: string | null;
  anchor?: VibeMarketingComponentCommentAnchor | null;
  body: string;
  status: VibeMarketingComponentCommentStatus;
  batchId?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
}

export interface VibeMarketingComponentFeedbackBatch {
  id: string;
  sourceRunId: string;
  revisionRunId?: string | null;
  status: "draft" | "submitted" | "running" | "completed" | "accepted" | "failed" | string;
  error?: string | null;
  promotedLearningCount?: number | null;
}

export interface VibeMarketingComponentFeedback {
  comments: VibeMarketingComponentFeedbackComment[];
  latestBatch?: VibeMarketingComponentFeedbackBatch | null;
}

export interface VibeMarketingPublishEvidence {
  runId?: string | null;
  status?: string | null;
  approvalState?: string | null;
  previewUrl?: string | null;
  prUrl?: string | null;
  routePath?: string | null;
  screenshots?: unknown[];
  changedFiles?: unknown[];
  warnings?: string[];
  diagnostics?: Record<string, unknown>;
  contentPackage?: VibeMarketingContentPackage | null;
}

export interface VibeMarketingGuidedStep {
  key: string;
  label: string;
  status: "pending" | "active" | "complete" | string;
  passed: boolean;
  href?: string;
}

export type VibeMarketingWorkflowStepStatus =
  | "locked"
  | "ready"
  | "running"
  | "needs_action"
  | "complete"
  | "blocked"
  | string;

export interface VibeMarketingWorkflowAction {
  label: string;
  href?: string | null;
  intent?: string | null;
  variant?: "primary" | "secondary" | "danger" | string;
}

export interface VibeMarketingWorkflowStep {
  id: string;
  label: string;
  phase: string;
  status: VibeMarketingWorkflowStepStatus;
  href: string;
  runId?: string | null;
  summary?: string | null;
  primaryAction?: VibeMarketingWorkflowAction | null;
  order?: number | null;
}

export interface VibeMarketingWorkflowProgress {
  currentStepId: string;
  nextStepId?: string | null;
  steps: VibeMarketingWorkflowStep[];
}

export interface VibeMarketingWebsiteBaselineMetric {
  status?: "measured" | "needs_connection" | "unavailable" | "error" | string;
  score?: number | null;
  message?: string;
  [key: string]: unknown;
}

export interface VibeMarketingWebsiteBaseline {
  id?: number | null;
  runId?: string | null;
  domain?: string | null;
  status?: string | null;
  passed?: boolean;
  stale?: boolean;
  skipped?: boolean;
  skippedAt?: string | null;
  skipReason?: string | null;
  collectedAt?: string | null;
  overallScore?: number | null;
  summary?: string | Record<string, unknown> | null;
  metrics?: Record<string, VibeMarketingWebsiteBaselineMetric>;
  sourceStatus?: Record<string, string>;
  recommendations?: Array<Record<string, unknown>>;
}

export interface VibeMarketingGoogleBaselineConnection {
  connected: boolean;
  hasBaselineScopes: boolean;
  email?: string | null;
  status?: string | null;
  connectUrl?: string | null;
}

export interface VibeMarketingBootstrap {
  company: VibeMarketingCompany;
  organization: VibeMarketingOrganization;
  settings: VibeMarketingSettings;
  startupProfile: VibeMarketingStartupProfile;
  websiteBaseline: VibeMarketingWebsiteBaseline;
  googleBaselineConnection: VibeMarketingGoogleBaselineConnection;
  checks: Record<string, VibeMarketingCheck>;
  latestRuns: VibeMarketingRunSummary[];
  latestRunsByWorkflow: Record<string, VibeMarketingRunSummary>;
  topicCandidates: VibeMarketingTopicCandidate[];
  publishEvidence: VibeMarketingPublishEvidence;
  guidedSteps: VibeMarketingGuidedStep[];
  currentGuidedStep?: string | null;
  recommendedNextAction?: {
    key: string;
    label: string;
  };
  workflowProgress?: VibeMarketingWorkflowProgress | null;
}
