/**
 * Static Testimonial Section
 * Displays testimonials in a clean card layout (3 columns on desktop)
 * Styled like the reference image with blue background and white cards
 */

import { TESTIMONIALS, TETRIS_COLORS } from "./testimonialData";

// Color mapping for quote text
const QUOTE_COLORS: Record<string, string> = {
  orange: TETRIS_COLORS.orange,
  purple: TETRIS_COLORS.purple,
  blue: TETRIS_COLORS.blue,
  pink: TETRIS_COLORS.pink,
  mint: "#00b894", // Slightly darker mint for readability on white
  yellow: "#d4a800", // Darker yellow for readability on white
  black: TETRIS_COLORS.black,
};

interface TestimonialCardProps {
  body: string;
  authorName: string;
  authorHandle: string;
  authorImage: string;
  quoteColor: string;
}

function TestimonialCard({
  body,
  authorName,
  authorHandle,
  authorImage,
  quoteColor,
}: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-6 flex flex-col h-full shadow-lg">
      {/* Quote */}
      <blockquote
        className="text-lg md:text-xl lg:text-2xl font-bold leading-snug flex-grow"
        style={{ color: quoteColor }}
      >
        "{body}"
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
          <div className="text-gray-600 text-sm">{authorHandle}</div>
        </div>
      </div>
    </div>
  );
}

export function TestimonialSection() {
  // Select 3 diverse testimonials for display
  const featuredTestimonials = [
    TESTIMONIALS[0], // Orange - Eike
    TESTIMONIALS[3], // Blue - Blair
    TESTIMONIALS[4], // Yellow/Mint - Community
  ];

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
        {featuredTestimonials.map((testimonial) => (
          <TestimonialCard
            key={testimonial.id}
            body={
              testimonial.body.length > 120
                ? testimonial.body.slice(0, 120) + "..."
                : testimonial.body
            }
            authorName={testimonial.author.name}
            authorHandle={testimonial.author.handle}
            authorImage={testimonial.author.imageUrl}
            quoteColor={QUOTE_COLORS[testimonial.color] || TETRIS_COLORS.black}
          />
        ))}
      </div>

      {/* CTA Button */}
      <div className="flex justify-center mt-8">
        <button className="bg-[#ff5a5f] hover:bg-[#ff4549] text-white font-semibold px-8 py-3 rounded-full transition-colors flex items-center gap-2">
          Read More Stories
          <span aria-hidden="true">&rarr;</span>
        </button>
      </div>
    </div>
  );
}
