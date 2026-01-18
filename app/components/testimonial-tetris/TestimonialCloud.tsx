/**
 * TestimonialCloud - Hover-to-play Testimonial Tetris
 *
 * Shows static testimonial cards by default.
 * On hover/tap, shows a blue loading screen then loads the Tetris game.
 *
 * State machine:
 * - 'compact': Static testimonials displayed (default)
 * - 'expanding': Loading screen, preparing game
 * - 'playing': Tetris game is active
 */

import { useState, useRef, useEffect } from "react";
import { TestimonialSection } from "./TestimonialSection";
import { TestimonialLoadingOverlay } from "./TestimonialLoadingOverlay";
import { TestimonialTetris } from "./index";
import { TETRIS_COLORS } from "./testimonialData";

type TestimonialCloudState = "compact" | "expanding" | "playing";

export function TestimonialCloud() {
  const [state, setState] = useState<TestimonialCloudState>("compact");
  const [isHeightExpanded, setIsHeightExpanded] = useState(false);
  const mouseLeaveTimeoutRef = useRef<number | null>(null);
  const loadingTimeoutRef = useRef<number | null>(null);

  // Cleanup timeouts on unmount
  useEffect(() => {
    return () => {
      if (mouseLeaveTimeoutRef.current) {
        clearTimeout(mouseLeaveTimeoutRef.current);
      }
      if (loadingTimeoutRef.current) {
        clearTimeout(loadingTimeoutRef.current);
      }
    };
  }, []);

  // Transition to playing when height expanded and loading complete
  useEffect(() => {
    if (state === "expanding" && isHeightExpanded) {
      // Small delay to ensure smooth transition
      loadingTimeoutRef.current = window.setTimeout(() => {
        setState("playing");
      }, 800);
    }
  }, [state, isHeightExpanded]);

  const handleActivate = () => {
    // Cancel any pending leave timeout
    if (mouseLeaveTimeoutRef.current) {
      clearTimeout(mouseLeaveTimeoutRef.current);
      mouseLeaveTimeoutRef.current = null;
    }

    if (state === "compact") {
      setState("expanding");
    }
  };

  const handleDeactivate = () => {
    // Small debounce to prevent flickering
    mouseLeaveTimeoutRef.current = window.setTimeout(() => {
      setState("compact");
      setIsHeightExpanded(false);
    }, 100);
  };

  const handleTransitionEnd = (e: React.TransitionEvent) => {
    // Detect when height transition completes
    if (e.propertyName === "min-height" && state === "expanding") {
      setIsHeightExpanded(true);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    setState("compact");
    setIsHeightExpanded(false);
  };

  const isExpanded = state !== "compact";

  return (
    <div className="bg-[var(--brutalist-beige)] p-2 lg:p-3">
      <div
        className={`rounded-2xl sm:rounded-[2.5rem] py-8 sm:py-10 relative z-10 transition-all duration-500 overflow-hidden ${
          isExpanded
            ? "min-h-[600px] sm:min-h-[700px] lg:min-h-[850px]"
            : "min-h-[400px] sm:min-h-[450px]"
        } ${state === "playing" ? "bg-[var(--brutalist-beige)]" : ""}`}
        style={{
          backgroundColor:
            state === "playing"
              ? "var(--brutalist-beige)"
              : TETRIS_COLORS.blue,
        }}
        onMouseEnter={handleActivate}
        onMouseLeave={handleDeactivate}
        onTouchStart={handleActivate}
        onTransitionEnd={handleTransitionEnd}
      >
        {/* Loading overlay - shown during 'expanding' state */}
        {state === "expanding" && <TestimonialLoadingOverlay />}

        {/* Tetris Game - Only mount when 'playing' */}
        {state === "playing" && (
          <div className="absolute inset-0 z-20">
            <TestimonialTetris />
          </div>
        )}

        {/* Close button - shown when playing */}
        {state === "playing" && (
          <button
            className="absolute top-4 right-4 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 transition-colors touch-action-manipulation"
            onClick={handleClose}
            aria-label="Close game"
          >
            <svg
              className="w-6 h-6 text-gray-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        )}

        {/* Static Testimonials - shown in 'compact' state */}
        <div
          className={`transition-opacity duration-500 h-full ${
            state !== "compact" ? "opacity-0 pointer-events-none" : "opacity-100"
          }`}
        >
          <TestimonialSection />
        </div>
      </div>
    </div>
  );
}
