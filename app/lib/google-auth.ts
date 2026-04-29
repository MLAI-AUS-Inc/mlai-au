export interface GoogleTokenInfo {
  aud: string;
  email: string;
  email_verified: string | boolean;
  exp: string;
  iss: string;
  name?: string;
  picture?: string;
  given_name?: string;
  family_name?: string;
}

const GOOGLE_TOKENINFO_ENDPOINT = "https://oauth2.googleapis.com/tokeninfo";
const GOOGLE_ISSUERS = new Set(["accounts.google.com", "https://accounts.google.com"]);

interface GoogleClientEnv {
  VITE_GOOGLE_CLIENT_ID?: unknown;
  GOOGLE_CLIENT_ID?: unknown;
}

export function getGoogleClientId(env: GoogleClientEnv): string | null {
  const candidates = [env.VITE_GOOGLE_CLIENT_ID, env.GOOGLE_CLIENT_ID];

  for (const candidate of candidates) {
    if (typeof candidate === "string" && candidate.trim()) {
      return candidate.trim();
    }
  }

  return null;
}

export async function verifyGoogleIdToken(
  idToken: string,
  expectedAudience: string,
): Promise<GoogleTokenInfo> {
  const response = await fetch(
    `${GOOGLE_TOKENINFO_ENDPOINT}?id_token=${encodeURIComponent(idToken)}`,
  );

  if (!response.ok) {
    throw new Error("Google token verification failed");
  }

  const data = (await response.json()) as Partial<GoogleTokenInfo>;

  if (!data.email) {
    throw new Error("Google account email is missing");
  }

  if (!data.aud || data.aud !== expectedAudience) {
    throw new Error("Google token audience mismatch");
  }

  if (!data.iss || !GOOGLE_ISSUERS.has(data.iss)) {
    throw new Error("Google token issuer mismatch");
  }

  if (!(data.email_verified === true || data.email_verified === "true")) {
    throw new Error("Google account email is not verified");
  }

  if (!data.exp || Number.isNaN(Number(data.exp)) || Number(data.exp) * 1000 <= Date.now()) {
    throw new Error("Google token has expired");
  }

  return data as GoogleTokenInfo;
}
