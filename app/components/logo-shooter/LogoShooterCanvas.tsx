/**
 * Logo Shooter Canvas Component
 * Handles rendering of logos and animation loop
 */

import { useEffect, useRef, useState } from 'react';
import type { Logo, LaserBeam } from './types';
import type { ParallaxOffset } from './useMouseParallax';
import { GAME_CONFIG, SPONSOR_LOGOS } from './logoData';
import { loadImage } from './utils';
import type { SponsorLogoData } from './types';

// Parallax multiplier for logos (they're in the "mid-ground")
const LOGO_PARALLAX_MULTIPLIER = 0.08;

interface LogoShooterCanvasProps {
  logos: Logo[];
  isPlaying: boolean;
  onUpdate: (deltaTime: number) => void;
  onClick: (x: number, y: number, width: number, height: number) => boolean;
  parallaxOffset: ParallaxOffset;
}

export function LogoShooterCanvas({
  logos,
  isPlaying,
  onUpdate,
  onClick,
  parallaxOffset,
}: LogoShooterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const [imageCache, setImageCache] = useState<Map<string, HTMLImageElement>>(new Map());
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);
  const [laserBeams, setLaserBeams] = useState<LaserBeam[]>([]);

  // ============================================
  // IMAGE LOADING - LOAD ALL ON MOUNT
  // ============================================
  useEffect(() => {
    // Get unique image paths from sponsor data
    const uniquePaths = Array.from(new Set(SPONSOR_LOGOS.map((l: SponsorLogoData) => l.imagePath)));

    const loadPromises = uniquePaths.map(async (path: string) => {
      try {
        // Skip local placeholders that might be missing in production/dev
        if (!path || path.startsWith('sponsor_logos/')) {
          return null;
        }

        const img = await loadImage(path);
        return [path, img] as const;
      } catch (error) {
        console.error(`Failed to load image: ${path}`, error);
        return null;
      }
    });

    Promise.all(loadPromises).then((results) => {
      setImageCache((prev) => {
        const newCache = new Map(prev);
        results.forEach((result) => {
          if (result) {
            newCache.set(result[0], result[1]);
          }
        });
        return newCache;
      });
    });
  }, []); // Only run once on mount

  // Handle canvas resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

    const animate = (currentTime: number) => {
      const deltaTime = lastTimeRef.current
        ? (currentTime - lastTimeRef.current) / 16.67 // Normalize to 60fps
        : 1;
      lastTimeRef.current = currentTime;

      // Update logo positions
      onUpdate(deltaTime);

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Calculate parallax offset for logos
      const logoParallaxX = parallaxOffset.x * LOGO_PARALLAX_MULTIPLIER * canvas.width;
      const logoParallaxY = parallaxOffset.y * LOGO_PARALLAX_MULTIPLIER * canvas.height;

      // Render logos
      logos.forEach((logo) => {
        renderLogo(ctx, logo, canvas.width, canvas.height, imageCache, logoParallaxX, logoParallaxY);
      });

      // Render laser beams
      laserBeams.forEach((laser) => {
        renderLaserBeam(ctx, laser);
      });

      // Cleanup old laser beams (fade out after 200ms - fast!)
      setLaserBeams((prev) => prev.filter((laser) => Date.now() - laser.createdAt < 200));

      // Draw crosshair cursor if mouse is over canvas
      if (cursorPos) {
        drawCrosshair(ctx, cursorPos.x, cursorPos.y);
      }

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isPlaying, logos, onUpdate, imageCache, cursorPos, parallaxOffset, laserBeams]);

  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Create DUAL laser beams from bottom corners converging at target
    const bottomY = canvas.height * 0.95; // Near bottom of screen
    const leftX = canvas.width * 0.15; // Bottom-left corner (15% from left)
    const rightX = canvas.width * 0.85; // Bottom-right corner (85% from left)

    const wasHit = onClick(x, y, canvas.width, canvas.height);

    const timestamp = Date.now();

    // Left laser beam
    const leftLaser: LaserBeam = {
      id: `laser-left-${timestamp}-${Math.random()}`,
      startX: leftX,
      startY: bottomY,
      endX: x,
      endY: y,
      createdAt: timestamp,
      isHit: wasHit,
    };

    // Right laser beam
    const rightLaser: LaserBeam = {
      id: `laser-right-${timestamp}-${Math.random()}`,
      startX: rightX,
      startY: bottomY,
      endX: x,
      endY: y,
      createdAt: timestamp,
      isHit: wasHit,
    };

    setLaserBeams((prev) => [...prev, leftLaser, rightLaser]);

    // Play shoot sound
    playShootSound(wasHit);
  };

  // Track cursor position
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setCursorPos({ x, y });
  };

  const handleMouseLeave = () => {
    setCursorPos(null);
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        onMouseMove={isPlaying ? handleMouseMove : undefined}
        onMouseLeave={handleMouseLeave}
        className={`w-full h-full ${isPlaying ? 'cursor-none' : 'cursor-pointer'}`}
      />
    </div>
  );
}

