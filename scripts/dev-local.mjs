import { spawn } from "node:child_process";
import { mkdirSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(scriptDir, "..");

const ensureDir = (dirPath) => {
  mkdirSync(dirPath, { recursive: true });
  return dirPath;
};

const localState = {
  XDG_CONFIG_HOME: ".local/xdg-config",
  XDG_DATA_HOME: ".local/xdg-data",
  XDG_STATE_HOME: ".local/xdg-state",
  XDG_CACHE_HOME: ".local/xdg-cache",
  WRANGLER_REGISTRY_PATH: ".local/wrangler-registry",
};

for (const [envName, relativeDir] of Object.entries(localState)) {
  const resolvedDir = process.env[envName]
    ? path.resolve(process.env[envName])
    : path.join(rootDir, relativeDir);

  process.env[envName] = ensureDir(resolvedDir);
}

if (!process.env.WRANGLER_SEND_METRICS) {
  process.env.WRANGLER_SEND_METRICS = "false";
}

const reactRouterBin = path.join(
  rootDir,
  "node_modules",
  "@react-router",
  "dev",
  "bin.js",
);

const child = spawn(process.execPath, [reactRouterBin, "dev", ...process.argv.slice(2)], {
  cwd: rootDir,
  env: process.env,
  stdio: "inherit",
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }

  process.exit(code ?? 0);
});

child.on("error", (error) => {
  console.error("Failed to start the local dev server:", error);
  process.exit(1);
});
