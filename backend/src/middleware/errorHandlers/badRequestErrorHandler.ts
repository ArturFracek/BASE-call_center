import type { NextFunction, Request, Response } from "express";
import { BadRequestError } from "../../errors/index.js";
import logger from "../../helpers/logger.js";

export const badRequestErrorHandler = (
  error: unknown,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  if (error instanceof BadRequestError) {
    logger.error(
      { req, err: error },
      `Bad request error during ${error.operation}`
    );
    res.status(error.status).json({
      message: error.message,
      operation: error.operation,
    });
    return;
  }
  next(error as Error);
};
