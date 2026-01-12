/**
 * Logo Shooter Canvas Component
 * Handles rendering of logos and animation loop
 */

import { useEffect, useRef, useState } from 'react';
import type { Logo } from './types';
import { GAME_CONFIG } from './logoData';

interface LogoShooterCanvasProps {
  logos: Logo[];
  isPlaying: boolean;
  onUpdate: (deltaTime: number) => void;
  onClick: (x: number, y: number, width: number, height: number) => void;
}

export function LogoShooterCanvas({
  logos,
  isPlaying,
  onUpdate,
  onClick,
}: LogoShooterCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | undefined>(undefined);
  const lastTimeRef = useRef<number>(0);
  const [imageCache, setImageCache] = useState<Map<string, HTMLImageElement>>(new Map());
  const [cursorPos, setCursorPos] = useState<{ x: number; y: number } | null>(null);

  // ============================================
  // IMAGE LOADING - CURRENTLY DISABLED
  // ============================================
  // TODO: Uncomment this block when logo images are available in public/sponsor_logos/
  // See README.md for detailed instructions
  // ============================================
  useEffect(() => {
    // TEMPORARY: Skip image loading, using text placeholders
    setImageCache(new Map());
    
    // UNCOMMENT THIS CODE BLOCK TO ENABLE ACTUAL LOGO IMAGES:
    /*
    const uniqueLogos = Array.from(new Set(logos.map(l => l.imagePath)));
    const loadPromises = uniqueLogos.map(async (path) => {
      try {
        const img = await loadImage(path);
        return [path, img] as const;
      } catch (error) {
        console.error(`Failed to load image: ${path}`, error);
        return null;
      }
    });

    Promise.all(loadPromises).then((results) => {
      const newCache = new Map<string, HTMLImageElement>();
      results.forEach((result) => {
        if (result) {
          newCache.set(result[0], result[1]);
        }
      });
      setImageCache(newCache);
    });
    */
  }, [logos]);

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

      // Render logos
      logos.forEach((logo) => {
        renderLogo(ctx, logo, canvas.width, canvas.height, imageCache);
      });

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
  }, [isPlaying, logos, onUpdate, imageCache, cursorPos]);

  // Handle click
  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    onClick(x, y, canvas.width, canvas.height);
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
 * 
 * CURRENT: Using colored rectangles with text (placeholders)
 * TODO: Switch to actual images when available - see README.md
 */
function renderLogo(
  ctx: CanvasRenderingContext2D,
  logo: Logo,
  canvasWidth: number,
  canvasHeight: number,
  imageCache: Map<string, HTMLImageElement>
) {
  // Convert percentage position to screen coordinates
  const screenX = (logo.x / 100) * canvasWidth;
  const screenY = (logo.y / 100) * canvasHeight;

  // Calculate size based on scale
  const size = GAME_CONFIG.BASE_LOGO_SIZE * logo.scale;

  ctx.save();

  // Apply visual effects based on hit state
  if (logo.isHit) {
    // Hit state: bright color with glow
    ctx.fillStyle = '#00ff88';
    ctx.shadowColor = '#00ff88';
    ctx.shadowBlur = 20 * logo.scale;
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

