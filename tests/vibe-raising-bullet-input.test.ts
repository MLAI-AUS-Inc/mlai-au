import { describe, expect, test } from "bun:test";
import { readFileSync } from "node:fs";
import { join } from "node:path";

const routeSource = readFileSync(
  join(import.meta.dir, "../app/routes/vibe-raising-app.create-update.tsx"),
  "utf8",
);

function functionSource(startMarker: string, endMarker: string) {
  const start = routeSource.indexOf(startMarker);
  const end = routeSource.indexOf(endMarker, start);

  expect(start).toBeGreaterThanOrEqual(0);
  expect(end).toBeGreaterThan(start);
  return routeSource.slice(start, end);
}

describe("Vibe Raising bullet keyboard behavior", () => {
  test("keeps native Enter behavior when no custom action is supplied", () => {
    const textareaSource = functionSource(
      "function BulletTextarea(",
      "function SectionWithExample(",
    );

    expect(textareaSource).toContain(
      "if (!onEnterNewItem && !onMobileAdvance) return;",
    );
  });

  test("creates and focuses a new past-month bullet on Enter", () => {
    const bulletInputSource = functionSource(
      "function BulletInput(",
      "// Collapsible feedback item for rating sidebar",
    );

    expect(bulletInputSource).toContain(
      "onEnterNewItem={() => addItemAfter(i)}",
    );
    expect(bulletInputSource).toContain("bulletIndex={i}");
    expect(bulletInputSource).toContain("focusItem(insertionIndex);");
  });
});
