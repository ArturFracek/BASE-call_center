import { pgEnum } from "drizzle-orm/pg-core";

export const ticketPriorityEnum = pgEnum("ticket_priority", [
  "low",
  "medium",
  "high",
]);

export const ticketStatusEnum = pgEnum("ticket_status", [
  "new",
  "in_progress",
  "closed",
]);
