import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";
import { useState } from "react";

import type { VibeMarketingRunSummary } from "~/types/vibe-marketing";

type SurfaceCandidate = {
  key: string;
  group: string;
  kind: string;
  path: string;
  route: string;
  systemType: string;
  confidence: number | null;
};

function asRecord(value: unknown): Record<string, unknown> {
  return value && typeof value === "object" && !Array.isArray(value) ? (value as Record<string, unknown>) : {};
}

function asString(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item ?? "").trim()).filter(Boolean);
}

function resultValue(run: VibeMarketingRunSummary, key: string): unknown {
  if (run.result?.[key] !== undefined) return run.result[key];
  const nested = asRecord(run.result?.result);
  return nested[key];
}

function resultRecord(run: VibeMarketingRunSummary, key: string): Record<string, unknown> {
  return asRecord(resultValue(run, key));
}

function routeFromPath(path: string) {
  if (!path) return "";
  if (path.startsWith("/")) return path;
  if (/^https?:\/\//i.test(path)) {
    try {
      const url = new URL(path);
      return url.pathname || "/";
    } catch {
      return "";
    }
  }
  return "";
}

function candidateFromRaw(raw: unknown, index: number): SurfaceCandidate | null {
  const payload = asRecord(raw);
  const metadata = asRecord(payload.metadata);
  const path = asString(payload.path_or_locator) || asString(payload.path) || asString(payload.file);
  const route =
    asString(metadata.route_path) ||
    asString(metadata.listing_route) ||
    asString(metadata.route_template) ||
    asString(payload.route_template) ||
    routeFromPath(path);
  if (!path && !route) return null;
  const confidenceValue = payload.confidence;
  const confidence = typeof confidenceValue === "number" && Number.isFinite(confidenceValue) ? confidenceValue : null;
  return {
    key: `${path || route}-${index}`,
    group: asString(payload.candidate_group) || asString(payload.kind) || "candidate",
    kind: asString(payload.kind),
    path,
    route,
    systemType: asString(payload.system_type),
    confidence,
  };
}

