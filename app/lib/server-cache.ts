interface CacheEntry<T> {
  expiresAt: number;
  hasValue: boolean;
  pending?: Promise<T>;
  value?: T;
}

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

  if (cached?.hasValue && cached.expiresAt > now) {
    return cached.value as T;
  }

  if (cached?.pending) {
    return cached.pending.catch((error) => {
      if (cached.hasValue) return cached.value as T;
      onError?.(error);
      return emptyValue;
    });
  }

  const pending = loader()
    .then((value) => {
      cacheStore.set(key, {
        expiresAt: Date.now() + ttlMs,
        hasValue: true,
        value,
      });
      return value;
    })
    .catch((error) => {
      onError?.(error);
      if (cached?.hasValue) {
        cacheStore.set(key, {
          expiresAt: cached.expiresAt,
          hasValue: true,
          value: cached.value,
        });
        return cached.value as T;
      }
      cacheStore.delete(key);
      return emptyValue;
    });

  cacheStore.set(key, {
    expiresAt: cached?.expiresAt ?? 0,
    hasValue: cached?.hasValue ?? false,
    pending,
    value: cached?.value,
  });

  return pending;
}
