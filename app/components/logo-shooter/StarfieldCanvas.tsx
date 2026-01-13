/**
 * StarfieldCanvas Component
 * Procedurally generated starfield that creates the "flying through space" effect
 * Stars move toward the viewer with varying speeds based on their depth layer
 */

import { useEffect, useRef, useCallback } from 'react';
import type { ParallaxOffset } from './useMouseParallax';

interface Star {
  x: number; // 0-1 normalized position
  y: number;
  z: number; // depth (0 = far, 1 = close)
  speed: number;
  size: number;
  brightness: number;
  layer: 'far' | 'mid' | 'near' | 'streak' | 'hyperstreak'; // Depth layer for parallax
}

interface StarfieldCanvasProps {
  isPlaying: boolean;
  parallaxOffset: ParallaxOffset;
  starCount?: number;
  baseSpeed?: number;
}

// Parallax multipliers per layer - higher = more movement
const LAYER_PARALLAX = {
  far: 0.02,        // Distant stars - subtle movement
  mid: 0.06,        // Mid-distance stars - moderate movement
  near: 0.12,       // Close stars - significant movement
  streak: 0.18,     // Fast streaking stars - high movement
  hyperstreak: 0.25, // Ultra-fast stars zooming past
};

export function StarfieldCanvas({
  isPlaying,
  parallaxOffset,
  starCount = 150,
  baseSpeed = 0.002,
}: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const animationFrameRef = useRef<number | undefined>(undefined);

  // Initialize stars
  const initializeStars = useCallback(() => {
    const stars: Star[] = [];
    for (let i = 0; i < starCount; i++) {
      stars.push(createStar());
    }
    starsRef.current = stars;
  }, [starCount]);

  // Create a single star with random properties
  function createStar(atBack = false): Star {
    // Assign to a layer based on random distribution
    // More far stars than near stars for realistic depth
    const layerRoll = Math.random();
    const layer: 'far' | 'mid' | 'near' | 'streak' | 'hyperstreak' =
      layerRoll < 0.35 ? 'far' :
      layerRoll < 0.6 ? 'mid' :
      layerRoll < 0.8 ? 'near' :
      layerRoll < 0.93 ? 'streak' : 'hyperstreak'; // 7% hyperstreak, 13% streak

    // Size based on layer (far = tiny, hyperstreak = bright streaks)
    const baseSize =
      layer === 'far' ? 0.5 :
      layer === 'mid' ? 1 :
      layer === 'near' ? 1.5 :
      layer === 'streak' ? 2 :
      2.5; // hyperstreak stars are largest

    // Speed based on layer - hyperstreak stars are extremely fast
    const speed =
      layer === 'far' ? 0.4 :
      layer === 'mid' ? 0.7 :
      layer === 'near' ? 1.0 :
      layer === 'streak' ? 2.5 :
      4.5; // hyperstreak stars zoom past

    return {
      x: Math.random(),
      y: Math.random(),
      z: atBack ? 0 : Math.random(), // New stars start at back
      speed,
      size: baseSize + Math.random() * 0.5, // Small variation
      brightness:
        layer === 'far' ? 0.3 + Math.random() * 0.3 :
        layer === 'streak' ? 0.8 + Math.random() * 0.2 :
        layer === 'hyperstreak' ? 0.9 + Math.random() * 0.1 : // hyperstreak very bright
        0.5 + Math.random() * 0.5,
      layer,
    };
  }

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const parent = canvas.parentElement;
      if (!parent) return;

      const rect = parent.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize stars on mount
  useEffect(() => {
    initializeStars();
  }, [initializeStars]);

  // Animation loop
  useEffect(() => {
    if (!isPlaying) {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const animate = () => {
      const { width, height } = canvas;

      // Clear with transparent background (nebula shows through)
      ctx.clearRect(0, 0, width, height);

      // Update and render stars
      starsRef.current.forEach((star, index) => {
        // Move star toward viewer (increase z) - increased speed
        star.z += baseSpeed * star.speed * 1.2;

        // If star passed the viewer, respawn at back
        if (star.z >= 1) {
          starsRef.current[index] = createStar(true);
          return;
        }

        // Get parallax multiplier based on layer
        const layerParallax = LAYER_PARALLAX[star.layer];
        const offsetX = parallaxOffset.x * layerParallax * 100;
        const offsetY = parallaxOffset.y * layerParallax * 100;

        // Project 3D position to 2D screen
        // Stars move outward from center as they get closer
        const centerX = 0.5;
        const centerY = 0.5;

        // Direction from center
        const dirX = star.x - centerX;
        const dirY = star.y - centerY;

        // Scale outward based on z (closer = more stretched from center)
        const scale = 1 + star.z * 1.5;
        const screenX = (centerX + dirX * scale) * width - offsetX;
        const screenY = (centerY + dirY * scale) * height - offsetY;

        // Simple white dot - size based on layer
        const size = star.size * (0.8 + star.z * 0.5);

        // Brightness/opacity based on layer and z
        const alpha = star.brightness * (0.4 + star.z * 0.6);

        // Draw simple white dot
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(screenX, screenY, size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, parallaxOffset, baseSpeed]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
