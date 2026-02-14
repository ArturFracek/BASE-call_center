import { z } from "zod";

const ticketStatusValues = ["new", "in_progress", "closed"] as const;

export const patchTicketBodySchema = z.object({
  status: z.enum(ticketStatusValues),
});

export type PatchTicketBody = z.infer<typeof patchTicketBodySchema>;
