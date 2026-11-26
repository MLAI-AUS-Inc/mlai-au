/** Pure geometry for the team console: no three.js, no DOM.
 *  Units are CSS pixels. The origin is the centre of the console's screen, y points up,
 *  and the screen lies in the plane z = 0. At scale 1 with no rotation the screen is
 *  exactly the size of the team panel, which is how the camera "fills the screen". */

export interface Size { w: number; h: number }
export interface Point { x: number; y: number }

export interface ConsoleDims {
  screen: Size;
  /** Width of the grip on each side of the screen. */
  grip: number;
  /** Plastic above and below the screen. */
  top: number;
  chin: number;
  body: Size;
  /** Centre of the body relative to the centre of the screen. */
  bodyCentre: Point;
  depth: number;
  radius: number;
  /** How far the dark glass reaches past the screen. */
  bezel: number;
  dpad: { x: number; y: number; arm: number; width: number; dish: number };
  a: { x: number; y: number; r: number };
  b: { x: number; y: number; r: number };
  cart: { w: number; h: number; t: number; x: number; seatedY: number; outY: number };
}

export const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

/** The console that fits around a screen of this size: a wide handheld with roomy grips. */
export function consoleDims(screen: Size): ConsoleDims {
  const { w, h } = screen;
  const grip = clamp(w * 0.36, h * 0.46, h * 0.85);
  const top = h * 0.16;
  const chin = h * 0.2;
  const body = { w: w + grip * 2, h: h + top + chin };
  const bodyCentre = { x: 0, y: (top - chin) / 2 };
  const depth = h * 0.15;
  const gripX = w / 2 + grip / 2;
  const cartW = clamp(w * 0.3, 150, 340);
  const cartH = cartW * 0.6;
  const bodyTop = h / 2 + top;
  return {
    screen, grip, top, chin, body, bodyCentre, depth,
    radius: Math.min(body.h * 0.24, grip * 0.7),
    bezel: h * 0.04,
    dpad: { x: -gripX, y: bodyCentre.y + h * 0.05, arm: grip * 0.52, width: grip * 0.17, dish: grip * 0.34 },
    a: { x: gripX + grip * 0.15, y: bodyCentre.y + h * 0.12, r: grip * 0.14 },
    b: { x: gripX - grip * 0.15, y: bodyCentre.y - h * 0.03, r: grip * 0.12 },
    cart: {
      w: cartW, h: cartH, t: depth * 0.42, x: w * 0.2,
      seatedY: bodyTop - cartH * 0.36,
      outY: bodyTop + cartH * 0.5 + h * 0.1,
    },
  };
}

/** The scale at which the whole console, cartridge hovering above it, sits inside the panel's box. */
export function heroScale(dims: ConsoleDims, fill = 0.9): number {
  const tall = dims.cart.outY + dims.cart.h / 2 - (dims.bodyCentre.y - dims.body.h / 2);
  return Math.min((dims.screen.w * fill) / dims.body.w, (dims.screen.h * fill) / tall);
}

/** Where the console's vertical middle is at rest, cartridge included, relative to the screen centre. */
export function heroCentre(dims: ConsoleDims): Point {
  const bottom = dims.bodyCentre.y - dims.body.h / 2;
  const topEdge = dims.cart.outY + dims.cart.h / 2;
  return { x: 0, y: (bottom + topEdge) / 2 };
}

/** Scale between the resting console (t = 0) and the screen filling the panel (t = 1).
 *  Geometric, so the zoom reads as a steady push in. */
export const zoomScale = (rest: number, t: number) => rest * Math.pow(1 / rest, clamp(t, 0, 1));

export const easeOutCubic = (t: number) => 1 - Math.pow(1 - clamp(t, 0, 1), 3);
export const easeInCubic = (t: number) => Math.pow(clamp(t, 0, 1), 3);
/** Slow start, then a sudden rush: the camera diving into the screen. */
export const easeInQuart = (t: number) => Math.pow(clamp(t, 0, 1), 4);
export const easeOutBack = (t: number) => {
  const c = 1.70158, x = clamp(t, 0, 1) - 1;
  return 1 + (c + 1) * x * x * x + c * x * x;
};
