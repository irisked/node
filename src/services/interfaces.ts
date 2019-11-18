import { Criteria, Update, Options } from "../database/interfaces";

export interface IServiceUpdateOptions {
  criteria: Criteria;
  update: Update;
  options: Options;
}
