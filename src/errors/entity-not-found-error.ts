import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";

export class EntityNotFoundError extends ServerError {
  public name: string = "EntityNotFoundError";
  public message: string = "Entity not found error.";
  public status: number = 404;
  public code: number = 404;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
