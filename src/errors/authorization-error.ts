import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";

export class AuthorizationError extends ServerError {
  public name: string = "AuthorizationError";
  public message: string = "Authorization error.";
  public status: number = 401;
  public code: number = 401;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
