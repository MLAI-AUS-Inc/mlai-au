import { describe, expect, test } from "bun:test";

const APP_ROUTE = "app/routes/hospital.app.tsx";
const LOGIN_ROUTE = "app/routes/platform.login.tsx";
const AUTH_CLIENT = "app/lib/auth.ts";

describe("closed HealthHack access", () => {
  test("redirects authenticated participants away from the app", async () => {
    const source = await Bun.file(APP_ROUTE).text();

    expect(source).toContain("if (!user.is_superuser)");
    expect(source).toContain("error=healthhack_closed");
  });

  test("marks HealthHack login requests as administrator-only", async () => {
    const loginSource = await Bun.file(LOGIN_ROUTE).text();
    const authSource = await Bun.file(AUTH_CLIENT).text();

    expect(loginSource).toContain('const adminOnly = app === "hospital"');
    expect(loginSource).toContain("HealthHack has closed. Administrator access only.");
    expect(loginSource).toContain("Sign-in is restricted to administrators.");
    expect(authSource).toContain("healthhack_admin_only: body.adminOnly");
  });
});
