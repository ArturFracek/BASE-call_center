import { Router, type Request, type Response, type NextFunction } from "express";
import { ticketsController } from "../controllers/index.js";

const router = Router();

const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => (req: Request, res: Response, next: NextFunction) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get("/", asyncHandler(ticketsController.getTickets));
router.get("/counts", asyncHandler(ticketsController.getTicketCounts));
router.get("/:id", asyncHandler(ticketsController.getTicketById));
router.patch("/:id", asyncHandler(ticketsController.patchTicket));

export default router;
