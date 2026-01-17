import { useState, useRef, useEffect } from "react";

interface ToolCard {
  id: string;
  title: string;
  bgColor: string;
  icon: string;
  explanation: string;
  image?: string;
  rotation: string;
  zIndex: number;
}

const tools: ToolCard[] = [
  {
    id: "coding",
    title: "Vibe Coding",
    bgColor: "#ff3d00", // Orange - from sidebar
    icon: "💻",
    explanation:
      "Turn a shower idea into a real product. Join a hands-on workshop to learn practical AI 'vibe coding' safely, from zero to MVP. Short on time? Drop a bounty and someone in the MLAI community can build your feature or automation for you.",
    image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Screenshot%202026-01-17%20at%207.14.23%E2%80%AFPM.png?alt=media&token=55ffa63b-c525-4bd0-a0b6-57701442784d",
    rotation: "-rotate-3",
    zIndex: 10,
  },
  {
    id: "marketing",
    title: "Vibe Marketing",
    bgColor: "#00ffd7", // Mint - from sidebar
    icon: "📣",
    explanation:
      "Got a site or product? Now get traction. Learn how to use AI to publish content, rank in search, and show up in answer engines so the right customers find you. Simple systems that compound while you keep building.",
    image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Screenshot%202026-01-17%20at%207.14.09%E2%80%AFPM.png?alt=media&token=9fae98ac-b534-47c9-8f99-a0aff50a2a5a",
    rotation: "rotate-2",
    zIndex: 20,
  },
  {
    id: "raising",
    title: "Vibe Raising",
    bgColor: "#4b0db3", // Purple - from sidebar
    icon: "🤝",
    explanation:
      "Investor networks take years to build. If you share consistent, authentic monthly updates, we'll warm-intro you to investors with a real track record in startups like yours, in Australia and overseas. (Coming soon)",
    image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Screenshot%202026-01-17%20at%207.19.26%E2%80%AFPM.png?alt=media&token=560f5b25-a414-4967-8c5c-e942342a9031",
    rotation: "-rotate-2",
    zIndex: 30,
  },
  {
    id: "coworking",
    title: "Vibe Coworking",
    bgColor: "#fefc22", // Yellow - from sidebar
    icon: "🏢",
    explanation:
      "Founding is lonely, so don't do it solo. Get free coworking in Australian capital cities for MLAI volunteers, plus a room full of founders swapping learnings, tools, and momentum.",
    image: "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Screenshot%202026-01-17%20at%207.23.16%E2%80%AFPM.png?alt=media&token=65134cae-3689-40e4-bff0-88d22dd3a981",
    rotation: "rotate-3",
    zIndex: 40,
  },
];

