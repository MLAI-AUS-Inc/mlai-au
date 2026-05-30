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

export interface VibeMarketingScanProgress {
  phaseKey: string;
  phaseLabel: string;
  phaseIndex: number;
  phaseCount: number;
  percent: number;
  message: string;
  detail: Record<string, unknown>;
  currentStep?: string | null;
  updatedAt?: string | null;
}

export interface VibeMarketingRunSummary {
  runId: string;
  workflow: string;
  domain: string;
  githubRepo?: string | null;
  sourceRunId?: string | null;
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
  errorCode?: string | null;
  artifacts: unknown[];
  previewUrl?: string | null;
  prUrl?: string | null;
  routePath?: string | null;
  diagnostics: Record<string, unknown>;
  contentPackage?: VibeMarketingContentPackage | null;
  componentManifest?: VibeMarketingComponentManifest | null;
  livePreview?: VibeMarketingLivePreview | null;
  componentFeedback?: VibeMarketingComponentFeedback | null;
  scanProgress?: VibeMarketingScanProgress | null;
  workflowProgress?: VibeMarketingWorkflowProgress | null;
  publishChildStatus?: string | null;
  publishChildRecoverable?: boolean;
  publishChildWaitReason?: string | null;
  stale?: boolean;
  staleReason?: string | null;
  retryAvailable?: boolean;
  queueName?: string | null;
  queuedAt?: string | null;
  resumeGeneration?: number | null;
  isCurrentAttempt?: boolean;
  failureStep?: string | null;
  result?: Record<string, unknown>;
  articleSetupState?: VibeMarketingArticleSetupState | null;
}

