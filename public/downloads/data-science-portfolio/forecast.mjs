/** Synthetic teaching lab, not a staffing service. No network, credentials or actions. */
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";

export const VERSION = "workload-forecast-v1";
const DAY = 86_400_000;
const mean = values => values.reduce((sum, value) => sum + value, 0) / values.length;
const round = value => Number(value.toFixed(6));

function dateNumber(value) {
  if (typeof value !== "string" || !/^20\d\d-\d\d-\d\d$/.test(value)) throw new TypeError("Use an ISO date in 2000–2099");
  const time = Date.parse(value + "T00:00:00Z");
  if (!Number.isFinite(time) || new Date(time).toISOString().slice(0, 10) !== value) throw new TypeError("Invalid calendar date");
  return time;
}

export function validateRows(rows) {
  if (!Array.isArray(rows) || rows.length < 1 || rows.length > 3660) throw new TypeError("Expected 1–3660 daily records");
  let previous;
  return rows.map(row => {
    if (!row || typeof row !== "object" || Array.isArray(row) || Object.keys(row).sort().join(",") !== "date,requests") throw new TypeError("Each record needs only date and requests");
    const time = dateNumber(row.date);
    if (previous !== undefined && time !== previous + DAY) throw new TypeError("Dates must be unique, consecutive and already ordered; no silent filling or sorting");
    if (!Number.isInteger(row.requests) || row.requests < 0 || row.requests > 100_000) throw new TypeError("Requests must be integer counts from 0 to 100000");
    previous = time;
    return Object.freeze({ date: row.date, requests: row.requests });
  });
}

/** Training receives no test targets. Complete Monday–Sunday weeks are intentional. */
export function fitWorkloadModel(training) {
  const rows = validateRows(training);
  if (rows.length < 14 || rows.length % 7 !== 0 || new Date(dateNumber(rows[0].date)).getUTCDay() !== 1) throw new TypeError("Training must contain at least two complete Monday–Sunday weeks");
  const weeks = rows.length / 7;
  const weeklyMeans = Array.from({ length: weeks }, (_, week) => mean(rows.slice(week * 7, week * 7 + 7).map(row => row.requests)));
  const xMean = (weeks - 1) / 2;
  const yMean = mean(weeklyMeans);
  const slope = weeklyMeans.reduce((sum, value, week) => sum + (week - xMean) * (value - yMean), 0)
    / weeklyMeans.reduce((sum, _, week) => sum + (week - xMean) ** 2, 0);
  const intercept = yMean - slope * xMean;
  // With equal observations per weekday, weekday residual means are centred.
  const weekdayOffsets = Array.from({ length: 7 }, (_, day) => mean(Array.from({ length: weeks }, (_, week) => rows[week * 7 + day].requests - weeklyMeans[week])));
  return Object.freeze({
    version: VERSION, trainingStart: rows[0].date, trainingEnd: rows.at(-1).date,
    trainingDays: rows.length, intercept, slope,
    weekdayOffsets: Object.freeze(weekdayOffsets),
    baselineWeek: Object.freeze(rows.slice(-7).map(row => row.requests)),
  });
}

/** Fixed origin: neither method updates using observations from the forecast period. */
export function forecast(model, dates) {
  if (!model || model.version !== VERSION || !Number.isInteger(model.trainingDays) || model.trainingDays < 14 || model.trainingDays % 7 !== 0
      || !Number.isFinite(model.intercept) || !Number.isFinite(model.slope)
      || !Array.isArray(model.weekdayOffsets) || model.weekdayOffsets.length !== 7 || !model.weekdayOffsets.every(Number.isFinite)
      || !Array.isArray(model.baselineWeek) || model.baselineWeek.length !== 7 || !model.baselineWeek.every(value => Number.isInteger(value) && value >= 0 && value <= 100_000)) throw new TypeError("Invalid fitted model");
  const start = dateNumber(model.trainingStart);
  const end = dateNumber(model.trainingEnd);
  if (end - start !== (model.trainingDays - 1) * DAY || new Date(start).getUTCDay() !== 1) throw new TypeError("Inconsistent training window");
  if (!Array.isArray(dates) || dates.length < 1 || dates.length > 14) throw new TypeError("Forecast horizon must be 1–14 consecutive days");
  return dates.map((date, index) => {
    if (dateNumber(date) !== end + (index + 1) * DAY) throw new TypeError("Forecast dates must begin immediately after training, without gaps or overlap");
    const offset = model.trainingDays + index;
    const raw = model.intercept + model.slope * Math.floor(offset / 7) + model.weekdayOffsets[offset % 7];
    if (!Number.isFinite(raw)) throw new TypeError("Non-finite prediction");
    return Object.freeze({ date, baseline: model.baselineWeek[index % 7], candidate: round(Math.max(0, raw)), clippedAtZero: raw < 0 });
  });
}

