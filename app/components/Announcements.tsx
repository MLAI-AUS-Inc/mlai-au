import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';

export interface Announcement {
    id: string
    title: string
    body: string
    date: string
    datetime: string
    author: {
        name: string
        imageUrl: string
        href: string
    }
}

interface AnnouncementsProps {
    announcements: Announcement[]
}

export default function Announcements({ announcements }: AnnouncementsProps) {
    // Take only the first 3 announcements
    const recentAnnouncements = announcements.slice(0, 3)

    return (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
            </div>
            <ul role="list" className="divide-y divide-gray-200">
                {recentAnnouncements.map((announcement) => (
                    <AnnouncementItem key={announcement.id} announcement={announcement} />
                ))}
            </ul>
        </div>
    )
}

function AnnouncementItem({ announcement }: { announcement: Announcement }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 300; // Character limit for truncation
    const shouldTruncate = announcement.body.length > maxLength;

    const displayedBody = isExpanded || !shouldTruncate
        ? announcement.body
        : announcement.body.slice(0, maxLength) + "...";

    return (
        <li className="px-6 py-6">
            <article aria-labelledby={'announcement-title-' + announcement.id}>
                <div className="flex space-x-3">
                    <div className="shrink-0">
                        <img alt="" src={announcement.author.imageUrl} className="size-10 rounded-full" />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium text-gray-900">
                            <a href={announcement.author.href} className="hover:underline">
                                {announcement.author.name}
                            </a>
                        </p>
                        <p className="text-sm text-gray-500">
                            <time dateTime={announcement.datetime}>{timeAgo(announcement.datetime)}</time>
                        </p>
                    </div>
                    <div className="flex shrink-0 self-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className="relative flex items-center rounded-full text-gray-400 hover:text-gray-600">
                                <span className="absolute -inset-2" />
                                <span className="sr-only">Open options</span>
                                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                            </MenuButton>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className="flex px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"
                                        >
                                            Report content
                                        </a>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <h3 id={'announcement-title-' + announcement.id} className="mt-4 text-base font-medium text-gray-900">
                    {announcement.title}
                </h3>
                <div className="mt-2 text-sm text-gray-700 prose prose-sm max-w-none">
                    <ReactMarkdown>
                        {displayedBody}
                    </ReactMarkdown>
                </div>
                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline focus:outline-none"
                    >
                        {isExpanded ? "Show less" : "Show more"}
                    </button>
                )}
            </article>
        </li>
    );
}

function timeAgo(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
        return Math.floor(interval) + " years ago";
    }
    interval = seconds / 2592000;
    if (interval > 1) {
        return Math.floor(interval) + " months ago";
    }
    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days ago";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours ago";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes ago";
    }
    return Math.floor(seconds) + " seconds ago";
}
