import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";

export class ValidationError extends ServerError {
  public name: string = "ServerError";
  public message: string = "Server Error.";
  public status: number = 400;
  public code: number = 403;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
