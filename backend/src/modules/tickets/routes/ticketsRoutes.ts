import { Router, type Request, type Response, type NextFunction } from "express";
import { ticketsController } from "../controllers/index.js";

const router = Router();

function asyncHandler(
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

router.get("/", asyncHandler(ticketsController.getTickets));
router.get("/:id", asyncHandler(ticketsController.getTicketById));
router.patch("/:id", asyncHandler(ticketsController.patchTicket));

export default router;
