import { Fragment, useState } from "react";
import { Dialog, Menu, Transition } from "@headlessui/react";
import {
    Bars3Icon,
    BookOpenIcon,
    ChevronDownIcon,
    DocumentArrowUpIcon,
    HomeIcon,
    UserCircleIcon,
    UsersIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router";

import { generateAvatarUrl, getInitials } from "~/lib/avatar";
import type { User } from "~/types/user";

interface InnovateConnectAllianceLayoutProps {
    children: React.ReactNode;
    user: User;
}

function classNames(...classes: (string | boolean | undefined)[]) {
    return classes.filter(Boolean).join(" ");
}

export default function InnovateConnectAllianceLayout({
    children,
    user,
}: InnovateConnectAllianceLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: "Dashboard", href: "/innovate-connect-alliance", icon: HomeIcon },
        { name: "My Team", href: "/innovate-connect-alliance/team", icon: UsersIcon },
        { name: "Submissions", href: "/innovate-connect-alliance/submissions", icon: DocumentArrowUpIcon },
        { name: "Docs", href: "/innovate-connect-alliance/docs", icon: BookOpenIcon },
        { name: "Profile", href: "/innovate-connect-alliance/profile", icon: UserCircleIcon },
    ].map((item) => ({
        ...item,
        current: location.pathname === item.href,
    }));

    const avatarUrl =
        user.avatar_url || generateAvatarUrl(getInitials(user.full_name || "Innovator"));

    return (
        <div className="min-h-screen bg-[#110822] text-white">
            <Transition.Root show={sidebarOpen} as={Fragment}>
                <Dialog as="div" className="relative z-50 lg:hidden" onClose={setSidebarOpen}>
                    <Transition.Child
                        as={Fragment}
                        enter="transition-opacity ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black/70" />
                    </Transition.Child>

                    <div className="fixed inset-0 flex">
                        <Transition.Child
                            as={Fragment}
                            enter="transform transition ease-in-out duration-300"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transform transition ease-in-out duration-300"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="flex w-full max-w-xs flex-1 flex-col bg-[#1a0e2e] px-6 pb-6">
                                <div className="flex h-16 items-center justify-between">
                                    <Link to="/innovate-connect-alliance" onClick={() => setSidebarOpen(false)}>
                                        <span className="text-sm font-black uppercase tracking-[0.3em] text-[#8ef4d4]">
                                            ICA
                                        </span>
                                    </Link>
                                    <button
                                        type="button"
                                        className="rounded-md p-2 text-white/70"
                                        onClick={() => setSidebarOpen(false)}
                                    >
                                        <span className="sr-only">Close sidebar</span>
                                        <XMarkIcon className="h-6 w-6" />
                                    </button>
                                </div>

                                <nav className="mt-6 flex flex-1 flex-col gap-y-2">
                                    {navigation.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.href}
                                            onClick={() => setSidebarOpen(false)}
                                            className={classNames(
                                                item.current
                                                    ? "bg-white/10 text-[#8ef4d4]"
                                                    : "text-white/75 hover:bg-white/5 hover:text-white",
                                                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-semibold"
                                            )}
                                        >
                                            <item.icon className="h-5 w-5" />
                                            {item.name}
                                        </Link>
                                    ))}
                                </nav>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            <aside className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-72 lg:flex-col">
                <div className="flex grow flex-col gap-y-6 overflow-y-auto border-r border-white/10 bg-[#1a0e2e] px-6 py-8">
                    <Link to="/innovate-connect-alliance" className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-[#8ef4d4] text-[#110822]">
                            <span className="text-sm font-black uppercase tracking-[0.25em]">ICA</span>
                        </div>
                        <div>
                            <p className="text-xs uppercase tracking-[0.24em] text-[#8ef4d4]/80">
                                Innovate
                            </p>
                            <p className="text-sm font-semibold text-white">Connect Alliance</p>
                        </div>
                    </Link>

                    <nav className="flex flex-1 flex-col gap-y-2">
                        {navigation.map((item) => (
                            <Link
                                key={item.name}
                                to={item.href}
                                className={classNames(
                                    item.current
                                        ? "bg-white/10 text-[#8ef4d4]"
                                        : "text-white/75 hover:bg-white/5 hover:text-white",
                                    "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-semibold"
                                )}
                            >
                                <item.icon className="h-5 w-5" />
                                {item.name}
                            </Link>
                        ))}
                    </nav>

                    <a
                        href="/platform/logout"
                        className="rounded-lg border border-white/10 px-3 py-2 text-sm font-semibold text-white/80 hover:bg-white/5"
                    >
                        Logout
                    </a>
                </div>
            </aside>

            <div className="lg:pl-72">
                <header className="sticky top-0 z-30 border-b border-white/10 bg-[#110822]/90 backdrop-blur">
                    <div className="flex h-16 items-center gap-x-4 px-4 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            className="rounded-md p-2 text-white/70 lg:hidden"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon className="h-6 w-6" />
                        </button>

                        <div className="flex-1">
                            <p className="text-sm font-semibold text-white">Innovate Connect Alliance</p>
                        </div>

                        <Menu as="div" className="relative">
                            <Menu.Button className="flex items-center gap-3 rounded-full bg-white/5 px-2 py-1.5 text-sm text-white/80 ring-1 ring-white/10">
                                <img src={avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                                <span className="hidden sm:block">{user.full_name || user.email}</span>
                                <ChevronDownIcon className="h-4 w-4" />
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
                                <Menu.Items className="absolute right-0 mt-2 w-52 rounded-md bg-[#1a0e2e] p-1 shadow-xl ring-1 ring-white/10 focus:outline-none">
                                    <Menu.Item>
                                        {({ active }) => (
                                            <Link
                                                to="/innovate-connect-alliance/team"
                                                className={classNames(
                                                    active && "bg-white/5",
                                                    "block rounded-md px-3 py-2 text-sm text-white/80"
                                                )}
                                            >
                                                Manage Profile
                                            </Link>
                                        )}
                                    </Menu.Item>
                                    <Menu.Item>
                                        {({ active }) => (
                                            <a
                                                href="/platform/logout"
                                                className={classNames(
                                                    active && "bg-white/5",
                                                    "block rounded-md px-3 py-2 text-sm text-white/80"
                                                )}
                                            >
                                                Logout
                                            </a>
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
