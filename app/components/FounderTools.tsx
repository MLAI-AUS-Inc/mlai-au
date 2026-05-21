import { useState, useRef, useEffect } from "react";
import { Link } from "react-router";

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
      "Investor networks take years to build. If you share consistent, authentic monthly updates, we'll warm-intro you to investors with a real track record in startups like yours, in Australia and overseas.",
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

// Mobile stack layout constants
const PEEK_HEIGHT = 70;   // How much of each unselected card is visible
const CARD_HEIGHT = 280;  // Full card height on mobile

export default function FounderTools() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedTool, setSelectedTool] = useState<string>("coding"); // For mobile tap selection
  const [prevSelectedTool, setPrevSelectedTool] = useState<string | null>(null); // Track previous for smooth z-index
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const transitionTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle card selection with transition tracking
  const handleCardSelect = (toolId: string) => {
    if (toolId === selectedTool) return;

    // Track the previous selection for z-index during transition
    setPrevSelectedTool(selectedTool);
    setSelectedTool(toolId);
    setIsTransitioning(true);

    // Clear any existing timeout
    if (transitionTimeoutRef.current) {
      clearTimeout(transitionTimeoutRef.current);
    }

    // After animation completes, clear the transitioning state
    transitionTimeoutRef.current = setTimeout(() => {
      setIsTransitioning(false);
      setPrevSelectedTool(null);
    }, 450); // Slightly longer than animation duration
  };

  // Detect mobile viewport
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 639px)");
    setIsMobile(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

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

  // Get the selected tool data for mobile view
  const selectedToolData = tools.find((tool) => tool.id === selectedTool);
  const selectedToolIndex = tools.findIndex((tool) => tool.id === selectedTool);

  // Calculate position for mobile stacked cards
  const getStackPosition = (cardIndex: number, toolId: string) => {
    const unselectedCount = tools.length - 1;
    const peekStackHeight = unselectedCount * PEEK_HEIGHT;

    if (cardIndex === selectedToolIndex) {
      // Selected card - positioned after all the peeks, highest z-index
      return {
        translateY: peekStackHeight,
        zIndex: 50,
        scale: 1,
      };
    }

    // Calculate position in the peek stack (excluding selected card)
    let peekPosition = cardIndex;
    if (cardIndex > selectedToolIndex) {
      peekPosition = cardIndex - 1;
    }

    // During transition, keep the previously selected card at a higher z-index
    // so it doesn't disappear behind other cards while animating back
    let zIndex = 10 + peekPosition;
    if (isTransitioning && toolId === prevSelectedTool) {
      zIndex = 45; // Just below the newly selected card
    }

    return {
      translateY: peekPosition * PEEK_HEIGHT,
      zIndex,
      scale: 1,
    };
  };

  // Calculate total height for mobile stack container
  const mobileStackHeight = (tools.length - 1) * PEEK_HEIGHT + CARD_HEIGHT;

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

          {/* Cards - Mobile Stacked / Desktop Overlapping */}
          {isMobile ? (
            /* Mobile: Stacked card layout */
            <div
              className="relative mx-auto mb-8 px-4"
              style={{ height: mobileStackHeight }}
            >
              {tools.map((tool, index) => {
                const isYellow = tool.bgColor === "#fefc22";
                const isMint = tool.bgColor === "#00ffd7";
                const useDarkText = isYellow || isMint;
                const isSelected = selectedTool === tool.id;
                const position = getStackPosition(index, tool.id);

                return (
                  <div
                    key={tool.id}
                    onClick={() => handleCardSelect(tool.id)}
                    className={`absolute left-4 right-4 rounded-3xl cursor-pointer transition-all duration-400`}
                    style={{
                      backgroundColor: tool.bgColor,
                      height: CARD_HEIGHT,
                      transform: `translateY(${position.translateY}px) scale(${position.scale})`,
                      zIndex: position.zIndex,
                      boxShadow: isSelected
                        ? `0 0 60px ${tool.bgColor}60, 0 0 100px ${tool.bgColor}30, 0 10px 40px rgba(0,0,0,0.3)`
                        : `0 0 30px ${tool.bgColor}40, 0 4px 20px rgba(0,0,0,0.2)`,
                      transitionTimingFunction: "cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                  >
                    {/* Peek header - icon and title side by side */}
                    <div className="absolute top-4 left-4 right-4 flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-full flex-shrink-0 ${useDarkText ? "bg-black/10" : "bg-white/20"
                          } backdrop-blur-sm flex items-center justify-center text-xl`}
                      >
                        {tool.icon}
                      </div>
                      <h3
                        className={`text-lg font-bold ${useDarkText ? "text-black" : "text-white"
                          }`}
                      >
                        {tool.title}
                      </h3>
                    </div>

                    {/* Full content - only visible on selected card */}
                    {isSelected && (
                      <div className="absolute bottom-6 left-0 right-0 text-center px-4">
                        <span
                          className={`text-sm font-medium ${useDarkText ? "text-black/70" : "text-white/80"
                            }`}
                        >
                          {tool.id === "raising" ? "Coming soon" : "See what's inside"}
                        </span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            /* Desktop: Overlapping horizontal layout */
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
          )}

          {/* Description Panel */}
          {isMobile ? (
            /* Mobile: Always visible description for selected tool */
            <div className="bg-gray-800 rounded-3xl p-6 mt-4 mx-4">
              {selectedToolData && (
                <div key={selectedTool} className="space-y-6">
                  {/* Text Content */}
                  <div className="text-white">
                    <h3 className="text-xl font-bold mb-3">
                      How it works
                    </h3>
                    <p className="text-gray-300 text-base leading-relaxed">
                      {selectedToolData.explanation}
                    </p>
                  </div>

                  {/* Image */}
                  <div className="relative">
                    <div className="aspect-video rounded-2xl bg-gray-700 overflow-hidden border-2 border-white shadow-xl">
                      <img
                        src={
                          selectedToolData.image ||
                          "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"
                        }
                        alt={`${selectedToolData.title} preview`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>

                  {/* Access Tools Button */}
                  <div className="text-center">
                    {selectedToolData.id === "raising" ? (
                      <Link
                        to="/vibe-raising"
                        className={`font-bold py-3 px-8 rounded-full text-base transition-all duration-300 hover:scale-105 active:scale-95 inline-block ${selectedToolData.bgColor === "#fefc22" || selectedToolData.bgColor === "#00ffd7"
                          ? "text-black"
                          : "text-white"
                          }`}
                        style={{
                          backgroundColor: selectedToolData.bgColor,
                          boxShadow: `0 0 30px #bf8bff80, 0 4px 15px rgba(0, 0, 0, 0.3)`
                        }}
                      >
                        Open {selectedToolData.title}
                      </Link>
                    ) : (
                      <button
                        className={`font-bold py-3 px-8 rounded-full text-base transition-all duration-300 ${selectedToolData.bgColor === "#fefc22" || selectedToolData.bgColor === "#00ffd7"
                          ? "text-black"
                          : "text-white"
                          }`}
                        style={{
                          backgroundColor: selectedToolData.bgColor,
                          boxShadow: `0 0 30px ${selectedToolData.bgColor}60, 0 4px 15px rgba(0, 0, 0, 0.3)`
                        }}
                      >
                        Open {selectedToolData.title}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Desktop: Hover-based expanding panel */
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
                      hoveredToolData.id === "raising" ? (
                        <Link
                          to="/vibe-raising"
                          className={`font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 hover:scale-105 inline-block ${hoveredToolData.bgColor === "#fefc22" || hoveredToolData.bgColor === "#00ffd7"
                            ? "text-black"
                            : "text-white"
                            }`}
                          style={{
                            backgroundColor: hoveredToolData.bgColor,
                            boxShadow: `0 0 40px #bf8bff80, 0 4px 20px rgba(0, 0, 0, 0.3)`
                          }}
                        >
                          Open {hoveredToolData.title}
                        </Link>
                      ) : (
                        <button
                          className={`font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 ${hoveredToolData.bgColor === "#fefc22" || hoveredToolData.bgColor === "#00ffd7"
                            ? "text-black"
                            : "text-white"
                            }`}
                          style={{
                            backgroundColor: hoveredToolData.bgColor,
                            boxShadow: `0 0 40px ${hoveredToolData.bgColor}60, 0 4px 20px rgba(0, 0, 0, 0.3)`
                          }}
                        >
                          Open {hoveredToolData.title}
                        </button>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
