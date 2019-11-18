import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";

export class BadRequestError extends ServerError {
  public name: string = "BadRequestError";
  public message: string = "Bad request error.";
  public status: number = 400;
  public code: number = 400;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
