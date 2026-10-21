import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import {
  FIGHTERS,
  type FighterId,
  type MatchConfig,
} from "~/games/team-arcade/roster";
import { SPECIAL_MOVES } from "~/games/team-arcade/specials";
import type {
  InputFrame,
  MatchSnapshot,
} from "~/games/team-arcade/core/combat";
import type { ArcadeRuntime } from "~/games/team-arcade/runtime.client";
import {
  claimArcade,
  editableTarget,
  getArcadeOwner,
  releaseArcade,
} from "~/lib/arcade-focus";
import FighterSelect from "./FighterSelect";
import { mobileLayout } from "./mobile-layout";
import "./arcade.css";

export interface ArcadeShellProps {
  initialPlayer?: FighterId;
  onClose: () => void;
}
type Mode =
  | "select"
  | "waiting"
  | "loading"
  | "ready"
  | "playing"
  | "paused"
  | "result"
  | "error";
const OWNER = "team-arcade";
const keyActions: Record<string, keyof InputFrame> = {
  ArrowLeft: "left",
  KeyA: "left",
  ArrowRight: "right",
  KeyD: "right",
  ArrowUp: "jump",
  KeyW: "jump",
  Space: "jump",
  ArrowDown: "crouch",
  KeyS: "crouch",
  KeyJ: "light",
  KeyK: "heavy",
  KeyL: "special",
  ShiftLeft: "guard",
  ShiftRight: "guard",
};
const CONTROLS =
  "A/D or ←/→ move · W/↑/Space jump · S/↓ crouch · J punch · K kick · L special · Shift guard · Esc pause";

