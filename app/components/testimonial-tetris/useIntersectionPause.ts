/**
 * Intersection Observer Hook
 * Detects when the component enters/exits viewport
 * Copied and adapted from logo-shooter project
 */

import { useEffect, useRef, useState, type RefObject } from 'react';

interface UseIntersectionPauseOptions {
  threshold?: number;
  rootMargin?: string;
}

type UseIntersectionPauseReturn = [
  RefObject<HTMLDivElement | null>,
  boolean
];

export function useIntersectionPause(
  options: UseIntersectionPauseOptions = {}
): UseIntersectionPauseReturn {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold,
        rootMargin,
      }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [elementRef, isVisible];
}

