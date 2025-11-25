import { reactRouter } from "@react-router/dev/vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [
    cloudflare({ viteEnvironment: { name: "ssr" } }),
    tailwindcss(),
    reactRouter(),
    tsconfigPaths(),
  ],
  // server: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:80',
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true, // Handle websockets
  //     },
  //   },
  // },
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
