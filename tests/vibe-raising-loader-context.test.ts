import { describe, expect, mock, test } from "bun:test";
import type { AppLoadContext } from "react-router";

import {
  createRequestLocalLoader,
  requireFounderFromLoaderContext,
} from "../app/lib/vibe-raising-loader-context.server";

const request = (cookie: string) => new Request("https://mlai.au/founder-tools/marketing", {
  headers: { Cookie: cookie },
});
const context = () => ({} as AppLoadContext);

function redirectLocation(run: () => unknown) {
  try {
    run();
  } catch (error) {
    expect(error).toBeInstanceOf(Response);
    return (error as Response).headers.get("Location");
  }
  throw new Error("Expected a redirect");
}

describe("request-local founder context", () => {
  test("two matched loaders share one read, while another request keeps its own identity", async () => {
    let finish!: () => void;
    const pending = new Promise<void>((resolve) => { finish = resolve; });
    const load = mock(async (_context: AppLoadContext, incoming: Request) => {
      await pending;
      return incoming.headers.get("Cookie");
    });
    const read = createRequestLocalLoader(load);
    const founderRequest = request("session=founder-one");
    const otherRequest = request("session=founder-two");
    const founderContext = context();

    const shell = read(founderContext, founderRequest);
    const marketingPage = read(founderContext, founderRequest);
    const otherPage = read(context(), otherRequest);

    expect(shell).toBe(marketingPage);
    expect(load).toHaveBeenCalledTimes(2);
    finish();
    expect(await shell).toBe("session=founder-one");
    expect(await otherPage).toBe("session=founder-two");
  });

  test("a failed request is shared only within that request", async () => {
    const load = mock(async () => {
      if (load.mock.calls.length === 1) throw new Error("backend unavailable");
      return "ready";
    });
    const read = createRequestLocalLoader(load);
    const firstContext = context();

    await expect(read(firstContext, request("session=first"))).rejects.toThrow("backend unavailable");
    await expect(read(firstContext, request("session=first"))).rejects.toThrow("backend unavailable");
    expect(await read(context(), request("session=second"))).toBe("ready");
    expect(load).toHaveBeenCalledTimes(2);
  });

  test("keeps the existing login, incomplete-profile and role redirects", () => {
    const incoming = request("session=founder");
    type FounderContext = Parameters<typeof requireFounderFromLoaderContext>[0];
    const authUser = { id: 1, email: "founder@example.com" };
    const profile = { companies: [{ id: "company-1" }] };
    const appUser = { role: "founder", companies: [{ id: "company-1" }] };
    const asContext = (value: unknown) => value as FounderContext;

    expect(redirectLocation(() => requireFounderFromLoaderContext(asContext({ authUser: null, profile: null, appUser: null }), incoming)))
      .toContain("/platform/login?");
    expect(redirectLocation(() => requireFounderFromLoaderContext(asContext({ authUser, profile: null, appUser: null }), incoming)))
      .toBe("/founder-tools/updates");
    expect(redirectLocation(() => requireFounderFromLoaderContext(asContext({ authUser, profile, appUser: { ...appUser, role: "investor" } }), incoming)))
      .toBe("/founder-tools/updates");
    expect(requireFounderFromLoaderContext(asContext({ authUser, profile, appUser }), incoming).appUser)
      .toBe(appUser);
  });
});