/**
 * Render a single logo on the canvas
 */
function renderLogo(
  ctx: CanvasRenderingContext2D,
  logo: Logo,
  canvasWidth: number,
  canvasHeight: number,
  imageCache: Map<string, HTMLImageElement>,
  parallaxX: number = 0,
  parallaxY: number = 0
) {
  // Apply perspective projection - logos move outward from center as they approach
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;

  // Base position (where the logo would be at z=0)
  const baseX = (logo.x / 100) * canvasWidth;
  const baseY = (logo.y / 100) * canvasHeight;

  // Direction from center (normalized to canvas size)
  const dirX = (baseX - centerX) / canvasWidth;
  const dirY = (baseY - centerY) / canvasHeight;

  // Perspective scale based on z (0 = far, 100 = close)
  // Use exponential scaling for dramatic "fly past" effect
  const zNormalized = logo.z / GAME_CONFIG.Z_NEAR; // 0 to 1
  const perspectiveScale = 1 + Math.pow(zNormalized, 1.6) * 4;

  // Apply perspective projection - logos accelerate outward from center
  const screenX = centerX + dirX * canvasWidth * perspectiveScale - parallaxX;
  const screenY = centerY + dirY * canvasHeight * perspectiveScale - parallaxY;

  // Calculate size based on scale with more dramatic scaling
  const size = GAME_CONFIG.BASE_LOGO_SIZE * logo.scale;

  // Depth-based opacity: fade in as logos approach
  const depthOpacity = 0.3 + zNormalized * 0.7;

  ctx.save();

  // Apply depth-based opacity (far logos are more transparent)
  ctx.globalAlpha = depthOpacity;

  const img = imageCache.get(logo.imagePath);

  if (img) {
    // === RENDER IMAGE ===

    if (logo.isHit) {
      // Hit state: Glow effect behind image
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 30 * logo.scale;
      ctx.globalAlpha = 1; // Full opacity for hit effect
    } else {
      ctx.shadowBlur = 0;
    }

    // Draw the image centered at coordinates
    // Ensure aspect ratio is preserved if needed, or simply fit to square
    // For simplicity, we draw it as a square since logos are usually comparable
    ctx.drawImage(
      img,
      screenX - size / 2,
      screenY - size / 2,
      size,
      size
    );

  } else {
    // === RENDER PLACEHOLDER (Fallback) ===

    // Apply visual effects based on hit state
    if (logo.isHit) {
      // Hit state: bright color with glow
      ctx.fillStyle = '#00ff88';
      ctx.shadowColor = '#00ff88';
      ctx.shadowBlur = 20 * logo.scale;
      ctx.globalAlpha = 1; // Full opacity for hit effect
    } else {
      // Normal state: white/light gray
      ctx.fillStyle = '#ffffff';
      ctx.shadowBlur = 0;
    }

    // Draw rectangle as logo placeholder
    ctx.fillRect(
      screenX - size / 2,
      screenY - size / 2,
      size,
      size
    );

    // Draw logo name text
    ctx.fillStyle = logo.isHit ? '#000000' : '#ff3d00';
    ctx.font = `bold ${Math.max(10, size / 6)}px Arial`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.shadowBlur = 0;

    // Wrap text if too long
    const maxWidth = size * 0.9;
    const words = logo.name.split(' ');
    if (words.length > 1 && ctx.measureText(logo.name).width > maxWidth) {
      // Multi-line text
      const lineHeight = size / 6;
      words.forEach((word, index) => {
        const yOffset = (index - words.length / 2 + 0.5) * lineHeight;
        ctx.fillText(word, screenX, screenY + yOffset, maxWidth);
      });
    } else {
      // Single line
      ctx.fillText(logo.name, screenX, screenY, maxWidth);
    }
  }

  ctx.restore();

  // Draw hit indicator ring
  if (logo.isHit && logo.hitTime) {
    const timeSinceHit = Date.now() - logo.hitTime;
    if (timeSinceHit < 500) {
      ctx.save();
      ctx.strokeStyle = '#00ff88';
      ctx.lineWidth = 3;
      ctx.globalAlpha = 1 - timeSinceHit / 500;
      ctx.beginPath();
      ctx.arc(screenX, screenY, size / 2 + 10, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    }
  }
}

/**
 * Draw crosshair cursor
 */
function drawCrosshair(ctx: CanvasRenderingContext2D, x: number, y: number) {
  ctx.save();

  // Draw black outline for better visibility
  ctx.strokeStyle = '#000000';
  ctx.lineWidth = 3;
  ctx.globalAlpha = 0.5;

  const size = 20;

  // Horizontal line
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.stroke();

  // Vertical line
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.stroke();

  // Draw white crosshair on top
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 2;
  ctx.globalAlpha = 1;

  // Horizontal line
  ctx.beginPath();
  ctx.moveTo(x - size, y);
  ctx.lineTo(x + size, y);
  ctx.stroke();

  // Vertical line
  ctx.beginPath();
  ctx.moveTo(x, y - size);
  ctx.lineTo(x, y + size);
  ctx.stroke();

  // Center circle
  ctx.beginPath();
  ctx.arc(x, y, 4, 0, Math.PI * 2);
  ctx.stroke();

  ctx.restore();
}

/**
 * Render laser beam
 */
function renderLaserBeam(ctx: CanvasRenderingContext2D, laser: LaserBeam) {
  const age = Date.now() - laser.createdAt;
  const fadeOutStart = 80; // Start fading after 80ms (faster!)
  const totalDuration = 200; // Total duration 200ms (faster!)

  // Calculate opacity (full brightness for 80ms, then fade out)
  let opacity = 1;
  if (age > fadeOutStart) {
    opacity = 1 - (age - fadeOutStart) / (totalDuration - fadeOutStart);
  }

  if (opacity <= 0) return;

  ctx.save();

  // Use green for all laser shots (no distinction between hit/miss)
  const laserColor = '#00ff88'; // Bright green for all shots

  // Draw outer glow
  ctx.strokeStyle = laserColor;
  ctx.lineWidth = 4;
  ctx.globalAlpha = opacity * 0.3;
  ctx.shadowColor = laserColor;
  ctx.shadowBlur = 20;

  ctx.beginPath();
  ctx.moveTo(laser.startX, laser.startY);
  ctx.lineTo(laser.endX, laser.endY);
  ctx.stroke();

  // Draw core beam (brighter, thinner)
  ctx.lineWidth = 2;
  ctx.globalAlpha = opacity;
  ctx.shadowBlur = 10;

  ctx.beginPath();
  ctx.moveTo(laser.startX, laser.startY);
  ctx.lineTo(laser.endX, laser.endY);
  ctx.stroke();

  // Draw muzzle flash at start point (only for first 40ms - faster!)
  if (age < 40) {
    const flashOpacity = 1 - age / 40;
    ctx.globalAlpha = flashOpacity * opacity;
    ctx.fillStyle = laserColor;
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(laser.startX, laser.startY, 6, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw impact flash at end point (only for first 40ms on hits - faster!)
  if (laser.isHit && age < 40) {
    const flashOpacity = 1 - age / 40;
    ctx.globalAlpha = flashOpacity * opacity;
    ctx.fillStyle = laser.isHit ? '#00ff88' : laserColor;
    ctx.shadowBlur = 35;
    ctx.beginPath();
    ctx.arc(laser.endX, laser.endY, 10, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.restore();
}

/**
 * Play shoot sound effect
 * Using Web Audio API to generate laser sound
 */
function playShootSound(isHit: boolean) {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create oscillator for laser sound
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Laser shoot sound: quick frequency sweep
    oscillator.type = 'sawtooth';
    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.exponentialRampToValueAtTime(200, audioContext.currentTime + 0.1);

    // Volume envelope: quick attack and decay
    gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);

    // Play hit sound if target was hit
    if (isHit) {
      setTimeout(() => playHitSound(), 50);
    }
  } catch (error) {
    // Silently fail if Web Audio API is not supported
    console.warn('Audio playback failed:', error);
  }
}

/**
 * Play hit/explosion sound effect
 */
function playHitSound() {
  try {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();

    // Create noise for explosion effect
    const bufferSize = audioContext.sampleRate * 0.2; // 200ms
    const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate);
    const data = buffer.getChannelData(0);

    // Generate noise that fades out
    for (let i = 0; i < bufferSize; i++) {
      const decay = 1 - i / bufferSize;
      data[i] = (Math.random() * 2 - 1) * decay * 0.3;
    }

    const source = audioContext.createBufferSource();
    source.buffer = buffer;

    // Add filter for more "explosion-like" sound
    const filter = audioContext.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(400, audioContext.currentTime);

    const gainNode = audioContext.createGain();
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

    source.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(audioContext.destination);

    source.start(audioContext.currentTime);
  } catch (error) {
    // Silently fail if Web Audio API is not supported
    console.warn('Audio playback failed:', error);
  }
}
