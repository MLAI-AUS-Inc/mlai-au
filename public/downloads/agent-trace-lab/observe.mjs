// Offline synthetic teaching exercise, not a moderation service or authorisation gate.
import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

function fields(value, keys) {
  if (!value || typeof value !== "object" || Array.isArray(value) ||
      Object.keys(value).length !== keys.length || keys.some(key => !Object.hasOwn(value, key))) {
    throw new TypeError("Use the exact documented fields; do not add private payloads or credentials");
  }
}
function timestamp(value) {
  if (typeof value !== "string" || !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/.test(value)) throw new TypeError("Use canonical UTC timestamps");
  const result = Date.parse(value);
  if (!Number.isFinite(result) || new Date(result).toISOString() !== value) throw new TypeError("Invalid timestamp");
  return result;
}
function seconds(value, max, zero = false) {
  if (!Number.isSafeInteger(value) || value < (zero ? 0 : 1) || value > max) throw new TypeError("Seconds must be bounded whole numbers");
}

export function observe(fixture) {
  fields(fixture, ["provenance", "window", "thresholdSeconds", "attempts"]);
  if (fixture.provenance !== "synthetic") throw new TypeError("This exercise accepts synthetic fixtures only");
  fields(fixture.window, ["start", "end", "bucketSeconds"]);
  const start = timestamp(fixture.window.start), end = timestamp(fixture.window.end);
  seconds(fixture.window.bucketSeconds, 86400);
  const bucketMs = fixture.window.bucketSeconds * 1000;
  const bucketCount = Math.ceil((end - start) / bucketMs);
  if (end <= start || end - start > 86400000 || bucketCount > 1440) throw new TypeError("Use a positive window of at most one day and 1440 buckets");
  if (!Array.isArray(fixture.thresholdSeconds) || !fixture.thresholdSeconds.length || fixture.thresholdSeconds.length > 20) throw new TypeError("Provide 1–20 thresholds");
  for (const value of fixture.thresholdSeconds) seconds(value, 86400, true);
  if (fixture.thresholdSeconds.some((value, i, values) => i && value <= values[i - 1])) throw new TypeError("Thresholds must be unique and increasing");
  if (!Array.isArray(fixture.attempts) || fixture.attempts.length > 10000) throw new TypeError("Use an array of at most 10000 attempts");

  const histogram = Array.from({ length: bucketCount }, (_, i) => ({
    start: new Date(start + i * bucketMs).toISOString(),
    end: new Date(Math.min(end, start + (i + 1) * bucketMs)).toISOString(),
    attempts: 0, published: 0, rateLimited: 0, errors: 0,
  }));
  const counts = { attempts: 0, published: 0, rateLimited: 0, errors: 0 };
  const ids = new Set(), byAccount = new Map(), contentGroups = new Map();
  const moderationQueue = [];
  let previousTime = -Infinity;
  for (const attempt of fixture.attempts) {
    fields(attempt, ["id", "at", "account", "content", "outcome", "retryAfterSeconds", "moderation"]);
    for (const key of ["id", "account"]) if (typeof attempt[key] !== "string" || !/^[a-z0-9-]{1,64}$/.test(attempt[key])) throw new TypeError("Use safe fixture identifiers");
    if (ids.has(attempt.id)) throw new TypeError("Attempt IDs must be unique");
    ids.add(attempt.id);
    const time = timestamp(attempt.at);
    if (time < start || time >= end || time < previousTime) throw new TypeError("Attempts must be ordered and within [start, end)");
    previousTime = time;
    if (typeof attempt.content !== "string" || !attempt.content.trim() || attempt.content.length > 240) throw new TypeError("Use short fictional content, never customer text");
    if (!["published", "rate-limited", "error"].includes(attempt.outcome)) throw new TypeError("Unknown outcome");
    if (!["not-reviewed", "flagged", "cleared"].includes(attempt.moderation)) throw new TypeError("Unknown recorded moderation state");
    if (attempt.retryAfterSeconds !== null) {
      if (attempt.outcome !== "rate-limited") throw new TypeError("Retry delay only applies to a rate-limited record");
      seconds(attempt.retryAfterSeconds, 86400, true);
    }
    const account = byAccount.get(attempt.account) ?? [];
    account.push({ ...attempt, time });
    byAccount.set(attempt.account, account);
    const bucket = histogram[Math.floor((time - start) / bucketMs)];
    const key = { published: "published", "rate-limited": "rateLimited", error: "errors" }[attempt.outcome];
    counts.attempts++; counts[key]++; bucket.attempts++; bucket[key]++;
    if (attempt.outcome === "published") {
      const group = contentGroups.get(attempt.content) ?? [];
      group.push(attempt.id);
      contentGroups.set(attempt.content, group);
      if (attempt.moderation !== "cleared") moderationQueue.push({ id: attempt.id, recordedState: attempt.moderation });
    }
  }
  const retryChecks = [], intervals = [];
  for (const [account, attempts] of byAccount) {
    attempts.forEach((attempt, i) => {
      const next = attempts[i + 1];
      if (next) intervals.push({ account, from: attempt.id, to: next.id, seconds: (next.time - attempt.time) / 1000 });
      if (attempt.outcome !== "rate-limited") return;
      const wait = next ? (next.time - attempt.time) / 1000 : null;
      retryChecks.push({
        from: attempt.id, to: next?.id ?? null, waitSeconds: wait, requiredSeconds: attempt.retryAfterSeconds,
        status: !next ? "no-follow-up-in-window" : attempt.retryAfterSeconds === null ? "unknown-delay" : wait < attempt.retryAfterSeconds ? "early" : "met-recorded-delay",
      });
    });
  }
  const duplicateGroups = [...contentGroups].filter(([, list]) => list.length > 1).map(([content, list]) => ({
    contentSha256: createHash("sha256").update(content, "utf8").digest("hex"), publishedIds: list,
  }));
  const duplicatePublicationsAfterFirst = duplicateGroups.reduce((total, group) => total + group.publishedIds.length - 1, 0);
  return {
    version: "agent-observation-v1", provenance: "synthetic", window: { ...fixture.window },
    counts, histogram, retryChecks, duplicateGroups, duplicatePublicationsAfterFirst,
    duplicateDenominator: counts.published,
    duplicateFraction: counts.published ? duplicatePublicationsAfterFirst / counts.published : null,
    moderation: { publishedDenominator: counts.published, recordedCleared: counts.published - moderationQueue.length, reviewQueue: moderationQueue },
    intervals,
    sensitivity: fixture.thresholdSeconds.map(thresholdSeconds => ({
      thresholdSeconds, matchingIntervals: intervals.filter(interval => interval.seconds <= thresholdSeconds).length, denominator: intervals.length,
    })),
    actorGroundTruth: "not-collected", autonomy: "not-established",
    status: moderationQueue.length || retryChecks.some(check => check.status !== "met-recorded-delay") ? "needs-review" : "no-listed-defect-found",
    productionApproval: false,
  };
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  if (process.argv.length !== 2) throw new Error("Usage: node observe.mjs (reads fixture.json beside this file)");
  console.log(JSON.stringify(observe(JSON.parse(readFileSync(new URL("./fixture.json", import.meta.url), "utf8"))), null, 2));
}
