import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { MegaphoneIcon } from '@heroicons/react/24/outline'
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
    variant?: "default" | "watt"
}

export default function Announcements({ announcements, variant = "default" }: AnnouncementsProps) {
    // Take only the first 3 announcements
    const recentAnnouncements = announcements.slice(0, 3)
    const isWatt = variant === "watt"

    return (
        <div className={isWatt ? "rounded-[1.25rem] border border-[#c9dbb8] bg-[#e6efd7] shadow-[0_20px_48px_rgba(21,84,32,0.14),0_2px_8px_rgba(21,84,32,0.08)]" : "bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5"}>
            <div className={isWatt ? "border-b border-[#c9dbb8] px-6 py-5" : "p-6 border-b border-gray-200"}>
                {isWatt ? (
                    <div className="flex items-center gap-3">
                        <MegaphoneIcon className="h-8 w-8 fill-[#f0c742]/35 text-[#155420]" aria-hidden="true" />
                        <h2 className="text-xl font-black text-[#102e19]">Announcements</h2>
                    </div>
                ) : (
                    <h2 className="text-lg font-semibold text-gray-900">Announcements</h2>
                )}
            </div>
            <ul role="list" className={isWatt ? "divide-y divide-[#c9dbb8]" : "divide-y divide-gray-200"}>
                {recentAnnouncements.length > 0 ? recentAnnouncements.map((announcement) => (
                    <AnnouncementItem key={announcement.id} announcement={announcement} variant={variant} />
                )) : (
                    <li className={isWatt ? "px-6 py-5 text-sm font-bold text-[#155420]/75" : "px-6 py-6 text-sm text-gray-500"}>
                        No announcements yet.
                    </li>
                )}
            </ul>
        </div>
    )
}

function AnnouncementItem({ announcement, variant }: { announcement: Announcement; variant: "default" | "watt" }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const maxLength = 300; // Character limit for truncation
    const shouldTruncate = announcement.body.length > maxLength;
    const isWatt = variant === "watt";

    const displayedBody = isExpanded || !shouldTruncate
        ? announcement.body
        : announcement.body.slice(0, maxLength) + "...";

    return (
        <li className={isWatt ? "px-6 py-5" : "px-6 py-6"}>
            <article aria-labelledby={'announcement-title-' + announcement.id}>
                <div className="flex space-x-4">
                    <div className="shrink-0">
                        <img
                            alt=""
                            src={announcement.author.imageUrl}
                            className={isWatt ? "size-11 rounded-full border border-[#c9dbb8] bg-[#fffefa] object-cover" : "size-10 rounded-full"}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className={isWatt ? "text-sm font-black text-[#155420]" : "text-sm font-medium text-gray-900"}>
                            <a href={announcement.author.href} className={isWatt ? "hover:text-[#2f6f2c]" : "hover:underline"}>
                                {announcement.author.name}
                            </a>
                        </p>
                        <p className={isWatt ? "text-sm font-medium text-[#64705f]" : "text-sm text-gray-500"}>
                            <time dateTime={announcement.datetime}>{timeAgo(announcement.datetime)}</time>
                        </p>
                    </div>
                    <div className="flex shrink-0 self-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className={isWatt ? "relative flex items-center rounded-full text-[#64705f] hover:bg-[#e6efd7] hover:text-[#155420]" : "relative flex items-center rounded-full text-gray-400 hover:text-gray-600"}>
                                <span className="absolute -inset-2" />
                                <span className="sr-only">Open options</span>
                                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                            </MenuButton>
                            <MenuItems
                                transition
                                className={isWatt ? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl border border-[#e8dfcf] bg-[#fffefa] shadow-[0_18px_42px_rgba(82,67,39,0.12)] transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in" : "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"}
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className={isWatt ? "flex px-4 py-2 text-sm font-bold text-[#354031] data-[focus]:bg-[#e6efd7] data-[focus]:text-[#155420] data-[focus]:outline-none" : "flex px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"}
                                        >
                                            Report content
                                        </a>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <h3 id={'announcement-title-' + announcement.id} className={isWatt ? "mt-4 text-base font-black text-[#102e19]" : "mt-4 text-base font-medium text-gray-900"}>
                    {announcement.title}
                </h3>
                <div className={isWatt ? "prose prose-sm mt-1 max-w-none text-sm leading-6 text-[#243129] prose-a:text-[#155420] prose-strong:text-[#102e19]" : "mt-2 text-sm text-gray-700 prose prose-sm max-w-none"}>
                    <ReactMarkdown>
                        {displayedBody}
                    </ReactMarkdown>
                </div>
                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={isWatt ? "mt-2 text-sm font-black text-[#155420] hover:text-[#2f6f2c] hover:underline focus:outline-none" : "mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline focus:outline-none"}
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
