import { useEffect, useRef, useState, type MouseEvent, type ReactNode } from "react";
import { CART_TIMINGS, canUse3D, cartAnnouncement, cartBusy, cartLabel, screenMode, type CartEvent, type CartState } from "./cartridge";
import type { ConsoleControl, ConsoleScene } from "./console-scene.client";

export interface TeamConsoleProps {
  /** The team select panel: the console's screen. */
  children: ReactNode;
  cart: CartState;
  onCart(event: CartEvent): void;
  /** False when the arcade is switched off for this build: no cartridge to play with. */
  interactive: boolean;
  arcadeOpen: boolean;
  onPrev(): void;
  onNext(): void;
  /** The big key: start the game. */
  onA(): void;
  /** The small key: pick a fighter at random. */
  onB(): void;
}

const KEYS: { control: ConsoleControl; glyph: string; side: "l" | "r" }[] = [
  { control: "prev", glyph: "◀", side: "l" },
  { control: "next", glyph: "▶", side: "l" },
  { control: "a", glyph: "A", side: "r" },
  { control: "b", glyph: "B", side: "r" },
];

/** MLAI SLAB-1. Server-rendered as a flat console around the team panel. On a wide
 *  screen with a mouse it lazily mounts a three.js scene that draws the same console
 *  in 3D on a canvas above; the panel itself is never moved, so every control on the
 *  screen stays an ordinary, accessible button. */
