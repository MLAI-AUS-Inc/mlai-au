
import { Link } from "react-router";

export default function NextArticleCTA({ label, title, description, href, to, image, imageAlt }: any) {
    const destination = to || href;
    return (
        <Link to={destination} className="group block rounded-2xl border border-gray-200 p-6 hover:border-indigo-600">
            <span className="text-sm font-semibold text-indigo-600">{label}</span>
            <h3 className="mt-2 text-lg font-bold text-gray-900 group-hover:text-indigo-600">{title}</h3>
            {description && <p className="mt-2 text-gray-600">{description}</p>}
        </Link>
    );
}
