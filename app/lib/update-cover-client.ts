import { requestBrowserJson } from "~/lib/vibe-raising";
import { coverFileError, normalizeUpdateCover } from "~/lib/update-cover";
import type { VibeRaisingUpdateCover } from "~/types/vibe-raising";

const path = (operation: string, companyId: string) => `/api/v1/vibe-raising/updates/covers/${operation}/?company_id=${encodeURIComponent(companyId)}`;

export async function uploadUpdateCover(backend: string, companyId: string, file: File, signal: AbortSignal): Promise<VibeRaisingUpdateCover> {
  const error = coverFileError(file);
  if (error) throw new Error(error);
  const body = new FormData();
  body.append("image", file);
  const result = await requestBrowserJson<{ coverImage: unknown }>(backend, path("upload", companyId), { method: "POST", body, signal });
  const cover = normalizeUpdateCover(result.coverImage);
  if (!cover?.assetToken) throw new Error("The upload didn't finish. Please try again.");
  return cover;
}

export async function startUpdateCover(backend: string, companyId: string, updateText: string, direction: string, signal: AbortSignal): Promise<string> {
  const result = await requestBrowserJson<{ jobToken: string }>(backend, path("generate", companyId), {
    method: "POST", body: JSON.stringify({ requestId: crypto.randomUUID(), updateText, direction }), signal,
  });
  if (!result.jobToken) throw new Error("The image request didn't start. Please try again.");
  return result.jobToken;
}

function pause(signal: AbortSignal) {
  return new Promise<void>((resolve, reject) => {
    const abort = () => { clearTimeout(timer); reject(new DOMException("Aborted", "AbortError")); };
    const timer = setTimeout(() => { signal.removeEventListener("abort", abort); resolve(); }, 4000);
    if (signal.aborted) abort();
    else signal.addEventListener("abort", abort, { once: true });
  });
}

export async function waitForUpdateCover(backend: string, companyId: string, jobToken: string, signal: AbortSignal): Promise<VibeRaisingUpdateCover> {
  const deadline = Date.now() + 8 * 60 * 1000;
  let failures = 0;
  while (Date.now() < deadline) {
    signal.throwIfAborted();
    try {
      const result = await requestBrowserJson<{ status: string; coverImage?: unknown; detail?: string }>(backend, path("status", companyId), {
        method: "POST", body: JSON.stringify({ jobToken }), signal,
      });
      signal.throwIfAborted();
      failures = 0;
      if (result.status === "ready") {
        const cover = normalizeUpdateCover(result.coverImage);
        if (!cover?.assetToken) throw new Error("The image couldn't be saved. Please try again.");
        return cover;
      }
      if (result.status === "failed") throw new Error(result.detail || "The image could not be created. Please try again.");
    } catch (error) {
      signal.throwIfAborted();
      const status = (error as { status?: number }).status;
      if (!status || status < 500 || ++failures > 2) throw error;
    }
    await pause(signal);
  }
  throw new Error("This image is taking longer than expected. Try again later, or upload a cover.");
}
