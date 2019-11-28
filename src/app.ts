import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as reqlogger from "koa-logger";
import * as cors from "@koa/cors";
import { Logger } from "./logger";
import role from "./middleware/role";
import debug from "./middleware/request-debug";
import container from "./container/config";
import { TYPES } from "./container/types";

import routes from "./routes";
import config from "./config";

const logger = container.get<Logger>(TYPES.LOGGER);
const app = new Koa();

app.use(cors());
app.use(reqlogger());
app.use(bodyparser());
if (config.NODE_ENV !== "production") {
  app.use(debug(logger));
}
app.use(role());
app.use(routes.routes());

export default app;
