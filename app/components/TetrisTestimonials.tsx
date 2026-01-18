import type { CSSProperties } from "react";

// Tetris block colors - using sidebar colors
const TETRIS_COLORS = {
  orange: "#ff3d00", // Sidebar orange
  purple: "#4b0db3", // Sidebar purple
  black: "#1a1a1a", // Sidebar black
  blue: "#3537dc", // Sidebar blue
  pink: "#ff003d", // Sidebar pink
  yellow: "#fefc22", // Sidebar yellow
  mint: "#00ffd7", // Sidebar mint
};

type ColorKey = keyof typeof TETRIS_COLORS;

// Styling constants
const BORDER_RADIUS = 16; // Rounded corner radius

// Testimonials data matching the reference image
const testimonials = [
  {
    id: 1,
    body: "It was an absolute pleasure to work with the MLAI team for Ecosystem Drinks: Talent meets Startups. It was amazing to see so many engaging members of the MLAI community in action for the startup speed dating.",
    author: {
      name: "Eike Zoller",
      handle: "Ecosystems Director - Stone & Chalk",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/eikezeller.jpg?alt=media&token=f184570d-27bf-4100-a53d-2a541d4f1fce",
    },
    color: "orange" as ColorKey,
  },
  {
    id: 2,
    body: "As excitement about AI builds and the impacts spread into all our daily lives, a strong and diverse community of participants is vital to support positive outcomes for all. It's great to see the MLAI Aus crew working hard to build this community across Australia. Get off the couch and get involved!",
    author: {
      name: "Kendra Vant",
      handle: "Director - Europalabs",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
    },
    color: "black" as ColorKey,
  },
  {
    id: 3,
    body: "MLAI has been a fantastic community for connecting with like-minded, talented people. Everyone has been warm, welcoming, and eager to talk nitty-gritty tech details.",
    author: {
      name: "Xavier Andueza",
      handle: "Founding AI Engineer - Userdoc",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fxavier.png?alt=media&token=d803afb5-66ce-4dfe-8407-f284ab117f78",
    },
    color: "black" as ColorKey,
  },
  {
    id: 4,
    body: "MLAI has created an incredible space for AI enthusiasts to connect and collaborate. The community's energy and passion for innovation is truly inspiring.",
    author: {
      name: "Sarah Chen",
      handle: "ML Engineer - Canva",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
    },
    color: "purple" as ColorKey,
  },
  {
    id: 5,
    body: "Being part of MLAI has opened doors to amazing opportunities and connections. The community is built by passionate volunteers making Australia a hub for AI innovation.",
    author: {
      name: "Blake Seffer",
      handle: "AI Researcher",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/committee-photos%2Fxavier.png?alt=media&token=d803afb5-66ce-4dfe-8407-f284ab117f78",
    },
    color: "orange" as ColorKey,
  },
  {
    id: 6,
    body: "MLAI has an amazing community full of talented individuals who are passionate about AI and its future.",
    author: {
      name: "Olivia Tang",
      handle: "Data Scientist",
      imageUrl:
        "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/kendra.png?alt=media&token=63333d01-f649-40e5-bbbc-b9239af80c0e",
    },
    color: "yellow" as ColorKey,
  },
];

// Text color helper
const getTextColor = (colorKey: ColorKey): string => {
  if (colorKey === "yellow" || colorKey === "mint") return "#1a1a1a";
  return "#ffffff";
};

// Testimonial Card Component for Mobile
interface TestimonialCardProps {
  testimonial: (typeof testimonials)[0];
}

function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const bgColor = TETRIS_COLORS[testimonial.color];
  const textColor = getTextColor(testimonial.color);

  return (
    <figure
      className="relative flex flex-col p-5 sm:p-6 rounded-2xl h-full"
      style={{
        backgroundColor: bgColor,
        color: textColor,
      }}
    >
      <blockquote className="text-sm sm:text-base leading-relaxed flex-grow">
        <p>"{testimonial.body}"</p>
      </blockquote>

      <figcaption className="mt-4 flex items-center gap-3">
        <img
          className="h-10 w-10 sm:h-12 sm:w-12 rounded-full object-cover flex-shrink-0"
          src={testimonial.author.imageUrl}
          alt={testimonial.author.name}
        />
        <div>
          <div className="font-semibold text-sm sm:text-base">
            {testimonial.author.name}
          </div>
          <div className="text-xs sm:text-sm opacity-80">
            {testimonial.author.handle}
          </div>
        </div>
      </figcaption>
    </figure>
  );
}

