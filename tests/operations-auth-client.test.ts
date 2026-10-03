import { expect, test } from "bun:test";

if (process.env.OPERATIONS_AUTH_CLIENT_CHILD !== "1") {
  test("real operations auth client preserves app context and backend denials", () => {
    const result = Bun.spawnSync([process.execPath, "test", import.meta.path], {
      cwd: process.cwd(), env: { ...process.env, OPERATIONS_AUTH_CLIENT_CHILD: "1" }, stdout: "pipe", stderr: "pipe",
    });
    expect(result.exitCode, result.stdout.toString() + result.stderr.toString()).toBe(0);
  });
} else {
  const { checkUser, sendMagicLink, verifyMagicLinkWithCookies } = await import("../app/lib/auth");
  test("check, email and verification use the admin context without inventing entitlement", async () => {
    const requests: { path: string; body?: any; query?: URLSearchParams }[] = [];
    const server = Bun.serve({ port: 0, fetch: async request => {
      const url = new URL(request.url);
      requests.push({ path: url.pathname, body: request.method === "POST" ? await request.json() : undefined, query: url.searchParams });
      if (url.pathname.includes("verify-magic-link")) return Response.json({ detail: "MLAI Operations administrator access only." }, { status: 403 });
      return Response.json({ user_exists: true, magic_link_sent: true });
    }});
    try {
      const env = { BACKEND_BASE_URL: server.url.origin } as Env;
      await checkUser(env, { email: "fixture@example.com", app: "admin", next: "/reports" });
      await sendMagicLink(env, { email: "fixture@example.com", app: "admin", next: "/reports" });
      expect(requests.slice(0, 2).map(row => row.body)).toEqual([
        { email: "fixture@example.com", app: "admin", next: "/reports" },
        { email: "fixture@example.com", app: "admin", next: "/reports" },
      ]);
      await expect(verifyMagicLinkWithCookies(env, "fixture", { app: "admin", next: "/reports" })).rejects.toMatchObject({ response: { status: 403 } });
      expect(requests[2].query?.get("app")).toBe("admin");
      expect(requests[2].query?.get("next")).toBe("/reports");
    } finally { await server.stop(true); }
  });
}
