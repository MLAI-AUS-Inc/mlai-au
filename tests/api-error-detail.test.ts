import { describe, expect, test } from "bun:test";

import { apiErrorDetail } from "../app/lib/api";

describe("apiErrorDetail", () => {
  test("extracts the axios response.data.detail (the common 409 shape)", () => {
    const error = {
      response: { status: 409, data: { detail: "not accepting review comments (status=failed)" } },
      message: "Request failed with status code 409",
    };
    expect(apiErrorDetail(error)).toBe("not accepting review comments (status=failed)");
  });

  test("extracts a top-level-status Worker-shape data.detail", () => {
    const error = { status: 409, data: { detail: "missing GitHub branch context (missing: branch)" } };
    expect(apiErrorDetail(error)).toBe("missing GitHub branch context (missing: branch)");
  });

  test("falls back to alternate DRF body keys (error / message / non_field_errors)", () => {
    expect(apiErrorDetail({ response: { data: { error: "boom" } } })).toBe("boom");
    expect(apiErrorDetail({ response: { data: { message: "nope" } } })).toBe("nope");
    expect(apiErrorDetail({ response: { data: { non_field_errors: ["first problem", "second"] } } })).toBe(
      "first problem",
    );
  });

  test("handles a plain string body", () => {
    expect(apiErrorDetail({ response: { data: "plain reason" } })).toBe("plain reason");
  });

  test("does not dump an HTML gateway/500 error page — falls through to the status message", () => {
    const html = "<!DOCTYPE html><html><head><title>502 Bad Gateway</title></head><body>nginx</body></html>";
    const error = { response: { status: 502, data: html }, message: "Request failed with status code 502" };
    expect(apiErrorDetail(error)).toBe("Request failed with status code 502");
  });

  test("never renders [object Object] for a non-string detail — uses the message fallback", () => {
    const error = { response: { data: { detail: { code: 1 } } }, message: "Request failed with status code 409" };
    expect(apiErrorDetail(error)).toBe("Request failed with status code 409");
  });

  test("falls back to the error message, then the generic/ custom fallback", () => {
    expect(apiErrorDetail({ message: "Network Error" })).toBe("Network Error");
    expect(apiErrorDetail({})).toBe("Run action failed.");
    expect(apiErrorDetail(null)).toBe("Run action failed.");
    expect(apiErrorDetail(undefined, "custom fallback")).toBe("custom fallback");
  });
});
