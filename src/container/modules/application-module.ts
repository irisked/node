import "reflect-metadata";
import config from "../../config";
import { ContainerModule, interfaces } from "inversify";
import { TYPES } from "../types";

import { Logger, logger } from "../../logger";
import { ErrorHandler, DefaultErrorHandler } from "../../http-error-handler";
import { DatabaseConnectionOptions } from "../../database/options";
import { Database } from "../../database/database";

const applicationModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<Logger>(TYPES.LOGGER).toConstantValue(logger);
  bind<ErrorHandler>(TYPES.ERROR_HANDLER).to(DefaultErrorHandler).inSingletonScope();
  bind<DatabaseConnectionOptions>(TYPES.DB_CONNECTION_OPTIONS)
    .toConstantValue({
      USERNAME: config.DB_USERNAME,
      PASSWORD: config.DB_PASSWORD,
      DB_NAME: config.DB_NAME,
      DB_HOST: config.DB_HOST,
      DB_PORT: config.DB_PORT
    }
  );
  bind<Database>(TYPES.DATABASE).to(Database).inSingletonScope();
});

export default applicationModule;
