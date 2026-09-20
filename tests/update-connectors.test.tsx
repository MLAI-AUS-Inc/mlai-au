import { describe, expect, it } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import ConnectorTile from "../app/components/vibe-raising/ConnectorTile";
import { completeConnectorCatalogue, readConnectorSelection, resolveConnectorSelection } from "../app/lib/update-connectors";
import type { VibeRaisingInputSourceSummary } from "../app/types/vibe-raising";

const stripe: VibeRaisingInputSourceSummary = { key: "stripe", label: "Stripe", status: "connected", selected: true, capabilities: ["metrics"] };
const renderTile = (source = stripe, selected = true) => renderToStaticMarkup(
  <ConnectorTile source={source} selected={selected} onToggle={() => {}} onConnect={() => {}} />,
);

describe("connector catalogue and draft selection", () => {
  it("includes every supported connector while preserving live statuses", () => {
    const sources = completeConnectorCatalogue([stripe, { ...stripe, key: "notion", label: "Notion", status: "unavailable" }]);
    expect(sources).toHaveLength(10);
    expect(new Set(sources.map(source => source.key)).size).toBe(10);
    expect(sources.find(source => source.key === "stripe")).toEqual(stripe);
    expect(sources.find(source => source.key === "notion")?.status).toBe("unavailable");
    expect(sources.find(source => source.key === "bank_feed")?.status).toBe("not_connected");
    expect(sources.some(source => source.key === "manual_documents")).toBe(false);
  });
  it("distinguishes no preference from explicitly turning every source off", () => {
    expect(readConnectorSelection("?draft=test")).toBeNull();
    expect(readConnectorSelection("?draft=test&inputs=")).toEqual([]);
    expect(resolveConnectorSelection([stripe], null)).toEqual(["stripe"]);
    expect(resolveConnectorSelection([stripe], [])).toEqual([]);
  });
  it("ignores unknown or duplicate keys and refuses disconnected selections", () => {
    const preference = readConnectorSelection("?inputs=stripe,stripe,xero,slack,notion,unknown,manual_documents");
    expect(preference).toEqual(["stripe", "xero", "slack", "notion"]);
    const sources: VibeRaisingInputSourceSummary[] = [stripe,
      { ...stripe, key: "xero", status: "not_connected" },
      { ...stripe, key: "slack", status: "syncing", selected: false },
      { ...stripe, key: "notion", status: "error" },
    ];
    expect(resolveConnectorSelection(sources, preference)).toEqual(["stripe", "slack"]);
  });
});

describe("connector tile accessibility", () => {
  it("exposes the whole connected tile as a named switch, with explicit on/off state", () => {
    const on = renderTile();
    expect(on).toContain('role="switch"');
    expect(on).toContain('aria-label="Stripe for this update"');
    expect(on).toContain('aria-checked="true"');
    expect(on).toContain("Included in update");
    expect(on).not.toContain('type="checkbox"');
    const off = renderTile(stripe, false);
    expect(off).toContain('aria-checked="false"');
    expect(off).toContain("Connected · not used");
  });
  it("shows disconnected and expired sources as off, with a connection action", () => {
    const disconnected = renderTile({ ...stripe, status: "not_connected" });
    expect(disconnected).toContain('data-on="false"');
    expect(disconnected).toContain('aria-label="Connect Stripe"');
    expect(disconnected).not.toContain('role="switch"');
    expect(renderTile({ ...stripe, status: "error" })).toContain('aria-label="Reconnect Stripe"');
  });
  it("disables unavailable providers while retaining the existing Stripe OAuth fallback", () => {
    expect(renderTile({ ...stripe, key: "notion", label: "Notion", status: "coming_soon" })).toContain('disabled=""');
    expect(renderTile({ ...stripe, key: "notion", label: "Notion", status: "unavailable" })).toContain('disabled=""');
    expect(renderTile({ ...stripe, status: "unavailable" })).not.toContain('disabled=""');
  });
});
