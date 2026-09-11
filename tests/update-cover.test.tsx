import { afterEach, describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import { coverFileError, coverUpdateText, normalizeUpdateCover, parseUpdateCoverForm } from "../app/lib/update-cover";
import { startUpdateCover, uploadUpdateCover, waitForUpdateCover } from "../app/lib/update-cover-client";
import { normalizeMonthlyUpdate } from "../app/lib/vibe-raising";
import UpdateCoverEditor from "../app/components/vibe-raising/UpdateCoverEditor";

const cover = { url: "https://storage.example/art.webp", source: "generated" as const, model: "gpt-image-2.5-flare", assetToken: "signed-by-server", width: 1536, height: 864 };
const originalFetch = globalThis.fetch;
afterEach(() => { globalThis.fetch = originalFetch; });
const respond = (body: unknown, status = 200) => new Response(JSON.stringify(body), { status, headers: { "Content-Type": "application/json" } });

describe("update cover contract", () => {
  it("accepts supported images and rejects SVG, oversized and empty uploads", () => {
    expect(coverFileError({ type: "image/png", size: 4000 })).toBeNull();
    for (const file of [{ type: "image/svg+xml", size: 100 }, { type: "image/jpeg", size: 11 * 1024 * 1024 }, { type: "image/webp", size: 0 }]) expect(coverFileError(file)).not.toBeNull();
  });
  it("preserves the server receipt and rejects temporary or unsafe URLs", () => {
    expect(parseUpdateCoverForm(JSON.stringify(cover))).toMatchObject(cover);
    for (const url of ["blob:local", "javascript:bad()", "//foreign.test/image", "data:image/png;base64,a"]) expect(normalizeUpdateCover({ ...cover, url })).toBeNull();
  });
  it("encodes explicit removal as null and loads covers in update responses", () => {
    expect(parseUpdateCoverForm("null")).toBeNull();
    const update = normalizeMonthlyUpdate({ id: 1, month: "June 2026", coverImage: cover });
    expect(update?.coverImageUrl).toBe(cover.url);
    expect(update?.coverImage?.assetToken).toBe(cover.assetToken);
  });
  it("uses update content rather than financial projections to inspire the image", () => {
    const text = coverUpdateText({ summary: "Teaching founders", highlights: "New programme delivered", challenges: "", learnings: "Smaller groups helped", next30Days: "" });
    expect(text).toContain("Teaching founders");
    expect(text).toContain("New programme delivered");
    expect(text).not.toContain("challenges:");
  });
  it("keeps every API request pinned to the initiating startup", async () => {
    const seen: string[] = [];
    globalThis.fetch = (async (url: string | URL | Request, init?: RequestInit) => {
      seen.push(String(url));
      expect(init?.credentials).toBe("include");
      if (String(url).includes("generate")) return respond({ jobToken: "signed-job" }, 202);
      return respond({ status: "ready", coverImage: cover });
    }) as typeof fetch;
    const signal = new AbortController().signal;
    const job = await startUpdateCover("https://backend.example", "company-a", "Our update has a substantial story.", "", signal);
    expect(await waitForUpdateCover("https://backend.example", "company-a", job, signal)).toMatchObject(cover);
    expect(seen).toHaveLength(2);
    expect(seen.every(url => url.endsWith("company_id=company-a"))).toBe(true);
  });
  it("uses multipart upload and retains signed asset metadata", async () => {
    globalThis.fetch = (async (_url: unknown, init?: RequestInit) => {
      expect(init?.body).toBeInstanceOf(FormData);
      expect((init?.body as FormData).get("image")).toBeInstanceOf(File);
      return respond({ coverImage: cover }, 201);
    }) as typeof fetch;
    expect(await uploadUpdateCover("https://backend.example", "company-a", new File(["bytes"], "image.png", { type: "image/png" }), new AbortController().signal)).toMatchObject(cover);
  });
  it("does not poll when a previous company's operation was cancelled", async () => {
    let calls = 0;
    globalThis.fetch = (async () => { calls++; return respond({ status: "ready", coverImage: cover }); }) as typeof fetch;
    const controller = new AbortController(); controller.abort();
    await expect(waitForUpdateCover("https://backend.example", "old-company", "job", controller.signal)).rejects.toThrow();
    expect(calls).toBe(0);
  });
  it("returns the provider failure as useful retry guidance", async () => {
    globalThis.fetch = (async () => respond({ status: "failed", detail: "Try another idea, or upload a cover." })) as typeof fetch;
    await expect(waitForUpdateCover("https://backend.example", "company-a", "job", new AbortController().signal)).rejects.toThrow("Try another idea");
  });
  it("renders an optional cover prompt and disables generation for an empty draft", () => {
    const html = renderToStaticMarkup(<UpdateCoverEditor backendBaseUrl="https://backend.example" companyId="1" scopeKey="1:2026-06" updateText="" value={null} onChange={() => {}} />);
    expect(html).toContain("Give your update a cover");
    expect(html).toContain("Optional");
    expect(html).toContain("Create me an image");
    expect(html).toContain("disabled=");
    expect(html).toContain("simple date cover");
  });
  it("shows the selected cover with replacement and removal controls", () => {
    const html = renderToStaticMarkup(<UpdateCoverEditor backendBaseUrl="https://backend.example" companyId="1" scopeKey="1:2026-06" updateText="New education programme delivered this month." value={cover} onChange={() => {}} />);
    expect(html).toContain(cover.url);
    expect(html).toContain("Replace image");
    expect(html).toContain("Remove cover");
  });
});
