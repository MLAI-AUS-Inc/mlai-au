import typography from '@tailwindcss/typography';
import type { Config } from 'tailwindcss';

export default {
    content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
    theme: {
        extend: {},
    },
    plugins: [
        typography,
    ],
} satisfies Config;
