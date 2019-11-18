import * as Mongoose from "mongoose";
import { Logger } from "../logger";
import { DatabaseConnectionOptions } from "./options";
import { injectable, inject } from "inversify";
import { TYPES } from "../container/types";

@injectable()
export class Database {
  private logger: Logger;
  private options: DatabaseConnectionOptions;
  private connection: Mongoose.Connection;

constructor(@inject(TYPES.DB_CONNECTION_OPTIONS) options: DatabaseConnectionOptions, @inject(TYPES.LOGGER) logger: Logger) {
    this.logger = logger;
    this.options = options;
  }

  public async getConnection(): Promise<Mongoose.Connection> {
    try {
      if (this.isConnected()) return this.connection;
      else {
        this.connection = await this.connect();
        return this.connection;
      }
    } catch (error) {
      throw error;
    }
  }

  private async connect(): Promise<Mongoose.Connection> {
    try {
      Mongoose.connection.on("disconnected", () => {
        this.logger.info("DISCONNECTED FROM DB.");
      });
      Mongoose.connection.once("connected", () => {
        this.logger.info("CONNECTED TO DB.");
      });
      const mongoose = await Mongoose.connect(this.address(), { useNewUrlParser: true });
      return mongoose.connection;
    } catch (error) {
      throw error;
    }
  }

  private isConnected(): boolean {
    return !!this.connection;
  }

  private address(): string {
    return `mongodb://${this.options.USERNAME}:${this.options.PASSWORD}@${this.options.DB_HOST}:${this.options.DB_PORT}/${this.options.DB_NAME}`;
  }
}
