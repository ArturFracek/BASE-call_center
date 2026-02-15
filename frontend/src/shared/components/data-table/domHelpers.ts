/**
 * Resolves a template ref to an HTMLElement. Handles both Vue component
 * instances (uses $el) and raw DOM elements.
 */
export function getElementFromRef(ref: unknown): HTMLElement | undefined {
  if (ref == null) return undefined;
  if (ref instanceof HTMLElement) return ref;
  if (typeof ref === "object" && ref !== null && "$el" in ref) {
    const el = (ref as { $el?: unknown }).$el;
    return el instanceof HTMLElement ? el : undefined;
  }
  return undefined;
}

/**
 * Updates a keyed refs map: stores the element when present, removes the key when absent.
 * Used for v-for ref callbacks where Vue may call with the element or with null on unmount.
 */
export function setRefByKey(
  refsMap: Record<string, unknown>,
  key: string | number,
  element: unknown
): void {
  const keyStr = String(key);
  if (element != null) {
    refsMap[keyStr] = element;
  } else {
    delete refsMap[keyStr];
  }
}

/**
 * Adds a CSS class to an element and removes it after the given duration.
 */
export function temporarilyAddClass(
  element: HTMLElement,
  className: string,
  durationMs: number
): void {
  element.classList.add(className);
  window.setTimeout(() => {
    element.classList.remove(className);
  }, durationMs);
}
