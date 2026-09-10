import { beforeEach, describe, expect, mock, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const TOKEN = "A".repeat(43);
const apiPost = mock(async (path: string) => ({
  data:
    path.includes("preview")
      ? {
          status: "ready",
          slack_display_name: "Slack Founder",
          expires_at: "2026-08-23T12:30:00Z",
        }
      : { status: "linked" },
}));
const createApiClient = mock(() => ({ post: apiPost }));
const getCurrentUser = mock(async () => ({ email: "founder@example.com" }));

mock.module("../app/lib/api", () => ({
  apiErrorDetail: (_error: unknown, fallback: string) => fallback,
  createApiClient,
  shouldUseDevBackendStub: () => false,
}));

mock.module("../app/lib/auth", () => ({
  getCurrentUser,
}));

mock.module("../app/lib/env.server", () => ({
  getEnv: () => ({
    BACKEND_BASE_URL: "https://api.mlai.au",
    VITE_SITE_URL: "https://mlai.au",
  }),
}));

mock.module("../app/lib/vibe-raising", () => ({
  getVibeRaisingLoginHref: () => "/platform/login",
}));

const { action, loader } = await import(
  "../app/routes/founder-tools.link-roo"
);

const routeArgs = (request: Request) =>
  ({ request, context: {}, params: {} }) as never;

const cookie =
  `access_token=authenticated; roo_founder_link_token=${TOKEN}; theme=light`;

describe("Founder Tools Roo account-link route", () => {
  beforeEach(() => {
    apiPost.mockClear();
    createApiClient.mockClear();
    getCurrentUser.mockClear();
  });

  test("discloses every current use of the connected Slack identity", () => {
    const source = readFileSync(
      join(process.cwd(), "app/routes/founder-tools.link-roo.tsx"),
      "utf8",
    );

    expect(source).toContain("coworking discount");
    expect(source).toContain("Founder Tools service");
    expect(source).toContain("notifications to your Slack account");
    expect(source).not.toContain("used only for discount eligibility");
  });

  test("ordinary Origin-less document GET previews through the trusted site origin", async () => {
    const request = new Request("https://mlai.au/founder-tools/link-roo", {
      headers: { Cookie: cookie },
    });

    const result = await loader(routeArgs(request));

    expect(result).toEqual({
      state: "ready",
      slackDisplayName: "Slack Founder",
      founderEmail: "founder@example.com",
      expiresAt: "2026-08-23T12:30:00Z",
    });
    expect(apiPost).toHaveBeenCalledWith(
      "/api/v1/users/slack-founder-link/preview/",
      { token: TOKEN },
    );
    const backendRequest = createApiClient.mock.calls[0]?.[1] as Request;
    expect(backendRequest.headers.get("Origin")).toBe("https://mlai.au");
    expect(backendRequest.headers.get("Cookie")).toBe(
      "access_token=authenticated; theme=light",
    );
    expect(backendRequest.headers.get("Cookie")).not.toContain(TOKEN);
  });

  test("trusted same-origin action completes the link", async () => {
    const request = new Request("https://mlai.au/founder-tools/link-roo", {
      method: "POST",
      headers: {
        Cookie: cookie,
        Origin: "https://mlai.au",
      },
    });

    const response = await action(routeArgs(request));

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      "/founder-tools/link-roo?status=linked",
    );
    expect(apiPost).toHaveBeenCalledWith(
      "/api/v1/users/slack-founder-link/complete/",
      { token: TOKEN },
    );
    const backendRequest = createApiClient.mock.calls[0]?.[1] as Request;
    expect(backendRequest.headers.get("Origin")).toBe("https://mlai.au");
    expect(backendRequest.headers.get("Cookie")).not.toContain(TOKEN);
  });

  test("malformed preview responses fail closed", async () => {
    apiPost.mockImplementationOnce(async () => ({
      data: {
        status: "ready",
        slack_display_name: "Slack Founder",
        expires_at: "not-a-date",
      },
    }));
    const request = new Request("https://mlai.au/founder-tools/link-roo", {
      headers: { Cookie: cookie },
    });

    const result = await loader(routeArgs(request));

    expect(result).toEqual({
      state: "error",
      message: "We could not verify this link right now. Please try again.",
    });
  });

  test("unknown completion responses do not report success", async () => {
    apiPost.mockImplementationOnce(async () => ({
      data: { status: "unexpected" },
    }));
    const request = new Request("https://mlai.au/founder-tools/link-roo", {
      method: "POST",
      headers: {
        Cookie: cookie,
        Origin: "https://mlai.au",
      },
    });

    const response = await action(routeArgs(request));

    expect(response).toEqual({
      error:
        "We could not confirm whether the accounts connected. Refresh this page to verify before trying again.",
    });
  });

  test("a consumed token confirms only the authenticated matching connection", async () => {
    apiPost.mockImplementationOnce(async () => {
      throw {
        response: {
          data: {
            code: "token_already_used",
            connection_matches_requesting_user: true,
          },
        },
      };
    });
    const request = new Request("https://mlai.au/founder-tools/link-roo", {
      method: "POST",
      headers: {
        Cookie: cookie,
        Origin: "https://mlai.au",
      },
    });

    const response = await action(routeArgs(request));

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      "/founder-tools/link-roo?status=already-linked",
    );
  });

  test("a consumed token for another user is not reported as connected", async () => {
    apiPost.mockImplementationOnce(async () => {
      throw {
        response: {
          data: {
            code: "token_already_used",
            connection_matches_requesting_user: false,
          },
        },
      };
    });
    const request = new Request("https://mlai.au/founder-tools/link-roo", {
      method: "POST",
      headers: {
        Cookie: cookie,
        Origin: "https://mlai.au",
      },
    });

    const response = await action(routeArgs(request));

    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe(
      "/founder-tools/link-roo?status=used",
    );
  });

  test.each([null, "https://evil.example"])(
    "missing or untrusted browser Origin is rejected before backend completion: %s",
    async (origin) => {
      const headers = new Headers({ Cookie: cookie });
      if (origin) headers.set("Origin", origin);
      const request = new Request(
        "https://mlai.au/founder-tools/link-roo",
        { method: "POST", headers },
      );

      const response = await action(routeArgs(request));

      expect(response.status).toBe(403);
      expect(apiPost).not.toHaveBeenCalled();
      expect(createApiClient).not.toHaveBeenCalled();
    },
  );

  test("a forged frontend host cannot cause a trusted preview Origin", async () => {
    const request = new Request(
      "https://evil.example/founder-tools/link-roo",
      { headers: { Cookie: cookie } },
    );

    const result = await loader(routeArgs(request));

    expect(result).toEqual({
      state: "error",
      message: "We could not verify this Founder Tools page.",
    });
    expect(getCurrentUser).not.toHaveBeenCalled();
    expect(createApiClient).not.toHaveBeenCalled();
  });
});
