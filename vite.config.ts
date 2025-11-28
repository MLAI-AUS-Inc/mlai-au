import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import fs from "node:fs";

// Load .dev.vars into process.env
try {
  const devVars = fs.readFileSync(".dev.vars", "utf-8");
  devVars.split("\n").forEach((line) => {
    const [key, value] = line.split("=");
    if (key && value) {
      process.env[key.trim()] = value.trim().replace(/^"|"$/g, "");
    }
  });
} catch (e) {
  console.warn("Failed to load .dev.vars", e);
}

export default defineConfig({
  plugins: [
    reactRouter(),
    cloudflare({
      viteEnvironment: { name: "ssr" },
      configPath: "./wrangler.jsonc",
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:80',
        changeOrigin: true,
        secure: false,
        ws: true, // Handle websockets
      },
    },
  },
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
