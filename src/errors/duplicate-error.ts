import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";
import { HTTP_STATUS } from "./statuses";
import { ERROR_CODE } from "./codes";
import { MongoError } from "mongodb";

export class DuplicateError extends ServerError {
  public name: string = "DuplicateError";
  public message: string = "Duplicate error.";
  public status: number = HTTP_STATUS.BAD_REQUEST;
  public code: number = ERROR_CODE.BAD_REQUEST;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }

  static fromMongoose(err: any): DuplicateError {
    return new DuplicateError({ message: `Duplicate error. Fields: [${JSON.stringify(err.keyValue)}]` });
  }
}
