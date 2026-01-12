/**
 * Tetris Canvas Component
 * Renders the game board using HTML5 Canvas
 */

import { useEffect, useRef } from 'react';
import type { GameState, GamePiece, LockedCell, Testimonial } from './types';
import { GAME_CONFIG, TETRIS_COLORS, TESTIMONIALS } from './testimonialData';
import { getRotatedShape } from './tetrisLogic';
import { getInitials, getTextColor } from './utils';

interface TetrisCanvasProps {
  gameState: GameState;
  onCellClick?: (testimonialId: number) => void;
}

export function TetrisCanvas({ gameState, onCellClick }: TetrisCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // ============================================
  // CANVAS RESIZE
  // ============================================

  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;

      // Calculate cell size to fit container
      const cellWidth = Math.floor(containerWidth / GAME_CONFIG.GRID_COLS);
      const cellHeight = Math.floor(containerHeight / GAME_CONFIG.GRID_ROWS);
      const cellSize = Math.min(cellWidth, cellHeight);

      canvas.width = cellSize * GAME_CONFIG.GRID_COLS;
      canvas.height = cellSize * GAME_CONFIG.GRID_ROWS;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // ============================================
  // RENDER LOOP
  // ============================================

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GAME_CONFIG.GRID_COLS;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw clean background (no grid lines - matching original design)
    ctx.fillStyle = '#f5f3eb'; // Brutalist beige
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw locked pieces with testimonial styling
    gameState.grid.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        if (cell) {
          drawLockedCell(ctx, colIndex, rowIndex, cellSize, cell, null);
        }
      });
    });

    // Draw testimonial text on top of locked blocks
    drawTestimonialText(ctx, gameState.grid, cellSize);

    // Draw current falling piece (solid color, no text)
    if (gameState.currentPiece && gameState.mode === 'playing') {
      drawPiece(ctx, gameState.currentPiece, cellSize);
    }

    // Draw animating cleared lines
    if (gameState.isAnimatingClear) {
      drawClearAnimation(ctx, gameState.grid, cellSize);
    }
  }, [gameState]);

  // ============================================
  // CLICK HANDLER
  // ============================================

  const handleClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!onCellClick) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const cellSize = canvas.width / GAME_CONFIG.GRID_COLS;
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);

    const cell = gameState.grid[row]?.[col];
    if (cell) {
      onCellClick(cell.testimonialId);
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full"
      style={{ height: '400px' }}
    >
      <canvas
        ref={canvasRef}
        onClick={handleClick}
        className="w-full h-full cursor-pointer"
        style={{
          border: '2px solid #1a1a1a',
          borderRadius: '16px',
        }}
      />
    </div>
  );
}

// ============================================
// RENDERING HELPERS
// ============================================

/**
 * Wrap text to fit within a given width
 */
function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let currentLine = '';

  for (const word of words) {
    const testLine = currentLine + word + ' ';
    const metrics = ctx.measureText(testLine);
    
    if (metrics.width > maxWidth && currentLine.length > 0) {
      lines.push(currentLine.trim());
      currentLine = word + ' ';
    } else {
      currentLine = testLine;
    }
  }
  
  if (currentLine.length > 0) {
    lines.push(currentLine.trim());
  }
  
  return lines;
}

/**
 * Draw a locked cell - DISABLED (we draw entire blocks in drawTestimonialText)
 */
function drawLockedCell(
  ctx: CanvasRenderingContext2D,
  col: number,
  row: number,
  cellSize: number,
  cell: LockedCell,
  testimonial: any
) {
  // Do nothing - we draw the entire testimonial block as ONE shape in drawTestimonialText
}

/**
 * Draw testimonial text on top of locked blocks
 */
