import container from "../container/config";
import { TYPES } from "../container/types";
import app from "../app";
import { Logger } from "../logger";
import config from "../config";
import { Database } from "../database/database";

const logger = container.get<Logger>(TYPES.LOGGER);
const database = container.get<Database>(TYPES.DATABASE);

database.getConnection()
  .then(() => {
    app.listen(config.PORT);
    logger.info(`APP LISTENING ON PORT: ${config.PORT}`);
  })
  .catch((error) => logger.error(error));
