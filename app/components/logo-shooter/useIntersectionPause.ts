/**
 * Intersection Observer Hook
 * Automatically pauses the game when the section is not visible
 */

import { useEffect, useRef, useState } from 'react';

interface UseIntersectionPauseOptions {
  threshold?: number;
  rootMargin?: string;
}

export function useIntersectionPause(
  options: UseIntersectionPauseOptions = {}
): [React.RefObject<HTMLDivElement | null>, boolean] {
  const { threshold = 0.1, rootMargin = '0px' } = options;
  const elementRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting);
        });
      },
      { threshold, rootMargin }
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
    };
  }, [threshold, rootMargin]);

  return [elementRef, isVisible];
}

