import * as Koa from "koa";
import * as bodyparser from "koa-bodyparser";
import * as logger from "koa-logger";
import * as cors from "@koa/cors";
import role from "./middleware/role";

import routes from "./routes";

const app = new Koa();

app.use(cors());
app.use(logger());
app.use(bodyparser());
app.use(role());
app.use(routes.routes());

export default app;
