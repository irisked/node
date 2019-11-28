import { Model, Document, model, Error } from "mongoose";
import { EntityNotFoundError, ValidationError, DuplicateError } from "../../errors";
import { Criteria, Update, Options } from "../interfaces";
import { BaseModel } from "../../models/_model";
import { Repository } from "./_repository";
import { injectable, unmanaged } from "inversify";
import { logger } from "../../logger";
import { MongoError } from "mongodb";

@injectable()
export abstract class EntityRepository<DomainModel extends BaseModel,
                                      EntityDocument extends Document,
                                      EntityModel extends Model<EntityDocument>>
                                      implements Repository<DomainModel, EntityDocument> {
  private Model: EntityModel;

  constructor(@unmanaged() Model: EntityModel) {
    this.Model = Model;
  }

  async create(data: DomainModel): Promise<EntityDocument> {
    try {
      const document = await this.Model.create(data);
      return document;
    } catch (error) {
      if (error instanceof Error.ValidationError) {
        throw ValidationError.fromMongoose(error);
      }
      if (error instanceof MongoError && error.code === 11000) {
        throw DuplicateError.fromMongoose(error);
      }
      throw error;
    }
  }

  async read(criteria: Criteria): Promise<EntityDocument> {
    try {
      const entity = await this.Model.findOne(criteria);
      if (!entity) throw new EntityNotFoundError();
      return entity;
    } catch (error) {
      throw error;
    }
  }

  async readMany(criteria: Criteria): Promise<EntityDocument[]> {
    try {
      const entity = await this.Model.find(criteria);
      return entity;
    } catch (error) {
      throw error;
    }
  }

  async update(criteria: Criteria, update: Update, options?: Options): Promise<EntityDocument> {
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

  async updateMany(criteria: Criteria, update: Update, options?: Options): Promise<EntityDocument[]> {
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

  async remove(criteria: Criteria): Promise<EntityDocument> {
    try {
      return this.update(criteria, { $set: { isDeleted: true } });
    } catch (error) {
      throw error;
    }
  }

  async removeMany(criteria: Criteria): Promise<EntityDocument[]> {
    try {
      return this.updateMany(criteria, { $set: { isDeleted: true } });
    } catch (error) {
      throw error;
    }
  }
}
