import { inject, injectable } from "inversify";
import { Controller } from "../../database/controllers/_entity-controller";
import { Club } from "../../models/core/club";
import { ClubDocument } from "../../database/entities/club";
import { Logger } from "../../logger";
import { Criteria } from "../../database/interfaces";
import { TYPES } from "../../container/types";
import { QueryOption, DefaultQuery } from "../../database/controllers/queries";
import { IServiceUpdateOptions } from "../interfaces";
import { eventsFor } from "../../events";

const EVENTS = eventsFor("CLUBS");

@injectable()
export class ClubService {
  private controller: Controller<Club, ClubDocument>;
  private logger: Logger;

  constructor(@inject(TYPES.CONTROLLER) controller: Controller<Club, ClubDocument>, @inject(TYPES.LOGGER) logger: Logger) {
    this.controller = controller;
    this.logger = logger;
  }

  public async create(data: Club): Promise<Club> {
    try {
      const document = await this.controller.create(data);
      this.logger.debug(EVENTS.CREATED());
      this.logger.debug(document);
      return new Club(document);
    } catch (error) {
      throw error;
    }
  }

  public async readOne(criteria: Criteria, ...options: QueryOption[]): Promise<Club> {
    try {
      const query = new DefaultQuery(criteria);
      options.forEach((option) => option(query));
      const document = await this.controller.readOne(query);
      return document;
    } catch (error) {
      throw error;
    }
  }

  public async readByID(id: string, ...options: QueryOption[]): Promise<Club> {
    try {
      return this.readOne({ _id: id }, ...options);
    } catch (error) {
      throw error;
    }
  }

  public async readMany(criteria: Criteria, ...options: QueryOption[]): Promise<Club[]> {
    try {
      const query = new DefaultQuery(criteria);
      options.forEach((option) => option(query));
      const documents = await this.controller.readMany(query);
      return documents.map((document) => new Club(document));
    } catch (error) {
      throw error;
    }
  }

  public async update(config: IServiceUpdateOptions, ...options: QueryOption[]): Promise<Club> {
    try {
      const query = new DefaultQuery(config.criteria);
      options.forEach((option) => option(query));
      const updated = await this.controller.update({ query, update: config.update, options: config.options });
      this.logger.debug(EVENTS.UPDATED());
      this.logger.debug(updated);
      return new Club(updated);
    } catch (error) {
      throw error;
    }
  }

  public async updateMany(config: IServiceUpdateOptions, ...options: QueryOption[]): Promise<Club[]> {
    try {
      const query = new DefaultQuery(config.criteria);
      options.forEach((option) => option(query));
      const updated = await this.controller.updateMany({ query, update: config.update, options: config.options });
      this.logger.debug(EVENTS.UPDATED());
      this.logger.debug(updated);
      return updated.map((document) => new Club(document));
    } catch (error) {
      throw error;
    }
  }
}
