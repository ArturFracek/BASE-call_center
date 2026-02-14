export class NotFoundError extends Error {
  status: number;
  resource: string;

  constructor(message: string, resource: string, status = 404) {
    super(message);
    this.name = "NotFoundError";
    this.status = status;
    this.resource = resource;
  }
}
