import { NotFoundError } from "../../../errors/index.js";
import { parseTicketId } from "../helpers/parseTicketId.js";
import { findById } from "../repository/index.js";
import type { TTicket } from "../types/index.js";

export async function getTicketById(
  idParam: string | string[] | undefined
): Promise<TTicket> {
  const id = parseTicketId(idParam);
  const ticket = await findById(id);
  if (!ticket) {
    throw new NotFoundError("Ticket not found", "Ticket");
  }
  return ticket;
}
