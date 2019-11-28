import * as Joi from "@hapi/joi";
import { ValidationError } from "../errors";

export const validate = <T>(schema: Joi.Schema, data: T): T => {
  const { error, value } = schema.validate(data);
  if (error) throw ValidationError.fromJoi(error);
  return value;
};
