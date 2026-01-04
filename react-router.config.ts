import type { Config } from "@react-router/dev/config";

export default {
  ssr: true,
  future: {
    ...(process.env.CI
      ? { v8_viteEnvironmentApi: true }
      : { unstable_viteEnvironmentApi: true }),
  },
} satisfies Config;
