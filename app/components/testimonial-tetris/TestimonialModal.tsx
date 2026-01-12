/**
 * Testimonial Modal
 * Shows full testimonial when clicking a locked block
 */

import { useEffect } from 'react';
import type { Testimonial } from './types';
import { TETRIS_COLORS, getTextColor } from './testimonialData';

interface TestimonialModalProps {
  testimonial: Testimonial | null;
  onClose: () => void;
}

export function TestimonialModal({ testimonial, onClose }: TestimonialModalProps) {
  // Close on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  if (!testimonial) return null;

  const bgColor = TETRIS_COLORS[testimonial.color];
  const textColor = getTextColor(testimonial.color);

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="rounded-3xl p-6 md:p-8 max-w-2xl w-full shadow-2xl"
        style={{
          backgroundColor: bgColor,
          color: textColor,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="float-right text-2xl font-bold opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close"
        >
          ✕
        </button>

        {/* Author */}
        <div className="flex items-center gap-4 mb-6">
          {testimonial.author.imageUrl && (
            <img
              src={testimonial.author.imageUrl}
              alt={testimonial.author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          )}
          <div>
            <div className="text-xl font-bold">{testimonial.author.name}</div>
            <div className="text-sm opacity-70">{testimonial.author.handle}</div>
          </div>
        </div>

        {/* Testimonial text */}
        <blockquote className="text-lg md:text-xl leading-relaxed">
          "{testimonial.body}"
        </blockquote>
      </div>
    </div>
  );
}

