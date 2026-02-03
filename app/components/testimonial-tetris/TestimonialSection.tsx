/**
 * Testimonial Section with rotating fade animation
 * Displays testimonials in a clean card layout (3 columns on desktop)
 * Cycles through groups of 3 testimonials with a fade transition
 */

import { useEffect, useState, useCallback } from "react";
import { TESTIMONIALS, TETRIS_COLORS } from "./testimonialData";
import type { Testimonial } from "./types";

// Color mapping for quote text
const QUOTE_COLORS: Record<string, string> = {
  orange: TETRIS_COLORS.orange,
  purple: TETRIS_COLORS.purple,
  blue: TETRIS_COLORS.blue,
  pink: TETRIS_COLORS.pink,
  mint: "#00b894",
  yellow: "#d4a800",
  black: TETRIS_COLORS.black,
};

const ROTATE_INTERVAL = 6000; // ms between rotations
const FADE_DURATION = 500; // ms for fade transition

interface TestimonialCardProps {
  body: string;
  authorName: string;
  authorHandle: string;
  authorImage: string;
  authorWebsite?: string;
  quoteColor: string;
  visible: boolean;
}

function TestimonialCard({
  body,
  authorName,
  authorHandle,
  authorImage,
  authorWebsite,
  quoteColor,
  visible,
}: TestimonialCardProps) {
  return (
    <div
      className="bg-white rounded-2xl p-6 flex flex-col h-full shadow-lg"
      style={{
        opacity: visible ? 1 : 0,
        transition: `opacity ${FADE_DURATION}ms ease-in-out`,
      }}
    >
      {/* Quote */}
      <blockquote
        className="text-lg md:text-xl lg:text-2xl font-bold leading-snug flex-grow"
        style={{ color: quoteColor }}
      >
        &ldquo;{body}&rdquo;
      </blockquote>

      {/* Author */}
      <div className="flex items-center gap-3 mt-6">
        <img
          src={authorImage}
          alt={authorName}
          className="w-12 h-12 rounded-full object-cover flex-shrink-0"
        />
        <div>
          <div className="font-semibold text-gray-900">{authorName} |</div>
          {authorWebsite ? (
            <a
              href={authorWebsite}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 text-sm hover:text-gray-900 hover:underline transition-colors"
            >
              {authorHandle}
            </a>
          ) : (
            <div className="text-gray-600 text-sm">{authorHandle}</div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Split testimonials into groups of 3 */
function buildGroups(testimonials: Testimonial[]): Testimonial[][] {
  const groups: Testimonial[][] = [];
  for (let i = 0; i < testimonials.length; i += 3) {
    const group = testimonials.slice(i, i + 3);
    if (group.length === 3) {
      groups.push(group);
    }
  }
  // If we only got one group or none, just use all testimonials reshuffled
  return groups.length > 0 ? groups : [testimonials.slice(0, 3)];
}

export function TestimonialSection() {
  // Use all testimonials in order
  const ordered = TESTIMONIALS;

  const groups = buildGroups(ordered);
  const [groupIndex, setGroupIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  const rotate = useCallback(() => {
    if (groups.length <= 1) return;
    setVisible(false);
    setTimeout(() => {
      setGroupIndex((prev) => (prev + 1) % groups.length);
      setVisible(true);
    }, FADE_DURATION);
  }, [groups.length]);

  useEffect(() => {
    if (groups.length <= 1) return;
    const timer = setInterval(rotate, ROTATE_INTERVAL);
    return () => clearInterval(timer);
  }, [rotate, groups.length]);

  const currentGroup = groups[groupIndex];

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          What Our Community Is Saying
        </h2>
      </div>

      {/* Testimonial Cards */}
      <div className="flex-grow grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {currentGroup.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            body={testimonial.body}
            authorName={testimonial.author.name}
            authorHandle={testimonial.author.handle}
            authorImage={testimonial.author.imageUrl}
            authorWebsite={testimonial.author.website}
            quoteColor={
              QUOTE_COLORS[testimonial.color] || TETRIS_COLORS.black
            }
            visible={visible}
          />
        ))}
      </div>

      {/* Dot indicators */}
      {groups.length > 1 && (
        <div className="flex justify-center gap-2 mt-6">
          {groups.map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setVisible(false);
                setTimeout(() => {
                  setGroupIndex(i);
                  setVisible(true);
                }, FADE_DURATION);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-colors ${
                i === groupIndex ? "bg-white" : "bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Show testimonials group ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
