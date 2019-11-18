import { Model, Document, model } from "mongoose";
import { EntityNotFoundError } from "../../errors";
import { Criteria, Update, Options } from "../interfaces";
import { BaseModel } from "../../models/_model";
import { Repository } from "./_repository";
import { injectable, unmanaged } from "inversify";

@injectable()
export abstract class EntityRepository<DomainModel extends BaseModel,
                                      MongooseDocument extends Document,
                                      MongooseModel extends Model<MongooseDocument>>
                                      implements Repository<DomainModel, MongooseDocument> {
  private Model: MongooseModel;

  constructor(@unmanaged() Model: MongooseModel) {
    this.Model = Model;
  }

  async create(data: DomainModel): Promise<MongooseDocument> {
    try {
      return this.Model.create(data);
    } catch (error) {
      throw error;
    }
  }

  async read(criteria: Criteria): Promise<MongooseDocument> {
    try {
      const entity = await this.Model.findOne(criteria);
      if (!entity) throw new EntityNotFoundError();
      return entity;
    } catch (error) {
      throw error;
    }
  }

  async readMany(criteria: Criteria): Promise<MongooseDocument[]> {
    try {
      const entity = await this.Model.find(criteria);
      return entity;
    } catch (error) {
      throw error;
    }
  }

  async update(criteria: Criteria, update: Update, options?: Options): Promise<MongooseDocument> {
    try {
      if (options) {
        const entity = await this.Model.update(criteria, update, options);
        if (!entity) throw new EntityNotFoundError();
        return entity;
      } else {
        const entity = await this.Model.update(criteria, update);
        if (!entity) throw new EntityNotFoundError();
        return entity;
      }
    } catch (error) {
      throw error;
    }
  }

  async updateMany(criteria: Criteria, update: Update, options?: Options): Promise<MongooseDocument[]> {
    try {
      if (options) {
        const entities = await this.Model.update(criteria, update, Object.assign(options, { multi: true }));
        return entities;
      } else {
        const entities = await this.Model.update(criteria, update, { multi: true });
        return entities;
      }
    } catch (error) {
      throw error;
    }
  }

  async remove(criteria: Criteria): Promise<MongooseDocument> {
    try {
      return this.update(criteria, { $set: { isDeleted: true } });
    } catch (error) {
      throw error;
    }
  }

  async removeMany(criteria: Criteria): Promise<MongooseDocument[]> {
    try {
      return this.updateMany(criteria, { $set: { isDeleted: true } });
    } catch (error) {
      throw error;
    }
  }
}
