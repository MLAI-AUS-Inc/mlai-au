interface CacheEntry<T> {
  expiresAt: number;
  value: T;
}

// Only completed, public feed data may outlive a request. In Workers, a pending
// fetch/body/timer belongs to the request that created it; sharing its promise
// can strand later renders when that request completes or is canceled.
const cacheStore = new Map<string, CacheEntry<unknown>>();

export async function getCachedValue<T>(
  key: string,
  ttlMs: number,
  loader: () => Promise<T>,
  emptyValue: T,
  onError?: (error: unknown) => void,
): Promise<T> {
  const now = Date.now();
  const cached = cacheStore.get(key) as CacheEntry<T> | undefined;

  if (cached && cached.expiresAt > now) {
    return cached.value;
  }

  try {
    const value = await loader();
    cacheStore.set(key, {
      expiresAt: Date.now() + ttlMs,
      value,
    });
    return value;
  } catch (error) {
    onError?.(error);
    // Another request may have refreshed the feed while this one failed. Keep
    // that success rather than deleting it or replacing it with an older value.
    const fallback = (cacheStore.get(key) as CacheEntry<T> | undefined) ?? cached;
    return fallback ? fallback.value : emptyValue;
  }
}
