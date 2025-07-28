'use client'
import { Dialog } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import LogRocket from 'logrocket';
LogRocket.init('4s6cqz/mlai-website');

const navigation = [
    { name: 'About', href: '/#about' },
    { name: 'Events', href: '/#upcoming-events' },
    { name: 'Volunteer', href: 'https://forms.gle/GwZR49kwTMszLKtN8', target: "_blank", rel: "noopener noreferrer" },
    { name: 'Contact', href: '/contact' },
    { name: 'Blog', href: 'https://mlaiaus.substack.com/archive', target: "_blank", rel: "noopener noreferrer" },
];

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    return (
        <header className="fixed inset-x-0 top-0 z-50 bg-black bg-opacity-60 backdrop-filter backdrop-blur-lg ">
            <nav className="flex items-center justify-between p-2 lg:px-4" aria-label="Global">
                <div className="flex lg:flex-1">
                    <a href="/" className="-m-1.5 p-1.5">
                        <span className="sr-only">MLAI - Empowering the Australian AI Community</span>
                        <img
                            className="h-6 w-auto"
                            src="/text_logo.png"
                            alt="MLAI text logo"
                        />
                    </a>
                </div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white "
                        onClick={() => setMobileMenuOpen(true)}
                    >
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>
                <div className="hidden lg:flex lg:gap-x-12">
                {navigation.map((item) => (
                        <a
                            key={item.name}
                            href={item.href}
                            className="text-sm font-semibold leading-6 text-white hover:text-teal-300 transition duration-200 ease-in-out"
                            // Add target attribute if it exists in the item object
                            target={item.target ? item.target : undefined}
                            // Add rel attribute if target="_blank" for security reasons
                            rel={item.target === '_blank' ? 'noopener noreferrer' : undefined}
                        >
                            {item.name}
                        </a>
                    ))}
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="#join" className="text-sm font-semibold leading-6 text-white hover:text-teal-300 transition duration-200 ease-in-out">
                        Join Us <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
            <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen}>
                <div className="fixed inset-0 z-50 lg:hidden transition" />
                <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-black px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                    <div className="flex items-center justify-between">
                        <a href="#" className="-m-1.5 p-1.5">
                            <span className="sr-only">MLAI - Empowering the Australian AI Community</span>
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
                        <div className="-my-6 divide-y divide-gray-200">
                            {navigation.map((item) => (
                                <a
                                    key={item.name}
                                    href={item.href}
                                    className="-mx-3 block py-2 text-base font-semibold leading-7 text-white hover:text-teal-300"
                                >
                                    {item.name}
                                </a>
                            ))}
                        </div>
                    </div>
                </Dialog.Panel>
            </Dialog>
        </header>
    );
}
