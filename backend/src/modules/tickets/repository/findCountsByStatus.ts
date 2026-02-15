import { db } from "../../../db/index.js";
import { tickets } from "../dbSchema/dbTicketsSchema.js";
import { sql } from "drizzle-orm";

export interface ICountsByStatus {
  new: number;
  in_progress: number;
  closed: number;
  all: number;
}

export const findCountsByStatus = async (): Promise<ICountsByStatus> => {
  const rows = await db
    .select({
      status: tickets.status,
      count: sql<number>`cast(count(*) as integer)`,
    })
    .from(tickets)
    .groupBy(tickets.status);

  const counts: ICountsByStatus = {
    new: 0,
    in_progress: 0,
    closed: 0,
    all: 0,
  };

  for (const row of rows) {
    const status = row.status as keyof Omit<ICountsByStatus, "all">;
    if (status in counts) {
      counts[status] = row.count;
    }
    counts.all += row.count;
  }

  return counts;
};
