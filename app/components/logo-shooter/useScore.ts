/**
 * Score Hook
 * Manages user score with localStorage persistence
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'mlai-logo-shooter-score';
const HARDCODED_HIGH_SCORE = 628;

interface UseScoreReturn {
  score: number;
  highScore: number;
  incrementScore: () => void;
  resetScore: () => void;
}

export function useScore(): UseScoreReturn {
  const [score, setScore] = useState(0);

  // Load score from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed)) {
          setScore(parsed);
        }
      }
    } catch {
      // localStorage not available, use session score
    }
  }, []);

  // Save score to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, score.toString());
    } catch {
      // localStorage not available
    }
  }, [score]);

  const incrementScore = useCallback(() => {
    setScore((prev) => prev + 1);
  }, []);

  const resetScore = useCallback(() => {
    setScore(0);
  }, []);

  return {
    score,
    highScore: HARDCODED_HIGH_SCORE,
    incrementScore,
    resetScore,
  };
}
