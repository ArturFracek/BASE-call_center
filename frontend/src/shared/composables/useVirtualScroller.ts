import type { Ref } from "vue";

export const VIRTUAL_SCROLLER_DEFAULTS = {
  itemSize: 140,
  visibleCount: 5,
  keyField: "id" as const,
  buffer: 200,
} as const;

export interface IUseVirtualScrollerOptions {
  itemSize?: number;
  visibleCount?: number;
  keyField?: string;
  buffer?: number;
}

export interface IScrollToTopRefs {
  scrollerRef: Ref<{ $el?: HTMLElement } | null>;
  wrapRef: Ref<HTMLElement | null>;
}

export const scrollToTop = (refs: IScrollToTopRefs): void => {
  const fromRef =
    refs.scrollerRef.value?.$el ??
    refs.wrapRef.value?.firstElementChild;
  const el = fromRef as HTMLElement | null | undefined;
  if (el?.scrollTo) {
    el.scrollTo({ top: 0, behavior: "smooth" });
  }
};

export const useVirtualScroller = (options: IUseVirtualScrollerOptions = {}) => {
  const {
    itemSize = VIRTUAL_SCROLLER_DEFAULTS.itemSize,
    visibleCount = VIRTUAL_SCROLLER_DEFAULTS.visibleCount,
    keyField = VIRTUAL_SCROLLER_DEFAULTS.keyField,
    buffer = VIRTUAL_SCROLLER_DEFAULTS.buffer,
  } = options;

  const scrollerHeight = itemSize * visibleCount;

  return {
    itemSize,
    keyField,
    buffer,
    scrollerHeight,
    scrollToTop,
  };
};
