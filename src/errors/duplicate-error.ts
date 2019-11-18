import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";

export class DuplicateError extends ServerError {
  public name: string = "DuplicateError";
  public message: string = "Duplicate error.";
  public status: number = 400;
  public code: number = 402;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