export function scoreForecast(actual, predictions) {
  const rows = validateRows(actual);
  if (!Array.isArray(predictions) || predictions.length !== rows.length) throw new TypeError("Score the same dates for both methods");
  const cases = rows.map((row, index) => {
    const prediction = predictions[index];
    if (!prediction || prediction.date !== row.date || ![prediction.baseline, prediction.candidate].every(value => Number.isFinite(value) && value >= 0)) throw new TypeError("Invalid or mismatched prediction");
    return {
      date: row.date, actual: row.requests, baseline: prediction.baseline, candidate: prediction.candidate,
      baselineAbsoluteError: round(Math.abs(row.requests - prediction.baseline)),
      candidateAbsoluteError: round(Math.abs(row.requests - prediction.candidate)),
    };
  });
  const totalAbsoluteErrors = {
    baseline: round(cases.reduce((sum, row) => sum + row.baselineAbsoluteError, 0)),
    candidate: round(cases.reduce((sum, row) => sum + row.candidateAbsoluteError, 0)),
  };
  const mae = { baseline: round(totalAbsoluteErrors.baseline / cases.length), candidate: round(totalAbsoluteErrors.candidate / cases.length) };
  return {
    metric: "mean absolute error", units: "requests per day", cases, totalAbsoluteErrors, mae,
    lowerMaeOnFixture: mae.baseline === mae.candidate ? "tie" : mae.baseline < mae.candidate ? "baseline" : "candidate",
  };
}

export function runExperiment(input) {
  const rows = validateRows(input);
  if (rows.length !== 42) throw new TypeError("This fixed exercise needs 28 training days and 14 evaluation days");
  const training = rows.slice(0, 28);
  const evaluation = rows.slice(28);
  const fitted = fitWorkloadModel(training);
  const predictions = forecast(fitted, evaluation.map(row => row.date));
  return {
    version: VERSION, provenance: "Entirely synthetic teaching data; not customer outcomes or a benchmark of general forecasting ability",
    training: { from: training[0].date, through: training.at(-1).date, days: training.length },
    evaluation: { from: evaluation[0].date, through: evaluation.at(-1).date, days: evaluation.length, origin: fitted.trainingEnd, fixedOrigin: true },
    fitted: { intercept: round(fitted.intercept), slopePerWeek: round(fitted.slope), weekdayOffsets: fitted.weekdayOffsets.map(round) },
    ...scoreForecast(evaluation, predictions),
    clippedPredictions: predictions.filter(row => row.clippedAtZero).length,
    releaseDecision: "NOT APPROVED — no real-world validation, uncertainty model or operational acceptance",
  };
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    if (process.argv.length > 3) throw new TypeError("Usage: node forecast.mjs [synthetic-workload.json]");
    const data = await readFile(process.argv[2] ?? new URL("./synthetic-workload.json", import.meta.url), "utf8");
    if (data.length > 1_000_000) throw new TypeError("Input file exceeds this lab's size limit");
    console.log(JSON.stringify(runExperiment(JSON.parse(data)), null, 2));
  } catch (error) {
    console.error("Forecast exercise failed: " + error.message);
    process.exitCode = 1;
  }
}
