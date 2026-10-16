const POLL_MS = 25_000;
const MAX_BACKOFF_MS = 5 * 60_000;

type Clock = {
  now: () => number;
  setTimeout: (callback: () => void, delay: number) => unknown;
  clearTimeout: (timer: unknown) => void;
};

function errorField(error: unknown, key: string): unknown {
  return error && typeof error === "object"
    ? (error as Record<string, unknown>)[key]
    : undefined;
}

/** One company owns each poller. A stopped poller cannot deliver a late result. */
export function startActiveDraftRunPolling<T>({
  companyId,
  load,
  onRun,
  clock = {
    now: Date.now,
    setTimeout: (callback, delay) => globalThis.setTimeout(callback, delay),
    clearTimeout: (timer) => globalThis.clearTimeout(timer as ReturnType<typeof setTimeout>),
  },
}: {
  companyId: string | null;
  load: (companyId: string) => Promise<T>;
  onRun: (run: T | null) => void;
  clock?: Clock;
}) {
  let stopped = false;
  let blocked = false;
  let inFlight = false;
  let failures = 0;
  let retryAt = 0;
  let timer: unknown;
  const clearTimer = () => {
    if (timer !== undefined) clock.clearTimeout(timer);
    timer = undefined;
  };
  const poll = async () => {
    if (!companyId || stopped || blocked || inFlight || clock.now() < retryAt) return;
    clearTimer();
    inFlight = true;
    let delay = POLL_MS;
    try {
      const run = await load(companyId);
      if (stopped) return;
      failures = 0;
      retryAt = 0;
      onRun(run);
    } catch (error) {
      if (stopped) return;
      const status = errorField(error, "status");
      if (typeof status === "number" && status >= 400 && status < 500 && ![408, 425, 429].includes(status)) {
        blocked = true;
        onRun(null);
        return;
      }
      failures++;
      const retryAfter = errorField(error, "retryAfterSeconds");
      delay = Math.min(MAX_BACKOFF_MS, Math.max(
        POLL_MS * 2 ** Math.min(failures - 1, 4),
        typeof retryAfter === "number" && Number.isFinite(retryAfter) ? retryAfter * 1000 : 0,
      ));
      retryAt = clock.now() + delay;
    } finally {
      inFlight = false;
      if (!stopped && !blocked) timer = clock.setTimeout(() => void poll(), delay);
    }
  };
  void poll();
  return {
    /** A deliberate refresh may retry after the owner fixes access or setup. */
    refresh() {
      if (stopped || inFlight) return;
      blocked = false;
      failures = 0;
      retryAt = 0;
      void poll();
    },
    /** Focus respects terminal failures and the current transient backoff. */
    focus() { void poll(); },
    stop() { stopped = true; clearTimer(); },
  };
}
