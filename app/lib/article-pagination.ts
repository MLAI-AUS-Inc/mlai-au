export const ARTICLE_PAGE_SIZE = 10;

/** Validate at the server boundary so the page's body and canonical always
 * describe the same slice. An invented page must never show the last slice. */
export function getArticlePagination(requestUrl: string, articleCount: number) {
  const url = new URL(requestUrl);
  const totalPages = Math.max(1, Math.ceil(articleCount / ARTICLE_PAGE_SIZE));
  const values = url.searchParams.getAll("page");
  const raw = values[0];
  if (values.length > 1 || (raw !== undefined && !/^[0-9]+$/.test(raw))) {
    throw new Response("Not Found", { status: 404 });
  }
  const page = raw === undefined ? 1 : Number(raw);
  if (!Number.isSafeInteger(page) || page < 1 || page > totalPages) {
    throw new Response("Not Found", { status: 404 });
  }
  const canonicalPath = page === 1 ? "/articles" : `/articles?page=${page}`;
  const normalized = new URL(url);
  normalized.pathname = "/articles";
  if (page === 1) normalized.searchParams.delete("page");
  else normalized.searchParams.set("page", String(page));
  const redirectPath = normalized.pathname + normalized.search;
  return {
    page, totalPages, canonicalPath,
    redirectPath: redirectPath === url.pathname + url.search ? undefined : redirectPath,
  };
}
