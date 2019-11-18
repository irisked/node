import { Criteria, Update, Options } from "../interfaces";
import { Repository } from "../repositories/_repository";
import { DomainModel } from "../../models/_model";
import { Document } from "mongoose";
import { injectable } from "inversify";
import { Query } from "./queries";

export interface UpdateConfig {
  query: Query;
  update: Update;
}

export interface Controller<Model extends DomainModel, DomainDocument extends Document> {
  create(data: Model): Promise<DomainDocument>;
  readOne(query: Query): Promise<DomainDocument>;
  readMany(query: Query): Promise<DomainDocument[]>;
  update(options: UpdateConfig): Promise<DomainDocument>;
  updateMany(options: UpdateConfig): Promise<DomainDocument[]>;
  remove(query: Query): Promise<DomainDocument>;
  removeMany(query: Query): Promise<DomainDocument[]>;
}

@injectable()
export abstract class EntityController<Model extends DomainModel, DomainDocument extends Document>
                                                   implements Controller<DomainModel, DomainDocument> {
  private repository: Repository<Model, DomainDocument>;

  constructor(repository: Repository<Model, DomainDocument>) {
    this.repository = repository;
  }

  async create(data: Model): Promise<DomainDocument> {
    try {
      const document = await this.repository.create(data);
      return document;
    } catch (error) {
      throw error;
    }
  }

  async readOne(query: Query): Promise<DomainDocument> {
    try {
      const document = await this.repository.read(query.getCriteria());
      return document;
    } catch (error) {
      throw error;
    }
  }

  async readMany(query: Query): Promise<DomainDocument[]> {
    try {
      const documents = await this.repository.readMany(query.getCriteria());
      return documents;
    } catch (error) {
      throw error;
    }
  }

  async update(options: UpdateConfig): Promise<DomainDocument> {
    try {
      const document = await this.repository.update(options.query.getCriteria(), options.update, options.query.getOptions());
      return document;
    } catch (error) {
      throw error;
    }
  }

  async updateMany(options: UpdateConfig): Promise<DomainDocument[]> {
    try {
      const document = await this.repository.updateMany(options.query.getCriteria(), options.update, options.query.getOptions());
      return document;
    } catch (error) {
      throw error;
    }
  }

  async remove(query: Query): Promise<DomainDocument> {
    try {
      const document = await this.repository.remove(query.getCriteria());
      return document;
    } catch (error) {
      throw error;
    }
  }

  async removeMany(query: Query): Promise<DomainDocument[]> {
    throw new Error("Method not implemented.");
  }
}
