import { beforeEach, describe, expect, mock, test } from "bun:test";
import { readFileSync } from "node:fs";

const connectGithub = mock(async () => ({
  auth_url: "https://github.com/apps/mlai-tools/installations/new",
}));
const requireFounder = mock(async () => ({ appUser: { id: 123 } }));

mock.module("../app/lib/env.server", () => ({
  getEnv: () => ({ BACKEND_BASE_URL: "https://api.mlai.au" }),
}));

mock.module("../app/lib/vibe-marketing", () => ({
  connectVibeMarketingGithub: connectGithub,
}));

mock.module("../app/lib/vibe-raising", () => ({
  requireVibeRaisingFounder: requireFounder,
  resolveActiveCompanyId: () => 151,
}));

const { action, loader } = await import(
  "../app/routes/founder-tools.marketing.github-connect"
);

const routeArgs = (request: Request) =>
  ({ request, context: {}, params: {} }) as never;

describe("GitHub connect route", () => {
  beforeEach(() => {
    connectGithub.mockClear();
    requireFounder.mockClear();
    connectGithub.mockImplementation(async () => ({
      auth_url: "https://github.com/apps/mlai-tools/installations/new",
    }));
  });

  test("GET is non-mutating and returns the founder to a safe page", async () => {
    const request = new Request(
      "https://mlai.au/founder-tools/marketing/github-connect?returnTo=%2Ffounder-tools%2Fmarketing",
      { headers: { Cookie: "access_token=test-token" } },
    );

    const response = await loader(routeArgs(request));

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toStartWith(
      "/founder-tools/marketing?githubAuthError=",
    );
    expect(connectGithub).not.toHaveBeenCalled();
    expect(requireFounder).toHaveBeenCalledTimes(1);
  });

  test("POST passes the browser Origin through and redirects to GitHub", async () => {
    const request = new Request(
      "https://mlai.au/founder-tools/marketing/github-connect",
      {
        method: "POST",
        headers: {
          Cookie: "access_token=test-token",
          Origin: "https://mlai.au",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          returnTo: "/founder-tools/marketing/create?step=articleSystem",
          forceReconnect: "true",
        }),
      },
    );

    const response = await action(routeArgs(request));

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      "https://github.com/apps/mlai-tools/installations/new",
    );
    expect(connectGithub).toHaveBeenCalledTimes(1);

    const [env, forwardedRequest, body] = connectGithub.mock.calls[0] as unknown as [
      Record<string, string>,
      Request,
      Record<string, unknown>,
    ];
    expect(env.BACKEND_BASE_URL).toBe("https://api.mlai.au");
    expect(forwardedRequest).toBe(request);
    expect(forwardedRequest.headers.get("Origin")).toBe("https://mlai.au");
    expect(body).toMatchObject({
      companyId: 151,
      company_id: 151,
      returnUrl: "https://mlai.au/founder-tools/marketing/create?step=articleSystem",
      return_url: "https://mlai.au/founder-tools/marketing/create?step=articleSystem",
      forceReconnect: true,
      force_reconnect: true,
    });
  });

  test("POST rejects an external return target before creating OAuth state", async () => {
    const request = new Request(
      "https://mlai.au/founder-tools/marketing/github-connect",
      {
        method: "POST",
        headers: {
          Cookie: "access_token=test-token",
          Origin: "https://mlai.au",
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({ returnTo: "https://evil.example/steal" }),
      },
    );

    await action(routeArgs(request));

    const body = connectGithub.mock.calls[0]?.[2] as Record<string, unknown>;
    expect(body.returnUrl).toBe(
      "https://mlai.au/founder-tools/marketing/create?step=articleSystem",
    );
  });
});

describe("GitHub connect entry points", () => {
  test("all connect controls use the shared native POST form", () => {
    const formSource = readFileSync(
      new URL("../app/components/GitHubConnectForm.tsx", import.meta.url),
      "utf8",
    );
    const articlePanelSource = readFileSync(
      new URL("../app/components/ArticleSystemConnectionPanel.tsx", import.meta.url),
      "utf8",
    );
    const dashboardSource = readFileSync(
      new URL("../app/routes/founder-tools.marketing.tsx", import.meta.url),
      "utf8",
    );
    const runSource = readFileSync(
      new URL("../app/routes/founder-tools.marketing.run.tsx", import.meta.url),
      "utf8",
    );

    expect(formSource).toContain('method="POST"');
    expect(formSource).toContain("reloadDocument");
    expect(formSource).toContain('target === "_blank" ? "noopener noreferrer"');
    expect(articlePanelSource.match(/<GitHubConnectForm/g)?.length).toBe(2);
    expect(dashboardSource.match(/<GitHubConnectForm/g)?.length).toBe(1);
    expect(runSource.match(/<GitHubConnectForm/g)?.length).toBe(1);

    for (const source of [articlePanelSource, dashboardSource, runSource]) {
      expect(source).not.toContain("/founder-tools/marketing/github-connect?");
    }
  });
});