export default function FounderTools() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Preload all images on component mount
  useEffect(() => {
    tools.forEach((tool) => {
      if (tool.image) {
        const img = new Image();
        img.src = tool.image;
      }
    });
  }, []);

  const handleMouseEnter = (toolId: string) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setHoveredTool(toolId);
    setIsExpanded(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setIsExpanded(false);
      setTimeout(() => setHoveredTool(null), 300);
    }, 150);
  };

  const handleExpandedMouseEnter = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const handleExpandedMouseLeave = () => {
    handleMouseLeave();
  };

  const hoveredToolData = tools.find((tool) => tool.id === hoveredTool);
  const hoveredToolIndex = tools.findIndex((tool) => tool.id === hoveredTool);

  const perCardPercent = 100 / tools.length;

  return (
    <div className="w-full bg-[var(--brutalist-beige)] p-2 lg:p-3">
      <div className="w-full bg-gray-900 rounded-2xl sm:rounded-[2.5rem] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
              FOUNDER TOOLS
            </p>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Founder-built tools to launch faster
            </h2>
            <p className="text-gray-400 text-lg sm:text-xl max-w-3xl mx-auto">
              Workshops, playbooks, intros, and coworking from the MLAI founder community,
              built to help create 1,000 Australian startups. Pick a track and dive in.
            </p>
          </div>

          {/* Cards - Overlapping and Rotated */}
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-0 mb-8 px-4 sm:px-0">
            {tools.map((tool, index) => {
              const isYellow = tool.bgColor === "#fefc22";
              const isMint = tool.bgColor === "#00ffd7";
              const useDarkText = isYellow || isMint;
              const isHovered = hoveredTool === tool.id;

              return (
                <div
                  key={tool.id}
                  onMouseEnter={() => handleMouseEnter(tool.id)}
                  onMouseLeave={handleMouseLeave}
                  className={`relative overflow-hidden rounded-3xl p-8 w-64 h-80 transition-all duration-300 cursor-pointer
                    ${tool.rotation}
                    ${isHovered ? "scale-110" : "hover:scale-105"}
                    ${index > 0 ? "sm:-ml-8 lg:-ml-10" : ""}`}
                  style={{
                    backgroundColor: tool.bgColor,
                    zIndex: isHovered ? 50 : tool.zIndex,
                    boxShadow: isHovered
                      ? `0 0 60px ${tool.bgColor}60, 0 0 100px ${tool.bgColor}30`
                      : `0 0 40px ${tool.bgColor}40, 0 0 80px ${tool.bgColor}20`,
                  }}
                >
                  {/* Icon */}
                  <div className="absolute top-8 left-1/2 -translate-x-1/2">
                    <div
                      className={`w-16 h-16 rounded-full ${useDarkText ? "bg-black/10" : "bg-white/20"
                        } backdrop-blur-sm flex items-center justify-center text-3xl`}
                    >
                      {tool.icon}
                    </div>
                  </div>

                  {/* Title */}
                  <div className="absolute bottom-20 left-0 right-0 text-center px-4">
                    <h3
                      className={`text-2xl font-bold mb-2 ${useDarkText ? "text-black" : "text-white"
                        }`}
                    >
                      {tool.title}
                    </h3>
                  </div>

                  {/* Preview Badge */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                    <span
                      className={`text-sm font-medium ${useDarkText ? "text-black/70" : "text-white/80"
                        }`}
                    >
                      {tool.id === "raising" ? "Coming soon" : "See what's inside"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Expanded View with Arrow */}
          <div className="relative">
            {/* Arrow pointer */}
            {hoveredToolData && (
              <div
                className={`absolute -top-3 transition-all duration-300 ease-out ${isExpanded ? "opacity-100" : "opacity-0"
                  }`}
                style={{
                  left: `calc(${(hoveredToolIndex + 0.5) * perCardPercent}% - 12px)`,
                }}
              >
                <div
                  className="w-6 h-6 rotate-45 bg-gray-800"
                  style={{
                    marginLeft:
                      hoveredToolIndex === 0
                        ? "20px"
                        : hoveredToolIndex === tools.length - 1
                          ? "-20px"
                          : "0",
                  }}
                />
              </div>
            )}

            {/* Expandable content container */}
            <div
              onMouseEnter={handleExpandedMouseEnter}
              onMouseLeave={handleExpandedMouseLeave}
              className={`overflow-hidden transition-all ease-out ${isExpanded
                  ? "max-h-[500px] opacity-100 duration-500"
                  : "max-h-0 opacity-0 duration-300"
                }`}
              style={{
                transitionTimingFunction: isExpanded
                  ? "cubic-bezier(0.34, 1.56, 0.64, 1)"
                  : "ease-out",
              }}
            >
              <div className="bg-gray-800 rounded-3xl p-8 md:p-12 mt-4">
                {hoveredToolData && (
                  <div key={hoveredTool} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                    {/* Text Content */}
                    <div className="text-white">
                      <h3 className="text-2xl md:text-3xl font-bold mb-4">
                        How it works
                      </h3>
                      <p className="text-gray-300 text-lg leading-relaxed">
                        {hoveredToolData.explanation}
                      </p>
                    </div>

                    {/* Image */}
                    <div className="relative">
                      <div className="aspect-video rounded-2xl bg-gray-700 overflow-hidden border-4 border-white shadow-2xl">
                        <img
                          src={
                            hoveredToolData.image ||
                            "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                          }
                          alt={`${hoveredToolData.title} preview`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* Access Tools Button */}
                <div className="mt-8 text-center">
                  {hoveredToolData && (
                    <button
                      disabled={hoveredToolData.id === "raising"}
                      className={`font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 ${
                        hoveredToolData.id === "raising"
                          ? "opacity-60 cursor-not-allowed"
                          : "hover:scale-105"
                      } ${
                        hoveredToolData.bgColor === "#fefc22" || hoveredToolData.bgColor === "#00ffd7"
                          ? "text-black"
                          : "text-white"
                      }`}
                      style={{
                        backgroundColor: hoveredToolData.bgColor,
                        boxShadow: `0 0 40px ${hoveredToolData.bgColor}60, 0 4px 20px rgba(0, 0, 0, 0.3)`
                      }}
                    >
                      Open {hoveredToolData.title} {hoveredToolData.id === "raising" && "(coming soon)"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
