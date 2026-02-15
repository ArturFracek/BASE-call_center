import { defineStore } from "pinia";
import { ticketsService } from "@/modules/tickets/services";
import type { ITicket, TTicketStatus } from "@/modules/tickets/types";

const DEFAULT_PAGE_SIZE = 10;

export interface ITicketsState {
  tickets: ITicket[];
  total: number;
  loading: boolean;
  /** Ostatnie parametry fetch (do ponownego żądania np. po update statusu). */
  lastFetchParams: IFetchTicketsParams;
}

export interface IFetchTicketsParams {
  status?: TTicketStatus;
  limit?: number;
  offset?: number;
}

export const useTicketsStore = defineStore("tickets", {
  state: (): ITicketsState => ({
    tickets: [],
    total: 0,
    loading: false,
    lastFetchParams: { limit: DEFAULT_PAGE_SIZE, offset: 0 },
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
    async fetchTickets(params?: IFetchTicketsParams): Promise<void> {
      const merged = {
        limit: DEFAULT_PAGE_SIZE,
        offset: 0,
        ...this.lastFetchParams,
        ...params,
      };
      this.lastFetchParams = merged;
      this.loading = true;
      try {
        const result = await ticketsService.findAll(merged);
        this.tickets = result.data;
        this.total = result.total;
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
