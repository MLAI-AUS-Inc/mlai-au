import { afterEach, describe, expect, test } from "bun:test";

// Other test files replace app modules globally. Run these integration checks
// with the real clients in a separate Bun process.
if (process.env.API_ERROR_REDACTION_CHILD !== "1") {
  test("backend error privacy cases pass with the real clients", () => {
    const result = Bun.spawnSync([process.execPath, "test", import.meta.path], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        API_ERROR_REDACTION_CHILD: "1",
        VITE_STUB_BACKEND: "false",
        VITE_DEV_AUTH_BYPASS: "false",
      },
      stdout: "pipe",
      stderr: "pipe",
    });
    expect(result.exitCode, result.stdout.toString() + result.stderr.toString()).toBe(0);
  });
} else {
  const { renderToStaticMarkup } = await import("react-dom/server");
  const { MemoryRouter } = await import("react-router");
  const { apiErrorDetail, createApiClient, isApiUnavailableError } = await import("../app/lib/api");
  const { AUTH_REQUEST_TIMEOUT_MS, getAxios, getCurrentUser } = await import("../app/lib/auth");
  const { ErrorBoundary, loader: founderToolsLoader } = await import("../app/routes/vibe-raising-app");

  const sessionCookie = "access_token=fixture-access-value; refresh_token=fixture-refresh-value";
  const servers: ReturnType<typeof Bun.serve>[] = [];
  afterEach(() => { for (const server of servers.splice(0)) server.stop(true); });

  function backend(status: number, body: unknown = { detail: "Backend unavailable" }) {
    const requests: { cookie: string | null }[] = [];
    const server = Bun.serve({
      hostname: "127.0.0.1",
      port: 0,
      fetch(request) {
        requests.push({ cookie: request.headers.get("Cookie") });
        return Response.json(body, { status });
      },
    });
    servers.push(server);
    return { baseUrl: server.url.origin, requests };
  }

  function founderRequest() {
    return new Request("https://mlai.au/founder-tools/marketing?step=research", {
      headers: { Cookie: sessionCookie },
    });
  }

  describe("backend error privacy", () => {
    test("auth client keeps session checks bounded", () => {
      const client = getAxios({ BACKEND_BASE_URL: "https://api.mlai.au" } as Env, founderRequest());
      expect(AUTH_REQUEST_TIMEOUT_MS).toBeGreaterThan(0);
      expect(AUTH_REQUEST_TIMEOUT_MS).toBeLessThanOrEqual(10_000);
      expect(client.defaults.timeout).toBe(AUTH_REQUEST_TIMEOUT_MS);
    });

    test("per-request API errors preserve useful 4xx details without serializing credentials", async () => {
      const fixture = backend(409, { detail: "Review conflict", access_token: "fixture-body-secret" });
      const client = createApiClient({ BACKEND_BASE_URL: fixture.baseUrl }, founderRequest());
      let caught: unknown;
      try { await client.get("/api/v1/vibe-marketing/bootstrap/"); } catch (error) { caught = error; }

      expect(fixture.requests[0]?.cookie).toBe(sessionCookie);
      expect((caught as { response?: { status?: number } })?.response?.status).toBe(409);
      expect(apiErrorDetail(caught)).toBe("Review conflict");
      expect((caught as { config?: unknown })?.config).toBeUndefined();
      expect((caught as { response?: { data?: { access_token?: string } } })?.response?.data?.access_token).toBe("[redacted]");
      const serialized = JSON.stringify(caught) + String((caught as Error)?.stack);
      expect(serialized).not.toContain("fixture-access-value");
      expect(serialized).not.toContain("fixture-refresh-value");
      expect(serialized).not.toContain("fixture-body-secret");
    });

    test("auth origin 521 cannot leak session cookies and remains an error", async () => {
      const fixture = backend(521, { detail: "Origin unavailable" });
      const request = founderRequest();
      let caught: unknown;
      try { await getCurrentUser({ BACKEND_BASE_URL: fixture.baseUrl } as Env, request); } catch (error) { caught = error; }

      expect(fixture.requests[0]?.cookie).toBe(sessionCookie);
      expect(isApiUnavailableError(caught)).toBe(true);
      expect((caught as { response?: { status?: number } })?.response?.status).toBe(521);
      expect((caught as { config?: unknown })?.config).toBeUndefined();
      expect(JSON.stringify(caught) + String((caught as Error)?.stack)).not.toContain("fixture-access-value");

      await expect(founderToolsLoader({
        request,
        params: {},
        context: { cloudflare: { env: { BACKEND_BASE_URL: fixture.baseUrl } } },
      } as never)).rejects.toMatchObject({ status: 503 });
    });

    test("direct auth client failures also return safe errors", async () => {
      const fixture = backend(521);
      const client = getAxios({ BACKEND_BASE_URL: fixture.baseUrl } as Env, founderRequest());
      let caught: unknown;
      try { await client.get("/api/v1/auth/me/"); } catch (error) { caught = error; }

      expect((caught as { response?: { status?: number } })?.response?.status).toBe(521);
      expect((caught as { config?: unknown })?.config).toBeUndefined();
      expect(JSON.stringify(caught) + String((caught as Error)?.stack)).not.toContain("fixture-access-value");
    });

    test("a real 401 still requires sign-in", async () => {
      const fixture = backend(401, { detail: "Sign in" });
      const user = await getCurrentUser({ BACKEND_BASE_URL: fixture.baseUrl } as Env, founderRequest());
      expect(user).toBeNull();
    });

    test("founder tools show a retryable marketing error instead of the generic error page", () => {
      const html = renderToStaticMarkup(
        <MemoryRouter initialEntries={["/founder-tools/marketing?step=research"]}>
          <ErrorBoundary error={new Response(null, { status: 503 }) as never} />
        </MemoryRouter>,
      );
      expect(html).toContain("Vibe Marketing is temporarily unavailable");
      expect(html).toContain("Try again");
      expect(html).toContain('href="/founder-tools/marketing?step=research"');
      expect(html).not.toContain("Oops!");
    });
  });
}
