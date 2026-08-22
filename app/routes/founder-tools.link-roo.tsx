import { CheckCircle2, Link2, LockKeyhole, TriangleAlert } from "lucide-react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router";
import type { Route } from "./+types/founder-tools.link-roo";
import { apiErrorDetail, createApiClient } from "~/lib/api";
import { getCurrentUser } from "~/lib/auth";
import { getEnv } from "~/lib/env.server";
import {
  clearRooAccountLinkCookie,
  createRooAccountLinkCookie,
  isPlausibleRooAccountLinkToken,
  isRooAccountLinkPageStatus,
  pageStatusForLinkError,
  readRooAccountLinkToken,
  type RooAccountLinkPageStatus,
  withoutRooAccountLinkCookie,
} from "~/lib/roo-account-link";
import { getVibeRaisingLoginHref } from "~/lib/vibe-raising";

const PREVIEW_PATH = "/api/v1/users/slack-founder-link/preview/";
const COMPLETE_PATH = "/api/v1/users/slack-founder-link/complete/";
const CLEAN_PATH = "/founder-tools/link-roo";
const LINK_ROUTE_CSP = [
  "default-src 'self'",
  "base-uri 'self'",
  "connect-src 'self'",
  "font-src 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "img-src 'self' data:",
  "object-src 'none'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
].join("; ");

type LinkPreview = {
  status: "ready" | "already_linked" | "already_connected";
  slack_display_name: string;
  expires_at: string;
};

type LoaderData =
  | { state: "status"; status: RooAccountLinkPageStatus }
  | {
      state: "ready";
      slackDisplayName: string;
      founderEmail: string;
      expiresAt: string;
    }
  | { state: "error"; message: string };

export const meta: Route.MetaFunction = () => [
  { title: "Connect Roo | Founder Tools" },
  {
    name: "description",
    content: "Securely connect your Roo Slack identity to Founder Tools.",
  },
  { name: "robots", content: "noindex, nofollow" },
  { name: "referrer", content: "no-referrer" },
];

export function headers() {
  return {
    "Cache-Control": "no-store",
    "Content-Security-Policy": LINK_ROUTE_CSP,
    "Referrer-Policy": "no-referrer",
  };
}

function responseHeaders(setCookie?: string) {
  const headers = new Headers({
    "Cache-Control": "no-store",
    "Content-Security-Policy": LINK_ROUTE_CSP,
    "Referrer-Policy": "no-referrer",
  });
  if (setCookie) headers.append("Set-Cookie", setCookie);
  return headers;
}

function redirectWithClearedToken(
  request: Request,
  status: RooAccountLinkPageStatus,
) {
  return redirect(`${CLEAN_PATH}?status=${status}`, {
    headers: responseHeaders(clearRooAccountLinkCookie(request)),
  });
}

function apiErrorCode(error: unknown): unknown {
  return (
    error as {
      response?: { data?: { code?: unknown } };
    }
  )?.response?.data?.code;
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const incomingToken = url.searchParams.get("token");

  if (incomingToken !== null) {
    if (!isPlausibleRooAccountLinkToken(incomingToken)) {
      return redirectWithClearedToken(request, "invalid");
    }
    return redirect(CLEAN_PATH, {
      headers: responseHeaders(
        createRooAccountLinkCookie(incomingToken, request),
      ),
    });
  }

  const pageStatus = url.searchParams.get("status");
  if (isRooAccountLinkPageStatus(pageStatus)) {
    return {
      state: "status",
      status: pageStatus,
    } satisfies LoaderData;
  }

  const token = readRooAccountLinkToken(request);
  if (!token) {
    return {
      state: "status",
      status: "invalid",
    } satisfies LoaderData;
  }

  const env = getEnv(context);
  const backendRequest = withoutRooAccountLinkCookie(request);
  const user = await getCurrentUser(env, backendRequest, {
    allowDevBypass: false,
  });
  if (!user) {
    throw redirect(getVibeRaisingLoginHref(request, CLEAN_PATH), {
      headers: responseHeaders(),
    });
  }

  try {
    const client = createApiClient(env, backendRequest);
    const response = await client.post<LinkPreview>(PREVIEW_PATH, { token });
    if (
      response.data.status === "already_linked" ||
      response.data.status === "already_connected"
    ) {
      return redirectWithClearedToken(request, "already-linked");
    }
    return {
      state: "ready",
      slackDisplayName: response.data.slack_display_name,
      founderEmail: String(user.email || ""),
      expiresAt: response.data.expires_at,
    } satisfies LoaderData;
  } catch (error) {
    const terminalStatus = pageStatusForLinkError(apiErrorCode(error));
    if (terminalStatus) {
      return redirectWithClearedToken(request, terminalStatus);
    }
    return {
      state: "error",
      message: apiErrorDetail(
        error,
        "We could not verify this link right now. Please try again.",
      ),
    } satisfies LoaderData;
  }
}

export async function action({ request, context }: Route.ActionArgs) {
  const token = readRooAccountLinkToken(request);
  if (!token) {
    return redirectWithClearedToken(request, "invalid");
  }

  const env = getEnv(context);
  const backendRequest = withoutRooAccountLinkCookie(request);
  const user = await getCurrentUser(env, backendRequest, {
    allowDevBypass: false,
  });
  if (!user) {
    throw redirect(getVibeRaisingLoginHref(request, CLEAN_PATH), {
      headers: responseHeaders(),
    });
  }

  try {
    const client = createApiClient(env, backendRequest);
    const response = await client.post<{
      status: "linked" | "already_linked" | "already_connected";
    }>(COMPLETE_PATH, { token });
    return redirectWithClearedToken(
      request,
      response.data.status === "linked" ? "linked" : "already-linked",
    );
  } catch (error) {
    const terminalStatus = pageStatusForLinkError(apiErrorCode(error));
    if (terminalStatus) {
      return redirectWithClearedToken(request, terminalStatus);
    }
    return {
      error: apiErrorDetail(
        error,
        "We could not connect the accounts right now. Please try again.",
      ),
    };
  }
}

