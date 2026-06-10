// Public Firebase web config for the `mlai-main-website` project.
//
// These values are NOT secret — Firebase web configs are designed to be shipped to the browser
// (this exact config also ships inside the streamed Unity build's google-services file). Access is
// gated by the RTDB security rules + a short-lived, per-user `watt_participant` custom token (see
// `getWattParticipantToken`), NOT by hiding these identifiers. They can be overridden at build time
// via `VITE_FIREBASE_*` if the project ever moves.
export const WATT_FIREBASE_CONFIG = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyCanv6ApvmW8g21jfiYxgXe8im7D7sfgIg",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "mlai-main-website.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "mlai-main-website",
  databaseURL:
    import.meta.env.VITE_FIREBASE_DATABASE_URL ||
    "https://mlai-main-website-default-rtdb.asia-southeast1.firebasedatabase.app",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "mlai-main-website.firebasestorage.app",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "46781056843",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:46781056843:web:935e977f38df93840acace",
} as const;

// A short, fixed name so we reuse one Firebase app instance for this feature rather than colliding
// with the default app (the rest of the site doesn't use Firebase).
export const WATT_FIREBASE_APP_NAME = "watt-rtdb";

function segment(value: string): string {
  // Mirror the backend's `_firebase_segment`: RTDB keys can't contain . # $ [ ] / or whitespace.
  return value.replace(/[.#$/[\]\s]/g, "_");
}

// Mirror the Unity → RTDB contract (HackathonFirebasePaths): the streamed game publishes the live
// score + observation snapshots at these nodes each tick.
export function householdRoot(classId: string, householdId: string): string {
  return `classes/${segment(classId)}/hackathon/households/${segment(householdId)}`;
}

export function scorePath(classId: string, householdId: string): string {
  return `${householdRoot(classId, householdId)}/score/current`;
}

export function observationPath(classId: string, householdId: string): string {
  return `${householdRoot(classId, householdId)}/observations/current`;
}
