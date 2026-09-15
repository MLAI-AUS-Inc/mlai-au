import { expect, test } from 'bun:test';
import { inspectArticleSource, checkPublishedArticleIntegrity } from '../scripts/check-article-integrity';

test('published articles contain no known drafting residue or placeholder resource offers', () => {
  expect(checkPublishedArticleIntegrity()).toEqual([]);
});

test('nested resource offers and supplied disclosure text remain subject to the check', () => {
  const issues = inspectArticleSource(`
    export default () => <details><summary>Sources</summary>
      <p>{"Authoritative reference supporting Example."}</p>
      <ArticleResourceCTA buttonHref={"/articles?source=download"} />
      <ArticleResourceCTA buttonHref={\`#worksheet\`}></ArticleResourceCTA>
    </details>;
  `, 'example.tsx');
  expect(issues).toHaveLength(3);
  expect(issues.every(issue => issue.line > 1)).toBe(true);
});

test('actual destinations and source comments do not become false failures', () => {
  const issues = inspectArticleSource(`
    // Replaced: Brief, factual overview referencing the topic.
    export default () => <>
      <a href="#evaluation">Jump to evaluation</a>
      <ArticleResourceCTA buttonHref="/downloads/evaluation.txt" />
      <p>Check the source population and the limits of its findings.</p>
    </>;
  `, 'example.tsx');
  expect(issues).toEqual([]);
});
