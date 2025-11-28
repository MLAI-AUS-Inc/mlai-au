import { Dialog } from "@headlessui/react";
import {
  Bars3Icon,
  BookOpenIcon,
  BriefcaseIcon,
  CalendarIcon,
  EnvelopeIcon,
  HandRaisedIcon,
  HomeIcon,
  UserGroupIcon,
  XMarkIcon,
  InformationCircleIcon,
  CommandLineIcon,
} from "@heroicons/react/24/outline";
import { useState } from "react";

const navigation = [
  { name: "Home", href: "/", icon: HomeIcon },
  { name: "About", href: "/#about", icon: InformationCircleIcon },
  { name: "Events", href: "/events", icon: CalendarIcon },
  {
    name: "Post a Bounty Job",
    href: "https://mlaiau.notion.site/2619c67419c880ad8654df2ec0998a74?pvs=105",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: BriefcaseIcon,
  },
  {
    name: "Volunteer",
    href: "https://forms.gle/GwZR49kwTMszLKtN8",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: HandRaisedIcon,
  },
  { name: "Contact", href: "/contact", icon: EnvelopeIcon },
  {
    name: "Blog",
    href: "https://mlaiaus.substack.com/archive",
    target: "_blank",
    rel: "noopener noreferrer",
    icon: BookOpenIcon,
  },
  { name: "Members", href: "/members", icon: UserGroupIcon },
  { name: "Hackathons", href: "/hackathons", icon: CommandLineIcon },
];

export default function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md p-2.5 text-white bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg"
          onClick={() => setMobileMenuOpen(true)}
        >
          <span className="sr-only">Open main menu</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
      {/* Desktop sidebar */}
      <aside
        className={`hidden lg:flex fixed left-0 top-0 z-40 h-screen flex-col bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg transition-all duration-300 ease-in-out ${isExpanded ? "w-64" : "w-20"
          }`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-20 items-center justify-center px-4">
            <a href="/" className="flex items-center">
              <img
                className={`transition-all duration-300 ${isExpanded ? "h-8" : "h-10"}`}
                src={isExpanded ? "/text_logo.png" : "/MLAI-Logo.png"}
                alt="MLAI logo"
              />
            </a>
          </div>
          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 hover:text-teal-300 transition-all duration-200"
                target={item.target}
                rel={
                  item.target === "_blank" ? "noopener noreferrer" : undefined
                }
              >
                <item.icon
                  className={`flex-shrink-0 h-6 w-6 transition-all duration-300 ${isExpanded ? "mr-3" : "mr-0"
                    }`}
                  aria-hidden="true"
                />
                <span
                  className={`transition-all duration-300 ${isExpanded ? "opacity-100" : "opacity-0 w-0"
                    } overflow-hidden whitespace-nowrap`}
                >
                  {item.name}
                </span>
              </a>
            ))}
          </nav>
        </div>
      </aside>
      {/* Mobile menu dialog */}
      <Dialog
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
        className="lg:hidden"
      >
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50" />
        <Dialog.Panel className="fixed inset-y-0 left-0 z-50 w-full max-w-xs overflow-y-auto bg-black bg-opacity-95 backdrop-filter backdrop-blur-lg px-6 py-6">
          <div className="flex items-center justify-between">
            <a href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">
                MLAI - Empowering the Australian AI Community
              </span>
              <img
                className="h-8 w-auto"
                src="/text_logo.png"
                alt="MLAI text logo"
              />
            </a>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-white"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <nav className="space-y-2">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="flex items-center rounded-lg px-3 py-2 text-base font-medium text-white hover:bg-white hover:bg-opacity-10 hover:text-teal-300"
                  target={item.target}
                  rel={
                    item.target === "_blank" ? "noopener noreferrer" : undefined
                  }
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon
                    className="mr-3 h-6 w-6 flex-shrink-0"
                    aria-hidden="true"
                  />
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        </Dialog.Panel>
      </Dialog>
    </>
  );
}
