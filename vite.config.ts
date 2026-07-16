import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig, type Plugin } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs";

// Load environment variables from .dev.vars or .env.local (only in local dev, not in CI)
const envFiles = [".dev.vars", ".env.local"];
for (const envFile of envFiles) {
  if (fs.existsSync(envFile)) {
    try {
      const devVars = fs.readFileSync(envFile, "utf-8");
      devVars.split("\n").forEach((line) => {
        // Handle KEY=VALUE format (with or without quotes)
        const match = line.match(/^([^=]+)=(.*)$/);
        if (match) {
          const key = match[1].trim();
          let value = match[2].trim();
          // Remove surrounding quotes if present
          value = value.replace(/^["']|["']$/g, "");
          if (key && !process.env[key]) {
            process.env[key] = value;
          }
        }
      });
      console.log(`Loaded environment variables from ${envFile}`);
    } catch (e) {
      console.warn(`Failed to load ${envFile}:`, (e as Error).message);
    }
  }
}

const livePreviewDisableHmr = ["1", "true", "yes", "on"].includes(
  String(process.env.CF_LIVE_PREVIEW_DISABLE_HMR || "").trim().toLowerCase(),
);
const inspectorPort =
  livePreviewDisableHmr || process.env.CLOUDFLARE_INSPECTOR_PORT === "false" ? false : undefined;
const wattTheHackApiPathPattern = /^\/api\/v1\/hackathons\/(?:watt|watt-the-hack)(?:\/|$)/;
type GuardedHotChannel = {
  send: (...args: any[]) => any;
  __cloudflareRaceGuard?: true;
};

function patchCloudflareHotChannel(hot: GuardedHotChannel) {
  if (hot.__cloudflareRaceGuard) return;

  const send = hot.send.bind(hot);
  hot.send = (...args) => {
    try {
      return send(...args);
    } catch (error) {
      if (error instanceof Error && error.message === "The WebSocket is undefined") return;
      throw error;
    }
  };
  hot.__cloudflareRaceGuard = true;
}

function suppressCloudflareHotChannelRace(): Plugin {
  return {
    name: "suppress-cloudflare-hot-channel-race",
    apply: "serve",
    configResolved(config) {
      for (const environmentOptions of Object.values(config.environments)) {
        const devOptions = environmentOptions.dev;
        const createEnvironment = devOptions?.createEnvironment;
        if (!createEnvironment) continue;

        devOptions.createEnvironment = ((...args: Parameters<typeof createEnvironment>) => {
          const environment = createEnvironment(...args);
          if (environment instanceof Promise) {
            return environment.then((resolvedEnvironment) => {
              patchCloudflareHotChannel(resolvedEnvironment.hot as GuardedHotChannel);
              return resolvedEnvironment;
            });
          }

          patchCloudflareHotChannel(environment.hot as GuardedHotChannel);
          return environment;
        }) as typeof createEnvironment;
      }
    },
    configureServer(server) {
      const patchHotChannels = () => {
        for (const environment of Object.values(server.environments)) {
          patchCloudflareHotChannel(environment.hot as GuardedHotChannel);
        }
      };

      patchHotChannels();
      server.httpServer?.once("listening", patchHotChannels);
      return () => patchHotChannels();
    },
  };
}
const sharedOptimizeDepsInclude = [
  "@heroicons/react/20/solid",
  "@heroicons/react/24/solid",
  "@heroicons/react/24/outline",
  "@headlessui/react",
  "@ffmpeg/ffmpeg",
  "@ffmpeg/util",
  "class-variance-authority",
  "clsx",
  "date-fns",
  "gsap",
  "gsap/ScrollTrigger",
  "jszip",
  "motion/react",
  "react-dropzone",
  "recharts",
  "tailwind-merge",
];

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" }, inspectorPort }),
    suppressCloudflareHotChannelRace(),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  server: {
    hmr: { overlay: false },
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
        ws: true,
        bypass(req) {
          const pathname = new URL(req.url || "/", "http://localhost").pathname;
          return wattTheHackApiPathPattern.test(pathname) ? req.url : undefined;
        },
      },
    },
  },
  environments: {
    ssr: {
      optimizeDeps: {
        include: sharedOptimizeDepsInclude,
      },
    },
  },
  optimizeDeps: {
    include: sharedOptimizeDepsInclude,
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
