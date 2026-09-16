/** Evaluate at completion so writing added while AI runs is also protected. */
export function hasUpdateWriting(fields: {
  summary?: string; highlights?: string; challenges?: string;
  learnings?: string; next30Days?: string; asks?: string;
}): boolean {
  return Object.values(fields).some(value => Boolean(value?.trim()));
}
