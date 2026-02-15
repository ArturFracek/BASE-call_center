import { ValidationError } from "../../../errors/index.js";
import { findAll } from "../repository/index.js";
import type { TTicket } from "../types/index.js";
import { getTicketsQuerySchema } from "../validation/getTicketsQuerySchema.js";

export async function getTickets(query: unknown): Promise<TTicket[]> {
  const parsed = getTicketsQuerySchema.safeParse(query);
  if (!parsed.success) {
    throw new ValidationError("Invalid query", parsed.error);
  }
  const { status, limit, offset, search } = parsed.data;
  const params = {
    status,
    limit,
    offset,
    ...(search?.trim() && { search: search.trim() }),
  };
  return findAll(params);
}
