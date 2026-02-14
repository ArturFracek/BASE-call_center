import { ValidationError } from "../../../errors/index.js";
import { ticketIdParamsSchema } from "../validation/ticketIdParamsSchema.js";

export function parseTicketId(
  idParam: string | string[] | undefined
): number {
  const str = Array.isArray(idParam) ? idParam[0] : idParam;
  const parsed = ticketIdParamsSchema.safeParse({ id: str });
  if (!parsed.success) {
    throw new ValidationError("Invalid ticket id", parsed.error);
  }
  return parsed.data.id;
}
