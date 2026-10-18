import { useSyncExternalStore } from "react";

let owner: string | null = null;
const listeners = new Set<() => void>();
const emit = () => listeners.forEach((fn) => fn());
export function claimArcade(id: string) {
  owner = id;
  emit();
}
export function releaseArcade(id: string) {
  if (owner === id) {
    owner = null;
    emit();
  }
}
export const getArcadeOwner = () => owner;
export function useArcadeOwner() {
  return useSyncExternalStore(
    (fn) => {
      listeners.add(fn);
      return () => {
        listeners.delete(fn);
      };
    },
    getArcadeOwner,
    () => null,
  );
}
export function editableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    !!target.closest("input, textarea, select, [contenteditable='true']")
  );
}
