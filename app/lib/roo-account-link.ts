import { createApiClient, shouldUseDevBackendStub } from "~/lib/api";

export const ROO_ACCOUNT_LINK_COOKIE = "roo_founder_link_token";
export const ROO_ACCOUNT_LINK_MAX_AGE_SECONDS = 30 * 60;
const ROO_ACCOUNT_LINK_STATUS_PATH = "/api/v1/users/slack-founder-link/status/";

export type RooAccountConnectionStatus =
  | {
      status: "connected";
      connectionType: "direct" | "explicit";
      slackDisplayName: string;
      verifiedAt: string | null;
      canLinkSeparateAccount: boolean;
    }
  | {
      status: "not_connected" | "unavailable";
      connectionType: null;
      slackDisplayName: null;
      verifiedAt: null;
      canLinkSeparateAccount: boolean;
    };

export function normalizeRooAccountConnectionStatus(
  raw: unknown,
): RooAccountConnectionStatus {
  if (!raw || typeof raw !== "object" || Array.isArray(raw)) {
    return unavailableRooAccountConnectionStatus();
  }

  const payload = raw as Record<string, unknown>;
  if (payload.status === "not_connected") {
    return {
      status: "not_connected",
      connectionType: null,
      slackDisplayName: null,
      verifiedAt: null,
      canLinkSeparateAccount: true,
    };
  }

  const connectionType = payload.connection_type;
  const slackDisplayName = String(payload.slack_display_name || "").trim();
  if (
    payload.status === "connected" &&
    (connectionType === "direct" || connectionType === "explicit") &&
    slackDisplayName
  ) {
    const verifiedAt = String(payload.verified_at || "").trim();
    return {
      status: "connected",
      connectionType,
      slackDisplayName,
      verifiedAt: verifiedAt || null,
      // Older backends did not return this capability. Keep the recovery path
      // visible for legacy direct identities during a rolling deployment.
      canLinkSeparateAccount:
        connectionType === "direct"
          ? payload.can_link_separate_account !== false
          : payload.can_link_separate_account === true,
    };
  }

  return unavailableRooAccountConnectionStatus();
}

function unavailableRooAccountConnectionStatus(): RooAccountConnectionStatus {
  return {
    status: "unavailable",
    connectionType: null,
    slackDisplayName: null,
    verifiedAt: null,
    canLinkSeparateAccount: false,
  };
}

export async function getRooAccountConnectionStatus(
  env: Env,
  request: Request,
): Promise<RooAccountConnectionStatus> {
  if (shouldUseDevBackendStub()) {
    return {
      status: "not_connected",
      connectionType: null,
      slackDisplayName: null,
      verifiedAt: null,
      canLinkSeparateAccount: true,
    };
  }

  try {
    const client = createApiClient(env, request);
    const response = await client.get(ROO_ACCOUNT_LINK_STATUS_PATH);
    return normalizeRooAccountConnectionStatus(response.data);
  } catch {
    return unavailableRooAccountConnectionStatus();
  }
}

export type RooAccountLinkPageStatus =
  | "linked"
  | "already-linked"
  | "expired"
  | "used"
  | "conflict"
  | "invalid";

export function isPlausibleRooAccountLinkToken(
  value: string | null,
): value is string {
  return Boolean(value && /^[A-Za-z0-9_-]{40,128}$/.test(value));
}

export function readRooAccountLinkToken(request: Request): string | null {
  const cookieHeader = request.headers.get("Cookie");
  if (!cookieHeader) return null;

  for (const part of cookieHeader.split(";")) {
    const [rawName, ...rawValue] = part.trim().split("=");
    if (rawName === ROO_ACCOUNT_LINK_COOKIE) {
      try {
        const value = decodeURIComponent(rawValue.join("="));
        return isPlausibleRooAccountLinkToken(value) ? value : null;
      } catch {
        return null;
      }
    }
  }
  return null;
}

export function withoutRooAccountLinkCookie(request: Request): Request {
  const headers = new Headers(request.headers);
  const filteredCookie = (headers.get("Cookie") || "")
    .split(";")
    .map((part) => part.trim())
    .filter(
      (part) =>
        part && part.split("=", 1)[0]?.trim() !== ROO_ACCOUNT_LINK_COOKIE,
    )
    .join("; ");

  if (filteredCookie) {
    headers.set("Cookie", filteredCookie);
  } else {
    headers.delete("Cookie");
  }

  return new Request(request.url, {
    method: "GET",
    headers,
  });
}

export function createRooAccountLinkCookie(
  token: string,
  request: Request,
): string {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return (
    `${ROO_ACCOUNT_LINK_COOKIE}=${encodeURIComponent(token)}; ` +
    `Path=/founder-tools/link-roo; Max-Age=${ROO_ACCOUNT_LINK_MAX_AGE_SECONDS}; ` +
    `HttpOnly; SameSite=Lax${secure}`
  );
}

export function clearRooAccountLinkCookie(request: Request): string {
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  return (
    `${ROO_ACCOUNT_LINK_COOKIE}=; Path=/founder-tools/link-roo; Max-Age=0; ` +
    `Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; SameSite=Lax${secure}`
  );
}

export function pageStatusForLinkError(
  code: unknown,
): RooAccountLinkPageStatus | null {
  if (code === "expired_token") return "expired";
  if (code === "token_already_used") return "used";
  if (code === "link_conflict") return "conflict";
  if (code === "invalid_token") return "invalid";
  return null;
}

export function isRooAccountLinkPageStatus(
  value: string | null,
): value is RooAccountLinkPageStatus {
  return (
    value === "linked" ||
    value === "already-linked" ||
    value === "expired" ||
    value === "used" ||
    value === "conflict" ||
    value === "invalid"
  );
}
