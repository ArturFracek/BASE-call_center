import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "@/modules/tickets/consts";

export type TTicketStatus = (typeof TICKET_STATUSES)[number];
export type TTicketPriority = (typeof TICKET_PRIORITIES)[number];

export type TStatusFilter = "all" | TTicketStatus;

export interface ITicket {
  id: number;
  customerName: string;
  subject: string;
  description: string;
  priority: TTicketPriority;
  status: TTicketStatus;
  createdAt: string;
}

export interface IFindAllTicketsParams {
  status?: TTicketStatus;
  limit?: number;
  offset?: number;
  search?: string;
}
