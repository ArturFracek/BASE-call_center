import type { ZodError } from "zod";

export class ValidationError extends Error {
  status: number;
  errors?: ZodError;

  constructor(message: string, errors?: ZodError, status = 422) {
    super(message);
    this.name = "ValidationError";
    this.status = status;
    this.errors = errors;
  }
}
