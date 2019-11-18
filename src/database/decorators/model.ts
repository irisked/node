import "reflect-metadata";
import * as mongoose from "mongoose";
import { SCHEMA } from "./field";

const Model = (name: string, options?: mongoose.SchemaOptions): ClassDecorator => {
  return (target) => {
      const specs: Array<any> = Reflect.getMetadata(SCHEMA, target.prototype);
      const schema = new mongoose.Schema({}, { timestamps: true });
      if (specs) {
        specs.forEach((spec) => {
          schema.add({ [spec.property]: spec.definition });
        });
      }
      mongoose.model(name, schema);
      return target;
  };
};

export {
  Model
};
