// Small supervised text classifier, implemented here in plain JavaScript.
// No downloaded weights, provider, network or inference about user identity.
export const MODEL_VERSION = 'event-intent-nb-v1';
const LABELS = ['time', 'location'];
export const tokens = text => text.toLowerCase().match(/[a-z]+/g) ?? [];

export function train(rows) {
  if (!Array.isArray(rows) || rows.length < 2 || rows.length > 200) throw new TypeError('Use 2–200 training rows');
  const vocabulary = new Set();
  const counts = Object.fromEntries(LABELS.map(label => [label, { documents: 0, total: 0, words: Object.create(null) }]));
  const seen = new Set();
  for (const row of rows) {
    if (!row || Object.keys(row).sort().join(',') !== 'intent,text' ||
        !LABELS.includes(row.intent) || typeof row.text !== 'string' || row.text.length > 500) throw new TypeError('Invalid training row');
    const words = tokens(row.text);
    const key = words.join(' ');
    if (!words.length || seen.has(key)) throw new TypeError('Empty or duplicate training text');
    seen.add(key);
    const group = counts[row.intent];
    group.documents++;
    for (const word of words) {
      vocabulary.add(word);
      group.words[word] = (group.words[word] ?? 0) + 1;
      group.total++;
    }
  }
  if (LABELS.some(label => !counts[label].documents)) throw new TypeError('Both intent classes need training examples');
  const trainingCount = rows.length;
  // Laplace smoothing: (class word count + 1) / (class token total + vocabulary size).
  // This closure captures training data only. Evaluation labels are never an input.
  return function classify(question) {
    if (typeof question !== 'string' || !question.trim() || question.length > 500) throw new TypeError('Invalid question');
    const words = tokens(question).filter(word => vocabulary.has(word));
    if (!words.length) return { intent: 'other', logMargin: 0 };
    const scores = LABELS.map(intent => {
      const group = counts[intent];
      return { intent, logScore: Math.log(group.documents / trainingCount) + words.reduce(
        (sum, word) => sum + Math.log(((group.words[word] ?? 0) + 1) / (group.total + vocabulary.size)), 0) };
    }).sort((left, right) => right.logScore - left.logScore);
    const margin = scores[0].logScore - scores[1].logScore;
    // A teaching cutoff, not a calibrated confidence or safety guarantee.
    return { intent: margin < 0.75 ? 'other' : scores[0].intent, logMargin: margin };
  };
}

export function rulesBaseline(question) {
  if (typeof question !== 'string') throw new TypeError('Question must be text');
  const time = /\b(time|start|begin|when)\b/i.test(question);
  const location = /\b(where|location|venue|address)\b/i.test(question);
  return { intent: time === location ? 'other' : time ? 'time' : 'location' };
}
