import { useEffect, useRef, useState, type PointerEvent } from "react";
import {
  FIGHTERS,
  FIGHTER_IDS,
  type Difficulty,
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
import "./arcade.css";

export interface ArcadeShellProps {
  initialPlayer?: FighterId;
  onClose: () => void;
}
type Mode =
  | "select"
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

type FighterSlot = "player" | "opponent";

function FighterSelection({
  slot,
  selected,
  onSelect,
}: {
  slot: FighterSlot;
  selected: FighterId;
  onSelect: (id: FighterId) => void;
}) {
  const [search, setSearch] = useState("");
  const fighter = FIGHTERS[selected];
  const special = SPECIAL_MOVES[selected];
  const query = search.trim().toLocaleLowerCase();
  const matches = FIGHTER_IDS.filter((id) => {
    const entry = FIGHTERS[id];
    return `${entry.name} ${entry.role} ${entry.special}`
      .toLocaleLowerCase()
      .includes(query);
  });
  const label = slot === "player" ? "your fighter" : "CPU opponent";

  return (
    <fieldset className={`arcade-fighter-select ${slot}`}>
      <legend>
        {slot === "player" ? "01 / YOUR FIGHTER" : "02 / CPU OPPONENT"}
      </legend>
      <div
        className="arcade-selected"
        data-testid={`${slot}-selected-fighter`}
        aria-live="polite"
        aria-atomic="true"
      >
        <div className="arcade-selected-preview" aria-hidden="true">
          <img
            src={fighter.portrait
              .replace("/thumbnails/", "/pixel-art/")
              .replace(".webp", "-pixel-still.webp")}
            alt=""
            width="160"
            height="160"
          />
        </div>
        <div className="arcade-selected-identity">
          <strong>{fighter.name}</strong>
          <span>{fighter.role}</span>
          <p>{fighter.style}</p>
        </div>
        <div className="arcade-selected-special">
          <span className="arcade-special-name">SPECIAL / {special.name}</span>
          <p>{special.description}</p>
        </div>
      </div>
      <label className="arcade-roster-search">
        <span>Find {label}</span>
        <input
          type="search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Name, role or special…"
          autoComplete="off"
          spellCheck={false}
          aria-controls={`arcade-${slot}-roster`}
        />
      </label>
      <div className="arcade-roster-count" aria-live="polite">
        {matches.length} of {FIGHTER_IDS.length} fighters
      </div>
      <div className="arcade-choice-grid" id={`arcade-${slot}-roster`}>
        {matches.map((id) => {
          const entry = FIGHTERS[id];
          const chosen = selected === id;
          return (
            <button
              type="button"
              key={id}
              aria-pressed={chosen}
              aria-label={`${slot === "player" ? "Play as" : "Fight against"} ${entry.name}`}
              className={`arcade-choice ${chosen ? "selected" : ""}`}
              onClick={() => onSelect(id)}
            >
              <img
                src={entry.portrait}
                alt=""
                width="80"
                height="80"
                decoding="async"
              />
              <strong>{entry.shortName}</strong>
              <span className="arcade-selection-marker" aria-hidden="true">
                {chosen ? (slot === "player" ? "P1 ✓" : "CPU ✓") : "SELECT"}
              </span>
            </button>
          );
        })}
      </div>
      {matches.length === 0 && (
        <p className="arcade-empty-search">
          No fighters match “{search}”.{" "}
          <button type="button" onClick={() => setSearch("")}>
            Show all fighters
          </button>
        </p>
      )}
    </fieldset>
  );
}

export default function ArcadeShell({
  initialPlayer = "sam",
  onClose,
}: ArcadeShellProps) {
  const dialog = useRef<HTMLDialogElement>(null),
    viewport = useRef<HTMLDivElement>(null),
    runtime = useRef<ArcadeRuntime | null>(null);
  const [player, setPlayer] = useState<FighterId>(initialPlayer),
    [opponent, setOpponent] = useState<FighterId>(
      initialPlayer === "sam" ? "sonia" : "sam",
    ),
    [difficulty, setDifficulty] = useState<Difficulty>("normal");
  const [mode, setMode] = useState<Mode>("select"),
    [config, setConfig] = useState<MatchConfig | null>(null),
    [attempt, setAttempt] = useState(0);
  const [snapshot, setSnapshot] = useState<MatchSnapshot | null>(null),
    [progress, setProgress] = useState(0),
    [error, setError] = useState("");
  const [volume, setVolume] = useState(0.3),
    [reduced, setReduced] = useState(false);
  const [controls, setControls] = useState(false);
  const settings = useRef({ volume, reduced });
  settings.current = { volume, reduced };
  const modeRef = useRef<Mode>(mode);
  modeRef.current = mode;
  const keys = useRef(new Set<string>()),
    pointers = useRef(new Map<number, keyof InputFrame>());
  function clearInput() {
    keys.current.clear();
    pointers.current.clear();
    runtime.current?.clearInput();
  }
  function pause() {
    if (modeRef.current !== "playing") return;
    runtime.current?.pause();
    clearInput();
    setMode("paused");
  }
  async function resume() {
    await runtime.current?.resume();
    if (!runtime.current) return;
    setMode("playing");
    viewport.current?.focus({ preventScroll: true });
  }
  async function fight() {
    await runtime.current?.start();
    if (!runtime.current) return;
    setMode("playing");
    viewport.current?.focus({ preventScroll: true });
  }

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
    runtime.current?.volume(volume);
  }, [volume]);
  useEffect(() => {
    runtime.current?.reducedMotion(reduced);
  }, [reduced]);

  useEffect(() => {
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
        modeRef.current !== "playing" ||
        !viewport.current?.contains(document.activeElement) ||
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
        if (entries[0] && !entries[0].isIntersecting) pause();
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

  function touch(
    event: PointerEvent<HTMLButtonElement>,
    action: keyof InputFrame,
    held: boolean,
  ) {
    event.preventDefault();
    if (held) {
      if (mode !== "playing") return;
      event.currentTarget.setPointerCapture(event.pointerId);
      pointers.current.set(event.pointerId, action);
      runtime.current?.input(action, true);
    } else {
      pointers.current.delete(event.pointerId);
      const keyboardHeld = [...keys.current].some(
        (key) => keyActions[key] === action,
      );
      runtime.current?.input(
        action,
        keyboardHeld || [...pointers.current.values()].includes(action),
      );
    }
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
      disabled={mode !== "playing"}
      onPointerDown={(event) => touch(event, action, true)}
      onPointerUp={(event) => touch(event, action, false)}
      onPointerCancel={(event) => touch(event, action, false)}
      onLostPointerCapture={(event) => touch(event, action, false)}
    >
      {symbol}
      <span>{label}</span>
    </button>
  );
  function selectAgain() {
    setConfig(null);
    setSnapshot(null);
    setMode("select");
  }
  const resultWinner = snapshot?.winner;

  return (
    <dialog
      ref={dialog}
      className="team-arcade-dialog"
      data-mode={mode}
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
      >
        <header className="arcade-header">
          <div>
            <span className="arcade-eyebrow">MLAI / PLAYER VS CPU</span>
            <h2 id="arcade-title">
              COMMUNITY CLASH<span>15</span>
            </h2>
          </div>
          <button
            className="arcade-icon-button"
            onClick={onClose}
            aria-label="Close arcade"
          >
            ✕
          </button>
        </header>
        {mode === "select" ? (
          <div className="arcade-selection">
            <div className="arcade-selection-intro">
              <span className="arcade-tag">FIFTEEN FIGHTERS. ONE COMMUNITY.</span>
              <p>Pick your side. Meet your match.</p>
            </div>
            <div className="arcade-versus-select">
              <FighterSelection slot="player" selected={player} onSelect={setPlayer} />
              <FighterSelection slot="opponent" selected={opponent} onSelect={setOpponent} />
              <span className="arcade-vs" aria-hidden="true">
                VS
              </span>
            </div>
            <div className="arcade-selection-bottom">
              <label>
                CPU DIFFICULTY
                <select
                  aria-label="CPU difficulty"
                  value={difficulty}
                  onChange={(event) =>
                    setDifficulty(event.target.value as Difficulty)
                  }
                >
                  <option value="easy">Easy — finding your feet</option>
                  <option value="normal">Normal — ready to rumble</option>
                  <option value="hard">Hard — bring your A-game</option>
                </select>
              </label>
              <button
                className="arcade-primary"
                onClick={() => {
                  setMode("loading");
                  setConfig({
                    player,
                    opponent,
                    difficulty,
                    seed: Math.floor(Math.random() * 1e9),
                  });
                }}
              >
                ENTER THE ARENA <span>→</span>
              </button>
            </div>
            <p className="arcade-help">
              First to two rounds. Keyboard or touch. Mirror matches welcome.
            </p>
          </div>
        ) : (
          <>
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
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget as Node,
                    ) &&
                    mode === "playing"
                  )
                    pause();
                }}
              />
              {mode === "loading" && (
                <div className="arcade-overlay" role="status">
                  <span className="arcade-eyebrow">PREPARING YOUR MATCH</span>
                  <h3>
                    {progress === 0 ? "LOADING ARCADE…" : "LOADING FIGHTERS…"}
                  </h3>
                  <progress max="1" value={progress || undefined} />
                  <p>
                    {FIGHTERS[player].shortName} versus{" "}
                    {FIGHTERS[opponent].shortName}. Welcome to the MLAI office.
                  </p>
                  <button className="arcade-secondary" onClick={selectAgain}>
                    Back to selection
                  </button>
                </div>
              )}
              {mode === "ready" && (
                <div className="arcade-overlay">
                  <span className="arcade-eyebrow">
                    {FIGHTERS[player].shortName} VS{" "}
                    {FIGHTERS[opponent].shortName}
                  </span>
                  <h3>READY TO PLAY?</h3>
                  <p>
                    A/D or ←/→ move · W/↑ jump · J punch · K kick · L special ·
                    Shift guard
                  </p>
                  <p className="arcade-match-special">
                    {SPECIAL_MOVES[player].name}: {SPECIAL_MOVES[player].description}
                  </p>
                  <button
                    className="arcade-primary"
                    onClick={() => void fight()}
                  >
                    FIGHT! →
                  </button>
                </div>
              )}
              {mode === "paused" && (
                <div className="arcade-overlay">
                  <span className="arcade-eyebrow">TAKE A BREATHER</span>
                  <h3>GAME PAUSED</h3>
                  <p>Your match waits for you.</p>
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
                <div className="arcade-overlay" role="alert">
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
                <div className="arcade-announcement" aria-live="polite">
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
                  className="arcade-overlay arcade-result"
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
            <div
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
                {touchButton("light", "Punch", "J")}
                {touchButton("heavy", "Kick", "K")}
                {touchButton("special", "Special", "L", "special")}
                {touchButton("guard", "Guard", "◇")}
              </div>
            </div>
            <div className="arcade-toolbar">
              <button
                className="arcade-secondary"
                disabled={mode !== "playing"}
                onClick={pause}
              >
                Ⅱ Pause
              </button>
              <button
                className="arcade-secondary"
                aria-expanded={controls}
                onClick={() => {
                  if (mode === "playing") pause();
                  setControls(!controls);
                }}
              >
                Controls
              </button>
              <label className="arcade-volume">
                <span>Sound</span>
                <input
                  aria-label="Sound volume"
                  type="range"
                  min="0"
                  max="0.6"
                  step="0.05"
                  value={volume}
                  onChange={(event) => setVolume(Number(event.target.value))}
                />
              </label>
              <button
                className="arcade-secondary"
                aria-pressed={volume === 0}
                onClick={() => setVolume(volume === 0 ? 0.3 : 0)}
              >
                {volume === 0 ? "Unmute" : "Mute"}
              </button>
              <label className="arcade-motion">
                <input
                  type="checkbox"
                  checked={reduced}
                  onChange={(event) => setReduced(event.target.checked)}
                />{" "}
                Less motion
              </label>
            </div>
            {controls && (
              <div className="arcade-controls-help">
                <p>{CONTROLS}</p>
                <p>
                  Hold away or Shift to guard. Crouch + J hits low. Jump +
                  attack hits overhead. A special costs half a meter; hits build
                  it.
                </p>
                <p><strong>{FIGHTERS[player].shortName} / {SPECIAL_MOVES[player].name}:</strong> {SPECIAL_MOVES[player].description}</p>
                <p><strong>{FIGHTERS[opponent].shortName} / {SPECIAL_MOVES[opponent].name}:</strong> {SPECIAL_MOVES[opponent].description}</p>
              </div>
            )}
            <p className="arcade-help">
              {mode === "playing"
                ? "Click the arena to focus keyboard controls. Esc pauses. Your progress pauses if you leave."
                : "Original MLAI fighters / Local CPU / No account needed"}
            </p>
          </>
        )}
      </div>
    </dialog>
  );
}
