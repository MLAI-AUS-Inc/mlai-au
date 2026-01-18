/**
 * Hook to detect prefers-reduced-motion media query
 * Returns true if user prefers reduced motion
 */

import { useEffect, useState } from "react";

export function usePrefersReducedMotion(): boolean {
  // Initialize from matchMedia immediately to avoid hydration flash
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(() => {
    if (typeof window === "undefined") {
      return false;
    }
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  useEffect(() => {
    // Check if window is available (SSR safety)
    if (typeof window === "undefined") {
      return;
    }

    // Check media query
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Update if initial value was wrong (shouldn't happen, but safety check)
    if (prefersReducedMotion !== mediaQuery.matches) {
      setPrefersReducedMotion(mediaQuery.matches);
    }

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}
