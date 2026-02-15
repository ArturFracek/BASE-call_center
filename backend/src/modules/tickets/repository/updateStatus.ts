import { eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { tickets } from "../dbSchema/dbTicketsSchema.js";
import type { TTicket, TTicketStatus } from "../types/index.js";

export const updateStatus = async (
  id: number,
  status: TTicketStatus
): Promise<TTicket | null> => {
  const rows = await db
    .update(tickets)
    .set({ status })
    .where(eq(tickets.id, id))
    .returning();
  return rows[0] ?? null;
};
