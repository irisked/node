import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";
import { HTTP_STATUS } from "./statuses";
import { ERROR_CODE } from "./codes";

export class AuthorizationError extends ServerError {
  public name: string = "AuthorizationError";
  public message: string = "Authorization error.";
  public status: number = HTTP_STATUS.UNAUTHORIZED;
  public code: number = ERROR_CODE.AUTHORIZATION;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
