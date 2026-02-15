import { ref, computed, watch } from "vue";
import { STATUS_FILTER_OPTIONS } from "@/modules/tickets/consts";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import type { ITicket, TStatusFilter } from "@/modules/tickets/types";

const DEFAULT_FILTER = STATUS_FILTER_OPTIONS.ALL;
const PAGE_SIZE = 10;

export function useTicketsFilter() {
  const store = useTicketsStore();

  const statusFilter = ref<TStatusFilter>(DEFAULT_FILTER);
  const page = ref(1);

  const setStatusFilter = (value: TStatusFilter): void => {
    statusFilter.value = value;
    page.value = 1;
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
        limit: PAGE_SIZE,
        offset: (page.value - 1) * PAGE_SIZE,
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
    pageSize: PAGE_SIZE,
    total,
    tickets,
  };
}
