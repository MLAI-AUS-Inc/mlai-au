import { afterEach, describe, expect, test } from "bun:test";

// Other route tests replace these modules with global Bun mocks. Exercise the
// real HTTP clients in a fresh process so test order cannot change the result.
if (process.env.MARKETING_LOADER_REGRESSION_CHILD !== "1") {
  test("real marketing loaders pass the isolated HTTP regression cases", () => {
    const result = Bun.spawnSync([process.execPath, "test", import.meta.path], {
      cwd: process.cwd(),
      env: { ...process.env, MARKETING_LOADER_REGRESSION_CHILD: "1", VITE_STUB_BACKEND: "false", VITE_DEV_AUTH_BYPASS: "false" },
      stdout: "pipe",
      stderr: "pipe",
    });
    expect(result.exitCode, result.stdout.toString() + result.stderr.toString()).toBe(0);
  });
} else {
  const { loader: dashboardLoader } = await import("../app/routes/founder-tools.marketing");
  const { loader: runLoader } = await import("../app/routes/founder-tools.marketing.run");

  const companyId = "company-a";
  const runId = "component-revision-test";
  const marketingPath = "/founder-tools/marketing";
  const runPath = `${marketingPath}/runs/${runId}`;

  function deferred() {
    let resolve!: () => void;
    const promise = new Promise<void>((done) => { resolve = done; });
    return { promise, resolve };
  }

  const servers: ReturnType<typeof Bun.serve>[] = [];
  afterEach(() => { for (const server of servers.splice(0)) server.stop(true); });

  function backend(options: {
    bootstrapGate?: Promise<void>;
    onBootstrap?: () => void;
    onRun?: () => void;
    runStatus?: number;
    authStatus?: number;
    otherCompany?: boolean;
  } = {}) {
    const requests: { path: string; company: string | null; method: string; cookie: string | null }[] = [];
    const server = Bun.serve({
      hostname: "127.0.0.1",
      port: 0,
      async fetch(request) {
        const url = new URL(request.url);
        requests.push({ path: url.pathname, company: url.searchParams.get("company_id"), method: request.method, cookie: request.headers.get("Cookie") });
        if (url.pathname === "/api/v1/auth/me/") {
          return Response.json({ id: 1, email: "founder@example.test", full_name: "Test Founder" }, { status: options.authStatus ?? 200 });
        }
        if (url.pathname === "/api/v1/founder-tools/profile/") {
          return Response.json({ role: "founder", activeCompanyId: companyId, companies: [
            { id: companyId, name: "Test startup", domain: "example.test" },
            ...(options.otherCompany ? [{ id: "company-b", name: "Other startup", domain: "other.test" }] : []),
          ] });
        }
        if (url.pathname === "/api/v1/vibe-marketing/bootstrap/") {
          options.onBootstrap?.();
          await options.bootstrapGate;
          return Response.json({ company: { id: companyId }, settings: { githubConnectionState: "connected" }, checks: {} });
        }
        if (url.pathname === `/api/v1/vibe-marketing/runs/${runId}`) {
          options.onRun?.();
          return Response.json({ runId, workflow: "article_revision", status: "blocked" }, {
            status: url.searchParams.get("company_id") === "company-b" ? 200 : options.runStatus ?? 200,
          });
        }
        if (request.method === "POST" && url.pathname === "/api/v1/founder-tools/active-company/") {
          return Response.json({});
        }
        // A dependency not needed for navigation (including GitHub) is unavailable.
        return Response.json({ detail: "Unexpected backend request" }, { status: 503 });
      },
    });
    servers.push(server);
    function args(path: string) {
      return {
        request: new Request(`https://mlai.au${path}`, { headers: { Cookie: "access_token=fixture" } }),
        params: { runId },
        context: { cloudflare: { env: { BACKEND_BASE_URL: server.url.origin } } },
      } as unknown as Parameters<typeof runLoader>[0];
    }
    return { requests, args };
  }

  describe("marketing navigation loaders", () => {
    test("repeated dashboard visits succeed without enumerating GitHub repositories", async () => {
      const fixture = backend();
      for (let i = 0; i < 2; i++) {
        const data = await dashboardLoader(fixture.args(marketingPath));
        expect(data.bootstrap.settings.githubConnectionState).toBe("connected");
      }
      expect(fixture.requests.filter((request) => request.path.includes("github"))).toEqual([]);
      expect(fixture.requests.filter((request) => request.path.includes("bootstrap")).map((request) => request.company)).toEqual([companyId, companyId]);
    });

    test("starts the full run read while bootstrap is still waiting", async () => {
      const gate = deferred();
      const bootstrapStarted = deferred();
      const runStarted = deferred();
      const fixture = backend({ bootstrapGate: gate.promise, onBootstrap: bootstrapStarted.resolve, onRun: runStarted.resolve });
      const loading = runLoader(fixture.args(runPath));
      let deadline: ReturnType<typeof setTimeout> | undefined;
      try {
        await bootstrapStarted.promise;
        // The old sequential loader cannot reach the run endpoint until gate opens.
        await Promise.race([
          runStarted.promise,
          new Promise((_, reject) => { deadline = setTimeout(() => reject(new Error("Run waited for bootstrap")), 1000); }),
        ]);
      } finally {
        clearTimeout(deadline);
        gate.resolve();
        await loading;
      }
      const data = await loading;
      expect(data.run.runId).toBe(runId);
      expect(data.setupRun).toBeNull();
      const marketingRequests = fixture.requests.filter((request) => request.path.includes("vibe-marketing"));
      expect(marketingRequests.map((request) => request.path).sort()).toEqual([
        "/api/v1/vibe-marketing/bootstrap/",
        "/api/v1/vibe-marketing/editorial-catalog/",
        `/api/v1/vibe-marketing/runs/${runId}`,
      ].sort());
      expect(marketingRequests.every((request) => request.company === companyId && request.cookie === "access_token=fixture")).toBe(true);
    });

    test("a deleted run still redirects to marketing", async () => {
      const fixture = backend({ runStatus: 404 });
      try {
        await runLoader(fixture.args(runPath));
        throw new Error("Expected a redirect");
      } catch (error) {
        expect(error).toBeInstanceOf(Response);
        expect((error as Response).status).toBe(302);
        expect((error as Response).headers.get("Location")).toBe(marketingPath);
      }
    });

    test("a deep link in another owned company still switches company and redirects", async () => {
      const fixture = backend({ runStatus: 404, otherCompany: true });
      try {
        await runLoader(fixture.args(runPath));
        throw new Error("Expected a redirect");
      } catch (error) {
        expect(error).toBeInstanceOf(Response);
        expect((error as Response).headers.get("Location")).toBe(runPath);
      }
      expect(fixture.requests.filter((request) => request.path.includes("/runs/")).map((request) => request.company)).toEqual([companyId, "company-b"]);
      expect(fixture.requests.filter((request) => request.method === "POST").map((request) => request.path)).toEqual(["/api/v1/founder-tools/active-company/"]);
    });

    test("unauthenticated visitors do not start marketing data reads", async () => {
      const fixture = backend({ authStatus: 401 });
      for (const load of [dashboardLoader, runLoader]) {
        try {
          await load(fixture.args(runPath));
          throw new Error("Expected login redirect");
        } catch (error) {
          expect(error).toBeInstanceOf(Response);
          expect((error as Response).headers.get("Location")).toStartWith("/platform/login?");
        }
      }
      expect(fixture.requests.every((request) => request.path === "/api/v1/auth/me/")).toBe(true);
    });
  });

}
