import { useEffect, useId, useRef, useState } from "react";
import { ArrowPathIcon, ArrowUpTrayIcon, CheckIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { coverFileError, normalizeUpdateCover, DEFAULT_UPDATE_COVER_URL, DEFAULT_UPDATE_COVER_ALT } from "~/lib/update-cover";
import { startUpdateCover, uploadUpdateCover, waitForUpdateCover } from "~/lib/update-cover-client";
import type { VibeRaisingUpdateCover } from "~/types/vibe-raising";

interface Props {
  backendBaseUrl: string;
  companyId: string;
  /** Remount this component when the startup or individual update changes. */
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
    // The parent keys this editor by user, company and individual update.
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
    <section className="gallery-cover-editor" aria-labelledby={`${id}-title`}>
      <h2 id={`${id}-title`}>{displayed ? "Cover image" : "Default cover"}</h2>
      <div
        className="gallery-cover-preview"
        data-dragging={dragging}
        onDragOver={event => { event.preventDefault(); if (!busy) setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={event => { event.preventDefault(); setDragging(false); void upload(event.dataTransfer.files[0]); }}
      >
        <img src={displayed?.url || DEFAULT_UPDATE_COVER_URL} alt={displayed ? displayed.alt || "Update cover image" : DEFAULT_UPDATE_COVER_ALT}
          width={800} height={1000} />
        {busy && <div className="gallery-cover-busy" role="status">
          <ArrowPathIcon className="h-5 w-5 motion-safe:animate-spin" />
          <span>{state === "generating" ? "Creating your cover…" : "Adding your cover…"}</span>
          <small>You can keep writing.</small>
        </div>}
        {candidate && !busy && <span className="gallery-cover-badge">Preview · not selected yet</span>}
      </div>
      <input ref={fileInput} id={`${id}-file`} type="file" aria-label="Choose a cover image file"
        accept="image/jpeg,image/png,image/webp" className="sr-only" tabIndex={-1}
        onChange={event => { void upload(event.target.files?.[0]); event.target.value = ""; }} />
      {candidate ? <div className="gallery-cover-candidate">
        <button type="button" className="update-button" disabled={busy}
          onClick={() => { onChange(candidate); setCandidate(null); remember(null); }}><CheckIcon className="h-4 w-4" />Use this image</button>
        <button type="button" className="gallery-text-button" disabled={busy}
          onClick={() => { setCandidate(null); remember(null); }}>Discard</button>
      </div> : <button type="button" className="gallery-cover-upload" disabled={busy || !companyId}
        onClick={() => fileInput.current?.click()}><ArrowUpTrayIcon className="h-4 w-4" />{value ? "Replace image" : "Upload image"}</button>}
      <button type="button" className="gallery-cover-generate" disabled={busy || !canGenerate}
        aria-describedby={`${id}-generation-help`} onClick={() => void generate()}>
        {state === "generating" ? "Creating your image…" : candidate || value ? "Generate another image" : "Generate image"}
      </button>
      <p id={`${id}-generation-help`} className="gallery-cover-help">
        {canGenerate ? "Create abstract artwork inspired by your update." : "Create your draft first to generate a cover from your story."}
      </p>
      <details className="gallery-cover-direction">
        <summary>Art direction <span>Optional</span></summary>
        <label htmlFor={`${id}-direction`} className="sr-only">A colour, mood or something to include</label>
        <input id={`${id}-direction`} value={direction} onChange={event => setDirection(event.target.value)}
          maxLength={600} disabled={busy} placeholder="A colour, mood or idea…" />
      </details>
      {value && !candidate && !busy && <button type="button" className="gallery-cover-reset" onClick={() => onChange(null)}>
        <XMarkIcon className="h-3.5 w-3.5" />Use default cover
      </button>}
      {error && <p role="alert" className="gallery-cover-error">{error}</p>}
    </section>
  );
}
