import { findCountsByStatus } from "../repository/index.js";

export const getTicketCounts = async () => findCountsByStatus();
