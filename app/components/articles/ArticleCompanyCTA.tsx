import { Link } from 'react-router';

export interface ArticleCompanyCTAProps {
    title: string;
    body: string;
    buttonText: string;
    buttonHref: string;
    note?: string;
    id?: string;
    className?: string;
}

export default function ArticleCompanyCTA({
    title,
    body,
    buttonText,
    buttonHref,
    note,
    id,
    className = '',
}: ArticleCompanyCTAProps) {
    return (
        <section id={id} className={`my-12 bg-transparent border border-gray-400 rounded-2xl p-8 text-center ${className}`}>
            <h2 className="text-2xl font-bold text-gray-900 mb-3">{title}</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">{body}</p>
            <Link
                to={buttonHref}
                className="inline-block rounded-full bg-[#1028E0] px-8 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1028E0]/90 transition-colors"
            >
                {buttonText}
            </Link>
            {note ? <p className="text-sm text-gray-500 mt-4">{note}</p> : null}
        </section>
    );
}
