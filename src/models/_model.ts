import { Field } from "../database/decorators/field";

export interface DomainModel {
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  _id?: string;
}

export interface BaseModelOptions {
  createdAt?: Date;
  updatedAt?: Date;
  isDeleted?: boolean;
  _id?: string;
}

export class BaseModel implements DomainModel {
  /* tslint:disable: variable-name */
  public _id?: string;
  /* tslint:enable: variable-name */
  @Field({ isDeleted: Boolean, default: false })
  public isDeleted?: boolean;
  public createdAt?: Date;
  public updatedAt?: Date;
  constructor({ _id, createdAt, updatedAt, isDeleted }: BaseModelOptions) {
    this._id = _id;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.isDeleted = isDeleted;
  }
}
