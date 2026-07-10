export function shouldOpenExpandedArticleReview(search: string): boolean {
  const params = new URLSearchParams(search);
  return params.get("articleStep") === "review" && params.get("reviewMode") === "expanded";
}
