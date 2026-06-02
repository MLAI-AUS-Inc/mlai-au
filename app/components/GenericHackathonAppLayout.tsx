import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
  DocumentTextIcon,
  HomeIcon,
  HomeModernIcon,
  PresentationChartBarIcon,
  UserGroupIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import { Form, Link, useLocation } from "react-router";
import { generateAvatarUrl, getInitials } from "~/lib/avatar";
import { wattBackgroundStyle, wattClasses, wattImages } from "~/lib/watt-theme";
import type { User } from "~/types/user";

interface GenericHackathonAppLayoutProps {
  children: React.ReactNode;
  user: User;
  config: {
    name: string;
    slug: string;
    basePath: string;
    accentClass?: string;
    theme?: "default" | "watt";
  };
}

function classNames(...classes: (string | false | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

export default function GenericHackathonAppLayout({ children, user, config }: GenericHackathonAppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const location = useLocation();
  const fullName = user.full_name || user.email || "User";
  const avatarUrl = user.avatar_url || generateAvatarUrl(getInitials(fullName));
  const isWattTheme = config.theme === "watt";

  const navigation = [
    { name: "Dashboard", href: `${config.basePath}/dashboard`, icon: HomeIcon },
    { name: "Profile & Team", href: `${config.basePath}/profile`, icon: UserGroupIcon },
    { name: "Submissions", href: `${config.basePath}/submissions`, icon: DocumentTextIcon },
    { name: "Resources", href: `${config.basePath}/resources`, icon: BookOpenIcon },
    ...(isWattTheme
      ? [
          { name: "Base44 (Pitching) Track", href: `${config.basePath}/base44-pitching`, icon: PresentationChartBarIcon },
          { name: "City Of Melbourne (Advanced) Track", href: `${config.basePath}/city-of-melbourne-advanced`, icon: BuildingOffice2Icon },
          { name: "Smart Home (Beginner) Track", href: `${config.basePath}/smart-home-beginner`, icon: HomeModernIcon },
        ]
      : []),
  ].map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  const defaultSidebar = (
    <div className="flex grow flex-col gap-y-6 overflow-y-auto bg-[#10231f] px-5 pb-4">
      <div className="flex h-16 shrink-0 items-center">
        <Link to={`${config.basePath}/dashboard`} className="flex items-center gap-3" onClick={() => setSidebarOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#9fe870] text-sm font-black text-[#10231f]">
            W
          </span>
          <span className="text-sm font-semibold text-white">{config.name}</span>
        </Link>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={classNames(
                      item.current
                        ? "bg-white/10 text-[#9fe870]"
                        : "text-white/72 hover:bg-white/8 hover:text-white",
                      "group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition",
                    )}
                  >
                    <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <Link
              to="/hackathons"
              className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white/70 hover:bg-white/8 hover:text-white"
            >
              <ArrowLeftOnRectangleIcon className="h-6 w-6 shrink-0" aria-hidden="true" />
              Back to MLAI
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );

  const wattSidebar = (expanded: boolean, mobile = false) => (
    <div className="relative flex grow flex-col overflow-hidden border-r border-[#e8dfcf] bg-[rgba(255,254,250,0.98)] shadow-[10px_0_28px_rgba(82,67,39,0.06)]">
      <div
        className={classNames(
          "relative z-10 flex shrink-0 items-center",
          mobile ? "h-28 px-6" : expanded ? "h-[132px] justify-start px-5" : "h-[132px] justify-center px-1",
        )}
      >
        <Link
          to={`${config.basePath}/dashboard`}
          className={classNames("relative block overflow-visible", mobile || expanded ? "h-[72px] w-[188px]" : "h-[68px] w-[68px]")}
          onClick={() => setSidebarOpen(false)}
        >
          <img
            src={wattImages.logoDesktop}
            alt="Watt The Hack"
            className={classNames(
              "absolute inset-0 h-full w-full object-contain object-left transition-all duration-300 ease-in-out",
              mobile || expanded ? "scale-100 opacity-100" : "scale-90 opacity-0",
            )}
          />
          <img
            src={wattImages.logoMobile}
            alt="Watt The Hack"
            className={classNames(
              "absolute inset-0 h-full w-full object-contain object-center transition-all duration-300 ease-in-out",
              mobile || expanded ? "scale-95 opacity-0" : "scale-100 opacity-100",
            )}
          />
        </Link>
      </div>

      <img
        src={wattImages.sidebarScene}
        alt=""
        className={classNames(
          "pointer-events-none absolute -left-10 bottom-24 z-0 w-[292px] max-w-none transition-all duration-300 ease-in-out",
          mobile || expanded ? "translate-x-0 opacity-100" : "-translate-x-24 opacity-100",
        )}
      />

      <nav className="relative z-10 flex flex-1 flex-col px-3 pb-5">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="space-y-4">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={classNames(
                      item.current
                        ? "bg-[#e6efd7] text-[#155420]"
                        : "text-[#354031] hover:bg-[#fbf6e9] hover:text-[#155420]",
                      "group flex min-h-[52px] items-center rounded-xl px-3 py-2 text-sm font-black leading-6 transition-all duration-200",
                      mobile || expanded ? "justify-start gap-x-3" : "justify-center gap-x-0",
                    )}
                  >
                    <item.icon className="h-7 w-7 shrink-0 stroke-[1.7]" aria-hidden="true" />
                    <span
                      className={classNames(
                        "min-w-0 overflow-hidden transition-all duration-300 ease-in-out",
                        mobile || expanded ? "ml-1 w-full whitespace-normal opacity-100" : "ml-0 w-0 whitespace-nowrap opacity-0",
                      )}
                    >
                      {item.name}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <Link
              to="/hackathons"
              onClick={() => setSidebarOpen(false)}
              className={classNames(
                "group flex h-[52px] items-center rounded-xl px-3 text-sm font-black leading-6 text-[#354031] transition-all duration-200 hover:bg-[#fbf6e9] hover:text-[#155420]",
                mobile || expanded ? "justify-start gap-x-3" : "justify-center gap-x-0",
              )}
            >
              <ArrowLeftOnRectangleIcon className="h-7 w-7 shrink-0 stroke-[1.7]" aria-hidden="true" />
              <span
                className={classNames(
                  "overflow-hidden whitespace-nowrap transition-all duration-300 ease-in-out",
                  mobile || expanded ? "ml-1 w-auto opacity-100" : "ml-0 w-0 opacity-0",
                )}
              >
                Back to MLAI
              </span>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );

  const mobileSidebar = isWattTheme ? wattSidebar(true, true) : defaultSidebar;

  return (
    <div className={isWattTheme ? wattClasses.appShell : "min-h-screen bg-[#f5f1e8]"} style={isWattTheme ? wattBackgroundStyle : undefined}>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className={isWattTheme ? "fixed inset-0 bg-[#121e16]/55 backdrop-blur-sm" : "fixed inset-0 bg-black/70"} />
          </Transition.Child>
          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <button
                  type="button"
                  className="absolute left-full top-0 flex w-16 justify-center pt-5"
                  onClick={() => setSidebarOpen(false)}
                >
                  <span className="sr-only">Close sidebar</span>
                  <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                </button>
                {mobileSidebar}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {isWattTheme ? (
        <aside
          className={classNames(
            "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ease-in-out",
            isExpanded ? "lg:w-[268px]" : "lg:w-20",
          )}
          onMouseEnter={() => setIsExpanded(true)}
          onMouseLeave={() => setIsExpanded(false)}
        >
          {wattSidebar(isExpanded)}
        </aside>
      ) : (
        <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
          {defaultSidebar}
        </aside>
      )}

      <div className={classNames(
        isWattTheme
          ? "transition-all duration-300 ease-in-out lg:pl-20"
          : "lg:pl-72",
        isWattTheme && isExpanded ? "lg:pl-[268px]" : undefined,
      )}>
        <header
          className={classNames(
            isWattTheme
              ? "sticky top-0 z-40 flex h-[84px] shrink-0 items-center gap-x-4 border-b border-[#e8dfcf] bg-[rgba(255,254,250,0.86)] px-4 shadow-[0_8px_24px_rgba(82,67,39,0.05)] backdrop-blur-xl sm:gap-x-6 sm:px-6 lg:px-8"
              : "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-black/10 bg-white/90 px-4 shadow-sm backdrop-blur sm:gap-x-6 sm:px-6 lg:px-8",
          )}
        >
          <button
            type="button"
            className={classNames(
              isWattTheme
                ? "-m-2.5 rounded-full p-2.5 text-[#155420] transition hover:bg-[#e6efd7]"
                : "-m-2.5 p-2.5 text-gray-700",
              "lg:hidden",
            )}
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 items-center justify-between">
            <div>
              <p className={isWattTheme ? "text-xs font-black uppercase tracking-[0.32em] text-[#2f6f2c]" : "text-xs font-semibold uppercase tracking-[0.24em] text-[#1f6f54]"}>
                Hackathon
              </p>
              <h1 className={isWattTheme ? "mt-1 text-lg font-black text-[#121e16]" : "text-base font-semibold text-gray-950"}>{config.name}</h1>
            </div>
            <Menu as="div" className="relative">
              <Menu.Button
                className={classNames(
                  isWattTheme
                    ? "-m-1.5 flex items-center rounded-full p-1.5 transition hover:bg-[#fbf6e9]"
                    : "-m-1.5 flex items-center p-1.5",
                )}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src={avatarUrl}
                  className={classNames(
                    isWattTheme
                      ? "h-10 w-10 rounded-full bg-[#fbf6e9] object-cover ring-2 ring-[#e6efd7]"
                      : "h-8 w-8 rounded-full bg-gray-50 object-cover ring-1 ring-black/10",
                  )}
                />
                <span className="hidden lg:flex lg:items-center">
                  <span className={isWattTheme ? "ml-4 text-sm font-black leading-6 text-[#121e16]" : "ml-4 text-sm font-semibold leading-6 text-gray-900"}>{fullName}</span>
                  <ChevronDownIcon className={isWattTheme ? "ml-2 h-5 w-5 text-[#64705f]" : "ml-2 h-5 w-5 text-gray-400"} aria-hidden="true" />
                </span>
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items
                  className={classNames(
                    isWattTheme
                      ? "absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-2xl border border-[#e8dfcf] bg-[#fffefa] py-2 shadow-[0_18px_42px_rgba(82,67,39,0.12)] focus:outline-none"
                      : "absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none",
                  )}
                >
                  <Menu.Item>
                    {({ focus }) => (
                      <Link
                        to={`${config.basePath}/profile`}
                        className={classNames(
                          isWattTheme
                            ? focus && "bg-[#e6efd7] text-[#155420]"
                            : focus && "bg-gray-50",
                          isWattTheme
                            ? "block px-4 py-2 text-sm font-bold leading-6 text-[#354031]"
                            : "block px-3 py-1 text-sm leading-6 text-gray-900",
                        )}
                      >
                        Profile
                      </Link>
                    )}
                  </Menu.Item>
                  <Menu.Item>
                    {({ focus }) => (
                      <Form method="post" action="/platform/logout">
                        <button
                          type="submit"
                          className={classNames(
                            isWattTheme
                              ? focus && "bg-[#e6efd7] text-[#155420]"
                              : focus && "bg-gray-50",
                            isWattTheme
                              ? "block w-full px-4 py-2 text-left text-sm font-bold leading-6 text-[#354031]"
                              : "block w-full px-3 py-1 text-left text-sm leading-6 text-gray-900",
                          )}
                        >
                          Sign out
                        </button>
                      </Form>
                    )}
                  </Menu.Item>
                </Menu.Items>
              </Transition>
            </Menu>
          </div>
        </header>
        <main>{children}</main>
      </div>
    </div>
  );
}
