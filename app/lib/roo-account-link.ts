export const ROO_ACCOUNT_LINK_COOKIE = "roo_founder_link_token";
export const ROO_ACCOUNT_LINK_MAX_AGE_SECONDS = 30 * 60;

export type RooAccountLinkPageStatus =
  | "linked"
  | "already-linked"
  | "expired"
  | "used"
  | "conflict"
  | "invalid";

export function isPlausibleRooAccountLinkToken(value: string | null): value is string {
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
        part &&
        part.split("=", 1)[0]?.trim() !== ROO_ACCOUNT_LINK_COOKIE,
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

export function createRooAccountLinkCookie(token: string, request: Request): string {
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

export function pageStatusForLinkError(code: unknown): RooAccountLinkPageStatus | null {
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
