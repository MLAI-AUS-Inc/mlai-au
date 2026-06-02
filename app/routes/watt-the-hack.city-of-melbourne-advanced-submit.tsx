import { useState } from "react";
import { ArrowUpTrayIcon, CheckCircleIcon, ExclamationTriangleIcon, CodeBracketIcon } from "@heroicons/react/24/outline";
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

      setStatus("success");
      setMessage("Submission queued successfully! Check the dashboard or leaderboard for updates.");
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
