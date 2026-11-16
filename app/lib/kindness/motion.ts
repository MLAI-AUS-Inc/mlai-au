// Motion switch bootstrap for /kindness (shell part, Motion switch; engine part,
// Motion preference bootstrap). Release 1: it only decides `rk-motion-off` and
// owns the page's one delegated click listener for `.rk-motion-btn`. It never
// adds `rk-js` (nothing would ever reveal hidden content in release 1).
//
// The same source runs twice: inline, as the first child of the page wrapper,
// so the class is set before the sections paint; and from KindnessPage's one
// effect, because inline scripts do not run on client-side navigation.
//
// Labels are text that React hydrates, so the script only rewrites them once
// React has hydrated (`__rkHydrated`, set by the effect). If the bundle never
// hydrates, a fallback rewrites them five seconds after window load.

export type MotionLabels = { pause: string; play: string };

type MotionHandle = { boot: () => void; label: () => void; unbind: () => void };

type RkWindow = Window & {
  __rkMotion?: MotionHandle;
  __rkMotionBound?: boolean;
  __rkHydrated?: boolean;
};

/** The inline bootstrap, as plain ES5 source. Idempotent. */
export function motionBootstrap(labels: MotionLabels): string {
  const json = (value: string) => JSON.stringify(value).replace(/</g, "\\u003c");
  return `(function(w,d){var h=d.documentElement,K="rk:motion",P=${json(labels.pause)},Q=${json(labels.play)};
function lab(){var o=h.classList.contains("rk-motion-off"),t=o?Q:P,b=d.querySelectorAll(".rk-motion-btn"),i;for(i=0;i<b.length;i++){if(b[i].textContent!==t)b[i].textContent=t;}}
function click(e){var x=e.target,b=x&&x.closest?x.closest(".rk-motion-btn"):null;if(!b)return;var o=!h.classList.contains("rk-motion-off");h.classList.toggle("rk-motion-off",o);try{w.localStorage.setItem(K,o?"off":"on");}catch(z){}if(w.__rkHydrated||w.__rkNoReact)lab();var r=w.__rk;if(r&&typeof r.sync==="function")r.sync();}
function boot(){var s=null;try{s=w.localStorage.getItem(K);}catch(z){}var o=s==="off"||(s!=="on"&&!!w.matchMedia&&w.matchMedia("(prefers-reduced-motion: reduce)").matches);h.classList.toggle("rk-motion-off",o);if(!w.__rkMotionBound){w.__rkMotionBound=true;d.addEventListener("click",click);}if(w.__rkHydrated)lab();}
w.__rkMotion={boot:boot,label:lab,unbind:function(){d.removeEventListener("click",click);w.__rkMotionBound=false;}};
boot();
if(!w.__rkHydrated){w.addEventListener("load",function(){setTimeout(function(){if(!w.__rkHydrated){w.__rkNoReact=true;lab();}},5000);});}
})(window,document);`;
}

/**
 * No-script backstop: only applies when script is off, so whenever script
 * runs the stored choice wins. A switch that cannot work is never shown.
 */
export const MOTION_NOSCRIPT_CSS =
  "<style>@media (prefers-reduced-motion: reduce){*,*::before,*::after{animation:none!important}html{scroll-behavior:auto!important}}.rk-motion-btn{display:none!important}</style>";

/**
 * Runs the bootstrap after hydration (and after client-side navigation, when
 * the inline copy never ran). Returns the cleanup: unbinds the listener and
 * removes every `rk-` class from `<html>`.
 */
export function mountMotion(labels: MotionLabels): () => void {
  const w = window as RkWindow;
  w.__rkHydrated = true;
  if (w.__rkMotion) {
    w.__rkMotion.boot();
  } else {
    // The inline copy did not run (client-side navigation): run the same source.
    const script = document.createElement("script");
    script.text = motionBootstrap(labels);
    document.head.appendChild(script);
    script.remove();
  }
  return () => {
    w.__rkHydrated = false;
    w.__rkMotion?.unbind();
    const html = document.documentElement;
    Array.from(html.classList)
      .filter(name => name.startsWith("rk-"))
      .forEach(name => html.classList.remove(name));
  };
}
