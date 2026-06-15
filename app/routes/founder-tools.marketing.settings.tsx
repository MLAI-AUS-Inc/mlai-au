import type { Route } from "./+types/founder-tools.marketing.settings";
import { Form, Link, redirect, useActionData, useLoaderData, useNavigation, useSearchParams } from "react-router";
import { ArrowLeftIcon, ArrowPathIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

import DailyReminderChannels, { CHANNEL_INTENTS } from "~/components/DailyReminderChannels";
import FounderStartupDetailsStep from "~/components/FounderStartupDetailsStep";
import { getEnv } from "~/lib/env.server";
import { parseFounderProfilesFormValue } from "~/lib/founder-profiles";
import {
  createNotificationChannel,
  getVibeMarketingBootstrap,
  removeNotificationChannel,
  resendNotificationChannelCode,
  saveVibeMarketingSettings,
  verifyNotificationChannelOtp,
} from "~/lib/vibe-marketing";
import {
  getActiveVibeRaisingCompany,
  requireVibeRaisingFounder,
  saveVibeRaisingCompany,
} from "~/lib/vibe-raising";

function listFromForm(value: FormDataEntryValue | null) {
  return String(value ?? "")
    .split(/[,\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function stringFromForm(formData: FormData, key: string) {
  return String(formData.get(key) ?? "").trim();
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
  await requireVibeRaisingFounder(env, request);
  return { bootstrap: await getVibeMarketingBootstrap(env, request) };
}

export async function action({ request, context }: Route.ActionArgs) {
  const env = getEnv(context);
  const { appUser } = await requireVibeRaisingFounder(env, request);
  const activeCompany = getActiveVibeRaisingCompany(appUser);
  const formData = await request.formData();

  const intent = stringFromForm(formData, "intent");
  if ((CHANNEL_INTENTS as readonly string[]).includes(intent)) {
    try {
      if (intent === "connect-channel") {
        await createNotificationChannel(env, request, {
          channelType: stringFromForm(formData, "channelType"),
          routeId: stringFromForm(formData, "routeId"),
        });
      } else if (intent === "verify-channel-otp") {
        const code = stringFromForm(formData, "code");
        if (!code) return { intent, error: "Enter the 6-digit code from WhatsApp." };
        await verifyNotificationChannelOtp(env, request, stringFromForm(formData, "channelId"), code);
      } else if (intent === "resend-channel-otp") {
        await resendNotificationChannelCode(env, request, stringFromForm(formData, "channelId"));
      } else if (intent === "remove-channel") {
        await removeNotificationChannel(env, request, stringFromForm(formData, "channelId"));
      }
    } catch (error: any) {
      return {
        intent,
        error:
          error?.data?.detail ??
          error?.response?.data?.detail ??
          error?.message ??
          "That channel action could not be completed.",
      };
    }
    return { intent };
  }

  const { founderProfiles, founderNames } = founderNamesFromForm(formData);

  try {
    await saveVibeRaisingCompany(env, request, {
      companyId: activeCompany?.id ?? null,
      name: stringFromForm(formData, "companyName"),
      domain: stringFromForm(formData, "domain"),
      companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
      location: stringFromForm(formData, "location"),
      abn: stringFromForm(formData, "abn"),
      companyContext: stringFromForm(formData, "companyContext"),
      competitors: listFromForm(formData.get("competitors")),
      seedKeywords: listFromForm(formData.get("seedKeywords")),
      founderNames,
      founderProfiles,
      stage: stringFromForm(formData, "stage"),
      organizationKind: stringFromForm(formData, "organizationKind"),
      shortDescription: stringFromForm(formData, "shortDescription"),
      problemSolved: stringFromForm(formData, "problemSolved"),
      targetAudience: stringFromForm(formData, "targetAudience"),
      notes: stringFromForm(formData, "targetAudience"),
      githubRepo: stringFromForm(formData, "githubRepo"),
      articleDeliveryMode: stringFromForm(formData, "articleDeliveryMode"),
      dailyDiscoveryEnabled: formData.get("dailyDiscoveryEnabled") === "on",
      defaultTimezone: stringFromForm(formData, "defaultTimezone"),
      registered: true,
    });
    await saveVibeMarketingSettings(env, request, {
      domain: stringFromForm(formData, "domain"),
      companyLinkedInUrl: stringFromForm(formData, "companyLinkedInUrl"),
      company_linkedin_url: stringFromForm(formData, "companyLinkedInUrl"),
      companyContext: stringFromForm(formData, "companyContext"),
      competitors: listFromForm(formData.get("competitors")),
      seedKeywords: listFromForm(formData.get("seedKeywords")),
      shortDescription: stringFromForm(formData, "shortDescription"),
      problemSolved: stringFromForm(formData, "problemSolved"),
      targetAudience: stringFromForm(formData, "targetAudience"),
      githubRepo: stringFromForm(formData, "githubRepo"),
      articleDeliveryMode: stringFromForm(formData, "articleDeliveryMode"),
      dailyDiscoveryEnabled: formData.get("dailyDiscoveryEnabled") === "on",
      defaultTimezone: stringFromForm(formData, "defaultTimezone"),
    });
  } catch (error: any) {
    return {
      error:
        error?.data?.detail ??
        error?.response?.data?.detail ??
        error?.message ??
        "Settings could not be saved.",
    };
  }

  throw redirect("/founder-tools/marketing");
}

const EMAIL_CHANNEL_BANNERS: Record<string, { tone: "success" | "error"; message: string }> = {
  verified: { tone: "success", message: "Email channel verified. Daily research topics will be sent there." },
  expired: { tone: "error", message: "That verification link has expired. Send a new one below." },
  invalid: { tone: "error", message: "That verification link is no longer valid. Send a new one below." },
};

export default function FounderToolsMarketingSettings() {
  const { bootstrap } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const [searchParams] = useSearchParams();
  const emailChannelBanner = EMAIL_CHANNEL_BANNERS[searchParams.get("emailChannel") ?? ""] ?? null;
  const dailyCheck = bootstrap.checks.dailyAutomation;
  const channelError =
    actionData && "intent" in actionData && actionData.error &&
    (CHANNEL_INTENTS as readonly string[]).includes(String(actionData.intent))
      ? actionData.error
      : null;

  return (
    <div className="mx-auto max-w-5xl space-y-6 px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between gap-4 border-b border-gray-200 pb-5">
        <div>
          <Link to="/founder-tools/marketing" className="mb-3 inline-flex items-center gap-2 text-sm font-bold text-gray-500 hover:text-gray-800">
            <ArrowLeftIcon className="h-4 w-4" />
            Back to marketing
          </Link>
          <h1 className="text-2xl font-black text-gray-950">Marketing settings</h1>
        </div>
      </div>

      {emailChannelBanner ? (
        <div
          className={
            emailChannelBanner.tone === "success"
              ? "rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800"
              : "rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm font-semibold text-amber-800"
          }
        >
          {emailChannelBanner.message}
        </div>
      ) : null}

      {actionData?.error && !channelError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {actionData.error}
        </div>
      ) : null}

      <Form method="POST" className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <FounderStartupDetailsStep
          defaults={{
            companyName: bootstrap.company.name,
            domain: bootstrap.company.domain ?? bootstrap.organization.domain,
            companyLinkedInUrl: bootstrap.organization.companyLinkedInUrl ?? bootstrap.company.companyLinkedInUrl,
            location: bootstrap.company.location,
            abn: bootstrap.company.abn,
            brandName: bootstrap.settings.brandName ?? bootstrap.organization.name,
            companyContext: bootstrap.settings.companyContext,
            competitors: bootstrap.organization.competitors,
            seedKeywords: bootstrap.organization.seedKeywords,
            founderNames: bootstrap.startupProfile.founderNames,
            founderProfiles: bootstrap.startupProfile.founderProfiles ?? [],
            stage: bootstrap.startupProfile.stage,
            organizationKind: bootstrap.startupProfile.organizationKind,
            notes: bootstrap.startupProfile.notes,
          }}
        />

        <div className="mt-6 grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-gray-700">GitHub repo</span>
            <input name="githubRepo" defaultValue={bootstrap.settings.githubRepo ?? ""} placeholder="owner/repo" className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-gray-700">Delivery mode</span>
            <select name="articleDeliveryMode" defaultValue={bootstrap.settings.articleDeliveryMode ?? "review_draft"} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-bold outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10">
              <option value="review_draft">Review draft first</option>
              <option value="publish_code">Publish code</option>
              <option value="content_only">Content only</option>
            </select>
          </label>
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-[1fr_220px]">
          <label className="flex items-start gap-3 rounded-xl border border-gray-200 p-4">
            <input name="dailyDiscoveryEnabled" type="checkbox" defaultChecked={bootstrap.settings.dailyDiscoveryEnabled} className="mt-1 h-4 w-4 rounded border-gray-300 text-violet-600" />
            <span>
              <span className="block text-sm font-black text-gray-950">Enable daily generation</span>
              <span className="mt-1 block text-sm text-gray-600">Candidates are generated daily and still require approval before publish.</span>
            </span>
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold text-gray-700">Timezone</span>
            <input name="defaultTimezone" defaultValue={bootstrap.settings.defaultTimezone ?? "Australia/Melbourne"} className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm font-medium outline-none focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10" />
          </label>
        </div>

        <button type="submit" disabled={isSubmitting} className="mt-6 inline-flex items-center gap-2 rounded-xl bg-violet-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-violet-700 disabled:opacity-60">
          {isSubmitting ? <ArrowPathIcon className="h-4 w-4 animate-spin" /> : <CheckCircleIcon className="h-4 w-4" />}
          Save settings
        </button>
      </Form>

      <section className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h2 className="text-lg font-black text-gray-950">Daily reminder notifications</h2>
        <p className="mt-1 text-sm text-gray-600">
          Choose where the daily research topics are sent. Verified channels all receive the same message each morning.
        </p>
        <div className="mt-4 max-w-xl">
          <DailyReminderChannels
            channels={dailyCheck?.channels ?? []}
            isSubmitting={isSubmitting}
            error={channelError}
            errorIntent={actionData && "intent" in actionData ? String(actionData.intent) : null}
          />
        </div>
      </section>
    </div>
  );
}
