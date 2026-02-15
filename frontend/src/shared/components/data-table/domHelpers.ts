export const getElementFromRef = (ref: unknown): HTMLElement | undefined => {
  if (ref == null) return undefined;
  if (ref instanceof HTMLElement) return ref;
  if (typeof ref === "object" && ref !== null && "$el" in ref) {
    const el = (ref as { $el?: unknown }).$el;
    return el instanceof HTMLElement ? el : undefined;
  }
  return undefined;
};

export const setRefByKey = (
  refsMap: Record<string, unknown>,
  key: string | number,
  element: unknown
): void => {
  const keyStr = String(key);
  if (element != null) {
    refsMap[keyStr] = element;
  } else {
    delete refsMap[keyStr];
  }
};

export const temporarilyAddClass = (
  element: HTMLElement,
  className: string,
  durationMs: number
): void => {
  element.classList.add(className);
  window.setTimeout(() => {
    element.classList.remove(className);
  }, durationMs);
};
