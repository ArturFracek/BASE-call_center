import { getTickets } from "./getTickets.js";
import { getTicketById } from "./getTicketById.js";
import { getTicketCounts } from "./getTicketCounts.js";
import { patchTicketStatus } from "./patchTicketStatus.js";

export const ticketsService = {
  getTickets,
  getTicketById,
  getTicketCounts,
  patchTicketStatus,
};
