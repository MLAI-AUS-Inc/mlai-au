import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowDownTrayIcon,
  ArrowPathIcon,
  ArrowUpTrayIcon,
  BoltIcon,
  CheckCircleIcon,
  ClipboardDocumentIcon,
  CodeBracketIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  SparklesIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";
import JSZip from "jszip";
import { wattClasses, wattImages } from "~/lib/watt-theme";
import {
  LLM_SCENARIO_IDS,
  getTemplatesForScenario,
  type ControllerTemplate,
} from "~/lib/wth-controller-templates";

// Default starter code: minimal class-style controller. Auto-detection picks
// `MyStrategy` as the class_name, so participants who hit Submit without
// changing anything still get a valid (do-nothing) submission rather than a
// confusing "Class not found" error from the cluster.
const DEFAULT_CODE = `class MyStrategy:
    """Replace this body with your control logic."""

    def step(self, state):
        return {
            "battery_flow_mw": 0.0,
            "curtail_solar": 0.0,
            "emergency_generator": 0.0,
            "fcas_reserve_mw": 0.0,
        }
`;

// ── Entrypoint detection ────────────────────────────────────────────────────
//
// The cluster's eval runtime (`resolve_strategy_from_path`) accepts EITHER:
//   - a class with a `step(self, state)` method (named via metadata.class_name)
//   - a top-level callable (named via metadata.function_name)
//
// The portal used to force class-style by setting class_name = the
// "Strategy Class Name" text field — which had to be kept in sync with the
// class actually defined in the code. Manual sync = bugs. We now scan the
// pasted source and decide which key to emit in metadata.json.

type Detected =
  | { kind: "class"; name: string }
  | { kind: "function"; name: string }
  | { kind: "unknown"; reason: string };

