import type { Request, Response } from "express";
import { ticketsService } from "../services/index.js";

export const getTicketCounts = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const counts = await ticketsService.getTicketCounts();
  res.json(counts);
};
