import { ErrorOptions } from "./error-options";
import { ServerError } from "./server-error";
import { HTTP_STATUS } from "./statuses";
import { ERROR_CODE } from "./codes";
import { Error } from "mongoose";
import Joi = require("@hapi/joi");

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
    const paths = Object.keys(err.errors);
    return new ValidationError({
      message: paths.reduce((accumulator, path, index) => {
        accumulator += err.errors[path].message;
        if (index !== paths.length - 1) accumulator += " ";
        return accumulator;
      }, "")
    });
  }
  static fromJoi(err: Joi.ValidationError): ValidationError {
    const paths = Object.keys(err.details);
    return new ValidationError({
      message: paths.reduce((accumulator, path, index) => {
        accumulator += err.details[path].message;
        if (index !== paths.length - 1) accumulator += " ";
        return accumulator;
      }, "")
    });
  }
}
