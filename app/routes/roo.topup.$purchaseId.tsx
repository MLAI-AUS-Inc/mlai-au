import { AlertCircle, CheckCircle2, Clock3, LockKeyhole, ShieldCheck } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Form, Link, redirect, useActionData, useLoaderData, useNavigation } from "react-router";
import type { Route } from "./+types/roo.topup.$purchaseId";
import { createApiClient } from "~/lib/api";
import { getEnv } from "~/lib/env.server";

type PointsPurchase = {
  id: string;
  status: "pending" | "paid" | "failed" | "cancelled" | "refunded";
  pack_id: string;
  points_amount: number;
  amount_cents: number;
  currency: string;
  expires_at: string;
  paid_at: string | null;
  created_at: string;
  frontend_checkout_page_url: string;
};

const TERMS_TEXT =
  "I understand that Roo Points are not money, have no cash value, are not refundable except where required by law, and cannot be transferred or sold.";
const ROO_POINTS_TERMS_VERSION = "roo-points-terms-2026-05-04";
const PRIVACY_VERSION = "privacy-2026-05-04";

export const meta: Route.MetaFunction = () => [
  { title: "Roo Points Top-Up | MLAI" },
  {
    name: "description",
    content:
      "Review an MLAI Roo Points top-up request before continuing to Stripe Checkout.",
  },
];

export async function loader({ params, request, context }: Route.LoaderArgs) {
  const purchaseId = params.purchaseId;
  if (!purchaseId) {
    throw new Response("Purchase ID is required", { status: 400 });
  }

  const env = getEnv(context);
  const client = createApiClient(env, request);

  try {
    const response = await client.get<PointsPurchase>(`/api/v1/points/purchases/${purchaseId}/`);
    return { purchase: response.data };
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 404) {
      throw new Response("This Roo Points top-up link could not be found.", { status: 404 });
    }
    throw new Response("We could not load this Roo Points top-up right now.", {
      status: status || 500,
    });
  }
}

export async function action({ params, request, context }: Route.ActionArgs) {
  const purchaseId = params.purchaseId;
  if (!purchaseId) {
    return { error: "Purchase ID is required" };
  }

  const formData = await request.formData();
  if (formData.get("terms_accepted") !== "yes") {
    return { error: "Please accept the Roo Points acknowledgement before continuing." };
  }

  const env = getEnv(context);
  const client = createApiClient(env, request);
  try {
    const response = await client.post(`/api/v1/points/purchases/${purchaseId}/checkout/`, {
      terms_version_accepted: ROO_POINTS_TERMS_VERSION,
      privacy_version_accepted: PRIVACY_VERSION,
    });
    const checkoutUrl = response.data?.checkout_session_url;
    if (!checkoutUrl) {
      return { error: "Stripe Checkout did not return a redirect URL." };
    }
    return redirect(checkoutUrl);
  } catch (error: any) {
    return {
      error:
        error?.response?.data?.error ||
        "We could not start Stripe Checkout. Please try again or ask Roo for a fresh top-up link.",
    };
  }
}

