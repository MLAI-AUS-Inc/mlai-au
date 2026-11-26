/** Pure geometry for the team console: no three.js, no DOM.
 *  Units are CSS pixels. The origin is the centre of the console's screen, y points up,
 *  and the screen lies in the plane z = 0. At scale 1 with no rotation the screen is
 *  exactly the size of the team panel, which is how the camera "fills the screen". */

export interface Size { w: number; h: number }
export interface Point { x: number; y: number }

export interface ConsoleDims {
  screen: Size;
  /** A tall screen gets an upright handheld: screen on top, controls on a deck below. */
  upright: boolean;
  /** Plastic at each side of the screen. On the wide console these are the grips. */
  grip: number;
  /** Plastic above and below the screen. On the upright console the chin is the control deck. */
  top: number;
  chin: number;
  body: Size;
  /** Centre of the body relative to the centre of the screen. */
  bodyCentre: Point;
  depth: number;
  radius: number;
  /** How far the dark glass reaches past the screen. */
  bezel: number;
  /** The size the small details (pills, speaker holes) are cut to. */
  unit: number;
  dpad: { x: number; y: number; arm: number; width: number; dish: number };
  a: { x: number; y: number; r: number };
  b: { x: number; y: number; r: number };
  pills: Point;
  /** Bottom-left hole of the speaker grid. */
  speaker: Point;
  stamp: { x: number; y: number; w: number };
  lamp: Point;
  sticker: { x: number; y: number; size: number };
  tape: { x: number; y: number; w: number };
  cart: { w: number; h: number; t: number; x: number; seatedY: number; outY: number };
}

export const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

/** The console that fits around a screen of this size. A wide screen gets a wide handheld
 *  with roomy grips; a tall one (a phone) gets an upright handheld with the controls below. */
export function consoleDims(screen: Size): ConsoleDims {
  const { w, h } = screen;
  const upright = h > w * 1.05;
  const grip = upright ? w * 0.11 : clamp(w * 0.36, h * 0.46, h * 0.85);
  const top = upright ? w * 0.17 : h * 0.16;
  const chin = upright ? w * 0.74 : h * 0.2;
  const body = { w: w + grip * 2, h: h + top + chin };
  const bodyCentre = { x: 0, y: (top - chin) / 2 };
  const depth = upright ? w * 0.2 : h * 0.15;
  const bezel = upright ? w * 0.03 : h * 0.04;
  const gripX = w / 2 + grip / 2;
  const cartW = upright ? clamp(w * 0.5, 120, 340) : clamp(w * 0.3, 150, 340);
  const cartH = cartW * 0.6;
  const bodyTop = h / 2 + top;
  /** A height on the control deck, as a share of the way down it. */
  const deck = (share: number) => -h / 2 - chin * share;
  const cart = {
    w: cartW, h: cartH, t: depth * 0.42, x: upright ? 0 : w * 0.2,
    seatedY: bodyTop - cartH * 0.36,
    outY: bodyTop + cartH * 0.5 + (upright ? w * 0.12 : h * 0.1),
  };
  if (upright) {
    const stampW = w * 0.8;
    return {
      screen, upright, grip, top, chin, body, bodyCentre, depth, bezel, cart,
      radius: body.w * 0.11,
      unit: w * 0.52,
      dpad: { x: -w * 0.25, y: deck(0.47), arm: w * 0.33, width: w * 0.105, dish: w * 0.21 },
      a: { x: w * 0.33, y: deck(0.38), r: w * 0.095 },
      b: { x: w * 0.14, y: deck(0.57), r: w * 0.082 },
      pills: { x: -w * 0.02, y: deck(0.86) },
      speaker: { x: w * 0.25, y: deck(0.9) },
      stamp: { x: -w / 2 + bezel * 2.4 + stampW / 2, y: deck(0.1), w: stampW },
      lamp: { x: -w / 2 + bezel * 1.2, y: deck(0.1) },
      sticker: { x: -w * 0.33, y: deck(0.87), size: w * 0.15 },
      tape: { x: w * 0.3, y: h / 2 + top * 0.42, w: w * 0.44 },
    };
  }
  const stampW = Math.min(w * 0.62, 620);
  return {
    screen, upright, grip, top, chin, body, bodyCentre, depth, bezel, cart,
    radius: Math.min(body.h * 0.24, grip * 0.7),
    unit: grip,
    dpad: { x: -gripX, y: bodyCentre.y + h * 0.05, arm: grip * 0.52, width: grip * 0.17, dish: grip * 0.34 },
    a: { x: gripX + grip * 0.15, y: bodyCentre.y + h * 0.12, r: grip * 0.14 },
    b: { x: gripX - grip * 0.15, y: bodyCentre.y - h * 0.03, r: grip * 0.12 },
    pills: { x: w * 0.5 - grip * 0.35, y: deck(0.52) },
    speaker: { x: w / 2 + grip * 0.36, y: deck(0.1) },
    stamp: { x: -w / 2 + bezel * 2.4 + stampW / 2, y: deck(0.56), w: stampW },
    lamp: { x: -w / 2 + bezel * 1.2, y: deck(0.56) },
    sticker: { x: -w / 2 - grip * 0.52, y: -h / 2 + h * 0.1, size: grip * 0.36 },
    tape: { x: w / 2 + grip * 0.42, y: h / 2 + top * 0.34, w: Math.min(grip * 1.25, 330) },
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
