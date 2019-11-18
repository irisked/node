import "reflect-metadata";
import * as mongoose from "mongoose";

export const SCHEMA = Symbol.for("SCHEMA");

const Field = (definition?: mongoose.SchemaTypeOpts<any> | mongoose.Schema | mongoose.SchemaType): PropertyDecorator => {
  return (target: any, property: string) => {
    let schema: Array<any> = Reflect.getMetadata(SCHEMA, target);
    if (!schema) {
      Reflect.defineMetadata(SCHEMA, schema = [], target);
    }
    schema.push({
      property,
      definition
    });
  };
};

export {
  Field
};
