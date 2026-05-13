function isEnabled(value: string | undefined) {
  return String(value || "").toLowerCase() === "true";
}

export function isFounderToolsDiscoverEnabled() {
  return isEnabled(import.meta.env.VITE_ENABLE_FOUNDER_TOOLS_DISCOVER);
}

export { isEnabled as isFounderToolsPreviewFlagEnabled };
