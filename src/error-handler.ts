import "reflect-metadata";
import { ServerError } from "./errors";
import { Logger } from "./logger";
import { TYPES } from "./container/types";
import { inject, injectable } from "inversify";

export interface ErrorHandler {
  handle(err: Error, ctx: any);
}

@injectable()
export class DefaultErrorHandler implements ErrorHandler {

  private logger: Logger;

  constructor(@inject(TYPES.LOGGER) logger: Logger) {
    this.logger = logger;
  }

  handle(err: Error, ctx: any) {
    try {
      this.logger.error(err);
      if (err instanceof ServerError) {
        ctx.status = err.status;
        ctx.body = {
          message: err.message,
          code: err.code
        };
        if (err.extras) ctx.body.extras = err.extras;
      } else {
        ctx.status = 500;
        ctx.body = {
          message: "Internal server error.",
          code: 500
        };
      }
    } catch (error) {
      this.logger.error(error);
    }
  }
}
