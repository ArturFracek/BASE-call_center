import { defineStore } from "pinia";
import { TICKET_LIST_PAGE_SIZE } from "@/modules/tickets/consts";
import { ticketsService } from "@/modules/tickets/services";
import type { ITicket, TTicketStatus } from "@/modules/tickets/types";
import type { ICountsByStatus } from "@/modules/tickets/repositories";

export interface ITicketsState {
  tickets: ITicket[];
  total: number;
  loading: boolean;
  lastFetchParams: IFetchTicketsParams;
  countsByStatus: ICountsByStatus | null;
  currentTicket: ITicket | null;
  currentTicketLoading: boolean;
  currentTicketNotFound: boolean;
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
    lastFetchParams: { limit: TICKET_LIST_PAGE_SIZE, offset: 0 },
    countsByStatus: null,
    currentTicket: null,
    currentTicketLoading: false,
    currentTicketNotFound: false,
  }),

  getters: {
    getFilteredTickets: (state): ITicket[] => state.tickets,

    getTicketById: (state): (id: number) => ITicket | undefined =>
      (id: number) => state.tickets.find((t) => t.id === id),
  },

  actions: {
    async fetchTickets(params?: IFetchTicketsParams): Promise<void> {
      const merged = {
        limit: TICKET_LIST_PAGE_SIZE,
        offset: 0,
        ...this.lastFetchParams,
        ...params,
      };
      this.lastFetchParams = merged;
      this.loading = true;
      try {
        const [result, counts] = await Promise.all([
          ticketsService.findAll(merged),
          ticketsService.findCounts(),
        ]);
        this.tickets = result.data;
        this.total = result.total;
        this.countsByStatus = counts;
      } finally {
        this.loading = false;
      }
    },

    async fetchCounts(): Promise<void> {
      const counts = await ticketsService.findCounts();
      this.countsByStatus = counts;
    },

    async updateTicketStatus(
      id: number,
      status: TTicketStatus
    ): Promise<void> {
      await ticketsService.updateStatus(id, status);
      await this.fetchTickets();
    },

    async fetchTicketById(id: number): Promise<void> {
      if (!Number.isInteger(id) || id < 1) {
        this.currentTicketNotFound = true;
        this.currentTicketLoading = false;
        this.currentTicket = null;
        return;
      }

      this.currentTicketLoading = true;
      this.currentTicketNotFound = false;
      this.currentTicket = null;

      const data = await ticketsService.findById(id);
      this.currentTicketLoading = false;

      if (!data) {
        this.currentTicketNotFound = true;
        return;
      }

      this.currentTicket = data;
    },
  },
});
