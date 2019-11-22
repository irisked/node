import "reflect-metadata";
import * as mongoose from "mongoose";
import { SCHEMA } from "./field";
import { Definition } from "./definition";
import { logger } from "../../logger";

const add = (schema: mongoose.Schema, specs: Definition[]) => {
  specs.forEach((spec) => {
    schema.add({ [spec.property]: spec.definition });
  });
};

const Model = (name: string, options?: mongoose.SchemaOptions): ClassDecorator => {
  return (target) => {
    const specs: Array<Definition> = Reflect.getMetadata(SCHEMA, target.prototype);
    const parentTarget = Object.getPrototypeOf(target.prototype).constructor;
    const parentSpecs: Array<Definition> = Reflect.getMetadata(SCHEMA, parentTarget.prototype);
    const schema = new mongoose.Schema({}, Object.assign(options, { toObject: { versionKey: false } }));
    if (specs) {
      add(schema, specs);
    }
    if (parentSpecs) {
      add(schema, parentSpecs);
    }
    mongoose.model(name, schema);
    Object.defineProperty(target, "modelName", { value: name });
    return target;
  };
};

export {
  Model
};
