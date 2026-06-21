import {
  ArrowUpIcon,
  BoltIcon,
  LockClosedIcon,
  PlayIcon,
  ShieldCheckIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";
import clsx from "clsx";
import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  useRouteLoaderData,
} from "react-router";
import type { CSSProperties } from "react";
import { ImageWithFallback } from "~/components/ImageWithFallback";
import {
  ROO_POINTS_COIN_URL,
  ROO_POINTS_FALLBACK_URL,
  useRooCoinHoverAnimation,
} from "~/components/RooPointCost";
import { createApiClient } from "~/lib/api";
import { getEnv } from "~/lib/env.server";
import type { loader as founderToolsRootLoader } from "./vibe-raising-app";
import type { Route } from "./+types/founder-tools.upgrades";

const BUY_INTENT = "buy-roo-points";
const SMALL_COIN_STACK_URL = "/vibe-raising/roo-points/roo-stack-small-transparent.png";
const LARGE_COIN_STACK_URL = "/vibe-raising/roo-points/roo-stack-large-transparent.png";
const ROO_POINTS_HERO_IMAGE_URL =
  "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Untitled%20design%20(10)%20(1).jpg?alt=media&token=16a8529b-4dde-4fb4-9eca-06f5fe1a21f9";

type TopupPackId = "topup_5" | "topup_10" | "topup_25";
type TopupPackArtwork = "single" | "small-stack" | "large-stack";
type TopupPack = {
  id: TopupPackId;
  points: number;
  price: string;
  artwork: TopupPackArtwork;
  stackUrl?: string;
  featured?: boolean;
};
type PackArtworkLayout = {
  stack?: {
    width: number;
    height: number;
    style: CSSProperties;
  };
  coinStyle?: CSSProperties;
};

const TOPUP_PACKS: readonly TopupPack[] = [
  {
    id: "topup_5",
    points: 10,
    price: "A$19.99",
    artwork: "single",
  },
  {
    id: "topup_10",
    points: 20,
    price: "A$36.99",
    artwork: "small-stack",
    stackUrl: SMALL_COIN_STACK_URL,
    featured: true,
  },
  {
    id: "topup_25",
    points: 50,
    price: "A$63.99",
    artwork: "large-stack",
    stackUrl: LARGE_COIN_STACK_URL,
  },
] as const;
const FRONT_COIN_SIZE = 120;
const PACK_ARTWORK_LAYOUT: Record<TopupPackArtwork, PackArtworkLayout> = {
  single: {
    coinStyle: {
      bottom: 22,
      height: FRONT_COIN_SIZE,
      left: 65,
      width: FRONT_COIN_SIZE,
    },
  },
  "small-stack": {
    stack: {
      width: 164,
      height: 156,
      style: {
        bottom: 10,
        left: 43,
        width: 164,
      },
    },
  },
  "large-stack": {
    stack: {
      width: 232,
      height: 187,
      style: {
        bottom: 4,
        left: 9,
        width: 232,
      },
    },
  },
};

type CreatePurchaseResponse = {
  id?: string;
  frontend_checkout_page_url?: string;
  frontendCheckoutPageUrl?: string;
};

export const meta: Route.MetaFunction = () => [
  { title: "Buy Roo Points | MLAI" },
  {
    name: "description",
    content: "Top up your Roo Points balance from the MLAI founder tools app.",
  },
  { name: "robots", content: "noindex, nofollow" },
];

export async function action({ request, context }: Route.ActionArgs) {
  const formData = await request.formData();
  const intent = String(formData.get("intent") ?? "");
  if (intent !== BUY_INTENT) {
    return { error: "That Roo Points action is not supported." };
  }

  const packId = String(formData.get("pack_id") ?? "");
  if (!isTopupPackId(packId)) {
    return { error: "Choose a valid Roo Points pack." };
  }

  const env = getEnv(context);
  const client = createApiClient(env, request);

  try {
    const response = await client.post<CreatePurchaseResponse>("/api/v1/points/me/purchases/", {
      pack_id: packId,
      purchase_from: { source: "web", surface: "founder-tools-upgrades" },
    });
    const purchase = response.data;
    const frontendCheckoutPageUrl =
      purchase.frontend_checkout_page_url || purchase.frontendCheckoutPageUrl;

    if (frontendCheckoutPageUrl) {
      return redirect(frontendCheckoutPageUrl);
    }

    if (purchase.id) {
      return redirect(`/roo/topup/${encodeURIComponent(purchase.id)}`);
    }

    return { error: "Roo created the purchase, but did not return a checkout link." };
  } catch (error) {
    return { error: purchaseErrorMessage(error) };
  }
}

