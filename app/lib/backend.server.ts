export function backendFetch(
  env: Env,
  path: string,
  init: RequestInit = {}
) {
  const url = new URL(path, env.BACKEND_BASE_URL).toString();

  return fetch(url, {
    ...init,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
}
