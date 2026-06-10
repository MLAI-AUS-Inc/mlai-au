export type ArticleSystemConnectionStepId = "connect" | "scan" | "chooseLocation" | "buildSetup";

export type ArticleSystemConnectionStepStatus = "active" | "blocked" | "complete" | "locked";

export type ArticleSystemScaffoldStatus =
  | "not_ready"
  | "ready_to_build"
  | "building"
  | "review_ready"
  | "publish_ready"
  | "verifying"
  | "ready"
  | "legacy_ready"
  | "failed";

export type ArticleSystemConnectionStepState = {
  id: ArticleSystemConnectionStepId;
  status: ArticleSystemConnectionStepStatus;
  defaultExpanded: boolean;
  disabled: boolean;
  unavailableReason: string;
  attention?: boolean;
  attentionLabel?: string;
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
  persistedSetupIsStale?: boolean;
  selectedSurfaceUrl?: string | null;
  scaffoldStatus?: ArticleSystemScaffoldStatus;
  setupSurfaceUrl?: string | null;
};

export function articleSystemScaffoldActionLabel(status: ArticleSystemScaffoldStatus) {
  if (status === "ready_to_build") return "Build articles scaffold";
  if (status === "building") return "Open setup build";
  if (status === "review_ready") return "Review setup preview";
  if (status === "publish_ready") return "Finish setup PR";
  if (status === "verifying") return "Verifying merged scaffold...";
  if (status === "ready" || status === "legacy_ready") return "Continue to topic research";
  if (status === "failed") return "Open setup build";
  return "Choose articles route first";
}

export function articleSystemConnectionStepStates(input: ArticleSystemConnectionStepInput): Record<ArticleSystemConnectionStepId, ArticleSystemConnectionStepState> {
  const hasScanRun = Boolean(input.currentScanRunId?.trim());
  const hasSelectedSurface = Boolean(input.selectedSurfaceUrl?.trim());
  const hasSetupSurface = Boolean(input.setupSurfaceUrl?.trim());
  const persistedSetupIsStale = Boolean(input.persistedSetupIsStale && input.setupTargetReady);
  const scanLoadingOrRunning = Boolean(input.scanLoading || input.scanRunning || (hasScanRun && !input.inventoryReady && !input.setupTargetReady && !input.scanFailed && !input.scanStale));
  const scanBlocked = Boolean(input.scanFailed || input.scanStale);
  const hasSetupTarget = Boolean(input.setupTargetReady || hasSelectedSurface);
  const staleSetupAttention = persistedSetupIsStale
    ? {
        attention: true,
        attentionLabel: "Saved setup needs refresh",
      }
    : {};

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
      defaultExpanded: Boolean(
        (input.inventoryReady && hasSelectedSurface) ||
          (input.setupTargetReady && (!input.inventoryReady || !hasSetupSurface || persistedSetupIsStale)),
      ),
      disabled: false,
      unavailableReason: "",
      ...staleSetupAttention,
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

  let buildSetup: ArticleSystemConnectionStepState;
  if (!input.connected || !hasSetupTarget || input.scaffoldStatus === "not_ready") {
    buildSetup = {
      id: "buildSetup",
      status: "locked",
      defaultExpanded: false,
      disabled: true,
      unavailableReason: input.connected
        ? "Choose an articles/blogs location before building the setup preview."
        : "Connect GitHub and choose an articles/blogs location before building the setup preview.",
    };
  } else if (input.scaffoldStatus === "ready" || input.scaffoldStatus === "legacy_ready") {
    buildSetup = {
      id: "buildSetup",
      status: "complete",
      defaultExpanded: true,
      disabled: false,
      unavailableReason: "",
      ...staleSetupAttention,
    };
  } else if (input.scaffoldStatus === "failed") {
    buildSetup = {
      id: "buildSetup",
      status: "blocked",
      defaultExpanded: true,
      disabled: false,
      unavailableReason: "",
      ...staleSetupAttention,
    };
  } else {
    buildSetup = {
      id: "buildSetup",
      status: "active",
      defaultExpanded: true,
      disabled: false,
      unavailableReason: "",
      ...staleSetupAttention,
    };
  }

  return {
    connect,
    scan,
    chooseLocation,
    buildSetup,
  };
}
