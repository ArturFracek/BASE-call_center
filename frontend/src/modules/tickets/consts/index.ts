export const TICKET_LIST_PAGE_SIZE = 10;
/** Limit dla widoku kart (RecycleScroller) – jeden fetch, bez paginacji. */
export const TICKET_LIST_CARDS_LIMIT = 100;

export const TICKET_STATUSES = ["new", "in_progress", "closed"] as const;

export const TICKET_PRIORITIES = ["low", "medium", "high"] as const;

export const STATUS_FILTER_OPTIONS = {
    ALL: "all",
    NEW: "new",
    IN_PROGRESS: "in_progress",
    CLOSED: "closed",
} as const;


export const STATUS_FILTER_OPTIONS_LIST = [
    STATUS_FILTER_OPTIONS.ALL,
    STATUS_FILTER_OPTIONS.NEW,
    STATUS_FILTER_OPTIONS.IN_PROGRESS,
    STATUS_FILTER_OPTIONS.CLOSED,
] as const;
