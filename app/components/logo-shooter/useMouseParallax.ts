/**
 * useMouseParallax Hook
 * Tracks mouse position relative to container center for parallax effects
 * Returns normalized offset values (-1 to 1) for X and Y axes
 */

import { useState, useCallback, useRef, useEffect } from 'react';

export interface ParallaxOffset {
  x: number; // -1 (left) to 1 (right)
  y: number; // -1 (top) to 1 (bottom)
  isActive: boolean; // Whether mouse is over the container
}

interface UseMouseParallaxOptions {
  smoothing?: number; // 0-1, higher = smoother transitions (default: 0.1)
  enabled?: boolean;
}

export function useMouseParallax(options: UseMouseParallaxOptions = {}) {
  const { smoothing = 0.1, enabled = true } = options;

  const [offset, setOffset] = useState<ParallaxOffset>({
    x: 0,
    y: 0,
    isActive: false,
  });

  const targetRef = useRef({ x: 0, y: 0 });
  const currentRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);
  const containerRef = useRef<HTMLDivElement>(null);

  // Smooth animation loop
  useEffect(() => {
    if (!enabled) return;

    const animate = () => {
      // Lerp towards target
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * smoothing;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * smoothing;

      // Only update state if there's meaningful change
      const dx = Math.abs(currentRef.current.x - offset.x);
      const dy = Math.abs(currentRef.current.y - offset.y);

      if (dx > 0.001 || dy > 0.001) {
        setOffset(prev => ({
          ...prev,
          x: currentRef.current.x,
          y: currentRef.current.y,
        }));
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [enabled, smoothing, offset.x, offset.y]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!enabled) return;

    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    // Get mouse position relative to container
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    // Calculate normalized offset from center (-1 to 1)
    targetRef.current.x = (mouseX - centerX) / centerX;
    targetRef.current.y = (mouseY - centerY) / centerY;

    // Clamp values
    targetRef.current.x = Math.max(-1, Math.min(1, targetRef.current.x));
    targetRef.current.y = Math.max(-1, Math.min(1, targetRef.current.y));
  }, [enabled]);

  const handleMouseEnter = useCallback(() => {
    setOffset(prev => ({ ...prev, isActive: true }));
  }, []);

  const handleMouseLeave = useCallback(() => {
    // Reset to center when mouse leaves
    targetRef.current.x = 0;
    targetRef.current.y = 0;
    setOffset(prev => ({ ...prev, isActive: false }));
  }, []);

  return {
    containerRef,
    offset,
    handlers: {
      onMouseMove: handleMouseMove,
      onMouseEnter: handleMouseEnter,
      onMouseLeave: handleMouseLeave,
    },
  };
}
