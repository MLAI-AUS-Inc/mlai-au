import { expect, test } from "bun:test";
import { retiredAppResponse } from "../workers/retired-apps";

const chat = "https://chat.mlai.au/";
const pulse = chat + "my-startup/updates?view=new";
const incoming = (path: string, method = "GET") => retiredAppResponse(new Request(new URL(path, "https://mlai.au"), { method }));
test.each([
  ["/platform/login?app=founder-tools&next=/founder-tools", pulse],
  ["/vibe-raising/create-update?email=private", pulse],
  ["/founder-tools/updates/create?companyId=private", pulse],
  ["/platform/login?next=//outside.test&token=private", chat],
  ["/verify-email?token=private", chat],
  ["/platform/dashboard", chat], ["/login", chat], ["/dashboard", chat],
  ["/platform/login?app=admin", "https://ops.mlai.au/login"],
  ["/valley/update/new", pulse], ["/hospital/app/team", "/healthhack"],
  ["/esafety/submit", "/hackathons"], ["/watt-the-hack/dashboard", "/hackathons"],
])("%s hands off without transferring session or query data", (path, expected) => {
  const result = incoming(path)!;
  expect(result.status).toBe(302);
  expect(result.headers.get("Location")).toBe(expected);
  expect(result.headers.get("Referrer-Policy")).toBe("no-referrer");
  expect(result.headers.get("Cache-Control")).toBe("no-store");
  expect(result.headers.has("Set-Cookie")).toBe(false);
});
test("private links are limited to their intended account-link or purchase screen", () => {
  const token = "A".repeat(43);
  const link = "/founder-tools/link-roo?token=" + token;
  expect(incoming(link + "&next=https://outside.test")!.headers.get("Location")).toBe(chat + "my-startup/link-roo?token=" + token);
  for (const invalid of ["https://www.mlai.au" + link, "http://mlai.au" + link, link + "&token=" + token, link + "x"]) {
    const response = incoming(invalid)!;
    expect(response.status).toBe(400);
    expect(response.headers.has("Location")).toBe(false);
  }
  const id = "12345678-1111-2222-aaaa-123456789012";
  expect(incoming("/roo/topup/" + id + "?checkout=success&returnTo=private")!.headers.get("Location")).toBe("/roo/topup#" + id);
});
test("retired actions never execute or redirect their body", () => {
  for (const path of ["/platform/login", "/hospital/app/submit", "/founder-tools/updates/create", "/esafety/team", "/platform/logout"]) {
    expect(incoming(path, "POST")!.status).toBe(410);
    expect(incoming(path, "POST")!.headers.has("Location")).toBe(false);
  }
});
test("public landing pages and similar names are untouched", () => {
  for (const path of ["/healthhack", "/founder-tools/start", "/vibe-raising/", "/events", "/articles", "/esafety-guide", "/hospital/application"]) expect(incoming(path)).toBeNull();
});
