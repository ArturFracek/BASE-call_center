import { and, eq, ilike, or, sql } from "drizzle-orm";
import { db } from "../../../db/index.js";
import { tickets } from "../dbSchema/dbTicketsSchema.js";
import type { TFindAllTicketsParams } from "../types/index.js";

/** Liczba zgłoszeń spełniających te same kryteria co findAll (status, search). */
export async function findCount(
  params: Pick<TFindAllTicketsParams, "status" | "search">
): Promise<number> {
  const { status, search } = params;

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

  const result = await db
    .select({ count: sql<number>`cast(count(*) as integer)` })
    .from(tickets)
    .where(whereClause);

  return result[0]?.count ?? 0;
}
