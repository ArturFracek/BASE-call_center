import type { ZodError } from "zod";

/** 422 Unprocessable Entity – dane poprawne składniowo, semantycznie nieprawidłowe (walidacja). */
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
