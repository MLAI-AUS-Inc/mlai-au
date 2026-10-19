import { useEffect, useRef, useState } from "react";
import { FIGHTERS, FIGHTER_IDS, type FighterId } from "~/games/team-arcade/roster";

type SelectionStep = "player" | "opponent" | "ready";

export interface FighterSelectProps {
  initialPlayer: FighterId;
  initialOpponent: FighterId;
  onStart: (player: FighterId, opponent: FighterId) => void;
}

/** A selection preview uses the small homepage still, never a combat atlas. */
export const fighterPreview = (id: FighterId) =>
  FIGHTERS[id].portrait
    .replace("/thumbnails/", "/pixel-art/")
    .replace(".webp", "-pixel-still.webp");

export default function FighterSelect({
  initialPlayer,
  initialOpponent,
  onStart,
}: FighterSelectProps) {
  const [player, setPlayer] = useState(initialPlayer);
  const [opponent, setOpponent] = useState(initialOpponent);
  const [step, setStep] = useState<SelectionStep>("player");
  const heading = useRef<HTMLHeadingElement>(null);
  const interacted = useRef(false);
  const choosingPlayer = step === "player";
  const selected = choosingPlayer ? player : opponent;
  const title = choosingPlayer
    ? "CHOOSE YOUR FIGHTER"
    : step === "opponent"
      ? "CHOOSE YOUR OPPONENT"
      : "READY TO FIGHT";

  useEffect(() => {
    if (interacted.current) heading.current?.focus({ preventScroll: true });
  }, [step]);

  function choose(id: FighterId) {
    interacted.current = true;
    if (choosingPlayer) {
      setPlayer(id);
      setStep("opponent");
    } else {
      setOpponent(id);
      setStep("ready");
    }
  }

  return (
    <div className="arcade-selection arcade-menu-enter" data-selection-step={step}>
      <div className="arcade-pick-top">
        <p className="arcade-pick-progress" aria-label={`Selection step ${choosingPlayer ? "1 of 3: player" : step === "opponent" ? "2 of 3: CPU opponent" : "3 of 3: start match"}`}>
          <span data-current={choosingPlayer}>1P</span>
          <span aria-hidden="true">→</span>
          <span data-current={step === "opponent"}>CPU</span>
          <span aria-hidden="true">→</span>
          <span data-current={step === "ready"}>FIGHT</span>
        </p>
        <h3 key={step} ref={heading} tabIndex={-1} className="arcade-pick-heading" aria-live="polite">
          {title}
        </h3>
      </div>

      <div className="arcade-pick-pair">
        {(["player", "opponent"] as const).map((side) => {
          const id = side === "player" ? player : opponent;
          const fighter = FIGHTERS[id];
          const active = side === "player" ? choosingPlayer : !choosingPlayer;
          return (
            <div
              key={side}
              className="arcade-pick-slot arcade-selected"
              data-side={side}
              data-active={active}
              data-testid={`${side}-selected-fighter`}
              aria-live="polite"
              aria-atomic="true"
            >
              <span className="arcade-pick-label">{side === "player" ? "PLAYER 1" : "CPU"}</span>
              <div className="arcade-selected-preview" aria-hidden="true">
                <img key={id} src={fighterPreview(id)} alt="" width="160" height="160" />
              </div>
              <strong>{fighter.name}</strong>
              <span className="arcade-pick-special">{fighter.special}</span>
            </div>
          );
        })}
        <span className="arcade-pick-vs" aria-hidden="true">VS</span>
      </div>

      <div
        className="arcade-choice-grid"
        role="group"
        aria-label={choosingPlayer ? "Choose your fighter" : "Choose CPU opponent"}
        data-slot={choosingPlayer ? "player" : "opponent"}
        aria-description="Use the arrow keys to move. Press Enter or Space to choose."
        onKeyDown={(event) => {
          if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "Home", "End"].includes(event.key)) return;
          const buttons = [...event.currentTarget.querySelectorAll<HTMLButtonElement>("button")];
          const index = buttons.indexOf(event.target as HTMLButtonElement);
          if (index < 0) return;
          event.preventDefault();
          const offset = event.key === "ArrowLeft" ? -1
            : event.key === "ArrowRight" ? 1
              : event.key === "ArrowUp" ? -5 : 5;
          const next = event.key === "Home" ? 0
            : event.key === "End" ? buttons.length - 1
              : (index + offset + buttons.length) % buttons.length;
          buttons[next]?.focus();
        }}
      >
        {FIGHTER_IDS.map((id) => (
          <button
            key={id}
            type="button"
            className={`arcade-choice ${selected === id ? "selected" : ""}`}
            aria-pressed={selected === id}
            aria-label={`${choosingPlayer ? "Play as" : "Fight against"} ${FIGHTERS[id].name}`}
            onClick={() => choose(id)}
          >
            <div className="arcade-choice-portrait" aria-hidden="true">
              <img src={fighterPreview(id)} alt="" width="160" height="160" decoding="async" />
            </div>
            <strong>{FIGHTERS[id].shortName}</strong>
            {!choosingPlayer && player === id && <span className="arcade-roster-player-marker" aria-hidden="true">1P</span>}
            {step === "ready" && opponent === id && <span className="arcade-roster-cpu-marker" aria-hidden="true">CPU</span>}
          </button>
        ))}
      </div>

      <div className="arcade-pick-actions">
        {!choosingPlayer && (
          <button
            type="button"
            className="arcade-secondary"
            onClick={() => {
              interacted.current = true;
              setStep("player");
            }}
          >
            CHANGE PLAYER
          </button>
        )}
        <button
          type="button"
          className="arcade-primary arcade-start-match"
          disabled={step !== "ready"}
          onClick={() => onStart(player, opponent)}
        >
          <span aria-hidden="true">▶</span> START MATCH
        </button>
      </div>
    </div>
  );
}
