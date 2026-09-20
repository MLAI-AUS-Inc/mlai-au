import { createContext, useContext, useSyncExternalStore } from "react";

// A loader-owned timestamp is serialized with the page. Server rendering and
// hydration use the same minute; open tabs then update without republishing.
export const ArticleReadTime = createContext<string | null>(null);
const subscribe = (notify: () => void) => {
  const timer = window.setInterval(notify, 1000);
  return () => window.clearInterval(timer);
};
const clientMinute = () => Math.floor(Date.now() / 60000) * 60000;

export function useArticleReadMinute() {
  const initial = useContext(ArticleReadTime);
  const parsed = initial ? Date.parse(initial) : NaN;
  const serverMinute = Number.isFinite(parsed) ? Math.floor(parsed / 60000) * 60000 : null;
  return useSyncExternalStore(subscribe, clientMinute, () => serverMinute);
}
