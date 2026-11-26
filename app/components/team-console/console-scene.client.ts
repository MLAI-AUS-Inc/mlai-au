import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import type { CartState } from "./cartridge";
import { clamp, consoleDims, easeInCubic, easeInQuart, easeOutBack, easeOutCubic, heroCentre, heroScale, zoomScale, type ConsoleDims } from "./console-layout";

/** MLAI SLAB-1 in three.js: a smooth plastic handheld floating over the page.
 *
 *  The scene is measured in CSS pixels with the screen centred on the origin, and the
 *  camera is placed so a pixel at z = 0 is a pixel on the page. With the rig at scale 1
 *  and no rotation the console's screen covers the team panel exactly, so "the camera
 *  zooms into the screen" is the rig moving from its resting pose to the identity. At
 *  that point the canvas fades out and the real panel underneath takes over. */

export interface ConsoleScene {
  setCart(state: CartState): void;
  dispose(): void;
}
interface Parts { screen: HTMLElement }
interface Options {
  cart: CartState;
  /** Draw even on a software renderer (off by default: it is too slow to be pleasant). */
  allowSoftware: boolean;
  onFirstFrame(): void;
  onLost(): void;
}

const MARGIN = 96;
const FOV = 28;
const INK = {
  body: 0xece5d6, bodyDark: 0xd9d1bf, glass: 0x0b0b10, key: 0x1c1c22, slot: 0x09090c,
  orange: 0xff3c00, teal: 0x00e6c2, purple: 0x4b0db3, yellow: 0xfefc22, red: 0xff003d, paper: 0xf5f0e6,
};
const SHOUT = '"Anton", "Haettenschweiler", "Arial Narrow", Impact, sans-serif';
const HEAD = '"Oswald", "Arial Narrow", sans-serif';
const HAND = '"Permanent Marker", "Marker Felt", cursive';
/** The resting pose: turned a little, as if held out to you. */
const REST = { x: 0.16, y: -0.4, z: -0.05 };
/** A touch screen has no pointer to lean toward, so the console sways more by itself. */
const TOUCH = typeof window !== "undefined" && window.matchMedia("(hover: none)").matches;

type Ease = (t: number) => number;
interface Channel { value: number; from: number; to: number; start: number; span: number; ease: Ease }
const channel = (value: number): Channel => ({ value, from: value, to: value, start: 0, span: 0, ease: easeOutCubic });

function roundedRect(w: number, h: number, r: number): THREE.Shape {
  const shape = new THREE.Shape();
  const x = -w / 2, y = -h / 2, k = Math.min(r, w / 2, h / 2);
  shape.moveTo(x + k, y);
  shape.lineTo(x + w - k, y); shape.absarc(x + w - k, y + k, k, -Math.PI / 2, 0, false);
  shape.lineTo(x + w, y + h - k); shape.absarc(x + w - k, y + h - k, k, 0, Math.PI / 2, false);
  shape.lineTo(x + k, y + h); shape.absarc(x + k, y + h - k, k, Math.PI / 2, Math.PI, false);
  shape.lineTo(x, y + k); shape.absarc(x + k, y + k, k, Math.PI, Math.PI * 1.5, false);
  return shape;
}

