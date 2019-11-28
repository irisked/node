import { Field } from "../database/decorators/field";

export interface BaseModelConfig {
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  _id?: string;
}

export class BaseModel {
  static modelName: string;
  public createdAt?: Date;
  public updatedAt?: Date;
  @Field({ type: Boolean, default: false })
  public isDeleted?: boolean;
  /* tslint:disable: variable-name */
  public _id?: string;
  /* tslint:enable: variable-name */
  constructor(options: BaseModelConfig) {
    this._id = options._id;
    this.createdAt = options.createdAt;
    this.updatedAt = options.updatedAt;
    this.isDeleted = options.hasOwnProperty("isDeleted") ? options.isDeleted : false;
  }
}
