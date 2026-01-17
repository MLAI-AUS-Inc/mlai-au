import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

// Section markers configuration - matches the visual order on the page
const sectionMarkers = [
    {
        sectionId: "hello",
        name: "Hello",
        color: "#ff3d00", // Orange
    },
    {
        sectionId: "events",
        name: "Events",
        color: "#4b0db3", // Purple
    },
    {
        sectionId: "founder-tools",
        name: "Founder Tools",
        color: "#1a1a1a", // Black
    },
    {
        sectionId: "people",
        name: "People",
        color: "#3537dc", // Blue
    },
    {
        sectionId: "articles",
        name: "Articles",
        color: "#fefc22", // Yellow
    },
];

export default function SectionMarkers() {
    const [activeSection, setActiveSection] = useState<string>("hello");
    const observerRef = useRef<IntersectionObserver | null>(null);
    const location = useLocation();
    const isHomePage = location.pathname === "/";

    // Set up Intersection Observer for section detection
    useEffect(() => {
        if (!isHomePage) return;

        const sectionIds = sectionMarkers.map((marker) => marker.sectionId);

        const observerOptions: IntersectionObserverInit = {
            root: null,
            rootMargin: "-20% 0px -60% 0px",
            threshold: 0,
        };

        observerRef.current = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        }, observerOptions);

        // Observe all sections with a small delay to ensure DOM is ready
        const timer = setTimeout(() => {
            sectionIds.forEach((id) => {
                const element = document.getElementById(id);
                if (element) {
                    observerRef.current?.observe(element);
                }
            });
        }, 100);

        return () => {
            clearTimeout(timer);
            observerRef.current?.disconnect();
        };
    }, [isHomePage]);

    // Handle click to scroll to section
    const handleMarkerClick = useCallback((sectionId: string) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    }, []);

    if (!isHomePage) return null;

    return (
        <div className="fixed right-0 top-1/2 -translate-y-1/2 z-30 hidden lg:flex flex-col gap-2 pr-3">
            {sectionMarkers.map((marker) => {
                const isActive = activeSection === marker.sectionId;
                return (
                    <button
                        key={marker.sectionId}
                        onClick={() => handleMarkerClick(marker.sectionId)}
                        className={`group relative flex items-center justify-end transition-all duration-300 ease-out`}
                        aria-label={`Go to ${marker.name} section`}
                    >
                        {/* Label - shows on hover */}
                        <span
                            className={`absolute right-full mr-2 px-2 py-1 text-xs font-medium rounded-md whitespace-nowrap
                opacity-0 group-hover:opacity-100 transition-opacity duration-200
                bg-[var(--brutalist-border)] text-white`}
                        >
                            {marker.name}
                        </span>

                        {/* Marker bar */}
                        <div
                            className={`rounded-full transition-all duration-300 ease-out ${isActive
                                ? "w-2 h-8"
                                : "w-1.5 h-4 opacity-50 group-hover:opacity-100 group-hover:h-6"
                                }`}
                            style={{ backgroundColor: marker.color }}
                        />
                    </button>
                );
            })}
        </div>
    );
}
