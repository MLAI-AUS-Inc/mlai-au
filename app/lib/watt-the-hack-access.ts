export const WATT_THE_HACK_SLUG = "watt-the-hack";
export const WATT_THE_HACK_API_SLUG = "watt";
export const WATT_THE_HACK_PUBLIC_ACCESS_ENABLED = false;

const WATT_ROUTE_PREFIX = `/${WATT_THE_HACK_SLUG}`;
const WATT_API_PATH_PATTERN = /^\/api\/v1\/hackathons\/(?:watt|watt-the-hack)(?:\/|$)/;

function pathFromValue(value: string | null | undefined): string {
  if (!value) return "";

  try {
    return new URL(value, "https://mlai.local").pathname;
  } catch {
    return "";
  }
}

export function isWattTheHackRoutePath(value: string | null | undefined): boolean {
  const pathname = pathFromValue(value);
  return pathname === WATT_ROUTE_PREFIX || pathname.startsWith(`${WATT_ROUTE_PREFIX}/`);
}

export function isWattTheHackEndpointPath(pathname: string): boolean {
  return WATT_API_PATH_PATTERN.test(pathname);
}

export function isWattTheHackSlug(slug: string | null | undefined): boolean {
  return slug === WATT_THE_HACK_SLUG || slug === WATT_THE_HACK_API_SLUG;
}

export function isWattTheHackAuthRequest(app: string | null | undefined, next: string | null | undefined): boolean {
  return app === WATT_THE_HACK_SLUG || isWattTheHackRoutePath(next);
}

export function wattTheHackUnavailableResponse() {
  return new Response("Not Found", {
    status: 404,
    headers: {
      "X-Robots-Tag": "noindex, nofollow",
    },
  });
}

export function assertWattTheHackPublicAccessEnabled(): void {
  if (!WATT_THE_HACK_PUBLIC_ACCESS_ENABLED) {
    throw wattTheHackUnavailableResponse();
  }
}

export function assertWattTheHackSlugEnabled(slug: string | null | undefined): void {
  if (!WATT_THE_HACK_PUBLIC_ACCESS_ENABLED && isWattTheHackSlug(slug)) {
    throw wattTheHackUnavailableResponse();
  }
}

export function assertWattTheHackAuthEnabled(app: string | null | undefined, next: string | null | undefined): void {
  if (!WATT_THE_HACK_PUBLIC_ACCESS_ENABLED && isWattTheHackAuthRequest(app, next)) {
    throw wattTheHackUnavailableResponse();
  }
}