export default function ArcadeShell({
  initialPlayer = "sam",
  onClose,
}: ArcadeShellProps) {
  const dialog = useRef<HTMLDialogElement>(null),
    viewport = useRef<HTMLDivElement>(null),
    fightControls = useRef<HTMLDivElement>(null),
    runtime = useRef<ArcadeRuntime | null>(null);
  const [player, setPlayer] = useState<FighterId>(initialPlayer),
    [opponent, setOpponent] = useState<FighterId>(
      initialPlayer === "sam" ? "sonia" : "sam",
    );
  const [mode, setMode] = useState<Mode>("select"),
    [config, setConfig] = useState<MatchConfig | null>(null),
    [attempt, setAttempt] = useState(0);
  const [snapshot, setSnapshot] = useState<MatchSnapshot | null>(null),
    [progress, setProgress] = useState(0),
    [error, setError] = useState("");
  const [volume, setVolume] = useState(0.3),
    [reduced, setReduced] = useState(false);
  const [controls, setControls] = useState(false);
  const [layout, setLayout] = useState(() => mobileLayout(false, 0, 0));
  const layoutRef = useRef(layout);
  const [pendingMatch, setPendingMatch] = useState<MatchConfig | null>(null);
  const [heldActions, setHeldActions] = useState<string[]>([]);
  const resuming = useRef(false);
  const [arenaVisible, setArenaVisible] = useState(false);
  const arenaInView = useRef(false);
  const settings = useRef({ volume, reduced });
  settings.current = { volume, reduced };
  const modeRef = useRef<Mode>(mode);
  modeRef.current = mode;
  const keys = useRef(new Set<string>()),
    pointers = useRef(new Map<number, keyof InputFrame>());
  function ownsFightFocus(target: EventTarget | null) {
    return target instanceof Node &&
      (viewport.current?.contains(target) || fightControls.current?.contains(target));
  }
  function clearInput() {
    keys.current.clear();
    pointers.current.clear();
    runtime.current?.clearInput();
    setHeldActions([]);
  }
  function pause() {
    if (modeRef.current !== "playing") return;
    runtime.current?.pause();
    clearInput();
    modeRef.current = "paused";
    setMode("paused");
  }
  async function resume() {
    if (resuming.current || modeRef.current !== "paused" || layoutRef.current.blocked || document.hidden) return;
    resuming.current = true;
    try {
      const active = runtime.current;
      await active?.resume();
      if (!active || runtime.current !== active) return;
      if (layoutRef.current.blocked || document.hidden || !document.hasFocus() || modeRef.current !== "paused") {
        active.pause();
        return;
      }
      setControls(false);
      modeRef.current = "playing";
      setMode("playing");
      viewport.current?.focus({ preventScroll: true });
    } finally {
      resuming.current = false;
    }
  }

  useEffect(() => {
    const coarse = window.matchMedia("(any-pointer: coarse)");
    const resize = () => {
      const next = mobileLayout(coarse.matches,
        window.visualViewport?.width ?? window.innerWidth,
        window.visualViewport?.height ?? window.innerHeight);
      layoutRef.current = next;
      setLayout(next);
      if (next.blocked) {
        pause();
        clearInput();
      }
    };
    resize();
    coarse.addEventListener("change", resize);
    window.addEventListener("resize", resize);
    window.visualViewport?.addEventListener("resize", resize);
    return () => {
      coarse.removeEventListener("change", resize);
      window.removeEventListener("resize", resize);
      window.visualViewport?.removeEventListener("resize", resize);
    };
  }, []);

  useEffect(() => {
    if (!pendingMatch || layout.blocked) return;
    setConfig(pendingMatch);
    setPendingMatch(null);
    setMode("loading");
  }, [pendingMatch, layout.blocked]);

  useEffect(() => {
    const previouslyFocused =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
    if (!dialog.current?.open) dialog.current?.showModal();
    const previousOverflow = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    claimArcade(OWNER);
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(media.matches);
    const changed = () => setReduced(media.matches);
    media.addEventListener("change", changed);
    return () => {
      releaseArcade(OWNER);
      document.documentElement.style.overflow = previousOverflow;
      media.removeEventListener("change", changed);
      previouslyFocused?.focus({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    if (!config || !viewport.current) return;
    const abort = new AbortController();
    const parent = viewport.current;
    let owned: ArcadeRuntime | null = null;
    setMode("loading");
    setProgress(0);
    setError("");
    setSnapshot(null);
    import("~/games/team-arcade/runtime.client")
      .then(({ createArcade }) => {
        if (abort.signal.aborted) return;
        owned = createArcade({
          parent,
          config,
          signal: abort.signal,
          onProgress: (value) => {
            if (!abort.signal.aborted) setProgress(value);
          },
          onReady: () => {
            if (!abort.signal.aborted) setMode("ready");
          },
          onSnapshot: (value) => {
            if (abort.signal.aborted) return;
            setSnapshot(value);
            if (value.phase === "match-end") setMode("result");
          },
          onError: (message) => {
            if (abort.signal.aborted) return;
            setError(message);
            setMode("error");
            owned?.pause();
          },
          onInterrupted: () => {
            if (!abort.signal.aborted) {
              clearInput();
              setMode("paused");
            }
          },
        });
        runtime.current = owned;
        owned.volume(settings.current.volume);
        owned.reducedMotion(settings.current.reduced);
      })
      .catch(() => {
        if (!abort.signal.aborted) {
          setError(
            "The arcade could not download. Check your connection and retry.",
          );
          setMode("error");
        }
      });
    return () => {
      abort.abort();
      owned?.destroy();
      if (runtime.current === owned) runtime.current = null;
      parent.replaceChildren();
      clearInput();
    };
    // A new attempt owns a new runtime. Settings below update it without restarting a match.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config, attempt]);

  useEffect(() => {
    if (mode !== "ready" || controls) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const cancel = () => clearTimeout(timer);
    const begin = async () => {
      const active = runtime.current;
      if (!active || modeRef.current !== "ready" || document.hidden || !arenaInView.current || layoutRef.current.blocked) return;
      await active.start();
      if (runtime.current !== active || modeRef.current !== "ready") return;
      if (layoutRef.current.blocked || document.hidden || !document.hasFocus() || !arenaInView.current) {
        active.pause();
        setMode("paused");
        return;
      }
      setMode("playing");
      viewport.current?.focus({ preventScroll: true });
    };
    const schedule = () => {
      cancel();
      if (!document.hidden && document.hasFocus() && arenaInView.current && !layoutRef.current.blocked)
        timer = setTimeout(() => void begin(), reduced ? 900 : 1400);
    };
    schedule();
    window.addEventListener("blur", cancel);
    window.addEventListener("focus", schedule);
    document.addEventListener("visibilitychange", schedule);
    return () => {
      cancel();
      window.removeEventListener("blur", cancel);
      window.removeEventListener("focus", schedule);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [mode, reduced, arenaVisible, layout.blocked, controls]);
  useEffect(() => {
    runtime.current?.volume(volume);
  }, [volume]);
  useEffect(() => {
    runtime.current?.reducedMotion(reduced);
  }, [reduced]);

  useEffect(() => {
    arenaInView.current = false;
    setArenaVisible(false);
    const applyKeyboard = () => {
      const actions = new Set([...keys.current].map((key) => keyActions[key]));
      for (const action of Object.values(keyActions))
        runtime.current?.input(
          action,
          actions.has(action) ||
            [...pointers.current.values()].includes(action),
        );
    };
    const keydown = (event: KeyboardEvent) => {
      if (getArcadeOwner() !== OWNER || editableTarget(event.target)) return;
      if (event.code === "Escape") {
        if (modeRef.current === "playing") {
          event.preventDefault();
          event.stopPropagation();
          pause();
        }
        return;
      }
      if (
        modeRef.current !== "playing" || layoutRef.current.blocked ||
        !ownsFightFocus(document.activeElement) ||
        !keyActions[event.code]
      )
        return;
      event.preventDefault();
      event.stopPropagation();
      keys.current.add(event.code);
      applyKeyboard();
    };
    const keyup = (event: KeyboardEvent) => {
      if (keys.current.delete(event.code)) {
        event.preventDefault();
        applyKeyboard();
      }
    };
    const blur = () => pause();
    const hidden = () => {
      if (document.hidden) pause();
    };
    window.addEventListener("keydown", keydown, true);
    window.addEventListener("keyup", keyup, true);
    window.addEventListener("blur", blur);
    document.addEventListener("visibilitychange", hidden);
    const observer = new IntersectionObserver(
      (entries) => {
        // A busy main thread can batch several crossings of the stage into one
        // callback, oldest first. Only the newest says whether it is on screen;
        // reading a stale "hidden" entry would strand the versus countdown.
        const entry = entries[entries.length - 1];
        if (!entry) return;
        const visible = entry.isIntersecting && entry.intersectionRatio >= 0.1;
        arenaInView.current = visible;
        setArenaVisible(visible);
        if (!visible) pause();
      },
      { threshold: 0.1 },
    );
    if (viewport.current) observer.observe(viewport.current);
    return () => {
      window.removeEventListener("keydown", keydown, true);
      window.removeEventListener("keyup", keyup, true);
      window.removeEventListener("blur", blur);
      document.removeEventListener("visibilitychange", hidden);
      observer.disconnect();
      clearInput();
    };
  }, [config]);

  function applyTouch() {
    const actions = [...pointers.current.values()];
    setHeldActions(actions);
    for (const action of new Set(Object.values(keyActions))) {
      runtime.current?.input(action, actions.includes(action) ||
        [...keys.current].some((key) => keyActions[key] === action));
    }
  }
  function touch(
    event: PointerEvent<HTMLButtonElement>,
    action: keyof InputFrame,
    held: boolean,
  ) {
    event.preventDefault();
    if (held) {
      if (modeRef.current !== "playing" || layoutRef.current.blocked) return;
      viewport.current?.focus({ preventScroll: true });
      event.currentTarget.setPointerCapture(event.pointerId);
      pointers.current.set(event.pointerId, action);
    } else {
      pointers.current.delete(event.pointerId);
    }
    applyTouch();
  }
  const touchButton = (
    action: keyof InputFrame,
    label: string,
    symbol: string,
    extra = "",
  ) => (
    <button
      key={action}
      className={`arcade-touch ${extra}`}
      aria-label={label}
      data-action={action}
      data-held={heldActions.includes(action)}
      disabled={mode !== "playing" || !!layout.blocked || controls}
      onContextMenu={(event) => event.preventDefault()}
      onPointerDown={(event) => touch(event, action, true)}
      onPointerMove={(event) => {
        if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
        const target = document.elementFromPoint(event.clientX, event.clientY)
          ?.closest<HTMLButtonElement>(".arcade-touch");
        const next = target?.disabled ? undefined : target?.dataset.action as keyof InputFrame | undefined;
        if (pointers.current.get(event.pointerId) === next) return;
        pointers.current.delete(event.pointerId);
        if (next && modeRef.current === "playing" && !layoutRef.current.blocked)
          pointers.current.set(event.pointerId, next);
        applyTouch();
      }}
      onPointerUp={(event) => touch(event, action, false)}
      onPointerCancel={(event) => touch(event, action, false)}
      onLostPointerCapture={(event) => touch(event, action, false)}
    >
      {symbol}
      <span>{label}</span>
    </button>
  );
  function selectAgain() {
    setPendingMatch(null);
    setConfig(null);
    setSnapshot(null);
    setMode("select");
    setControls(false);
  }
  const resultWinner = snapshot?.winner;

  return (
    <dialog
      ref={dialog}
      className="team-arcade-dialog"
      data-mode={mode}
      data-reduced-motion={reduced}
      data-touch={layout.touch}
      data-phone={layout.phone}
      data-layout-blocked={layout.blocked ?? "none"}
      style={layout.touch ? {
        "--arcade-view-width": `${layout.width}px`,
        "--arcade-view-height": `${layout.height}px`,
      } as CSSProperties : undefined}
      aria-labelledby="arcade-title"
      onCancel={(event) => {
        event.preventDefault();
        if (mode === "playing") pause();
        else if (mode === "paused") void resume();
        else onClose();
      }}
    >
      <div
        className="arcade-cabinet"
        data-mode={mode}
        data-phase={snapshot?.phase}
        data-tick={snapshot?.tick}
        data-player-x={snapshot?.fighters[0].x}
        data-cpu-x={snapshot?.fighters[1].x}
        data-player-y={snapshot?.fighters[0].y}
        data-cpu-y={snapshot?.fighters[1].y}
        data-player-facing={snapshot?.fighters[0].facing}
        data-cpu-facing={snapshot?.fighters[1].facing}
      >
        <header className="arcade-header">
          <div>
            <h2 id="arcade-title">
              COMMUNITY CLASH
            </h2>
          </div>
          <button
            className="arcade-icon-button"
            onClick={onClose}
            aria-label="Close arcade"
          >
            X
          </button>
        </header>
        {mode === "select" ? (
          <FighterSelect
            initialPlayer={player}
            initialOpponent={opponent}
            onStart={(chosenPlayer, chosenOpponent) => {
              setPlayer(chosenPlayer);
              setOpponent(chosenOpponent);
              setControls(false);
              setMode(layoutRef.current.blocked ? "waiting" : "loading");
              setPendingMatch({
                player: chosenPlayer,
                opponent: chosenOpponent,
                difficulty: "normal",
                seed: Math.floor(Math.random() * 1e9),
              });
            }}
          />
        ) : (
          <div
            className="arcade-match"
            inert={layout.blocked ? true : undefined}
            onBlur={(event) => {
              // The canvas and fight buttons share input ownership. Native
              // touch/click focus changes inside the dialog must not pause.
              // Clear holds when visiting a menu; real window/document loss,
              // offscreen play and rotation still pause through their handlers.
              if (ownsFightFocus(event.target) && !ownsFightFocus(event.relatedTarget))
                clearInput();
            }}
          >
            <div className="arcade-arena">
            <div className="arcade-hud" aria-label="Match status">
              {[0, 1].map((side) => {
                const f = snapshot?.fighters[side],
                  id = side === 0 ? player : opponent;
                return (
                  <div key={side} className={`arcade-health side-${side}`}>
                    <div>
                      <strong>
                        {side === 0 ? "P1" : "CPU"} / {FIGHTERS[id].shortName}
                      </strong>
                      <span
                        aria-label={`${side === 0 ? "Player" : "CPU"} rounds won`}
                      >
                        {"●".repeat(f?.wins ?? 0)}
                        {"○".repeat(2 - (f?.wins ?? 0))}
                      </span>
                    </div>
                    <progress
                      max="100"
                      value={f?.health ?? 100}
                      aria-label={`${side === 0 ? "Player" : "CPU"} health`}
                    />
                    <div className="arcade-meter">
                      <meter
                        min="0"
                        max="100"
                        value={f?.meter ?? 0}
                        aria-label={`${side === 0 ? "Player" : "CPU"} special meter`}
                      />
                      <span>
                        {(f?.meter ?? 0) >= 50
                          ? "SPECIAL READY"
                          : "BUILD SPECIAL"}
                      </span>
                      <output
                        data-testid={
                          side === 0 ? "player-health" : "cpu-health"
                        }
                      >
                        {f?.health ?? 100} HP
                      </output>
                    </div>
                  </div>
                );
              })}
              <div className="arcade-clock">
                <span>ROUND {snapshot?.round ?? 1}</span>
                <strong aria-label="Seconds remaining">
                  {snapshot?.seconds ?? 60}
                </strong>
              </div>
            </div>
            <div className="arcade-stage-wrap">
              <div
                ref={viewport}
                tabIndex={0}
                className="arcade-stage"
                aria-label="Fight controls. Focus here to use the keyboard."
              />
              {mode === "loading" && (
                <div className="arcade-overlay arcade-menu-enter" role="status">
                  <h3>LOADING…</h3>
                  <progress max="1" value={progress || undefined} />
                  <p>{FIGHTERS[player].shortName} VS {FIGHTERS[opponent].shortName}</p>
                  <button className="arcade-secondary" onClick={selectAgain}>
                    Back to selection
                  </button>
                </div>
              )}
              {mode === "ready" && (
                <div className="arcade-overlay arcade-versus arcade-menu-enter">
                  <span className="arcade-eyebrow">MLAI OFFICE</span>
                  <div className="arcade-versus-pair">
                    {[player, opponent].map((id, side) => (
                      <div
                        className="arcade-versus-fighter"
                        data-side={side === 0 ? "player" : "opponent"}
                        key={side}
                      >
                        <img
                          src={FIGHTERS[id].portrait
                            .replace("/thumbnails/", "/pixel-art/")
                            .replace(".webp", "-pixel-still.webp")}
                          width="160"
                          height="160"
                          alt=""
                        />
                        <span>{side === 0 ? "P1" : "CPU"}</span>
                        <strong>{FIGHTERS[id].shortName}</strong>
                      </div>
                    ))}
                    <span className="arcade-vs-mark" aria-hidden="true">VS</span>
                  </div>
                  <h3>READY TO FIGHT</h3>
                </div>
              )}
              {mode === "paused" && (
                <div className="arcade-overlay arcade-menu-enter">
                  <h3>GAME PAUSED</h3>
                  <button
                    className="arcade-primary"
                    onClick={() => void resume()}
                  >
                    RESUME →
                  </button>
                  <button className="arcade-secondary" onClick={selectAgain}>
                    Change fighters
                  </button>
                </div>
              )}
              {mode === "error" && (
                <div className="arcade-overlay arcade-menu-enter" role="alert">
                  <h3>COULDN’T LOAD</h3>
                  <p>{error}</p>
                  <button
                    className="arcade-primary"
                    onClick={() => setAttempt((n) => n + 1)}
                  >
                    RETRY →
                  </button>
                  <button className="arcade-secondary" onClick={selectAgain}>
                    Back to selection
                  </button>
                </div>
              )}
              {mode === "playing" && snapshot?.announcement && (
                <div
                  key={`${snapshot.round}:${snapshot.announcement}`}
                  className={`arcade-announcement ${
                    snapshot.phase === "intro"
                      ? snapshot.announcement === "FIGHT!"
                        ? "arcade-fight-call"
                        : "arcade-round-splash"
                      : "arcade-round-result"
                  }`}
                  aria-live="polite"
                >
                  {snapshot.announcement}
                  {snapshot.phase === "round-end" && (
                    <small>
                      {snapshot.roundWinner === null
                        ? "Nobody takes the round"
                        : `${snapshot.roundWinner === 0 ? "PLAYER" : "CPU"} TAKES THE ROUND`}
                    </small>
                  )}
                </div>
              )}
              {mode === "result" && (
                <div
                  className="arcade-overlay arcade-result arcade-menu-enter"
                  aria-live="polite"
                >
                  <span className="arcade-eyebrow">
                    {resultWinner === 0
                      ? "NICELY PLAYED"
                      : resultWinner === 1
                        ? "THE REMATCH IS YOURS"
                        : "EVENLY MATCHED"}
                  </span>
                  <h3>{snapshot?.announcement}</h3>
                  <p>
                    {snapshot?.fighters[0].wins} — {snapshot?.fighters[1].wins}{" "}
                    / First to two
                  </p>
                  <button
                    className="arcade-primary"
                    onClick={() => setAttempt((n) => n + 1)}
                  >
                    REMATCH →
                  </button>
                  <button className="arcade-secondary" onClick={selectAgain}>
                    Change fighters
                  </button>
                  <button className="arcade-secondary" onClick={onClose}>
                    Back to the team
                  </button>
                </div>
              )}
            </div>
            </div>
            <div
              ref={fightControls}
              className="arcade-touch-controls"
              aria-label="Touch fight controls"
            >
              <div className="arcade-dpad">
                {touchButton("jump", "Jump", "↑", "up")}
                {touchButton("left", "Left", "←", "left")}
                {touchButton("crouch", "Crouch", "↓", "down")}
                {touchButton("right", "Right", "→", "right")}
              </div>
              <div className="arcade-action-pad">
                {touchButton("light", "Punch", layout.touch ? "P" : "J")}
                {touchButton("heavy", "Kick", "K")}
                {touchButton("special", "Special", layout.touch ? "★" : "L", "special")}
                {touchButton("guard", "Guard", "◇")}
              </div>
            </div>
            <div className="arcade-toolbar">
              <button
                className="arcade-secondary"
                disabled={mode !== "playing" || !!layout.blocked}
                onClick={pause}
              >
                Ⅱ Pause
              </button>
              <button
                className="arcade-secondary"
                aria-expanded={controls}
                disabled={!!layout.blocked}
                onClick={() => {
                  if (mode === "playing") pause();
                  setControls(!controls);
                }}
              >
                Controls
              </button>
              <button
                className="arcade-secondary"
                aria-label={volume === 0 ? "Unmute sound" : "Mute sound"}
                aria-pressed={volume > 0}
                onClick={() => setVolume(volume === 0 ? 0.3 : 0)}
              >
                SOUND {volume === 0 ? "OFF" : "ON"}
              </button>
            </div>
            {controls && (
              <div className="arcade-controls-help arcade-menu-enter">
                <button className="arcade-secondary arcade-help-close" onClick={() => setControls(false)}>Close controls</button>
                <p>{layout.touch ? "Left thumb: move, jump and crouch. Right thumb: punch, kick, special and guard. Hold a direction while tapping an attack." : CONTROLS}</p>
                <p>{layout.touch ? "Tap Jump near your opponent to hop over them." : "Up near your opponent hops over them. Add ←/→ to steer."}</p>
                <p>
                  {layout.touch ? "Hold Guard to block. Crouch + Punch hits low. Jump +" : "Hold away or Shift to guard. Crouch + J hits low. Jump +"}
                  attack hits overhead. A special costs half a meter; hits build
                  it.
                </p>
                <p><strong>{FIGHTERS[player].shortName} / {SPECIAL_MOVES[player].name}:</strong> {SPECIAL_MOVES[player].description}</p>
                <p><strong>{FIGHTERS[opponent].shortName} / {SPECIAL_MOVES[opponent].name}:</strong> {SPECIAL_MOVES[opponent].description}</p>
                <label className="arcade-motion">
                  <input
                    type="checkbox"
                    checked={reduced}
                    onChange={(event) => setReduced(event.target.checked)}
                  /> Less motion
                </label>
              </div>
            )}

          </div>
        )}
        {mode !== "select" && layout.blocked && (
          <div className="arcade-orientation" role="status" aria-live="polite">
            <span className="arcade-rotate-icon" aria-hidden="true">↻</span>
            <h3>{layout.blocked === "portrait" ? "ROTATE TO PLAY" : "A LITTLE MORE ROOM"}</h3>
            <p>{layout.blocked === "portrait"
              ? "Turn your phone sideways for the arena and touch controls."
              : "Expand your browser view or play on a larger screen."}</p>
            <p>{mode === "paused" ? "Your match is paused. Resume when you’re ready." : "Your fighters are picked. The fight waits until there’s room."}</p>
            <button className="arcade-secondary" onClick={selectAgain}>Change fighters</button>
          </div>
        )}
      </div>
    </dialog>
  );
}
