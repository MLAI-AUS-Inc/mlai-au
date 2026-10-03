import { expect, test, mock } from "bun:test";

if (process.env.OPERATIONS_AUTH_TEST_CHILD !== "1") {
  test("operations auth routes keep the backend entitlement and fixed return origin", () => {
    const result = Bun.spawnSync([process.execPath, "test", import.meta.path], {
      cwd: process.cwd(), env: { ...process.env, OPERATIONS_AUTH_TEST_CHILD: "1" }, stdout: "pipe", stderr: "pipe",
    });
    expect(result.exitCode, result.stdout.toString() + result.stderr.toString()).toBe(0);
  });
} else {
  const currentUser = mock(async () => null as any);
  const checkUser = mock(async () => ({ user_exists: true }));
  const createUser = mock(async () => ({}));
  const sendMagicLink = mock(async () => ({ magic_link_sent: true }));
  const verifyMagicLinkWithCookies = mock(async () => ({ data: {}, setCookieHeaders: ["access_token=fixture; Domain=.mlai.au; Secure; HttpOnly"] }));
  mock.module("../app/lib/auth", () => ({ getCurrentUser: currentUser, checkUser, createUser, sendMagicLink, verifyMagicLinkWithCookies }));
  const login = await import("../app/routes/platform.login");
  const verify = await import("../app/routes/verify-email");
  const { normalizeAuthNextForApp, getAuthRedirectForApp } = await import("../app/lib/auth-return");
  const context = { cloudflare: { env: { BACKEND_BASE_URL: "https://api.mlai.au" } } } as any;
  function args(url: string) { return { request: new Request(url), context, params: {} } as any; }

  test("all untrusted admin return values resolve to the fixed operations origin", () => {
    for (const input of [undefined, "", "https://evil.example/path", "//evil.example", "/\\evil.example", "/%2f%2fevil.example", "/%252f%252fevil.example", "/hello#fragment", "/hello%23fragment", "/bad%0d%0aLocation:evil", " /reports", "/%", "/%25%32%66"]) {
      const next = normalizeAuthNextForApp("admin", input, { fallback: "/esafety/dashboard" });
      expect(next, input).toBe("/");
      expect(getAuthRedirectForApp("admin", next)).toBe("https://ops.mlai.au/");
    }
    const safe = "/reports?period=2026-09";
    expect(normalizeAuthNextForApp("admin", safe)).toBe(safe);
    expect(getAuthRedirectForApp("admin", safe)).toBe("https://ops.mlai.au" + safe);
    expect(normalizeAuthNextForApp("founder-tools", "/vibe-raising/create-update")).toBe("/founder-tools/updates/create");
  });

  test("admin login accepts logged-out users and rejects a role or superuser assertion without backend entitlement", async () => {
    currentUser.mockResolvedValue(null);
    expect(await login.loader(args("https://mlai.au/platform/login?app=admin"))).toEqual({ healthHackAccessDenied: false });
    for (const user of [{ is_superuser: true, role: "admin" }, { is_vibe_raising_admin: false }, { is_vibe_raising_admin: "true" }]) {
      currentUser.mockResolvedValue(user);
      expect(await login.loader(args("https://mlai.au/platform/login?app=admin&next=%2Freports"))).toMatchObject({ operationsAccessDenied: true });
    }
    currentUser.mockResolvedValue({ is_vibe_raising_admin: true });
    const response = await login.loader(args("https://mlai.au/platform/login?app=admin&next=%2Freports")) as Response;
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe("https://ops.mlai.au/reports");
  });

  test("admin account creation is rejected before any backend registration or email", async () => {
    createUser.mockClear(); sendMagicLink.mockClear(); checkUser.mockClear();
    const request = new Request("https://mlai.au/platform/login", { method: "POST", body: new URLSearchParams({ app: "admin", intent: "create", email: "fixture@example.com" }) });
    expect(await login.action({ request, context, params: {} } as any)).toEqual({ error: "MLAI Operations administrator access only." });
    expect(createUser).not.toHaveBeenCalled(); expect(sendMagicLink).not.toHaveBeenCalled(); expect(checkUser).not.toHaveBeenCalled();
  });

  test("backend admin check receives a safe relative path and nonexistent accounts cannot register", async () => {
    checkUser.mockClear(); sendMagicLink.mockClear();
    const request = () => new Request("https://mlai.au/platform/login", { method: "POST", body: new URLSearchParams({ app: "admin", intent: "check", email: "fixture@example.com", next: "//evil.example" }) });
    checkUser.mockResolvedValue({ user_exists: true });
    expect(await login.action({ request: request(), context, params: {} } as any)).toMatchObject({ sent: true });
    expect(checkUser.mock.calls[0][1]).toMatchObject({ app: "admin", next: "/" });
    expect(sendMagicLink.mock.calls[0][1]).toMatchObject({ app: "admin", next: "/" });
    checkUser.mockResolvedValue({ user_exists: false }); sendMagicLink.mockClear();
    expect(await login.action({ request: request(), context, params: {} } as any)).toEqual({ error: "MLAI Operations administrator access only." });
    expect(sendMagicLink).not.toHaveBeenCalled();
  });

  test("website verification forwards backend cookies and returns to ops only after successful admin verification", async () => {
    const response = await verify.loader(args("https://mlai.au/verify-email?app=admin&token=fixture&next=%2Freports")) as Response;
    expect(response.status).toBe(302);
    expect(response.headers.get("location")).toBe("https://ops.mlai.au/reports");
    expect(response.headers.get("set-cookie")).toContain("access_token=fixture");
    expect(verifyMagicLinkWithCookies.mock.calls.at(-1)?.[2]).toEqual({ app: "admin", next: "/reports" });
    verifyMagicLinkWithCookies.mockRejectedValueOnce({ message: "Forbidden", response: { status: 403 } });
    expect(await verify.loader(args("https://mlai.au/verify-email?app=admin&token=fixture&next=%2Freports"))).toMatchObject({ error: expect.any(String) });
  });
}
