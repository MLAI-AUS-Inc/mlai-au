import { expect, test } from "bun:test";
import { ARTICLE_PAGE_SIZE, getArticlePagination } from "../app/lib/article-pagination";

test("directory pages and canonicals refer to the same real bounded slice", () => {
  expect(ARTICLE_PAGE_SIZE).toBe(10);
  expect(getArticlePagination("https://mlai.au/articles", 58)).toEqual({ page: 1, totalPages: 6, canonicalPath: "/articles", redirectPath: undefined });
  expect(getArticlePagination("https://mlai.au/articles?page=6", 58)).toEqual({ page: 6, totalPages: 6, canonicalPath: "/articles?page=6", redirectPath: undefined });
  expect(getArticlePagination("https://mlai.au/articles?page=1", 58).redirectPath).toBe("/articles");
  expect(getArticlePagination("https://mlai.au/articles/?page=02", 58).redirectPath).toBe("/articles?page=2");
  expect(getArticlePagination("https://mlai.au/articles?page=01&context=reading", 58).redirectPath).toBe("/articles?context=reading");
});

test("invalid, repeated and out-of-range pages never become duplicate 200 pages", () => {
  for (const query of ["page=0", "page=-1", "page=abc", "page=2foo", "page=2.5", "page=", "page=7", "page=999", "page=9007199254740993", "page=2&page=3"]) {
    try { getArticlePagination("https://mlai.au/articles?" + query, 58); throw new Error("Accepted invalid page: " + query); }
    catch (error) { expect(error).toBeInstanceOf(Response); expect((error as Response).status).toBe(404); }
  }
  expect(getArticlePagination("https://mlai.au/articles", 0).page).toBe(1);
});
