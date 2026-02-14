import { NotFoundError, ValidationError } from "../../../errors/index.js";
import { parseTicketId } from "../helpers/parseTicketId.js";
import { updateStatus } from "../repository/index.js";
import type { Ticket } from "../types/index.js";
import { patchTicketBodySchema } from "../validation/patchTicketSchema.js";

export async function patchTicketStatus(
  idParam: string | string[] | undefined,
  body: unknown
): Promise<Ticket> {
  const id = parseTicketId(idParam);
  const parsed = patchTicketBodySchema.safeParse(body);
  if (!parsed.success) {
    throw new ValidationError("Invalid body", parsed.error);
  }
  const { status } = parsed.data;
  const ticket = await updateStatus(id, status);
  if (!ticket) {
    throw new NotFoundError("Ticket not found", "Ticket");
  }
  return ticket;
}
