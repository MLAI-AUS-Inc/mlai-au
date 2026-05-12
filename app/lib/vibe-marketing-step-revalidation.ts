import type { ShouldRevalidateFunctionArgs } from "react-router";

const CREATE_FLOW_PATH = "/founder-tools/marketing/create";
const VIEW_ONLY_SEARCH_PARAMS = new Set(["step", "googleBaseline"]);

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
  if (formMethod || actionResult !== undefined || actionStatus !== undefined) {
    return false;
  }
  return isVibeMarketingCreateViewNavigation(currentUrl, nextUrl);
}
