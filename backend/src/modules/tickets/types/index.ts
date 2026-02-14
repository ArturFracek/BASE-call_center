import type { InferSelectModel } from "drizzle-orm";
import type { tickets } from "../dbSchema/dbTicketsSchema.js";

export type Ticket = InferSelectModel<typeof tickets>;

export type TicketStatus = Ticket["status"];

export type FindAllTicketsParams = {
  status?: TicketStatus;
  limit: number;
  offset: number;
  search?: string;
};
