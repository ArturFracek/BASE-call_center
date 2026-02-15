import { z } from "zod";

const statusValues = ["new", "in_progress", "closed"] as const;

const DEFAULT_LIMIT = 50;
const MAX_LIMIT = 100;

export const getTicketsQuerySchema = z.object({
  status: z.enum(statusValues).optional(),
  limit: z.coerce.number().int().min(1).max(MAX_LIMIT).default(DEFAULT_LIMIT),
  offset: z.coerce.number().int().min(0).default(0),
  search: z.string().optional(),
});

export type TGetTicketsQuery = z.infer<typeof getTicketsQuerySchema>;
