import { redirect, useActionData, useLoaderData } from "react-router";
import type { Route } from "./+types/vibe-raising-app.company-setup";
import VibeMarketingStartupBaselineSetup from "~/components/VibeMarketingStartupBaselineSetup";
import { readableBackendError } from "~/lib/backend-error";
import { getEnv } from "~/lib/env.server";
import { parseFounderProfilesFormValue } from "~/lib/founder-profiles";
import {
  getVibeMarketingBootstrap,
  startVibeMarketingAutofill,
} from "~/lib/vibe-marketing";
import { combineCompanyContext } from "~/lib/vibe-marketing-startup-setup";
import {
  getActiveVibeRaisingCompany,
  getOptionalVibeRaisingContext,
  getVibeRaisingLoginHref,
  saveVibeRaisingCompany,
  saveVibeRaisingProfile,
  setVibeRaisingActiveCompany,
} from "~/lib/vibe-raising";
import type { VibeMarketingBootstrap } from "~/types/vibe-marketing";
import type { VibeRaisingCompany, VibeRaisingProfile } from "~/types/vibe-raising";

function listFromForm(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringFromForm(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
}

const COMPANY_SETUP_FIELD_LABELS: Record<string, string> = {
  companyLinkedInUrl: "Company LinkedIn URL",
  company_linkedin_url: "Company LinkedIn URL",
  organizationKind: "Organization type",
  organization_kind: "Organization type",
  hasRevenue: "Revenue status",
  has_revenue: "Revenue status",
  companyId: "Company",
  company_id: "Company",
  name: "Company name",
  domain: "Website domain",
  abn: "ABN",
  location: "Startup location",
  stage: "Stage",
  shortDescription: "Short description",
  short_description: "Short description",
  non_field_errors: "Company details",
};

function emptyBootstrap(profile: VibeRaisingProfile | null, company: VibeRaisingCompany | null): VibeMarketingBootstrap {
  const companyName = company?.name ?? profile?.organizationName ?? "";
  const domain = company?.domain ?? "";

  return {
    company: {
      id: company?.id ?? "",
      name: companyName,
      domain,
      companyLinkedInUrl: company?.companyLinkedInUrl ?? null,
      location: company?.location ?? null,
      abn: company?.abn ?? null,
      organizationId: null,
    },
    organization: {
      id: null,
      name: companyName,
      domain,
      companyLinkedInUrl: company?.companyLinkedInUrl ?? null,
      competitors: [],
      seedKeywords: [],
    },
    settings: {
      brandName: companyName || null,
      companyContext: null,
      articleDeliveryMode: "review_draft",
      githubRepo: null,
      dailyDiscoveryEnabled: false,
      dailyDiscoveryPriority: 0,
      defaultTimezone: null,
      githubConnectionState: null,
    },
    startupProfile: {
      founderNames: [],
      stage: null,
      organizationKind: company?.organizationKind ?? null,
      hasRevenue: company?.hasRevenue ?? null,
      notes: null,
      companyAliases: companyName ? [companyName] : [],
      domainAliases: domain ? [domain] : [],
      competitorDomains: [],
      positiveKeywords: [],
    },
    websiteBaseline: {
      status: "missing",
      passed: false,
      skipped: false,
      domain,
      collectedAt: null,
      overallScore: null,
      summary: null,
      sourceStatus: {},
      metrics: {},
      recommendations: [],
    },
    googleBaselineConnection: {
      connected: false,
      hasBaselineScopes: false,
      status: "needs_connection",
      connectUrl: null,
    },
    checks: {},
    latestRuns: [],
    latestRunsByWorkflow: {},
    topicCandidates: [],
    topicPillars: [],
    hiddenTopicCandidates: [],
    declinedTopicFeedback: [],
    draftArticles: [],
    writtenTopics: [],
    publishEvidence: {},
    guidedSteps: [],
    currentGuidedStep: "startupDetails",
    recommendedNextAction: { key: "startupDetails", label: "Add startup details" },
    workflowProgress: null,
    hasCompletedArticleFlow: false,
    startPageMode: "first_article_setup",
  };
}

function companyContextFromForm(formData: FormData) {
  return (
    stringFromForm(formData, "companyContext") ||
    combineCompanyContext({
      shortDescription: stringFromForm(formData, "shortDescription"),
      problemSolved: stringFromForm(formData, "problemSolved"),
      targetAudience: stringFromForm(formData, "targetAudience"),
    })
  );
}

function founderNamesFromForm(formData: FormData) {
    const founderProfiles = parseFounderProfilesFormValue(formData.get("founderProfiles"));
    const founderNames = founderProfiles
        .map((profile) => profile.name)
        .filter(Boolean);

    return {
        founderProfiles,
        founderNames: founderNames.length > 0 ? founderNames : listFromForm(formData.get("founderNames")),
    };
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const vibeContext = await getOptionalVibeRaisingContext(env, request);

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  const url = new URL(request.url);
  const isAddingNew = url.searchParams.get("new") === "true";
  const activeCompany = isAddingNew
    ? null
    : vibeContext.appUser
      ? getActiveVibeRaisingCompany(vibeContext.appUser)
      : vibeContext.profile
        ? getActiveVibeRaisingCompany(vibeContext.profile)
        : null;

  let bootstrap = emptyBootstrap(vibeContext.profile, activeCompany);
  if (activeCompany && !isAddingNew) {
    try {
      bootstrap = await getVibeMarketingBootstrap(env, request);
    } catch {
      bootstrap = emptyBootstrap(vibeContext.profile, activeCompany);
    }
  }

  return {
    bootstrap,
    isAddingNew,
    isEditingExisting: Boolean(activeCompany && !isAddingNew && activeCompany.registered),
  };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const vibeContext = await getOptionalVibeRaisingContext(env, request);

  if (!vibeContext.authUser) {
    throw redirect(getVibeRaisingLoginHref(request));
  }

  const url = new URL(request.url);
  const isAddingNew = url.searchParams.get("new") === "true";
  const formData = await request.formData();
  const intent = stringFromForm(formData, "intent");
  const companyContext = companyContextFromForm(formData);

  try {
    if (intent === "start-autofill") {
      if (!vibeContext.profile) {
        await saveVibeRaisingProfile(env, request, {
          role: "founder",
          organizationName: null,
        });
      }

      const result = await startVibeMarketingAutofill(env, request, {
        companyName: stringFromForm(formData, "companyName"),
        company_name: stringFromForm(formData, "companyName"),
        domain: stringFromForm(formData, "domain"),
        companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
        company_linkedin_url: stringFromForm(formData, "companyLinkedInUrl"),
        location: stringFromForm(formData, "location"),
        abn: stringFromForm(formData, "abn"),
        organizationKind: stringFromForm(formData, "organizationKind"),
        organization_kind: stringFromForm(formData, "organizationKind"),
        hasRevenue: stringFromForm(formData, "hasRevenue"),
        has_revenue: stringFromForm(formData, "hasRevenue"),
        shortDescription: stringFromForm(formData, "shortDescription"),
        short_description: stringFromForm(formData, "shortDescription"),
        problemSolved: stringFromForm(formData, "problemSolved"),
        problem_solved: stringFromForm(formData, "problemSolved"),
        targetAudience: stringFromForm(formData, "targetAudience"),
        target_audience: stringFromForm(formData, "targetAudience"),
        founderNames: listFromForm(formData.get("founderNames")),
        founder_names: listFromForm(formData.get("founderNames")),
        stage: stringFromForm(formData, "stage"),
        notes: stringFromForm(formData, "targetAudience"),
        existingFields: {
          companyContext,
          competitors: listFromForm(formData.get("competitors")),
          seedKeywords: listFromForm(formData.get("seedKeywords")),
          companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
          profileFields: {
            shortDescription: stringFromForm(formData, "shortDescription"),
            problemSolved: stringFromForm(formData, "problemSolved"),
            targetAudience: stringFromForm(formData, "targetAudience"),
            location: stringFromForm(formData, "location"),
            founderNames: listFromForm(formData.get("founderNames")),
            stage: stringFromForm(formData, "stage"),
            organizationKind: stringFromForm(formData, "organizationKind"),
            hasRevenue: stringFromForm(formData, "hasRevenue"),
            abn: stringFromForm(formData, "abn"),
          },
        },
        companyContext,
        competitors: listFromForm(formData.get("competitors")),
        seedKeywords: listFromForm(formData.get("seedKeywords")),
      });
      return { intent, autofillRunId: result.runId, status: result.status, error: result.error, errors: result.errors };
    }

    if (intent !== "save-startup-details") {
      return null;
    }

    const companyName = stringFromForm(formData, "companyName");
    const domain = stringFromForm(formData, "domain");
    const abn = stringFromForm(formData, "abn");
    const location = stringFromForm(formData, "location");
    const stage = stringFromForm(formData, "stage");
    const organizationKind = stringFromForm(formData, "organizationKind");
    const hasRevenue = stringFromForm(formData, "hasRevenue");
    const shortDescription = stringFromForm(formData, "shortDescription");
    if (!companyName) {
      return { intent, error: "Add your startup or company name before continuing." };
    }
    if (!domain) {
      return { intent, error: "Add your website domain before continuing." };
    }
    if (!abn) {
      return { intent, error: "Add your ABN before continuing." };
    }
    if (!location) {
      return { intent, error: "Add your startup location before continuing." };
    }
    if (!stage) {
      return { intent, error: "Select your startup stage before continuing." };
    }
    if (!organizationKind) {
      return { intent, error: "Select your organization type before continuing." };
    }
    if (!hasRevenue) {
      return { intent, error: "Select whether you have revenue before continuing." };
    }
    if (!shortDescription) {
      return { intent, error: "Add a short description before continuing." };
    }

    if (!vibeContext.profile) {
      await saveVibeRaisingProfile(env, request, {
        role: "founder",
        organizationName: null,
      });
    }

    const activeCompany = vibeContext.appUser
      ? getActiveVibeRaisingCompany(vibeContext.appUser)
      : vibeContext.profile
        ? getActiveVibeRaisingCompany(vibeContext.profile)
        : null;
    const { founderProfiles, founderNames } = founderNamesFromForm(formData);
    const companyId = await saveVibeRaisingCompany(env, request, {
      companyId: isAddingNew ? null : activeCompany?.id ?? null,
      name: companyName,
      domain,
      companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
      location,
      abn,
      brandName: companyName,
      companyContext,
      competitors: listFromForm(formData.get("competitors")),
      seedKeywords: listFromForm(formData.get("seedKeywords")),
      founderNames,
      founderProfiles,
      stage,
      organizationKind,
      hasRevenue,
      shortDescription,
      problemSolved: stringFromForm(formData, "problemSolved"),
      targetAudience: stringFromForm(formData, "targetAudience"),
      notes: stringFromForm(formData, "targetAudience"),
      registered: true,
    });

    if (companyId) {
      await setVibeRaisingActiveCompany(env, request, companyId);
    }
  } catch (error: any) {
    if (error instanceof Response) throw error;
    return {
      intent,
      error: readableBackendError(error, {
        fallback:
          intent === "start-autofill"
            ? "AI research could not start. Check the backend logs and try again."
            : "Company details could not be saved.",
        fieldLabels: COMPANY_SETUP_FIELD_LABELS,
      }),
    };
  }

  throw redirect("/founder-tools/updates");
}

export default function CompanySetup() {
  const { bootstrap, isAddingNew, isEditingExisting } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const error = actionData && typeof actionData === "object" && "error" in actionData ? String(actionData.error ?? "") : null;
  return (
    <div className="min-h-screen bg-[#f7f6f2] px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <VibeMarketingStartupBaselineSetup
          bootstrap={bootstrap}
          error={error}
          variant="workflow"
          includeBaseline={false}
          setupEyebrow=""
          setupTitle="Tell us about your startup"
          setupDescription="This shared profile is used across Vibe Raising and Vibe Marketing."
          guidanceTitle="Shared profile"
          guidanceBody="The same company details will be reused for investor updates, marketing research, and article generation."
          guidanceTips={[
            "Use the public website domain",
            "Add LinkedIn if the company name is ambiguous",
            "Describe your customer and problem clearly",
            "You can edit these details later",
          ]}
          primaryActionLabel="Save and go to Vibe Raising"
          showSecondaryAction={false}
          advancedOpenByDefault
          showSetupProgress={false}
        />
      </div>
    </div>
  );
}
