import type { Route } from "./+types/chrome-devtools";

export function loader() {
    return new Response("{}", {
        status: 200,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
