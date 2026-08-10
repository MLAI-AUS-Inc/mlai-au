import { describe, expect, test } from "bun:test";

import { API_REQUEST_TIMEOUT_MS, axiosInstance, createApiClient } from "../app/lib/api";

// Regression: a hung backend call (e.g. a server-side reset action whose request
// never returns) used to leave the UI spinning forever because the axios clients
// had no timeout. Both the shared instance and the per-request SSR clients must
// be bounded so the call rejects and the action's catch can surface an error.
describe("api client request timeout", () => {
  test("a positive request timeout is configured", () => {
    expect(API_REQUEST_TIMEOUT_MS).toBeGreaterThan(0);
  });

  test("the shared axios instance is bounded", () => {
    expect(axiosInstance.defaults.timeout).toBe(API_REQUEST_TIMEOUT_MS);
  });

  test("per-request SSR clients are bounded too", () => {
    const client = createApiClient({} as unknown as Record<string, unknown>);
    expect(client.defaults.timeout).toBe(API_REQUEST_TIMEOUT_MS);
  });
});

// Root cause of the hung reset: under `nodejs_compat`, axios defaults to the Node
// http adapter, whose outbound-POST handling hangs in the Cloudflare Worker
// runtime (the request never reaches the origin). Forcing the fetch adapter makes
// SSR loaders + actions use the Worker-native fetch.
describe("api client uses the Worker-native fetch adapter", () => {
  test("the shared axios instance uses the fetch adapter", () => {
    expect(axiosInstance.defaults.adapter).toBe("fetch");
  });

  test("per-request SSR clients use the fetch adapter", () => {
    const client = createApiClient({} as unknown as Record<string, unknown>);
    expect(client.defaults.adapter).toBe("fetch");
  });
});

// Cookie-authenticated mutations are made server-side by the Cloudflare Worker.
// The backend requires the original browser Origin for its CSRF origin check, so
// the per-request client must preserve that header alongside the cookie.
describe("api client preserves cookie-authenticated mutation origin", () => {
  test("forwards the incoming Origin alongside the cookie", () => {
    const request = new Request("https://mlai.au/founder-tools/marketing/runs/run-1", {
      method: "POST",
      headers: {
        Cookie: "access_token=test-token",
        Origin: "https://mlai.au",
      },
    });

    const client = createApiClient({ BACKEND_BASE_URL: "https://api.mlai.au" }, request);

    expect(client.defaults.headers.Cookie).toBe("access_token=test-token");
    expect(client.defaults.headers.Origin).toBe("https://mlai.au");
  });

  test("does not invent an Origin when the incoming request omitted it", () => {
    const request = new Request("https://mlai.au/founder-tools/marketing/runs/run-1", {
      method: "POST",
      headers: { Cookie: "access_token=test-token" },
    });

    const client = createApiClient({ BACKEND_BASE_URL: "https://api.mlai.au" }, request);

    expect(client.defaults.headers.Cookie).toBe("access_token=test-token");
    expect(client.defaults.headers.Origin).toBeUndefined();
  });
});
