
import { Link } from "react-router";

export interface BreadcrumbItem {
    label: string;
    href?: string;
    current?: boolean;
}

interface BreadcrumbsProps {
    items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
    return (
        <nav className="flex" aria-label="Breadcrumb">
            <ol role="list" className="flex items-center space-x-4">
                <li>
                    <div>
                        <Link to="/" className="text-gray-400 hover:text-gray-500">
                            <span className="sr-only">Home</span>
                            <svg
                                className="h-5 w-5 flex-shrink-0"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M9.293 2.293a1 1 0 011.414 0l7 7A1 1 0 0117 11h-1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-3a1 1 0 00-1-1H9a1 1 0 00-1 1v3a1 1 0 01-1 1H5a1 1 0 01-1-1v-6H3a1 1 0 01-.707-1.707l7-7z"
                                    clipRule="evenodd"
                                />
                            </svg>
                        </Link>
                    </div>
                </li>
                {items.map((item) => (
                    <li key={item.label}>
                        <div className="flex items-center">
                            <svg
                                className="h-5 w-5 flex-shrink-0 text-gray-300"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                aria-hidden="true"
                            >
                                <path d="M5.555 17.776l8-16 .894.448-8 16-.894-.448z" />
                            </svg>
                            {item.href && !item.current ? (
                                <Link
                                    to={item.href}
                                    className="ml-4 text-sm font-medium text-gray-500 hover:text-gray-700"
                                    aria-current={item.current ? "page" : undefined}
                                >
                                    {item.label}
                                </Link>
                            ) : (
                                <span
                                    className="ml-4 text-sm font-medium text-gray-500"
                                    aria-current={item.current ? "page" : undefined}
                                >
                                    {item.label}
                                </span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
}
