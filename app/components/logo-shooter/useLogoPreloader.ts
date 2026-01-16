/**
 * Hook for preloading logo images before the game starts
 * Allows triggering preload from parent component (e.g., on hover)
 */

import { useState, useRef, useCallback } from 'react';
import { SPONSOR_LOGOS } from './logoData';
import { loadImage } from './utils';

export interface PreloadState {
  status: 'idle' | 'loading' | 'loaded';
  loaded: number;
  total: number;
}

export function useLogoPreloader() {
  const imageCacheRef = useRef<Map<string, HTMLImageElement>>(new Map());
  const [loadingState, setLoadingState] = useState<PreloadState>({
    status: 'idle',
    loaded: 0,
    total: 0,
  });

  const preloadLogos = useCallback(async () => {
    // If already loaded or loading, don't restart
    if (loadingState.status !== 'idle') {
      return imageCacheRef.current;
    }

    // Get unique image paths (skip local placeholders)
    const uniquePaths = Array.from(
      new Set(SPONSOR_LOGOS.map((logo) => logo.imagePath))
    ).filter((path) => path && !path.startsWith('sponsor_logos/'));

    setLoadingState({
      status: 'loading',
      loaded: 0,
      total: uniquePaths.length,
    });

    // Load all images in parallel
    await Promise.all(
      uniquePaths.map(async (path) => {
        try {
          const img = await loadImage(path);
          imageCacheRef.current.set(path, img);
        } catch (e) {
          // Failed to load - will show placeholder in game
          console.warn(`Failed to preload logo: ${path}`, e);
        }
        // Always increment progress (even on failure) to avoid stuck loader
        setLoadingState((prev) => ({
          ...prev,
          loaded: prev.loaded + 1,
        }));
      })
    );

    setLoadingState((prev) => ({
      ...prev,
      status: 'loaded',
    }));

    return imageCacheRef.current;
  }, [loadingState.status]);

  return {
    preloadLogos,
    loadingState,
    imageCache: imageCacheRef.current,
  };
}