export default function TeamConsole({ children, cart, onCart, interactive, arcadeOpen, onPrev, onNext, onA, onB }: TeamConsoleProps) {
  const host = useRef<HTMLDivElement>(null);
  const slab = useRef<HTMLElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const scene = useRef<ConsoleScene | null>(null);
  const failed = useRef(false);
  const cartButton = useRef<HTMLButtonElement>(null);
  const [mode, setMode] = useState<"flat" | "3d">("flat");
  const [ready, setReady] = useState(false);
  const [eligible, setEligible] = useState(false);
  const [near, setNear] = useState(false);
  const [status, setStatus] = useState("");
  const settled = useRef<CartState>(cart);
  const cartRef = useRef(cart);
  cartRef.current = cart;

  // Moving states end on a timer; the reducer decides what comes next.
  useEffect(() => {
    const wait = CART_TIMINGS[cart];
    if (!wait) return;
    const timer = window.setTimeout(() => onCart("TIMER"), wait);
    return () => window.clearTimeout(timer);
  }, [cart, onCart]);

  // Announce a settled change, never the initial state.
  useEffect(() => {
    const message = cartAnnouncement(cart);
    if (message && settled.current !== cart) { settled.current = cart; setStatus(message); }
  }, [cart]);

  // Who gets the 3D console: wide screen, mouse, no motion or data limits.
  useEffect(() => {
    const wide = window.matchMedia("(min-width: 1024px)");
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
      const ok = canUse3D({ wide: wide.matches, finePointer: fine.matches, reducedMotion: reduced.matches, saveData });
      setEligible(ok);
      if (!ok) setReady(true);
    };
    update();
    const queries = [wide, fine, reduced];
    queries.forEach(query => query.addEventListener("change", update));
    return () => queries.forEach(query => query.removeEventListener("change", update));
  }, []);

  // Only fetch three.js once the console is close to the viewport.
  useEffect(() => {
    if (!eligible || near || !host.current) return;
    if (!("IntersectionObserver" in window)) { setNear(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: "300px" });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [eligible, near]);

  // Mount the scene. It is disposed while the arcade is open so the game owns the only WebGL context.
  useEffect(() => {
    if (!eligible || !near || arcadeOpen || failed.current) return;
    let cancelled = false;
    let created: ConsoleScene | null = null;
    const giveUp = () => {
      failed.current = true;
      created?.dispose(); created = null; scene.current = null;
      if (!cancelled) { setMode("flat"); setReady(true); }
    };
    import("./console-scene.client").then(module => {
      if (cancelled || !host.current || !slab.current || !screen.current) return;
      created = module.createConsoleScene(host.current, { slab: slab.current, screen: screen.current }, {
        interactive,
        cart: cartRef.current,
        onFirstFrame: () => { if (!cancelled) { setMode("3d"); setReady(true); } },
        onLost: giveUp,
      });
      scene.current = created;
    }).catch(giveUp);
    return () => {
      cancelled = true;
      created?.dispose(); created = null; scene.current = null;
      setMode("flat");
    };
  }, [eligible, near, arcadeOpen, interactive]);

  useEffect(() => { scene.current?.setCart(cart); }, [cart, mode]);

  const shown = screenMode(cart);
  const busy = cartBusy(cart);
  const press = (control: ConsoleControl) => scene.current?.press(control);
  const act: Record<ConsoleControl, () => void> = { prev: onPrev, next: onNext, a: onA, b: onB };
  // With the cartridge out the 3D console is tilted in the hand: a click anywhere on it puts the cartridge back.
  const hostClick = (event: MouseEvent<HTMLDivElement>) => {
    if (mode !== "3d" || cart !== "out" || !interactive) return;
    if ((event.target as HTMLElement).closest("button, a")) return;
    onCart("INSERT");
  };

  return (
    <div
      ref={host}
      className="team-console"
      data-console={mode}
      data-console-ready={ready ? "true" : undefined}
      data-cart={cart}
      data-screen={shown}
      onClick={hostClick}
    >
      <div className="team-console-shell">
        <div className="team-console-body" aria-hidden="true">
          <i className="team-console-drop" />
          <i className="team-console-ink" />
          <i className="team-console-slab" ref={slab} />
          <i className="team-console-tape">PROPERTY OF THE COMMUNITY</i>
          <i className="team-console-lamp" />
          <i className="team-console-stamp">MLAI SLAB-1 · 15 FIGHTERS · NO BATTERIES</i>
          {interactive && <i className="team-console-scrawl">cart goes here →</i>}
        </div>

        {interactive && <button
          type="button"
          ref={cartButton}
          className="team-console-cart"
          aria-label={cartLabel(cart)}
          aria-disabled={busy || arcadeOpen ? "true" : undefined}
          aria-describedby="team-console-cart-hint"
          onClick={event => { event.stopPropagation(); if (!busy) onCart("TOGGLE"); }}
        >
          <span className="team-console-cart-art" aria-hidden="true" />
          <span className="team-console-cart-tab" aria-hidden="true">{cartLabel(cart) === "Insert cartridge" ? "INSERT ▼" : "EJECT ▲"}</span>
        </button>}

        {(["l", "r"] as const).map(side => (
          <div key={side} className={`team-console-grip team-console-grip--${side}`} aria-hidden="true">
            {KEYS.filter(key => key.side === side).map(key => (
              <span
                key={key.control}
                className="team-console-key"
                data-control={key.control}
                onPointerDown={() => press(key.control)}
                onClick={() => { if (shown === "live") act[key.control](); }}
              >{key.glyph}</span>
            ))}
          </div>
        ))}

        <div className="team-console-screen" ref={screen}>
          <div className="team-console-live" inert={shown !== "live"}>{children}</div>
          {shown === "off" && <div className="team-console-off">
            <p aria-hidden="true">NO CART</p>
            <small>Nothing to play without the cartridge.</small>
            <button type="button" className="team-console-insert" disabled={cart !== "out"} onClick={event => { event.stopPropagation(); cartButton.current?.focus({ preventScroll: true }); onCart("INSERT"); }}>INSERT CART</button>
          </div>}
          {shown === "boot" && <div className="team-console-boot" aria-hidden="true">
            <b>MLAI</b>
            <span>Community Clash</span>
          </div>}
        </div>
      </div>
      <p className="team-console-status" role="status">{status}</p>
      <span id="team-console-cart-hint" hidden>Take the game cartridge out, or put it back in to play.</span>
    </div>
  );
}
