// Public Studio intake forms submit directly to the API without a member session.
export function publicApiOrigin(hostname: string | undefined, configured = import.meta.env.VITE_API_URL?.trim()) {
  if (hostname === "mlai.au" || hostname === "www.mlai.au") return "https://api.mlai.au";
  if (configured) return configured;
  if (!hostname || ["localhost", "127.0.0.1", "::1", "[::1]"].includes(hostname) || hostname.endsWith(".localhost")) return "http://localhost:8000";
  return window.location.origin;
}
export const API_URL = publicApiOrigin(typeof window === "undefined" ? undefined : window.location.hostname);
