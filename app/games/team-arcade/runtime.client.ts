import Phaser from "phaser";
import { FIGHTERS, type MatchConfig, type FighterId } from "./roster";
import { ArcadeAudio } from "./audio";
import { InputController } from "./core/input";
import {
  CombatMatch,
  MOVES,
  FLOOR_Y,
  type InputFrame,
  type MatchSnapshot,
  type Fighter,
  hurtbox,
  hitbox,
} from "./core/combat";

export interface ArcadeRuntime {
  start(): Promise<void>;
  pause(): void;
  resume(): Promise<void>;
  destroy(): void;
  input(action: keyof InputFrame, held: boolean): void;
  clearInput(): void;
  volume(value: number): void;
  reducedMotion(value: boolean): void;
}
export interface RuntimeOptions {
  parent: HTMLDivElement;
  config: MatchConfig;
  signal: AbortSignal;
  onProgress: (fraction: number) => void;
  onReady: () => void;
  onSnapshot: (snapshot: MatchSnapshot) => void;
  onError: (message: string) => void;
  onInterrupted: () => void;
}
interface Spark {
  x: number;
  y: number;
  life: number;
  block: boolean;
}
const KEYFRAMES = {
  idle: [0, 1],
  walk: [2, 3],
  light: [4, 5],
  heavy: [6, 7],
  low: [8, 9],
  air: [6, 7],
  guard: [10],
  crouch: [8],
  jump: [11],
  hurt: [12],
  defeated: [12, 13],
  special: [4, 14],
  victory: [0, 15],
};

export function spriteFrame(f: Fighter, clock: number) {
  if (f.move) {
    const frames = KEYFRAMES[f.move];
    const move = MOVES[f.move];
    return frames[
      f.moveTick >= move.startup && f.moveTick < move.startup + move.active
        ? 1
        : 0
    ];
  }
  if (f.state === "guard") return f.lowGuard ? 8 : 10;
  if (f.state === "defeated") return f.stateTick < 12 ? 12 : 13;
  if (f.state === "victory") return 15;
  const frames = KEYFRAMES[f.state as keyof typeof KEYFRAMES] ?? KEYFRAMES.idle;
  return frames[Math.floor(clock / 10) % frames.length];
}

