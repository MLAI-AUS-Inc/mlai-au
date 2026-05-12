import { CheckCircleIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { clsx } from "clsx";

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

export default function ArticleSystemSurfaceSummary({
  run,
  selectable = false,
  fieldName = "articleSurfaceUrl",
}: {
  run: VibeMarketingRunSummary;
  selectable?: boolean;
  fieldName?: string;
}) {
  const candidates = articleSurfaceCandidates(run);
  const files = supportFiles(run);
  const hintStatus = asString(resultValue(run, "article_surface_hint_status")) || "ignored";
  const hint = resultRecord(run, "article_surface_hint");
  const readiness = resultRecord(run, "article_system_readiness");
  const setup = resultRecord(run, "article_system_setup");
  const readinessStatus = asString(readiness.status) || asString(setup.status);
  const reason = asString(readiness.reason) || asString(resultValue(run, "scaffold_reason"));

  if (!candidates.length && !files.required.length && hintStatus === "ignored" && !readinessStatus) {
    return null;
  }

  return (
    <section className="rounded-xl border border-gray-200 bg-white p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-base font-black text-gray-950">Article surface scan</h2>
          <p className="mt-1 text-sm font-semibold leading-6 text-gray-600">
            Confirm the public route and repo files Content Factory will use before setup patches are approved.
          </p>
        </div>
        <span className={clsx("inline-flex rounded-full border px-3 py-1 text-xs font-black uppercase", hintStatusTone(hintStatus))}>
          Hint {hintStatus.replace(/_/g, " ")}
        </span>
      </div>

      {asString(hint.route_path) ? (
        <p className="mt-3 rounded-lg bg-gray-50 px-3 py-2 text-xs font-bold text-gray-600">
          User hint: <span className="text-gray-950">{asString(hint.route_path)}</span>
        </p>
      ) : null}

      {reason ? (
        <div className="mt-3 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-sm font-semibold text-amber-900">
          {reason}
        </div>
      ) : null}

      {candidates.length ? (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
          {candidates.map((candidate, index) => {
            const selectableValue = candidate.route || candidate.path;
            const content = (
              <>
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
              </>
            );
            return selectable && selectableValue ? (
              <label key={candidate.key} className="block cursor-pointer rounded-xl border border-gray-200 bg-white p-4 transition hover:border-violet-200 hover:bg-violet-50/40">
                <div className="flex gap-3">
                  <input
                    type="radio"
                    name={fieldName}
                    value={selectableValue}
                    defaultChecked={index === 0}
                    className="mt-1 h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-500"
                  />
                  <div className="min-w-0 flex-1">{content}</div>
                </div>
              </label>
            ) : (
              <div key={candidate.key} className="rounded-xl border border-gray-200 bg-white p-4">
                {content}
              </div>
            );
          })}
        </div>
      ) : null}

      {files.required.length ? (
        <div className="mt-4 grid gap-3 lg:grid-cols-2">
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
    </section>
  );
}
