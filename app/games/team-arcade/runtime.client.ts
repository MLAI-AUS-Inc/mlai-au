import Phaser from "phaser";
import { FIGHTERS, type MatchConfig, type FighterId } from "./roster";
import { ArcadeAudio } from "./audio";
import { InputController } from "./core/input";
import {
  CombatMatch,
  moveTiming,
  FLOOR_Y,
  PULSE_RADIUS,
  ringRadius,
  type InputFrame,
  type MatchSnapshot,
  type Fighter,
  hurtbox,
  hitbox,
} from "./core/combat";
import { SPECIAL_MOVES } from "./specials";
import { ARENA_ASSET } from "./arena";

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
    const move = moveTiming(f);
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

    private labels: Phaser.GameObjects.Text[] = [];
    constructor() {
      super("mlai-arena");
    }
    preload() {
      const unique = new Set<FighterId>([
        options.config.player,
        options.config.opponent,
      ]);
      this.load.on("progress", (progress: number) => {
        if (!destroyed && !failed) options.onProgress(progress);
      });
      this.load.on("loaderror", (file: { key: string }) => {
        failed = true;
        if (!destroyed)
          options.onError(
            file.key === ARENA_ASSET.key
              ? ARENA_ASSET.loadError
              : `Could not load ${FIGHTERS[file.key as FighterId]?.shortName ?? "fighter"} artwork. Check your connection and retry.`,
          );
      });
      this.load.image(ARENA_ASSET.key, ARENA_ASSET.url);
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
      // One cached image keeps the office static and inexpensive on phones.
      // The floor and combat coordinates remain the same for every fighter.
      this.textures
        .get(ARENA_ASSET.key)
        .setFilter(Phaser.Textures.FilterMode.NEAREST);
      this.add
        .image(0, 0, ARENA_ASSET.key)
        .setOrigin(0)
        .setDisplaySize(ARENA_ASSET.width, ARENA_ASSET.height)
        .setDepth(-1);
      this.add
        .text(942, 524, "MLAI HQ / MELBOURNE", {
          fontFamily: "monospace",
          fontSize: "11px",
          color: "#e4f1ff",
          stroke: "#11182e",
          strokeThickness: 3,
        })
        .setOrigin(1);
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
      const g = this.effects;
      // Shapes encode the move as well as its fighter colour, so every tell is
      // readable in mirror matches and when motion effects are disabled.
      for (const f of match.fighters) {
        if (f.move !== "special") continue;
        const special = SPECIAL_MOVES[f.id],
          t = f.moveTick - special.startup;
        const color = special.color,
          ground = FLOOR_Y - f.y;
        g.lineStyle(3, color, t < 0 ? 0.55 : 0.95);
        if (t < 0) {
          g.strokeCircle(f.x, ground - 75, 33);
          g.lineBetween(f.x - 18, ground - 75, f.x + 18, ground - 75);
          if (special.kind === "blink") {
            const x = Phaser.Math.Clamp(
              f.specialTargetX - f.facing * 78,
              45,
              915,
            );
            g.strokeRect(x - 23, FLOOR_Y - 145, 46, 145);
          } else if (special.kind === "cascade") {
            for (let n = -1; n <= 1; n++) {
              const x = Phaser.Math.Clamp(f.specialTargetX + n * 68, 45, 915);
              g.lineBetween(x - 19, FLOOR_Y - 3, x + 19, FLOOR_Y - 3);
              g.lineBetween(x, FLOOR_Y - 18, x, FLOOR_Y + 4);
            }
          } else if (special.kind === "trap") {
            const x = Phaser.Math.Clamp(f.x + f.facing * 155, 45, 915);
            g.strokeEllipse(x, FLOOR_Y - 3, 72, 16);
          }
          continue;
        }
        if (t >= special.active) continue;
        switch (special.kind) {
          case "uppercut":
            g.beginPath();
            g.arc(f.x, ground - 85, 75, Math.PI * 0.95, Math.PI * 1.95);
            g.strokePath();
            g.lineBetween(
              f.x + f.facing * 45,
              ground - 85,
              f.x + f.facing * 45,
              ground - 175,
            );
            break;
          case "rush":
            for (let n = 0; n < 3; n++)
              g.lineBetween(
                f.x - f.facing * (30 + n * 12),
                ground - 70 - n * 16,
                f.x - f.facing * (65 + n * 12),
                ground - 70 - n * 16,
              );
            g.strokeCircle(f.x + f.facing * 70, ground - 87, 28);
            break;
          case "pulse":
            g.strokeCircle(f.x, ground - 75, PULSE_RADIUS);
            g.lineBetween(f.x - 14, ground - 75, f.x + 14, ground - 75);
            g.lineBetween(f.x, ground - 89, f.x, ground - 61);
            break;
          case "sky-kick":
            g.lineBetween(
              f.x - f.facing * 70,
              ground - 15,
              f.x + f.facing * 75,
              ground - 94,
            );
            g.lineBetween(
              f.x - f.facing * 70,
              ground - 5,
              f.x + f.facing * 75,
              ground - 84,
            );
            break;
          case "blink":
            g.strokeRect(f.x - 31, ground - 145, 62, 145);
            if (!reduced)
              g.strokeRect(f.specialOriginX - 25, FLOOR_Y - 140, 50, 140);
            break;
          case "counter":
            if (!f.hit) {
              g.strokeRoundedRect(f.x - 43, ground - 156, 86, 155, 20);
              g.lineBetween(f.x, ground - 140, f.x, ground - 30);
            }
            break;
          case "dash":
            for (let n = 0; n < (reduced ? 1 : 4); n++) {
              const x = f.x - f.facing * (35 + n * 28);
              g.lineBetween(x, ground - 90, x - f.facing * 20, ground - 65);
              g.lineBetween(x - f.facing * 20, ground - 65, x, ground - 40);
            }
            break;
        }
      }
      for (const p of match.projectiles) {
        const color = SPECIAL_MOVES[p.fighter].color;
        g.lineStyle(3, color, 1);
        g.fillStyle(color, 0.25);
        if (p.age <= p.delay) {
          g.strokeEllipse(p.x, FLOOR_Y - 5, p.kind === "trap" ? 74 : 42, 14);
          if (p.kind === "cascade") g.lineBetween(p.x, 130, p.x, 175);
          continue;
        }
        switch (p.kind) {
          case "wave":
            g.fillEllipse(p.x, p.y, 60, 66);
            g.strokeEllipse(p.x, p.y, 44, 61);
            g.lineBetween(p.x, p.y - 28, p.x + p.facing * 18, p.y);
            g.lineBetween(p.x + p.facing * 18, p.y, p.x, p.y + 28);
            break;
          case "double-burst":
            g.fillTriangle(p.x, p.y - 20, p.x + 18, p.y, p.x, p.y + 20);
            g.fillTriangle(p.x, p.y - 20, p.x - 18, p.y, p.x, p.y + 20);
            g.strokeCircle(p.x, p.y, 10);
            break;
          case "trap":
            g.fillRect(p.x - 35, FLOOR_Y - 44, 70, 44);
            for (let n = -1; n <= 1; n++) {
              const x = p.x + n * 24;
              g.lineBetween(x - 8, FLOOR_Y - 2, x, FLOOR_Y - 43);
              g.lineBetween(x, FLOOR_Y - 43, x + 8, FLOOR_Y - 2);
            }
            break;
          case "lob":
            g.fillCircle(p.x, p.y, 21);
            g.strokeCircle(p.x, p.y, 22);
            g.lineBetween(p.x - 12, p.y, p.x, p.y - 12);
            g.lineBetween(p.x, p.y - 12, p.x + 12, p.y);
            break;
          case "tether": {
            const owner = match.fighters[p.owner];
            g.lineBetween(
              owner.x + owner.facing * 24,
              FLOOR_Y - owner.y - 85,
              p.x,
              p.y,
            );
            g.strokeCircle(p.x, p.y, 14);
            g.lineBetween(p.x, p.y - 14, p.x + p.facing * 18, p.y);
            g.lineBetween(p.x + p.facing * 18, p.y, p.x, p.y + 14);
            break;
          }
          case "ring": {
            const radius = ringRadius(p.age);
            g.strokeCircle(p.x, p.y, radius);
            g.strokeCircle(p.x, p.y, radius - 8);
            break;
          }
          case "cascade":
            for (let n = 0; n < 3; n++) {
              const y = p.y + n * 14 - 28;
              g.lineBetween(p.x - 13, y - 5, p.x - 20, y);
              g.lineBetween(p.x - 20, y, p.x - 13, y + 5);
              g.lineBetween(p.x + 13, y - 5, p.x + 20, y);
              g.lineBetween(p.x + 20, y, p.x + 13, y + 5);
            }
            g.fillRect(p.x - 5, p.y - 28, 10, 56);
            break;
          case "tracking-orb":
            g.fillCircle(p.x, p.y, 23);
            g.strokeCircle(p.x, p.y, 26);
            g.strokeEllipse(p.x, p.y, 64, 21);
            g.strokeEllipse(p.x, p.y, 21, 64);
            g.fillStyle(0xffffff, 0.9);
            g.fillCircle(p.x, p.y, 6);
            break;
        }
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
