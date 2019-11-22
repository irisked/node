import "reflect-metadata";
import * as mongoose from "mongoose";
import { Definition } from "./definition";

export const SCHEMA = Symbol.for("SCHEMA");

const Field = (definition?: mongoose.SchemaTypeOpts<any> | mongoose.Schema | mongoose.SchemaType): PropertyDecorator => {
  return (target: any, property: string) => {
    let schema: Array<Definition> = Reflect.getOwnMetadata(SCHEMA, target);
    if (!schema) {
      Reflect.defineMetadata(SCHEMA, schema = [], target);
    }
    schema.push({
      property,
      definition,
      isVirtual: false
    });
  };
};

export {
  Field
};
