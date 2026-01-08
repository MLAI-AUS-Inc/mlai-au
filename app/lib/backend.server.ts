export function backendFetch(
  env: Env,
  path: string,
  init: RequestInit = {}
) {
  // In development (when running via Vite dev server), use relative URLs 
  // which will be proxied to localhost:80 by Vite
  // In production (Cloudflare Workers), use the full backend URL
  const isDevelopment = typeof window !== 'undefined' || String(env.BACKEND_BASE_URL).startsWith('http://localhost');

  let url: string;
  if (isDevelopment) {
    // Use relative URL for proxy in development
    url = path;
  } else {
    // Use full URL in production
    const baseUrl = env.BACKEND_BASE_URL || "https://api.mlai.au";
    url = new URL(path, baseUrl).toString();
  }

  console.log(`[backendFetch] Requesting: ${url} (dev mode: ${isDevelopment})`);

  return fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  }).then(async (res) => {
    console.log(`[backendFetch] Response: ${res.status} ${res.statusText} (${res.headers.get("content-type")})`);
    if (!res.ok && res.headers.get("content-type")?.includes("text/html")) {
      const text = await res.clone().text();
      console.log(`[backendFetch] HTML Error Body: ${text.substring(0, 500)}...`);
    }
    return res;
  });
}
