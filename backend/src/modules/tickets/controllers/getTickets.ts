import type { Request, Response } from "express";
import { ticketsService } from "../services/index.js";

export async function getTickets(req: Request, res: Response): Promise<void> {
  const list = await ticketsService.getTickets(req.query);
  res.json(list);
}
