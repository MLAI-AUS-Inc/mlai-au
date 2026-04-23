import { useState, Fragment } from 'react';
import { Menu, Dialog, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
    ChevronDownIcon,
    HomeIcon,
    MagnifyingGlassIcon,
    UserCircleIcon,
    XMarkIcon,
    UsersIcon,
    TrophyIcon,
    DocumentArrowUpIcon,
    BookOpenIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation, Form } from 'react-router';
import { ImageWithFallback } from './ImageWithFallback';
import { getInitials, generateAvatarUrl } from '~/lib/avatar';
import type { User } from '~/types/user';

interface AuthenticatedLayoutProps {
    children: React.ReactNode;
    user: User;
    navigation?: { name: string; href: string; icon: any }[];
    userNavigation?: { name: string; href: string }[];
    logoutAction?: string;
}

function classNames(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(' ');
}

export default function AuthenticatedLayout({ children, user, navigation: customNavigation, userNavigation: customUserNavigation, logoutAction = "/platform/logout" }: AuthenticatedLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;

    const defaultNavigation = [
        { name: 'Dashboard', href: '/esafety/dashboard', icon: HomeIcon },
        { name: 'Profile', href: '/esafety/profile', icon: UserCircleIcon },
        { name: 'Submissions', href: '/esafety/leaderboard', icon: TrophyIcon },
        { name: 'Resources', href: '/esafety/resources', icon: BookOpenIcon },
    ];

    const navigation = customNavigation || defaultNavigation;

    // Determine the single active nav item using longest-match-wins:
    // the item whose href is the most specific prefix of the current pathname.
    // This prevents both "/vibe-raising" and "/vibe-raising/companies" from
    // being marked active when the user is on /vibe-raising/companies.
    const activeIndex = navigation.reduce<number>((best, item, idx, arr) => {
        const isMatch =
            pathname === item.href || pathname.startsWith(item.href + "/");
        if (!isMatch) return best;
        if (best === -1) return idx;
        return item.href.length > arr[best].href.length ? idx : best;
    }, -1);

    const updatedNavigation = navigation.map((item, idx) => ({
        ...item,
        current: idx === activeIndex,
    }));

    const defaultUserNavigation = [
        { name: 'Dashboard', href: '/esafety/dashboard' },
        { name: 'Profile', href: '/esafety/profile' },
    ];

    const userNavigation = customUserNavigation || defaultUserNavigation;

    const avatarUrl = user?.avatar_url || generateAvatarUrl(getInitials(user?.full_name || ''));
    const fullName = user?.full_name || 'User';

    return (
        <>
            <div>
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        open={sidebarOpen}
                        onClose={setSidebarOpen}
                    >
                        <Transition.Child
                            as={Fragment}
                            enter="transition-opacity ease-in-out duration-400"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="transition-opacity ease-in-out duration-400"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="fixed inset-0 bg-gray-900/80" />
                        </Transition.Child>

                        <div className="fixed inset-0 flex">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-400"
                                enterFrom="-translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-400"
                                leaveFrom="translate-x-0"
                                leaveTo="-translate-x-full"
                            >
                                <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                                    <Transition.Child
                                        as={Fragment}
                                        enter="transition ease-in-out duration-300"
                                        enterFrom="opacity-0"
                                        enterTo="opacity-100"
                                        leave="transition ease-in-out duration-300"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                                            <button
                                                type="button"
                                                className="-m-2.5 p-2.5 transition-transform duration-200 hover:scale-110"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <span className="sr-only">Close sidebar</span>
                                                <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                                            </button>
                                        </div>
                                    </Transition.Child>

                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-2">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <Link
                                                to="/esafety/dashboard"
                                                onClick={() => setSidebarOpen(false)}
                                            >
                                                <ImageWithFallback
                                                    className="h-8 w-auto"
                                                    src="/MLAI-Logo.png"
                                                    alt="MLAI Logo"
                                                    width={160}
                                                    height={48}
                                                />
                                            </Link>
                                        </div>

                                        <nav className="flex flex-1 flex-col">
                                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                                <li>
                                                    <ul role="list" className="-mx-2 space-y-1">
                                                        {updatedNavigation.map((item) => (
                                                            <li key={item.name}>
                                                                <Link
                                                                    to={item.href}
                                                                    onClick={() => setSidebarOpen(false)}
                                                                    className={classNames(
                                                                        item.current
                                                                            ? 'bg-gray-50 text-indigo-600'
                                                                            : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                                        'transition-all duration-200 ease-in-out'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
                                                                            'h-6 w-6 shrink-0',
                                                                            'transition-colors duration-200'
                                                                        )}
                                                                        aria-hidden="true"
                                                                    />
                                                                    {item.name}
                                                                </Link>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </li>

                                                <li className="mt-auto">
                                                    <a
                                                        href="/"
                                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-gray-700 hover:bg-gray-50 hover:text-indigo-600 transition-all duration-200 ease-in-out"
                                                    >
                                                        <ArrowLeftOnRectangleIcon
                                                            className="h-6 w-6 shrink-0 text-gray-400 group-hover:text-indigo-600 transition-colors duration-200"
                                                            aria-hidden="true"
                                                        />
                                                        Back to MLAI
                                                    </a>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Static sidebar for desktop with hover animation */}
                <div
                    className={classNames(
                        "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col",
                        "transition-[width] duration-[320ms]",
                        isExpanded ? "w-64" : "w-20"
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                >
                    <div
                        className="flex grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden px-6"
                        style={{
                            background:
                                "linear-gradient(180deg, var(--vr-color-brand-purple, #6B30D9) 0%, var(--vr-color-purple-700, #4A1FA0) 100%)",
                        }}
                    >
                        <div className="flex h-16 shrink-0 items-center mt-4 gap-3 -mx-2 pl-2">
                            {/* Logo stays constant size and source — no swap, no disappear */}
                            <ImageWithFallback
                                className="w-10 h-10 shrink-0 rounded-md object-contain"
                                src="https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/MLAI-Logo.png?alt=media&token=9d844530-e3b5-4944-a1c7-5be3112d5d84"
                                alt="MLAI Logo"
                                width={40}
                                height={40}
                            />
                            {/* Wordmark appears to the right when expanded, fades in, no layout jump */}
                            <span
                                className={classNames(
                                    "overflow-hidden whitespace-nowrap font-bold tracking-wide text-white",
                                    "transition-[opacity,margin-left] duration-200",
                                    isExpanded ? "opacity-100 ml-1 delay-100" : "opacity-0 ml-0"
                                )}
                                style={{ fontFamily: "var(--vr-font-title, 'Oswald', sans-serif)", fontSize: "16px", letterSpacing: "0.06em" }}
                            >
                                MLAI
                            </span>
                        </div>
                        <nav className="flex flex-1 flex-col">
                            <ul role="list" className="flex flex-1 flex-col gap-y-7">
                                <li>
                                    <ul role="list" className="-mx-2 space-y-1">
                                        {updatedNavigation.map((item) => (
                                            <li key={item.name}>
                                                <Link
                                                    to={item.href}
                                                    title={isExpanded ? undefined : item.name}
                                                    aria-label={isExpanded ? undefined : item.name}
                                                    className={classNames(
                                                        "relative group flex items-center rounded-md p-2 text-sm font-semibold leading-6 text-white",
                                                        "transition-colors duration-200",
                                                        item.current
                                                            ? "bg-white/15"
                                                            : "hover:bg-white/10"
                                                    )}
                                                >
                                                    {/* Active left-accent bar */}
                                                    {item.current && (
                                                        <span
                                                            aria-hidden="true"
                                                            className="absolute left-0 top-1.5 bottom-1.5 w-[3px] rounded-r-full"
                                                            style={{ background: "var(--vr-color-brand-teal, #00C8CC)" }}
                                                        />
                                                    )}
                                                    <item.icon
                                                        className="h-6 w-6 shrink-0 text-white"
                                                        aria-hidden="true"
                                                    />
                                                    <span
                                                        className={classNames(
                                                            "overflow-hidden whitespace-nowrap",
                                                            "transition-[opacity,margin-left] duration-200",
                                                            isExpanded
                                                                ? "opacity-100 ml-3 delay-100"
                                                                : "opacity-0 ml-0"
                                                        )}
                                                    >
                                                        {item.name}
                                                    </span>
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                                <li className="mt-auto mb-4">
                                    <a
                                        href="/"
                                        className="group flex items-center rounded-md p-2 text-sm font-semibold leading-6 text-white/80 hover:bg-white/10 hover:text-white transition-colors duration-200"
                                    >
                                        <ArrowLeftOnRectangleIcon
                                            aria-hidden="true"
                                            className="h-6 w-6 shrink-0"
                                        />
                                        <span
                                            className={classNames(
                                                "overflow-hidden whitespace-nowrap",
                                                "transition-[opacity,margin-left] duration-200",
                                                isExpanded
                                                    ? "opacity-100 ml-3 delay-100"
                                                    : "opacity-0 ml-0"
                                            )}
                                        >
                                            Back to MLAI
                                        </span>
                                    </a>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>

                <div
                    className={classNames(
                        "transition-[padding-left] duration-[320ms]",
                        isExpanded ? "lg:pl-64" : "lg:pl-20"
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)" }}
                >
                    {/* Header */}
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button type="button" onClick={() => setSidebarOpen(true)} className="-m-2.5 p-2.5 text-gray-700 lg:hidden">
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form action="#" method="GET" className="relative flex flex-1">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    aria-hidden="true"
                                    className="pointer-events-none absolute inset-y-0 left-0 h-full w-5 text-gray-400"
                                />
                                <input
                                    id="search-field"
                                    name="search"
                                    type="search"
                                    placeholder="Search..."
                                    className="block h-full w-full border-0 py-0 pl-8 pr-0 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm"
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>

                                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <ImageWithFallback
                                            alt={`${fullName}'s avatar`}
                                            src={avatarUrl}
                                            fallbackSrc={generateAvatarUrl('NA')}
                                            width={32}
                                            height={32}
                                            className="h-8 w-8 rounded-full bg-gray-50 shadow-sm ring-2 -ring-inset-1 ring-gray-900/5 object-cover"
                                        />
                                        <span className="hidden lg:flex lg:items-center">
                                            <span
                                                aria-hidden="true"
                                                className="ml-4 text-sm font-semibold leading-6 text-gray-900"
                                            >
                                                {fullName}
                                            </span>
                                            <ChevronDownIcon aria-hidden="true" className="ml-2 h-5 w-5 text-gray-400" />
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
                                        <Menu.Items className="absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ focus }) => (
                                                        <Link
                                                            to={item.href}
                                                            className={classNames(
                                                                focus ? 'bg-gray-100' : '',
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900',
                                                            )}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                            <Menu.Item>
                                                {({ focus }) => (
                                                    <Form method="post" action={logoutAction}>
                                                        <button
                                                            type="submit"
                                                            className={classNames(
                                                                focus ? 'bg-gray-100' : '',
                                                                'block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900'
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
                        </div>
                    </div>

                    <main className="bg-gray-50 py-4 sm:py-6 lg:py-6 px-4 sm:px-6 lg:px-4">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
