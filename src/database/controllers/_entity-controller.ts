import { Criteria, Update, Options } from "../interfaces";
import { Repository } from "../repositories/_repository";
import { BaseModel } from "../../models/_model";
import { Document, Model } from "mongoose";
import { injectable, inject, unmanaged } from "inversify";
import { Query, UpdateQuery } from "./queries";
import { logger } from "../../logger";
import { TYPES } from "../../container/types";

export interface Controller<Model extends BaseModel> {
  create(data: Model): Promise<Model>;
  readOne(query: Query): Promise<Model>;
  readMany(query: Query): Promise<Model[]>;
  update(options: UpdateQuery): Promise<Model>;
  updateMany(options: UpdateQuery): Promise<Model[]>;
  remove(query: Query): Promise<Model>;
  removeMany(query: Query): Promise<Model[]>;
}

function activator<T>(type: { new(options): T ; }, options: any): T {
  return new type(options);
}

@injectable()
export abstract class EntityController<Model extends BaseModel, DomainDocument extends Document>
                                                   implements Controller<Model> {
  private repository: Repository<Model, DomainDocument>;

  constructor(@inject(TYPES.REPOSITORY) repository: Repository<Model, DomainDocument>) {
    this.repository = repository;
  }

  async create(data: Model): Promise<Model> {
    try {
      const document = await this.repository.create(data);
      return document.toObject();
    } catch (error) {
      throw error;
    }
  }

  async readOne(query: Query): Promise<Model> {
    try {
      const document = await this.repository.read(query.getCriteria());
      return document.toObject();
    } catch (error) {
      throw error;
    }
  }

  async readMany(query: Query): Promise<Model[]> {
    try {
      const documents = await this.repository.readMany(query.getCriteria());
      return documents.map((document) => document.toObject());
    } catch (error) {
      throw error;
    }
  }

  async update(query: UpdateQuery): Promise<Model> {
    try {
      const document = await this.repository.update(query.getCriteria(), query.getUpdate(), query.getOptions());
      return document.toObject();
    } catch (error) {
      throw error;
    }
  }

  async updateMany(query: UpdateQuery): Promise<Model[]> {
    try {
      const documents = await this.repository.updateMany(query.getCriteria(), query.getUpdate(), query.getOptions());
      return documents.map((document) => document.toObject());
    } catch (error) {
      throw error;
    }
  }

  async remove(query: Query): Promise<Model> {
    try {
      const document = await this.repository.remove(query.getCriteria());
      return document.toObject();
    } catch (error) {
      throw error;
    }
  }

  async removeMany(query: Query): Promise<Model[]> {
    throw new Error("Method not implemented.");
  }
}
