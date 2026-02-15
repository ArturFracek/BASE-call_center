import { ref, computed, watch } from "vue";
import { STATUS_FILTER_OPTIONS } from "@/modules/tickets/consts";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import type { ITicket, TStatusFilter } from "@/modules/tickets/types";

const DEFAULT_FILTER = STATUS_FILTER_OPTIONS.ALL;

export function useTicketsFilter() {
  const store = useTicketsStore();

  const statusFilter = ref<TStatusFilter>(DEFAULT_FILTER);

  const setStatusFilter = (value: TStatusFilter): void => {
    statusFilter.value = value;
  };

  watch(
    statusFilter,
    (newVal) => {
      store.fetchTickets(
        newVal === DEFAULT_FILTER ? undefined : { status: newVal }
      );
    },
    { immediate: false }
  );

  const tickets = computed<ITicket[]>(() => store.tickets);

  return {
    statusFilter,
    setStatusFilter,
    tickets,
  };
}
