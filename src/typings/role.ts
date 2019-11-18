import "koa";
import { ROLE } from "../models/roles";

declare module "koa" {
  interface DefaultState {
    getRole: () => ROLE;
  }
}
