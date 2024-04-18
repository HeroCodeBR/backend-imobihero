export class HttpError extends Error {
  constructor(public status: number, public message: string) {
    super(message);
    this.message = message;
    this.status = status;
  }
}
