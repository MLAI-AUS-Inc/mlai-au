import { useCallback, useEffect, useMemo, useRef, useState } from "react";

type FormDataLike = {
  get(name: string): FormDataEntryValue | null;
} | null | undefined;

type PendingAction = {
  key: string;
  clearSignal: string;
  startedAt: number;
};

type UseMarketingActionPendingOptions = {
  navigationState: string;
  navigationFormData?: FormDataLike;
  clearSignal: string;
  errorKey?: string | null;
};

function formDataString(formData: FormDataLike, key: string) {
  const value = formData?.get(key);
  return typeof value === "string" ? value.trim() : "";
}

function baseActionKey(key: string) {
  return key.split(":")[0] ?? key;
}

function actionKeysMatch(candidate: string | null | undefined, target: string) {
  if (!candidate) return false;
  if (candidate === target) return true;
  return !target.includes(":") && baseActionKey(candidate) === target;
}

export function marketingActionKeyFromFormData(formData: FormDataLike) {
  const intent = formDataString(formData, "intent");
  const nextAction = formDataString(formData, "nextAction");
  if (intent && nextAction) return `${intent}:${nextAction}`;
  return intent || nextAction || null;
}

export function useMarketingActionPending({
  navigationState,
  navigationFormData,
  clearSignal,
  errorKey,
}: UseMarketingActionPendingOptions) {
  const [pending, setPending] = useState<PendingAction | null>(null);
  const clearSignalRef = useRef(clearSignal);
  const navigationKey = navigationState !== "idle" ? marketingActionKeyFromFormData(navigationFormData) : null;

  useEffect(() => {
    clearSignalRef.current = clearSignal;
  }, [clearSignal]);

  useEffect(() => {
    if (!navigationKey) return;
    setPending((current) =>
      current?.key === navigationKey
        ? current
        : {
            key: navigationKey,
            clearSignal: clearSignalRef.current,
            startedAt: Date.now(),
          },
    );
  }, [navigationKey]);

  useEffect(() => {
    if (!pending || navigationState !== "idle") return;
    if (errorKey && actionKeysMatch(pending.key, errorKey)) {
      setPending(null);
      return;
    }
    if (clearSignal !== pending.clearSignal) {
      setPending(null);
    }
  }, [clearSignal, errorKey, navigationState, pending]);

  const activeKey = navigationKey ?? pending?.key ?? null;
  const isPending = useCallback(
    (...keys: string[]) => keys.some((key) => actionKeysMatch(activeKey, key)),
    [activeKey],
  );

  return useMemo(
    () => ({
      activeKey,
      isAnyPending: Boolean(activeKey),
      isPending,
      clearPending: () => setPending(null),
      pendingStartedAt: pending?.startedAt ?? null,
    }),
    [activeKey, isPending, pending?.startedAt],
  );
}
