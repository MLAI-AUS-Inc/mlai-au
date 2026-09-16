// Synthetic teaching aid. No network, model, execution or permissions are granted.
// Logs are assertions by their producer, not independent proof of provenance.
export function inspectTrace(events) {
  if (!Array.isArray(events) || events.length === 0) throw new TypeError("Provide a nonempty event array");
  const ids = new Set();
  const flags = [];
  let previousTime = -Infinity;
  let humanInputRecorded = false;
  let unknownInputRecorded = false;
  for (const event of events) {
    if (!event || typeof event !== "object" || Array.isArray(event)) throw new TypeError("Invalid event");
    const allowed = ["id", "at", "kind", "parentId", "approved"];
    if (Object.keys(event).some(key => !allowed.includes(key))) throw new TypeError("Unexpected event field; keep payloads and secrets out");
    if (typeof event.id !== "string" || !/^[a-z0-9-]{1,64}$/.test(event.id) || ids.has(event.id)) throw new TypeError("Event IDs must be unique safe identifiers");
    if (typeof event.at !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(event.at)) throw new TypeError("Use canonical UTC timestamps");
    const time = Date.parse(event.at);
    if (!Number.isFinite(time) || new Date(time).toISOString() !== event.at || time < previousTime) throw new TypeError("Events must have valid nondecreasing timestamps");
    if (!["scheduled-input", "human-input", "unknown-input", "draft", "external-action"].includes(event.kind)) throw new TypeError("Unknown event kind");
    if (event.parentId !== undefined && (typeof event.parentId !== "string" || !ids.has(event.parentId))) throw new TypeError("Parent must be an earlier event");
    if (event.approved !== undefined && typeof event.approved !== "boolean") throw new TypeError("Approval must be boolean");
    if (event.kind !== "external-action" && event.approved !== undefined) throw new TypeError("Approval flag only applies to external-action");
    if (["draft", "external-action"].includes(event.kind) && !event.parentId) flags.push({ id: event.id, reason: "missing-parent" });
    if (event.kind === "external-action" && event.approved !== true) flags.push({ id: event.id, reason: "approval-not-recorded" });
    if (event.kind === "human-input") humanInputRecorded = true;
    if (event.kind === "unknown-input") unknownInputRecorded = true;
    ids.add(event.id);
    previousTime = time;
  }
  return {
    eventsInspected: events.length,
    humanInputRecorded,
    unknownInputRecorded,
    autonomy: "not-established",
    status: flags.length ? "needs-review" : "no-listed-defect-found",
    flags,
  };
}

export const syntheticTrace = [
  { id: "start", at: "2026-09-09T00:00:00.000Z", kind: "scheduled-input" },
  { id: "draft", at: "2026-09-09T00:00:01.000Z", kind: "draft", parentId: "start" },
  { id: "edit", at: "2026-09-09T00:00:02.000Z", kind: "human-input", parentId: "draft" },
  { id: "send", at: "2026-09-09T00:00:03.000Z", kind: "external-action", parentId: "edit", approved: false },
];