function detectEntrypoint(code: string): Detected {
  // First pass: walk the file line by line, treating top-level (column-0)
  // `class X:` and `def X(` lines as anchor points. Classes "own" any
  // indented `def` lines that follow until the next top-level statement.
  const lines = code.split("\n");
  type ClassInfo = { name: string; hasStep: boolean };
  const classes: ClassInfo[] = [];
  const topLevelFunctions: string[] = [];
  let current: ClassInfo | null = null;

  for (const line of lines) {
    const classMatch = /^class\s+([A-Za-z_][A-Za-z0-9_]*)\s*[:(]/.exec(line);
    if (classMatch) {
      current = { name: classMatch[1], hasStep: false };
      classes.push(current);
      continue;
    }

    const topDefMatch = /^def\s+([A-Za-z_][A-Za-z0-9_]*)\s*\(/.exec(line);
    if (topDefMatch) {
      current = null;
      topLevelFunctions.push(topDefMatch[1]);
      continue;
    }

    // Indented `def step(self, ...)` inside the current class body.
    if (current && /^\s+def\s+step\s*\(/.test(line)) {
      current.hasStep = true;
    }
  }

  // Prefer a class with a `step` method (the canonical shape from scenario 2+).
  const classWithStep = classes.find((c) => c.hasStep);
  if (classWithStep) return { kind: "class", name: classWithStep.name };

  // Then a top-level `controller` function (the sandbox-style shape for
  // scenarios 1 + 3).
  if (topLevelFunctions.includes("controller")) {
    return { kind: "function", name: "controller" };
  }

  // Fallback: any class (might have step defined elsewhere we missed) — gives
  // the cluster a chance to load it and emit a clearer error than ours.
  if (classes.length > 0) return { kind: "class", name: classes[0].name };

  // Fallback: first top-level function.
  if (topLevelFunctions.length > 0) {
    return { kind: "function", name: topLevelFunctions[0] };
  }

  return {
    kind: "unknown",
    reason:
      "Couldn't find a class with a `step` method or a top-level function in your code.",
  };
}

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
  { id: "gauntlet", name: "FINALE: The Gauntlet — 3x weight, 1 submission" },
];

// Per-scenario hard submission cap, mirroring `_enforce_scenario_cap` in
// the eval-platform gateway. The Gauntlet is one-shot; the rest are
// standard 3-attempt scenarios. Keep this in sync with the gateway.
const SCENARIO_SUBMISSION_CAP: Record<string, number> = {
  gauntlet: 1,
};
const DEFAULT_SUBMISSION_CAP = 3;

function capFor(scenarioId: string): number {
  return SCENARIO_SUBMISSION_CAP[scenarioId] ?? DEFAULT_SUBMISSION_CAP;
}

// Scenarios we want to surface with extra prominence on the picker. Today
// the Gauntlet is the only one — but the shape is here so we can add
// future headline events without touching layout code.
const HEADLINE_SCENARIO_IDS = new Set<string>(["gauntlet"]);

export default function WattTheHackSubmissionPortal() {
  const [teamId, setTeamId] = useState("");
  const [teamToken, setTeamToken] = useState("");
  const [scenarioId, setScenarioId] = useState(SCENARIOS[0].id);
  // Display label only — appears in the team's submission history. The entry-
  // point name in metadata.json comes from auto-detection of the pasted code,
  // not from this field.
  const [strategyName, setStrategyName] = useState("My first strategy");
  const [controllerCode, setControllerCode] = useState(DEFAULT_CODE);
  const [requirements, setRequirements] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  // Set on a successful accept so the tracker below can poll status. Cleared
  // when the user changes the form, so a stale tracker never lingers.
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);
  // Pending submission gating — when the user hits the submit button we
  // first surface a confirmation modal that summarises how many attempts
  // they have left for the chosen scenario (and, on the Gauntlet, that
  // this is a one-shot, 3x-weighted finale). The actual upload only fires
  // after the user confirms.
  const [confirmOpen, setConfirmOpen] = useState(false);
  // Cached count of completed/in-flight submissions per scenario for the
  // team, derived from the recent-submissions endpoint. Used by the
  // confirmation modal AND by an inline "attempts remaining" chip on the
  // scenario picker so the cap is visible before the user clicks submit.
  const [scenarioUsage, setScenarioUsage] = useState<Record<string, number>>({});

  // Live entrypoint detection — drives both the inline badge under the editor
  // and the metadata.json the zip carries up to the gateway.
  const detected = useMemo(() => detectEntrypoint(controllerCode), [controllerCode]);
  const templates = useMemo(() => getTemplatesForScenario(scenarioId), [scenarioId]);
  const scenarioNeedsLLM = LLM_SCENARIO_IDS.has(scenarioId);

  const scenarioCap = capFor(scenarioId);
  const scenarioUsed = scenarioUsage[scenarioId] ?? 0;
  const scenarioRemaining = Math.max(0, scenarioCap - scenarioUsed);
  const isHeadline = HEADLINE_SCENARIO_IDS.has(scenarioId);

  const loadTemplate = (tpl: ControllerTemplate) => {
    setControllerCode(tpl.source);
    // requirements.txt resets too — every template is base-image-compatible,
    // so the default empty file is correct.
    setRequirements("");
  };

  // Poll the gateway for the team's submission history and bucket the
  // counts by scenario so the modal + inline chip can show "X of Y
  // attempts used" without hitting the upload path. Only fetches when
  // both credentials look plausible.
  useEffect(() => {
    if (!UUID_RE.test(teamId.trim()) || !teamToken.trim()) {
      setScenarioUsage({});
      return;
    }
    let cancelled = false;
    const tick = async () => {
      try {
        const res = await fetch(
          `/watt-the-hack/city-of-melbourne-advanced-recent-submissions-data?team_id=${encodeURIComponent(teamId.trim())}`,
          {
            headers: {
              "X-Team-Token": teamToken.trim(),
              Accept: "application/json",
            },
          },
        );
        if (!res.ok) return;
        const rows = (await res.json()) as Array<{ scenario_id: string | null }>;
        if (cancelled) return;
        const counts: Record<string, number> = {};
        for (const r of rows) {
          if (!r.scenario_id) continue;
          counts[r.scenario_id] = (counts[r.scenario_id] ?? 0) + 1;
        }
        setScenarioUsage(counts);
      } catch {
        // Soft-fail — the count is informational; the gateway is still
        // the authoritative cap. Don't block the form on a polling miss.
      }
    };
    void tick();
    // Refresh after each successful accept (activeSubmissionId rotates).
    return () => {
      cancelled = true;
    };
  }, [teamId, teamToken, activeSubmissionId]);

  // Form-validation gate before we open the modal. The actual upload
  // lives in performSubmit() below — split so the modal's "Confirm"
  // button can call it directly.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!teamId || !teamToken || !strategyName || !controllerCode) {
      setStatus("error");
      setMessage("Please fill in Team ID, Token, Submission name, and Code.");
      return;
    }
    if (detected.kind === "unknown") {
      setStatus("error");
      setMessage(detected.reason);
      return;
    }
    if (scenarioRemaining <= 0) {
      setStatus("error");
      setMessage(
        `You have used all ${scenarioCap} submission${scenarioCap === 1 ? "" : "s"} for this scenario. The cap is enforced server-side.`,
      );
      return;
    }
    setStatus("idle");
    setMessage("");
    setConfirmOpen(true);
  };

  const performSubmit = async () => {
    setConfirmOpen(false);
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

      // 3. Add metadata.json — the entry point name is derived from the
      // detected shape of the pasted code, NOT from a separate text field
      // that has to be kept in sync. The gateway accepts either class_name
      // OR function_name; we emit exactly one.
      const metadata: Record<string, unknown> = {
        strategy_name: strategyName,
        entrypoint: "strategy.py",
        scenario_id: scenarioId,
      };
      if (detected.kind === "unknown") {
        // handleSubmit already blocks this — narrow the type for TS.
        throw new Error(detected.reason);
      }
      if (detected.kind === "class") metadata.class_name = detected.name;
      else metadata.function_name = detected.name;
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
              <label className={wattClasses.label + " mb-2 block"}>Target Scenario</label>
              <div className="relative">
                <select
                  value={scenarioId}
                  onChange={(e) => setScenarioId(e.target.value)}
                  className={wattClasses.input + " appearance-none pr-10"}
                >
                  {SCENARIOS.map((sc) => (
                    <option key={sc.id} value={sc.id}>
                      {sc.name}
                    </option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3 text-[#2f6f2c]">
                  <svg className="h-5 w-5 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              {/* Attempts-remaining chip — shows the per-scenario cap and
                  how many submissions the team has already burned, so the
                  Gauntlet's one-shot rule is visible *before* the user
                  hits submit. */}
              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span
                  className={
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11.5px] font-bold " +
                    (scenarioRemaining === 0
                      ? "border border-[#df5047]/30 bg-[#fff1ef] text-[#9f2f28]"
                      : isHeadline
                        ? "border border-[#a16f14]/30 bg-[#fff8dc] text-[#6f4b08]"
                        : "border border-[#2f6f2c]/20 bg-[#edf5df] text-[#155420]")
                  }
                >
                  {scenarioRemaining} of {scenarioCap} submission{scenarioCap === 1 ? "" : "s"} remaining
                </span>
                {isHeadline ? (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#a16f14]/40 bg-[#fff8dc] px-3 py-1 text-[11.5px] font-black uppercase tracking-[0.14em] text-[#6f4b08]">
                    Finale · weighted 3x
                  </span>
                ) : null}
              </div>
              {isHeadline ? (
                <div className="mt-2 flex items-start gap-2 rounded-[0.85rem] border border-[#a16f14]/30 bg-[#fff8dc] p-3">
                  <BoltIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#6f4b08]" />
                  <p className="text-[12.5px] leading-snug text-[#6f4b08]">
                    <strong>The Gauntlet is the championship round.</strong> You get exactly one submission, and the score it earns counts <strong>3x</strong> on the leaderboard. Make it count — local-playtest the controller end-to-end before uploading.
                  </p>
                </div>
              ) : null}
              {scenarioNeedsLLM ? (
                <div className="mt-2 flex items-start gap-2 rounded-[0.85rem] border border-[#2f6f2c]/20 bg-[#edf5df] p-3">
                  <SparklesIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#155420]" />
                  <p className="text-[12.5px] leading-snug text-[#155420]">
                    LLM access enabled for this scenario.{" "}
                    <strong>OPENAI_API_KEY is set automatically</strong> in the eval
                    pod — no <code className="font-mono text-[11px]">.env</code> file
                    is needed in your submission. The cluster injects the key from a
                    Kubernetes Secret. (For local testing on your laptop, set it in
                    your own shell.)
                  </p>
                </div>
              ) : null}
            </div>
            <div>
              <label className={wattClasses.label + " mb-2"}>Submission name</label>
              <input
                type="text"
                value={strategyName}
                onChange={(e) => setStrategyName(e.target.value)}
                placeholder="My first strategy"
                className={wattClasses.input}
                required
              />
              <p className="mt-1 text-[11.5px] text-[#8a8477]">
                Display label shown in your submission history. Our evaluator automatically reads your code to find your main controller class (e.g., <code className="font-mono">class MyStrategy:</code>) or function. You don't need to specify it manually.
              </p>
            </div>
          </div>

          <hr className={wattClasses.divider} />

          {/* Code Section */}
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <CodeBracketIcon className="h-5 w-5 text-[#354031]" />
                  <label className={wattClasses.label}>Controller Code (strategy.py)</label>
                </div>

              </div>
              <div className="h-[400px] w-full overflow-hidden rounded-xl border border-[#e8dfcf] bg-[#1e1e1e] shadow-inner p-4">
                <textarea
                  value={controllerCode}
                  onChange={(e) => setControllerCode(e.target.value)}
                  className="h-full w-full resize-none bg-transparent font-mono text-sm text-[#d4d4d4] outline-none"
                  spellCheck={false}
                />
              </div>
              {/* Live detection badge — also surfaces the early failure mode
                  (e.g. paste prose / forget a class definition). */}
              <div className="mt-2">
                {detected.kind === "class" ? (
                  <span className={`${wattClasses.smallChip} gap-1.5`}>
                    <CheckCircleIcon className="h-3.5 w-3.5" />
                    Detected class{" "}
                    <code className="font-mono">{detected.name}</code> ·{" "}
                    <span className="font-normal normal-case tracking-normal text-[#64705f]">
                      step() method
                    </span>
                  </span>
                ) : detected.kind === "function" ? (
                  <span className={`${wattClasses.smallChip} gap-1.5`}>
                    <CheckCircleIcon className="h-3.5 w-3.5" />
                    Detected function{" "}
                    <code className="font-mono">{detected.name}</code>
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#df5047]/30 bg-[#fff1ef] px-3 py-1 text-xs font-bold text-[#9f2f28]">
                    <ExclamationTriangleIcon className="h-3.5 w-3.5" />
                    {detected.reason}
                  </span>
                )}
              </div>
            </div>

            <div>
              <label className={wattClasses.label + " mb-2"}>Requirements (requirements.txt)</label>
              <textarea
                value={requirements}
                onChange={(e) => setRequirements(e.target.value)}
                placeholder="# Leave empty unless you need a niche package not in the base image."
                className={wattClasses.input + " h-24 resize-none font-mono text-sm"}
              />
              <div className="mt-2 flex items-start gap-2 rounded-[0.85rem] border border-[#e8dfcf] bg-[#fbf6e9] p-3">
                <InformationCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-[#64705f]" />
                <div className="text-[12.5px] leading-snug text-[#354031]">
                  <p>
                    <strong>Most submissions need an empty requirements.txt.</strong>{" "}
                    The base image already includes the <code className="font-mono text-[11px]">watt_the_hack</code>{" "}
                    engine plus <code className="font-mono text-[11px]">numpy</code>,{" "}
                    <code className="font-mono text-[11px]">pandas</code>,{" "}
                    <code className="font-mono text-[11px]">scipy</code>,{" "}
                    <code className="font-mono text-[11px]">openai</code>, and{" "}
                    <code className="font-mono text-[11px]">pydantic</code>.
                  </p>
                  <p className="mt-1 text-[#64705f]">
                    Only add a line here if you need something specialised
                    (e.g. <code className="font-mono text-[11px]">cvxpy</code>,{" "}
                    <code className="font-mono text-[11px]">optuna</code>). Listing
                    stdlib modules like <code className="font-mono text-[11px]">os</code>{" "}
                    or pre-installed packages will fail the build.
                  </p>
                </div>
              </div>
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

      {/* Recent submissions — only renders once both credentials look plausible.
          Avoids hitting the proxy with an empty token (it would just 401), and
          keeps the panel hidden as decoration noise on first page load. */}
      <RecentSubmissionsPanel
        teamId={teamId}
        teamToken={teamToken}
        // Bump on each new submission so the panel can show it as soon as
        // possible without waiting for the next poll tick.
        activeSubmissionId={activeSubmissionId}
      />
      </main>

      {confirmOpen ? (
        <SubmissionConfirmModal
          scenarioId={scenarioId}
          scenarioLabel={SCENARIOS.find((s) => s.id === scenarioId)?.name ?? scenarioId}
          remaining={scenarioRemaining}
          cap={scenarioCap}
          isHeadline={isHeadline}
          onConfirm={() => void performSubmit()}
          onCancel={() => setConfirmOpen(false)}
        />
      ) : null}
    </>
  );
}

// ── Submission confirmation modal ────────────────────────────────────────
//
// Fires when the user clicks the "Submit to Evaluation Cluster" button. It
// surfaces the per-scenario submission cap (Gauntlet = 1, others = 3) so
// the team can't waste an attempt by mistake. For the Gauntlet, also calls
// out the 3x leaderboard weighting — the cost of getting it wrong is
// triple, so the modal copy is intentionally loud.
function SubmissionConfirmModal({
  scenarioId,
  scenarioLabel,
  remaining,
  cap,
  isHeadline,
  onConfirm,
  onCancel,
}: {
  scenarioId: string;
  scenarioLabel: string;
  remaining: number;
  cap: number;
  isHeadline: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  // After this confirmed submission lands the server will count it; show
  // the *post-submission* number so the user can see exactly what they're
  // burning.
  const remainingAfter = Math.max(0, remaining - 1);
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center bg-black/55 p-4"
      onClick={onCancel}
      role="dialog"
      aria-modal="true"
      aria-labelledby="wth-submit-confirm-title"
    >
      <div
        className={`${wattClasses.panelStrong} flex w-full max-w-lg flex-col gap-5 p-6 sm:p-8`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start gap-3">
          {isHeadline ? (
            <ExclamationTriangleIcon className="mt-1 h-7 w-7 shrink-0 text-[#a16f14]" />
          ) : (
            <InformationCircleIcon className="mt-1 h-7 w-7 shrink-0 text-[#2f6f2c]" />
          )}
          <div>
            <p className={wattClasses.eyebrow}>Confirm submission</p>
            <h3 id="wth-submit-confirm-title" className={`${wattClasses.title} mt-1 text-xl`}>
              {isHeadline ? "Lock in your Gauntlet attempt?" : "Send this to the evaluator?"}
            </h3>
          </div>
        </div>

        <div className="rounded-[1rem] border border-[#e8dfcf] bg-[#fbf6e9] p-4">
          <p className="text-xs font-black uppercase tracking-[0.18em] text-[#64705f]">Target scenario</p>
          <p className="mt-1 text-sm font-bold text-[#354031]">{scenarioLabel}</p>
          <p className="mt-3 text-xs font-black uppercase tracking-[0.18em] text-[#64705f]">Submissions</p>
          <p className="mt-1 text-sm font-bold text-[#354031]">
            You have <span className="text-[#155420]">{remaining}</span> of {cap} left.
            {" "}After this one, you will have <span className="text-[#155420]">{remainingAfter}</span> remaining.
          </p>
        </div>

        {isHeadline ? (
          <div className="rounded-[1rem] border border-[#a16f14]/40 bg-[#fff8dc] p-4">
            <p className="text-sm font-bold text-[#6f4b08]">
              ⚠ This is your only Gauntlet submission.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-[13px] leading-snug text-[#6f4b08]">
              <li>The Gauntlet's normalised score is multiplied <strong>3x</strong> in the leaderboard total.</li>
              <li>The submission cap is enforced server-side — there is no override.</li>
              <li>Make sure you ran a full local playtest of this controller before clicking confirm.</li>
            </ul>
          </div>
        ) : (
          <p className="text-[13px] leading-snug text-[#64705f]">
            The evaluator will package and run this code against the hidden judging variant of this scenario. The leaderboard refreshes automatically once it finishes scoring.
          </p>
        )}

        <div className="mt-1 flex flex-wrap justify-end gap-2">
          <button type="button" onClick={onCancel} className={wattClasses.buttonOutline}>
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className={
              wattClasses.buttonPrimary +
              " gap-2 px-6 py-3 shadow-lg hover:shadow-xl " +
              (isHeadline ? "bg-[#9f2f28] hover:bg-[#7f2520]" : "")
            }
          >
            <ArrowUpTrayIcon className="h-4 w-4 stroke-[2.5]" />
            {isHeadline ? "Send my Gauntlet attempt" : `Use 1 of ${cap} submissions`}
          </button>
        </div>
      </div>
    </div>
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

// ── Recent submissions panel ──────────────────────────────────────────────
//
// Lists the team's recent submissions with status, normalized leaderboard
// points, raw cost, and a "View code" affordance. Polls every few seconds
// while anything is still in flight, so a participant can leave the page on
// this screen during a 15 min eval and watch it land without manually
// refreshing. While in flight the row shows an energy-pulse stage bar plus a
// soft glow on the active stage; once terminal we collapse to a static
// success/failure card.
//
// Only the team's own data is fetched (the gateway endpoint is X-Team-Token
// owner-gated). The token never leaves the mlai.au origin in plaintext — same
// model as the submit POST half above.

const SCENARIO_LABELS: Record<string, string> = SCENARIOS.reduce<Record<string, string>>(
  (acc, sc) => {
    acc[sc.id] = sc.name;
    return acc;
  },
  {},
);

type RecentSubmission = {
  submission_id: string;
  strategy_name: string | null;
  scenario_id: string | null;
  status: string;
  status_message: string | null;
  submitted_at: string;
  eval_finished_at: string | null;
  raw_cost: number | null;
  normalized_score: number | null;
};

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function RecentSubmissionsPanel({
  teamId,
  teamToken,
  activeSubmissionId,
}: {
  teamId: string;
  teamToken: string;
  activeSubmissionId: string | null;
}) {
  const credsLook = UUID_RE.test(teamId.trim()) && teamToken.trim().length > 0;
  const [rows, setRows] = useState<RecentSubmission[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [viewer, setViewer] = useState<{ row: RecentSubmission; source: string } | null>(null);
  const [loadingViewer, setLoadingViewer] = useState(false);

  // Re-fetch every 5 s while anything is non-terminal; back off to 30 s once
  // everything has settled. Keeps the page light on a long-finished session
  // without making participants refresh by hand.
  useEffect(() => {
    if (!credsLook) {
      setRows(null);
      setError(null);
      return;
    }
    let cancelled = false;
    let timer: number | null = null;

    const tick = async () => {
      try {
        const res = await fetch(
          `/watt-the-hack/city-of-melbourne-advanced-recent-submissions-data?team_id=${encodeURIComponent(teamId.trim())}`,
          {
            headers: { "X-Team-Token": teamToken.trim(), Accept: "application/json" },
          },
        );
        if (!res.ok) {
          const data = await res.json().catch(() => ({}));
          throw new Error((data as { detail?: string }).detail || `Status ${res.status}`);
        }
        const data = (await res.json()) as RecentSubmission[];
        if (cancelled) return;
        setRows(data);
        setError(null);
        const hasInflight = data.some((r) => !TERMINAL_STATUSES.has(r.status));
        const delay = hasInflight ? 5000 : 30000;
        timer = window.setTimeout(() => void tick(), delay);
      } catch (err) {
        if (cancelled) return;
        setError(err instanceof Error ? err.message : "Couldn't load submissions");
        // Retry on a generous interval — most failures here are transient
        // (cold worker, brief admin redeploy). Don't blast the proxy.
        timer = window.setTimeout(() => void tick(), 8000);
      }
    };
    void tick();
    return () => {
      cancelled = true;
      if (timer !== null) window.clearTimeout(timer);
    };
    // activeSubmissionId is in the dep array so a fresh accept triggers a
    // poll cycle immediately instead of waiting for the current timer.
  }, [credsLook, teamId, teamToken, activeSubmissionId]);

  const openCode = async (row: RecentSubmission) => {
    setViewer({ row, source: "" });
    setLoadingViewer(true);
    try {
      const res = await fetch(
        `/watt-the-hack/city-of-melbourne-advanced-submit-data?id=${encodeURIComponent(row.submission_id)}&part=source`,
        {
          headers: { "X-Team-Token": teamToken.trim(), Accept: "text/plain" },
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error((data as { detail?: string }).detail || `Status ${res.status}`);
      }
      const text = await res.text();
      setViewer({ row, source: text });
    } catch (err) {
      setViewer({
        row,
        source: `# Couldn't load source\n# ${err instanceof Error ? err.message : "unknown error"}`,
      });
    } finally {
      setLoadingViewer(false);
    }
  };

  if (!credsLook) return null;

  return (
    <>
      <section className={`${wattClasses.panelStrong} mt-6 p-6 sm:p-8`}>
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className={wattClasses.eyebrow}>Submission history</p>
            <h2 className={`${wattClasses.title} mt-1 text-2xl sm:text-3xl`}>Your recent submissions</h2>
            <p className={`${wattClasses.muted} mt-1 text-sm`}>
              Updates automatically while an evaluation is running. The leaderboard refreshes when a submission scores.
            </p>
          </div>
          {error ? (
            <span className="text-xs font-bold text-[#9f2f28]">
              Couldn&apos;t refresh just now ({error}). Retrying…
            </span>
          ) : null}
        </div>

        {rows === null ? (
          <PulseSkeleton />
        ) : rows.length === 0 ? (
          <div className={`${wattClasses.panelSoft} p-5 text-sm text-[#64705f]`}>
            You haven&apos;t submitted anything yet. Submissions you make above will appear here.
          </div>
        ) : (
          <ul className="flex flex-col gap-3">
            {rows.map((row) => (
              <RecentSubmissionRow
                key={row.submission_id}
                row={row}
                teamToken={teamToken}
                onViewCode={() => openCode(row)}
              />
            ))}
          </ul>
        )}
      </section>

      {viewer ? (
        <CodeViewerModal
          row={viewer.row}
          source={viewer.source}
          loading={loadingViewer}
          onClose={() => setViewer(null)}
        />
      ) : null}
    </>
  );
}

function RecentSubmissionRow({
  row,
  teamToken,
  onViewCode,
}: {
  row: RecentSubmission;
  teamToken: string;
  onViewCode: () => void;
}) {
  const terminal = TERMINAL_STATUSES.has(row.status);
  const failed = terminal && row.status !== "COMPLETED";
  const completedWithWarning = row.status === "COMPLETED" && !!row.status_message;
  const relative = useMemo(() => formatRelative(row.submitted_at), [row.submitted_at]);
  const scenarioLabel = row.scenario_id ? SCENARIO_LABELS[row.scenario_id] ?? row.scenario_id : "—";

  // Per-row state for the "Download logs" button so a 404 (no logs persisted
  // — happens for failures that crashed before pod startup) is visible to the
  // user instead of a silent no-op. Cleared on next click.
  const [logError, setLogError] = useState<string | null>(null);
  const [downloading, setDownloading] = useState(false);

  const onDownloadLogs = async () => {
    setLogError(null);
    setDownloading(true);
    try {
      const res = await fetch(
        `/watt-the-hack/city-of-melbourne-advanced-submit-data?id=${encodeURIComponent(row.submission_id)}&part=logs`,
        { headers: { "X-Team-Token": teamToken.trim(), Accept: "text/plain" } },
      );
      if (!res.ok) {
        // Gateway returns 404 when no log was persisted (very early failure)
        // and surfaces a `detail` body for most other cases. `res.json()` is
        // typed as `unknown` under react-router's stricter tsconfig, so we
        // narrow via an explicit cast — same pattern as the EvaluationTracker
        // path further up the file.
        let detail = `HTTP ${res.status}`;
        try {
          const body = (await res.json()) as { detail?: string };
          if (body && typeof body.detail === "string") detail = body.detail;
        } catch {
          // not JSON; fall back to status code.
        }
        throw new Error(detail);
      }
      const text = await res.text();
      const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `eval-${row.submission_id.slice(0, 8)}.log`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch (err) {
      setLogError(err instanceof Error ? err.message : "Couldn't download logs");
    } finally {
      setDownloading(false);
    }
  };

  return (
    <li className={`${wattClasses.panelSoft} p-4 sm:p-5`}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <StatusPill status={row.status} />
            <span className="text-sm font-bold text-[#354031]">{row.strategy_name || "Untitled strategy"}</span>
            <span className="text-xs font-medium text-[#8a8477]">·</span>
            <span className="text-xs font-medium text-[#64705f]">{scenarioLabel}</span>
          </div>
          <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-[#8a8477]">
            <span>Submitted {relative}</span>
            <span className="font-mono text-[11px] text-[#9aa496]">{row.submission_id.slice(0, 8)}…</span>
          </div>
        </div>

        {/* Right rail: score (terminal) or pulse animation (in flight). */}
        {row.status === "COMPLETED" && row.normalized_score !== null ? (
          <ScoreReadout points={row.normalized_score} rawCost={row.raw_cost} />
        ) : !terminal ? (
          <EnergyPulse />
        ) : null}
      </div>

      {/* Stage bar — visible while non-terminal, mirrors the EvaluationTracker
          above so participants see the same vocabulary in both places. */}
      {!terminal ? (
        <div className="mt-4">
          <StageBar status={row.status} />
        </div>
      ) : null}

      {/* Outcome message. */}
      {failed ? (
        <div className={`${wattClasses.errorAlert} mt-3 flex items-start gap-3`}>
          <XCircleIcon className="mt-0.5 h-5 w-5 shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-bold">{row.status.replaceAll("_", " ")}</p>
            <p className="mt-1 break-words text-sm font-medium">
              {row.status_message || "The evaluation didn't complete. Download the logs for details."}
            </p>
          </div>
        </div>
      ) : completedWithWarning ? (
        <div className={`${wattClasses.warningAlert} mt-3 flex items-start gap-3`}>
          <ExclamationTriangleIcon className="mt-0.5 h-5 w-5 shrink-0 text-[#a16f14]" />
          <p className="min-w-0 break-words text-sm font-medium">{row.status_message}</p>
        </div>
      ) : null}

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" onClick={onViewCode} className={`${wattClasses.buttonOutline} gap-2`}>
          <CodeBracketIcon className="h-4 w-4" />
          View code
        </button>
        {terminal ? (
          <button
            type="button"
            onClick={onDownloadLogs}
            disabled={downloading}
            className={`${wattClasses.buttonOutline} gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            <ArrowDownTrayIcon className={`h-4 w-4 ${downloading ? "animate-pulse" : ""}`} />
            {downloading ? "Fetching…" : "Download logs"}
          </button>
        ) : null}
        {logError ? (
          <span className="text-xs font-semibold text-[#9f2f28]">
            {logError === "Logs not available yet"
              ? "No logs were captured for this submission. Tell an organiser if this keeps happening."
              : logError}
          </span>
        ) : null}
      </div>
    </li>
  );
}

function ScoreReadout({ points, rawCost }: { points: number; rawCost: number | null }) {
  return (
    <div className="flex items-end gap-3 text-right">
      <div>
        <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#155420]">Points</div>
        <div className="text-3xl font-black tabular-nums text-[#155420]">{points.toFixed(1)}</div>
      </div>
      {rawCost !== null ? (
        <div className="border-l border-[#c9dbb8] pl-3">
          <div className="text-[10px] font-black uppercase tracking-[0.16em] text-[#64705f]">Raw cost</div>
          <div className="text-sm font-bold tabular-nums text-[#64705f]">{rawCost.toLocaleString(undefined, { maximumFractionDigits: 0 })}</div>
        </div>
      ) : null}
    </div>
  );
}

function StatusPill({ status }: { status: string }) {
  const cls = pillClassFor(status);
  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-black uppercase tracking-[0.12em] ${cls}`}>
      {status.replaceAll("_", " ")}
    </span>
  );
}

function pillClassFor(status: string): string {
  if (status === "COMPLETED") return "bg-[#e6efd7] text-[#155420]";
  if (FAIL_STATUSES.has(status)) return "bg-[#fff1ef] text-[#9f2f28]";
  // In-flight / queued.
  return "bg-[#fff8dc] text-[#6f4b08]";
}

function StageBar({ status }: { status: string }) {
  const idx = STAGES.findIndex((stage) => stage.match(status));
  const current = idx === -1 ? 0 : idx;
  return (
    <ol className="flex items-center gap-2">
      {STAGES.map((stage, i) => {
        const done = current > i;
        const active = current === i;
        return (
          <li key={stage.key} className="flex flex-1 flex-col items-center gap-1">
            <span
              className={
                "relative h-2 w-full overflow-hidden rounded-full " +
                (done || active ? "bg-[#2f6f2c]" : "bg-[#e8dfcf]")
              }
              aria-hidden="true"
            >
              {active ? (
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.65) 50%, rgba(255,255,255,0) 100%)",
                    animation: "watt-stage-shimmer 1.6s ease-in-out infinite",
                  }}
                />
              ) : null}
            </span>
            <span className={"text-[10px] font-black uppercase tracking-[0.12em] " + (done || active ? "text-[#155420]" : "text-[#8a8477]")}>
              {stage.label}
            </span>
          </li>
        );
      })}
      <style>{`
        @keyframes watt-stage-shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </ol>
  );
}

// Premium loading animation — a bolt icon inside a slowly-rotating conic
// gradient halo with a soft inner pulse. Visually communicates "energy is
// flowing through this submission" without being noisy.
function EnergyPulse() {
  return (
    <div className="flex flex-col items-center gap-1.5">
      <div className="relative h-14 w-14">
        <span
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, rgba(47,111,44,0) 0%, rgba(47,111,44,0.55) 35%, rgba(159,232,112,0.9) 50%, rgba(47,111,44,0.55) 65%, rgba(47,111,44,0) 100%)",
            animation: "watt-pulse-spin 1.6s linear infinite",
          }}
          aria-hidden="true"
        />
        <span
          className="absolute inset-1 rounded-full bg-[#fbf6e9]"
          aria-hidden="true"
        />
        <span
          className="absolute inset-2 rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(159,232,112,0.55) 0%, rgba(159,232,112,0) 70%)",
            animation: "watt-pulse-glow 1.6s ease-in-out infinite",
          }}
          aria-hidden="true"
        />
        <BoltIcon className="absolute inset-0 m-auto h-6 w-6 text-[#155420]" />
      </div>
      <span className="text-[10px] font-black uppercase tracking-[0.16em] text-[#155420]">Evaluating</span>
      <style>{`
        @keyframes watt-pulse-spin {
          to { transform: rotate(360deg); }
        }
        @keyframes watt-pulse-glow {
          0%, 100% { opacity: 0.35; transform: scale(0.85); }
          50%      { opacity: 1.0;  transform: scale(1.05); }
        }
      `}</style>
    </div>
  );
}

function PulseSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="h-24 rounded-[1.25rem] border border-[#e8dfcf] bg-[#fbf6e9]"
          style={{ animation: `watt-skeleton-shimmer 2s ease-in-out ${i * 0.15}s infinite` }}
          aria-hidden="true"
        />
      ))}
      <style>{`
        @keyframes watt-skeleton-shimmer {
          0%, 100% { opacity: 0.55; }
          50%      { opacity: 0.95; }
        }
      `}</style>
    </div>
  );
}

function CodeViewerModal({
  row,
  source,
  loading,
  onClose,
}: {
  row: RecentSubmission;
  source: string;
  loading: boolean;
  onClose: () => void;
}) {
  const [copied, setCopied] = useState(false);
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4"
      onClick={onClose}
    >
      <div
        className={`${wattClasses.panelStrong} flex max-h-[88vh] w-full max-w-3xl flex-col overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#e8dfcf] p-5">
          <div>
            <p className={wattClasses.eyebrow}>Submitted code</p>
            <h3 className={`${wattClasses.title} mt-1 text-lg`}>
              {row.strategy_name || "Untitled strategy"}{" "}
              <span className="font-medium text-[#64705f]">
                · {row.scenario_id ? SCENARIO_LABELS[row.scenario_id] ?? row.scenario_id : "—"}
              </span>
            </h3>
            <p className="mt-1 font-mono text-[11px] text-[#9aa496]">{row.submission_id}</p>
          </div>
          <button type="button" onClick={onClose} className={wattClasses.buttonOutline}>
            Close
          </button>
        </div>
        <div className="relative flex-1 overflow-auto bg-[#1e1e1e] p-4">
          {loading ? (
            <div className="flex h-40 items-center justify-center">
              <ArrowPathIcon className="h-6 w-6 animate-spin text-white/70" />
            </div>
          ) : (
            <pre className="font-mono text-[13px] leading-relaxed text-[#d4d4d4]">{source}</pre>
          )}
        </div>
        <div className="flex justify-end gap-2 border-t border-[#e8dfcf] p-4">
          <button
            type="button"
            disabled={loading}
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(source);
                setCopied(true);
                window.setTimeout(() => setCopied(false), 1600);
              } catch {
                // Clipboard fails in insecure contexts; nothing useful to surface.
              }
            }}
            className={`${wattClasses.buttonOutline} gap-2 disabled:opacity-50`}
          >
            <ClipboardDocumentIcon className="h-4 w-4" />
            {copied ? "Copied" : "Copy"}
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Helpers ────────────────────────────────────────────────────────────────

const FAIL_STATUSES = new Set([
  "VALIDATION_FAILED",
  "BUILD_FAILED",
  "EVAL_FAILED",
  "TIMEOUT",
  "DISQUALIFIED",
]);

function formatRelative(iso: string): string {
  const then = new Date(iso).getTime();
  if (!Number.isFinite(then)) return iso;
  const diff = Date.now() - then;
  if (diff < 0) return new Date(iso).toLocaleString();
  const sec = Math.floor(diff / 1000);
  if (sec < 60) return `${sec}s ago`;
  const min = Math.floor(sec / 60);
  if (min < 60) return `${min}m ago`;
  const hr = Math.floor(min / 60);
  if (hr < 48) return `${hr}h ago`;
  const day = Math.floor(hr / 24);
  if (day < 14) return `${day}d ago`;
  return new Date(iso).toLocaleDateString();
}
