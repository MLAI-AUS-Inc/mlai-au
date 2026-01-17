import { useState } from "react";

interface ToolCard {
  id: string;
  title: string;
  color: string;
  icon: string;
  explanation: string;
  image?: string;
}

const tools: ToolCard[] = [
  {
    id: "coding",
    title: "Vibe Coding",
    color: "from-orange-400 to-orange-500",
    icon: "💻",
    explanation:
      "Access our curated collection of coding templates, best practices, and development resources to accelerate your technical foundation.",
  },
  {
    id: "marketing",
    title: "Vibe Marketing",
    color: "from-teal-300 to-emerald-400",
    icon: "📣",
    explanation:
      "Get marketing templates, growth strategies, and promotional materials to effectively reach your target audience.",
  },
  {
    id: "raising",
    title: "Vibe Raising",
    color: "from-purple-600 to-purple-700",
    icon: "🤝",
    explanation:
      "We will warm intro you to investors in our network if you provide updates on your startup each month.",
  },
  {
    id: "coworking",
    title: "Good Vibes Co-Working",
    color: "from-yellow-300 to-yellow-400",
    icon: "🏢",
    explanation:
      "Access our co-working spaces and connect with fellow founders in a productive, collaborative environment.",
  },
];

export default function FounderTools() {
  const [selectedTool, setSelectedTool] = useState<string | null>(null);

  const handleCardClick = (toolId: string) => {
    setSelectedTool(selectedTool === toolId ? null : toolId);
  };

  const selectedToolData = tools.find((tool) => tool.id === selectedTool);

  return (
    <section id="founder-tools" className="min-h-screen bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-gray-400 text-sm uppercase tracking-widest mb-4">
            FOUNDER TOOLS
          </p>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
            Get templates and checklists
          </h2>
          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">
            Download practical tools tailored to this topic.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {tools.map((tool) => (
            <button
              key={tool.id}
              onClick={() => handleCardClick(tool.id)}
              className={`relative overflow-hidden rounded-3xl p-8 aspect-[3/4] bg-gradient-to-br ${tool.color}
                transition-all duration-300 hover:scale-105 hover:shadow-2xl
                ${selectedTool === tool.id ? "ring-4 ring-white ring-offset-4 ring-offset-black scale-105" : ""}`}
            >
              {/* Icon */}
              <div className="absolute top-8 left-1/2 -translate-x-1/2">
                <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-3xl">
                  {tool.icon}
                </div>
              </div>

              {/* Title */}
              <div className="absolute bottom-20 left-0 right-0 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{tool.title}</h3>
              </div>

              {/* Preview Badge */}
              <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
                <span className="text-white/80 text-sm font-medium">Preview</span>
              </div>
            </button>
          ))}
        </div>

        {/* Expanded View */}
        {selectedToolData && (
          <div className="bg-gray-900 rounded-3xl p-8 md:p-12 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              {/* Text Content */}
              <div className="text-white">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">Explanation:</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {selectedToolData.explanation}
                </p>
              </div>

              {/* Image Placeholder */}
              <div className="relative">
                <div className="aspect-video rounded-2xl bg-gray-800 overflow-hidden border-4 border-white shadow-2xl">
                  <img
                    src={selectedToolData.image || "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop"}
                    alt={selectedToolData.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Access Tools Button */}
            <div className="mt-8 text-center">
              <button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-bold py-4 px-12 rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl">
                Access Tools
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
