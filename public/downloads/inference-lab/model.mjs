// A tiny fixed-weight linear model fitted to invented pairs (0,1),(1,3),(2,5).
// Mathematical teaching data only: these numbers have no business meaning.
export const MODEL = Object.freeze({ version: 'synthetic-linear-v1', weight: 2, bias: 1 });
export function predict(x) {
  if (typeof x !== 'number' || !Number.isFinite(x) || Math.abs(x) > 1000) throw new TypeError('x must be a finite number between -1000 and 1000');
  return MODEL.weight * x + MODEL.bias;
}
export function infer(payload) {
  if (!payload || typeof payload !== 'object' || Array.isArray(payload) || Object.keys(payload).join(',') !== 'inputs' ||
      !Array.isArray(payload.inputs) || payload.inputs.length < 1 || payload.inputs.length > 32) throw new TypeError('Provide only inputs: an array of 1–32 numbers');
  // Array.from visits holes too: direct JavaScript calls must not bypass validation.
  return { modelVersion: MODEL.version, outputs: Array.from(payload.inputs, predict) };
}
