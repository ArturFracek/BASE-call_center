import { eq } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { tickets } from "../dbSchema/dbTicketsSchema.js";
import type { Ticket } from "../types/index.js";

export async function findById(id: number): Promise<Ticket | null> {
  const rows = await db.select().from(tickets).where(eq(tickets.id, id));
  return rows[0] ?? null;
}
