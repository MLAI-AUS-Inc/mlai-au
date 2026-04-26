import type { User } from "~/types/user";

export type VibeRaisingRole = "founder" | "investor";

export interface VibeRaisingCompany {
  id: string;
  name: string;
  domain?: string | null;
  companyLinkedInUrl?: string | null;
  abn?: string | null;
  location?: string | null;
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
  location?: string | null;
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
  summary?: string;
  sourceUrl?: string;
  videoUrl?: string;
  videoStoragePath?: string;
  videoContentType?: string;
  videoFileSizeBytes?: number | null;
  videoOriginalFilename?: string;
  highlights: string;
  challenges: string;
  asks: string;
  pastMonths: VibeRaisingPastMonthSummary[];
  metrics?: Record<string, string>;
}

export interface VibeRaisingMonthlyUpdate {
  id: string;
  isoMonth?: string | null;
  month: string;
  monthName?: string | null;
  year?: number;
  date: string;
  status?: string | null;
  summary?: string | null;
  sourceUrl?: string | null;
  videoUrl?: string | null;
  videoStoragePath?: string | null;
  videoContentType?: string | null;
  videoFileSizeBytes?: number | null;
  videoOriginalFilename?: string | null;
  metrics: Record<string, string>;
  highlights: string;
  challenges: string;
  asks: string;
}

export interface VibeRaisingVideoUploadResponse {
  videoUrl: string;
  storagePath: string;
  contentType: string;
  fileSizeBytes: number;
  originalFilename: string;
}

export interface VibeRaisingVideoUploadSessionResponse {
  uploadUrl: string;
  storagePath: string;
  contentType: string;
  fileSizeBytes?: number;
  expiresAt: string;
  maxUploadBytes: number;
  requiredHeaders: Record<string, string>;
}

export interface VibeRaisingVideoCompressionMetadata {
  compressed?: boolean;
  originalFilename?: string;
  originalContentType?: string;
  originalFileSizeBytes?: number;
  compressedFileSizeBytes?: number;
  compressionRatio?: number | null;
}

export type VibeRaisingInputSourceKey =
  | "gmail"
  | "stripe"
  | "xero"
  | "bank_feed"
  | "notion"
  | "google_drive"
  | "slack"
  | "linear";

export type VibeRaisingInputSourceStatus =
  | "connected"
  | "not_connected"
  | "syncing"
  | "error"
  | "coming_soon"
  | "unavailable";

export type VibeRaisingInputSourceCapability =
  | "metrics"
  | "context"
  | "cash_validation"
  | "docs";

export interface VibeRaisingInputSourceSummary {
  key: VibeRaisingInputSourceKey;
  label: string;
  accountLabel?: string | null;
  capabilities: VibeRaisingInputSourceCapability[];
  selected: boolean;
  status: VibeRaisingInputSourceStatus;
  lastSyncedAt?: string | null;
  warning?: string | null;
  selectedChannelCount?: number;
  selectedProjectCount?: number;
}

export interface VibeRaisingInputSourcesStatusResponse {
  sources: VibeRaisingInputSourceSummary[];
  financeUnavailable: boolean;
}

export interface VibeRaisingBankFeedAccount {
  id: number | string;
  connectionId?: number | string | null;
  externalAccountId: string;
  institutionName?: string | null;
  accountLabel: string;
  accountType?: string | null;
  status?: string | null;
  currency?: string | null;
  balance?: string | null;
  availableFunds?: string | null;
  lastSyncedAt?: string | null;
}

export interface VibeRaisingBankFeedTransaction {
  id: number | string;
  connectionId?: number | string | null;
  accountId?: number | string | null;
  externalAccountId: string;
  externalTransactionId: string;
  amount?: string | null;
  currency?: string | null;
  direction?: string | null;
  status?: string | null;
  postedAt?: string | null;
  transactionDate?: string | null;
  description?: string | null;
  merchantName?: string | null;
  category?: string | null;
  className?: string | null;
  accountLabel?: string | null;
}

export interface VibeRaisingBankFeedPreview {
  accounts: VibeRaisingBankFeedAccount[];
  transactions: VibeRaisingBankFeedTransaction[];
}

export interface VibeRaisingGmailMessagePreview {
  id: number | string;
  gmailMessageId: string;
  gmailThreadId?: string | null;
  subject: string;
  fromAddress?: string | null;
  date?: string | null;
  internalDate?: string | null;
  snippet?: string | null;
  relevanceLabel?: string | null;
  hasAttachments: boolean;
}

export interface VibeRaisingGmailPreview {
  accountLabel?: string | null;
  lastSyncedAt?: string | null;
  totalCachedMessages: number;
  warnings: string[];
  messages: VibeRaisingGmailMessagePreview[];
}