export default function FounderToolsRooLinkPage() {
  const data = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className="min-h-screen bg-[#f7f7f4] px-4 py-10 text-[#171717] sm:px-6 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          to="/founder-tools"
          className="text-sm font-bold text-[#155eef] hover:underline"
        >
          Founder Tools
        </Link>

        <div className="mt-8 border border-black/10 bg-white p-6 shadow-[0_18px_50px_rgba(17,17,17,0.08)] sm:p-9">
          {data.state === "ready" ? (
            <>
              <div className="flex h-11 w-11 items-center justify-center bg-[#dff7e8] text-[#116b3a]">
                <Link2 className="h-6 w-6" aria-hidden="true" />
              </div>
              <h1 className="mt-6 text-3xl font-black leading-tight">
                Connect Roo to Founder Tools
              </h1>
              <p className="mt-3 max-w-xl text-base leading-7 text-black/65">
                Confirm that these accounts belong to you. Future eligible
                coworking bookings will use your Founder Tools monthly update
                when Roo calculates the price.
              </p>

              <dl className="mt-8 divide-y divide-black/10 border-y border-black/10">
                <IdentityRow
                  label="Roo Slack account"
                  value={data.slackDisplayName}
                />
                <IdentityRow
                  label="Founder Tools account"
                  value={data.founderEmail}
                />
              </dl>

              <div className="mt-6 flex gap-3 bg-[#eef4ff] p-4 text-[#173b75]">
                <LockKeyhole
                  className="mt-0.5 h-5 w-5 shrink-0"
                  aria-hidden="true"
                />
                <p className="text-sm font-semibold leading-6">
                  Roo Points, ledger history, and bookings stay on your Slack
                  account. This connection is used only for discount eligibility.
                </p>
              </div>

              <Form method="post" reloadDocument className="mt-7">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 bg-[#155eef] px-5 py-3 text-base font-black text-white transition hover:bg-[#0f4dcc] disabled:cursor-wait disabled:opacity-60 sm:w-auto"
                >
                  <Link2 className="h-5 w-5" aria-hidden="true" />
                  {isSubmitting ? "Connecting..." : "Link accounts"}
                </button>
              </Form>

              {actionData?.error ? (
                <p
                  className="mt-4 text-sm font-semibold text-[#a52714]"
                  role="alert"
                >
                  {actionData.error}
                </p>
              ) : null}
            </>
          ) : data.state === "status" ? (
            <StatusContent status={data.status} />
          ) : (
            <ErrorContent message={data.message} />
          )}
        </div>
      </div>
    </main>
  );
}

function IdentityRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid gap-1 py-4 sm:grid-cols-[180px_1fr] sm:items-center">
      <dt className="text-sm font-bold text-black/55">{label}</dt>
      <dd className="min-w-0 break-words text-base font-bold">{value}</dd>
    </div>
  );
}

const STATUS_COPY: Record<
  RooAccountLinkPageStatus,
  { title: string; message: string; success: boolean }
> = {
  linked: {
    title: "Accounts connected",
    message:
      "Roo will automatically use this Founder Tools account when checking future coworking discount eligibility.",
    success: true,
  },
  "already-linked": {
    title: "Accounts already connected",
    message:
      "No changes were needed. Roo will continue using the connected Founder Tools account.",
    success: true,
  },
  expired: {
    title: "This link has expired",
    message: "Return to Slack and type @Roo link to request a fresh private link.",
    success: false,
  },
  used: {
    title: "This link has already been used",
    message:
      "If your accounts are not connected, return to Slack and type @Roo link for a fresh link.",
    success: false,
  },
  conflict: {
    title: "An account is already connected",
    message:
      "MLAI support needs to verify the existing connection before it can be changed.",
    success: false,
  },
  invalid: {
    title: "This link is not valid",
    message: "Return to Slack and type @Roo link to request a fresh private link.",
    success: false,
  },
};

function StatusContent({ status }: { status: RooAccountLinkPageStatus }) {
  const copy = STATUS_COPY[status];
  const Icon = copy.success ? CheckCircle2 : TriangleAlert;
  return (
    <>
      <div
        className={`flex h-11 w-11 items-center justify-center ${
          copy.success
            ? "bg-[#dff7e8] text-[#116b3a]"
            : "bg-[#fff0e8] text-[#a52714]"
        }`}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-3xl font-black leading-tight">{copy.title}</h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-black/65">
        {copy.message}
      </p>
      <Link
        to="/founder-tools"
        className="mt-7 inline-flex min-h-11 items-center text-sm font-black text-[#155eef] hover:underline"
      >
        Continue to Founder Tools
      </Link>
    </>
  );
}

function ErrorContent({ message }: { message: string }) {
  return (
    <>
      <div className="flex h-11 w-11 items-center justify-center bg-[#fff0e8] text-[#a52714]">
        <TriangleAlert className="h-6 w-6" aria-hidden="true" />
      </div>
      <h1 className="mt-6 text-3xl font-black leading-tight">
        Connection unavailable
      </h1>
      <p className="mt-3 max-w-xl text-base leading-7 text-black/65">
        {message}
      </p>
      <a
        href={CLEAN_PATH}
        className="mt-7 inline-flex min-h-11 items-center text-sm font-black text-[#155eef] hover:underline"
      >
        Try again
      </a>
    </>
  );
}
