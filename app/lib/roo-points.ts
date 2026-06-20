import { createApiClient, shouldUseDevBackendStub } from "~/lib/api";

const CURRENT_BALANCE_PATH = "/api/v1/points/me/balance/";

export type RooPointsBalance = {
  userId?: number | null;
  email?: string | null;
  slackUserId?: string | null;
  balance: number;
  earnedBalance: number;
  purchasedTopupBalance: number;
  lifetimeEarned: number;
  lifetimePurchasedTopup: number;
  lifetimeSpent: number;
  expiredOrReversedPoints: number;
};

const DEV_ROO_POINTS_BALANCE: RooPointsBalance = {
  userId: 1,
  email: "dev@example.com",
  slackUserId: "UDEVROOPOINTS",
  balance: 42,
  earnedBalance: 42,
  purchasedTopupBalance: 0,
  lifetimeEarned: 42,
  lifetimePurchasedTopup: 0,
  lifetimeSpent: 0,
  expiredOrReversedPoints: 0,
};

function asNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim()) {
    const parsed = Number(value.trim());
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function asString(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed || null;
}

function normalizeRooPointsBalance(raw: unknown): RooPointsBalance | null {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) return null;
  const payload = raw as Record<string, unknown>;
  const balance = asNumber(payload.balance);
  if (balance === null) return null;

  return {
    userId: asNumber(payload.userId ?? payload.user_id),
    email: asString(payload.email),
    slackUserId: asString(payload.slackUserId ?? payload.slack_user_id),
    balance,
    earnedBalance: asNumber(payload.earnedBalance ?? payload.earned_balance) ?? 0,
    purchasedTopupBalance: asNumber(payload.purchasedTopupBalance ?? payload.purchased_topup_balance) ?? 0,
    lifetimeEarned: asNumber(payload.lifetimeEarned ?? payload.lifetime_earned) ?? 0,
    lifetimePurchasedTopup: asNumber(payload.lifetimePurchasedTopup ?? payload.lifetime_purchased_topup) ?? 0,
    lifetimeSpent: asNumber(payload.lifetimeSpent ?? payload.lifetime_spent) ?? 0,
    expiredOrReversedPoints: asNumber(payload.expiredOrReversedPoints ?? payload.expired_or_reversed_points) ?? 0,
  };
}

export async function getCurrentRooPointsBalance(env: Env, request: Request): Promise<RooPointsBalance | null> {
  if (shouldUseDevBackendStub()) return DEV_ROO_POINTS_BALANCE;

  try {
    const client = createApiClient(env, request);
    const response = await client.get(CURRENT_BALANCE_PATH);
    return normalizeRooPointsBalance(response.data);
  } catch {
    return null;
  }
}
