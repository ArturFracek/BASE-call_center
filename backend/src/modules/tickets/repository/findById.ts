import { eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { tickets } from "../dbSchema/dbTicketsSchema.js";
import type { TTicket } from "../types/index.js";

export const findById = async (
  id: number
): Promise<TTicket | null> => {
  const rows = await db.select().from(tickets).where(eq(tickets.id, id));
  return rows[0] ?? null;
};
