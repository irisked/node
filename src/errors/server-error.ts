import { ErrorOptions } from "./error-options";
import { HTTP_STATUS } from "./statuses";
import { ERROR_CODE } from "./codes";

export class ServerError extends Error {
  public name: string = "ServerError";
  public message: string = "Server Error.";
  public status: number = HTTP_STATUS.INTERNAL_SERVER_ERROR;
  public code: number = ERROR_CODE.UNDEFINED;
  public extras: any;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
