export function backendFetch(
  env: Env,
  path: string,
  init: RequestInit = {}
) {
  const baseUrl = env.BACKEND_BASE_URL || "https://api.mlai.au";
  const url = new URL(path, baseUrl).toString();

  return fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}
