import { Criteria, Update, Options } from "../interfaces";

export interface Repository<Model, MongooseDocument> {
  create(data: Model): Promise<MongooseDocument>;
  read(criteria: Criteria): Promise<MongooseDocument>;
  readMany(criteria: Criteria): Promise<MongooseDocument[]>;
  update(criteria: Criteria, update: Update, options?: Options): Promise<MongooseDocument>;
  updateMany(criteria: Criteria, update: Update, options?: Options): Promise<MongooseDocument[]>;
  remove(criteria: Criteria): Promise<MongooseDocument>;
  removeMany(criteria: Criteria): Promise<MongooseDocument[]>;
}
