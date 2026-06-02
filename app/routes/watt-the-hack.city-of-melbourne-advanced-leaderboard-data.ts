import type { Route } from "./+types/watt-the-hack.city-of-melbourne-advanced-leaderboard-data";

export async function loader({ request }: Route.LoaderArgs) {
  try {
    // Ingress controller external IP on GKE: 34.129.156.145
    // Internal routing maps requests matching host "eval.yourdomain.com" to the evaluator gateway
    const res = await fetch("http://34.129.156.145/leaderboard?limit=50", {
      headers: {
        "Host": "eval.yourdomain.com",
        "Accept": "application/json",
      },
    });

    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: `Admin server returned HTTP ${res.status}` }),
        {
          status: res.status,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const data = await res.json();
    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "public, max-age=5", // 5 seconds cache to mitigate spam
      },
    });
  } catch (error: any) {
    console.error("Leaderboard proxy server-side error:", error);
    return new Response(
      JSON.stringify({ error: error.message || "Failed to fetch leaderboard from admin server" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
