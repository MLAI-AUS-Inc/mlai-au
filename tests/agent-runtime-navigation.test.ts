import { afterEach, beforeEach, describe, expect, mock, test } from "bun:test";

const currentUser = mock(async (): Promise<{ id: number } | null> => ({ id: 7 }));
mock.module("../app/lib/env.server", () => ({ getEnv: () => ({ BACKEND_BASE_URL: "https://api.example" }) }));
mock.module("../app/lib/auth", () => ({ getCurrentUser: currentUser }));
const { loader } = await import("../app/routes/platform.agents");
const args = (url: string) => ({ request: new Request(url), context: {}, params: {} }) as never;
const previousGate = process.env.VITE_AGENT_RUNTIME_ENABLED;

describe("Connected agents account entry", () => {
  beforeEach(() => {
    process.env.VITE_AGENT_RUNTIME_ENABLED = "true";
    currentUser.mockClear();
    currentUser.mockImplementation(async () => ({ id: 7 }));
  });
  afterEach(() => {
    if (previousGate === undefined) delete process.env.VITE_AGENT_RUNTIME_ENABLED;
    else process.env.VITE_AGENT_RUNTIME_ENABLED = previousGate;
  });
  test("disabled rollout rejects before account lookup", async () => {
    process.env.VITE_AGENT_RUNTIME_ENABLED = "false";
    try { await loader(args("https://mlai.example/platform/agents")); throw Error("expected 404"); }
    catch (response) { expect((response as Response).status).toBe(404); }
    expect(currentUser).not.toHaveBeenCalled();
  });
  test("signed-in entry cannot redirect to caller's destination", async () => {
    const response = await loader(args("https://mlai.example/platform/agents?next=https://attacker.example&access_token=secret"));
    expect(response.headers.get("Location")).toBe("https://api.example/api/v1/agent-runtime/connected/");
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(currentUser.mock.calls[0]?.[2]).toEqual({ allowDevBypass: false });
  });
  test("OAuth handoff preserves protocol state but strips unknown secrets", async () => {
    const response = await loader(args("https://mlai.example/platform/agents?client_id=personal&state=abc&code_challenge=xyz&access_token=secret&next=https://attacker.example"));
    const target = new URL(response.headers.get("Location")!);
    expect(target.origin).toBe("https://api.example");
    expect(target.pathname).toBe("/api/v1/agent-runtime/oauth/authorize/");
    expect(target.searchParams.get("state")).toBe("abc");
    expect(target.searchParams.has("access_token")).toBe(false);
    expect(target.searchParams.has("next")).toBe(false);
  });
  test("sign-in returns only to the fixed internal route", async () => {
    currentUser.mockImplementation(async () => null);
    try { await loader(args("https://mlai.example/platform/agents?next=//attacker.example&access_token=secret")); throw Error("expected login"); }
    catch (response) { expect((response as Response).headers.get("Location")).toBe("/platform/login?next=%2Fplatform%2Fagents"); }
  });
});