export function createConsoleScene(host: HTMLElement, parts: Parts, options: Options): ConsoleScene {
  const canvas = document.createElement("canvas");
  canvas.className = "team-console-canvas";
  canvas.setAttribute("aria-hidden", "true");

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, premultipliedAlpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.toneMappingExposure = 1.05;
  let software = false;
  try {
    const gl = renderer.getContext();
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const name = String(info ? gl.getParameter(info.UNMASKED_RENDERER_WEBGL) : "");
    software = /swiftshader|llvmpipe|software/i.test(name);
  } catch { /* the renderer name is only a hint */ }
  if (software && !options.allowSoftware) {
    renderer.dispose();
    try { renderer.forceContextLoss(); } catch { /* already gone */ }
    throw new Error("The 3D console needs a graphics card.");
  }
  renderer.setPixelRatio(software ? 1 : Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(FOV, 1, 10, 10000);
  // Soft studio light: a lit room for the reflections, one key light for shape.
  const pmrem = new THREE.PMREMGenerator(renderer);
  const room = new RoomEnvironment();
  const environment = pmrem.fromScene(room, 0.04);
  scene.environment = environment.texture;
  scene.environmentIntensity = 0.8;
  room.traverse(node => { const mesh = node as THREE.Mesh; mesh.geometry?.dispose(); (mesh.material as THREE.Material | undefined)?.dispose?.(); });
  pmrem.dispose();
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(-0.5, 0.9, 1);
  scene.add(key);

  const rig = new THREE.Group();
  scene.add(rig);

  const disposables: { dispose(): void }[] = [];
  const keep = <T extends { dispose(): void }>(item: T): T => { disposables.push(item); return item; };
  const repaint: (() => void)[] = [];

  let alive = true, visible = false, frame = 0, drawn = false;
  let cart: CartState = options.cart;
  let dims: ConsoleDims = consoleDims({ w: 1, h: 1 });
  let rest = 1;
  let centre = { x: 0, y: 0 };
  let cartridge: THREE.Group | null = null;
  let shadow: THREE.Mesh | null = null;
  let screenMaterial: THREE.MeshBasicMaterial | null = null;
  let flashMaterial: THREE.MeshBasicMaterial | null = null;
  let glareMaterial: THREE.MeshBasicMaterial | null = null;
  let lampMaterial: THREE.MeshBasicMaterial | null = null;
  let textures: { on: THREE.Texture; off: THREE.Texture; boot: THREE.Texture } | null = null;
  let showing: "attract" | "boot" = "boot";

  // 0 = resting console, 1 = screen fills the panel.
  const zoom = channel(cart === "seated" || cart === "booting" ? 1 : 0);
  // 0 = seated in the slot, 1 = hovering above it.
  const lift = channel(cart === "out" || cart === "ejecting" ? 1 : 0);
  const flash = channel(0);
  const bump = channel(0);
  const channels = [zoom, lift, flash, bump];
  let pending: { at: number; run(): void }[] = [];
  const pointer = { x: 0, y: 0, yaw: 0, pitch: 0 };

  function go(target: Channel, to: number, span: number, delay = 0, ease: Ease = easeOutCubic) {
    const begin = () => { target.from = target.value; target.to = to; target.start = performance.now(); target.span = span; target.ease = ease; };
    if (delay > 0) pending.push({ at: performance.now() + delay, run: begin }); else begin();
  }
  function snap(target: Channel, to: number) { target.value = target.from = target.to = to; target.span = 0; }

  function paint(width: number, height: number, draw: (context: CanvasRenderingContext2D, w: number, h: number) => void): THREE.CanvasTexture {
    const surface = document.createElement("canvas");
    surface.width = Math.max(2, Math.round(width)); surface.height = Math.max(2, Math.round(height));
    const texture = keep(new THREE.CanvasTexture(surface));
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(8, renderer.capabilities.getMaxAnisotropy());
    const run = () => {
      const context = surface.getContext("2d");
      if (!context) return;
      context.clearRect(0, 0, surface.width, surface.height);
      draw(context, surface.width, surface.height);
      texture.needsUpdate = true;
    };
    run();
    repaint.push(run);
    return texture;
  }
  const hex = (colour: number) => `#${colour.toString(16).padStart(6, "0")}`;

  function decal(texture: THREE.Texture, w: number, h: number, x: number, y: number, z: number, turn = 0): THREE.Mesh {
    const material = keep(new THREE.MeshBasicMaterial({ map: texture, transparent: true, toneMapped: false, depthWrite: false }));
    const mesh = new THREE.Mesh(keep(new THREE.PlaneGeometry(w, h)), material);
    mesh.position.set(x, y, z); mesh.rotation.z = turn;
    return mesh;
  }

  function plastic(colour: number, roughness = 0.55, clearcoat = 0.3): THREE.MeshPhysicalMaterial {
    return keep(new THREE.MeshPhysicalMaterial({ color: colour, roughness, metalness: 0, clearcoat, clearcoatRoughness: 0.45 }));
  }

  /** A round button with a soft top edge, standing on the body and facing the viewer. */
  function button(radius: number, height: number, material: THREE.Material): THREE.Mesh {
    const soft = Math.min(radius * 0.32, height * 0.8);
    const points: THREE.Vector2[] = [new THREE.Vector2(0, 0), new THREE.Vector2(radius, 0), new THREE.Vector2(radius, height - soft)];
    for (let i = 1; i <= 8; i++) {
      const angle = (i / 8) * (Math.PI / 2);
      points.push(new THREE.Vector2(radius - soft + Math.cos(angle) * soft, height - soft + Math.sin(angle) * soft));
    }
    points.push(new THREE.Vector2(0, height));
    const mesh = new THREE.Mesh(keep(new THREE.LatheGeometry(points, 40)), material);
    mesh.rotation.x = Math.PI / 2;
    return mesh;
  }

  let builtKey = "";
  const sizeKey = () => {
    const box = parts.screen.getBoundingClientRect();
    return `${Math.round(box.width)}x${Math.round(box.height)}`;
  };

  function build() {
    builtKey = sizeKey();
    rig.clear();
    if (shadow) scene.remove(shadow);
    disposables.splice(0).forEach(item => item.dispose());
    repaint.length = 0;

    const hostBox = host.getBoundingClientRect();
    const box = parts.screen.getBoundingClientRect();
    const W = Math.max(1, box.width), H = Math.max(1, box.height);
    const width = W + MARGIN * 2, height = H + MARGIN * 2;
    canvas.style.left = `${box.left - hostBox.left - MARGIN}px`;
    canvas.style.top = `${box.top - hostBox.top - MARGIN}px`;
    renderer.setSize(width, height, true);
    camera.aspect = width / height;
    camera.position.set(0, 0, height / (2 * Math.tan(THREE.MathUtils.degToRad(FOV / 2))));
    camera.near = 20; camera.far = camera.position.z * 4;
    camera.updateProjectionMatrix();

    dims = consoleDims({ w: W, h: H });
    rest = heroScale(dims, 0.86);
    centre = heroCentre(dims);
    const { body, bodyCentre, depth, unit } = dims;
    const front = -2;

    // ── Body: one pillow of matte plastic ────────────────────────────────
    const bevel = depth * 0.3;
    const core = Math.max(1, depth - bevel * 2);
    const shell = keep(new THREE.ExtrudeGeometry(roundedRect(body.w - bevel * 2, body.h - bevel * 2, Math.max(1, dims.radius - bevel)), {
      depth: core, bevelEnabled: true, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 12, curveSegments: 28,
    }));
    shell.translate(bodyCentre.x, bodyCentre.y, front - core - bevel);
    const bodyMaterial = plastic(INK.body, 0.6, 0.22);
    rig.add(new THREE.Mesh(shell, bodyMaterial));

    // ── Screen: dark glass, then the picture ─────────────────────────────
    const glass = keep(new THREE.ExtrudeGeometry(roundedRect(W + dims.bezel * 2, H + dims.bezel * 2, dims.bezel * 1.1), { depth: 2, bevelEnabled: false, curveSegments: 12 }));
    glass.translate(0, 0, front - 0.5);
    rig.add(new THREE.Mesh(glass, keep(new THREE.MeshPhysicalMaterial({ color: INK.glass, roughness: 0.18, metalness: 0, clearcoat: 1, clearcoatRoughness: 0.08 }))));

    const panelBlue = (() => {
      const panel = parts.screen.querySelector<HTMLElement>(".fighter-select-container");
      const colour = panel ? getComputedStyle(panel).backgroundColor : "";
      return /^rgb\(/.test(colour) ? colour : "#3537dc";
    })();
    const scale = Math.min(2, 1400 / W);
    const tall = dims.upright;
    const attract = (lit: boolean) => paint(W * scale, H * scale, (context, w, h) => {
      context.fillStyle = "#0c0d13"; context.fillRect(0, 0, w, h);
      context.fillStyle = "rgba(255,255,255,0.035)";
      for (let y = 0; y < h; y += 6) context.fillRect(0, y, w, 2);
      context.textAlign = "center"; context.textBaseline = "middle";
      context.fillStyle = hex(INK.yellow);
      const verb = TOUCH ? "TAP" : "CLICK";
      // A tall screen stacks the words; type is sized to whichever side is short.
      const u = tall ? Math.min(w * 0.9, h * 0.72) : h;
      if (tall) {
        context.font = `400 ${u * 0.36}px ${SHOUT}`;
        context.fillText("INSERT", w / 2, h * 0.36, w * 0.9);
        context.fillText("CART", w / 2, h * 0.36 + u * 0.36);
      } else {
        context.font = `400 ${u * 0.24}px ${SHOUT}`;
        context.fillText("INSERT CART", w / 2, h * 0.44);
      }
      if (lit) {
        context.fillStyle = hex(INK.paper);
        context.font = `600 ${u * (tall ? 0.07 : 0.052)}px ${HEAD}`;
        if (tall) {
          spaced(context, `${verb} TO PLAY`, w / 2, h * 0.36 + u * 0.68, u * 0.016);
          spaced(context, "COMMUNITY CLASH", w / 2, h * 0.36 + u * 0.79, u * 0.016);
        } else spaced(context, `${verb} TO PLAY COMMUNITY CLASH`, w / 2, h * 0.68, u * 0.012);
      }
      const small = tall ? u * 0.062 : u * 0.04, inset = tall ? w * 0.06 : w * 0.04, line = tall ? h * 0.05 : h * 0.08;
      context.textAlign = "left";
      context.fillStyle = hex(INK.teal);
      context.font = `600 ${small}px ${HEAD}`;
      context.fillText("MLAI SLAB-1", inset, line);
      context.textAlign = "right";
      context.fillStyle = hex(INK.red);
      context.fillText("NO CART", w - inset, line);
    });
    textures = {
      on: attract(true),
      off: attract(false),
      boot: paint(W * scale, H * scale, (context, w, h) => {
        context.fillStyle = panelBlue; context.fillRect(0, 0, w, h);
        context.textAlign = "center"; context.textBaseline = "middle";
        context.fillStyle = hex(INK.yellow);
        const u = tall ? Math.min(w * 0.9, h * 0.72) : h;
        context.font = `400 ${u * (tall ? 0.44 : 0.34)}px ${SHOUT}`;
        context.fillText("MLAI", w / 2, h * 0.44);
        context.fillStyle = "#ffffff";
        context.font = `600 ${u * (tall ? 0.075 : 0.06)}px ${HEAD}`;
        spaced(context, "COMMUNITY CLASH", w / 2, tall ? h * 0.44 + u * 0.36 : h * 0.7, u * 0.02);
      }),
    };
    showing = cart === "out" || cart === "inserting" ? "attract" : "boot";
    screenMaterial = keep(new THREE.MeshBasicMaterial({ map: showing === "attract" ? textures.on : textures.boot, toneMapped: false }));
    const picture = new THREE.Mesh(keep(new THREE.PlaneGeometry(W, H)), screenMaterial);
    picture.position.z = 0;
    rig.add(picture);

    glareMaterial = keep(new THREE.MeshBasicMaterial({
      map: paint(256, 256, (context, w, h) => {
        const gradient = context.createLinearGradient(0, 0, w, h);
        gradient.addColorStop(0, "rgba(255,255,255,0.5)"); gradient.addColorStop(0.42, "rgba(255,255,255,0.06)"); gradient.addColorStop(0.43, "rgba(255,255,255,0)");
        context.fillStyle = gradient; context.fillRect(0, 0, w, h);
      }),
      transparent: true, toneMapped: false, depthWrite: false, opacity: 0.25,
    }));
    const glare = new THREE.Mesh(keep(new THREE.PlaneGeometry(W, H)), glareMaterial);
    glare.position.z = 0.4;
    rig.add(glare);
    flashMaterial = keep(new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0, toneMapped: false, depthWrite: false }));
    const flare = new THREE.Mesh(keep(new THREE.PlaneGeometry(W, H)), flashMaterial);
    flare.position.z = 0.8;
    rig.add(flare);

    // ── Left grip: a cross in a shallow dish ─────────────────────────────
    const pad = dims.dpad;
    const dish = new THREE.Mesh(keep(new THREE.CircleGeometry(pad.dish, 48)), plastic(INK.bodyDark, 0.7, 0.1));
    dish.position.set(pad.x, pad.y, front + 0.3);
    rig.add(dish);
    const keyMaterial = plastic(INK.key, 0.42, 0.5);
    const rise = depth * 0.2;
    for (const turned of [false, true]) {
      const arm = new THREE.Mesh(keep(new RoundedBoxGeometry(turned ? pad.width : pad.arm, turned ? pad.arm : pad.width, rise, 5, Math.min(pad.width * 0.28, rise * 0.45))), keyMaterial);
      arm.position.set(pad.x, pad.y, front + rise / 2);
      rig.add(arm);
    }

    // ── Right grip: two round buttons ────────────────────────────────────
    const letter = (text: string) => paint(128, 128, (context, w, h) => {
      context.textAlign = "center"; context.textBaseline = "middle";
      context.fillStyle = "rgba(20,20,20,0.82)";
      context.font = `400 ${h * 0.7}px ${SHOUT}`;
      context.fillText(text, w / 2, h * 0.54);
    });
    for (const [spot, colour, text] of [[dims.a, INK.orange, "A"], [dims.b, INK.teal, "B"]] as const) {
      const cap = button(spot.r, rise * 1.15, plastic(colour, 0.35, 0.7));
      cap.position.set(spot.x, spot.y, front);
      rig.add(cap);
      rig.add(decal(letter(text), spot.r * 1.1, spot.r * 1.1, spot.x, spot.y, front + rise * 1.15 + 0.4));
    }

    // Two small pills under the screen and a speaker in the right grip.
    const pill = keep(new RoundedBoxGeometry(unit * 0.17, unit * 0.05, rise * 0.5, 4, unit * 0.024));
    for (const offset of [-0.12, 0.12]) {
      const mesh = new THREE.Mesh(pill, keyMaterial);
      mesh.position.set(dims.pills.x + offset * unit, dims.pills.y, front + rise * 0.2);
      mesh.rotation.z = 0.42;
      rig.add(mesh);
    }
    const hole = keep(new THREE.CircleGeometry(unit * 0.017, 16));
    const holeMaterial = keep(new THREE.MeshBasicMaterial({ color: 0x2a2822, toneMapped: false }));
    for (let row = 0; row < 3; row++) for (let column = 0; column < 4; column++) {
      const dot = new THREE.Mesh(hole, holeMaterial);
      dot.position.set(dims.speaker.x + column * unit * 0.075, dims.speaker.y + row * unit * 0.075, front + 0.3);
      rig.add(dot);
    }

    // ── Print and stickers: the console is still MLAI's ──────────────────
    const stamp = paint(1280, 96, (context, w, h) => {
      context.textBaseline = "middle"; context.fillStyle = "#26241f";
      context.font = `600 ${h * 0.4}px ${HEAD}`;
      spaced(context, "MLAI SLAB-1 · 15 FIGHTERS · NO BATTERIES", h * 0.2, h * 0.52, h * 0.06, "left");
    });
    rig.add(decal(stamp, dims.stamp.w, dims.stamp.w * (96 / 1280), dims.stamp.x, dims.stamp.y, front + 0.3));
    lampMaterial = keep(new THREE.MeshBasicMaterial({ color: INK.teal, toneMapped: false }));
    const lamp = new THREE.Mesh(keep(new THREE.CircleGeometry(Math.max(4, dims.bezel * 0.28), 20)), lampMaterial);
    lamp.position.set(dims.lamp.x, dims.lamp.y, front + 0.3);
    rig.add(lamp);

    const sticker = paint(256, 256, (context, w, h) => {
      context.fillStyle = hex(INK.orange);
      context.beginPath(); context.arc(w / 2, h / 2, w * 0.47, 0, Math.PI * 2); context.fill();
      context.lineWidth = w * 0.03; context.strokeStyle = "#1a1a1a"; context.stroke();
      context.fillStyle = "#1a1a1a"; context.textAlign = "center"; context.textBaseline = "middle";
      context.font = `400 ${h * 0.2}px ${SHOUT}`;
      context.fillText("NOT FOR", w / 2, h * 0.36); context.fillText("PROFIT", w / 2, h * 0.56);
      context.font = `400 ${h * 0.09}px ${HAND}`;
      context.fillText("for everyone", w / 2, h * 0.74);
    });
    rig.add(decal(sticker, dims.sticker.size, dims.sticker.size, dims.sticker.x, dims.sticker.y, front + 0.35, 0.22));
    const tape = paint(512, 80, (context, w, h) => {
      context.fillStyle = "rgba(233,223,192,0.94)";
      context.beginPath();
      context.moveTo(6, 8); context.lineTo(w - 14, 2); context.lineTo(w - 4, h * 0.5); context.lineTo(w - 12, h - 6); context.lineTo(10, h - 2); context.lineTo(2, h * 0.5);
      context.closePath(); context.fill();
      context.fillStyle = "#1a1a1a"; context.textAlign = "center"; context.textBaseline = "middle";
      context.font = `400 ${h * 0.4}px ${HAND}`;
      context.fillText("PROPERTY OF THE COMMUNITY", w / 2, h * 0.54);
    });
    rig.add(decal(tape, dims.tape.w, dims.tape.w * (80 / 512), dims.tape.x, dims.tape.y, front + 0.35, -0.07));

    // ── Cartridge and its slot ───────────────────────────────────────────
    const slot = new THREE.Mesh(keep(new RoundedBoxGeometry(dims.cart.w * 1.08, depth * 0.2, dims.cart.t * 1.5, 3, dims.cart.t * 0.3)), keep(new THREE.MeshBasicMaterial({ color: INK.slot, toneMapped: false })));
    slot.position.set(dims.cart.x, H / 2 + dims.top - depth * 0.085, front - depth / 2);
    rig.add(slot);

    cartridge = new THREE.Group();
    const cartBody = new THREE.Mesh(keep(new RoundedBoxGeometry(dims.cart.w, dims.cart.h, dims.cart.t, 5, dims.cart.t * 0.3)), plastic(INK.purple, 0.5, 0.4));
    cartridge.add(cartBody);
    const ridge = keep(new RoundedBoxGeometry(dims.cart.w * 0.09, dims.cart.h * 0.1, dims.cart.t * 0.12, 2, dims.cart.t * 0.03));
    const ridgeMaterial = plastic(0x2c0870, 0.6, 0.2);
    for (let i = 0; i < 5; i++) {
      const bar = new THREE.Mesh(ridge, ridgeMaterial);
      bar.position.set((i - 2) * dims.cart.w * 0.15, dims.cart.h * 0.36, dims.cart.t / 2);
      cartridge.add(bar);
    }
    const label = paint(640, 360, (context, w, h) => {
      context.fillStyle = hex(INK.yellow); context.fillRect(0, 0, w, h);
      context.lineWidth = h * 0.05; context.strokeStyle = "#1a1a1a"; context.strokeRect(h * 0.025, h * 0.025, w - h * 0.05, h - h * 0.05);
      context.fillStyle = "#1a1a1a"; context.textAlign = "center"; context.textBaseline = "middle";
      context.font = `400 ${h * 0.34}px ${SHOUT}`;
      context.fillText("COMMUNITY CLASH", w / 2, h * 0.36, w * 0.88);
      context.font = `600 ${h * 0.11}px ${HEAD}`;
      spaced(context, "MLAI ARCADE · CART 01", w / 2, h * 0.64, h * 0.02);
      context.font = `400 ${h * 0.12}px ${HAND}`;
      context.fillText("pick two. fight nice.", w / 2, h * 0.83);
    });
    cartridge.add(decal(label, dims.cart.w * 0.8, dims.cart.w * 0.8 * (360 / 640), 0, -dims.cart.h * 0.1, dims.cart.t / 2 + 0.6));
    cartridge.position.set(dims.cart.x, dims.cart.seatedY, front - depth / 2);
    rig.add(cartridge);

    // ── A soft shadow on the wall behind ─────────────────────────────────
    const shade = paint(256, 160, (context, w, h) => {
      context.shadowColor = "rgba(0,0,0,0.9)"; context.shadowBlur = h * 0.2; context.shadowOffsetY = h * 2;
      context.fillStyle = "#000";
      context.beginPath(); context.roundRect(w * 0.18, h * 0.24 - h * 2, w * 0.64, h * 0.52, h * 0.16); context.fill();
    });
    shadow = new THREE.Mesh(keep(new THREE.PlaneGeometry(body.w * 1.5, body.h * 1.75)), keep(new THREE.MeshBasicMaterial({ map: shade, transparent: true, depthWrite: false, toneMapped: false, opacity: 0.5 })));
    shadow.renderOrder = -1;
    scene.add(shadow);

    settle();
  }

  function spaced(context: CanvasRenderingContext2D, text: string, x: number, y: number, tracking: number, align: "centre" | "left" = "centre") {
    const widths = [...text].map(letter => context.measureText(letter).width + tracking);
    const total = widths.reduce((sum, width) => sum + width, 0) - tracking;
    const before = context.textAlign;
    context.textAlign = "left";
    let cursor = align === "centre" ? x - total / 2 : x;
    [...text].forEach((letter, index) => { context.fillText(letter, cursor, y); cursor += widths[index]; });
    context.textAlign = before;
  }

  function show(which: "attract" | "boot") { showing = which; }

  /** Jump straight to where the current state rests. */
  function settle() {
    pending = [];
    snap(zoom, cart === "seated" || cart === "booting" ? 1 : 0);
    snap(lift, cart === "out" || cart === "ejecting" ? 1 : 0);
    snap(flash, 0); snap(bump, 0);
    show(cart === "out" || cart === "inserting" || cart === "ejecting" ? "attract" : "boot");
    wake();
  }

  function react(previous: CartState) {
    pending = [];
    if (cart === "ejecting") {
      // The camera pulls back out of the screen, then the cartridge pops up.
      show("boot");
      snap(flash, 0.85); go(flash, 0, 260);
      go(zoom, 0, 720, 40, easeOutCubic);
      pending.push({ at: performance.now() + 240, run: () => show("attract") });
      go(lift, 1, 420, 440, easeOutBack);
    } else if (cart === "out") {
      // An eject whose tweens never ran (the loop was paused off screen) still lands at rest.
      if (previous !== "ejecting" || zoom.to !== 0 || lift.to !== 1) settle();
    } else if (cart === "inserting") {
      go(lift, 0, 380, 0, easeInCubic);
      pending.push({ at: performance.now() + 380, run: () => { snap(bump, 1); go(bump, 0, 260); } });
    } else if (cart === "booting") {
      // Screen on, a beat, then the camera dives in.
      show("boot");
      snap(flash, 0.7); go(flash, 0, 220);
      go(zoom, 1, 700, 260, easeInQuart);
      go(flash, 1, 150, 800, easeInCubic);
    } else {
      snap(zoom, 1); snap(lift, 0); snap(bump, 0); snap(flash, 0);
    }
    wake();
  }

  const turn = new THREE.Euler();
  const spin = new THREE.Quaternion();
  const offset = new THREE.Vector3();

  function step(now: number): boolean {
    let moving = false;
    if (pending.length) {
      const due = pending.filter(item => item.at <= now);
      pending = pending.filter(item => item.at > now);
      due.forEach(item => item.run());
      moving = true;
    }
    for (const item of channels) {
      if (!item.span) continue;
      const t = clamp((now - item.start) / item.span, 0, 1);
      item.value = item.from + (item.to - item.from) * item.ease(t);
      if (t < 1) moving = true; else { item.value = item.to; item.span = 0; }
    }

    const t = zoom.value;
    const loose = 1 - t;
    // The resting console drifts a little and leans toward the pointer.
    pointer.yaw += (pointer.x * 0.3 - pointer.yaw) * 0.08;
    pointer.pitch += (pointer.y * 0.2 - pointer.pitch) * 0.08;
    const drift = Math.sin(now / 1400);
    const sway = TOUCH ? 0.16 : 0.03;
    // The upright console is narrow: turned as far as the wide one it would hide its face.
    const lean = dims.upright ? 0.7 : 1;
    turn.set(
      (REST.x + pointer.pitch + drift * 0.02) * loose,
      (REST.y * lean + pointer.yaw + Math.sin(now / 2100) * sway) * loose,
      REST.z * loose,
      "YXZ",
    );
    spin.setFromEuler(turn);
    const scale = zoomScale(rest, t);
    offset.set(centre.x, centre.y, 0).multiplyScalar(scale).applyQuaternion(spin);
    rig.quaternion.copy(spin);
    rig.scale.setScalar(scale);
    rig.position.set((-offset.x - (dims.upright ? 0 : dims.screen.w * 0.035)) * loose, (-offset.y + drift * 6 - bump.value * 7) * loose, 0);

    if (cartridge) {
      const hover = lift.value;
      cartridge.position.y = dims.cart.seatedY + (dims.cart.outY - dims.cart.seatedY) * hover + Math.sin(now / 520) * 5 * hover;
      cartridge.rotation.z = 0.07 * hover;
      cartridge.rotation.y = Math.sin(now / 900) * 0.12 * hover;
    }
    if (shadow) {
      shadow.position.set(dims.body.w * scale * 0.03, (dims.bodyCentre.y - centre.y) * scale - dims.body.h * scale * 0.1, -dims.body.w * scale * 0.5 - 60);
      shadow.scale.setScalar(scale);
      (shadow.material as THREE.MeshBasicMaterial).opacity = 0.5 * loose * loose;
    }
    if (screenMaterial && textures) {
      const blink = Math.floor(now / 560) % 2 === 0;
      const map = showing === "boot" ? textures.boot : blink ? textures.on : textures.off;
      if (screenMaterial.map !== map) { screenMaterial.map = map; screenMaterial.needsUpdate = true; }
    }
    // As the screen grows to fill the panel, crop the canvas to it so the body never shows a hard cut.
    const crop = MARGIN * Math.pow(clamp((t - 0.55) / 0.45, 0, 1), 2);
    canvas.style.clipPath = crop > 0.5 ? `inset(${crop.toFixed(1)}px)` : "";
    if (flashMaterial) flashMaterial.opacity = flash.value;
    if (glareMaterial) glareMaterial.opacity = 0.25 * loose;
    if (lampMaterial) lampMaterial.color.setHex(showing === "attract" ? INK.red : INK.teal);

    renderer.render(scene, camera);
    if (!drawn) { drawn = true; options.onFirstFrame(); }
    // Anything but a seated cartridge keeps the console alive: it floats and blinks.
    return moving || cart !== "seated";
  }

  function loop(now: number) {
    frame = 0;
    if (!alive || !visible || document.hidden) return;
    let moving = false;
    try { moving = step(now); } catch { fail(); return; }
    if (moving) frame = requestAnimationFrame(loop);
  }
  function wake() { if (alive && !frame) frame = requestAnimationFrame(loop); }

  // ── Wiring ──────────────────────────────────────────────────────────
  const onMove = (event: PointerEvent) => {
    // A finger is not a pointer to lean toward: it would leave the console skewed after every scroll.
    if (event.pointerType === "touch") return;
    const box = parts.screen.getBoundingClientRect();
    pointer.x = clamp((event.clientX - (box.left + box.width / 2)) / (window.innerWidth / 2), -1, 1);
    pointer.y = clamp((event.clientY - (box.top + box.height / 2)) / (window.innerHeight / 2), -1, 1);
  };
  let resizeTimer = 0;
  const resize = new ResizeObserver(() => {
    window.clearTimeout(resizeTimer);
    // The observer also reports once on observe(); only rebuild when the size really changed.
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
    window.removeEventListener("pointermove", onMove);
    document.removeEventListener("visibilitychange", onVisibility);
    resize.disconnect(); sight.disconnect();
    window.clearTimeout(resizeTimer);
    if (frame) cancelAnimationFrame(frame);
    rig.clear();
    disposables.splice(0).forEach(item => item.dispose());
    environment.dispose();
    renderer.dispose();
    try { renderer.forceContextLoss(); } catch { /* already gone */ }
    canvas.remove();
  }

  canvas.addEventListener("webglcontextlost", onLost);
  host.appendChild(canvas);
  try { build(); } catch (error) { dispose(); throw error; }
  window.addEventListener("pointermove", onMove, { passive: true });
  document.addEventListener("visibilitychange", onVisibility);
  resize.observe(parts.screen);
  sight.observe(host);
  document.fonts?.ready.then(() => { if (alive) { repaint.forEach(run => run()); wake(); } }).catch(() => {});
  wake();

  return {
    setCart(state) {
      if (!alive || state === cart) return;
      const previous = cart;
      cart = state;
      react(previous);
    },
    dispose,
  };
}
