import type { Request, Response } from "express";
import { ticketsService } from "../services/index.js";

export async function getTicketById(req: Request, res: Response): Promise<void> {
  const ticket = await ticketsService.getTicketById(req.params.id);
  res.json(ticket);
}
