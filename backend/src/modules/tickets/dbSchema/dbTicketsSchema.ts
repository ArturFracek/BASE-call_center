import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  index,
} from "drizzle-orm/pg-core";
import { ticketPriorityEnum, ticketStatusEnum } from "./ticketEnums.js";

export const tickets = pgTable(
  "tickets",
  {
    id: serial("id").primaryKey(),
    customerName: varchar("customer_name", { length: 255 }).notNull(),
    subject: varchar("subject", { length: 255 }).notNull(),
    description: text("description").notNull(),
    priority: ticketPriorityEnum("priority").notNull(),
    status: ticketStatusEnum("status").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    statusCreatedAtIdx: index("idx_tickets_status_created_at").on(
      table.status,
      table.createdAt
    ),
  })
);
