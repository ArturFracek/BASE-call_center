import type { NextFunction, Request, Response } from "express";
import { NotFoundError } from "../../errors/index.js";

export const notFoundErrorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof NotFoundError) {
    res.status(error.status).json({ message: error.message });
    return;
  }
  next(error as Error);
};
