import { useEffect, useRef, useState, type ReactNode } from "react";
import { CART_TIMINGS, canUse3D, cartAnnouncement, cartBusy, cartLabel, screenMode, type CartEvent, type CartState } from "./cartridge";
import type { ConsoleScene } from "./console-scene.client";

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

type Control = "prev" | "next" | "a" | "b";
const KEYS: { control: Control; glyph: string; side: "l" | "r" }[] = [
  { control: "prev", glyph: "◀", side: "l" },
  { control: "next", glyph: "▶", side: "l" },
  { control: "a", glyph: "A", side: "r" },
  { control: "b", glyph: "B", side: "r" },
];

/** A switch for testing the 3D console on a machine without a graphics card:
 *  `localStorage.setItem("mlai-console-3d", "force")`. */
function force3D(): boolean {
  try { return window.localStorage.getItem("mlai-console-3d") === "force"; } catch { return false; }
}

/** MLAI SLAB-1, the console the team select is played on.
 *
 *  Server-rendered flat. In the browser it lazily mounts a three.js scene, a wide handheld
 *  on a wide screen and an upright one on a phone:
 *  with the cartridge out you see the whole console floating over the page; put the
 *  cartridge in and the camera dives into its screen until the screen is the team panel.
 *  The panel is ordinary HTML throughout, so every control on it stays a real button.
 *  Reduced motion keeps the flat console. */
export default function TeamConsole({ children, cart, onCart, interactive, arcadeOpen, onPrev, onNext, onA, onB }: TeamConsoleProps) {
  const host = useRef<HTMLDivElement>(null);
  const screen = useRef<HTMLDivElement>(null);
  const cartButton = useRef<HTMLButtonElement>(null);
  const scene = useRef<ConsoleScene | null>(null);
  const failed = useRef(false);
  const reopened = useRef(false);
  /** The console shows itself off once per page, the first time it is ready. */
  const attracted = useRef(false);
  /** Someone has clicked or typed in the panel: do not take it away from them. */
  const used = useRef(false);
  /** The cartridge is out because the console pulled it, not the visitor. */
  const autoPulled = useRef(false);
  const previousCart = useRef(cart);
  const [arrived, setArrived] = useState(false);
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
    if (!message || settled.current === cart) return;
    settled.current = cart;
    setStatus(message);
  }, [cart]);

  // Who gets the 3D console: anyone with a game to play and no motion or data limits.
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      const saveData = Boolean((navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData);
      const ok = interactive && canUse3D({ reducedMotion: reduced.matches, saveData });
      setEligible(ok);
      if (ok) return;
      setReady(true);
      // The 3D console is gone (reduced motion): a cartridge it pulled goes back in.
      if (autoPulled.current) { autoPulled.current = false; onCart("RESET"); }
    };
    update();
    reduced.addEventListener("change", update);
    return () => reduced.removeEventListener("change", update);
  }, [interactive, onCart]);

  // The flash of screen light plays only when the camera really arrives.
  useEffect(() => {
    const from = previousCart.current;
    previousCart.current = cart;
    setArrived(from === "booting" && cart === "seated" && mode === "3d");
    if (cart === "seated") autoPulled.current = false;
  }, [cart, mode]);

  // Only fetch three.js once the console is close to the viewport.
  useEffect(() => {
    if (!eligible || near || !host.current) return;
    if (!("IntersectionObserver" in window)) { setNear(true); return; }
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) { setNear(true); observer.disconnect(); }
    }, { rootMargin: "600px" });
    observer.observe(host.current);
    return () => observer.disconnect();
  }, [eligible, near]);

  // Mount the scene. It is disposed while the arcade is open so the game owns the only WebGL context.
  useEffect(() => {
    if (arcadeOpen) { reopened.current = true; used.current = true; }
    if (!eligible || !near || arcadeOpen || failed.current) return;
    let cancelled = false;
    let created: ConsoleScene | null = null;
    const giveUp = () => {
      failed.current = true;
      created?.dispose(); created = null; scene.current = null;
      setReady(true);
      if (cancelled) return;
      // Without the 3D console there is nothing to put the cartridge back into: seat it.
      autoPulled.current = false;
      setMode("flat"); onCart("RESET");
    };
    // After the arcade closes, wait a moment: a quick rematch should not build and tear down a scene.
    const delay = reopened.current ? 2500 : 0;
    reopened.current = false;
    const timer = window.setTimeout(() => import("./console-scene.client").then(module => {
      if (cancelled || !host.current || !screen.current) return;
      created = module.createConsoleScene(host.current, { screen: screen.current }, {
        cart: cartRef.current,
        allowSoftware: force3D(),
        onFirstFrame: () => {
          if (cancelled) return;
          setMode("3d"); setReady(true);
          if (attracted.current) return;
          attracted.current = true;
          // Leave the panel alone if someone is already using it.
          const panel = screen.current;
          if (cartRef.current !== "seated" || used.current || !panel || panel.matches(":hover") || panel.contains(document.activeElement)) return;
          autoPulled.current = true;
          onCart("ATTRACT");
        },
        onLost: giveUp,
      });
      scene.current = created;
    }).catch(giveUp), delay);
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      created?.dispose(); created = null; scene.current = null;
      setMode("flat");
    };
  }, [eligible, near, arcadeOpen, onCart]);

  useEffect(() => { scene.current?.setCart(cart); }, [cart, mode]);

  const shown = screenMode(cart);
  const busy = cartBusy(cart);
  const act: Record<Control, () => void> = { prev: onPrev, next: onNext, a: onA, b: onB };

  return (
    <div
      ref={host}
      className="team-console"
      data-console={mode}
      data-console-ready={ready ? "true" : undefined}
      data-cart={cart}
      data-screen={shown}
      data-arrived={arrived ? "true" : undefined}
    >
      <div className="team-console-shell">
        <div className="team-console-body" aria-hidden="true">
          <i className="team-console-drop" />
          <i className="team-console-ink" />
          <i className="team-console-slab" />
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
          onClick={event => { event.stopPropagation(); used.current = true; if (!busy) onCart("TOGGLE"); }}
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
                onClick={() => { if (shown === "live") act[key.control](); }}
              >{key.glyph}</span>
            ))}
          </div>
        ))}

        <div className="team-console-screen" ref={screen} onPointerDownCapture={() => { used.current = true; }} onKeyDownCapture={() => { used.current = true; }}>
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
      <span id="team-console-cart-hint" hidden>Take the game cartridge out to see the console, or put it back in to see the team and play.</span>
    </div>
  );
}
