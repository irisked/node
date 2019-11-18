import { Document, Model } from "mongoose";
import { DomainModel } from "../../models/_model";

export type Entity<T> = T & DomainModel;
export type EntityDocument<T> = T & Document;
export type EntityModel<T> = Model<EntityDocument<Entity<T>>>;
