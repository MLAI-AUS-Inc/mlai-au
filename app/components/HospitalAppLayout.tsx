import { useState, Fragment } from 'react';
import { Menu, Dialog, Transition } from '@headlessui/react';
import {
    Bars3Icon,
    BellIcon,
    ChevronDownIcon,
    HomeIcon,
    XMarkIcon,
    UsersIcon,
    TrophyIcon,
    DocumentArrowUpIcon,
    BookOpenIcon,
    UserCircleIcon,
    Cog6ToothIcon,
} from '@heroicons/react/24/outline';
import { Link, useLocation, Form } from 'react-router';
import { getInitials, generateAvatarUrl } from '~/lib/avatar';

interface User {
    email: string;
    full_name: string;
    avatar_url?: string;
}

interface HospitalAppLayoutProps {
    children: React.ReactNode;
    user: User;
}

function classNames(...classes: (string | undefined | boolean)[]) {
    return classes.filter(Boolean).join(' ');
}

export default function HospitalAppLayout({ children, user }: HospitalAppLayoutProps) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [isExpanded, setIsExpanded] = useState(false);
    const location = useLocation();

    const navigation = [
        { name: 'Dashboard', href: '/hospital/app', icon: HomeIcon },
        { name: 'My Team', href: '/hospital/app/team', icon: UsersIcon },
        { name: 'Leaderboard', href: '/hospital/app/leaderboard', icon: TrophyIcon },
        { name: 'Submit', href: '/hospital/app/submit', icon: DocumentArrowUpIcon },
        { name: 'Resources', href: '/hospital/app/resources', icon: BookOpenIcon },
        { name: 'Profile', href: '/hospital/app/profile', icon: UserCircleIcon },
    ];

    const updatedNavigation = navigation.map(item => ({
        ...item,
        current: location.pathname === item.href || (item.href === '/hospital/app' && location.pathname === '/hospital/app/dashboard'),
    }));

    const userNavigation = [
        { name: 'Dashboard', href: '/hospital/app' },
        { name: 'Profile', href: '/hospital/app/profile' },
    ];

    // Generate avatar URL
    const avatarUrl = user?.avatar_url || generateAvatarUrl(getInitials(user?.full_name || ''));
    const fullName = user?.full_name || 'User';

    return (
        <>
            <div>
                {/* Mobile sidebar */}
                <Transition.Root show={sidebarOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="relative z-50 lg:hidden"
                        onClose={setSidebarOpen}
                    >
                        {/* Backdrop */}
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
                            {/* Sidebar panel */}
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
                                    {/* Close button */}
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

                                    {/* Sidebar content */}
                                    <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#783f8e] px-6 pb-2">
                                        <div className="flex h-16 shrink-0 items-center">
                                            <Link to="/hospital/app" className="flex items-center">
                                                <img
                                                    className="h-10"
                                                    src="https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/Team%20Formation%20Night%20Slides%20(2).png?alt=media&token=5a1b7fb7-6dd4-4699-9d88-d8db97ff68db"
                                                    alt="Medhack logo"
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
                                                                            ? 'bg-white bg-opacity-10 text-[#e2a9f1]'
                                                                            : 'text-white hover:bg-white hover:bg-opacity-10 hover:text-[#e2a9f1]',
                                                                        'group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6',
                                                                        'transition-all duration-200 ease-in-out'
                                                                    )}
                                                                >
                                                                    <item.icon
                                                                        className={classNames(
                                                                            item.current ? 'text-[#e2a9f1]' : 'text-white group-hover:text-[#e2a9f1]',
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
                                                    <Link
                                                        to="/hospital/app/settings"
                                                        className="group -mx-2 flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6 text-white hover:bg-white hover:bg-opacity-10 hover:text-[#e2a9f1] transition-all duration-200 ease-in-out"
                                                        onClick={() => setSidebarOpen(false)}
                                                    >
                                                        <Cog6ToothIcon
                                                            className="h-6 w-6 shrink-0 text-white group-hover:text-[#e2a9f1] transition-colors duration-200"
                                                            aria-hidden="true"
                                                        />
                                                        Settings
                                                    </Link>
                                                </li>
                                            </ul>
                                        </nav>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition.Root>

                {/* Desktop sidebar */}
                <aside
                    className={`hidden lg:flex fixed left-0 top-0 z-50 h-screen flex-col bg-[#783f8e] transition-all duration-300 ease-in-out ${isExpanded ? 'w-64' : 'w-20'
                        }`}
                    onMouseEnter={() => setIsExpanded(true)}
                    onMouseLeave={() => setIsExpanded(false)}
                >
                    <div className="flex h-full flex-col">
                        {/* Logo */}
                        <div className="flex h-20 items-center justify-center px-4">
                            <Link to="/hospital/app" className="flex items-center">
                                <img
                                    className={`transition-all duration-300 ${isExpanded ? 'h-10' : 'h-10'}`}
                                    src="https://firebasestorage.googleapis.com/v0/b/medhack-ai.firebasestorage.app/o/Team%20Formation%20Night%20Slides%20(2).png?alt=media&token=5a1b7fb7-6dd4-4699-9d88-d8db97ff68db"
                                    alt="Medhack logo"
                                />
                            </Link>
                        </div>

                        {/* Navigation */}
                        <nav className="flex-1 space-y-1 px-3 py-4">
                            {updatedNavigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.href}
                                    className={classNames(
                                        item.current
                                            ? 'bg-white bg-opacity-10 text-[#e2a9f1]'
                                            : 'text-white hover:bg-white hover:bg-opacity-10 hover:text-[#e2a9f1]',
                                        'group flex items-center rounded-lg px-3 py-2 text-sm font-medium transition-all duration-200'
                                    )}
                                >
                                    <item.icon
                                        className={`flex-shrink-0 h-6 w-6 transition-all duration-300 ${isExpanded ? 'mr-3' : 'mr-0'
                                            }`}
                                        aria-hidden="true"
                                    />
                                    <span
                                        className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'
                                            } overflow-hidden whitespace-nowrap`}
                                    >
                                        {item.name}
                                    </span>
                                </Link>
                            ))}
                        </nav>

                        {/* Settings at bottom */}
                        <div className="px-3 pb-4">
                            <Link
                                to="/hospital/app/settings"
                                className="group flex items-center rounded-lg px-3 py-2 text-sm font-medium text-white hover:bg-white hover:bg-opacity-10 hover:text-[#e2a9f1] transition-all duration-200"
                            >
                                <Cog6ToothIcon
                                    className={`flex-shrink-0 h-6 w-6 transition-all duration-300 ${isExpanded ? 'mr-3' : 'mr-0'
                                        }`}
                                    aria-hidden="true"
                                />
                                <span
                                    className={`transition-all duration-300 ${isExpanded ? 'opacity-100' : 'opacity-0 w-0'
                                        } overflow-hidden whitespace-nowrap`}
                                >
                                    Settings
                                </span>
                            </Link>
                        </div>
                    </div>
                </aside>

                <div className="lg:pl-20">
                    {/* Top bar */}
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
                        <button
                            type="button"
                            onClick={() => setSidebarOpen(true)}
                            className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
                        >
                            <span className="sr-only">Open sidebar</span>
                            <Bars3Icon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Separator */}
                        <div aria-hidden="true" className="h-6 w-px bg-gray-900/10 lg:hidden" />

                        <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
                            <div className="relative flex flex-1"></div>
                            <div className="flex items-center gap-x-4 lg:gap-x-6">
                                <button type="button" className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">View notifications</span>
                                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                                </button>

                                {/* Separator */}
                                <div aria-hidden="true" className="hidden lg:block lg:h-6 lg:w-px lg:bg-gray-900/10" />

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <Menu.Button className="-m-1.5 flex items-center p-1.5">
                                        <span className="sr-only">Open user menu</span>
                                        <img
                                            alt={`${fullName}'s avatar`}
                                            src={avatarUrl}
                                            className="h-8 w-8 rounded-full bg-gray-50 shadow-sm ring-2 ring-gray-900/5 object-cover"
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
                                                                'block px-3 py-1 text-sm leading-6 text-gray-900'
                                                            )}
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    )}
                                                </Menu.Item>
                                            ))}
                                            <Menu.Item>
                                                {({ focus }) => (
                                                    <Form method="post" action="/platform/logout">
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

                    {/* Main content */}
                    <main className="bg-gray-50">
                        {children}
                    </main>
                </div>
            </div>
        </>
    );
}
