import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";
import { HTTP_STATUS } from "./statuses";
import { ERROR_CODE } from "./codes";
import { Error } from "mongoose";
import * as Joi from "@hapi/joi";

interface Keys {
  [key: string]: { message: string };
}

export class ValidationError extends ServerError {
  public name: string = "ServerError";
  public message: string = "Server Error.";
  public status: number = HTTP_STATUS.BAD_REQUEST;
  public code: number = ERROR_CODE.VALIDATION;

  constructor(options?: ErrorOptions) {
    super();
    Object.assign(this, options);
  }

  static fromMongoose(err: Error.ValidationError): ValidationError {
    return this.fromKeys(Object.keys(err.errors), err.errors);
  }
  static fromJoi(err: Joi.ValidationError): ValidationError {
    return this.fromKeys(Object.keys(err.details), err.details);
  }

  static fromKeys(paths: string[], obj: any): ValidationError {
    return new ValidationError({
      message: paths.reduce((accumulator, path, index) => {
        accumulator += obj[path].message;
        if (index !== paths.length - 1) accumulator += " ";
        return accumulator;
      }, "")
    });
  }
}
