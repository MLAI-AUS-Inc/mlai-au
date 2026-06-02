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

const RUN_FLOW_PATH_PREFIX = "/founder-tools/marketing/runs/";
// View-only params on the run page: switching these renders a different sub-view
// from data the loader already returned, so no refetch is needed.
const RUN_VIEW_ONLY_SEARCH_PARAMS = new Set(["setupStep"]);

function searchParamsWithout(url: URL, omit: Set<string>) {
  const params = new URLSearchParams(url.search);
  for (const key of omit) {
    params.delete(key);
  }
  params.sort();
  return params.toString();
}

function searchParamsChanged(currentUrl: URL, nextUrl: URL, keys: Set<string>) {
  for (const key of keys) {
    if (currentUrl.searchParams.get(key) !== nextUrl.searchParams.get(key)) {
      return true;
    }
  }
  return false;
}

export function isVibeMarketingRunViewNavigation(currentUrl: URL, nextUrl: URL) {
  const currentPathname = normalizePathname(currentUrl.pathname);
  const nextPathname = normalizePathname(nextUrl.pathname);
  // Must stay on the exact same run (the runId is part of the pathname).
  if (currentPathname !== nextPathname) {
    return false;
  }
  if (!currentPathname.startsWith(RUN_FLOW_PATH_PREFIX)) {
    return false;
  }
  // Only skip when a view-only param actually changed. A same-URL
  // revalidator.revalidate() (the status poll's full-refresh trigger) leaves
  // every param identical, so this returns false and the run still refreshes.
  if (!searchParamsChanged(currentUrl, nextUrl, RUN_VIEW_ONLY_SEARCH_PARAMS)) {
    return false;
  }
  // ...and nothing outside the view-only set differs.
  return (
    searchParamsWithout(currentUrl, RUN_VIEW_ONLY_SEARCH_PARAMS) ===
    searchParamsWithout(nextUrl, RUN_VIEW_ONLY_SEARCH_PARAMS)
  );
}

export function shouldSkipVibeMarketingRunRevalidation({
  currentUrl,
  nextUrl,
  formMethod,
  actionResult,
  actionStatus,
}: ShouldRevalidateFunctionArgs) {
  // Never skip a revalidation that follows a mutation/action.
  if (formMethod || actionResult !== undefined || actionStatus !== undefined) {
    return false;
  }
  return isVibeMarketingRunViewNavigation(currentUrl, nextUrl);
}
