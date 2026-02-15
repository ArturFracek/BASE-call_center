import { ref, computed, watch } from "vue";
import { useTicketsStore } from "@/modules/tickets/stores/ticketsStore";
import type { ITicket, TStatusFilter } from "@/modules/tickets/types";

export function useTicketsFilter() {
  const store = useTicketsStore();

  const statusFilter = ref<TStatusFilter>("all");

  const setStatusFilter = (value: TStatusFilter): void => {
    statusFilter.value = value;
  };

  watch(
    statusFilter,
    (newVal) => {
      store.fetchTickets(
        newVal === "all" ? undefined : { status: newVal }
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
