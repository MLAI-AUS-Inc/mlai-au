import { beforeAll, describe, expect, test } from "bun:test";

type Record = { name: string; status: number; headers: { [key: string]: string }; body: string; calls: { path: string; token: string; origin: string | null; cookie: string | null }[] };
let records: Record[];
const get = (name: string) => records.find(record => record.name === name)!;
const TOKEN = "A".repeat(43);
beforeAll(async () => {
  const child = Bun.spawn([process.execPath, "tests/fixtures/roo-link-document.tsx"], { stdout: "pipe", stderr: "pipe" });
  const [stdout, stderr, exit] = await Promise.all([new Response(child.stdout).text(), new Response(child.stderr).text(), child.exited]);
  expect({ exit, stderr }).toEqual({ exit: 0, stderr: "" });
  records = JSON.parse(stdout);
});

describe("Roo linking through React Router document requests", () => {
  test("clean confirmation keeps same-origin form provenance in both header and final root meta", () => {
    const response = get("confirmation");
    expect(response.status).toBe(200);
    expect(response.headers["referrer-policy"]).toBe("same-origin");
    const policies = [...response.body.matchAll(/<meta name="referrer" content="([^"]+)"/g)].map(match => match[1]);
    expect(policies.at(-1)).toBe("same-origin");
    expect(response.body).toContain('method="post"');
    expect(response.body).toContain("Link accounts");
    expect(response.body).not.toContain(TOKEN);
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.headers["content-security-policy"]).toContain("form-action 'self'");
  });
  test.each(["capture", "invalid-token"])("token-bearing %s redirect stays private and scrubs the URL", name => {
    const response = get(name);
    expect(response.status).toBe(302);
    expect(response.headers["referrer-policy"]).toBe("no-referrer");
    expect(response.headers["cache-control"]).toBe("no-store");
    expect(response.headers.location).not.toContain("token");
    expect(response.body).not.toContain(TOKEN);
    expect(response.calls).toEqual([]);
    if (name === "capture") {
      expect(response.headers.location).toBe("/founder-tools/link-roo");
      expect(response.headers["set-cookie"]).toContain("HttpOnly; SameSite=Lax; Secure");
    }
  });
  test("same-origin native document POST reaches completion and clears its capability", () => {
    const response = get("same-origin");
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/founder-tools/link-roo?status=linked");
    expect(response.headers["set-cookie"]).toContain("Max-Age=0");
    expect(response.calls).toEqual([{ path: "/api/v1/users/slack-founder-link/complete/", token: TOKEN, origin: "https://mlai.au", cookie: "access_token=fixture" }]);
  });
  test.each(["null-origin", "external-origin", "missing-origin"])("%s never reaches completion", name => {
    const response = get(name);
    expect(response.status).toBeGreaterThanOrEqual(400);
    // An action 403 can revalidate the read-only loader; it must never complete.
    expect(response.calls.filter(call => call.path.endsWith("/complete/"))).toEqual([]);
    expect(response.headers.location).toBeUndefined();
    expect(response.body).not.toContain(TOKEN);
  });
  test.each(["signed-out", "signed-out-submit"])("%s requires authentication without exposing the token", name => {
    const response = get(name);
    expect(response.status).toBe(302);
    expect(response.headers.location).toContain("/platform/login");
    expect(response.headers.location).not.toContain(TOKEN);
    expect(response.calls).toEqual([]);
  });
  test.each(["expired-preview", "expired-submit"])("%s returns the expired state and clears the cookie", name => {
    const response = get(name);
    expect(response.status).toBe(302);
    expect(response.headers.location).toBe("/founder-tools/link-roo?status=expired");
    expect(response.headers["set-cookie"]).toContain("Max-Age=0");
  });
  test("repeat submission and back navigation recover without reusing a cleared capability", () => {
    expect(get("repeat-submit").headers.location).toBe("/founder-tools/link-roo?status=already-linked");
    const back = get("back-after-cleared-cookie");
    expect(back.status).toBe(200);
    expect(back.body).toContain("This link is not valid");
    expect(back.body).not.toContain("Link accounts");
    expect(back.calls).toEqual([]);
    const repeat = get("repeat-after-cleared-cookie");
    expect(repeat.headers.location).toBe("/founder-tools/link-roo?status=invalid");
    expect(repeat.calls).toEqual([]);
  });
});
