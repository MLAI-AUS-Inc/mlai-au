export function backendFetch(
  env: Env,
  path: string,
  init: RequestInit = {}
) {
  const baseUrl = env.BACKEND_BASE_URL || "https://api.mlai.au";
  const url = new URL(path, baseUrl).toString();

  console.log(`[backendFetch] Requesting: ${url}`);

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
