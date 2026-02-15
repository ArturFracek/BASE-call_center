import type { NextFunction, Request, Response } from "express";
import logger from "../../helpers/logger.js";

export const fallbackErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  _next: NextFunction
): void => {
  logger.error({ req, err: error }, "Unhandled error");
  res.status(500).json({ message: "Internal server error" });
};
