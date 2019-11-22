import container from "../container/config";
import { TYPES } from "../container/types";
import app from "../app";
import { Logger } from "../logger";
import config from "../config";
import Database from "../database/connection";
import { Connection } from "mongoose";

const logger = container.get<Logger>(TYPES.LOGGER);
const database = container.get<Database>(TYPES.DATABASE);

database.getConnection()
  .then((connection: Connection) => {
    app.listen(config.PORT);
    logger.info(`APP LISTENING ON PORT: ${config.PORT}`);
  })
  .catch((error) => logger.error(error));
