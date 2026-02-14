import { getTickets } from "./getTickets.js";
import { getTicketById } from "./getTicketById.js";
import { patchTicketStatus } from "./patchTicketStatus.js";

export const ticketsService = {
  getTickets,
  getTicketById,
  patchTicketStatus,
};
