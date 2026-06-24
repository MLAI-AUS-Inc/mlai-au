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
