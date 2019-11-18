import * as dotenv from "dotenv";

export interface Config {
  [key: string]: string;
}

if (!process.env.NODE_ENV || process.env.NODE_ENV === "local") {
  dotenv.config();
}

const config = {
  PORT: process.env.PORT,
  LOGGER_LEVEL: process.env.LOGGER_LEVEL,
  DB_USERNAME: process.env.DB_USERNAME,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: process.env.DB_PORT,
  DB_NAME: process.env.DB_NAME
} as Config;

export default config;
