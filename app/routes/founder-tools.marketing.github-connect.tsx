import type { Route } from "./+types/founder-tools.marketing.github-connect";
import { redirect } from "react-router";

import { getEnv } from "~/lib/env.server";
import { connectVibeMarketingGithub } from "~/lib/vibe-marketing";
import { requireVibeRaisingFounder, resolveActiveCompanyId } from "~/lib/vibe-raising";

const DEFAULT_RETURN_TO = "/founder-tools/marketing/create?step=articleSystem";

function boolFromSearch(value: string | null) {
  return value === "1" || value === "true" || value === "yes";
}

function safeReturnTo(value: string | null) {
  const fallback = DEFAULT_RETURN_TO;
  const raw = String(value || "").trim();
  if (!raw || !raw.startsWith("/founder-tools/marketing")) return fallback;
  return raw;
}

function redirectWithGithubError(returnTo: string, message: string) {
  const target = new URL(returnTo, "https://mlai.au");
  target.searchParams.set("githubAuthError", message);
  return redirect(`${target.pathname}${target.search}${target.hash}`);
}

function isGithubAuthUrl(value: unknown): value is string {
  if (typeof value !== "string" || !value.trim()) return false;
  try {
    const url = new URL(value);
    return url.protocol === "https:" && url.hostname === "github.com";
  } catch {
    return false;
  }
}

function stringField(value: unknown, key: string) {
  if (!value || typeof value !== "object" || Array.isArray(value)) return "";
  const field = (value as Record<string, unknown>)[key];
  return typeof field === "string" && field.trim() ? field.trim() : "";
}

function githubAuthErrorMessage(error: unknown) {
  const responseData =
    error && typeof error === "object" && "response" in error
      ? (error as { response?: { data?: unknown } }).response?.data
      : null;
  const directData =
    error && typeof error === "object" && "data" in error
      ? (error as { data?: unknown }).data
      : null;
  return (
    stringField(responseData, "detail") ||
    stringField(responseData, "error") ||
    stringField(directData, "detail") ||
    stringField(directData, "error") ||
    (error instanceof Error && error.message ? error.message : "") ||
    "GitHub authorization could not be opened. Check GitHub App configuration."
  );
}

export async function loader({ request, context }: Route.LoaderArgs) {
  const env = getEnv(context);
  const { appUser } = await requireVibeRaisingFounder(env, request);
  const companyId = resolveActiveCompanyId(appUser);

  const url = new URL(request.url);
  const returnTo = safeReturnTo(url.searchParams.get("returnTo"));
  const forceReconnect = boolFromSearch(url.searchParams.get("forceReconnect"));
  const githubRepo = String(url.searchParams.get("githubRepo") || "").trim();

  // Absolute URL of the page to land back on after the GitHub App install. The
  // backend embeds this in the OAuth state and redirects the browser here once
  // the install completes (it re-validates the origin against mlai.au first).
  const returnUrl = new URL(returnTo, url.origin).toString();

  try {
    const response = await connectVibeMarketingGithub(env, request, {
      companyId,
      company_id: companyId,
      returnUrl,
      return_url: returnUrl,
      ...(githubRepo && !forceReconnect ? { githubRepo, github_repo: githubRepo } : {}),
      ...(forceReconnect ? { forceReconnect: true, force_reconnect: true } : {}),
    });
    const authUrl = response.auth_url ?? response.authUrl;
    if (isGithubAuthUrl(authUrl)) {
      throw redirect(authUrl);
    }

    const detail =
      response.detail ??
      response.error ??
      "GitHub authorization could not be opened. Check GitHub App configuration.";
    return redirectWithGithubError(returnTo, detail);
  } catch (error) {
    if (error instanceof Response) throw error;
    return redirectWithGithubError(returnTo, githubAuthErrorMessage(error));
  }
}
