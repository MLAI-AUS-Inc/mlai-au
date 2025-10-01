import { useState, useEffect } from "react";
import {
  InformationCircleIcon,
  UserGroupIcon,
  PhoneIcon,
} from "@heroicons/react/24/outline";

const sponsorNavigation = [
  {
    name: "Why Sponsor MLAI?",
    href: "#why-sponsor",
    icon: InformationCircleIcon,
  },
  {
    name: "Current Sponsors",
    href: "#current-sponsors",
    icon: UserGroupIcon,
  },
  {
    name: "Get in Touch",
    href: "#contact-sponsorship",
    icon: PhoneIcon,
  },
];

export default function SponsorsSideNav() {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      const sections = sponsorNavigation.map((item) =>
        item.href.replace("#", "")
      );
      const scrollPosition = window.scrollY + 100; // offset for header

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(`#${section}`);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Call once to set initial active section

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSmoothScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string
  ) => {
    e.preventDefault();
    const element = document.getElementById(href.replace("#", ""));
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  return (
    <nav className="hidden xl:flex xl:w-64 xl:fixed xl:right-8 xl:top-32 xl:flex-col xl:space-y-2">
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 shadow-lg border border-gray-200">
        <h3 className="text-sm font-semibold text-gray-900 mb-3">
          Page Navigation
        </h3>
        <ul className="space-y-1">
          {sponsorNavigation.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={(e) => handleSmoothScroll(e, item.href)}
                className={`group flex items-center rounded-md px-2 py-1.5 text-sm font-medium transition-colors ${
                  activeSection === item.href
                    ? "bg-teal-50 text-teal-600"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`mr-2 h-4 w-4 flex-shrink-0 ${
                    activeSection === item.href
                      ? "text-teal-500"
                      : "text-gray-400 group-hover:text-gray-500"
                  }`}
                  aria-hidden="true"
                />
                {item.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}