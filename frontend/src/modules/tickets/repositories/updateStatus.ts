import { api } from "@api";
import type { ITicket, TTicketStatus } from "@/modules/tickets/types";
import { TICKETS_BASE } from "./base";

export const updateStatusPath = (id: number) => `${TICKETS_BASE}/${id}`;
export type TUpdateStatusResponse = ITicket;

export const updateStatus = (id: number, status: TTicketStatus) =>
  api.patch<TUpdateStatusResponse>(updateStatusPath(id), { status });
