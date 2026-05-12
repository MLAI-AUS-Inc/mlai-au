import { redirect, useActionData, useLoaderData } from "react-router";
import type { Route } from "./+types/vibe-raising-app.company-setup";
import VibeMarketingStartupBaselineSetup from "~/components/VibeMarketingStartupBaselineSetup";
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

function fieldLabel(field: string) {
  const labels: Record<string, string> = {
    companyLinkedInUrl: "Company LinkedIn URL",
    company_linkedin_url: "Company LinkedIn URL",
    organizationKind: "Organization type",
    organization_kind: "Organization type",
    companyId: "Company",
    company_id: "Company",
    name: "Company name",
    domain: "Website domain",
    abn: "ABN",
    location: "Startup location",
    non_field_errors: "Company details",
  };
  return labels[field] ?? field.replace(/_/g, " ");
}

function readableBackendError(error: any) {
  const data = error?.data ?? error?.response?.data;

  if (typeof data === "string" && data.trim()) {
    return data.trim();
  }

  if (data && typeof data === "object") {
    const payload = data as Record<string, unknown>;
    for (const key of ["detail", "error", "message"]) {
      const value = payload[key];
      if (typeof value === "string" && value.trim()) {
        return value.trim();
      }
    }

    const fieldMessages = Object.entries(payload)
      .flatMap(([field, value]) => {
        const messages = Array.isArray(value) ? value : [value];
        return messages
          .map((item) => String(item ?? "").trim())
          .filter(Boolean)
          .map((message) => `${fieldLabel(field)}: ${message}`);
      })
      .filter(Boolean);

    if (fieldMessages.length > 0) {
      return fieldMessages.join(" ");
    }
  }

  return error?.message ?? "Company details could not be saved.";
}

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
      organizationKind: null,
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
        existingFields: {
          companyContext,
          competitors: listFromForm(formData.get("competitors")),
          seedKeywords: listFromForm(formData.get("seedKeywords")),
          companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
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
    if (!companyName) {
      return { intent, error: "Add your startup or company name before continuing." };
    }
    if (!domain) {
      return { intent, error: "Add your website domain before continuing." };
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
      location: stringFromForm(formData, "location"),
      abn: stringFromForm(formData, "abn"),
      brandName: companyName,
      companyContext,
      competitors: listFromForm(formData.get("competitors")),
      seedKeywords: listFromForm(formData.get("seedKeywords")),
      founderNames,
      founderProfiles,
      stage: stringFromForm(formData, "stage"),
      organizationKind: stringFromForm(formData, "organizationKind"),
      notes: stringFromForm(formData, "targetAudience"),
      registered: true,
    });

    if (companyId) {
      await setVibeRaisingActiveCompany(env, request, companyId);
    }
  } catch (error: any) {
    if (error instanceof Response) throw error;
    return { intent, error: readableBackendError(error) };
  }

  throw redirect("/founder-tools");
}

export default function CompanySetup() {
  const { bootstrap, isAddingNew, isEditingExisting } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const error = actionData && typeof actionData === "object" && "error" in actionData ? String(actionData.error ?? "") : null;
  const title = isAddingNew ? "Add a company" : isEditingExisting ? "Edit company setup" : "Set up your company";

  return (
    <div className="min-h-screen bg-[#fbfaf8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-sm font-black text-violet-700">Founder Tools</p>
          <h1 className="mt-2 text-3xl font-black tracking-normal text-gray-950">{title}</h1>
          <p className="mt-2 max-w-2xl text-sm font-semibold leading-6 text-gray-600">
            These details power Vibe Raising and Vibe Marketing, so you only need to set them up once.
          </p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
          <VibeMarketingStartupBaselineSetup
            bootstrap={bootstrap}
            error={error}
            variant="workflow"
            includeBaseline={false}
            setupEyebrow="Company setup"
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
            primaryActionLabel={isAddingNew ? "Add company" : "Save and go to dashboard"}
            showSecondaryAction={false}
            advancedOpenByDefault
          />
        </div>
      </div>
    </div>
  );
}
