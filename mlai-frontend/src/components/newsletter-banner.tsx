'use client'
import { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

export default function NewsletterBanner() {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) return null;

    return (
        <div className="fixed top-0 left-0 right-0 z-50 flex justify-center">
            <div className="w-1/2 bg-gradient-to-r from-teal-600 to-teal-700 py-2 px-4 shadow-lg rounded-b-lg">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <span className="text-sm font-medium text-white">
                            Join our AI community!
                        </span>
                        <a
                            href="https://join.slack.com/t/mlai-au/shared_invite/zt-2br01q4n9-PiiT9mgEOPMEG__8SOWQ8g"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-4 py-1.5 text-sm font-semibold text-teal-700 bg-white rounded-md hover:bg-gray-100 transition-colors duration-200 whitespace-nowrap"
                        >
                            Join Slack Community
                        </a>
                    </div>
                    <button
                        onClick={() => setIsVisible(false)}
                        className="ml-3 text-white hover:text-gray-200 transition-colors duration-200"
                        aria-label="Close banner"
                    >
                        <XMarkIcon className="h-5 w-5" />
                    </button>
                </div>
            </div>
        </div>
    );
}