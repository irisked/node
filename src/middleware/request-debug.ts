import { Context } from "koa";
import { Logger } from "../logger";

export default (logger: Logger) => {
  return async (ctx: Context, next: any) => {
    try {
      logger.debug("HEADERS:========================\n", ctx.request.headers);
      logger.debug("================================");
      logger.debug("BODY:===========================\n", ctx.request.body);
      logger.debug("================================");
      logger.debug("QUERY:==========================\n", ctx.request.query);
      logger.debug("================================");
      return next();
    } catch (error) {
      throw error;
    }
  };
};
