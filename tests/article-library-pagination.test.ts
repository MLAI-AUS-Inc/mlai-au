import { expect, test } from "bun:test";
import { getArticlesSortedNewestFirst } from "../app/articles/registry";
import { loader } from "../app/routes/articles.index";

const load = (path: string) => loader({
  request: new Request(`https://mlai.au${path}`),
} as Parameters<typeof loader>[0]);

test("every published article has a valid library page", async () => {
  const lastPage = Math.ceil(getArticlesSortedNewestFirst().length / 10);
  expect(await load("/articles")).toEqual({ page: 1 });
  for (let page = 2; page <= lastPage; page++) {
    expect(await load(`/articles?page=${page}`)).toEqual({ page });
  }
  await expect(load(`/articles?page=${lastPage + 1}`)).rejects.toHaveProperty("status", 404);
});

test.each(["", "0", "-1", "2garbage", "1.5", "NaN", "Infinity", "1e0", "9007199254740993", "2&page=3"])(
  "rejects invalid or ambiguous page value %s instead of serving duplicate content",
  async value => {
    await expect(load(`/articles?page=${value}`)).rejects.toHaveProperty("status", 404);
  },
);

test.each([
  ["/articles?page=1", "/articles"],
  ["/articles?page=01", "/articles"],
  ["/articles?page=02", "/articles?page=2"],
  ["/articles/", "/articles"],
  ["/articles/?page=2", "/articles?page=2"],
  ["/articles/?page=01&source=community", "/articles?source=community"],
])("normalises %s with a permanent redirect", async (input, destination) => {
  const response = await load(input);
  expect(response).toBeInstanceOf(Response);
  if (!(response instanceof Response)) throw new Error("Expected a redirect");
  expect(response.status).toBe(301);
  expect(response.headers.get("location")).toBe(destination);
});
