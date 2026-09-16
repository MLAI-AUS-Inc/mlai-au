import { readFileSync } from 'node:fs';
import ts from 'typescript';
import { getArticlesSortedNewestFirst } from '../app/articles/registry';
import { isUsableArticleResourceHref } from '../app/lib/article-resource';

// Known regressions only. Passing this check is not factual or editorial approval.
const DRAFTING_RESIDUE = [
  'Brief, factual overview referencing',
  'works best when the section stays specific',
  'while still tying each detail back to the main point of the section',
  'what top-ranking career pages emphasise',
  'Authoritative reference supporting ',
  'Download the checklist mentioned above.',
];

export type ArticleIntegrityIssue = { file: string; line: number; message: string };

export function inspectArticleSource(source: string, file: string): ArticleIntegrityIssue[] {
  const tree = ts.createSourceFile(file, source, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const issues: ArticleIntegrityIssue[] = [];
  function report(node: ts.Node, message: string) {
    issues.push({ file, line: tree.getLineAndCharacterOfPosition(node.getStart(tree)).line + 1, message });
  }
  function visit(node: ts.Node) {
    if (ts.isStringLiteralLike(node) || ts.isJsxText(node)) {
      const value = node.text.replace(/\s+/g, ' ');
      for (const phrase of DRAFTING_RESIDUE) {
        if (value.includes(phrase)) report(node, `Known editorial residue: ${phrase}`);
      }
    }
    if ((ts.isJsxSelfClosingElement(node) || ts.isJsxOpeningElement(node)) && node.tagName.getText(tree) === 'ArticleResourceCTA') {
      const href = node.attributes.properties.find(p => ts.isJsxAttribute(p) && p.name.getText(tree) === 'buttonHref') as ts.JsxAttribute | undefined;
      const value = href?.initializer;
      const literal = value && ts.isJsxExpression(value) ? value.expression : value;
      if (literal && ts.isStringLiteralLike(literal) && !isUsableArticleResourceHref(literal.text)) {
        report(node, `Download offer points to a placeholder or ordinary page: ${literal.text}`);
      }
    }
    ts.forEachChild(node, visit);
  }
  visit(tree);
  return issues;
}

export function checkPublishedArticleIntegrity(): ArticleIntegrityIssue[] {
  return getArticlesSortedNewestFirst().flatMap(article => {
    const file = `app/articles/content/${article.slug}.tsx`;
    return inspectArticleSource(readFileSync(file, 'utf8'), file);
  });
}

if (import.meta.main) {
  const issues = checkPublishedArticleIntegrity();
  for (const issue of issues) console.error(`${issue.file}:${issue.line}: ${issue.message}`);
  if (issues.length) process.exitCode = 1;
  else console.log(`Article integrity: ${getArticlesSortedNewestFirst().length} published modules pass known-residue and placeholder-offer checks. Source truth, resources and reader usefulness still require review.`);
}
