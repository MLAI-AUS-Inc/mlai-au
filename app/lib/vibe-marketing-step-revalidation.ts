import type { ShouldRevalidateFunctionArgs } from "react-router";

const CREATE_FLOW_PATH = "/founder-tools/marketing/create";
const VIEW_ONLY_SEARCH_PARAMS = new Set(["step", "googleBaseline"]);
const IN_PLACE_ACTION_INTENTS = new Set(["start-content-island-discovery"]);

function normalizePathname(pathname: string) {
  return pathname.replace(/\/+$/, "") || "/";
}

function searchParamsWithoutViewState(url: URL) {
  const params = new URLSearchParams(url.search);
  for (const key of VIEW_ONLY_SEARCH_PARAMS) {
    params.delete(key);
  }
  params.sort();
  return params.toString();
}

function viewStateChanged(currentUrl: URL, nextUrl: URL) {
  for (const key of VIEW_ONLY_SEARCH_PARAMS) {
    if (currentUrl.searchParams.get(key) !== nextUrl.searchParams.get(key)) {
      return true;
    }
  }
  return false;
}

export function isVibeMarketingCreateViewNavigation(currentUrl: URL, nextUrl: URL) {
  const currentPathname = normalizePathname(currentUrl.pathname);
  const nextPathname = normalizePathname(nextUrl.pathname);
  if (currentPathname !== CREATE_FLOW_PATH || nextPathname !== CREATE_FLOW_PATH) {
    return false;
  }
  if (!viewStateChanged(currentUrl, nextUrl)) {
    return false;
  }
  return searchParamsWithoutViewState(currentUrl) === searchParamsWithoutViewState(nextUrl);
}

export function shouldSkipVibeMarketingCreateRevalidation({
  currentUrl,
  nextUrl,
  formMethod,
  actionResult,
  actionStatus,
}: ShouldRevalidateFunctionArgs) {
  const intent =
    actionResult && typeof actionResult === "object" && "intent" in actionResult
      ? String((actionResult as { intent?: unknown }).intent ?? "")
      : "";
  if (IN_PLACE_ACTION_INTENTS.has(intent)) {
    return true;
  }
  if (formMethod || actionResult !== undefined || actionStatus !== undefined) {
    return false;
  }
  return isVibeMarketingCreateViewNavigation(currentUrl, nextUrl);
}
