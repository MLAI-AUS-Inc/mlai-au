import { describe, expect, test } from "bun:test";
import { renderToStaticMarkup } from "react-dom/server";
import RooAccountConnectionField from "../app/components/RooAccountConnectionField";

describe("RooAccountConnectionField", () => {
  test("shows a verified connection without asking the founder to link again", () => {
    const html = renderToStaticMarkup(
      <RooAccountConnectionField
        connection={{
          status: "connected",
          connectionType: "explicit",
          slackDisplayName: "Alan in Slack",
          verifiedAt: "2026-08-18T09:00:00Z",
        }}
      />,
    );

    expect(html).toContain("Connected");
    expect(html).toContain("Alan in Slack");
    expect(html).not.toContain("Check connection");
  });

  test("gives unconnected founders the private Roo linking path without blocking setup", () => {
    const html = renderToStaticMarkup(
      <RooAccountConnectionField
        connection={{
          status: "not_connected",
          connectionType: null,
          slackDisplayName: null,
          verifiedAt: null,
        }}
      />,
    );

    expect(html).toContain("Connect Roo to recognise your monthly updates");
    expect(html).toContain("send Roo");
    expect(html).toContain("You can continue setting up your company");
    expect(html).toContain('type="button"');
  });

  test("shows a disabled progress state while rechecking the connection", () => {
    const html = renderToStaticMarkup(
      <RooAccountConnectionField
        connection={{
          status: "not_connected",
          connectionType: null,
          slackDisplayName: null,
          verifiedAt: null,
        }}
        isChecking
      />,
    );

    expect(html).toContain("Checking...");
    expect(html).toContain('disabled=""');
    expect(html).toContain("animate-spin");
  });
});
