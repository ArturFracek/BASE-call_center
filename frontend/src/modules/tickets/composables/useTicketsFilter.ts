import { ref, computed, watch } from "vue";
import {
  STATUS_FILTER_OPTIONS,
  TICKET_LIST_PAGE_SIZE,
} from "@/modules/tickets/consts";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import type { ITicket, TStatusFilter } from "@/modules/tickets/types";

const DEFAULT_FILTER = STATUS_FILTER_OPTIONS.ALL;

export const useTicketsFilter = () => {
  const store = useTicketsStore();

  const statusFilter = ref<TStatusFilter>(DEFAULT_FILTER);
  const page = ref(1);

  const setStatusFilter = (
    value: TStatusFilter,
    options?: { resetPage?: boolean }
  ): void => {
    statusFilter.value = value;
    if (options?.resetPage !== false) {
      page.value = 1;
    }
  };

  const setPage = (value: number): void => {
    page.value = value;
  };

  watch(
    [statusFilter, page],
    () => {
      const status =
        statusFilter.value === DEFAULT_FILTER
          ? undefined
          : statusFilter.value;
      store.fetchTickets({
        status,
        limit: TICKET_LIST_PAGE_SIZE,
        offset: (page.value - 1) * TICKET_LIST_PAGE_SIZE,
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
    pageSize: TICKET_LIST_PAGE_SIZE,
    total,
    tickets,
  };
};
