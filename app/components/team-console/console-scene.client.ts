// The only module that touches three.js. It draws MLAI SLAB-1 on a transparent canvas
// above the flat console, measuring the page and never writing to it. The camera is an
// off-axis perspective: the front face of the console stays registered with the DOM at
// every eye position, while its depth, keys and cartridge show real parallax.
import * as THREE from "three";
import { layoutConsole, octagon, offAxisFrustum, toScene, type ConsoleLayout, type Point, type Rect } from "./console-layout";
import type { CartState } from "./cartridge";

export type ConsoleControl = "prev" | "next" | "a" | "b";
export interface ConsoleScene {
  setCart(state: CartState): void;
  press(control: ConsoleControl): void;
  dispose(): void;
}
interface Parts { slab: HTMLElement; screen: HTMLElement }
interface Options { interactive: boolean; cart: CartState; onFirstFrame(): void; onLost(): void }

const INK = { ink: "#1a1a1a", deep: "#111111", paper: "#f5f0e6", paperLo: "#e2dac8", orange: "#ff3c00", yellow: "#fefc22", teal: "#00ffd7", purple: "#4b0db3", red: "#ff003d", tape: "#e9dfc0" };
const MARGIN = 72;
const PRINT = '"Anton", Impact, "Arial Narrow", sans-serif';
const HEAD = '"Oswald", "Arial Narrow", sans-serif';
const HAND = '"Permanent Marker", "Marker Felt", cursive';

const easeOutBack = (t: number) => 1 + 2.4 * Math.pow(t - 1, 3) + 1.4 * Math.pow(t - 1, 2);
const easeInCubic = (t: number) => t * t * t;
const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const clamp = (value: number, low: number, high: number) => Math.min(high, Math.max(low, value));

function shapeFrom(points: Point[]): THREE.Shape {
  const shape = new THREE.Shape();
  points.forEach((point, index) => (index ? shape.lineTo(point.x, point.y) : shape.moveTo(point.x, point.y)));
  shape.closePath();
  return shape;
}
const rectPoints = (rect: Rect): Point[] => [
  { x: rect.x, y: rect.y }, { x: rect.x + rect.w, y: rect.y }, { x: rect.x + rect.w, y: rect.y + rect.h }, { x: rect.x, y: rect.y + rect.h },
];

