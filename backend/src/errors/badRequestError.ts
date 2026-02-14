export class BadRequestError extends Error {
  status: number;
  operation: string;

  constructor(message: string, operation: string, status = 400) {
    super(message);
    this.name = "BadRequestError";
    this.status = status;
    this.operation = operation;
  }
}
