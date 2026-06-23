import type { Route } from "./+types/founder-tools.upgrade";
import {
  Form,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
  useRouteLoaderData,
} from "react-router";
import { BoltIcon, CheckCircleIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";
import { createApiClient } from "~/lib/api";
import { getEnv } from "~/lib/env.server";
import { RooCoinImage } from "~/components/RooPointCost";
import type { loader as founderToolsRootLoader } from "./vibe-raising-app";

type TopupPack = {
  pack_id: string;
  points: number;
  amount_cents: number;
  currency: string;
  label: string;
};

// Mirrors the backend ROO_TOPUP_PACKS as a resilient fallback if /packs/ is
// unavailable. The loader prefers the live list so prices stay in sync.
const FALLBACK_PACKS: TopupPack[] = [
  { pack_id: "topup_5", points: 10, amount_cents: 1999, currency: "aud", label: "10 Top-up Roo Points" },
  { pack_id: "topup_10", points: 20, amount_cents: 3699, currency: "aud", label: "20 Top-up Roo Points" },
  { pack_id: "topup_25", points: 50, amount_cents: 6399, currency: "aud", label: "50 Top-up Roo Points" },
];

const POPULAR_PACK_ID = "topup_10";
const LOGIN_HREF = "/platform/login?app=founder-tools&next=/founder-tools/upgrade";

function formatPrice(amountCents: number, currency: string): string {
  const symbol = currency?.toLowerCase() === "aud" ? "A$" : "";
  return `${symbol}${(amountCents / 100).toFixed(2)}`;
}

export const meta: Route.MetaFunction = () => [
  { title: "Top up Roo Points | Founder Tools" },
  { name: "robots", content: "noindex, nofollow" },
];

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const client = createApiClient(env, request);

  let packs: TopupPack[] = FALLBACK_PACKS;
  try {
    const response = await client.get<{ packs: TopupPack[] }>("/api/v1/points/packs/");
    if (Array.isArray(response.data?.packs) && response.data.packs.length > 0) {
      packs = response.data.packs;
    }
  } catch {
    // Keep the static fallback so the page still renders the options.
  }

  return { packs };
}

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const packId = String(formData.get("pack_id") || "").trim();
  if (!packId) {
    return { error: "Please choose a top-up pack to continue." };
  }

  const env = getEnv(context);
  const client = createApiClient(env, request);
  try {
    const response = await client.post("/api/v1/points/me/purchases/", {
      pack_id: packId,
      purchase_from: { source: "web", surface: "founder-tools-upgrade" },
    });
    const purchaseId = response.data?.id;
    if (!purchaseId) {
      return { error: "We could not start your top-up. Please try again." };
    }
    // Hand off to the existing review + Stripe Checkout flow.
    return redirect(`/roo/topup/${purchaseId}`);
  } catch (error: any) {
    const status = error?.response?.status;
    if (status === 401) {
      return redirect(LOGIN_HREF);
    }
    return {
      error:
        error?.response?.data?.error ||
        "We could not start your top-up. Please try again in a moment.",
    };
  }
}

export default function FounderToolsUpgrade() {
  const { packs } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const rootData = useRouteLoaderData<typeof founderToolsRootLoader>("founder-tools-root");
  const balance = rootData?.rooPointsBalance ?? null;

  const submittingPackId =
    navigation.state === "submitting"
      ? String(navigation.formData?.get("pack_id") || "")
      : "";

  return (
    <div className="min-h-screen bg-[#fbfaf8] px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Header */}
        <section className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          <div className="h-20 bg-gradient-to-r from-violet-600 via-teal-500 to-cyan-400" />
          <div className="p-6 sm:p-8">
            <p className="flex items-center gap-2 text-sm font-black text-violet-700">
              <BoltIcon className="h-4 w-4" />
              Top up Roo Points
            </p>
            <h1 className="mt-1 text-3xl font-black tracking-normal text-gray-950">
              Buy more Roo Points
            </h1>
            <p className="mt-2 max-w-2xl text-sm font-medium text-gray-500">
              Pick a pack below and we&apos;ll take you through a quick acknowledgement
              and secure Stripe checkout. Points are added to your balance once payment
              is confirmed.
            </p>
          </div>
        </section>

        {/* Current balance */}
        {balance ? (
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-wide text-gray-400">
                  Current balance
                </p>
                <p className="mt-1 flex items-center gap-2 text-3xl font-black text-gray-950">
                  {balance.balance}
                  <RooCoinImage className="h-7 w-7" />
                </p>
              </div>
              <dl className="flex gap-6 text-sm">
                <div>
                  <dt className="font-semibold text-gray-400">Earned</dt>
                  <dd className="mt-0.5 font-black text-gray-700">{balance.earnedBalance}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-gray-400">Purchased</dt>
                  <dd className="mt-0.5 font-black text-gray-700">{balance.purchasedTopupBalance}</dd>
                </div>
              </dl>
            </div>
          </section>
        ) : null}

        {actionData?.error ? (
          <div
            role="alert"
            className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            {actionData.error}
          </div>
        ) : null}

        {/* Packs */}
        <section className="grid gap-4 sm:grid-cols-3">
          {packs.map((pack) => {
            const isPopular = pack.pack_id === POPULAR_PACK_ID;
            const isSubmitting = submittingPackId === pack.pack_id;
            return (
              <Form
                method="post"
                key={pack.pack_id}
                className={`relative flex flex-col rounded-2xl border bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md ${
                  isPopular ? "border-violet-300 ring-1 ring-violet-200" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {isPopular ? (
                  <span className="absolute -top-2 right-4 rounded-full bg-violet-600 px-2.5 py-0.5 text-[11px] font-black uppercase tracking-wide text-white">
                    Most popular
                  </span>
                ) : null}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl font-black text-gray-950">{pack.points}</span>
                  <RooCoinImage className="h-6 w-6" />
                </div>
                <p className="mt-1 text-sm font-semibold text-gray-500">Roo Points</p>
                <p className="mt-4 text-2xl font-black text-gray-950">
                  {formatPrice(pack.amount_cents, pack.currency)}
                </p>
                <input type="hidden" name="pack_id" value={pack.pack_id} />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`mt-5 inline-flex items-center justify-center rounded-xl px-4 py-2.5 text-sm font-black transition disabled:cursor-not-allowed disabled:opacity-60 ${
                    isPopular
                      ? "bg-violet-600 text-white hover:bg-violet-700"
                      : "bg-gray-950 text-white hover:bg-gray-800"
                  }`}
                >
                  {isSubmitting ? "Starting checkout…" : "Buy now"}
                </button>
              </Form>
            );
          })}
        </section>

        {/* Reassurance */}
        <section className="rounded-2xl border border-gray-200 bg-white p-5 text-sm text-gray-500 shadow-sm sm:p-6">
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              Payments are processed securely by Stripe. We never see your card details.
            </li>
            <li className="flex items-start gap-2">
              <CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              Roo Points are not money, have no cash value, and are non-transferable.
              Purchased points can be spent on eligible rewards but don&apos;t count toward
              earned contribution.
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
