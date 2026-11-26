import { describe, expect, test } from "bun:test";
import { contains, layoutConsole, octagon, offAxisFrustum, project, toScene, type Rect } from "../app/components/team-console/console-layout";

const canvas = { left: 0, top: 0, width: 1400, height: 900 };
const body: Rect = toScene({ left: 72, top: 200, width: 1240, height: 620 }, canvas);
const screen: Rect = toScene({ left: 208, top: 256, width: 968, height: 500 }, canvas);

describe("team console layout", () => {
  test("page rectangles become centred, y-up scene rectangles", () => {
    expect(toScene({ left: 0, top: 0, width: 1400, height: 900 }, canvas)).toEqual({ x: -700, y: -450, w: 1400, h: 900 });
    expect(body).toEqual({ x: -628, y: -370, w: 1240, h: 620 });
  });

  test("grips, chin and deck fill the body around the screen", () => {
    const plan = layoutConsole(body, screen, 128);
    expect(plan.leftGrip.w).toBe(136);
    expect(plan.rightGrip.w).toBe(136);
    expect(plan.chin.h + plan.deck.h + screen.h).toBe(body.h);
    expect(contains(plan.bezel, screen)).toBe(true);
    expect(contains(body, plan.bezel)).toBe(true);
  });

  test("the cartridge sits over the slot, shows a lip when seated and rises inside the headroom", () => {
    for (const width of [760, 1000, 1240, 1700]) {
      const wide = { ...body, w: width };
      const plan = layoutConsole(wide, { ...screen, w: width - 272 }, 128);
      const top = wide.y + wide.h;
      const seatedTop = plan.cart.seatedY + plan.cart.h / 2, outTop = plan.cart.outY + plan.cart.h / 2;
      expect(seatedTop - top).toBe(26);
      expect(outTop).toBeGreaterThan(seatedTop);
      expect(outTop - top).toBeLessThanOrEqual(128 - 14);
      expect(plan.cart.x - plan.cart.w / 2).toBeGreaterThan(wide.x);
      expect(plan.cart.x + plan.cart.w / 2).toBeLessThan(wide.x + wide.w);
      expect(plan.slot.w).toBe(plan.cart.w + 16);
    }
  });

  test("a cut-corner outline has eight points inside its rectangle, and cuts are capped", () => {
    const points = octagon(body, [40, 20, 20, 20]);
    expect(points).toHaveLength(8);
    for (const point of points) {
      expect(point.x).toBeGreaterThanOrEqual(body.x); expect(point.x).toBeLessThanOrEqual(body.x + body.w);
      expect(point.y).toBeGreaterThanOrEqual(body.y); expect(point.y).toBeLessThanOrEqual(body.y + body.h);
    }
    const tiny = octagon({ x: 0, y: 0, w: 10, h: 10 }, [99, 99, 99, 99]);
    expect(Math.max(...tiny.map(point => point.x))).toBe(10);
  });

  test("the front face stays on the same pixels wherever the eye is; depth shows parallax", () => {
    const distance = 1300;
    const corner = { x: body.x, y: body.y + body.h, z: 0 };
    for (const eye of [{ x: 0, y: 0 }, { x: -400, y: 600 }, { x: 520, y: -80 }]) {
      const landed = project(corner, eye, distance);
      expect(landed.x).toBeCloseTo(corner.x, 6);
      expect(landed.y).toBeCloseTo(corner.y, 6);
    }
    // With the eye above the body the back top edge shows above the front edge: the top face is visible.
    const above = { x: 0, y: body.y + body.h + 600 };
    expect(project({ ...corner, z: -80 }, above, distance).y).toBeGreaterThan(corner.y);
  });

  test("the frustum is the window seen from the eye, scaled to the near plane", () => {
    const frustum = offAxisFrustum({ x: 100, y: -50 }, { w: 1400, h: 900 }, 1000, 250, 4000);
    expect(frustum).toEqual({ left: -200, right: 150, top: 125, bottom: -100, near: 250, far: 4000 });
    const centred = offAxisFrustum({ x: 0, y: 0 }, { w: 1400, h: 900 }, 1000);
    expect(centred.left).toBe(-centred.right);
    expect(centred.top).toBe(-centred.bottom);
  });
});
