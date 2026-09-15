import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const ArticleHydration = createContext({ ready: true, markReady: () => {} });

/** Key this scope by slug so readiness cannot leak across article navigation. */
export function ArticleHydrationScope({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const markReady = useCallback(() => setReady(true), []);
  const value = useMemo(() => ({ ready, markReady }), [ready, markReady]);
  return <ArticleHydration.Provider value={value}>{children}</ArticleHydration.Provider>;
}

/** Must be INSIDE the body's Suspense boundary, not in its already-hydrated parent. */
export function ArticleHydrationCommit({ children }: { children: ReactNode }) {
  const { markReady } = useContext(ArticleHydration);
  useEffect(markReady, [markReady]);
  return children;
}

export function useArticleHydrated() {
  return useContext(ArticleHydration).ready;
}
