import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
    content: ["./app/**/*.{js,ts,jsx,tsx}", "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        typography,
    ],
} satisfies Config;