export function createConsoleScene(host: HTMLElement, parts: Parts, options: Options): ConsoleScene {
  const canvas = document.createElement("canvas");
  canvas.className = "team-console-canvas";
  canvas.setAttribute("aria-hidden", "true");
  canvas.style.left = canvas.style.top = `${-MARGIN}px`;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "low-power" });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NoToneMapping;
  let software = false;
  try {
    const gl = renderer.getContext();
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : "");
    software = /swiftshader|llvmpipe|software/i.test(name);
  } catch { /* the renderer name is only a hint */ }
  const pixelRatio = software ? 1 : Math.min(window.devicePixelRatio || 1, 2);
  renderer.setPixelRatio(pixelRatio);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera();
  camera.matrixAutoUpdate = false;
  scene.add(new THREE.AmbientLight(0xffffff, 0.62));
  const sun = new THREE.DirectionalLight(0xffffff, 1.5);
  sun.position.set(-0.35, 0.8, 0.5);
  scene.add(sun);

  const rig = new THREE.Group();
  scene.add(rig);
  const disposables: { dispose(): void }[] = [];
  const keep = <T extends { dispose(): void }>(item: T): T => { disposables.push(item); return item; };
  const flat = (color: string, extra: THREE.MeshBasicMaterialParameters = {}) => keep(new THREE.MeshBasicMaterial({ color, ...extra }));
  const lit = (color: string) => keep(new THREE.MeshLambertMaterial({ color }));

  let layout: ConsoleLayout | null = null;
  let size = { w: 1, h: 1 };
  let distance = 1000;
  let cart = options.cart;
  let cartMesh: THREE.Group | null = null;
  let offScreen: THREE.Mesh | null = null;
  let hole: THREE.Mesh | null = null;
  let glare: THREE.Mesh | null = null;
  let lamp: THREE.MeshBasicMaterial | null = null;
  const keys = new Map<ConsoleControl, { mesh: THREE.Object3D; pressedAt: number }>();
  const repaint: (() => void)[] = [];

  /** A canvas texture painted now and again once the page fonts arrive. */
  function painted(width: number, height: number, paint: (context: CanvasRenderingContext2D, w: number, h: number) => void): THREE.CanvasTexture {
    const scale = Math.min(2, pixelRatio * 1.5);
    const surface = document.createElement("canvas");
    surface.width = Math.max(2, Math.round(width * scale));
    surface.height = Math.max(2, Math.round(height * scale));
    const texture = keep(new THREE.CanvasTexture(surface));
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;
    const run = () => {
      const context = surface.getContext("2d");
      if (!context) return;
      context.setTransform(scale, 0, 0, scale, 0, 0);
      context.clearRect(0, 0, width, height);
      try { paint(context, width, height); } catch { /* a decal is never worth a crash */ }
      texture.needsUpdate = true;
    };
    run();
    repaint.push(run);
    return texture;
  }

  function spaced(context: CanvasRenderingContext2D, text: string, x: number, y: number, tracking: number) {
    let cursor = x;
    for (const letter of text) { context.fillText(letter, cursor, y); cursor += context.measureText(letter).width + tracking; }
  }

  let builtKey = "";
  const sizeKey = () => {
    const a = host.getBoundingClientRect(), b = parts.screen.getBoundingClientRect(), c = parts.slab.getBoundingClientRect();
    return [a.width, a.height, b.width, b.height, c.width, c.height].map(Math.round).join("x");
  };
  function build() {
    builtKey = sizeKey();
    // Throw the old console away. Geometry, materials and textures are all rebuilt: a resize is rare.
    rig.clear(); keys.clear(); repaint.length = 0;
    disposables.splice(0).forEach(item => item.dispose());
    cartMesh = offScreen = hole = glare = null; lamp = null;

    const hostBox = host.getBoundingClientRect();
    if (hostBox.width < 2 || hostBox.height < 2) { layout = null; return; }
    const box = { left: hostBox.left - MARGIN, top: hostBox.top - MARGIN, width: hostBox.width + MARGIN * 2, height: hostBox.height + MARGIN * 2 };
    size = { w: box.width, h: box.height };
    canvas.style.width = `${size.w}px`; canvas.style.height = `${size.h}px`;
    renderer.setSize(size.w, size.h, false);
    distance = size.w * 0.95;

    const body = toScene(parts.slab.getBoundingClientRect(), box);
    const screen = toScene(parts.screen.getBoundingClientRect(), box);
    const headroom = size.h / 2 - MARGIN - (body.y + body.h);
    const plan = layout = layoutConsole(body, screen, Math.max(40, headroom));
    const depth = plan.depth;
    const outline = octagon(body, plan.cuts);

    const extrude = (points: Point[], z0: number, z1: number, cap: THREE.Material, side: THREE.Material, holes: Point[][] = []) => {
      const shape = shapeFrom(points);
      holes.forEach(points => shape.holes.push(shapeFrom(points)));
      const geometry = keep(new THREE.ExtrudeGeometry(shape, { depth: z1 - z0, bevelEnabled: false, steps: 1 }));
      geometry.translate(0, 0, z0);
      return new THREE.Mesh(geometry, [cap, side]);
    };
    const plane = (rect: Rect, z: number, material: THREE.Material) => {
      const mesh = new THREE.Mesh(keep(new THREE.PlaneGeometry(rect.w, rect.h)), material);
      mesh.position.set(rect.x + rect.w / 2, rect.y + rect.h / 2, z);
      return mesh;
    };
    const block = (w: number, h: number, d: number, front: THREE.Material, side: THREE.Material) =>
      new THREE.Mesh(keep(new THREE.BoxGeometry(w, h, d)), [side, side, side, side, front, side]);

    // Yellow drop, ink keyline hull, paper body.
    const drop = new THREE.Mesh(keep(new THREE.ShapeGeometry(shapeFrom(outline))), flat(INK.yellow));
    drop.position.set(18, -18 - depth * 0.5, -depth - 1);
    rig.add(drop);
    const hull = octagon({ x: body.x - 3, y: body.y - 3, w: body.w + 6, h: body.h + 6 }, plan.cuts.map(cut => cut + 1.5) as [number, number, number, number]);
    const ink = flat(INK.ink, { side: THREE.BackSide });
    rig.add(extrude(hull, -depth - 0.5, -0.5, ink, ink));
    rig.add(extrude(outline, -depth, 0, flat(INK.paper), lit(INK.paper)));

    // Everything printed or stuck on the front face is one painted sheet.
    const sheet = painted(body.w, body.h, (context, w, h) => {
      const toX = (x: number) => x - body.x, toY = (y: number) => h - (y - body.y);
      // Chin stamp.
      context.fillStyle = INK.ink;
      context.textBaseline = "middle";
      const chinMid = body.y + (plan.bezel.y - body.y) / 2;
      const chinY = toY(chinMid);
      context.font = `500 ${Math.round(clamp((plan.bezel.y - body.y) * 0.3, 10, 14))}px ${HEAD}`;
      spaced(context, "MLAI SLAB-1 · 15 FIGHTERS · NO BATTERIES", toX(plan.chin.x) + 30, chinY, 1.8);
      // Speaker slots, lower right grip.
      if (plan.rightGrip.w > 70) {
        const gx = toX(plan.rightGrip.x + plan.rightGrip.w / 2), gy = toY(plan.rightGrip.y + plan.rightGrip.h * 0.16);
        context.save(); context.translate(gx, gy); context.rotate(-0.6);
        for (let index = -1; index <= 1; index++) context.fillRect(-plan.rightGrip.w * 0.26, index * 11 - 2.5, plan.rightGrip.w * 0.52, 5);
        context.restore();
      }
      // Round sticker, top of the right grip.
      if (plan.rightGrip.w > 78) {
        const radius = Math.min(plan.rightGrip.w * 0.36, 44);
        const sx = toX(plan.rightGrip.x + plan.rightGrip.w / 2), sy = toY(plan.rightGrip.y + plan.rightGrip.h * 0.86);
        context.save(); context.translate(sx, sy); context.rotate(0.14);
        context.fillStyle = INK.orange; context.strokeStyle = INK.ink; context.lineWidth = 3;
        context.beginPath(); context.arc(0, 0, radius, 0, Math.PI * 2); context.fill(); context.stroke();
        context.fillStyle = INK.ink; context.textAlign = "center";
        context.font = `400 ${Math.round(radius * 0.34)}px ${PRINT}`;
        context.fillText("NOT FOR", 0, -radius * 0.34); context.fillText("PROFIT", 0, radius * 0.02);
        context.font = `400 ${Math.round(radius * 0.26)}px ${HAND}`;
        context.fillText("for everyone", 0, radius * 0.44);
        context.restore();
      }
      // Masking tape across the top-left cut.
      context.save();
      context.translate(toX(body.x) + 6, toY(body.y + body.h) + plan.cuts[0] * 0.95);
      context.rotate(-0.07);
      context.font = `400 ${Math.round(clamp(body.w * 0.0105, 11, 14))}px ${HAND}`;
      context.textAlign = "left";
      const label = "PROPERTY OF THE COMMUNITY";
      const tapeW = context.measureText(label).width + 34, tapeH = 26;
      context.fillStyle = INK.tape;
      context.beginPath();
      context.moveTo(-10, -tapeH / 2 + 2); context.lineTo(-6, -tapeH / 2 - 2); context.lineTo(tapeW, -tapeH / 2);
      context.lineTo(tapeW + 5, -2); context.lineTo(tapeW - 2, tapeH / 2); context.lineTo(-7, tapeH / 2 + 1); context.lineTo(-12, 4);
      context.closePath(); context.fill();
      context.fillStyle = INK.ink; context.fillText(label, 8, 1);
      context.restore();
      // Marker note pointing at the slot.
      if (options.interactive && plan.deck.h > 20) {
        context.save();
        context.font = `400 ${Math.round(clamp(plan.deck.h * 0.42, 11, 15))}px ${HAND}`;
        context.textAlign = "right";
        context.translate(toX(plan.slot.x) - 14, toY((plan.bezel.y + plan.bezel.h + body.y + body.h) / 2));
        context.rotate(0.03);
        context.fillText("cart goes here ↑", 0, 0);
        context.restore();
      }
    });
    rig.add(plane(body, 0.4, flat("#ffffff", { map: sheet, transparent: true, depthWrite: false })));

    // Lamp on the chin.
    lamp = flat(INK.teal);
    const lampFrame = block(16, 16, 3, flat(INK.ink), flat(INK.ink));
    lampFrame.position.set(plan.chin.x + 14, body.y + (plan.bezel.y - body.y) / 2, 1.5);
    const lampLight = block(10, 10, 4, lamp, lamp);
    lampLight.position.copy(lampFrame.position).setZ(2.2);
    rig.add(lampFrame, lampLight);

    // Bezel: an ink frame standing proud of the face, with the screen showing through its window.
    const inner = { x: screen.x + 2, y: screen.y + 2, w: screen.w - 4, h: screen.h - 4 };
    rig.add(extrude(rectPoints(plan.bezel), 0, 9, flat(INK.ink), lit("#3a3a3a"), [rectPoints(inner)]));
    // The window itself writes transparent pixels, so the live HTML panel under the canvas shows.
    hole = plane({ x: screen.x + 1, y: screen.y + 1, w: screen.w - 2, h: screen.h - 2 }, 0.6,
      keep(new THREE.MeshBasicMaterial({ color: 0x000000, opacity: 0, transparent: false, blending: THREE.NoBlending })));
    rig.add(hole);
    // A dark screen for when the cartridge is out and the console is tilted in the hand.
    const dark = painted(screen.w, screen.h, (context, w, h) => {
      context.fillStyle = INK.deep; context.fillRect(0, 0, w, h);
      context.fillStyle = "rgba(245,240,230,0.05)";
      for (let y = 0; y < h; y += 4) context.fillRect(0, y, w, 1);
      context.save(); context.translate(w / 2, h * 0.44); context.rotate(-0.07);
      const fontSize = clamp(w * 0.11, 40, 120);
      context.font = `400 ${Math.round(fontSize)}px ${PRINT}`;
      context.textAlign = "center"; context.textBaseline = "middle";
      const stampW = context.measureText("NO CART").width + fontSize * 0.5;
      context.strokeStyle = INK.red; context.lineWidth = Math.max(4, fontSize * 0.07);
      context.strokeRect(-stampW / 2, -fontSize * 0.62, stampW, fontSize * 1.24);
      context.fillStyle = INK.red; context.fillText("NO CART", 0, fontSize * 0.04);
      context.restore();
      context.fillStyle = INK.yellow; context.textAlign = "center"; context.textBaseline = "middle";
      context.font = `700 ${Math.round(clamp(w * 0.022, 14, 24))}px ${HEAD}`;
      const prompt = "CLICK TO PUT THE CARTRIDGE BACK";
      const promptW = [...prompt].reduce((sum, letter) => sum + context.measureText(letter).width + 3, 0);
      context.textAlign = "left";
      spaced(context, prompt, w / 2 - promptW / 2, h * 0.74, 3);
    });
    offScreen = plane({ x: screen.x + 1, y: screen.y + 1, w: screen.w - 2, h: screen.h - 2 }, 0.7, flat("#ffffff", { map: dark }));
    rig.add(offScreen);
    // One wedge of glare on the glass.
    const wedge = new THREE.Shape();
    const gx = screen.x + screen.w, gy = screen.y + screen.h;
    wedge.moveTo(gx - screen.w * 0.34, gy - 2); wedge.lineTo(gx - 2, gy - 2); wedge.lineTo(gx - 2, gy - screen.h * 0.42); wedge.closePath();
    glare = new THREE.Mesh(keep(new THREE.ShapeGeometry(wedge)), flat(INK.paper, { transparent: true, opacity: 0.07, depthWrite: false }));
    glare.position.z = 1; glare.renderOrder = 5;
    rig.add(glare);

    // Keys. Their places come from the pointer hotspots the page lays out in the grips.
    const glyph = (text: string, background: string, color: string) => painted(96, 96, (context, w, h) => {
      context.fillStyle = background; context.fillRect(0, 0, w, h);
      context.fillStyle = color; context.textAlign = "center"; context.textBaseline = "middle";
      if (text === "◀" || text === "▶") {
        const dir = text === "▶" ? 1 : -1;
        context.beginPath(); context.moveTo(w / 2 + dir * 20, h / 2); context.lineTo(w / 2 - dir * 14, h / 2 - 22); context.lineTo(w / 2 - dir * 14, h / 2 + 22); context.closePath(); context.fill();
      } else { context.font = `400 54px ${PRINT}`; context.fillText(text, w / 2, h / 2 + 3); }
    });
    const keyStyle: Record<ConsoleControl, { text: string; face: string; ink: string; side: string; proud: number; turn: number }> = {
      prev: { text: "◀", face: INK.ink, ink: INK.yellow, side: "#3a3a3a", proud: 12, turn: 0 },
      next: { text: "▶", face: INK.ink, ink: INK.yellow, side: "#3a3a3a", proud: 12, turn: 0 },
      a: { text: "A", face: INK.orange, ink: INK.ink, side: INK.orange, proud: 16, turn: -0.05 },
      b: { text: "B", face: INK.teal, ink: INK.ink, side: INK.teal, proud: 13, turn: 0.07 },
    };
    const plates: Rect[] = [];
    host.querySelectorAll<HTMLElement>(".team-console-key").forEach(element => {
      const control = element.dataset.control as ConsoleControl;
      const style = keyStyle[control];
      const rect = toScene(element.getBoundingClientRect(), box);
      if (!style || rect.w < 4) return;
      const mesh = block(rect.w, rect.h, style.proud, flat("#ffffff", { map: glyph(style.text, style.face, style.ink) }), lit(style.side));
      const trim = new THREE.Mesh(keep(new THREE.BoxGeometry(rect.w + 6, rect.h + 6, style.proud - 2)), ink);
      const key = new THREE.Group();
      key.add(trim, mesh);
      key.position.set(rect.x + rect.w / 2, rect.y + rect.h / 2, style.proud / 2);
      key.rotation.z = style.turn;
      key.userData.rest = style.proud / 2;
      rig.add(key);
      keys.set(control, { mesh: key, pressedAt: -1 });
      if (control === "prev" || control === "next") plates.push(rect);
    });
    if (plates.length) {
      const left = Math.min(...plates.map(rect => rect.x)) - 9, right = Math.max(...plates.map(rect => rect.x + rect.w)) + 9;
      const bottom = Math.min(...plates.map(rect => rect.y)) - 9, top = Math.max(...plates.map(rect => rect.y + rect.h)) + 9;
      const plate = block(right - left, top - bottom, 3, flat(INK.orange), flat(INK.ink));
      plate.position.set((left + right) / 2, (bottom + top) / 2, 1.5);
      rig.add(plate);
    }

    // Slot in the top face and the cartridge standing in it.
    const top = body.y + body.h;
    const slot = new THREE.Mesh(keep(new THREE.BoxGeometry(plan.slot.w, 1.2, plan.cart.t + 12)), flat(INK.deep));
    slot.position.set(plan.cart.x, top + 0.7, -depth / 2);
    rig.add(slot);
    if (options.interactive) {
      const { w, h, t } = plan.cart;
      cartMesh = new THREE.Group();
      const shell = block(w, h, t, flat(INK.purple), lit(INK.purple));
      const shellInk = new THREE.Mesh(keep(new THREE.BoxGeometry(w + 6, h + 6, t - 2)), ink);
      const label = painted(w * 0.82, h * 0.6, (context, lw, lh) => {
        context.fillStyle = INK.yellow; context.fillRect(0, 0, lw, lh);
        context.strokeStyle = INK.ink; context.lineWidth = 5; context.strokeRect(0, 0, lw, lh);
        context.fillStyle = INK.ink; context.textAlign = "center"; context.textBaseline = "middle";
        context.font = `400 ${Math.round(lh * 0.3)}px ${PRINT}`;
        context.fillText("COMMUNITY CLASH", lw / 2, lh * 0.3, lw * 0.9);
        context.font = `500 ${Math.round(lh * 0.13)}px ${HEAD}`;
        context.fillText("MLAI ARCADE · CART 01", lw / 2, lh * 0.58, lw * 0.9);
        context.font = `400 ${Math.round(lh * 0.15)}px ${HAND}`;
        context.fillText("pick two. fight nice.", lw / 2, lh * 0.8, lw * 0.9);
      });
      const sticker = new THREE.Mesh(keep(new THREE.PlaneGeometry(w * 0.82, h * 0.6)), flat("#ffffff", { map: label }));
      sticker.position.set(0, -h * 0.1, t / 2 + 0.6);
      cartMesh.add(shellInk, shell, sticker);
      // Grip ridges along the top edge.
      for (let index = -2; index <= 2; index++) {
        const ridge = new THREE.Mesh(keep(new THREE.BoxGeometry(w * 0.09, h * 0.09, 3)), flat(INK.ink));
        ridge.position.set(index * w * 0.14, h * 0.36, t / 2 + 1.5);
        cartMesh.add(ridge);
      }
      cartMesh.position.set(plan.cart.x, plan.cart.seatedY, -depth / 2);
      rig.add(cartMesh);
    }
    // The rig turns about the middle of the body.
    pivot.set(body.x + body.w / 2, body.y + body.h / 2, -depth / 2);
    pose(true);
  }

  // ── Motion ──────────────────────────────────────────────────────────
  const pivot = new THREE.Vector3();
  const eye = { x: 0, y: 0 }, eyeGoal = { x: 0, y: 0 };
  const pointer = { x: 0, y: 0, inside: false };
  const turn = { x: 0, y: 0, z: 0, lift: 0, scale: 1 };
  let cartFrom = 0, cartAt = 0, cartStart = 0, cartSpan = 0, cartEase = easeInOut;
  let tilt = 0, tiltFrom = 0, tiltGoal = 0, tiltStart = 0, tiltSpan = 1;
  let frame = 0, last = 0, alive = true, visible = true, drawn = false;

  const isOut = (state: CartState) => state === "ejecting" || state === "out";
  const screenDark = (state: CartState) => state === "ejecting" || state === "out" || state === "inserting";

  /** Snap or start the tweens that follow from the current cartridge state. */
  function pose(snap: boolean) {
    if (!layout) return;
    const now = performance.now();
    const goalCart = isOut(cart) ? 1 : 0;
    const goalTilt = isOut(cart) ? 1 : 0;
    if (snap) { cartAt = cartFrom = goalCart; cartSpan = 0; tilt = tiltFrom = tiltGoal = goalTilt; tiltSpan = 0; }
    else {
      cartFrom = cartAt; cartStart = now;
      cartSpan = cart === "ejecting" ? 380 : cart === "inserting" ? 460 : 0;
      cartEase = cart === "ejecting" ? easeOutBack : easeInCubic;
      if (!cartSpan) cartAt = goalCart;
      if (cart === "ejecting" || cart === "out") { if (tiltGoal !== 1) { tiltFrom = tilt; tiltGoal = 1; tiltStart = now; tiltSpan = 620; } }
      else if (cart === "inserting") { tiltFrom = tilt; tiltGoal = 0; tiltStart = now; tiltSpan = 440; }
      else { tilt = tiltFrom = tiltGoal = 0; tiltSpan = 0; }
    }
    if (offScreen) offScreen.visible = screenDark(cart);
    if (hole) hole.visible = !screenDark(cart);
    if (glare) glare.visible = true;
    if (lamp) lamp.color.set(cart === "seated" || cart === "booting" ? INK.teal : INK.red);
    wake();
  }

  function restEye() {
    if (!layout) return { x: 0, y: 0 };
    const top = layout.body.y + layout.body.h;
    return { x: -0.03 * distance, y: top + 0.5 * distance };
  }

  function step(now: number): boolean {
    if (!layout) return false;
    const dt = Math.min(64, now - last || 16); last = now;
    let moving = false;

    // Eye: parallax toward the pointer, easing home when it leaves.
    const rest = restEye();
    const reach = isOut(cart) ? 0.25 : 1;
    eyeGoal.x = rest.x + (pointer.inside ? pointer.x * 0.62 * size.w * reach : 0);
    eyeGoal.y = rest.y - (pointer.inside ? pointer.y * 0.16 * distance * reach : 0);
    const blend = 1 - Math.exp(-dt / 140);
    eye.x += (eyeGoal.x - eye.x) * blend; eye.y += (eyeGoal.y - eye.y) * blend;
    if (Math.abs(eyeGoal.x - eye.x) + Math.abs(eyeGoal.y - eye.y) > 0.3) moving = true; else { eye.x = eyeGoal.x; eye.y = eyeGoal.y; }

    // Cartridge travel.
    if (cartSpan) {
      const t = clamp((now - cartStart) / cartSpan, 0, 1);
      const goal = isOut(cart) ? 1 : 0;
      cartAt = cartFrom + (goal - cartFrom) * cartEase(t);
      if (t < 1) moving = true; else { cartAt = goal; cartSpan = 0; }
    }
    // Tilt in the hand while the cartridge is out.
    if (tiltSpan) {
      const t = clamp((now - tiltStart) / tiltSpan, 0, 1);
      tilt = tiltFrom + (tiltGoal - tiltFrom) * easeInOut(t);
      if (t < 1) moving = true; else { tilt = tiltGoal; tiltSpan = 0; }
    }
    const held = tilt > 0.001;
    const sway = held && cart === "out" ? now / 1000 : 0;
    const goalY = held ? (pointer.inside ? pointer.x * 0.3 : 0) + Math.sin(sway * 0.9) * 0.05 : 0;
    const goalX = held ? 0.34 + (pointer.inside ? pointer.y * 0.14 : 0) + Math.sin(sway * 0.7) * 0.025 : 0;
    turn.y += (goalY * tilt - turn.y) * blend; turn.x += (goalX * tilt - turn.x) * blend;
    turn.z = -0.035 * tilt; turn.scale = 1 - 0.1 * tilt; turn.lift = -22 * tilt;
    if (held || Math.abs(turn.x) + Math.abs(turn.y) > 0.0005) moving = true; else { turn.x = turn.y = 0; }

    // Keys spring back.
    keys.forEach(key => {
      const rest = key.mesh.userData.rest as number;
      if (key.pressedAt < 0) { key.mesh.position.z = rest; return; }
      const t = (now - key.pressedAt) / 200;
      if (t >= 1) { key.pressedAt = -1; key.mesh.position.z = rest; return; }
      key.mesh.position.z = rest - 7 * Math.sin(Math.PI * Math.min(1, t * 1.15));
      moving = true;
    });

    // Apply.
    if (cartMesh) {
      const { seatedY, outY } = layout.cart;
      cartMesh.position.y = seatedY + (outY - seatedY) * cartAt + 34 * tilt * Math.max(0, cartAt);
      cartMesh.rotation.x = -0.1 * cartAt;
    }
    rig.position.set(0, 0, 0); rig.rotation.set(0, 0, 0); rig.scale.setScalar(1);
    rig.updateMatrix();
    // Rotate and scale about the pivot.
    const matrix = new THREE.Matrix4()
      .makeTranslation(pivot.x, pivot.y + turn.lift, pivot.z)
      .multiply(new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(turn.x, turn.y, turn.z, "YXZ")))
      .multiply(new THREE.Matrix4().makeScale(turn.scale, turn.scale, turn.scale))
      .multiply(new THREE.Matrix4().makeTranslation(-pivot.x, -pivot.y, -pivot.z));
    rig.matrixAutoUpdate = false; rig.matrix.copy(matrix); rig.matrixWorldNeedsUpdate = true;

    sun.position.set(-0.35 + (pointer.inside ? pointer.x * 0.3 : 0), 0.8, 0.5);
    const frustum = offAxisFrustum(eye, size, distance);
    camera.projectionMatrix.makePerspective(frustum.left, frustum.right, frustum.top, frustum.bottom, frustum.near, frustum.far);
    camera.projectionMatrixInverse.copy(camera.projectionMatrix).invert();
    camera.matrix.makeTranslation(eye.x, eye.y, distance);
    camera.matrixWorld.copy(camera.matrix);
    camera.matrixWorldInverse.copy(camera.matrixWorld).invert();
    renderer.render(scene, camera);
    if (!drawn) { drawn = true; options.onFirstFrame(); }
    return moving;
  }

  function loop(now: number) {
    frame = 0;
    if (!alive || !visible || document.hidden) return;
    let moving = false;
    try { moving = step(now); } catch { fail(); return; }
    if (moving) frame = requestAnimationFrame(loop);
  }
  function wake() { if (alive && !frame) { last = performance.now(); frame = requestAnimationFrame(loop); } }

  // ── Wiring ──────────────────────────────────────────────────────────
  const onMove = (event: PointerEvent) => {
    const box = host.getBoundingClientRect();
    pointer.x = clamp(((event.clientX - box.left) / box.width) * 2 - 1, -1, 1);
    pointer.y = clamp(((event.clientY - box.top) / box.height) * 2 - 1, -1, 1);
    pointer.inside = true; wake();
  };
  const onLeave = () => { pointer.inside = false; wake(); };
  let resizeTimer = 0;
  const resize = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    // The observer also reports once on observe(); only rebuild when a size really changed.
    resizeTimer = window.setTimeout(() => { if (alive && sizeKey() !== builtKey) { try { build(); } catch { fail(); } } }, 120);
  });
  const sight = new IntersectionObserver(entries => {
    visible = entries[entries.length - 1]?.isIntersecting ?? true;
    if (visible) wake();
  });
  const onVisibility = () => { if (!document.hidden) wake(); };
  const onLost = (event: Event) => { event.preventDefault(); fail(); };
  function fail() { if (!alive) return; dispose(); options.onLost(); }

  function dispose() {
    if (!alive) return;
    alive = false;
    canvas.removeEventListener("webglcontextlost", onLost);
    host.removeEventListener("pointermove", onMove);
    host.removeEventListener("pointerleave", onLeave);
    document.removeEventListener("visibilitychange", onVisibility);
    resize.disconnect(); sight.disconnect();
    window.clearTimeout(resizeTimer);
    if (frame) cancelAnimationFrame(frame);
    rig.clear();
    disposables.splice(0).forEach(item => item.dispose());
    renderer.dispose();
    try { renderer.forceContextLoss(); } catch { /* already gone */ }
    canvas.remove();
  }

  canvas.addEventListener("webglcontextlost", onLost);
  host.appendChild(canvas);
  build();
  const start = restEye(); eye.x = start.x; eye.y = start.y;
  host.addEventListener("pointermove", onMove);
  host.addEventListener("pointerleave", onLeave);
  document.addEventListener("visibilitychange", onVisibility);
  resize.observe(host); resize.observe(parts.screen);
  sight.observe(host);
  document.fonts?.ready.then(() => { if (alive) { repaint.forEach(run => run()); wake(); } }).catch(() => {});
  wake();

  return {
    setCart(state) { if (!alive || state === cart) return; cart = state; pose(false); },
    press(control) { const key = keys.get(control); if (alive && key) { key.pressedAt = performance.now(); wake(); } },
    dispose,
  };
}
