import { ValidationError } from "../../../errors/index.js";
import { findCount, findAll } from "../repository/index.js";
import type { TTicket } from "../types/index.js";
import { getTicketsQuerySchema } from "../validation/getTicketsQuerySchema.js";

export interface GetTicketsResult {
  data: TTicket[];
  total: number;
}

export async function getTickets(query: unknown): Promise<GetTicketsResult> {
  const parsed = getTicketsQuerySchema.safeParse(query);
  if (!parsed.success) {
    throw new ValidationError("Invalid query", parsed.error);
  }
  const { status, limit, offset, search } = parsed.data;
  const searchTrimmed = search?.trim();
  const params = {
    status,
    limit,
    offset,
    ...(searchTrimmed && { search: searchTrimmed }),
  };

  const [data, total] = await Promise.all([
    findAll(params),
    findCount({ status, ...(searchTrimmed && { search: searchTrimmed }) }),
  ]);

  return { data, total };
}
