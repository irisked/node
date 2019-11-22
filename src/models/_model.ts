import { Field } from "../database/decorators/field";

export interface BaseModelOptions {
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
  constructor({ _id, createdAt, updatedAt, isDeleted }: BaseModelOptions) {
    this._id = _id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }

  static schema(): any {
    return {
      createdAt: Date,
      updatedAt: Date,
      isDeleted: Boolean
    };
  }
}
