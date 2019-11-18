import { ErrorOptions } from "./error-options";

export class ServerError extends Error {
  public name: string = "ServerError";
  public message: string = "Server Error.";
  public status: number = 500;
  public code: number = 500;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }
}
