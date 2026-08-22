const ROO_ACCOUNT_LINK_PATH = "/founder-tools/link-roo";

export type RooAccountLinkCapabilityDisposition = "route" | "reject" | null;

export function rooAccountLinkCapabilityDisposition(
  url: URL,
): RooAccountLinkCapabilityDisposition {
  if (
    url.pathname !== ROO_ACCOUNT_LINK_PATH ||
    !url.searchParams.has("token")
  ) {
    return null;
  }

  return url.protocol === "https:" &&
    url.hostname === "mlai.au" &&
    (!url.port || url.port === "443")
    ? "route"
    : "reject";
}

export function rejectedRooAccountLinkCapabilityResponse(): Response {

  return new Response(
    "This Roo account link must be opened from its original private message.",
    {
      status: 400,
      headers: {
        "Cache-Control": "no-store",
        "Referrer-Policy": "no-referrer",
        "X-Robots-Tag": "noindex, nofollow",
      },
    },
  );
}
