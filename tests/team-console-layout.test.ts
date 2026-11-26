import { describe, expect, test } from "bun:test";
import { consoleDims, easeInQuart, easeOutBack, easeOutCubic, heroCentre, heroScale, zoomScale } from "../app/components/team-console/console-layout";

const SCREENS = [{ w: 960, h: 520 }, { w: 1180, h: 560 }, { w: 1500, h: 640 }, { w: 1040, h: 900 }];

describe("team console layout", () => {
  test("the body wraps the screen with grips, a top edge and a taller chin", () => {
    for (const screen of SCREENS) {
      const dims = consoleDims(screen);
      expect(dims.body.w).toBeCloseTo(screen.w + dims.grip * 2);
      expect(dims.body.h).toBeCloseTo(screen.h + dims.top + dims.chin);
      expect(dims.chin).toBeGreaterThan(dims.top);
      // The screen sits above the middle of the body.
      expect(dims.bodyCentre.y).toBeLessThan(0);
      expect(dims.radius).toBeLessThanOrEqual(dims.body.h / 2);
    }
  });

  test("the controls sit inside their grips, clear of the screen and the edge", () => {
    for (const screen of SCREENS) {
      const dims = consoleDims(screen);
      const edge = dims.body.w / 2;
      expect(-dims.dpad.x - dims.dpad.dish).toBeGreaterThan(screen.w / 2);
      expect(-dims.dpad.x + dims.dpad.dish).toBeLessThan(edge);
      for (const key of [dims.a, dims.b]) {
        expect(key.x - key.r).toBeGreaterThan(screen.w / 2);
        expect(key.x + key.r).toBeLessThan(edge);
      }
      // A and B do not overlap.
      expect(Math.hypot(dims.a.x - dims.b.x, dims.a.y - dims.b.y)).toBeGreaterThan(dims.a.r + dims.b.r);
    }
  });

  test("the cartridge is seated mostly inside the body and hovers clear of it when out", () => {
    for (const screen of SCREENS) {
      const dims = consoleDims(screen);
      const top = screen.h / 2 + dims.top;
      expect(dims.cart.seatedY - dims.cart.h / 2).toBeLessThan(top);
      expect(dims.cart.seatedY + dims.cart.h / 2).toBeGreaterThan(top);
      expect(dims.cart.outY - dims.cart.h / 2).toBeGreaterThan(top);
      expect(Math.abs(dims.cart.x) + dims.cart.w / 2).toBeLessThan(screen.w / 2);
      expect(dims.cart.t).toBeLessThan(dims.depth);
    }
  });

  test("at rest the whole console, cartridge included, fits inside the panel's box", () => {
    for (const screen of SCREENS) {
      const dims = consoleDims(screen);
      const scale = heroScale(dims, 0.9);
      const centre = heroCentre(dims);
      const top = (dims.cart.outY + dims.cart.h / 2 - centre.y) * scale;
      const bottom = (dims.bodyCentre.y - dims.body.h / 2 - centre.y) * scale;
      expect(scale).toBeGreaterThan(0.2);
      expect(scale).toBeLessThan(1);
      expect(dims.body.w * scale).toBeLessThanOrEqual(screen.w * 0.9 + 0.001);
      expect(top).toBeLessThanOrEqual(screen.h * 0.45 + 0.001);
      expect(bottom).toBeCloseTo(-top);
    }
  });

  test("the zoom ends with the screen at exactly the panel's size", () => {
    expect(zoomScale(0.42, 0)).toBeCloseTo(0.42);
    expect(zoomScale(0.42, 1)).toBeCloseTo(1);
    expect(zoomScale(0.42, 0.5)).toBeCloseTo(Math.sqrt(0.42));
    expect(zoomScale(0.42, 2)).toBeCloseTo(1);
  });

  test("easings start at 0 and end at 1; the dive starts slowly", () => {
    for (const ease of [easeOutCubic, easeInQuart, easeOutBack]) {
      expect(ease(0)).toBeCloseTo(0);
      expect(ease(1)).toBeCloseTo(1);
    }
    expect(easeInQuart(0.5)).toBeLessThan(0.1);
    expect(easeOutBack(0.7)).toBeGreaterThan(1);
  });
});
