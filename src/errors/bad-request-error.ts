import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";
import { HTTP_STATUS } from "./statuses";
import { ERROR_CODE } from "./codes";

export class BadRequestError extends ServerError {
  public name: string = "BadRequestError";
  public message: string = "Bad request error.";
  public status: number = HTTP_STATUS.BAD_REQUEST;
  public code: number = ERROR_CODE.BAD_REQUEST;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