// Testimonial Block Component for Desktop Tetris Grid
interface TestimonialBlockProps {
  testimonial: (typeof testimonials)[0];
  style?: CSSProperties;
  showAuthor?: boolean;
}

function TestimonialBlock({
  testimonial,
  style,
  showAuthor = true,
}: TestimonialBlockProps) {
  const bgColor = TETRIS_COLORS[testimonial.color];
  const textColor = getTextColor(testimonial.color);
  const showAvatar =
    showAuthor && testimonial.author.name && testimonial.author.imageUrl;

  return (
    <figure
      className="relative flex flex-col h-full overflow-hidden"
      style={{
        backgroundColor: bgColor,
        color: textColor,
        borderRadius: `${BORDER_RADIUS}px`,
        padding: "14px",
        ...style,
      }}
    >
      <blockquote className="text-[11px] xl:text-xs leading-[1.4] flex-grow">
        <p>"{testimonial.body}"</p>
      </blockquote>

      {showAvatar && (
        <figcaption className="mt-3 flex items-center gap-2">
          <img
            className="h-7 w-7 rounded-full object-cover flex-shrink-0"
            src={testimonial.author.imageUrl}
            alt={testimonial.author.name}
          />
          <div>
            <div className="font-semibold text-[10px]">
              {testimonial.author.name}
            </div>
            <div className="text-[9px] opacity-70">
              {testimonial.author.handle}
            </div>
          </div>
        </figcaption>
      )}
    </figure>
  );
}

