import { Criteria, Update, Options } from "../../interfaces";

export type QueryOption = (query: Query) => void;

export interface Query {
  getCriteria(): Criteria;
  includeDeleted(flag: boolean);
}

export interface UpdateQuery extends Query {
  getOptions(): Options;
  getUpdate(): Update;
}

export class DefaultReadQuery implements Query {

  private criteria: Criteria;

  constructor(criteria: Criteria) {
    this.criteria = criteria;
  }

  public includeDeleted(flag: boolean) {
    if (flag) {
      delete this.criteria.isDeleted;
    } else {
      this.criteria = Object.assign(this.criteria, { isDeleted: false });
    }
  }

  public getCriteria(): Criteria {
    return this.criteria;
  }
}

export class DefaultUpdateQuery implements UpdateQuery {

  private criteria: Criteria;
  private update: Update;
  private options: Options;

  constructor(criteria: Criteria, update: Update, options: Options) {
    this.update = update;
    this.options = options;
    this.criteria = criteria;
  }

  public includeDeleted(flag: boolean) {
    if (flag) {
      delete this.criteria.isDeleted;
    } else {
      this.criteria = Object.assign(this.criteria, { isDeleted: false });
    }
  }

  public getCriteria(): Criteria {
    return this.criteria;
  }

  public getOptions(): Options {
    return this.options;
  }

  public getUpdate(): Update {
    return this.update;
  }
}