function drawTestimonialText(
  ctx: CanvasRenderingContext2D,
  grid: (LockedCell | null)[][],
  cellSize: number
) {
  // Find unique testimonial blocks (top-left cell of each block)
  const processed = new Set<string>();
  
  grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell || processed.has(`${rowIndex},${colIndex}`)) return;
      
      // Find the bounds of this testimonial block
      const testimonialId = cell.testimonialId;
      const blockCells: [number, number][] = [];
      
      // Flood fill to find all cells of this testimonial
      const queue: [number, number][] = [[rowIndex, colIndex]];
      const visited = new Set<string>();
      
      while (queue.length > 0) {
        const [r, c] = queue.shift()!;
        const key = `${r},${c}`;
        
        if (visited.has(key)) continue;
        if (r < 0 || r >= grid.length || c < 0 || c >= grid[0].length) continue;
        if (!grid[r][c] || grid[r][c]!.testimonialId !== testimonialId) continue;
        
        visited.add(key);
        processed.add(key);
        blockCells.push([r, c]);
        
        // Add neighbors to queue
        queue.push([r - 1, c], [r + 1, c], [r, c - 1], [r, c + 1]);
      }
      
      if (blockCells.length === 0) return;
      
      // Find bounds
      const minRow = Math.min(...blockCells.map(([r]) => r));
      const maxRow = Math.max(...blockCells.map(([r]) => r));
      const minCol = Math.min(...blockCells.map(([, c]) => c));
      const maxCol = Math.max(...blockCells.map(([, c]) => c));
      
      // Calculate position and size of ONE continuous block
      const blockWidth = (maxCol - minCol + 1) * cellSize;
      const blockHeight = (maxRow - minRow + 1) * cellSize;
      const blockX = minCol * cellSize;
      const blockY = minRow * cellSize;
      
      // Get testimonial data
      const testimonial = TESTIMONIALS.find((t) => t.id === testimonialId);
      if (!testimonial) return;
      
      ctx.save();
      
      const outerPadding = 8; // Gap from grid
      const innerPadding = 24; // Padding for text inside block
      const borderRadius = 20;
      
      // Draw ONE continuous rounded rectangle for entire testimonial
      ctx.fillStyle = TETRIS_COLORS[cell.color];
      
      // Add shadow for depth
      ctx.shadowColor = 'rgba(0, 0, 0, 0.2)';
      ctx.shadowBlur = 12;
      ctx.shadowOffsetY = 4;
      
      ctx.beginPath();
      roundRect(
        ctx,
        blockX + outerPadding,
        blockY + outerPadding,
        blockWidth - outerPadding * 2,
        blockHeight - outerPadding * 2,
        borderRadius
      );
      ctx.fill();
      
      // Reset shadow for text
      ctx.shadowColor = 'transparent';
      ctx.shadowBlur = 0;
      
      // Render testimonial text on top
      const textColor = getTextColor(cell.color);
      ctx.fillStyle = textColor;
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      
      const maxTextWidth = blockWidth - (outerPadding + innerPadding) * 2;
      
      // Quote text - larger and bolder
      const quoteFontSize = Math.max(16, Math.min(24, blockWidth / 20));
      ctx.font = `bold ${quoteFontSize}px sans-serif`;
      const lines = wrapText(ctx, `"${testimonial.body}"`, maxTextWidth);
      const lineHeight = quoteFontSize * 1.5; // Better line spacing
      
      let currentY = blockY + outerPadding + innerPadding;
      const maxLines = Math.floor((blockHeight - (outerPadding + innerPadding) * 2 - 40) / lineHeight);
      lines.slice(0, maxLines).forEach((line) => {
        ctx.fillText(line, blockX + outerPadding + innerPadding, currentY);
        currentY += lineHeight;
      });
      
      // Author name - more prominent
      currentY += lineHeight * 0.3;
      const authorFontSize = Math.max(14, Math.min(18, blockWidth / 30));
      ctx.font = `600 ${authorFontSize}px sans-serif`;
      ctx.fillText(`— ${testimonial.author.name}`, blockX + outerPadding + innerPadding, currentY);
      
      ctx.restore();
    });
  });
}

// Helper function for rounded rectangles
function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) {
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}

function drawPiece(
  ctx: CanvasRenderingContext2D,
  piece: GamePiece,
  cellSize: number
) {
  const shape = getRotatedShape(piece.shape.type, piece.rotation);
  
  // Find the bounding box of the piece
  let minRow = Infinity, maxRow = -Infinity;
  let minCol = Infinity, maxCol = -Infinity;
  
  shape.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (cell) {
        minRow = Math.min(minRow, rowIndex);
        maxRow = Math.max(maxRow, rowIndex);
        minCol = Math.min(minCol, colIndex);
        maxCol = Math.max(maxCol, colIndex);
      }
    });
  });
  
  // Calculate the position and size of ONE continuous block
  const blockX = (piece.x + minCol) * cellSize;
  const blockY = (piece.y + minRow) * cellSize;
  const blockWidth = (maxCol - minCol + 1) * cellSize;
  const blockHeight = (maxRow - minRow + 1) * cellSize;
  
  // Only draw if within canvas bounds
  if (blockY + blockHeight > 0) {
    ctx.save();
    
    const padding = 8;
    const borderRadius = 20;
    
    // Draw ONE continuous rounded block
    ctx.fillStyle = TETRIS_COLORS[piece.shape.color];
    
    // Add shadow for depth
    ctx.shadowColor = 'rgba(0, 0, 0, 0.3)';
    ctx.shadowBlur = 15;
    ctx.shadowOffsetY = 4;
    
    ctx.beginPath();
    roundRect(
      ctx, 
      blockX + padding, 
      blockY + padding, 
      blockWidth - padding * 2, 
      blockHeight - padding * 2, 
      borderRadius
    );
    ctx.fill();
    
    ctx.restore();
  }
}

function drawClearAnimation(
  ctx: CanvasRenderingContext2D,
  grid: (LockedCell | null)[][],
  cellSize: number
) {
  // Flash effect for clearing lines
  ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
  
  grid.forEach((row, rowIndex) => {
    if (row.every((cell) => cell !== null)) {
      ctx.fillRect(0, rowIndex * cellSize, ctx.canvas.width, cellSize);
    }
  });
}

