import "reflect-metadata";
import * as tracer from "tracer";
import * as colors from "colors";
import config from "./config";

export interface Logger {
  log(...args: any);
  debug(...args: any);
  info(...args: any);
  error(...args: any);
}

const loggerConfig = {
  level: config.LOGGER_LEVEL,
  format: [
    "{{timestamp}} [{{title}}]: {{message}}",
    {
      error: "{{timestamp}} [{{title}}]: (in: {{file}}:{{line}})\n{{message}}\nCall Stack:\n{{stack}}"
    }
  ],
  dateformat : "dd-mm-yyyy HH:MM:ss.L",
  filters : {
    log : colors.white,
    trace : colors.magenta,
    debug : colors.cyan,
    info : colors.green,
    warn : colors.yellow,
    error : colors.red,
  }
} as tracer.Tracer.LoggerConfig;

const logger = tracer.colorConsole(loggerConfig);

export { logger };