export default function RooTopupPage() {
  const { purchase } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const expiresAt = useMemo(() => new Date(purchase.expires_at), [purchase.expires_at]);
  const isExpired = Number.isFinite(expiresAt.getTime()) && expiresAt.getTime() <= Date.now();
  const isPending = purchase.status === "pending";
  const canContinue = isPending && !isExpired && acceptedTerms;
  const isSubmitting = navigation.state === "submitting";

  return (
    <main className="min-h-screen bg-[var(--brutalist-beige)] px-4 py-12 text-[var(--brutalist-black)] sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-[1fr_0.85fr]">
        <section className="space-y-8">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-black/48">
              Roo Points Top-Up
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-black leading-tight sm:text-5xl">
              Review your top-up before Checkout
            </h1>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-black/68">
              Top-up Roo Points can be spent on eligible MLAI rewards. They do not count
              toward earned contribution, trust, leadership, committee eligibility, or
              paid-work consideration.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-3">
            <Fact icon={ShieldCheck} label="Internal MLAI points" />
            <Fact icon={LockKeyhole} label="Non-transferable" />
            <Fact icon={Clock3} label="24-hour request link" />
          </div>

          <div className="border border-black/10 bg-white p-6 shadow-[0_18px_48px_rgba(17,17,17,0.08)]">
            <h2 className="text-xl font-black">Terms acknowledgement</h2>
            <label className="mt-5 flex cursor-pointer items-start gap-4">
              <input
                type="checkbox"
                checked={acceptedTerms}
                onChange={(event) => setAcceptedTerms(event.target.checked)}
                disabled={!isPending || isExpired}
                className="mt-1 h-5 w-5 border-black/30 accent-[var(--brutalist-blue)]"
              />
              <span className="text-base leading-7 text-black/72">{TERMS_TEXT}</span>
            </label>
          </div>
        </section>

        <aside className="border border-black/10 bg-white p-6 shadow-[0_24px_60px_rgba(17,17,17,0.1)]">
          <div className="flex items-center justify-between gap-4">
            <span className="rounded-full bg-[var(--brutalist-mint)] px-3 py-1 text-sm font-black uppercase tracking-[0.16em]">
              {statusLabel(purchase.status)}
            </span>
            <span className="text-sm font-semibold text-black/50">{purchase.pack_id}</span>
          </div>

          <div className="mt-8">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-black/44">
              Selected pack
            </p>
            <p className="mt-2 text-5xl font-black">{purchase.points_amount}</p>
            <p className="mt-1 text-lg font-semibold">Top-up Roo Points</p>
          </div>

          <div className="mt-8 border-t border-black/10 pt-6">
            <div className="flex items-center justify-between text-base">
              <span className="text-black/58">Price</span>
              <span className="text-2xl font-black">{formatMoney(purchase.amount_cents, purchase.currency)}</span>
            </div>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-black/58">Expires</span>
              <span className="font-semibold">{formatDateTime(expiresAt)}</span>
            </div>
          </div>

          <StateMessage status={purchase.status} isExpired={isExpired} />

          <Form method="post" className="mt-6">
            <input type="hidden" name="terms_accepted" value={acceptedTerms ? "yes" : "no"} />
            <button
              type="submit"
              disabled={!canContinue || isSubmitting}
              aria-disabled={!canContinue || isSubmitting}
              className="w-full bg-[var(--brutalist-blue)] px-5 py-4 text-base font-black text-white transition hover:bg-[var(--brutalist-blue)]/90 disabled:cursor-not-allowed disabled:opacity-55"
            >
              {isSubmitting ? "Starting Checkout..." : "Continue to Stripe"}
            </button>
          </Form>

          {actionData?.error ? (
            <p className="mt-4 text-sm font-semibold leading-6 text-[var(--brutalist-orange)]">
              {actionData.error}
            </p>
          ) : null}

          <Link
            to="/roo"
            className="mt-6 inline-flex text-sm font-bold text-[var(--brutalist-blue)] hover:underline"
          >
            Back to Roo
          </Link>
        </aside>
      </div>
    </main>
  );
}

function Fact({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <div className="flex items-center gap-3 border border-black/10 bg-white px-4 py-3">
      <Icon className="h-5 w-5 text-[var(--brutalist-blue)]" aria-hidden="true" />
      <span className="text-sm font-bold">{label}</span>
    </div>
  );
}

function StateMessage({ status, isExpired }: { status: PointsPurchase["status"]; isExpired: boolean }) {
  if (status === "paid") {
    return (
      <Message tone="success" text="This top-up has already been paid. Your Roo Points will be handled by the payment confirmation flow." />
    );
  }
  if (status !== "pending") {
    return <Message tone="error" text={`This top-up is ${status} and cannot continue to Checkout.`} />;
  }
  if (isExpired) {
    return <Message tone="error" text="This top-up link has expired. Ask Roo in Slack to create a fresh top-up request." />;
  }
  return <Message tone="info" text="Review the details, accept the acknowledgement, then continue when Stripe Checkout is enabled." />;
}

function Message({ tone, text }: { tone: "info" | "success" | "error"; text: string }) {
  const Icon = tone === "success" ? CheckCircle2 : AlertCircle;
  const className =
    tone === "success"
      ? "border-[var(--brutalist-mint)] bg-[var(--brutalist-mint)]/18"
      : tone === "error"
        ? "border-[var(--brutalist-orange)] bg-[var(--brutalist-orange)]/12"
        : "border-[var(--brutalist-blue)] bg-[var(--brutalist-blue)]/8";

  return (
    <div className={`mt-6 flex gap-3 border p-4 ${className}`}>
      <Icon className="mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
      <p className="text-sm font-semibold leading-6">{text}</p>
    </div>
  );
}

function formatMoney(amountCents: number, currency: string) {
  return new Intl.NumberFormat("en-AU", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(amountCents / 100);
}

function formatDateTime(value: Date) {
  if (!Number.isFinite(value.getTime())) {
    return "Unknown";
  }
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(value);
}

function statusLabel(status: PointsPurchase["status"]) {
  if (status === "pending") return "Pending";
  if (status === "paid") return "Paid";
  if (status === "failed") return "Failed";
  if (status === "cancelled") return "Cancelled";
  return "Refunded";
}
