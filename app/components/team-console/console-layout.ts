/** Pure geometry for the team console: no three.js, no DOM. Units are CSS pixels,
 *  with the origin at the centre of the canvas and y pointing up. */

export interface Rect { x: number; y: number; w: number; h: number }
export interface Point { x: number; y: number }

/** A DOM rectangle (left/top/width/height in page pixels) in canvas-centred, y-up space. */
export function toScene(rect: { left: number; top: number; width: number; height: number }, canvas: { left: number; top: number; width: number; height: number }): Rect {
  return {
    x: rect.left - canvas.left - canvas.width / 2,
    y: canvas.height / 2 - (rect.top - canvas.top) - rect.height,
    w: rect.width,
    h: rect.height,
  };
}

export const grow = (rect: Rect, by: number): Rect => ({ x: rect.x - by, y: rect.y - by, w: rect.w + by * 2, h: rect.h + by * 2 });
export const centre = (rect: Rect): Point => ({ x: rect.x + rect.w / 2, y: rect.y + rect.h / 2 });
export const contains = (outer: Rect, inner: Rect, slack = 0) =>
  inner.x >= outer.x - slack && inner.y >= outer.y - slack &&
  inner.x + inner.w <= outer.x + outer.w + slack && inner.y + inner.h <= outer.y + outer.h + slack;

/** A rectangle with its corners cut at 45 degrees. `cuts` is [top-left, top-right, bottom-right, bottom-left].
 *  Points run counter-clockwise from the bottom-left cut. */
export function octagon(rect: Rect, cuts: [number, number, number, number]): Point[] {
  const limit = Math.min(rect.w, rect.h) / 2;
  const [tl, tr, br, bl] = cuts.map(cut => Math.max(0, Math.min(cut, limit)));
  const left = rect.x, right = rect.x + rect.w, bottom = rect.y, top = rect.y + rect.h;
  return [
    { x: left + bl, y: bottom }, { x: right - br, y: bottom },
    { x: right, y: bottom + br }, { x: right, y: top - tr },
    { x: right - tr, y: top }, { x: left + tl, y: top },
    { x: left, y: top - tl }, { x: left, y: bottom + bl },
  ];
}

export interface Frustum { left: number; right: number; top: number; bottom: number; near: number; far: number }

/** An off-axis frustum for an eye at (eye.x, eye.y, distance) looking down -z at a window of
 *  `size` centred on the origin in the plane z = 0. Whatever the eye position, a point on that
 *  plane lands on the same pixel, so the console's front face stays registered with the page
 *  while its depth shows parallax. */
export function offAxisFrustum(eye: Point, size: { w: number; h: number }, distance: number, near = distance * 0.25, far = distance * 4): Frustum {
  const scale = near / distance;
  return {
    left: (-size.w / 2 - eye.x) * scale,
    right: (size.w / 2 - eye.x) * scale,
    top: (size.h / 2 - eye.y) * scale,
    bottom: (-size.h / 2 - eye.y) * scale,
    near, far,
  };
}

/** Where a scene point lands in canvas pixels (origin centre, y up) for that eye. */
export function project(point: { x: number; y: number; z: number }, eye: Point, distance: number): Point {
  const t = distance / (distance - point.z);
  return { x: eye.x + (point.x - eye.x) * t, y: eye.y + (point.y - eye.y) * t };
}

export interface ConsoleLayout {
  body: Rect;
  screen: Rect;
  bezel: Rect;
  depth: number;
  cuts: [number, number, number, number];
  leftGrip: Rect;
  rightGrip: Rect;
  chin: Rect;
  deck: Rect;
  cart: { w: number; h: number; t: number; x: number; seatedY: number; outY: number };
  slot: Rect;
}

/** Derive every part's place from the two rectangles the page lays out: the console body and its screen. */
export function layoutConsole(body: Rect, screen: Rect, headroom: number): ConsoleLayout {
  const gripW = Math.max(0, screen.x - body.x);
  const depth = Math.round(Math.max(56, Math.min(96, body.w * 0.07)));
  const cut = Math.round(Math.max(16, Math.min(34, body.w * 0.024)));
  const top = body.y + body.h;
  const cartW = Math.round(Math.max(170, Math.min(260, body.w * 0.19)));
  const cartH = Math.round(cartW * 0.62);
  const cartX = Math.round(body.x + body.w * 0.68);
  const shown = 26;
  const rise = Math.max(shown, Math.min(cartH * 0.72, headroom - 14));
  return {
    body, screen, depth,
    bezel: grow(screen, 14),
    cuts: [Math.round(cut * 1.6), cut, cut, cut],
    leftGrip: { x: body.x, y: body.y, w: gripW, h: body.h },
    rightGrip: { x: screen.x + screen.w, y: body.y, w: Math.max(0, body.x + body.w - screen.x - screen.w), h: body.h },
    chin: { x: screen.x, y: body.y, w: screen.w, h: Math.max(0, screen.y - body.y) },
    deck: { x: screen.x, y: screen.y + screen.h, w: screen.w, h: Math.max(0, top - screen.y - screen.h) },
    cart: { w: cartW, h: cartH, t: Math.round(depth * 0.3), x: cartX, seatedY: top + shown - cartH / 2, outY: top + rise - cartH / 2 },
    slot: { x: cartX - cartW / 2 - 8, y: top - 2, w: cartW + 16, h: 4 },
  };
}
