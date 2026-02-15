import {
  TICKET_PRIORITIES,
  TICKET_STATUSES,
} from "@/modules/tickets/consts";

export type TicketStatus = (typeof TICKET_STATUSES)[number];
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export type StatusFilter = "all" | TicketStatus;

export interface Ticket {
  id: number;
  customerName: string;
  subject: string;
  description: string;
  priority: TicketPriority;
  status: TicketStatus;
  createdAt: string;
}
