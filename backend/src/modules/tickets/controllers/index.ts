import { getTickets } from "./getTickets.js";
import { getTicketById } from "./getTicketById.js";
import { getTicketCounts } from "./getTicketCounts.js";
import { patchTicket } from "./patchTicket.js";

export const ticketsController = {
  getTickets,
  getTicketById,
  getTicketCounts,
  patchTicket,
};
