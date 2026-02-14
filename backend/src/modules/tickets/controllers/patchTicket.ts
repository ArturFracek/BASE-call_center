import type { Request, Response } from "express";
import { ticketsService } from "../services/index.js";

export async function patchTicket(req: Request, res: Response): Promise<void> {
  const ticket = await ticketsService.patchTicketStatus(
    req.params.id,
    req.body
  );
  res.json(ticket);
}
