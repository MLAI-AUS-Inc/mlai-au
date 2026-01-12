/**
 * DOM-based Testimonial Tetris Grid
 * Renders game state using positioned divs instead of canvas
 */

import { useEffect, useRef, useState } from "react";
import { TestimonialBlock } from "./TestimonialBlock";
import { GAME_CONFIG, TESTIMONIALS } from "./testimonialData";
import type { GameState } from "./types";

interface TestimonialGridProps {
  gameState: GameState;
  onTestimonialClick?: (testimonialId: number) => void;
}

export function TestimonialGrid({
  gameState,
  onTestimonialClick,
}: TestimonialGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [cellSize, setCellSize] = useState(GAME_CONFIG.CELL_SIZE);

  // Responsive cell size calculation (based on both width AND height)
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.clientWidth;
      const containerHeight = containerRef.current.clientHeight;

      // Calculate max cell size that fits both width and height
      const cellSizeByWidth = Math.floor(
        containerWidth / GAME_CONFIG.GRID_COLS
      );
      const cellSizeByHeight = Math.floor(
        containerHeight / GAME_CONFIG.GRID_ROWS
      );

      // Use the smaller of the two to ensure everything fits
      const calculatedCellSize = Math.min(cellSizeByWidth, cellSizeByHeight);
      setCellSize(Math.min(calculatedCellSize, GAME_CONFIG.CELL_SIZE));
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridWidth = GAME_CONFIG.GRID_COLS * cellSize;
  const gridHeight = GAME_CONFIG.GRID_ROWS * cellSize;

  // Find all contiguous testimonial blocks by pieceId (prevents merging)
  const lockedTestimonials: Array<{
    testimonialId: number;
    col: number;
    row: number;
    rotation: number;
    key: string;
  }> = [];
  const visited = new Set<string>();

  gameState.grid.forEach((row, rowIndex) => {
    row.forEach((cell, colIndex) => {
      if (!cell || visited.has(`${rowIndex},${colIndex}`)) return;

      // Found an unvisited cell - flood fill to find the entire piece
      const pieceId = cell.pieceId;
      const testimonialId = cell.testimonialId;
      const rotation = cell.rotation; // Get rotation from the first cell
      const blockCells: Array<{ row: number; col: number }> = [];
      const queue: Array<{ row: number; col: number }> = [
        { row: rowIndex, col: colIndex },
      ];

      while (queue.length > 0) {
        const current = queue.shift()!;
        const key = `${current.row},${current.col}`;

        if (visited.has(key)) continue;
        if (current.row < 0 || current.row >= GAME_CONFIG.GRID_ROWS) continue;
        if (current.col < 0 || current.col >= GAME_CONFIG.GRID_COLS) continue;

        const currentCell = gameState.grid[current.row][current.col];
        // Match by pieceId instead of testimonialId to prevent merging!
        if (!currentCell || currentCell.pieceId !== pieceId) continue;

        visited.add(key);
        blockCells.push(current);

        // Add neighbors
        queue.push(
          { row: current.row - 1, col: current.col },
          { row: current.row + 1, col: current.col },
          { row: current.row, col: current.col - 1 },
          { row: current.row, col: current.col + 1 }
        );
      }

      // Find top-left corner of this piece
      if (blockCells.length > 0) {
        const minCol = Math.min(...blockCells.map((c) => c.col));
        const minRow = Math.min(...blockCells.map((c) => c.row));
        lockedTestimonials.push({
          testimonialId,
          col: minCol,
          row: minRow,
          rotation, // Store rotation state
          key: pieceId, // Use pieceId as key
        });
      }
    });
  });

  return (
    <div
      ref={containerRef}
      className="w-full h-full flex items-center justify-center"
    >
      <div
        className="relative overflow-hidden w-full h-full"
        style={{
          maxWidth: `${gridWidth}px`,
          maxHeight: `${gridHeight}px`,
        }}
      >
        {/* Locked Testimonials - each contiguous block rendered separately */}
        {lockedTestimonials
          .sort((a, b) => {
            // Sort by row first, then column (top-to-bottom, left-to-right)
            if (a.row !== b.row) return a.row - b.row;
            return a.col - b.col;
          })
          .map((block) => {
            const testimonial = TESTIMONIALS.find(
              (t) => t.id === block.testimonialId
            );
            if (!testimonial) return null;

            // Apply rotation to testimonial dimensions for rendering
            const baseWidth = testimonial.gridWidth;
            const baseHeight = testimonial.gridHeight;
            const effectiveWidth =
              block.rotation === 0 ? baseWidth : baseHeight;
            const effectiveHeight =
              block.rotation === 0 ? baseHeight : baseWidth;

            // Create testimonial with rotated dimensions
            const rotatedTestimonial = {
              ...testimonial,
              gridWidth: effectiveWidth,
              gridHeight: effectiveHeight,
            };

            return (
              <TestimonialBlock
                key={block.key}
                testimonial={rotatedTestimonial}
                gridCol={block.col}
                gridRow={block.row}
                cellSize={cellSize}
                onClick={() => onTestimonialClick?.(block.testimonialId)}
              />
            );
          })}

        {/* Falling Piece */}
        {gameState.currentPiece &&
          gameState.mode === "playing" &&
          (() => {
            const piece = gameState.currentPiece;
            // Get rotated dimensions for rendering
            const baseWidth = piece.testimonial.gridWidth;
            const baseHeight = piece.testimonial.gridHeight;
            const effectiveWidth =
              piece.rotation === 0 ? baseWidth : baseHeight;
            const effectiveHeight =
              piece.rotation === 0 ? baseHeight : baseWidth;

            // Create a temporary testimonial with rotated dimensions for rendering
            const rotatedTestimonial = {
              ...piece.testimonial,
              gridWidth: effectiveWidth,
              gridHeight: effectiveHeight,
            };

            return (
              <TestimonialBlock
                key={piece.id}
                testimonial={rotatedTestimonial}
                gridCol={piece.x}
                gridRow={piece.y}
                cellSize={cellSize}
                isAnimating
              />
            );
          })()}
      </div>
    </div>
  );
}