export interface VibeMarketingArticleSetupState {
  repo?: string | null;
  githubRepo?: string | null;
  defaultBranch?: string | null;
  defaultBranchSha?: string | null;
  lastScannedSha?: string | null;
  scanRunId?: string | null;
  scanStatus?: VibeMarketingRunStatus | null;
  scanCompletedAt?: string | null;
  scanUpdatedAt?: string | null;
  scanStale?: boolean;
  scanNeedsRescan?: boolean;
  staleReason?: string | null;
  setupRunId?: string | null;
  setupStatus?: VibeMarketingRunStatus | string | null;
  setupRunStatus?: VibeMarketingRunStatus | string | null;
  setupCurrentStep?: string | null;
  setupBlocked?: boolean;
  setupMerged?: boolean;
  generationReady?: boolean;
  published?: boolean;
  routePath?: string | null;
  previewUrl?: string | null;
  fallbackPreviewUrl?: string | null;
  livePreviewUrl?: string | null;
  prUrl?: string | null;
  prNumber?: string | number | null;
  mergeStatus?: string | null;
  livePreview?: VibeMarketingLivePreview | null;
  retryAvailable?: boolean;
  error?: string | null;
  source?: "config" | "scan_run" | "setup_run" | "none" | string;
  updatedAt?: string | null;
  articleSurfaceMode?: string | null;
  articleSurfaceHint?: Record<string, unknown> | null;
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

export interface VibeMarketingAutofillProfileFields {
  shortDescription?: string | null;
  problemSolved?: string | null;
  targetAudience?: string | null;
  location?: string | null;
  organizationKind?: string | null;
  stage?: string | null;
  founderNames?: string | null;
  abn?: string | null;
  companyContext?: string | null;
  fieldConfidence?: Record<string, string>;
  reviewNotes?: string[];
}

export interface VibeMarketingAutofillResult {
  partial?: boolean;
  brandName?: string | null;
  companyLinkedInUrl?: string | null;
  companyContext?: string | null;
  profileFields?: VibeMarketingAutofillProfileFields;
  offeringProfile?: Record<string, unknown>;
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
  keywordCandidates?: Record<string, unknown>[];
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
  avatarUrl?: string | null;
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
  articleDeliveryMode?: string | null;
  articleDeliveryModeEffective?: string | null;
  githubRepo?: string | null;
  pendingArticleSystemSetup?: Record<string, unknown> | null;
  dailyDiscoveryEnabled: boolean;
  dailyDiscoveryPriority?: number | null;
  defaultTimezone?: string | null;
  githubConnectionState?: string | null;
}

export interface VibeMarketingStartupProfile {
  founderNames: string[];
  founderProfiles?: Array<{ name: string; linkedinUrl?: string | null }>;
  stage?: string | null;
  organizationKind?: string | null;
  shortDescription?: string | null;
  problemSolved?: string | null;
  targetAudience?: string | null;
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
  published?: boolean;
  setupBlocked?: boolean;
  setupMerged?: boolean;
  generationReady?: boolean;
  setupRunId?: string | null;
  setupStatus?: string | null;
  rescanRunId?: string | null;
  mergeStatus?: string | null;
  prUrl?: string | null;
  prNumber?: string | number | null;
  previewUrl?: string | null;
}

export interface VibeMarketingTopicCandidate {
  id: string;
  rawCandidateId?: string | null;
  keyword: string;
  title: string;
  reason?: string | null;
  audience?: string | null;
  confidence?: string | null;
  trend?: unknown;
  interest?: unknown;
  aiSearches?: unknown;
  source?: string | null;
  sourceRunId?: string | null;
  status?: string | null;
  alreadyWritten?: boolean;
  writtenArticle?: VibeMarketingWrittenTopic | null;
  intent?: unknown;
  difficulty?: unknown;
  difficultySource?: unknown;
  opportunityScore?: unknown;
  volume?: unknown;
  volumeDisplay?: string | null;
  tier?: unknown;
  velocity?: unknown;
  monthlySearches?: unknown;
  aiSaturation?: unknown;
  trendStatus?: unknown;
  trendPercent?: unknown;
  trendDescription?: string | null;
  trendLabel?: string | null;
  statsMeaning?: string | null;
  whyRecommended?: string | null;
  recommendationReason?: string | null;
  aiVolumeDisplay?: string | null;
  relatedKeywords?: string[];
  pillarSlug?: string | null;
  pillarName?: string | null;
  pillarKeyword?: string | null;
  pillarIconKey?: string | null;
  pillarColorKey?: string | null;
  paaQuestions?: Array<{
    question: string;
    answerSnippet?: string | null;
    depth?: unknown;
    hasAiOverview?: boolean;
  }>;
}

export interface VibeMarketingTopicPillar {
  id: string;
  slug: string;
  name: string;
  description: string;
  ideaCount: number;
  iconKey: "brain" | "community" | "rocket" | "tools" | "default" | string;
  colorKey: "green" | "purple" | "blue" | "orange" | string;
  source: "semantic_cluster" | "pillar_strategy" | string;
  topicCandidates: VibeMarketingTopicCandidate[];
}

export interface VibeMarketingTopicFeedback {
  id: string;
  domain?: string | null;
  keyword: string;
  keywordNormalized?: string | null;
  feedbackType: string;
  reasonCode: string;
  reasonText?: string | null;
  declineScope: string;
  source?: string | null;
  sessionId?: string | null;
  active: boolean;
  createdAt?: string | null;
  updatedAt?: string | null;
  restoredAt?: string | null;
}

export interface VibeMarketingWrittenTopic {
  id?: string;
  title: string;
  slug?: string | null;
  keyword: string;
  articleUrl?: string | null;
  prUrl?: string | null;
  writtenAt?: string | null;
}

export interface VibeMarketingDraftArticle {
  runId: string;
  sourceRunId?: string | null;
  workflow: string;
  status: VibeMarketingRunStatus;
  title: string;
  targetKeyword?: string | null;
  stageLabel: string;
  actionKind: "continue" | "resume" | "restart" | "review" | string;
  actionLabel: string;
  resumeAvailable: boolean;
  restartAvailable: boolean;
  updatedAt?: string | null;
  createdAt?: string | null;
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
  fallbackPreviewUrl?: string | null;
  failedPreviewUrl?: string | null;
  internalPreviewUrl?: string | null;
  proxyPath?: string | null;
  routePath?: string | null;
  exactRender?: boolean;
  inspectorProtocolVersion?: number | null;
  inspectorMode?: string | null;
  error?: string | null;
  errorCode?: string | null;
  retryable?: boolean;
  workspacePath?: string | null;
  logPath?: string | null;
  failedPhase?: string | null;
  failureKind?: string | null;
  failedCommand?: string | null;
  logExcerpt?: string | null;
  proofWarnings?: string[];
  browserWarnings?: string[];
  assetWarnings?: string[];
  proofAttempts?: Record<string, unknown>[];
  proofAcceptedWithWarnings?: boolean;
  verificationSkippedForPreview?: boolean;
  previewMode?: string | null;
  previewBuildMode?: string | null;
  fullSiteBuildSkipped?: boolean;
  renderMode?: string | null;
  renderConfidence?: string | null;
  fallbackReason?: string | null;
  previewUnavailableReason?: string | null;
  proof?: Record<string, unknown>;
  nativePreviewFailure?: Record<string, unknown>;
  visualFallback?: {
    cssSources?: string[];
    cssWarnings?: string[];
    assetProxyEnabled?: boolean;
    mockedRoutes?: string[];
  } | Record<string, unknown> | null;
  platformProvider?: string | null;
  platformStatus?: string | null;
  deploymentId?: string | null;
  deploymentUrl?: string | null;
  routeUrl?: string | null;
  logsUrl?: string | null;
  commitSha?: string | null;
  branchName?: string | null;
  builderWorkflow?: string | null;
  builderRunUrl?: string | null;
}

export type VibeMarketingComponentCommentStatus = "draft" | "submitted" | "applied" | "superseded" | string;

export interface VibeMarketingComponentCommentAnchor {
  x: number;
  y: number;
  createdFrom?: string | null;
}

export interface VibeMarketingComponentCommentRect {
  left?: number | null;
  top?: number | null;
  right?: number | null;
  bottom?: number | null;
  width?: number | null;
  height?: number | null;
}

export interface VibeMarketingComponentCommentClick {
  x?: number | null;
  y?: number | null;
  pageX?: number | null;
  pageY?: number | null;
}

export interface VibeMarketingComponentCommentViewport {
  width?: number | null;
  height?: number | null;
  scrollX?: number | null;
  scrollY?: number | null;
  devicePixelRatio?: number | null;
}

export interface VibeMarketingComponentCommentContext {
  domPath?: string | null;
  textHash?: string | null;
  textExcerpt?: string | null;
  rect?: VibeMarketingComponentCommentRect | null;
  click?: VibeMarketingComponentCommentClick | null;
  viewport?: VibeMarketingComponentCommentViewport | null;
  pageUrl?: string | null;
  previewMode?: string | null;
}

export interface VibeMarketingComponentFeedbackComment {
  id: string;
  componentId: string;
  componentType: string;
  componentLabel?: string | null;
  sourceSectionId?: string | null;
  selector?: string | null;
  anchor?: VibeMarketingComponentCommentAnchor | null;
  context?: VibeMarketingComponentCommentContext | null;
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
  prNumber?: number | string | null;
  mergeStatus?: string | null;
  checksStatus?: string | null;
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

export interface VibeMarketingGithubRepo {
  fullName: string;
  full_name?: string;
  owner?: string;
  name?: string;
  private?: boolean;
  defaultBranch?: string | null;
  default_branch?: string | null;
  installationId?: string | null;
  installation_id?: string | null;
}

export interface VibeMarketingGithubReposResponse {
  status: string;
  connectionState?: string | null;
  connection_state?: string | null;
  credentialSource?: string | null;
  credential_source?: string | null;
  githubRepo?: string | null;
  github_repo?: string | null;
  selectedRepo?: string | null;
  selected_repo?: string | null;
  repos: VibeMarketingGithubRepo[];
  repositories?: VibeMarketingGithubRepo[];
  error?: string | null;
}

export interface VibeMarketingBootstrap {
  company: VibeMarketingCompany;
  organization: VibeMarketingOrganization;
  settings: VibeMarketingSettings;
  startupProfile: VibeMarketingStartupProfile;
  websiteBaseline: VibeMarketingWebsiteBaseline;
  googleBaselineConnection: VibeMarketingGoogleBaselineConnection;
  checks: Record<string, VibeMarketingCheck>;
  articleSetupState?: VibeMarketingArticleSetupState | null;
  article_setup_state?: VibeMarketingArticleSetupState | null;
  latestRuns: VibeMarketingRunSummary[];
  latestRunsByWorkflow: Record<string, VibeMarketingRunSummary>;
  topicCandidates: VibeMarketingTopicCandidate[];
  topicPillars: VibeMarketingTopicPillar[];
  hiddenTopicCandidates: VibeMarketingTopicCandidate[];
  declinedTopicFeedback: VibeMarketingTopicFeedback[];
  draftArticles: VibeMarketingDraftArticle[];
  writtenTopics: VibeMarketingWrittenTopic[];
  publishEvidence: VibeMarketingPublishEvidence;
  guidedSteps: VibeMarketingGuidedStep[];
  currentGuidedStep?: string | null;
  recommendedNextAction?: {
    key: string;
    label: string;
  };
  workflowProgress?: VibeMarketingWorkflowProgress | null;
  hasCompletedArticleFlow?: boolean;
  startPageMode?: "first_article_setup" | "topic_picker" | string;
}