function articleSurfaceCandidates(run: VibeMarketingRunSummary): SurfaceCandidate[] {
  const rawCandidates =
    resultValue(run, "detected_candidates") ||
    resultRecord(run, "article_system_readiness").detected_candidates ||
    resultRecord(run, "scaffold_plan").detected_candidates;
  const candidates = Array.isArray(rawCandidates) ? rawCandidates.map(candidateFromRaw).filter((item): item is SurfaceCandidate => Boolean(item)) : [];
  const matched = candidateFromRaw(resultValue(run, "matched_article_surface"), -1);
  const merged = matched ? [matched, ...candidates] : candidates;
  const seen = new Set<string>();
  return merged.filter((candidate) => {
    const key = `${candidate.path}::${candidate.route}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function supportFiles(run: VibeMarketingRunSummary) {
  const readiness = resultRecord(run, "article_system_readiness");
  const setup = resultRecord(run, "article_system_setup");
  const scaffoldPlan = resultRecord(run, "scaffold_plan");
  const readinessRequired = asStringList(readiness.required_support_files);
  const scaffoldRequired = asStringList(scaffoldPlan.required_support_files);
  const required = readinessRequired.length ? readinessRequired : scaffoldRequired;
  const missing =
    asStringList(readiness.missing_support_files).length
      ? asStringList(readiness.missing_support_files)
      : asStringList(setup.missing_support_files).length
        ? asStringList(setup.missing_support_files)
        : asStringList(scaffoldPlan.missing_support_files);
  const requiredSet = required.length ? required : missing;
  const missingSet = new Set(missing);
  return {
    required: requiredSet,
    missing,
    found: requiredSet.filter((path) => !missingSet.has(path)),
  };
}

function hintStatusTone(status: string) {
  if (status === "matched") return "border-emerald-200 bg-emerald-50 text-emerald-800";
  if (status === "unmatched" || status === "invalid") return "border-red-200 bg-red-50 text-red-800";
  return "border-gray-200 bg-gray-50 text-gray-700";
}

function isSelectablePublicRoute(route: string) {
  return Boolean(route && route.startsWith("/") && !/[{[]/.test(route));
}

function candidateLabel(candidate: SurfaceCandidate) {
  if (candidate.route && candidate.path && candidate.path !== candidate.route) return `${candidate.route} - ${candidate.path}`;
  return candidate.route || candidate.path;
}

export default function ArticleSystemSurfaceSummary({
  run,
  selectable = false,
  fieldName = "articleSurfaceUrl",
  selectionValue,
  manualValue,
  onSelectionValueChange,
  onManualValueChange,
}: {
  run: VibeMarketingRunSummary;
  selectable?: boolean;
  fieldName?: string;
  selectionValue?: string;
  manualValue?: string;
  onSelectionValueChange?: (value: string) => void;
  onManualValueChange?: (value: string) => void;
}) {
  const candidates = articleSurfaceCandidates(run);
  const files = supportFiles(run);
  const hintStatus = asString(resultValue(run, "article_surface_hint_status")) || "ignored";
  const hint = resultRecord(run, "article_surface_hint");
  const readiness = resultRecord(run, "article_system_readiness");
  const setup = resultRecord(run, "article_system_setup");
  const readinessStatus = asString(readiness.status) || asString(setup.status);
  const reason = asString(readiness.reason) || asString(resultValue(run, "scaffold_reason"));
  const publicRouteCandidates = candidates.filter((candidate) => isSelectablePublicRoute(candidate.route));
  const fileOnlyCandidates = candidates.filter((candidate) => !isSelectablePublicRoute(candidate.route));
  const [internalSelection, setInternalSelection] = useState("");
  const [internalManualValue, setInternalManualValue] = useState("");
  const selectedRoute = selectionValue ?? internalSelection;
  const pastedRoute = manualValue ?? internalManualValue;
  const submittedRoute = pastedRoute.trim() || selectedRoute;
  const selectedCandidate = publicRouteCandidates.find((candidate) => candidate.route === selectedRoute);
  const updateSelection = (value: string) => {
    onSelectionValueChange?.(value);
    if (selectionValue === undefined) setInternalSelection(value);
    onManualValueChange?.("");
    if (manualValue === undefined) setInternalManualValue("");
  };
  const updateManualValue = (value: string) => {
    onManualValueChange?.(value);
    if (manualValue === undefined) setInternalManualValue(value);
    if (value.trim()) {
      onSelectionValueChange?.("");
      if (selectionValue === undefined) setInternalSelection("");
    }
  };

  if (!candidates.length && !files.required.length && hintStatus === "ignored" && !readinessStatus) {
    return null;
  }

  if (selectable) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-4">
        <input type="hidden" name={fieldName} value={submittedRoute} />
        <div>
          <h2 className="text-base font-black text-slate-950">Choose where articles live</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-slate-500">
            Select a public page found during the read-only scan, or paste the articles/blog URL yourself.
          </p>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-800">Choose the articles or blog page we found</span>
            <select
              value={selectedRoute}
              onChange={(event) => updateSelection(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            >
              <option value="">Select a found route</option>
              {publicRouteCandidates.map((candidate) => (
                <option key={candidate.key} value={candidate.route}>
                  {candidateLabel(candidate)}
                </option>
              ))}
            </select>
            {!publicRouteCandidates.length ? (
              <span className="mt-2 block text-xs font-semibold text-slate-500">
                We did not find a clean public articles route. Paste the URL/path, or create a new articles directory below.
              </span>
            ) : null}
          </label>

          <label className="block">
            <span className="mb-2 block text-sm font-black text-slate-800">Or paste the articles/blog URL or path</span>
            <input
              value={pastedRoute}
              onChange={(event) => updateManualValue(event.target.value)}
              placeholder="https://example.com/articles or /articles"
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 outline-none transition focus:border-violet-500 focus:ring-4 focus:ring-violet-500/10"
            />
            <span className="mt-2 block text-xs font-semibold text-slate-500">Use this if the right route is not in the dropdown.</span>
          </label>
        </div>

        {selectedCandidate?.path && selectedCandidate.path !== selectedCandidate.route ? (
          <div className="mt-4 rounded-xl bg-slate-50 px-4 py-3">
            <p className="text-xs font-black uppercase tracking-wide text-slate-400">Repo evidence</p>
            <p className="mt-1 break-all text-sm font-semibold text-slate-700">{selectedCandidate.path}</p>
          </div>
        ) : null}

        {fileOnlyCandidates.length ? (
          <details className="mt-4 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
            <summary className="cursor-pointer text-sm font-black text-slate-800">Pages found without a public URL</summary>
            <div className="mt-3 space-y-2">
              {fileOnlyCandidates.map((candidate) => (
                <div key={candidate.key} className="rounded-lg bg-white px-3 py-2 text-xs font-semibold text-slate-600">
                  <p className="break-all font-black text-slate-800">{candidate.path || candidate.route}</p>
                  {candidate.group ? <p className="mt-1 uppercase tracking-wide text-slate-400">{candidate.group.replace(/_/g, " ")}</p> : null}
                </div>
              ))}
            </div>
          </details>
        ) : null}

        <details className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
          <summary className="cursor-pointer text-sm font-black text-slate-800">Technical scan details</summary>
          <div className="mt-3 space-y-3 text-sm font-semibold text-slate-600">
            {asString(hint.route_path) ? <p>User hint: <span className="font-black text-slate-900">{asString(hint.route_path)}</span></p> : null}
            <p>Hint status: <span className="font-black text-slate-900">{hintStatus.replace(/_/g, " ")}</span></p>
            {reason ? <p className="rounded-lg bg-amber-50 px-3 py-2 text-amber-900">{reason}</p> : null}
          </div>
        </details>
      </section>
    );
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-black text-gray-950">Article surface scan</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-gray-600">
            Review the scanner findings if you need to audit the route or setup files.
          </p>
        </div>
        <span className={clsx("inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase", hintStatusTone(hintStatus))}>
          Hint {hintStatus.replace(/_/g, " ")}
        </span>
      </div>

      <p className="mt-3 rounded-lg bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-600">
        {candidates.length
          ? `${candidates.length} possible article surface${candidates.length === 1 ? "" : "s"} found.`
          : "No public article surface candidates were confirmed."}
      </p>

      <details className="mt-4 rounded-xl border border-slate-200 bg-white px-4 py-3">
        <summary className="cursor-pointer text-sm font-black text-slate-800">Technical scan details</summary>
        <div className="mt-4 space-y-4">
          {asString(hint.route_path) ? (
            <p className="rounded-lg bg-gray-50 px-3 py-2 text-xs font-bold text-gray-600">
              User hint: <span className="text-gray-950">{asString(hint.route_path)}</span>
            </p>
          ) : null}

          {reason ? (
            <div className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
              {reason}
            </div>
          ) : null}

          {candidates.length ? (
            <div className="grid gap-3 lg:grid-cols-2">
              {candidates.map((candidate) => (
                <div key={candidate.key} className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="text-sm font-black text-gray-950">{candidate.route || candidate.path}</p>
                      <p className="mt-1 text-xs font-bold uppercase tracking-wide text-gray-400">{candidate.group.replace(/_/g, " ")}</p>
                    </div>
                    {candidate.confidence !== null ? (
                      <span className="rounded-full bg-violet-50 px-2 py-1 text-[11px] font-black text-violet-700">
                        {Math.round(candidate.confidence * 100)}%
                      </span>
                    ) : null}
                  </div>
                  {candidate.path && candidate.path !== candidate.route ? (
                    <p className="mt-3 break-all rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-600">{candidate.path}</p>
                  ) : null}
                  <div className="mt-3 flex flex-wrap gap-2 text-[11px] font-black uppercase tracking-wide text-gray-500">
                    {candidate.kind ? <span className="rounded-full bg-gray-100 px-2 py-1">{candidate.kind}</span> : null}
                    {candidate.systemType ? <span className="rounded-full bg-gray-100 px-2 py-1">{candidate.systemType}</span> : null}
                    <span className="rounded-full bg-emerald-50 px-2 py-1 text-emerald-700">Patch only if confirmed safe</span>
                  </div>
                </div>
              ))}
            </div>
          ) : null}

          {files.required.length ? (
            <div className="grid gap-3 lg:grid-cols-2">
              <div className="rounded-xl border border-emerald-100 bg-emerald-50 p-4">
                <div className="flex items-center gap-2 text-sm font-black text-emerald-900">
                  <CheckCircleIcon className="h-4 w-4" />
                  Support files found
                </div>
                <p className="mt-2 text-xs font-semibold leading-5 text-emerald-800">
                  {files.found.length ? files.found.join(", ") : "None confirmed yet"}
                </p>
              </div>
              <div className="rounded-xl border border-amber-100 bg-amber-50 p-4">
                <div className="flex items-center gap-2 text-sm font-black text-amber-900">
                  <ExclamationTriangleIcon className="h-4 w-4" />
                  Missing or planned files
                </div>
                <p className="mt-2 text-xs font-semibold leading-5 text-amber-800">
                  {files.missing.length ? files.missing.join(", ") : "No missing support files detected"}
                </p>
              </div>
            </div>
          ) : null}
        </div>
      </details>
    </section>
  );
}
