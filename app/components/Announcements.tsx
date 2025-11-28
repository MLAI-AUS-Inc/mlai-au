export interface Announcement {
    id: string;
    title: string;
    body: string;
    date: string;
    datetime: string;
    author: {
        name: string;
        imageUrl: string;
        href: string;
    };
}

export default function Announcements({ announcements }: { announcements: Announcement[] }) {
    return (
        <div className="bg-white rounded-xl shadow-sm ring-1 ring-gray-900/5">
            <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Announcements</h3>
            </div>
            <ul role="list" className="divide-y divide-gray-100">
                {announcements.map((announcement) => (
                    <li key={announcement.id} className="p-6 hover:bg-gray-50 transition-colors">
                        <div className="flex gap-x-4">
                            <img
                                className="h-10 w-10 flex-none rounded-full bg-gray-50"
                                src={announcement.author.imageUrl}
                                alt=""
                            />
                            <div className="min-w-0 flex-auto">
                                <p className="text-sm font-semibold leading-6 text-gray-900">
                                    {announcement.author.name}
                                </p>
                                <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                                    <time dateTime={announcement.datetime}>{announcement.date}</time>
                                </p>
                            </div>
                        </div>
                        <div className="mt-4">
                            <h4 className="text-sm font-semibold text-gray-900">{announcement.title}</h4>
                            <div
                                className="mt-2 text-sm text-gray-600 space-y-2"
                                dangerouslySetInnerHTML={{ __html: announcement.body }}
                            />
                        </div>
                    </li>
                ))}
                {announcements.length === 0 && (
                    <li className="p-6 text-center text-gray-500 text-sm">
                        No announcements yet.
                    </li>
                )}
            </ul>
        </div>
    );
}
