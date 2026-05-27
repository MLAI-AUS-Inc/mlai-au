import { EllipsisVerticalIcon } from '@heroicons/react/20/solid'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import ReactMarkdown from 'react-markdown';
import { useState } from 'react';
import { wattClasses } from '~/lib/watt-theme';

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
        <div className={isWatt ? wattClasses.panel : "bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5"}>
            <div className={isWatt ? "border-b border-[#e7dfcf] p-6" : "p-6 border-b border-gray-200"}>
                <p className={isWatt ? wattClasses.eyebrow : "hidden"}>Updates</p>
                <h2 className={isWatt ? "mt-1 text-xl font-black text-[#20231d]" : "text-lg font-semibold text-gray-900"}>Announcements</h2>
            </div>
            <ul role="list" className={isWatt ? "divide-y divide-[#e7dfcf]" : "divide-y divide-gray-200"}>
                {recentAnnouncements.map((announcement) => (
                    <AnnouncementItem key={announcement.id} announcement={announcement} variant={variant} />
                ))}
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
        <li className={isWatt ? "px-5 py-5 sm:px-6" : "px-6 py-6"}>
            <article aria-labelledby={'announcement-title-' + announcement.id}>
                <div className="flex space-x-3">
                    <div className="shrink-0">
                        <img
                            alt=""
                            src={announcement.author.imageUrl}
                            className={isWatt ? "size-10 rounded-full border border-[#c9dbb8] bg-[#dfead1] object-cover" : "size-10 rounded-full"}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className={isWatt ? "text-sm font-black text-[#20231d]" : "text-sm font-medium text-gray-900"}>
                            <a href={announcement.author.href} className={isWatt ? "hover:text-[#1f5b2c]" : "hover:underline"}>
                                {announcement.author.name}
                            </a>
                        </p>
                        <p className={isWatt ? "text-sm text-[#6f756c]" : "text-sm text-gray-500"}>
                            <time dateTime={announcement.datetime}>{timeAgo(announcement.datetime)}</time>
                        </p>
                    </div>
                    <div className="flex shrink-0 self-center">
                        <Menu as="div" className="relative inline-block text-left">
                            <MenuButton className={isWatt ? "relative flex items-center rounded-full text-[#6f756c] hover:bg-[#dfead1] hover:text-[#1f5b2c]" : "relative flex items-center rounded-full text-gray-400 hover:text-gray-600"}>
                                <span className="absolute -inset-2" />
                                <span className="sr-only">Open options</span>
                                <EllipsisVerticalIcon aria-hidden="true" className="size-5" />
                            </MenuButton>
                            <MenuItems
                                transition
                                className={isWatt ? "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-2xl border border-[#e7dfcf] bg-[#fffdf7] shadow-[0_18px_42px_rgba(67,54,33,0.12)] transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in" : "absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"}
                            >
                                <div className="py-1">
                                    <MenuItem>
                                        <a
                                            href="#"
                                            className={isWatt ? "flex px-4 py-2 text-sm font-bold text-[#394033] data-[focus]:bg-[#dfead1] data-[focus]:text-[#1f5b2c] data-[focus]:outline-none" : "flex px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900 data-[focus]:outline-none"}
                                        >
                                            Report content
                                        </a>
                                    </MenuItem>
                                </div>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
                <h3 id={'announcement-title-' + announcement.id} className={isWatt ? "mt-4 text-base font-black text-[#20231d]" : "mt-4 text-base font-medium text-gray-900"}>
                    {announcement.title}
                </h3>
                <div className={isWatt ? "prose prose-sm mt-2 max-w-none text-sm text-[#394033] prose-a:text-[#1f5b2c] prose-strong:text-[#20231d]" : "mt-2 text-sm text-gray-700 prose prose-sm max-w-none"}>
                    <ReactMarkdown>
                        {displayedBody}
                    </ReactMarkdown>
                </div>
                {shouldTruncate && (
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className={isWatt ? "mt-2 text-sm font-black text-[#1f5b2c] hover:text-[#3d7339] hover:underline focus:outline-none" : "mt-2 text-sm font-medium text-blue-600 hover:text-blue-500 hover:underline focus:outline-none"}
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
