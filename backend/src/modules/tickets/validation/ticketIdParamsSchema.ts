import { z } from "zod";

export const ticketIdParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
});

export type TicketIdParams = z.infer<typeof ticketIdParamsSchema>;