export default function FounderToolsUpgradesPage() {
  const rootData = useRouteLoaderData<typeof founderToolsRootLoader>("founder-tools-root");
  const actionData = useActionData<typeof action>();
  const navigation = useNavigation();
  const balance = rootData?.rooPointsBalance ?? null;
  const error = actionData && "error" in actionData ? actionData.error : null;
  const pendingPackId = String(navigation.formData?.get("pack_id") ?? "");
  const isBuying = navigation.state !== "idle" && navigation.formData?.get("intent") === BUY_INTENT;

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-[var(--vr-color-app-bg)] px-4 py-8 text-[var(--vr-color-text)] sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <section className="grid items-center gap-8 py-4 lg:grid-cols-[minmax(0,0.52fr)_minmax(0,1fr)]">
          <div className="lg:max-w-[24rem]">
            <div className="inline-flex items-center gap-3 text-sm font-black text-violet-700">
              <BoltIcon className="h-5 w-5" aria-hidden="true" />
              <span>Top up Roo Points</span>
            </div>
            <h1 className="mt-4 max-w-3xl text-4xl font-black leading-tight tracking-normal text-gray-950 sm:text-5xl">
              Buy Roo Points
            </h1>
            <p className="mt-4 max-w-2xl text-base font-medium leading-7 text-slate-600 sm:text-lg">
              Pick a pack below and we'll take you through a quick acknowledgement and
              secure Stripe checkout. Points are added to your balance once payment is
              confirmed.
            </p>
          </div>
          <HeroRooPointsImage />
        </section>

        <BalancePanel balance={balance} />

        {error ? (
          <div
            role="alert"
            className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700"
          >
            {error}
          </div>
        ) : null}

        <section
          aria-label="Roo Points packs"
          className="mt-6 grid gap-5 lg:grid-cols-3"
        >
          {TOPUP_PACKS.map((pack) => (
            <TopupPackCard
              key={pack.id}
              pack={pack}
              disabled={isBuying}
              isSubmitting={isBuying && pendingPackId === pack.id}
            />
          ))}
        </section>

        <TrustPanel />
      </div>
    </main>
  );
}

function HeroRooPointsImage() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_22px_55px_rgba(15,23,42,0.08)]">
      <ImageWithFallback
        src={ROO_POINTS_HERO_IMAGE_URL}
        fallbackSrc={ROO_POINTS_FALLBACK_URL}
        alt="Roo Points coin stacks and rewards illustration"
        draggable={false}
        width={1920}
        height={1080}
        className="aspect-[16/9] h-full w-full object-cover"
      />
    </div>
  );
}

