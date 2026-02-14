import { and, desc, eq, ilike, or } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { tickets } from "../dbSchema/dbTicketsSchema.js";
import type { Ticket, FindAllTicketsParams } from "../types/index.js";

export async function findAll(
  params: FindAllTicketsParams
): Promise<Ticket[]> {
  const { status, limit, offset, search } = params;

  const conditions = [];
  if (status) conditions.push(eq(tickets.status, status));
  if (search) {
    const pattern = `%${search}%`;
    conditions.push(
      or(
        ilike(tickets.customerName, pattern),
        ilike(tickets.subject, pattern),
        ilike(tickets.description, pattern)
      )!
    );
  }

  const whereClause =
    conditions.length > 0 ? and(...conditions) : undefined;

  return db
    .select()
    .from(tickets)
    .where(whereClause)
    .orderBy(desc(tickets.createdAt))
    .limit(limit)
    .offset(offset);
}
