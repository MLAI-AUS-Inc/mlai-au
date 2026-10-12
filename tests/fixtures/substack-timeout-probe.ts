import { fetchSubstackPosts } from "../../app/lib/substack";
const realTimeout = AbortSignal.timeout.bind(AbortSignal);
let requestedTimeoutMs = 0;
let receivedSignal = false;
let aborted = false;
let loggedFailure = false;
// Accelerate the real signal; verify the production timeout request separately.
AbortSignal.timeout = milliseconds => { requestedTimeoutMs = milliseconds; return realTimeout(20); };
console.error = () => { loggedFailure = true; };
globalThis.fetch = async (_url, init) => {
  const signal = init?.signal;
  receivedSignal = signal instanceof AbortSignal;
  return new Promise<Response>((_resolve, reject) => {
    if (!signal) return reject(new Error("Feed has no timeout signal"));
    signal.addEventListener("abort", () => { aborted = true; reject(signal.reason); }, { once: true });
  });
};
const fallback = await fetchSubstackPosts(971);
console.log(JSON.stringify({ requestedTimeoutMs, receivedSignal, aborted, fallback, loggedFailure }));
