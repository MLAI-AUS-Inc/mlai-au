export function isValidVibeRaisingAdminPassword(password: string | null | undefined): boolean {
  return String(password || "") === "ilovemlai";
}
