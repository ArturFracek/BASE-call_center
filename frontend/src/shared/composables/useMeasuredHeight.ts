import type { Ref } from "vue";
import { onUnmounted, ref, watch } from "vue";

export interface IUseMeasuredHeightOptions {
  when?: () => boolean;
  fallbackHeight?: number;
}

const DEFAULT_FALLBACK = 0;

export const useMeasuredHeight = (
  elementRef: Ref<HTMLElement | null>,
  options: IUseMeasuredHeightOptions = {}
): { heightPx: Ref<number> } => {
  const { when, fallbackHeight = DEFAULT_FALLBACK } = options;
  const heightPx = ref(0);
  let observer: ResizeObserver | null = null;

  const setHeightFromElement = (el: HTMLElement): void => {
    const h = el.clientHeight;
    heightPx.value = h > 0 ? h : fallbackHeight;
  };

  const disconnect = (): void => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }
    heightPx.value = 0;
  };

  watch(
    () => (when?.() ?? true) ? elementRef.value : null,
    (el) => {
      disconnect();
      if (!el) return;
      setHeightFromElement(el);
      observer = new ResizeObserver(() => setHeightFromElement(el));
      observer.observe(el);
    },
    { immediate: true, flush: "post" }
  );

  onUnmounted(disconnect);

  return { heightPx };
};
