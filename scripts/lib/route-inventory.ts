import ts from "typescript";

/** Read route declarations without importing Vite or starting Cloudflare. */
export function collectRegisteredRoutePaths(source: string): Set<string> {
  const file = ts.createSourceFile("routes.ts", source, ts.ScriptTarget.Latest, true);
  const paths = new Set<string>();
  function visit(node: ts.Node, parentPath: string) {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression)) {
      const name = node.expression.text;
      if (name === "route" && node.arguments[0] && ts.isStringLiteral(node.arguments[0])) {
        const segment = node.arguments[0].text;
        const full = segment.startsWith("/") ? segment : `${parentPath}/${segment}`;
        const normalized = full.replace(/\/{2,}/g, "/").replace(/\/$/, "") || "/";
        paths.add(normalized);
        for (const arg of node.arguments.slice(2)) visit(arg, normalized);
        return;
      }
      if (name === "index") { paths.add(parentPath || "/"); return; }
    }
    ts.forEachChild(node, child => visit(child, parentPath));
  }
  visit(file, "");
  return paths;
}
