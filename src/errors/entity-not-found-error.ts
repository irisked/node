import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";
import { HTTP_STATUS } from "./statuses";
import { ERROR_CODE } from "./codes";

export class EntityNotFoundError extends ServerError {
  public name: string = "EntityNotFoundError";
  public message: string = "Entity not found error.";
  public status: number = HTTP_STATUS.BAD_REQUEST;
  public code: number = ERROR_CODE.NOT_FOUND;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