export interface VibeRaisingSlackChannel {
  id?: number | string;
  channelId: string;
  channelName: string;
  name?: string | null;
  isPrivate: boolean;
  selected: boolean;
  lastSyncedAt?: string | null;
}

export interface VibeRaisingSlackChannelsResponse {
  accountLabel?: string | null;
  teamId?: string | null;
  channels: VibeRaisingSlackChannel[];
  nextCursor?: string | null;
  warnings: string[];
}

export interface VibeRaisingSlackMessagePreview {
  channelId: string;
  channelName?: string | null;
  messageTs: string;
  threadTs?: string | null;
  authorLabel?: string | null;
  postedAt?: string | null;
  text: string;
  relevanceLabel?: string | null;
}

export interface VibeRaisingSlackPreview {
  accountLabel?: string | null;
  teamId?: string | null;
  lastSyncedAt?: string | null;
  selectedChannels: VibeRaisingSlackChannel[];
  totalCachedMessages: number;
  warnings: string[];
  messages: VibeRaisingSlackMessagePreview[];
}

export interface VibeRaisingLinearProject {
  id?: number | string;
  projectId: string;
  linearProjectId?: string;
  projectName: string;
  name?: string | null;
  status?: string | null;
  health?: string | null;
  selected: boolean;
  lastSyncedAt?: string | null;
}

export interface VibeRaisingLinearProjectsResponse {
  accountLabel?: string | null;
  workspaceId?: string | null;
  projects: VibeRaisingLinearProject[];
  nextCursor?: string | null;
  warnings: string[];
}

export interface VibeRaisingLinearIssuePreview {
  id: string;
  identifier?: string | null;
  projectId?: string | null;
  projectName?: string | null;
  title: string;
  stateName?: string | null;
  stateType?: string | null;
  priorityLabel?: string | null;
  assigneeName?: string | null;
  updatedAt?: string | null;
  url?: string | null;
}

export interface VibeRaisingLinearProjectUpdatePreview {
  id: string;
  projectId?: string | null;
  projectName?: string | null;
  body: string;
  health?: string | null;
  authorName?: string | null;
  updatedAt?: string | null;
  url?: string | null;
}

export interface VibeRaisingLinearProjectPreview {
  id: number | string;
  projectId: string;
  name: string;
  description?: string | null;
  statusName?: string | null;
  statusType?: string | null;
  health?: string | null;
  progress?: number | null;
  scope?: number | null;
  priority?: number | null;
  leadName?: string | null;
  teamNames: string[];
  targetDate?: string | null;
  url?: string | null;
  issueCount: number;
  updateCount: number;
}

export interface VibeRaisingLinearPreview {
  accountLabel?: string | null;
  workspaceId?: string | null;
  lastSyncedAt?: string | null;
  selectedProjects: VibeRaisingLinearProject[];
  projects: VibeRaisingLinearProjectPreview[];
  projectUpdates: VibeRaisingLinearProjectUpdatePreview[];
  issues: VibeRaisingLinearIssuePreview[];
  totalCachedProjects: number;
  totalCachedIssues: number;
  totalCachedUpdates: number;
  warnings: string[];
}

export interface VibeRaisingXeroRecord {
  id: number | string;
  connectionId?: number | string | null;
  recordType: string;
  externalRecordId: string;
  externalTenantId?: string | null;
  invoiceNumber?: string | null;
  amount?: string | null;
  currency?: string | null;
  direction?: string | null;
  status?: string | null;
  postedAt?: string | null;
  transactionDate?: string | null;
  description?: string | null;
  contactName?: string | null;
  category?: string | null;
  className?: string | null;
}

export interface VibeRaisingXeroPreview {
  tenantLabel?: string | null;
  tenantId?: string | null;
  lastSyncedAt?: string | null;
  monthlyRecurringRevenue?: string | null;
  revenue?: string | null;
  revenueGrowthRate?: string | null;
  burnRate?: string | null;
  runway?: string | null;
  monthlyCosts?: string | null;
  operatingExpenses?: string | null;
  costOfSales?: string | null;
  invoiceRevenue?: string | null;
  invoiceCount?: string | null;
  customerCount?: string | null;
  recurringInvoiceCount?: string | null;
  cashCollected?: string | null;
  currencies: string[];
  warnings: string[];
  recurringInvoices: VibeRaisingXeroRecord[];
  recentInvoices: VibeRaisingXeroRecord[];
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
  summary?: string;
  sourceUrl?: string;
  videoUrl?: string;
  videoStoragePath?: string;
  videoContentType?: string;
  videoFileSizeBytes?: number | null;
  videoOriginalFilename?: string;
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
