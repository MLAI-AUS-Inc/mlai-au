/**
 * SpaceBackground Component
 * Multi-layer parallax space background with nebula image
 * Creates depth through differential movement based on mouse position
 */

import type { ParallaxOffset } from './useMouseParallax';

interface SpaceBackgroundProps {
  parallaxOffset: ParallaxOffset;
  isPlaying: boolean;
}

const SPACE_BACKGROUND_URL =
  'https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Space%20bakground%20(1).jpg?alt=media&token=8a1e537b-4007-41b6-a74f-5759e4069ea2';

// Parallax multipliers for each layer (higher = more movement)
const LAYER_PARALLAX = {
  back: 0.03, // Background nebula
  mid: 0.05, // Subtle cloudy overlay
};

export function SpaceBackground({ parallaxOffset, isPlaying }: SpaceBackgroundProps) {
  // Calculate transform offsets based on mouse position
  const backOffsetX = parallaxOffset.x * LAYER_PARALLAX.back * 100;
  const backOffsetY = parallaxOffset.y * LAYER_PARALLAX.back * 100;
  const midOffsetX = parallaxOffset.x * LAYER_PARALLAX.mid * 100;
  const midOffsetY = parallaxOffset.y * LAYER_PARALLAX.mid * 100;

  return (
    <div className="absolute inset-0 overflow-hidden" style={{ zIndex: 0 }}>
      {/* Back layer - Main nebula image - fills entire section */}
      <div
        className="absolute transition-transform duration-100 ease-out"
        style={{
          inset: '-20%', // Extend well beyond container to fill on parallax
          backgroundImage: `url("${SPACE_BACKGROUND_URL}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          transform: `translate(${-backOffsetX}%, ${-backOffsetY}%)`,
        }}
      />

      {/* Mid layer - Subtle cloudy nebula overlay */}
      <div
        className="absolute transition-transform duration-75 ease-out"
        style={{
          inset: '-30%',
          backgroundImage: `url("${SPACE_BACKGROUND_URL}")`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.15, // Much more subtle
          filter: 'blur(4px) brightness(1.2)',
          transform: `scale(1.1) translate(${-midOffsetX}%, ${-midOffsetY}%)`,
          mixBlendMode: 'screen',
        }}
      />

      {/* Vignette overlay for depth */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.4) 100%)',
        }}
      />

      {/* Subtle pulsing animation overlay when playing */}
      {isPlaying && (
        <div
          className="absolute inset-0 pointer-events-none animate-pulse"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,100,50,0.05) 0%, transparent 70%)',
            animationDuration: '4s',
          }}
        />
      )}
    </div>
  );
}
