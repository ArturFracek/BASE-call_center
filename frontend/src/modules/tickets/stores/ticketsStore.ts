import { defineStore } from "pinia";
import { ticketsService } from "@/modules/tickets/services";
import type { ITicket, TTicketStatus } from "@/modules/tickets/types";

export interface ITicketsState {
  tickets: ITicket[];
  loading: boolean;
}

export const useTicketsStore = defineStore("tickets", {
  state: (): ITicketsState => ({
    tickets: [],
    loading: false,
  }),

  getters: {
    /** Lista zgłoszeń po ostatnim fetchTickets – filtrowanie po stronie backendu (param status). */
    getFilteredTickets(state): ITicket[] {
      return state.tickets;
    },

    getTicketById(state): (id: number) => ITicket | undefined {
      return (id: number) => state.tickets.find((t) => t.id === id);
    },
  },

  actions: {
    async fetchTickets(params?: { status?: TTicketStatus }): Promise<void> {
      this.loading = true;
      try {
        this.tickets = await ticketsService.findAll(
          params?.status ? { status: params.status } : undefined
        );
      } finally {
        this.loading = false;
      }
    },

    async updateTicketStatus(
      id: number,
      status: TTicketStatus
    ): Promise<void> {
      await ticketsService.updateStatus(id, status);
      await this.fetchTickets();
    },
  },
});