// Simple colored block (for spacers)
function ColorBlock({
  color,
  style,
  children,
}: {
  color: ColorKey;
  style?: CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <div
      style={{
        backgroundColor: TETRIS_COLORS[color],
        borderRadius: `${BORDER_RADIUS}px`,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: children ? "10px" : 0,
        color: getTextColor(color),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default function TetrisTestimonials() {
  return (
    <div className="relative bg-[var(--brutalist-beige)] p-2 lg:p-3">
      {/* Main container with black border and rounded corners */}
      <div
        className="w-full rounded-[2.5rem] p-4 sm:p-6 lg:p-8 relative overflow-hidden"
        style={{
          backgroundColor: "var(--brutalist-beige)",
          border: "1px solid #1a1a1a",
        }}
      >
        {/* Header */}
        <div className="mb-6">
          <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900">
            Everyone is a{" "}
            <span style={{ color: TETRIS_COLORS.orange }}>Volunteer</span>
          </h2>
        </div>

        {/* === MOBILE LAYOUT: Stacked Cards === */}
        <div className="block lg:hidden">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {testimonials.slice(0, 4).map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>

        {/* === DESKTOP LAYOUT: Tetris Grid === */}
        <div
          className="hidden lg:grid"
          style={{
            gridTemplateColumns: "repeat(14, 1fr)",
            gridTemplateRows: "repeat(6, 65px)",
            gap: "8px",
            width: "100%",
          }}
        >
          {/* === TOP SECTION === */}

          {/* Orange (Eike) - cols 1-2, rows 1-4 (tall L-shape) */}
          <div style={{ gridColumn: "1 / 3", gridRow: "1 / 5" }}>
            <TestimonialBlock testimonial={testimonials[0]} />
          </div>

          {/* Black (Kendra) - cols 3-7, rows 1-2 (wide) */}
          <div style={{ gridColumn: "3 / 8", gridRow: "1 / 3" }}>
            <TestimonialBlock testimonial={testimonials[1]} />
          </div>

          {/* Black (Xavier) - cols 8-10, rows 1-3 */}
          <div style={{ gridColumn: "8 / 11", gridRow: "1 / 4" }}>
            <TestimonialBlock testimonial={testimonials[2]} />
          </div>

          {/* Orange (Blake) - cols 11-12, rows 1-4 */}
          <div style={{ gridColumn: "11 / 13", gridRow: "1 / 5" }}>
            <TestimonialBlock testimonial={testimonials[4]} />
          </div>

          {/* MINT block - cols 13-14, rows 1-4 (tall on far right!) */}
          <div style={{ gridColumn: "13 / 15", gridRow: "1 / 5" }}>
            <ColorBlock
              color="mint"
              style={{ height: "100%", width: "100%" }}
            />
          </div>

          {/* === MIDDLE SECTION - Blue L-Shape === */}

          {/* Blue block 1 - cols 3-5, rows 3-4 (left part of L) */}
          <div style={{ gridColumn: "3 / 6", gridRow: "3 / 5" }}>
            <ColorBlock
              color="blue"
              style={{ height: "100%", width: "100%" }}
            />
          </div>

          {/* Blue block 2 - cols 6-7, rows 3-6 (vertical part of L going down) */}
          <div style={{ gridColumn: "6 / 8", gridRow: "3 / 7" }}>
            <ColorBlock
              color="blue"
              style={{ height: "100%", width: "100%" }}
            />
          </div>

          {/* Yellow accent - col 8, row 4 (small square) */}
          <div style={{ gridColumn: "8 / 9", gridRow: "4 / 5" }}>
            <ColorBlock
              color="yellow"
              style={{ height: "100%", width: "100%" }}
            />
          </div>

          {/* Pink/Red block - cols 8-9, rows 4-6 */}
          <div style={{ gridColumn: "9 / 10", gridRow: "4 / 6" }}>
            <ColorBlock
              color="pink"
              style={{ height: "100%", width: "100%" }}
            />
          </div>

          {/* === BOTTOM SECTION === */}

          {/* Purple (Sarah) - cols 1-4, rows 5-6 */}
          <div style={{ gridColumn: "1 / 5", gridRow: "5 / 7" }}>
            <TestimonialBlock testimonial={testimonials[3]} />
          </div>

          {/* Black extension with Kendra avatar - cols 5-6, rows 5-6 */}
          <div style={{ gridColumn: "5 / 6", gridRow: "5 / 7" }}>
            <ColorBlock color="black" style={{ height: "100%", width: "100%" }}>
              <div className="flex items-center gap-1.5 text-white">
                <img
                  className="h-5 w-5 rounded-full object-cover"
                  src={testimonials[1].author.imageUrl}
                  alt=""
                />
                <div className="text-[8px]">
                  <div className="font-semibold">Kendra Vant</div>
                  <div className="opacity-70">Director -</div>
                  <div className="opacity-70">Europalabs</div>
                </div>
              </div>
            </ColorBlock>
          </div>

          {/* Blue block 3 - cols 8, rows 5-6 (bottom of L) */}
          <div style={{ gridColumn: "8 / 9", gridRow: "5 / 7" }}>
            <ColorBlock
              color="blue"
              style={{ height: "100%", width: "100%" }}
            />
          </div>

          {/* Yellow (Olivia) - cols 10-11, rows 5-6 */}
          <div style={{ gridColumn: "10 / 12", gridRow: "5 / 7" }}>
            <TestimonialBlock testimonial={testimonials[5]} />
          </div>

          {/* Orange block - cols 12-14, rows 5-6 */}
          <div style={{ gridColumn: "12 / 15", gridRow: "5 / 7" }}>
            <ColorBlock
              color="orange"
              style={{ height: "100%", width: "100%" }}
            >
              <div className="text-[10px] text-white">
                "MLAI is built by passionate volunteers making Australia the
                best place for AI."
              </div>
            </ColorBlock>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 flex items-center justify-between">
          <span className="text-gray-600 text-sm font-medium">People</span>
          <span className="text-gray-600 text-sm flex items-center gap-2">
            <span
              className="inline-block"
              style={{
                width: 0,
                height: 0,
                borderLeft: "5px solid transparent",
                borderRight: "5px solid transparent",
                borderBottom: "8px solid #1a1a1a",
              }}
            />
            04/07
          </span>
        </div>
      </div>
    </div>
  );
}
