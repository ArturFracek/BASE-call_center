import type { InferSelectModel } from "drizzle-orm";
import type { tickets } from "../dbSchema/dbTicketsSchema.js";

export type TTicket = InferSelectModel<typeof tickets>;

export type TTicketStatus = TTicket["status"];

export type TFindAllTicketsParams = {
  status?: TTicketStatus;
  limit: number;
  offset: number;
  search?: string;
};
