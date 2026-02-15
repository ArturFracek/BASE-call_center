import type { ComputedRef, Ref } from "vue";
import { ref, computed, watch } from "vue";
import {
  STATUS_FILTER_OPTIONS,
  TICKET_LIST_PAGE_SIZE,
} from "@/modules/tickets/consts";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import type { ITicket, TStatusFilter } from "@/modules/tickets/types";

const DEFAULT_FILTER = STATUS_FILTER_OPTIONS.ALL;

export type UseTicketsFilterOptions = {
  /** Gdy podany (np. limit dla widoku kart), używany zamiast TICKET_LIST_PAGE_SIZE. */
  limitRef?: Ref<number> | ComputedRef<number>;
};

export const useTicketsFilter = (options?: UseTicketsFilterOptions) => {
  const store = useTicketsStore();

  const statusFilter = ref<TStatusFilter>(DEFAULT_FILTER);
  const page = ref(1);

  const limit = computed(() =>
    options?.limitRef ? options.limitRef.value : TICKET_LIST_PAGE_SIZE
  );

  const setStatusFilter = (
    value: TStatusFilter,
    opts?: { resetPage?: boolean }
  ): void => {
    statusFilter.value = value;
    if (opts?.resetPage !== false) {
      page.value = 1;
    }
  };

  const setPage = (value: number): void => {
    page.value = value;
  };

  watch(
    [statusFilter, page, limit],
    () => {
      const status =
        statusFilter.value === DEFAULT_FILTER
          ? undefined
          : statusFilter.value;
      store.fetchTickets({
        status,
        limit: limit.value,
        offset: (page.value - 1) * limit.value,
      });
    },
    { immediate: true }
  );

  const tickets = computed<ITicket[]>(() => store.tickets);
  const total = computed(() => store.total);

  return {
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    pageSize: limit,
    total,
    tickets,
  };
};