function BalancePanel({
  balance,
}: {
  balance:
    | Awaited<ReturnType<typeof founderToolsRootLoader>>["rooPointsBalance"]
    | null
    | undefined;
}) {
  const currentBalance = displayNumber(balance?.balance);
  const earnedBalance = displayNumber(balance?.lifetimeEarned, balance?.earnedBalance);
  const purchasedBalance = displayNumber(
    balance?.lifetimePurchasedTopup,
    balance?.purchasedTopupBalance,
  );

  const stats = [
    {
      label: "Current Balance",
      value: currentBalance,
      icon: (
        <ImageWithFallback
          src={ROO_POINTS_COIN_URL}
          fallbackSrc={ROO_POINTS_FALLBACK_URL}
          alt=""
          draggable={false}
          width={44}
          height={44}
          className="h-11 w-11 rounded-full object-cover"
        />
      ),
    },
    {
      label: "Earned",
      value: earnedBalance,
      icon: <ArrowUpIcon className="h-6 w-6" aria-hidden="true" />,
      iconClassName: "bg-emerald-100 text-emerald-500",
    },
    {
      label: "Purchased",
      value: purchasedBalance,
      icon: <ShoppingBagIcon className="h-6 w-6" aria-hidden="true" />,
      iconClassName: "bg-blue-100 text-blue-500",
    },
  ];

  return (
    <section className="rounded-2xl border border-slate-200 bg-white px-5 py-5 shadow-[0_18px_45px_rgba(15,23,42,0.08)] sm:px-7">
      <h2 className="text-sm font-black text-gray-950">Your Roo Points Balance</h2>
      <div className="mt-5 grid gap-5 md:grid-cols-3">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className={clsx(
              "flex items-center gap-4",
              index > 0 && "border-t border-slate-200 pt-5 md:border-l md:border-t-0 md:pl-9 md:pt-0",
            )}
          >
            <div
              className={clsx(
                "flex h-12 w-12 shrink-0 items-center justify-center rounded-full",
                stat.iconClassName || "bg-amber-100",
              )}
            >
              {stat.icon}
            </div>
            <div>
              <p className="text-2xl font-black leading-none tabular-nums text-gray-950">
                {formatNumber(stat.value)}
              </p>
              <p className="mt-2 text-sm font-medium text-slate-500">{stat.label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

function TopupPackCard({
  pack,
  disabled,
  isSubmitting,
}: {
  pack: TopupPack;
  disabled: boolean;
  isSubmitting: boolean;
}) {
  const { coinSrc, startAnimation, stopAnimation } = useRooCoinHoverAnimation();
  const hasAnimatedCoin = pack.artwork === "single";

  return (
    <Form
      method="post"
      data-testid={`roo-pack-${pack.id}`}
      onPointerEnter={hasAnimatedCoin ? startAnimation : undefined}
      onPointerLeave={hasAnimatedCoin ? stopAnimation : undefined}
      onFocus={hasAnimatedCoin ? startAnimation : undefined}
      onBlur={
        hasAnimatedCoin
          ? (event) => {
              const nextTarget = event.relatedTarget;
              if (!nextTarget || !event.currentTarget.contains(nextTarget as Node)) {
                stopAnimation();
              }
            }
          : undefined
      }
      className={clsx(
        "group relative flex min-h-[310px] flex-col rounded-2xl border bg-white p-5 text-center shadow-[0_18px_42px_rgba(15,23,42,0.08)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_24px_52px_rgba(15,23,42,0.12)] focus-within:-translate-y-1 focus-within:outline-none focus-within:ring-4 focus-within:ring-violet-100",
        pack.featured
          ? "border-violet-400 ring-1 ring-violet-300"
          : "border-slate-200",
      )}
    >
      <input type="hidden" name="intent" value={BUY_INTENT} />
      <input type="hidden" name="pack_id" value={pack.id} />

      {pack.featured ? (
        <div className="absolute left-1/2 top-0 z-20 -translate-x-1/2 -translate-y-px rounded-b-full bg-gradient-to-r from-violet-700 to-purple-500 px-8 py-1.5 text-xs font-black uppercase tracking-wide text-white shadow-sm">
          Most Popular
        </div>
      ) : null}

      <RooPackArtwork pack={pack} coinSrc={hasAnimatedCoin ? coinSrc : null} />

      <div className="mt-auto">
        <div className="flex items-end justify-center gap-3">
          <span className="text-3xl font-black leading-none text-gray-950">
            {pack.points}
          </span>
          <span className="pb-1 text-base font-medium text-slate-500">Roo Points</span>
        </div>
        <div className="mx-auto mt-4 h-px w-full bg-slate-200" />
        <p className="mt-4 text-2xl font-black leading-none text-gray-950">{pack.price}</p>
        <button
          type="submit"
          disabled={disabled}
          className={clsx(
            "mt-5 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-lg px-5 py-3 text-base font-black text-white shadow-sm transition focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60",
            pack.featured
              ? "bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 focus:ring-violet-200"
              : "bg-gray-950 hover:bg-black focus:ring-slate-200",
          )}
        >
          {pack.featured ? <PlayIcon className="h-4 w-4 fill-current" aria-hidden="true" /> : null}
          {isSubmitting ? "Starting checkout..." : "Buy now"}
        </button>
      </div>
    </Form>
  );
}

function RooPackArtwork({ pack, coinSrc }: { pack: TopupPack; coinSrc: string | null }) {
  const layout = PACK_ARTWORK_LAYOUT[pack.artwork];

  return (
    <div className="relative mx-auto mb-5 flex h-44 w-full max-w-[250px] items-center justify-center pt-3">
      <span className="absolute left-9 top-14 h-2 w-2 rounded-full bg-blue-300 transition group-hover:scale-125" />
      <SparklesIcon className="absolute right-10 top-9 h-5 w-5 text-amber-300 transition group-hover:rotate-12 group-hover:scale-110" />
      <span className="absolute right-16 bottom-12 h-2 w-2 rounded-full bg-emerald-300 transition group-hover:scale-125" />

      {pack.stackUrl && layout.stack ? (
        <ImageWithFallback
          src={pack.stackUrl}
          fallbackSrc={ROO_POINTS_FALLBACK_URL}
          alt=""
          aria-hidden="true"
          draggable={false}
          width={layout.stack.width}
          height={layout.stack.height}
          style={layout.stack.style}
          className="pointer-events-none absolute z-10 h-auto object-contain drop-shadow-[0_14px_18px_rgba(15,23,42,0.12)] transition duration-200 group-hover:scale-[1.03]"
        />
      ) : null}

      {coinSrc && layout.coinStyle ? (
        <ImageWithFallback
          src={coinSrc}
          fallbackSrc={ROO_POINTS_FALLBACK_URL}
          alt=""
          aria-hidden="true"
          draggable={false}
          width={FRONT_COIN_SIZE}
          height={FRONT_COIN_SIZE}
          style={layout.coinStyle}
          className="pointer-events-none absolute z-20 rounded-full object-cover drop-shadow-[0_12px_14px_rgba(15,23,42,0.14)] transition duration-200 group-hover:scale-[1.04]"
        />
      ) : null}
    </div>
  );
}

function TrustPanel() {
  return (
    <section className="mt-6 grid gap-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_18px_42px_rgba(15,23,42,0.07)] md:grid-cols-2">
      <TrustItem
        icon={LockClosedIcon}
        title="Secure payments"
        body="Payments are processed securely by Stripe. We never see your card details."
      />
      <TrustItem
        icon={ShieldCheckIcon}
        title="Use with confidence"
        body="Roo Points are not money, have no cash value, and are non-transferable. Purchased points can be spent on eligible rewards but do not count toward earned contribution."
        withDivider
      />
    </section>
  );
}

function TrustItem({
  icon: Icon,
  title,
  body,
  withDivider = false,
}: {
  icon: typeof LockClosedIcon;
  title: string;
  body: string;
  withDivider?: boolean;
}) {
  return (
    <div
      className={clsx(
        "flex gap-5",
        withDivider && "border-t border-slate-200 pt-5 md:border-l md:border-t-0 md:pl-8 md:pt-0",
      )}
    >
      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-violet-100 text-violet-600">
        <Icon className="h-7 w-7" aria-hidden="true" />
      </div>
      <div>
        <h2 className="text-sm font-black text-gray-950">{title}</h2>
        <p className="mt-2 max-w-md text-sm font-medium leading-6 text-slate-600">
          {body}
        </p>
      </div>
    </div>
  );
}

function isTopupPackId(value: string): value is TopupPack["id"] {
  return TOPUP_PACKS.some((pack) => pack.id === value);
}

function displayNumber(primary?: number | null, fallback?: number | null) {
  if (typeof primary === "number" && Number.isFinite(primary)) return primary;
  if (typeof fallback === "number" && Number.isFinite(fallback)) return fallback;
  return 0;
}

function formatNumber(value: number) {
  return new Intl.NumberFormat("en-AU", { maximumFractionDigits: 0 }).format(value);
}

function purchaseErrorMessage(error: unknown) {
  const payload = (error as { response?: { data?: unknown } })?.response?.data;
  const directMessage = firstString(payload);
  if (directMessage) return directMessage;
  return "We could not start Roo Points checkout. Please try again.";
}

function firstString(value: unknown): string | null {
  if (typeof value === "string" && value.trim()) return value.trim();
  if (!value || typeof value !== "object") return null;

  const record = value as Record<string, unknown>;
  for (const key of ["error", "detail", "message", "non_field_errors", "pack_id"]) {
    const field = record[key];
    if (typeof field === "string" && field.trim()) return field.trim();
    if (Array.isArray(field)) {
      const item = field.find((entry) => typeof entry === "string" && entry.trim());
      if (typeof item === "string") return item.trim();
    }
  }

  return null;
}
