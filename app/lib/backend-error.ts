type BackendErrorOptions = {
  fallback?: string;
  fieldLabels?: Record<string, string>;
};

const DEFAULT_BACKEND_ERROR = "That action could not be completed.";

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function looksLikeHtml(value: string) {
  const normalized = value.trim().toLowerCase();
  return (
    normalized.startsWith("<!doctype html") ||
    normalized.startsWith("<html") ||
    (normalized.startsWith("<") && normalized.includes("</html>")) ||
    normalized.includes("<title>") ||
    normalized.includes("<body")
  );
}

function cleanMessage(value: unknown): string | null {
  if (typeof value !== "string") return null;
  const message = value.trim();
  if (!message || looksLikeHtml(message)) return null;
  return message;
}

function messagesFromValue(value: unknown) {
  const values = Array.isArray(value) ? value : [value];
  return values.map(cleanMessage).filter((message): message is string => Boolean(message));
}

function labelField(field: string, labels?: Record<string, string>) {
  return labels?.[field] ?? field.replace(/_/g, " ");
}

function responseDataFromError(error: unknown) {
  const payload = error as { data?: unknown; response?: { data?: unknown } } | null | undefined;
  return payload?.data ?? payload?.response?.data;
}

export function readableBackendErrors(error: unknown, options: BackendErrorOptions = {}) {
  const fallback = options.fallback ?? DEFAULT_BACKEND_ERROR;
  const data = responseDataFromError(error);

  if (typeof data === "string") {
    const message = cleanMessage(data);
    return message ? [message] : [fallback];
  }

  if (isRecord(data)) {
    const explicitErrors = messagesFromValue(data.errors);
    if (explicitErrors.length > 0) return explicitErrors;

    for (const key of ["detail", "error", "message"]) {
      const messages = messagesFromValue(data[key]);
      if (messages.length > 0) return messages;
    }

    const fieldMessages = Object.entries(data)
      .flatMap(([field, value]) =>
        messagesFromValue(value).map((message) => `${labelField(field, options.fieldLabels)}: ${message}`),
      )
      .filter(Boolean);
    if (fieldMessages.length > 0) return fieldMessages;
  }

  const responsePresent = Boolean((error as { response?: unknown } | null | undefined)?.response);
  if (!responsePresent) {
    const message = cleanMessage((error as { message?: unknown } | null | undefined)?.message);
    if (message) return [message];
  }

  return [fallback];
}

export function readableBackendError(error: unknown, options: BackendErrorOptions = {}) {
  return readableBackendErrors(error, options)[0] ?? options.fallback ?? DEFAULT_BACKEND_ERROR;
}
