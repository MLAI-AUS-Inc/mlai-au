import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  BookOpenIcon,
  ChevronDownIcon,
  DocumentTextIcon,
  HomeIcon,
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
  const location = useLocation();
  const fullName = user.full_name || user.email || "User";
  const avatarUrl = user.avatar_url || generateAvatarUrl(getInitials(fullName));
  const isWattTheme = config.theme === "watt";

  const navigation = [
    { name: "Dashboard", href: `${config.basePath}/dashboard`, icon: HomeIcon },
    { name: "Profile & Team", href: `${config.basePath}/profile`, icon: UserGroupIcon },
    { name: "Submissions", href: `${config.basePath}/submissions`, icon: DocumentTextIcon },
    { name: "Resources", href: `${config.basePath}/resources`, icon: BookOpenIcon },
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

  const wattSidebar = (
    <div className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-[rgba(91,82,56,0.14)] bg-[rgba(255,253,247,0.96)] px-5 pb-5 shadow-[14px_0_36px_rgba(67,54,33,0.06)]">
      <div className="flex min-h-28 shrink-0 flex-col justify-center border-b border-[#e7dfcf] py-5">
        <Link to={`${config.basePath}/dashboard`} className="block" onClick={() => setSidebarOpen(false)}>
          <img
            src={wattImages.logoDesktop}
            alt="Watt The Hack"
            className="hidden h-16 w-full object-contain object-left sm:block"
          />
          <img
            src={wattImages.logoMobile}
            alt="Watt The Hack"
            className="h-16 w-auto object-contain sm:hidden"
          />
        </Link>
        <div className="mt-4 flex items-center gap-2 text-xs font-bold uppercase tracking-[0.16em] text-[#6f756c]">
          <img src={wattImages.mlaiLogo} alt="" className="h-6 w-6 rounded-md object-contain" />
          <span>MLAI Hackathon</span>
        </div>
      </div>
      <nav className="flex flex-1 flex-col">
        <ul className="flex flex-1 flex-col gap-y-7">
          <li>
            <ul className="-mx-2 space-y-1.5">
              {navigation.map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={classNames(
                      item.current
                        ? "border-[#c9dbb8] bg-[#dfead1] text-[#1f5b2c] shadow-[0_10px_24px_rgba(31,91,44,0.08)]"
                        : "border-transparent text-[#394033] hover:border-[#e7dfcf] hover:bg-[#fbf7ea] hover:text-[#1f5b2c]",
                      "group flex items-center gap-x-3 rounded-2xl border px-3 py-2.5 text-sm font-black leading-6 transition",
                    )}
                  >
                    <item.icon className="h-5 w-5 shrink-0" aria-hidden="true" />
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </li>
          <li className="mt-auto">
            <Link
              to="/hackathons"
              className="group -mx-2 flex items-center gap-x-3 rounded-2xl border border-[#e7dfcf] bg-[#fbf7ea] px-3 py-2.5 text-sm font-black leading-6 text-[#394033] transition hover:border-[#3d7339]/35 hover:bg-[#dfead1] hover:text-[#1f5b2c]"
            >
              <ArrowLeftOnRectangleIcon className="h-5 w-5 shrink-0" aria-hidden="true" />
              Back to MLAI
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );

  const sidebar = isWattTheme ? wattSidebar : defaultSidebar;

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
            <div className={isWattTheme ? "fixed inset-0 bg-[#20231d]/55 backdrop-blur-sm" : "fixed inset-0 bg-black/70"} />
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
                {sidebar}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      <aside className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        {sidebar}
      </aside>

      <div className="lg:pl-72">
        <header
          className={classNames(
            isWattTheme
              ? "sticky top-0 z-40 flex h-20 shrink-0 items-center gap-x-4 border-b border-[#e7dfcf] bg-[rgba(255,253,247,0.82)] px-4 shadow-[0_12px_28px_rgba(67,54,33,0.06)] backdrop-blur-xl sm:gap-x-6 sm:px-6 lg:px-8"
              : "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-black/10 bg-white/90 px-4 shadow-sm backdrop-blur sm:gap-x-6 sm:px-6 lg:px-8",
          )}
        >
          <button
            type="button"
            className={classNames(
              isWattTheme
                ? "-m-2.5 rounded-full p-2.5 text-[#1f5b2c] transition hover:bg-[#dfead1]"
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
              <p className={isWattTheme ? wattClasses.eyebrow : "text-xs font-semibold uppercase tracking-[0.24em] text-[#1f6f54]"}>
                Hackathon
              </p>
              <h1 className={isWattTheme ? "text-base font-black text-[#20231d]" : "text-base font-semibold text-gray-950"}>{config.name}</h1>
            </div>
            <Menu as="div" className="relative">
              <Menu.Button
                className={classNames(
                  isWattTheme
                    ? "-m-1.5 flex items-center rounded-full p-1.5 transition hover:bg-[#fbf7ea]"
                    : "-m-1.5 flex items-center p-1.5",
                )}
              >
                <span className="sr-only">Open user menu</span>
                <img
                  alt=""
                  src={avatarUrl}
                  className={classNames(
                    isWattTheme
                      ? "h-9 w-9 rounded-full bg-[#fbf7ea] object-cover ring-2 ring-[#dfead1]"
                      : "h-8 w-8 rounded-full bg-gray-50 object-cover ring-1 ring-black/10",
                  )}
                />
                <span className="hidden lg:flex lg:items-center">
                  <span className={isWattTheme ? "ml-4 text-sm font-black leading-6 text-[#20231d]" : "ml-4 text-sm font-semibold leading-6 text-gray-900"}>{fullName}</span>
                  <ChevronDownIcon className={isWattTheme ? "ml-2 h-5 w-5 text-[#6f756c]" : "ml-2 h-5 w-5 text-gray-400"} aria-hidden="true" />
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
                      ? "absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-2xl border border-[#e7dfcf] bg-[#fffdf7] py-2 shadow-[0_18px_42px_rgba(67,54,33,0.12)] focus:outline-none"
                      : "absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 focus:outline-none",
                  )}
                >
                  <Menu.Item>
                    {({ focus }) => (
                      <Link
                        to={`${config.basePath}/profile`}
                        className={classNames(
                          isWattTheme
                            ? focus && "bg-[#dfead1] text-[#1f5b2c]"
                            : focus && "bg-gray-50",
                          isWattTheme
                            ? "block px-4 py-2 text-sm font-bold leading-6 text-[#394033]"
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
                              ? focus && "bg-[#dfead1] text-[#1f5b2c]"
                              : focus && "bg-gray-50",
                            isWattTheme
                              ? "block w-full px-4 py-2 text-left text-sm font-bold leading-6 text-[#394033]"
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
