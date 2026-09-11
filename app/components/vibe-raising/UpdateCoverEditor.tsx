import { useEffect, useId, useRef, useState } from "react";
import { ArrowPathIcon, ArrowUpTrayIcon, CheckIcon, PhotoIcon, SparklesIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { coverFileError, normalizeUpdateCover } from "~/lib/update-cover";
import { startUpdateCover, uploadUpdateCover, waitForUpdateCover } from "~/lib/update-cover-client";
import type { VibeRaisingUpdateCover } from "~/types/vibe-raising";

interface Props {
  backendBaseUrl: string;
  companyId: string;
  /** Remount this component when the startup or reporting period changes. */
  scopeKey: string;
  updateText: string;
  value: VibeRaisingUpdateCover | null;
  onChange: (cover: VibeRaisingUpdateCover | null) => void;
}

export default function UpdateCoverEditor({ backendBaseUrl, companyId, scopeKey, updateText, value, onChange }: Props) {
  const id = useId();
  const fileInput = useRef<HTMLInputElement>(null);
  const request = useRef<AbortController | null>(null);
  const [candidate, setCandidate] = useState<VibeRaisingUpdateCover | null>(null);
  const [state, setState] = useState<"idle" | "uploading" | "generating">("idle");
  const [error, setError] = useState<string | null>(null);
  const [direction, setDirection] = useState("");
  const [dragging, setDragging] = useState(false);
  const storageKey = `update-cover:${scopeKey}`;
  const busy = state !== "idle";
  const displayed = candidate || value;
  const canGenerate = updateText.trim().length >= 30 && Boolean(companyId);

  const remember = (data: unknown) => {
    try {
      if (data === null) sessionStorage.removeItem(storageKey);
      else sessionStorage.setItem(storageKey, JSON.stringify(data));
    } catch { /* The editor still works when session storage is unavailable. */ }
  };

  async function finishGeneration(job: string, controller: AbortController) {
    const cover = await waitForUpdateCover(backendBaseUrl, companyId, job, controller.signal);
    if (controller.signal.aborted) return;
    setCandidate(cover);
    remember({ candidate: cover });
  }

  useEffect(() => {
    const controller = new AbortController();
    request.current = controller;
    try {
      const stored = JSON.parse(sessionStorage.getItem(storageKey) || "null");
      if (stored?.candidate) setCandidate(normalizeUpdateCover(stored.candidate));
      else if (stored?.job) {
        setState("generating");
        void finishGeneration(stored.job, controller).catch((err) => {
          if (!controller.signal.aborted) { setError(err.message); remember(null); }
        }).finally(() => { if (!controller.signal.aborted) setState("idle"); });
      }
    } catch { remember(null); }
    return () => { controller.abort(); request.current?.abort(); };
    // The parent keys this editor by user, company and reporting period.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [storageKey]);

  async function upload(file?: File) {
    if (!file || busy) return;
    const invalid = coverFileError(file);
    if (invalid) { setError(invalid); return; }
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setState("uploading"); setError(null);
    try {
      const cover = await uploadUpdateCover(backendBaseUrl, companyId, file, controller.signal);
      if (controller.signal.aborted) return;
      onChange(cover); setCandidate(null); remember(null);
    } catch (err) {
      if (!controller.signal.aborted) setError((err as Error).message);
    } finally { if (!controller.signal.aborted) setState("idle"); }
  }

  async function generate() {
    if (busy || !canGenerate) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setState("generating"); setError(null); setCandidate(null);
    try {
      const job = await startUpdateCover(backendBaseUrl, companyId, updateText, direction, controller.signal);
      if (controller.signal.aborted) return;
      remember({ job });
      await finishGeneration(job, controller);
    } catch (err) {
      if (!controller.signal.aborted) { setError((err as Error).message); remember(null); }
    } finally { if (!controller.signal.aborted) setState("idle"); }
  }

  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-[var(--vr-color-border)] bg-white shadow-sm" aria-labelledby={`${id}-title`}>
      <div className="flex flex-wrap items-start justify-between gap-3 px-4 pt-4 sm:px-5 sm:pt-5">
        <div>
          <h2 id={`${id}-title`} className="text-base font-black text-[var(--vr-color-text)] sm:text-lg">Cover image</h2>
          <p className="mt-1 max-w-xl text-sm leading-6 text-slate-600">Add a photo or create artwork inspired by this update.</p>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-medium text-slate-500">Optional</span>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[minmax(0,0.85fr)_minmax(0,1.2fr)] sm:gap-5 sm:p-5 sm:items-start">
        <div
          className={`relative aspect-[16/9] overflow-hidden rounded-2xl border ${dragging ? "border-teal-600 ring-2 ring-teal-200" : "border-slate-200"} bg-[#f2eee6]`}
          onDragOver={(event) => { event.preventDefault(); if (!busy) setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={(event) => { event.preventDefault(); setDragging(false); void upload(event.dataTransfer.files[0]); }}
        >
          {displayed ? <img src={displayed.url} alt={displayed.alt || "Update cover preview"} className="h-full w-full object-cover" /> : (
            <div className="absolute inset-0 overflow-hidden bg-[radial-gradient(ellipse_at_20%_10%,#f6dfba,transparent_60%),linear-gradient(140deg,#e4efe6,#f2e6d6)]" aria-hidden="true">
              <div className="absolute -bottom-1/3 left-[12%] h-[125%] w-[43%] -rotate-[28deg] rounded-[48%] bg-[linear-gradient(130deg,#639d90,#b2c7a6)] shadow-[20px_10px_40px_#54796830]" />
              <div className="absolute -right-[5%] top-[18%] h-[90%] w-[57%] rotate-[-28deg] rounded-[50%] bg-[linear-gradient(140deg,#edbe8a,#d3855a)] shadow-[-12px_15px_25px_#905b3a20]" />
              <div className="absolute left-[42%] top-[20%] h-[32%] w-[18%] rounded-full bg-[linear-gradient(130deg,#fff6d7,#e6c77c)] shadow-[6px_10px_18px_#70573530]" />
              <span className="absolute bottom-4 left-4 rounded-full bg-white/85 px-3 py-1.5 text-[11px] font-medium text-slate-700 backdrop-blur">Cover preview</span>
            </div>
          )}
          {busy ? <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white/80 px-6 text-center backdrop-blur-sm" role="status">
            <SparklesIcon className="h-7 w-7 text-teal-700 motion-safe:animate-pulse" />
            <p className="text-sm font-semibold text-slate-900">{state === "generating" ? "Creating your cover…" : "Adding your cover…"}</p>
            <p className="text-xs leading-5 text-slate-600">{state === "generating" ? "This can take a few minutes. You can keep writing." : "Preparing your image."}</p>
          </div> : null}
          {displayed && !busy ? <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-slate-700 shadow-sm">{candidate ? "Preview · not selected yet" : "Your cover"}</span> : null}
        </div>

        <div className="min-w-0">
          <input ref={fileInput} id={`${id}-file`} type="file" aria-label="Choose a cover image file" accept="image/jpeg,image/png,image/webp" className="sr-only" tabIndex={-1} onChange={(event) => { void upload(event.target.files?.[0]); event.target.value = ""; }} />
          {candidate ? (
            <>
              <p className="text-base font-semibold text-slate-950">Made for this update</p>
              <p className="mb-4 mt-2 text-sm leading-6 text-slate-600">A slightly abstract take on your story. Choose it as your cover, or try a fresh direction.</p>
              <button type="button" disabled={busy} onClick={() => { onChange(candidate); setCandidate(null); remember(null); }} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--vr-palette-black)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700"><CheckIcon className="h-4 w-4" />Use this image</button>
              <button type="button" disabled={busy} onClick={() => { setCandidate(null); remember(null); }} className="ml-3 min-h-11 rounded-lg px-3 text-sm font-medium text-slate-600 hover:bg-slate-100">Discard</button>
            </>
          ) : (
            <>
              <button type="button" disabled={busy || !companyId} onClick={() => fileInput.current?.click()} className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm font-semibold text-slate-800 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:opacity-50"><ArrowUpTrayIcon className="h-4 w-4" />{value ? "Replace image" : "Upload a cover image"}</button>
              <p className="mt-2 text-xs text-slate-500">JPG, PNG or WebP · up to 10 MB</p>
            </>
          )}
          <button type="button" disabled={busy || !canGenerate} onClick={() => void generate()} aria-describedby={`${id}-generation-help`} className={`mt-3 flex min-h-11 w-full items-center justify-center gap-2 rounded-xl bg-[var(--vr-color-primary)] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[var(--vr-palette-black)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-700 disabled:opacity-50`}>
            {busy ? <ArrowPathIcon className="h-4 w-4 motion-safe:animate-spin" /> : <SparklesIcon className="h-4 w-4" />}
            {state === "generating" ? "Creating your image…" : candidate || value ? "Create me another image" : "Create me an image"}
          </button>
          <p id={`${id}-generation-help`} className="mt-2 text-xs leading-5 text-slate-500">{canGenerate ? "Abstract editorial artwork with GPT Image 2.5. Preview it before choosing." : "Add a few lines to your update first. We’ll use your story to inspire the image."}</p>
          <details className="mt-3 text-xs text-slate-600">
            <summary className="w-fit cursor-pointer rounded py-1 font-medium focus-visible:outline-2 focus-visible:outline-teal-700">Have a visual idea? <span className="font-normal text-slate-400">Optional</span></summary>
            <label htmlFor={`${id}-direction`} className="mt-3 block text-xs font-medium">A colour, mood or something to include</label>
            <input id={`${id}-direction`} value={direction} onChange={(event) => setDirection(event.target.value)} maxLength={600} disabled={busy} placeholder="Warm colours, connected shapes, a sense of discovery…" className="mt-2 min-h-11 w-full rounded-lg border border-slate-300 bg-white px-3 text-sm text-slate-800 focus:border-teal-700 focus:outline-none focus:ring-1 focus:ring-teal-700" />
          </details>
          {value && !candidate && !busy ? <button type="button" onClick={() => onChange(null)} className="mt-3 inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-slate-500 hover:bg-slate-100"><XMarkIcon className="h-3.5 w-3.5" />Remove cover</button> : null}
        </div>
      </div>
      {error ? <p role="alert" className="mx-4 mb-4 rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-800 sm:mx-5">{error}</p> : null}
      {!value && !candidate ? <p className="border-t border-slate-100 px-4 py-3 text-xs leading-5 text-slate-500 sm:px-5"><PhotoIcon className="mr-1.5 inline h-3.5 w-3.5" />No image? Your update will use a simple date cover.</p> : null}
    </section>
  );
}
