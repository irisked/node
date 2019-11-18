import { Context } from "koa";
import { ROLE } from "../models/roles";

export default () => {
  return async (ctx: Context, next: any) => {
    try {
      ctx.state.getRole = (): ROLE => {
        return ctx.state.user ? ctx.state.user.role ? ctx.state.user.role : ROLE.UNAUTHORIZED : ROLE.UNAUTHORIZED;
      };
      return next();
    } catch (error) {
      throw error;
    }
  };
};