/** This module is imported only after match confirmation in the lazy arcade shell. */
export function createArcade(options: RuntimeOptions): ArcadeRuntime {
  const match = new CombatMatch(options.config),
    audio = new ArcadeAudio();
  const controls = new InputController();
  let game: Phaser.Game | null = null,
    ready = false,
    started = false,
    destroyed = false,
    failed = false,
    reduced = false,
    lastSnapshot = -100;
  let sceneInstance: ArenaScene | null = null;
  class ArenaScene extends Phaser.Scene {
    private fighters: Phaser.GameObjects.Sprite[] = [];
    private effects!: Phaser.GameObjects.Graphics;
    private sparks: Spark[] = [];
    private projectileSprites = new Map<number, Phaser.GameObjects.Container>();
    private labels: Phaser.GameObjects.Text[] = [];
    constructor() {
      super("mlai-arena");
    }
    preload() {
      const unique = new Set<FighterId>([
        options.config.player,
        options.config.opponent,
      ]);
      this.load.on("progress", (progress: number) =>
        options.onProgress(progress),
      );
      this.load.on("loaderror", (file: { key: string }) => {
        failed = true;
        if (!destroyed)
          options.onError(
            `Could not load ${FIGHTERS[file.key as FighterId]?.shortName ?? "fighter"} artwork. Check your connection and retry.`,
          );
      });
      for (const id of unique)
        this.load.spritesheet(id, FIGHTERS[id].sheet, {
          frameWidth: 256,
          frameHeight: 256,
        });
    }
    create() {
      if (destroyed || failed) return;
      this.drawStage();
      this.effects = this.add.graphics().setDepth(30);
      this.fighters = match.fighters.map((f, i) =>
        this.add
          .sprite(f.x, FLOOR_Y, f.id, 0)
          .setOrigin(0.5, 0.9)
          .setScale(0.9)
          .setDepth(10 + i),
      );
      this.labels = match.fighters.map((f, i) =>
        this.add
          .text(f.x, FLOOR_Y + 22, i === 0 ? "P1" : "CPU", {
            fontFamily: "monospace",
            fontSize: "14px",
            color: i === 0 ? "#00e5ff" : "#ff7caa",
            fontStyle: "bold",
          })
          .setOrigin(0.5),
      );
      sceneInstance = this;
      ready = true;
      options.onProgress(1);
      options.onSnapshot(match.snapshot());
      options.onReady();
      this.game.events.on(Phaser.Core.Events.BLUR, interrupt);
      this.game.events.on(Phaser.Core.Events.HIDDEN, interrupt);
      this.events.once("shutdown", () => {
        this.game.events.off(Phaser.Core.Events.BLUR, interrupt);
        this.game.events.off(Phaser.Core.Events.HIDDEN, interrupt);
      });
    }
    private drawStage() {
      const g = this.add.graphics();
      for (let y = 0; y < 450; y += 6) {
        const t = y / 450;
        g.fillStyle(
          Phaser.Display.Color.GetColor(12 + 15 * t, 17 + 13 * t, 47 + 57 * t),
        );
        g.fillRect(0, y, 960, 6);
      }
      g.fillStyle(0xffe7ad, 0.8);
      g.fillCircle(772, 95, 30);
      g.fillStyle(0x152047);
      g.fillCircle(759, 86, 28);
      for (let i = 0; i < 38; i++) {
        g.fillStyle(i % 3 === 0 ? 0x55d9ff : 0xced7ff, 0.5);
        g.fillRect((i * 137 + 37) % 960, 25 + ((i * 53) % 170), 2, 2);
      }
      for (let layer = 0; layer < 2; layer++)
        for (let i = 0; i < 18; i++) {
          const x = i * 65 - layer * 27,
            h = 65 + ((i * 61 + layer * 39) % 170),
            base = layer === 0 ? 365 : 405;
          g.fillStyle(layer === 0 ? 0x172950 : 0x111c3d);
          g.fillRect(x, base - h, 57, h);
          for (let wy = base - h + 12; wy < base - 10; wy += 16)
            for (let wx = x + 8; wx < x + 48; wx += 12) {
              if ((wx + wy + i) % 5 !== 0) {
                g.fillStyle((wx + wy) % 3 ? 0x42668b : 0xffcb86, 0.65);
                g.fillRect(wx, wy, 4, 6);
              }
            }
        }
      // Melbourne spire and an MLAI rooftop, drawn on the same fixed arena coordinates.
      g.fillStyle(0x334673);
      g.fillRect(478, 146, 24, 215);
      g.fillTriangle(478, 146, 490, 88, 502, 146);
      g.fillStyle(0x00cde3);
      g.fillRect(486, 151, 3, 165);
      g.fillStyle(0x090e27);
      g.fillRect(0, 383, 960, 26);
      g.fillStyle(0x365683);
      g.fillRect(0, 405, 960, 7);
      for (let x = 0; x < 960; x += 42) {
        g.fillStyle(0x35466b);
        g.fillRect(x, 384, 5, 52);
      }
      g.fillStyle(0x203056);
      g.fillRect(0, 436, 960, 104);
      g.fillStyle(0x61d7f1);
      g.fillRect(0, 436, 960, 3);
      g.lineStyle(1, 0x395578, 0.65);
      for (let x = -500; x < 1500; x += 96)
        g.lineBetween(480 + (x - 480) * 0.7, 440, x, 540);
      for (let y = 456; y < 540; y += 22) g.lineBetween(0, y, 960, y);
      g.fillStyle(0x122044);
      g.fillRoundedRect(48, 270, 220, 65, 5);
      g.lineStyle(2, 0x00e5ff);
      g.strokeRoundedRect(48, 270, 220, 65, 5);
      this.add
        .text(158, 290, "MLAI ARCADE", {
          fontFamily: "monospace",
          fontSize: "24px",
          fontStyle: "bold",
          color: "#00e5ff",
        })
        .setOrigin(0.5);
      this.add
        .text(158, 316, "MELBOURNE • ROOFTOP", {
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#c9d5ff",
        })
        .setOrigin(0.5);
      this.add
        .text(930, 510, "ROUND ZERO / AUSTRALIA", {
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#7c98bc",
        })
        .setOrigin(1, 0.5);
      // Cache the static skyline once rather than tessellating hundreds of
      // windows and roof tiles on every combat frame, especially on phones.
      g.generateTexture("mlai-rooftop", 960, 540);
      g.destroy();
      this.add.image(0, 0, "mlai-rooftop").setOrigin(0).setDepth(-1);
    }
    update(_time: number, delta: number) {
      if (destroyed || !ready) return;
      // Phaser smooths/clamps delta during startup and slow frames. Combat uses
      // elapsed wall time so a 30 Hz renderer still advances 60 simulation ticks.
      if (started) {
        const previousTick = match.tick;
        match.advance(this.game.loop.rawDelta, controls.sample());
        if (match.tick !== previousTick) controls.consumed();
      }
      this.effects.clear();
      match.fighters.forEach((f, i) => {
        const sprite = this.fighters[i];
        sprite
          .setPosition(f.x, FLOOR_Y - f.y)
          .setFlipX(f.facing === -1)
          .setFrame(spriteFrame(f, match.tick));
        // The mirror remains readable even when the same fighter is selected twice.
        sprite.setAlpha(f.state === "hurt" && f.stun % 4 < 2 ? 0.6 : 1);
        const color = i === 0 ? 0x00e5ff : 0xff5a94;
        this.effects.fillStyle(color, 0.22);
        this.effects.fillEllipse(f.x, FLOOR_Y + 5, 90, 12);
        this.labels[i].setX(f.x);
      });
      for (const p of match.projectiles) {
        let projectile = this.projectileSprites.get(p.id);
        if (!projectile) {
          const color = p.owner === 0 ? 0x00e5ff : 0xff5a94;
          const outer = this.add.circle(0, 0, 25, color, 0.25),
            inner = this.add.circle(0, 0, 14, color),
            core = this.add.circle(-4, -2, 7, 0xffffff);
          projectile = this.add
            .container(p.x, p.y, [outer, inner, core])
            .setDepth(20);
          this.projectileSprites.set(p.id, projectile);
        }
        projectile.setPosition(p.x, p.y).setScale(1 + Math.sin(p.age) * 0.08);
      }
      for (const [id, sprite] of this.projectileSprites)
        if (!match.projectiles.some((p) => p.id === id)) {
          sprite.destroy();
          this.projectileSprites.delete(id);
        }
      for (const event of match.events.splice(0)) {
        audio.cue(event);
        if (event.x !== undefined && event.y !== undefined)
          this.sparks.push({
            x: event.x,
            y: event.y,
            life: 12,
            block: event.type === "block",
          });
        if (event.type === "hit" && !reduced)
          this.cameras.main.shake(65, 0.003);
      }
      if (!match.paused)
        for (const spark of this.sparks) spark.life -= delta / 16.667;
      this.sparks = this.sparks.filter((s) => s.life > 0);
      for (const spark of this.sparks) {
        const length = (13 - spark.life) * 2 + 8;
        this.effects.lineStyle(
          3,
          spark.block ? 0x00e5ff : 0xffe446,
          spark.life / 12,
        );
        for (let ray = 0; ray < 8; ray++) {
          const angle = (ray * Math.PI) / 4;
          this.effects.lineBetween(
            spark.x + Math.cos(angle) * 6,
            spark.y + Math.sin(angle) * 6,
            spark.x + Math.cos(angle) * length,
            spark.y + Math.sin(angle) * length,
          );
        }
      }
      if (match.tick - lastSnapshot >= 4 || match.phase !== lastPhase) {
        options.onSnapshot(match.snapshot());
        lastSnapshot = match.tick;
        lastPhase = match.phase;
      }
    }
  }
  let lastPhase = match.phase;
  function interrupt() {
    if (started && !match.paused && !destroyed && match.phase !== "match-end") {
      match.setPaused(true);
      clearInput();
      audio.suspend();
      game?.loop.sleep();
      options.onInterrupted();
    }
  }
  function clearInput() {
    controls.clear();
  }
  const runtime: ArcadeRuntime = {
    async start() {
      if (destroyed || !ready) return;
      try {
        await audio.unlock();
      } catch {
        /* Gameplay remains available when audio is blocked. */
      }
      if (destroyed) return;
      started = true;
      match.setPaused(false);
      game?.loop.wake();
    },
    pause() {
      match.setPaused(true);
      clearInput();
      audio.suspend();
      game?.loop.sleep();
    },
    async resume() {
      if (destroyed) return;
      try {
        await audio.unlock();
      } catch {}
      if (destroyed) return;
      match.setPaused(false);
      game?.loop.wake();
    },
    input(action, value) {
      controls.set(action, value);
    },
    clearInput,
    volume(value) {
      audio.setVolume(value);
    },
    reducedMotion(value) {
      reduced = value;
    },
    destroy() {
      if (destroyed) return;
      destroyed = true;
      clearInput();
      audio.destroy();
      // Phaser finalises destroy on its next frame, including when paused.
      game?.loop.wake();
      game?.destroy(true);
      game = null;
      sceneInstance = null;
      options.signal.removeEventListener("abort", runtime.destroy);
    },
  };
  if (options.signal.aborted) {
    runtime.destroy();
    return runtime;
  }
  options.signal.addEventListener("abort", runtime.destroy, { once: true });
  try {
    game = new Phaser.Game({
      type: Phaser.WEBGL,
      parent: options.parent,
      width: 960,
      height: 540,
      backgroundColor: "#11182e",
      pixelArt: true,
      antialias: false,
      roundPixels: true,
      scale: { mode: Phaser.Scale.FIT, autoCenter: Phaser.Scale.CENTER_BOTH },
      scene: ArenaScene,
      audio: { noAudio: true },
      loader: { timeout: 15000, maxRetries: 1 },
      input: { keyboard: false },
      fps: { target: 60, forceSetTimeOut: false },
      callbacks: {
        postBoot(game) {
          game.canvas.setAttribute("aria-label", "MLAI arcade fighting arena");
          game.canvas.setAttribute("role", "img");
          game.canvas.addEventListener("webglcontextlost", interrupt);
        },
      },
    });
  } catch (error) {
    options.onError(
      error instanceof Error
        ? error.message
        : "The game could not start. Try a browser with WebGL enabled.",
    );
  }
  // Keep imports for debug box authoring reachable only in development.
  if (import.meta.env.DEV) void [hurtbox, hitbox, sceneInstance];
  return runtime;
}
