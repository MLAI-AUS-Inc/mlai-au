import {
  ArrowTopRightOnSquareIcon,
  CodeBracketSquareIcon,
  DocumentTextIcon,
  PhotoIcon,
} from "@heroicons/react/24/outline";
import type { VibeMarketingPublishEvidence, VibeMarketingRunSummary } from "~/types/vibe-marketing";

interface MarketingEvidencePanelProps {
  run?: VibeMarketingRunSummary | null;
  evidence?: VibeMarketingPublishEvidence | null;
}

function asList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.map((item) => String(item ?? "").trim()).filter(Boolean);
}

export default function MarketingEvidencePanel({
  run,
  evidence,
}: MarketingEvidencePanelProps) {
  const previewUrl = run?.previewUrl ?? evidence?.previewUrl;
  const prUrl = run?.prUrl ?? evidence?.prUrl;
  const routePath = run?.routePath ?? evidence?.routePath;
  const changedFiles = asList(evidence?.changedFiles ?? run?.result?.["changed_files"] ?? run?.result?.["files"]);
  const screenshots = asList(evidence?.screenshots ?? run?.result?.["screenshots"]);
  const warnings = evidence?.warnings ?? run?.warnings ?? [];
  const contentPackage = run?.contentPackage ?? evidence?.contentPackage;
  const artifactEntries = Object.entries(contentPackage?.artifactPaths ?? {});

  return (
    <aside className="space-y-4">
      {contentPackage?.contentPackaged ? (
        <div className="rounded-xl border border-emerald-100 bg-white p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5 text-emerald-600" />
            <h2 className="text-sm font-black text-gray-950">Content package</h2>
          </div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="rounded-lg bg-emerald-50 px-3 py-2">
              <p className="font-black text-emerald-950">{contentPackage.title ?? contentPackage.slug ?? "Generated article"}</p>
              {contentPackage.targetKeyword ? <p className="mt-1 text-xs font-bold text-emerald-700">{contentPackage.targetKeyword}</p> : null}
            </div>
            <div className="grid grid-cols-3 gap-2 text-center text-xs font-black text-gray-700">
              <div className="rounded-lg bg-gray-50 px-2 py-2">
                <p>{contentPackage.heroImagePresent ? "Yes" : "No"}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">Hero</p>
              </div>
              <div className="rounded-lg bg-gray-50 px-2 py-2">
                <p>{contentPackage.generatedInlineImageCount ?? 0}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">Inline</p>
              </div>
              <div className="rounded-lg bg-gray-50 px-2 py-2">
                <p>{contentPackage.imageErrorCount ?? 0}</p>
                <p className="mt-1 text-[10px] uppercase tracking-wide text-gray-400">Errors</p>
              </div>
            </div>
            {artifactEntries.length > 0 ? (
              <ul className="space-y-2">
                {artifactEntries.slice(0, 6).map(([name, path]) => (
                  <li key={name} className="rounded-lg bg-gray-50 px-3 py-2">
                    <p className="text-xs font-black text-gray-700">{name}</p>
                    <p className="mt-1 break-all font-mono text-[11px] text-gray-500">{path}</p>
                  </li>
                ))}
              </ul>
            ) : null}
          </div>
        </div>
      ) : null}

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <DocumentTextIcon className="h-5 w-5 text-violet-600" />
          <h2 className="text-sm font-black text-gray-950">Publish evidence</h2>
        </div>

        <div className="mt-4 space-y-3 text-sm">
          {previewUrl ? (
            <a href={previewUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 px-3 py-2 font-bold text-violet-700 hover:bg-violet-50">
              Preview URL
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          ) : (
            <p className="rounded-lg bg-gray-50 px-3 py-2 font-semibold text-gray-500">No preview URL yet</p>
          )}

          {prUrl ? (
            <a href={prUrl} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3 rounded-lg border border-gray-100 px-3 py-2 font-bold text-violet-700 hover:bg-violet-50">
              Pull request
              <ArrowTopRightOnSquareIcon className="h-4 w-4" />
            </a>
          ) : (
            <p className="rounded-lg bg-gray-50 px-3 py-2 font-semibold text-gray-500">No pull request yet</p>
          )}

          {routePath ? (
            <div className="rounded-lg border border-gray-100 px-3 py-2">
              <p className="text-xs font-bold uppercase tracking-wide text-gray-400">Route</p>
              <p className="mt-1 break-all font-mono text-xs text-gray-800">{routePath}</p>
            </div>
          ) : null}
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <CodeBracketSquareIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-sm font-black text-gray-950">Changed files</h2>
        </div>
        {changedFiles.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {changedFiles.slice(0, 8).map((file) => (
              <li key={file} className="break-all rounded-lg bg-gray-50 px-3 py-2 font-mono text-xs text-gray-700">
                {file}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm font-medium text-gray-500">No changed files reported yet.</p>
        )}
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
        <div className="flex items-center gap-2">
          <PhotoIcon className="h-5 w-5 text-gray-500" />
          <h2 className="text-sm font-black text-gray-950">Screenshots</h2>
        </div>
        {screenshots.length > 0 ? (
          <ul className="mt-3 space-y-2">
            {screenshots.slice(0, 4).map((screenshot) => (
              <li key={screenshot} className="break-all rounded-lg bg-gray-50 px-3 py-2 text-xs font-semibold text-gray-700">
                {screenshot}
              </li>
            ))}
          </ul>
        ) : (
          <p className="mt-3 text-sm font-medium text-gray-500">No screenshots reported yet.</p>
        )}
      </div>

      {warnings.length > 0 ? (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-800">
          <p className="font-black">Warnings</p>
          <ul className="mt-2 space-y-1">
            {warnings.slice(0, 4).map((warning) => (
              <li key={warning}>{warning}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </aside>
  );
}
