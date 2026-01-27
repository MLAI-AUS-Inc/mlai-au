import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
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

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" }, configPath: "./wrangler.dev.jsonc" }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  /* server: {
    proxy: {
      '/api': {
        target: 'http://localhost',
        changeOrigin: true,
        secure: false,
        ws: true,
      },
    },
  }, */
  optimizeDeps: {
    include: [
      "@heroicons/react/20/solid",
      "@heroicons/react/24/solid",
      "@heroicons/react/24/outline",
      "@headlessui/react",
      "class-variance-authority",
      "clsx",
      "tailwind-merge",
    ],
  },
  resolve: {
    dedupe: ["react", "react-dom"],
  },
});
