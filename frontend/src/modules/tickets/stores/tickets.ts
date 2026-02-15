import { defineStore } from "pinia";
import { i18n } from "@/plugins/i18n";
import {
  findAll as findAllTickets,
  updateStatus as updateTicketStatusApi,
} from "@/modules/tickets/services";
import type {
  ITicket,
  TTicketStatus,
  TStatusFilter,
} from "@/modules/tickets/types";

export interface ITicketsState {
  tickets: ITicket[];
  loading: boolean;
  error: string | null;
}

export const useTicketsStore = defineStore("tickets", {
  state: (): ITicketsState => ({
    tickets: [],
    loading: false,
    error: null,
  }),

  getters: {
    getTicketsFilteredByStatus(
      state
    ): (filter: TStatusFilter) => ITicket[] {
      return (filter: TStatusFilter) => {
        if (filter === "all") return state.tickets;
        return state.tickets.filter((t) => t.status === filter);
      };
    },

    getTicketById(state): (id: number) => ITicket | undefined {
      return (id: number) =>
        state.tickets.find((t) => t.id === id);
    },
  },

  actions: {
    async fetchTickets(params?: { status?: TTicketStatus }): Promise<void> {
      this.loading = true;
      this.error = null;
      try {
        const data = await findAllTickets(
          params?.status ? { status: params.status } : undefined
        );
        this.tickets = data;
      } catch (err) {
        this.error =
          err instanceof Error
            ? err.message
            : i18n.global.t("tickets.messages.fetchError");
        this.tickets = [];
      } finally {
        this.loading = false;
      }
    },

    async updateTicketStatus(
      id: number,
      status: TTicketStatus
    ): Promise<void> {
      this.error = null;
      try {
        const data = await updateTicketStatusApi(id, status);
        const index = this.tickets.findIndex((t) => t.id === id);
        if (index !== -1) {
          this.tickets = [
            ...this.tickets.slice(0, index),
            data,
            ...this.tickets.slice(index + 1),
          ];
        }
      } catch (err) {
        this.error =
          err instanceof Error
            ? err.message
            : i18n.global.t("tickets.messages.updateError");
        throw err;
      }
    },
  },
});
