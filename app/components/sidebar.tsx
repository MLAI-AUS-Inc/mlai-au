import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";

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
    name: "Founder Tools",
    href: "/#founder-tools",
    sectionId: "founder-tools", // Founder Tools section
    color: "#1a1a1a", // Black
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
    name: "Studio",
    href: "/#mlai-studio",
    sectionId: "mlai-studio", // MLAI Studio teaser section
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
    href: "/hackathons",
    color: "#00ffd7", // Mint (external route - no section)
  },
];

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) return false;
  if (target.isContentEditable) return true;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT";
}

export default function Sidebar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>("hero");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === "/";

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

  const goToItem = useCallback(
    (item: (typeof navigation)[0]) => {
      if (item.sectionId && isHomePage) {
        const element = document.getElementById(item.sectionId);
        if (element) {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          setActiveSection(item.sectionId);
        }
        return;
      }
      navigate(item.href);
    },
    [isHomePage, navigate]
  );

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, item: (typeof navigation)[0]) => {
      if (item.sectionId && isHomePage) {
        e.preventDefault();
        goToItem(item);
      }
    },
    [goToItem, isHomePage]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.repeat) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      if (isTypingTarget(event.target)) return;
      const item = navigation.find((entry) => entry.number === event.key);
      if (!item) return;
      event.preventDefault();
      goToItem(item);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [goToItem]);

  // Get the index of the active section in navigation
  const getActiveSectionIndex = useCallback(() => {
    if (!isHomePage) return 0;
    const index = navigation.findIndex((item) => item.sectionId === activeSection);
    return index >= 0 ? index : 0;
  }, [activeSection, isHomePage]);

  const isItemActive = (index: number) => {
    if (!isHomePage) return false;
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
          className="block w-full aspect-[2/1] rounded-xl bg-[var(--brutalist-mint)] hover:scale-[1.02] transition-transform duration-200 relative group flex items-end justify-center mb-4 overflow-hidden"
        >
          {/* Kangaroo image - larger and aligned to bottom, overlapping top */}
          <img
            className="h-[110%] w-auto object-contain object-bottom transition-transform duration-500 group-hover:scale-110 -mt-[40%]"
            src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Roo_MLAI.png?alt=media&token=10e962dd-6636-4dcc-9b49-9de4c62ebc82"
            alt="MLAI Kangaroo logo"
          />
        </a>

        {/* Navigation items */}
        <nav className="grid min-h-0 flex-1 grid-rows-7 gap-2">
          {navigation.map((item, index) => {
            const active = isItemActive(index);
            const isYellow = item.color === "#fefc22";
            const isMint = item.color === "#00ffd7";
            const useDarkText = isYellow || isMint;

            return (
              <a
                key={item.name}
                href={item.href}
                aria-current={active ? "true" : undefined}
                aria-keyshortcuts={item.number}
                className={`flex h-full min-h-0 flex-col justify-between rounded-xl px-3 py-1.5 ${
                  active ? "shadow-[inset_0_0_0_3px_var(--brutalist-border)]" : ""
                }`}
                style={{ backgroundColor: item.color }}
                onClick={(e) => handleNavClick(e, item)}
              >
                <span
                  className={`block text-lg font-normal leading-none ${useDarkText ? "text-black" : "text-white"}`}
                >
                  {item.number}
                </span>
                <span
                  className={`block whitespace-nowrap text-xl font-normal leading-none ${useDarkText ? "text-black" : "text-white"}`}
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
                  className="relative flex items-center rounded-lg px-4 min-h-[52px]"
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
