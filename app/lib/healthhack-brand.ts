export const HEALTHHACK_BRAND = {
  name: "HealthHack",
  organizerLine: "UNSW No Code Society × MLAI",
  tagline: "Build the hospital you’d actually want.",
  assets: {
    mark: "/healthhack/brand/healthhack-mark.png",
    wordmark: "/healthhack/brand/healthhack-wordmark.png",
    ncs: "/healthhack/brand/unsw-ncs.png",
  },
  routes: {
    app: "/hospital/app",
    infoPack: "/healthhack",
  },
  kaggle: {
    competition: "https://www.kaggle.com/competitions/health-hack-sydney",
    data: "https://www.kaggle.com/competitions/health-hack-sydney/data",
  },
  ticketsUrl: "https://luma.com/mlai-8obe",
} as const;
