export { findAll } from "./findAll";
export { findById } from "./findById";
export { updateStatus } from "./updateStatus";
export { ticketRepository } from "@/modules/tickets/repositories";

import { findAll } from "./findAll";
import { findById } from "./findById";
import { updateStatus } from "./updateStatus";
import { ticketRepository } from "@/modules/tickets/repositories";

export const ticketsService = {
  findAll,
  findById,
  updateStatus,
  ticketRepository,
};
