import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation } from "react-router";

// Navigation items with section IDs for scroll detection
const navigation = [
  {
    number: "1",
    name: "Hello",
    href: "/#hello",
    sectionId: "hello", // Logo Cloud + "We Are MLAI" section
    color: "#ff3d00", // Orange
  },
  {
    number: "2",
    name: "Events",
    href: "/#events",
    sectionId: "events", // Upcoming Events section
    color: "#4b0db3", // Purple
  },
  {
    number: "3",
    name: "Bounties",
    href: "https://mlaiau.notion.site/2619c67419c880ad8654df2ec0998a74?pvs=105",
    target: "_blank",
    color: "#1a1a1a", // Black (external link - no section)
  },
  {
    number: "4",
    name: "People",
    href: "/#people",
    sectionId: "people", // Testimonials + Team section
    color: "#3537dc", // Blue
  },
  {
    number: "5",
    name: "Sponsor",
    href: "/sponsors",
    // No sectionId - navigates to /sponsors page
    color: "#ff003d", // Crimson
  },
  {
    number: "6",
    name: "Articles",
    href: "/#articles",
    sectionId: "articles", // Substack "Monthly updates" section
    color: "#fefc22", // Yellow
  },
  {
    number: "7",
    name: "Login",
    href: "/platform/login",
    color: "#00ffd7", // Mint (external route - no section)
  },
];

export default function Sidebar() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  // Handle scroll state - only on home page
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(false);
      return;
    }

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomePage]);

  // Set up Intersection Observer for section detection
  useEffect(() => {
    if (!isHomePage) return;

    // Get all sections that have IDs matching our navigation
    const sectionIds = navigation
      .filter((item) => item.sectionId)
      .map((item) => item.sectionId!);

    const observerOptions: IntersectionObserverInit = {
      root: null,
      rootMargin: "-30% 0px -50% 0px", // Trigger when section is in the middle-ish of viewport
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, observerOptions);

    // Observe all sections
    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observerRef.current?.observe(element);
      }
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, [isHomePage]);

  // Handle smooth scroll navigation
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: (typeof navigation)[0]) => {
      // Only handle internal hash links on homepage
      if (item.sectionId && isHomePage) {
        e.preventDefault();
        const element = document.getElementById(item.sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          // Update active section immediately for responsiveness
          setActiveSection(item.sectionId);
        }
      }
      // External links and non-homepage navigation handled by default behavior
    },
    [isHomePage]
  );

  // Get the index of the active section in navigation
  const getActiveSectionIndex = useCallback(() => {
    if (!isHomePage) return 0;
    const index = navigation.findIndex((item) => item.sectionId === activeSection);
    return index >= 0 ? index : 0;
  }, [activeSection, isHomePage]);

  const isItemExpanded = (index: number) => {
    if (!isHomePage) return true;
    if (!isScrolled) return true;
    if (hoveredIndex !== null) return index === hoveredIndex;
    // Expand item based on active section when scrolled
    return index === getActiveSectionIndex();
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-3 left-3 z-50">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-xl p-3 bg-[var(--brutalist-beige)] border-2 border-[var(--brutalist-border)] shadow-md min-w-[48px] min-h-[48px]"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6 text-[var(--brutalist-border)]" aria-hidden="true" />
        </button>
      </div>

      {/* Desktop sidebar - 220px width */}
      <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-[220px] flex-col bg-[var(--brutalist-beige)] p-4 gap-2">
        {/* Logo container - Mint background */}
        <a
          href="/"
          className="block w-full aspect-[2/1] rounded-xl bg-[var(--brutalist-mint)] hover:scale-[1.02] transition-transform duration-200 relative group flex items-end justify-center z-50 mb-4"
        >
          {/* Kangaroo image - larger and aligned to bottom, overlapping top */}
          <img
            className="h-[110%] w-auto object-contain object-bottom transition-transform duration-500 group-hover:scale-110 -mt-[40%]"
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Roo_MLAI.png?alt=media&token=10e962dd-6636-4dcc-9b49-9de4c62ebc82"
            alt="MLAI Kangaroo logo"
          />
        </a>

        {/* Navigation items */}
        <nav className="flex-1 flex flex-col gap-2">
          {navigation.map((item, index) => {
            const expanded = isItemExpanded(index);
            const isYellow = item.color === "#fefc22";
            const isMint = item.color === "#00ffd7";
            const useDarkText = isYellow || isMint;

            return (
              <a
                key={item.name}
                href={item.href}
                target={item.target}
                rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                className={`relative rounded-xl overflow-hidden transition-all duration-300 ease-out ${expanded ? "flex-1 min-h-[60px]" : "flex-none h-6"
                  }`}
                style={{ backgroundColor: item.color }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={(e) => handleNavClick(e, item)}
              >
                {/* Number label - Reduced weight (font-normal) */}
                <span
                  className={`absolute top-2 left-3 text-lg font-normal transition-opacity duration-200 ${useDarkText ? "text-black" : "text-white"
                    } ${expanded ? "opacity-100" : "opacity-0"}`}
                >
                  {item.number}
                </span>

                {/* Text label - Reduced weight (font-normal) */}
                <span
                  className={`absolute bottom-2 left-3 text-xl font-normal transition-opacity duration-200 ${useDarkText ? "text-black" : "text-white"
                    } ${expanded ? "opacity-100" : "opacity-0"}`}
                >
                  {item.name}
                </span>
              </a>
            );
          })}
        </nav>
      </aside>

      {/* Mobile menu dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        {/* 80% Transparent overlay - click to close */}
        <div className="fixed inset-0 z-50 bg-black/20" onClick={() => setMobileMenuOpen(false)} />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full max-w-xs overflow-y-auto bg-[var(--brutalist-beige)] px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <a href="/" className="block w-16 h-16 rounded-lg bg-[var(--brutalist-mint)] overflow-hidden p-1 flex items-center justify-center">
              <img
                className="h-full w-auto object-contain"
                src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Roo_MLAI.png?alt=media&token=10e962dd-6636-4dcc-9b49-9de4c62ebc82"
                alt="MLAI logo"
              />
            </a>
            <button
              type="button"
              className="rounded-lg p-2 border-2 border-[var(--brutalist-border)]"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <nav className="flex flex-col gap-2">
            {navigation.map((item) => {
              const isYellow = item.color === "#fefc22";
              const isMint = item.color === "#00ffd7";
              const useDarkText = isYellow || isMint;

              return (
                <a
                  key={item.name}
                  href={item.href}
                  target={item.target}
                  rel={item.target === "_blank" ? "noopener noreferrer" : undefined}
                  className="relative flex items-center rounded-lg px-4 py-4"
                  style={{ backgroundColor: item.color }}
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    handleNavClick(e, item);
                  }}
                >
                  <span
                    className={`text-xs font-normal mr-3 ${useDarkText ? "text-black" : "text-white"}`}
                  >
                    {item.number}
                  </span>
                  <span
                    className={`text-base font-normal ${useDarkText ? "text-black" : "text-white"}`}
                  >
                    {item.name}
                  </span>
                </a>
              );
            })}
          </nav>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
