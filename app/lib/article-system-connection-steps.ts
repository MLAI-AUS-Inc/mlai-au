export type ArticleSystemConnectionStepId = "connect" | "scan" | "chooseLocation" | "buildSetup";

export type ArticleSystemConnectionStepStatus = "active" | "blocked" | "complete" | "locked";

export type ArticleSystemConnectionStepState = {
  id: ArticleSystemConnectionStepId;
  status: ArticleSystemConnectionStepStatus;
  defaultExpanded: boolean;
  disabled: boolean;
  unavailableReason: string;
};

export type ArticleSystemConnectionStepInput = {
  connected: boolean;
  currentScanRunId?: string | null;
  scanLoading?: boolean;
  scanRunning?: boolean;
  scanFailed?: boolean;
  scanStale?: boolean;
  inventoryReady?: boolean;
  setupTargetReady?: boolean;
  selectedSurfaceUrl?: string | null;
};

export function articleSystemConnectionStepStates(input: ArticleSystemConnectionStepInput): Record<ArticleSystemConnectionStepId, ArticleSystemConnectionStepState> {
  const hasScanRun = Boolean(input.currentScanRunId?.trim());
  const hasSelectedSurface = Boolean(input.selectedSurfaceUrl?.trim());
  const scanLoadingOrRunning = Boolean(input.scanLoading || input.scanRunning || (hasScanRun && !input.inventoryReady && !input.setupTargetReady && !input.scanFailed && !input.scanStale));
  const scanBlocked = Boolean(input.scanFailed || input.scanStale);

  const connect: ArticleSystemConnectionStepState = input.connected
    ? {
        id: "connect",
        status: "complete",
        defaultExpanded: true,
        disabled: false,
        unavailableReason: "",
      }
    : {
        id: "connect",
        status: "active",
        defaultExpanded: true,
        disabled: false,
        unavailableReason: "",
      };

  let scan: ArticleSystemConnectionStepState;
  if (!input.connected) {
    scan = {
      id: "scan",
      status: "locked",
      defaultExpanded: false,
      disabled: true,
      unavailableReason: "Connect GitHub before running the repository scan.",
    };
  } else if (scanBlocked) {
    scan = {
      id: "scan",
      status: "blocked",
      defaultExpanded: true,
      disabled: false,
      unavailableReason: "",
    };
  } else if (scanLoadingOrRunning) {
    scan = {
      id: "scan",
      status: "active",
      defaultExpanded: true,
      disabled: false,
      unavailableReason: "",
    };
  } else if (input.inventoryReady || input.setupTargetReady) {
    scan = {
      id: "scan",
      status: "complete",
      defaultExpanded: true,
      disabled: false,
      unavailableReason: "",
    };
  } else {
    scan = {
      id: "scan",
      status: "locked",
      defaultExpanded: false,
      disabled: true,
      unavailableReason: "Start the repository scan from step 1 to see progress here.",
    };
  }

  let chooseLocation: ArticleSystemConnectionStepState;
  if (!input.connected) {
    chooseLocation = {
      id: "chooseLocation",
      status: "locked",
      defaultExpanded: false,
      disabled: true,
      unavailableReason: "Connect GitHub and complete the repository scan before choosing a location.",
    };
  } else if (input.setupTargetReady || hasSelectedSurface) {
    chooseLocation = {
      id: "chooseLocation",
      status: "complete",
      defaultExpanded: Boolean(input.inventoryReady && hasSelectedSurface),
      disabled: false,
      unavailableReason: "",
    };
  } else if (input.inventoryReady) {
    chooseLocation = {
      id: "chooseLocation",
      status: "active",
      defaultExpanded: true,
      disabled: false,
      unavailableReason: "",
    };
  } else {
    chooseLocation = {
      id: "chooseLocation",
      status: "locked",
      defaultExpanded: false,
      disabled: true,
      unavailableReason: scanBlocked
        ? "Resolve the repository scan issue before choosing an articles/blogs location."
        : "Location choices appear after the repository scan completes.",
    };
  }

  const buildSetup: ArticleSystemConnectionStepState = input.connected && (input.setupTargetReady || hasSelectedSurface)
    ? {
        id: "buildSetup",
        status: "active",
        defaultExpanded: true,
        disabled: false,
        unavailableReason: "",
      }
    : {
        id: "buildSetup",
        status: "locked",
        defaultExpanded: false,
        disabled: true,
        unavailableReason: input.connected
          ? "Choose an articles/blogs location before building the setup preview."
          : "Connect GitHub and choose an articles/blogs location before building the setup preview.",
      };

  return {
    connect,
    scan,
    chooseLocation,
    buildSetup,
  };
}
