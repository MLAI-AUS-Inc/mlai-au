import type { Route } from "./+types/vibe-raising-redirect";
import { redirect } from "react-router";

const LEGACY_ROUTE_MAP: Record<string, string> = {
  "/vibe-raising": "/founder-tools/updates",
  "/vibe-raising/": "/founder-tools/updates",
  "/vibe-raising/create-update": "/founder-tools/updates/create",
  "/vibe-raising/connect-data": "/founder-tools/data-sources",
  "/vibe-raising/companies": "/founder-tools/companies",
  "/vibe-raising/company-setup": "/founder-tools/company-setup",
  "/vibe-raising/discover": "/founder-tools/updates",
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const targetPath = LEGACY_ROUTE_MAP[url.pathname] ?? "/founder-tools/updates";
  throw redirect(`${targetPath}${url.search}`);
};

export default function VibeRaisingRedirect() {
  return null;
}
