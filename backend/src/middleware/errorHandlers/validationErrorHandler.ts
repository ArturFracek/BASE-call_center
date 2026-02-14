import type { NextFunction, Request, Response } from "express";
import { ValidationError } from "../../errors/index.js";

export function validationErrorHandler(
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof ValidationError) {
    const rawIssues = error.errors?.issues ?? [];
    const errors = rawIssues.map((issue) => ({
      path: Array.isArray(issue.path) ? issue.path.join(".") : String(issue.path),
      message: issue.message,
    }));

    res.status(error.status).json({
      message: error.message,
      errors: errors.length > 0 ? errors : undefined,
    });
    return;
  }
  next(error as Error);
}
