import { and, asc, eq, ilike, or } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { tickets } from "../dbSchema/dbTicketsSchema.js";
import type { TTicket, TFindAllTicketsParams } from "../types/index.js";

export const findAll = async (
  params: TFindAllTicketsParams
): Promise<TTicket[]> => {
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
    .orderBy(asc(tickets.id))
    .limit(limit)
    .offset(offset);
};
