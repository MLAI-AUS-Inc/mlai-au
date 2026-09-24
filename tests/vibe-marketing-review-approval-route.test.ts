import { afterEach, beforeEach, describe, expect, test } from "bun:test";

// Route suites share Bun module state; keep this HTTP fixture isolated from
// other tests that replace the API client.
if (process.env.REVIEW_APPROVAL_ROUTE_CHILD !== "1") {
  test("review approval route passes its isolated HTTP cases", () => {
    const result = Bun.spawnSync([process.execPath, "test", import.meta.path], {
      cwd: process.cwd(),
      env: { ...process.env, REVIEW_APPROVAL_ROUTE_CHILD: "1", VITE_STUB_BACKEND: "false", VITE_DEV_AUTH_BYPASS: "false" },
      stdout: "pipe", stderr: "pipe",
    });
    expect(result.exitCode, result.stdout.toString() + result.stderr.toString()).toBe(0);
  });
} else {
  const { action } = await import("../app/routes/founder-tools.marketing.run");
  const previewUrl = "https://preview.example/articles/latest";
  let server: ReturnType<typeof Bun.serve>;
  let calls: { method: string; path: string; body: unknown }[];
  let latestRunId: string;
  let latestPreviewUrl: string;
  let latestCommitSha: string;
  let publishRecovery: boolean;
  let manifestPresent: boolean;
  let preapprovalPr: boolean;
  let qualityMode: "passed" | "missing" | "stale";
  let originalFetch: typeof fetch;

  beforeEach(() => {
    calls = [];
    latestRunId = "revision-3";
    latestPreviewUrl = previewUrl;
    latestCommitSha = "commit-3";
    publishRecovery = false;
    manifestPresent = true;
    preapprovalPr = false;
    qualityMode = "passed";
    server = Bun.serve({ hostname: "127.0.0.1", port: 0, async fetch(request) {
      const url = new URL(request.url);
      const path = url.pathname + url.search;
      const body = request.method === "POST" ? await request.json() : null;
      calls.push({ method: request.method, path, body });
      if (url.pathname === "/api/v1/auth/me/") return Response.json({ id: 99, email: "review@example.test" });
      if (url.pathname === "/api/v1/founder-tools/profile/") return Response.json({ role: "founder", activeCompanyId: "owned", companies: [{ id: "owned", name: "Fixture company", domain: "example.test" }] });
      if (url.pathname === "/api/v1/vibe-marketing/runs/existing-publish-child" && request.method === "GET") {
        return Response.json({
          runId: "existing-publish-child", workflow: "article_generation", domain: "example.test",
          status: "approval_required", approvalState: "approval_required", currentStep: "await_publish_approval",
          prUrl: "https://github.example/publish-child-pr",
          result: { publish_child_run_id: "existing-publish-child", pr_url: "https://github.example/publish-child-pr" },
        });
      }
      if (url.pathname === "/api/v1/vibe-marketing/runs/source-1" && request.method === "GET") {
        return Response.json({
          runId: latestRunId, workflow: "article_revision", domain: "example.test", status: publishRecovery ? "completed" : "approval_required",
          currentStep: publishRecovery ? "promote_bundle" : "await_review", approvalState: publishRecovery ? "approved" : "approval_required",
          componentManifest: manifestPresent ? { components: [{ id: "section:intro", type: "section", label: "Introduction" }] } : null,
          contentPackage: { title: "Latest draft", contentPackaged: true },
          prUrl: preapprovalPr ? "https://github.example/draft-article-pr" : null,
          publishChildRecoverable: publishRecovery,
          livePreview: { available: true, status: "ready", previewUrl: latestPreviewUrl, exactRender: true, commitSha: latestCommitSha },
          result: { status: "preview_ready", review_surface_kind: "component_live_preview", preview_url: latestPreviewUrl,
            ...(qualityMode === "missing" ? {} : { article_preview_quality: {
              status: "passed", preview_url: qualityMode === "stale" ? "https://preview.example/articles/old" : latestPreviewUrl, resume_generation: 0,
            } }),
            ...(preapprovalPr ? { pr_url: "https://github.example/draft-article-pr", draft_pr_url: "https://github.example/setup-pr",
              publish_child_preview_url: "https://preview.example/old-publish" } : {}),
            ...(publishRecovery ? { publish_child_run_id: "existing-publish-child", publish_child_recoverable: true } : {}) },
        });
      }
      if ([`/api/v1/vibe-marketing/runs/${latestRunId}/approve`,
        `/api/v1/vibe-marketing/runs/${latestRunId}/retry-preview-quality`,
        `/api/v1/vibe-marketing/runs/${latestRunId}/promote-bundle`,
        "/api/v1/vibe-marketing/runs/source-1/promote-bundle",
        "/api/v1/vibe-marketing/runs/existing-publish-child/approve"].includes(url.pathname) && request.method === "POST") {
        return Response.json({ runId: "publish-child-1", workflow: "article_generation", domain: "example.test", status: "queued" });
      }
      return Response.json({ detail: `Unexpected ${request.method} ${path}` }, { status: 404 });
    } });
    originalFetch = globalThis.fetch;
    globalThis.fetch = (async (input: Parameters<typeof fetch>[0], init?: RequestInit) => {
      const url = input instanceof Request ? input.url : String(input);
      if (new URL(url).origin !== server.url.origin) throw new Error(`Non-fixture HTTP: ${url}`);
      return originalFetch(input, init);
    }) as typeof fetch;
  });

  afterEach(() => {
    globalThis.fetch = originalFetch;
    server.stop(true);
  });

  async function submit(intent: string, reviewedRunId = "", reviewedPreviewUrl = "", reviewedPreviewRevision = "", routeRunId = "source-1", reviewedPublishEvidenceUrl = "", sourceRunId = "") {
    const form = new FormData();
    form.set("intent", intent);
    form.set("reviewedRunId", reviewedRunId);
    form.set("reviewedPreviewUrl", reviewedPreviewUrl);
    form.set("reviewedPublishEvidenceUrl", reviewedPublishEvidenceUrl);
    form.set("reviewedPreviewRevision", reviewedPreviewRevision);
    if (sourceRunId) form.set("sourceRunId", sourceRunId);
    form.set("autoMerge", "true");
    const request = new Request(`https://mlai.au/founder-tools/marketing/runs/${routeRunId}`, {
      method: "POST", body: form, headers: { Cookie: "access_token=fixture-only", Origin: "https://mlai.au" },
    });
    try {
      return await action({ request, params: { runId: routeRunId }, context: { cloudflare: { env: { BACKEND_BASE_URL: server.url.origin } } } } as never);
    } catch (error) {
      if (error instanceof Response) return error;
      throw error;
    }
  }

  const approve = (reviewedRunId: string, reviewedPreviewUrl: string, reviewedPreviewRevision = "commit-3") =>
    submit("approve", reviewedRunId, reviewedPreviewUrl, reviewedPreviewRevision);
  const publishMutations = () => calls.filter((call) => call.method === "POST" && /\/(approve|promote-bundle|publish-pr)$/.test(call.path));

  describe("article review approval identity", () => {
    test("posts to the newest draft displayed on an old source URL", async () => {
      const response = await approve("revision-3", previewUrl);
      expect(response).toBeInstanceOf(Response);
      expect((response as Response).headers.get("Location")).toBe("/founder-tools/marketing/runs/publish-child-1");
      expect(publishMutations()).toEqual([{ method: "POST", path: "/api/v1/vibe-marketing/runs/revision-3/approve", body: { companyId: "owned", autoMerge: true } }]);
    });

    test("does not approve if a newer revision appeared after the page rendered", async () => {
      latestRunId = "revision-4";
      expect(await approve("revision-3", previewUrl)).toMatchObject({ intent: "approve", error: expect.stringContaining("preview changed") });
      expect(publishMutations()).toHaveLength(0);
    });

    test("does not approve a rebuilt preview or an unbound form", async () => {
      latestPreviewUrl = "https://preview.example/articles/rebuilt";
      expect(await approve("revision-3", previewUrl)).toMatchObject({ intent: "approve", error: expect.stringContaining("preview changed") });
      latestPreviewUrl = previewUrl;
      latestCommitSha = "commit-4";
      expect(await approve("revision-3", previewUrl)).toMatchObject({ intent: "approve", error: expect.stringContaining("preview changed") });
      expect(await approve("", "", "")).toMatchObject({ intent: "approve", error: expect.stringContaining("Review and approve") });
      expect(publishMutations()).toHaveLength(0);
    });

    test("does not approve a revision without current hosted quality evidence", async () => {
      qualityMode = "missing";
      expect(await approve("revision-3", previewUrl)).toMatchObject({ intent: "approve", error: expect.stringContaining("preview changed") });
      qualityMode = "stale";
      expect(await approve("revision-3", previewUrl)).toMatchObject({ intent: "approve", error: expect.stringContaining("preview changed") });
      expect(publishMutations()).toHaveLength(0);
    });

    test("retries missing quality on the exact displayed revision, not its ancestor URL", async () => {
      qualityMode = "missing";
      expect(await submit("retry-preview-quality", "revision-3", previewUrl, "commit-3")).toBeInstanceOf(Response);
      expect(calls.filter((call) => call.method === "POST").at(-1)?.path).toBe("/api/v1/vibe-marketing/runs/revision-3/retry-preview-quality");
      latestCommitSha = "commit-4";
      expect(await submit("retry-preview-quality", "revision-3", previewUrl, "commit-3")).toMatchObject({
        intent: "retry-preview-quality", error: expect.stringContaining("preview changed"),
      });
      expect(calls.filter((call) => call.method === "POST")).toHaveLength(1);
    });

    test("rejects a forced Publish view's unbound initial promotion", async () => {
      for (const intent of ["promote-bundle", "publish-pr"]) {
        expect(await submit(intent)).toMatchObject({ intent, error: expect.stringContaining("Review and approve") });
      }
      expect(publishMutations()).toHaveLength(0);
    });

    test("preapproval draft and setup PR URLs do not authorize unbound publishing", async () => {
      preapprovalPr = true;
      for (const intent of ["approve", "promote-bundle", "publish-pr"]) {
        expect(await submit(intent)).toMatchObject({ intent, error: expect.stringContaining("Review and approve") });
      }
      expect(publishMutations()).toHaveLength(0);
      expect(await approve("revision-3", previewUrl)).toBeInstanceOf(Response);
      expect(publishMutations().at(-1)?.path).toBe("/api/v1/vibe-marketing/runs/revision-3/approve");
    });

    test("does not allow an unbound article approval when review proof is absent", async () => {
      manifestPresent = false;
      expect(await submit("approve")).toMatchObject({ intent: "approve", error: expect.stringContaining("Review and approve") });
      expect(publishMutations()).toHaveLength(0);
    });

    test("requires approval before initial promotion, then targets the exact revision for publish-child recovery", async () => {
      expect(await submit("promote-bundle", "revision-3", previewUrl, "commit-3")).toMatchObject({
        intent: "promote-bundle", error: expect.stringContaining("Review and approve"),
      });
      expect(publishMutations()).toHaveLength(0);
      publishRecovery = true;
      expect(await submit("promote-bundle")).toBeInstanceOf(Response);
      expect(publishMutations().at(-1)?.path).toBe("/api/v1/vibe-marketing/runs/revision-3/promote-bundle");
      expect(await submit("approve")).toMatchObject({ intent: "approve", error: expect.stringContaining("Review and approve") });
      expect(publishMutations()).toHaveLength(1);
    });

    test("does not promote an older source supplied by a forged revision form", async () => {
      publishRecovery = true;
      expect(await submit("promote-bundle", "", "", "", "source-1", "", "source-1")).toMatchObject({
        intent: "promote-bundle", error: expect.stringContaining("preview changed"),
      });
      expect(publishMutations()).toHaveLength(0);
    });

    test("a publish child also requires its own visible evidence identity for approval", async () => {
      expect(await submit("approve", "", "", "", "existing-publish-child")).toMatchObject({
        intent: "approve", error: expect.stringContaining("Review and approve"),
      });
      expect(publishMutations()).toHaveLength(0);
      expect(await submit("approve", "existing-publish-child", "", "", "existing-publish-child",
        "https://github.example/publish-child-pr")).toBeInstanceOf(Response);
      expect(publishMutations().at(-1)?.path).toBe("/api/v1/vibe-marketing/runs/existing-publish-child/approve");
    });
  });
}
