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
    navigation?: NavigationItem[];
    userNavigation?: { name: string; href: string }[];
    logoutAction?: string;
}

type NavigationItem = { name: string; href: string; icon: any; exact?: boolean };

function classNames(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(' ');
}

export default function AuthenticatedLayout({ children, user, navigation: customNavigation, userNavigation: customUserNavigation, logoutAction = "/platform/logout" }: AuthenticatedLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();
    const pathname = location.pathname;
    const isFounderToolsApp = pathname === "/founder-tools" || pathname.startsWith("/founder-tools/");
    const appHomeHref = isFounderToolsApp ? "/founder-tools/updates" : "/esafety/dashboard";

    const defaultNavigation: NavigationItem[] = [
        { name: 'Dashboard', href: '/esafety/dashboard', icon: HomeIcon },
        { name: 'Profile', href: '/esafety/profile', icon: UserCircleIcon },
        { name: 'Submissions', href: '/esafety/leaderboard', icon: TrophyIcon },
        { name: 'Resources', href: '/esafety/resources', icon: BookOpenIcon },
    ];

    const navigation = customNavigation || defaultNavigation;

    const updatedNavigation = navigation.map(item => ({
        ...item,
        current: item.exact
            ? pathname === item.href
            : pathname === item.href || (item.href !== '/esafety' && pathname.startsWith(item.href)),
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

                                    <div
                                        className={classNames(
                                            "flex grow flex-col gap-y-5 overflow-y-auto px-6 pb-2",
                                            isFounderToolsApp ? "bg-[var(--vr-color-app-bg)]" : "bg-white"
                                        )}
                                    >
                                        <div className="flex h-16 shrink-0 items-center">
                                            <Link
                                                to={appHomeHref}
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
                                                                        isFounderToolsApp
                                                                            ? item.current
                                                                                ? 'bg-[var(--vr-color-shell-active)] text-[var(--vr-color-shell-active-text)]'
                                                                                : 'text-[var(--vr-color-text-mid)] hover:bg-[rgba(0,255,215,0.16)] hover:text-[var(--vr-color-text)]'
                                                                            : item.current
                                                                                ? 'bg-gray-50 text-indigo-600'
                                                                                : 'text-gray-700 hover:bg-gray-50 hover:text-indigo-600',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                                        'transition-all duration-200 ease-in-out'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            isFounderToolsApp
                                                                                ? item.current
                                                                                    ? 'text-[var(--vr-color-shell-active-text)]'
                                                                                    : 'text-[var(--vr-color-text-sub)] group-hover:text-[var(--vr-color-text)]'
                                                                                : item.current ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600',
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
                                                        className={classNames(
                                                            "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200 ease-in-out",
                                                            isFounderToolsApp
                                                                ? "text-[var(--vr-color-text-mid)] hover:bg-[rgba(0,255,215,0.16)] hover:text-[var(--vr-color-text)]"
                                                                : "text-gray-700 hover:bg-gray-50 hover:text-indigo-600"
                                                        )}
                                                    >
                                                        <ArrowLeftOnRectangleIcon
                                                            className={classNames(
                                                                "h-6 w-6 shrink-0 transition-colors duration-200",
                                                                isFounderToolsApp
                                                                    ? "text-[var(--vr-color-text-sub)] group-hover:text-[var(--vr-color-text)]"
                                                                    : "text-gray-400 group-hover:text-indigo-600"
                                                            )}
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
                        "hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:flex-col transition-all duration-300 ease-in-out",
                        isExpanded ? "w-64" : "w-20"
                    )}
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                >
                    <div
                        className={classNames(
                            "flex grow flex-col gap-y-5 overflow-y-auto overflow-x-hidden px-6",
                            isFounderToolsApp ? "bg-[var(--vr-color-shell-sidebar)]" : "bg-indigo-600"
                        )}
                    >
                        <div className="flex h-16 shrink-0 items-center mt-4 justify-center">
                            <ImageWithFallback
                                className={classNames("h-auto transition-all duration-300", isExpanded ? "w-72 max-w-none" : "w-16")}
                                src={isExpanded
                                    ? "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/Untitled%20design%20(27).png?alt=media&token=39cbb611-0854-4d36-b3f3-ad200c5e9abd"
                                    : "https://firebasestorage.googleapis.com/v0/b/mlai-main-website.firebasestorage.app/o/MLAI-Logo.png?alt=media&token=9d844530-e3b5-4944-a1c7-5be3112d5d84"}
                                alt="MLAI Logo"
                                width={220}
                                height={80}
                            />
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
                                                        isFounderToolsApp
                                                            ? item.current
                                                                ? 'bg-[var(--vr-color-shell-active)] text-[var(--vr-color-shell-active-text)]'
                                                                : 'text-[var(--vr-color-shell-muted)] hover:bg-[var(--vr-color-shell-hover)] hover:text-white'
                                                            : item.current
                                                                ? 'bg-indigo-700 text-white'
                                                                : 'text-white hover:bg-indigo-700 hover:text-white',
                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200',
                                                        isExpanded ? '' : 'justify-center'
                                                    )}
                                                >
                                                    <item.icon
                                                        className={classNames(
                                                            isFounderToolsApp
                                                                ? item.current
                                                                    ? 'text-[var(--vr-color-shell-active-text)]'
                                                                    : 'text-[var(--vr-color-shell-muted)] group-hover:text-white'
                                                                : item.current ? 'text-white' : 'text-white group-hover:text-white',
                                                            'h-6 w-6 shrink-0 transition-all duration-300',
                                                            isExpanded ? 'mr-0' : 'mr-0'
                                                        )}
                                                        aria-hidden="true"
                                                    />
                                                    <span
                                                        className={classNames(
                                                            "transition-all duration-300 overflow-hidden whitespace-nowrap",
                                                            isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 ml-0"
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
                                        className={classNames(
                                            "group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 transition-all duration-200",
                                            isFounderToolsApp
                                                ? "text-[var(--vr-color-shell-muted)] hover:bg-[var(--vr-color-shell-hover)] hover:text-white"
                                                : "text-white hover:bg-indigo-700 hover:text-white",
                                            isExpanded ? '' : 'justify-center'
                                        )}
                                    >
                                        <ArrowLeftOnRectangleIcon
                                            aria-hidden="true"
                                            className={classNames(
                                                "h-6 w-6 shrink-0 group-hover:text-white",
                                                isFounderToolsApp ? "text-[var(--vr-color-shell-muted)]" : "text-white"
                                            )}
                                        />
                                        <span
                                            className={classNames(
                                                "transition-all duration-300 overflow-hidden whitespace-nowrap",
                                                isExpanded ? "opacity-100 w-auto ml-3" : "opacity-0 w-0 ml-0"
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

                <div className={classNames("lg:pl-20 transition-all duration-300 ease-in-out", isExpanded ? "lg:pl-64" : "lg:pl-20")}>
                    {/* Header */}
                    <div
                        className={classNames(
                            "sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8",
                            isFounderToolsApp
                                ? "border-[var(--vr-color-border)] bg-[var(--vr-color-topbar)]"
                                : "border-gray-200 bg-white"
                        )}
                    >
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className={classNames(
                                "-m-2.5 p-2.5 lg:hidden",
                                isFounderToolsApp ? "text-[var(--vr-color-text)]" : "text-gray-700"
                            )}
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        <div
                            aria-hidden="true"
                            className={classNames(
                                "h-6 w-px lg:hidden",
                                isFounderToolsApp ? "bg-[var(--vr-color-border)]" : "bg-gray-900/10"
                            )}
                        />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <form action="#" method="GET" className="relative flex flex-1">
                                <label htmlFor="search-field" className="sr-only">
                                    Search
                                </label>
                                <MagnifyingGlassIcon
                                    aria-hidden="true"
                                    className={classNames(
                                        "pointer-events-none absolute inset-y-0 left-0 h-full w-5",
                                        isFounderToolsApp ? "text-[var(--vr-color-text-sub)]" : "text-gray-400"
                                    )}
                                />
                                <input
                                    id="search-field"
                                    name="search"
                                    type="search"
                                    placeholder="Search..."
                                    className={classNames(
                                        "block h-full w-full border-0 bg-transparent py-0 pl-8 pr-0 focus:ring-0 sm:text-sm",
                                        isFounderToolsApp
                                            ? "text-[var(--vr-color-text)] placeholder:text-[var(--vr-color-text-sub)]"
                                            : "text-gray-900 placeholder:text-gray-400"
                                    )}
                                />
                            </form>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button
                                    type="button"
                                    className={classNames(
                                        "-m-2.5 p-2.5",
                                        isFounderToolsApp
                                            ? "text-[var(--vr-color-text-sub)] hover:text-[var(--vr-color-text)]"
                                            : "text-gray-400 hover:text-gray-500"
                                    )}
                                >
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>

                                <div
                                    aria-hidden="true"
                                    className={classNames(
                                        "hidden lg:block lg:h-6 lg:w-px",
                                        isFounderToolsApp ? "lg:bg-[var(--vr-color-border)]" : "lg:bg-gray-900/10"
                                    )}
                                />

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
                                                className={classNames(
                                                    "ml-4 text-sm font-semibold leading-6",
                                                    isFounderToolsApp ? "text-[var(--vr-color-text)]" : "text-gray-900"
                                                )}
                                            >
                                                {fullName}
                                            </span>
                                            <ChevronDownIcon
                                                aria-hidden="true"
                                                className={classNames(
                                                    "ml-2 h-5 w-5",
                                                    isFounderToolsApp ? "text-[var(--vr-color-text-sub)]" : "text-gray-400"
                                                )}
                                            />
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
                                                "absolute right-0 z-10 mt-2.5 w-56 origin-top-right rounded-md py-2 shadow-lg ring-1 focus:outline-none",
                                                isFounderToolsApp
                                                    ? "bg-[var(--vr-color-card)] ring-[rgba(11,11,11,0.08)]"
                                                    : "bg-white ring-gray-900/5"
                                            )}
                                        >
                                            {userNavigation.map((item) => (
                                                <Menu.Item key={item.name}>
                                                    {({ focus }) => (
                                                        <Link
                                                            to={item.href}
                                                            className={classNames(
                                                                isFounderToolsApp
                                                                    ? focus ? 'bg-[rgba(0,255,215,0.14)]' : ''
                                                                    : focus ? 'bg-gray-100' : '',
                                                                isFounderToolsApp
                                                                    ? 'block px-3 py-1 text-sm leading-6 text-[var(--vr-color-text)]'
                                                                    : 'block px-3 py-1 text-sm leading-6 text-gray-900',
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
                                                                isFounderToolsApp
                                                                    ? focus ? 'bg-[rgba(0,255,215,0.14)]' : ''
                                                                    : focus ? 'bg-gray-100' : '',
                                                                isFounderToolsApp
                                                                    ? 'block w-full text-left px-3 py-1 text-sm leading-6 text-[var(--vr-color-text)]'
                                                                    : 'block w-full text-left px-3 py-1 text-sm leading-6 text-gray-900'
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

                    <main
                        className={classNames(
                            "py-4 sm:py-6 lg:py-6 px-4 sm:px-6 lg:px-4",
                            isFounderToolsApp ? "bg-[var(--vr-color-app-bg)]" : "bg-gray-50"
                        )}
                    >
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
