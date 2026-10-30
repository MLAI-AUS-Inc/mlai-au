import { expect, test } from "@playwright/test";

const TOKEN = "A".repeat(43);
const PATH = "/founder-tools/link-roo";

test("private link confirms via a native document POST without JavaScript", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "access_token", value: "fixture", url: baseURL! }]);
  const capture = page.waitForResponse(response => response.url().includes(`token=${TOKEN}`));
  const confirmation = await page.goto(`${PATH}?token=${TOKEN}`);
  expect((await capture).headers()["referrer-policy"]).toBe("no-referrer");
  await expect(page).toHaveURL(`${baseURL}${PATH}`);
  await expect(page.getByText("Slack Founder", { exact: true })).toBeVisible();
  await expect(page.getByText("founder@example.com", { exact: true })).toBeVisible();
  expect(await page.content()).not.toContain(TOKEN);

  const post = page.waitForRequest(request => request.method() === "POST");
  await page.getByRole("button", { name: "Link accounts" }).click();
  const submitted = await post;
  // This is the browser's real Origin, not a test-injected request header.
  expect(submitted.headers().origin).toBe(baseURL);
  expect(submitted.headers().referer).toBe(`${baseURL}${PATH}`);
  expect(submitted.postData() ?? "").not.toContain(TOKEN);
  await expect(page).toHaveURL(`${baseURL}${PATH}?status=linked`);
  await expect(page.getByRole("heading", { name: "Accounts connected", exact: true })).toBeVisible();
  expect((await context.cookies()).some(cookie => cookie.name === "roo_founder_link_token")).toBe(false);
  expect(confirmation?.headers()["referrer-policy"]).toBe("same-origin");

  // Reload/back must not resurrect a capability or offer another completion.
  await page.reload();
  await expect(page.getByRole("heading", { name: "Accounts connected", exact: true })).toBeVisible();
  await page.goBack();
  await expect(page.getByRole("heading", { name: "This link is not valid", exact: true })).toBeVisible();
  await expect(page.getByRole("button", { name: "Link accounts" })).toHaveCount(0);
});

test("confirmation never sends its referrer on an external navigation", async ({ page, context, baseURL }) => {
  await context.addCookies([{ name: "access_token", value: "fixture", url: baseURL! }]);
  await page.goto(`${PATH}?token=${TOKEN}`);
  // Give the existing page link an external destination in this fixture only.
  // Playwright changes the DOM even with page JavaScript disabled; the click
  // and referrer calculation remain native browser behavior.
  await page.getByRole("link", { name: "Founder Tools", exact: true }).evaluate(link => {
    link.setAttribute("href", "https://external.example/destination");
  });
  await context.route("https://external.example/destination", route => route.fulfill({
    status: 200, contentType: "text/html", body: "<h1>External destination</h1>",
  }));
  const externalRequest = page.waitForRequest("https://external.example/destination");
  await page.getByRole("link", { name: "Founder Tools", exact: true }).click();
  expect((await externalRequest).headers().referer).toBeUndefined();
  await expect(page.getByRole("heading", { name: "External destination" })).toBeVisible();
});
