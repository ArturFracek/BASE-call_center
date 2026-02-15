export const VIRTUAL_SCROLLER_DEFAULTS = {
  itemSize: 140,
  visibleCount: 5,
  keyField: "id" as const,
  buffer: 200,
} as const;

export interface UseVirtualScrollerOptions {
  itemSize?: number;
  visibleCount?: number;
  keyField?: string;
  buffer?: number;
}

export const useVirtualScroller = (options: UseVirtualScrollerOptions = {}) => {
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
  };
};
