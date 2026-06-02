import { useEffect, useRef, useState } from "react";
import {
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import JSZip from "jszip";
import { wattClasses, wattImages } from "~/lib/watt-theme";

// Same-origin worker proxy. It forwards the upload to the WTH admin eval cluster
// server-side (see routes/watt-the-hack.city-of-melbourne-advanced-submit-data.ts),
// so the admin origin/credentials are never exposed to the browser.
const SUBMIT_ENDPOINT = "/watt-the-hack/city-of-melbourne-advanced-submit-data";

const SCENARIOS = [
  { id: "duck_curve", name: "Level 1: The Duck Curve" },
  { id: "melbourne_cold_winter", name: "Level 2: Melbourne Cold Winter" },
  { id: "ai_grid_shock", name: "Level 3: AI Grid Shock" },
  { id: "operators_mandate", name: "Level 4: The Operator's Mandate" },
  { id: "cybersecurity_sandbox", name: "Level 5: Cybersecurity sandbox" },
  { id: "gauntlet", name: "Level 6: The Gauntlet" },
];

export default function WattTheHackSubmissionPortal() {
  const [teamId, setTeamId] = useState("");
  const [teamToken, setTeamToken] = useState("");
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  const [strategyName, setStrategyName] = useState("MyStrategy");
  const [controllerCode, setControllerCode] = useState(
    "class MyStrategy:\n    def step(self, observation):\n        pass\n"
  );
  const [requirements, setRequirements] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  // Set on a successful accept so the tracker below can poll status. Cleared
  // when the user changes the form, so a stale tracker never lingers.
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamId || !teamToken || !strategyName || !controllerCode) {
      setStatus("error");
      setMessage("Please fill in all required fields (Team ID, Token, Strategy Name, and Code).");
      return;
    }

    setIsSubmitting(true);
    setStatus("idle");
    setMessage("");
    setActiveSubmissionId(null);

    try {
      const zip = new JSZip();

      // 1. Add strategy.py
      zip.file("strategy.py", controllerCode);

      // 2. Add requirements.txt
      zip.file("requirements.txt", requirements);

      // 3. Add metadata.json
      const metadata = {
        strategy_name: strategyName,
        entrypoint: "strategy.py",
        class_name: strategyName, // Assuming the strategy name is the class name
        scenario_id: scenarioId,
      };
      zip.file("metadata.json", JSON.stringify(metadata, null, 2));

      // 4. Generate zip blob
      const zipBlob = await zip.generateAsync({ type: "blob" });

      // 5. Submit to Admin Server
      const formData = new FormData();
      formData.append("team_id", teamId);
      formData.append("file", zipBlob, "submission.zip");

      const res = await fetch(SUBMIT_ENDPOINT, {
        method: "POST",
        headers: {
          "X-Team-Token": teamToken,
        },
        body: formData,
      });

      if (!res.ok) {
        let errMessage = `Error ${res.status}: ${res.statusText}`;
        try {
          const errData = (await res.json()) as { detail?: string };
          errMessage = errData.detail || errMessage;
        } catch (e) {
          // ignore
        }
        throw new Error(errMessage);
      }

      const accepted = (await res.json().catch(() => ({}))) as {
        submission_id?: string;
        status?: string;
      };
      setStatus("success");
      setMessage(
        "Submission accepted — tracking evaluation below. The leaderboard will update automatically when it finishes.",
      );
      if (accepted.submission_id) setActiveSubmissionId(accepted.submission_id);
    } catch (err: any) {
      console.error(err);
      setStatus("error");
      setMessage(err.message || "Failed to submit. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Scenic backdrop (shared visual from the Watt The Hack marketing site). */}
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <img
          src={wattImages.submitBackdrop}
          alt=""
          className="h-full w-full object-cover object-center opacity-[0.32]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#f8f2e6]/78 via-[#f8f2e6]/45 to-[#f8f2e6]/82" />
      </div>

      <main className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col gap-6 px-4 py-8 sm:px-6 sm:py-12">
      <div className="relative overflow-hidden rounded-[1.5rem] shadow-xl">
        <div className="absolute inset-0 z-0">
          <img src={wattImages.hero} alt="" className="h-full w-full object-cover opacity-80" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#121e16] to-[#121e16]/20" />
        </div>
        <div className="relative z-10 flex flex-col gap-2 p-8 sm:p-12">
          <p className="text-sm font-black uppercase tracking-[0.28em] text-[#9fe870]">City of Melbourne Track</p>
          <h1 className="text-3xl font-black tracking-tight text-white sm:text-5xl">
            Submission Portal
          </h1>
          <p className="mt-2 text-lg text-white/90 max-w-2xl">
            Deploy your controller to the live evaluation cluster. Your code will be packed securely and evaluated against hidden test variants.
          </p>
        </div>
      </div>

      <div className={wattClasses.panelStrong + " p-6 sm:p-10"}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Credentials Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={wattClasses.label + " mb-2"}>Team ID</label>
              <input
                type="text"
                value={teamId}
                onChange={(e) => setTeamId(e.target.value)}
                placeholder="UUID"
                className={wattClasses.input}
                required
              />
            </div>
            <div>
              <label className={wattClasses.label + " mb-2"}>Team Token</label>
              <input
                type="password"
                value={teamToken}
                onChange={(e) => setTeamToken(e.target.value)}
                placeholder="••••••••••••"
                className={wattClasses.input}
                required
              />
            </div>
          </div>

          <hr className={wattClasses.divider} />

          {/* Configuration Section */}
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className={wattClasses.label + " mb-2"}>Target Scenario</label>
              <select
                value={scenarioId}
                onChange={(e) => setScenarioId(e.target.value)}
                className={wattClasses.input + " appearance-none"}
              >
                {SCENARIOS.map((sc) => (
                  <option key={sc.id} value={sc.id}>
                    {sc.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={wattClasses.label + " mb-2"}>Strategy Class Name</label>
              <input
                type="text"
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
                placeholder="MyStrategy"
                className={wattClasses.input}
                required
              />
            </div>
          </div>

          <hr className={wattClasses.divider} />

          {/* Code Section */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-2 flex items-center gap-2">
                <CodeBracketIcon className="h-5 w-5 text-[#354031]" />
                <label className={wattClasses.label}>Controller Code (strategy.py)</label>
              </div>
              <div className="h-[400px] w-full overflow-hidden rounded-xl border border-[#e8dfcf] bg-[#1e1e1e] shadow-inner p-4">
                <textarea
                  value={controllerCode}
                  onChange={(e) => setControllerCode(e.target.value)}
                  className="h-full w-full resize-none bg-transparent font-mono text-sm text-[#d4d4d4] outline-none"
                  spellCheck={false}
                />
              </div>
            </div>

            <div>
              <label className={wattClasses.label + " mb-2"}>Requirements (requirements.txt)</label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="numpy==1.24.3&#10;pandas==2.0.3"
                className={wattClasses.input + " h-28 resize-none font-mono text-sm"}
              />
            </div>
          </div>

          {/* Status Messages */}
          {status === "error" && (
            <div className={wattClasses.errorAlert + " flex items-center gap-3"}>
              <ExclamationTriangleIcon className="h-6 w-6 shrink-0" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}
          {status === "success" && (
            <div className={wattClasses.successAlert + " flex items-center gap-3"}>
              <CheckCircleIcon className="h-6 w-6 shrink-0" />
              <p className="text-sm font-medium">{message}</p>
            </div>
          )}

          {activeSubmissionId ? (
            <EvaluationTracker
              submissionId={activeSubmissionId}
              teamToken={teamToken}
            />
          ) : null}

          {/* Submit Button */}
          <div className="flex justify-end pt-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className={wattClasses.buttonPrimary + " gap-2 px-8 py-4 disabled:opacity-70 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"}
            >
              {isSubmitting ? (
                <>
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-white" />
                  <span>Packaging & Submitting...</span>
                </>
              ) : (
                <>
                  <ArrowUpTrayIcon className="h-5 w-5 stroke-[2.5]" />
                  <span>Submit to Evaluation Cluster</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      </main>
    </>
  );
}

// ── Live evaluation tracker ────────────────────────────────────────────────
//
// After the gateway accepts a submission, the eval lifecycle is asynchronous
// (build container → run in K8s → score → REFRESH leaderboard). The portal
// previously said "queued" and went silent — if a controller crashed every step
// the engine still marks COMPLETED, leaving teams to wonder why they scored the
// passive baseline. This component polls the same-origin proxy every few seconds
// to surface live status, the worker's `status_message` warning (e.g. "Completed
// with N runtime errors"), and a one-click "View logs" link for tracebacks.

type SubmissionStatus = {
  submission_id?: string;
  status?: string;
  status_message?: string | null;
  build_attempts?: number;
  eval_attempts?: number;
  eval_finished_at?: string | null;
};

const TERMINAL_STATUSES = new Set([
  "COMPLETED",
  "VALIDATION_FAILED",
  "BUILD_FAILED",
  "EVAL_FAILED",
  "TIMEOUT",
  "DISQUALIFIED",
]);

const STAGES: Array<{ key: string; label: string; match: (s: string) => boolean }> = [
  { key: "queued",     label: "Queued",      match: (s) => s === "SUBMITTED" || s === "BUILD_QUEUED" },
  { key: "building",   label: "Building",    match: (s) => s === "BUILDING" || s === "BUILT" },
  { key: "evaluating", label: "Evaluating",  match: (s) => s === "EVAL_QUEUED" || s === "EVALUATING" },
  { key: "scored",     label: "Scored",      match: (s) => s === "COMPLETED" },
];

function stageIndex(s: string | undefined): number {
  if (!s) return 0;
  const i = STAGES.findIndex((stage) => stage.match(s));
  return i === -1 ? 0 : i;
}

function EvaluationTracker({
  submissionId,
  teamToken,
}: {
  submissionId: string;
  teamToken: string;
}) {
  const [info, setInfo] = useState<SubmissionStatus | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  // Track terminal so the poller stops cleanly; cleared if the parent rotates
  // the key (new submission).
  const terminalRef = useRef(false);

  useEffect(() => {
    let cancelled = false;
    terminalRef.current = false;
    setInfo(null);
    setError(null);

    const pollOnce = async () => {
      try {
        const res = await fetch(
          `/watt-the-hack/city-of-melbourne-advanced-submit-data?id=${encodeURIComponent(submissionId)}`,
          { headers: { "X-Team-Token": teamToken, Accept: "application/json" } },
        );
        if (!res.ok) {
          const detail = await res.json().catch(() => ({}));
          throw new Error((detail as { detail?: string }).detail || `Status ${res.status}`);
        }
        const data = (await res.json()) as SubmissionStatus;
        if (cancelled) return;
        setInfo(data);
        setError(null);
        if (data.status && TERMINAL_STATUSES.has(data.status)) {
          terminalRef.current = true;
        }
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Couldn't reach the evaluation service");
      }
    };

    void pollOnce();
    const timer = window.setInterval(() => {
      if (terminalRef.current) {
        window.clearInterval(timer);
        return;
      }
      void pollOnce();
    }, 3000);
    return () => {
      cancelled = true;
      window.clearInterval(timer);
    };
  }, [submissionId, teamToken]);

  const status = info?.status ?? "SUBMITTED";
  const terminal = TERMINAL_STATUSES.has(status);
  const currentStage = stageIndex(status);
  const failed = terminal && status !== "COMPLETED";
  const completedWithWarning =
    status === "COMPLETED" && !!info?.status_message;

  const downloadLogs = async () => {
    try {
      const res = await fetch(
        `/watt-the-hack/city-of-melbourne-advanced-submit-data?id=${encodeURIComponent(submissionId)}&part=logs`,
        { headers: { "X-Team-Token": teamToken, Accept: "text/plain" } },
      );
      if (!res.ok) {
        const detail = await res.json().catch(() => ({}));
        throw new Error((detail as { detail?: string }).detail || `Logs ${res.status}`);
      }
      const text = await res.text();
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `eval-${submissionId.slice(0, 8)}.log`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Couldn't download logs");
    }
  };

  const copyId = async () => {
    try {
      await navigator.clipboard.writeText(submissionId);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard write can fail in non-secure contexts; silently ignore.
    }
  };

  return (
    <div className={`${wattClasses.panelSoft} flex flex-col gap-4 p-5`}>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-col">
          <p className={wattClasses.eyebrow}>Live evaluation</p>
          <p className="mt-0.5 text-sm font-bold text-[#354031]">
            {failed
              ? "Evaluation failed"
              : terminal
                ? "Scored"
                : status === "EVALUATING"
                  ? "Running your controller…"
                  : status === "BUILDING"
                    ? "Building your environment…"
                    : "Queued for evaluation"}
          </p>
        </div>
        <button
          type="button"
          onClick={copyId}
          className={`${wattClasses.smallChip} gap-1.5 hover:bg-[#fbf6e9]`}
          title="Copy submission ID"
        >
          <ClipboardDocumentIcon className="h-3.5 w-3.5" />
          {copied ? "Copied" : `${submissionId.slice(0, 8)}…`}
        </button>
      </div>

      {/* Stage bar */}
      <ol className="flex items-center gap-2">
        {STAGES.map((stage, i) => {
          const done = !failed && currentStage > i;
          const active = !failed && currentStage === i && !terminal;
          const reached = !failed && (done || active || (terminal && i <= currentStage));
          return (
            <li key={stage.key} className="flex flex-1 flex-col items-center gap-1">
              <span
                className={
                  "h-2 w-full rounded-full " +
                  (failed
                    ? "bg-[#df5047]/35"
                    : reached
                      ? "bg-[#2f6f2c]"
                      : "bg-[#e8dfcf]")
                }
                aria-hidden="true"
              />
              <span
                className={
                  "text-[11px] font-bold " +
                  (failed ? "text-[#9f2f28]" : reached ? "text-[#155420]" : "text-[#8a8477]")
                }
              >
                {stage.label}
              </span>
            </li>
          );
        })}
      </ol>

      {/* Outcome callouts */}
      {failed ? (
        <div className={`${wattClasses.errorAlert} flex items-start gap-3`}>
          <XCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold">{status.replaceAll("_", " ")}</p>
            {info?.status_message ? (
              <p className="mt-1 break-words text-sm font-medium">
                {info.status_message}
              </p>
            ) : (
              <p className="mt-1 text-sm">The evaluation didn&apos;t complete. Download the logs for details.</p>
            )}
          </div>
        </div>
      ) : completedWithWarning ? (
        <div className={`${wattClasses.warningAlert} flex items-start gap-3`}>
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#a16f14]" />
          <p className="min-w-0 text-sm font-medium">{info?.status_message}</p>
        </div>
      ) : terminal ? (
        <div className={`${wattClasses.successAlert} flex items-center gap-3`}>
          <CheckCircleIcon className="h-5 w-5 shrink-0" />
          <p className="text-sm font-medium">
            Evaluation finished cleanly. The leaderboard will refresh in a few seconds.
          </p>
        </div>
      ) : null}

      {error ? (
        <p className="text-xs font-semibold text-[#9f2f28]">
          Couldn&apos;t refresh just now: {error}. Retrying…
        </p>
      ) : null}

      {/* Actions: logs are useful in every terminal state (especially warning/failed). */}
      {terminal ? (
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={downloadLogs}
            className={`${wattClasses.buttonOutline} gap-2`}
          >
            <ArrowDownTrayIcon className="h-4 w-4" />
            Download evaluation logs
          </button>
        </div>
      ) : null}
    </div>
  );
}
