import { Criteria, Update, Options } from "../../interfaces";
import { ROLE } from "../../../models/roles";

export type QueryOption = (query: Query) => void;

export interface Query {
  getCriteria(): Criteria;
  getOptions(): Options | undefined;
}

export class DefaultQuery implements Query {

  private criteria: Criteria;
  private options?: Options;

  constructor(criteria: Criteria, options?: Options) {
    this.criteria = criteria;
    this.options = options;
  }

  public getCriteria(): Criteria {
    return this.criteria;
  }

  public getOptions(): Criteria | undefined {
    return this.options;
  }
}
